import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const firma = String(data.firma || "").trim();
    const ime = String(data.ime || "").trim();
    const telefon = String(data.telefon || "").trim();
    const email = String(data.email || "").trim();
    const lokacija = String(data.lokacija || "").trim();
    const brojZaposlenih = String(data.brojZaposlenih || "").trim();
    const kadaTreba = String(data.kadaTreba || "").trim();
    const tipUsluge = String(data.tipUsluge || "").trim();
    const trenutniModel = String(data.trenutniModel || "").trim();
    const poruka = String(data.poruka || "").trim();

    const posebniRezim = Array.isArray(data.posebniRezim)
      ? data.posebniRezim
          .map((item: unknown) => String(item).trim())
          .filter(Boolean)
      : [];

    if (
      !firma ||
      !ime ||
      !telefon ||
      !email ||
      !lokacija ||
      !brojZaposlenih ||
      !kadaTreba ||
      !tipUsluge
    ) {
      return Response.json(
        { error: "Molimo popunite sva obavezna polja." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return Response.json(
        { error: "Unesite ispravnu email adresu." },
        { status: 400 }
      );
    }

    const posebniRezimTekst =
      posebniRezim.length > 0 ? posebniRezim.join(", ") : "Nije navedeno";

    const safeFirma = escapeHtml(firma);
    const safeIme = escapeHtml(ime);
    const safeTelefon = escapeHtml(telefon);
    const safeEmail = escapeHtml(email);
    const safeLokacija = escapeHtml(lokacija);
    const safeBrojZaposlenih = escapeHtml(brojZaposlenih);
    const safeKadaTreba = escapeHtml(kadaTreba);
    const safeTipUsluge = escapeHtml(tipUsluge);
    const safeTrenutniModel = trenutniModel
      ? escapeHtml(trenutniModel)
      : "Nije navedeno";
    const safePosebniRezim = escapeHtml(posebniRezimTekst);
    const safePoruka = poruka
      ? escapeHtml(poruka).replaceAll("\n", "<br />")
      : "Nije navedeno";

    const adminHtml = `
      <div style="font-family: Arial, Helvetica, sans-serif; color: #2b2b2b; line-height: 1.6;">
        <h2 style="margin: 0 0 20px; color: #1f3d2b;">Novi upit sa sajta Kuća domaće hrane</h2>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e0d8; width: 220px;"><strong>Naziv firme</strong></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e0d8;">${safeFirma}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e0d8;"><strong>Kontakt osoba</strong></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e0d8;">${safeIme}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e0d8;"><strong>Telefon</strong></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e0d8;">${safeTelefon}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e0d8;"><strong>Email</strong></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e0d8;">${safeEmail}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e0d8;"><strong>Lokacija</strong></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e0d8;">${safeLokacija}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e0d8;"><strong>Broj zaposlenih</strong></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e0d8;">${safeBrojZaposlenih}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e0d8;"><strong>Kada im treba usluga</strong></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e0d8;">${safeKadaTreba}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e0d8;"><strong>Tip usluge</strong></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e0d8;">${safeTipUsluge}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e0d8;"><strong>Trenutni model obroka</strong></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e0d8;">${safeTrenutniModel}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e0d8;"><strong>Specifične potrebe</strong></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e0d8;">${safePosebniRezim}</td>
          </tr>
        </table>

        <div style="margin-top: 24px;">
          <p style="margin: 0 0 8px;"><strong>Poruka</strong></p>
          <div style="padding: 14px 16px; background: #f8f5ef; border: 1px solid #e5e0d8; border-radius: 12px;">
            ${safePoruka}
          </div>
        </div>
      </div>
    `;

    const adminText = `
Novi upit sa sajta Kuća domaće hrane

Naziv firme: ${firma}
Kontakt osoba: ${ime}
Telefon: ${telefon}
Email: ${email}
Lokacija: ${lokacija}
Broj zaposlenih: ${brojZaposlenih}
Kada im treba usluga: ${kadaTreba}
Tip usluge: ${tipUsluge}
Trenutni model obroka: ${trenutniModel || "Nije navedeno"}
Specifične potrebe: ${posebniRezimTekst}
Poruka: ${poruka || "Nije navedeno"}
    `.trim();

    const adminResult = await resend.emails.send({
      from: "Kuća domaće hrane <onboarding@resend.dev>",
      to: "marinaprsic@gmail.com",
      replyTo: email,
      subject: `Novi upit sa sajta — ${firma}`,
      html: adminHtml,
      text: adminText,
    });

    if (adminResult.error) {
      return Response.json(
        {
          error:
            "Došlo je do greške prilikom slanja upita. Molimo pokušajte ponovo ili nas kontaktirajte direktno putem telefona.",
        },
        { status: 500 }
      );
    }

    const userHtml = `
      <div style="font-family: Arial, Helvetica, sans-serif; color: #2b2b2b; line-height: 1.6;">
        <h2 style="margin: 0 0 16px; color: #1f3d2b;">Potvrda prijema upita</h2>

        <p>Poštovani,</p>

        <p>
          Vaš upit je uspešno primljen. Nakon pregleda dostavljenih podataka,
          javljamo vam se sa konkretnim predlogom saradnje.
        </p>

        <p style="margin-top: 24px;">
          Srdačno,<br />
          <strong>Kuća domaće hrane</strong>
        </p>
      </div>
    `;

    const userText = `
Potvrda prijema upita

Poštovani,

Vaš upit je uspešno primljen. Nakon pregleda dostavljenih podataka, javljamo vam se sa konkretnim predlogom saradnje.

Srdačno,
Kuća domaće hrane
    `.trim();

    const userResult = await resend.emails.send({
      from: "Kuća domaće hrane <onboarding@resend.dev>",
      to: email,
      subject: "Potvrda prijema upita — Kuća domaće hrane",
      html: userHtml,
      text: userText,
    });

    if (userResult.error) {
      console.error("Auto potvrda korisniku nije poslata:", userResult.error);
    }

    return Response.json({ success: true }, { status: 200 });
  } catch {
    return Response.json(
      {
        error:
          "Došlo je do greške prilikom slanja upita. Molimo pokušajte ponovo ili nas kontaktirajte direktno putem telefona.",
      },
      { status: 500 }
    );
  }
}