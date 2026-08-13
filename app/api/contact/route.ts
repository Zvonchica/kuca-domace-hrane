import { Resend } from "resend";
import { business } from "@/data/site";

type InquiryType = "kupac" | "firma";

type ContactPayload = {
  inquiryType?: InquiryType;
  company?: string;
  name?: string;
  phone?: string;
  email?: string;
  mealCount?: string;
  location?: string;
  message?: string;
  website?: string;
};

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 3;
const requestsByIp = new Map<string, { count: number; startedAt: number }>();

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getString(value: unknown, maxLength: number) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const current = requestsByIp.get(ip);

  if (!current || now - current.startedAt > RATE_LIMIT_WINDOW_MS) {
    requestsByIp.set(ip, { count: 1, startedAt: now });
    return false;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) return true;

  current.count += 1;
  return false;
}

function clientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export async function POST(req: Request) {
  const ip = clientIp(req);

  if (isRateLimited(ip)) {
    return Response.json(
      { error: "Previše upita u kratkom periodu. Molimo pokušajte ponovo malo kasnije ili nas pozovite." },
      { status: 429 }
    );
  }

  try {
    const data = (await req.json()) as ContactPayload;
    const inquiryType: InquiryType = data.inquiryType === "firma" ? "firma" : "kupac";
    const website = getString(data.website, 200);

    // Skriveno polje ostaje prazno kod stvarnih korisnika.
    if (website) return Response.json({ success: true }, { status: 200 });

    const company = getString(data.company, 120);
    const name = getString(data.name, 120);
    const phone = getString(data.phone, 50);
    const email = getString(data.email, 160);
    const mealCount = getString(data.mealCount, 30);
    const location = getString(data.location, 180);
    const message = getString(data.message, 3000);

    if (!name || !phone || !email || !location || (inquiryType === "firma" && (!company || !mealCount))) {
      return Response.json({ error: "Molimo popunite sva obavezna polja." }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return Response.json({ error: "Unesite ispravnu email adresu." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "Slanje upita trenutno nije dostupno. Molimo pozovite nas direktno." },
        { status: 503 }
      );
    }

    const safe = {
      company: escapeHtml(company || "Nije primenljivo"),
      name: escapeHtml(name),
      phone: escapeHtml(phone),
      email: escapeHtml(email),
      mealCount: escapeHtml(mealCount || "Nije primenljivo"),
      location: escapeHtml(location),
      message: message ? escapeHtml(message).replaceAll("\n", "<br />") : "Nije navedeno",
      inquiryType: inquiryType === "firma" ? "Ponuda za firmu" : "Direktna porudžbina / opšti upit",
    };

    const rows = [
      ["Vrsta upita", safe.inquiryType],
      ...(inquiryType === "firma" ? [["Naziv firme", safe.company], ["Približan broj obroka", safe.mealCount]] : []),
      ["Kontakt osoba", safe.name],
      ["Telefon", safe.phone],
      ["Email", safe.email],
      ["Lokacija", safe.location],
    ];

    const html = `
      <div style="font-family: Arial, Helvetica, sans-serif; color: #24382b; line-height: 1.55; max-width: 640px;">
        <h1 style="margin: 0 0 16px; color: #143d2a; font-size: 24px;">Novi upit sa sajta Maka i Ika</h1>
        <table style="width:100%; border-collapse:collapse; margin: 0 0 22px;">
          ${rows.map(([label, value]) => `<tr><td style="padding:10px 0; width:42%; border-bottom:1px solid #e6dfd1; font-weight:700;">${label}</td><td style="padding:10px 0; border-bottom:1px solid #e6dfd1;">${value}</td></tr>`).join("")}
        </table>
        <p style="margin:0 0 7px; font-weight:700;">Poruka</p>
        <div style="padding:14px 16px; background:#f9f4e9; border:1px solid #e4d8c4; border-radius:12px;">${safe.message}</div>
      </div>
    `;

    const resend = new Resend(apiKey);
    const from = process.env.RESEND_FROM_EMAIL || "Maka i Ika – domaća kuhinja <onboarding@resend.dev>";
    const recipient = process.env.CONTACT_RECIPIENT_EMAIL || business.email;
    const result = await resend.emails.send({
      from,
      to: recipient,
      replyTo: email,
      subject: `${safe.inquiryType} — ${name}`,
      html,
      text: `Novi upit sa sajta Maka i Ika\n\nVrsta upita: ${safe.inquiryType}\n${inquiryType === "firma" ? `Firma: ${company}\nBroj obroka: ${mealCount}\n` : ""}Kontakt osoba: ${name}\nTelefon: ${phone}\nEmail: ${email}\nLokacija: ${location}\nPoruka: ${message || "Nije navedeno"}`,
    });

    if (result.error) {
      return Response.json(
        { error: "Upit trenutno nije moguće poslati. Molimo pozovite nas direktno." },
        { status: 502 }
      );
    }

    return Response.json({ success: true }, { status: 200 });
  } catch {
    return Response.json(
      { error: "Došlo je do greške pri slanju upita. Molimo pozovite nas direktno." },
      { status: 500 }
    );
  }
}
