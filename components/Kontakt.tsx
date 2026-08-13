"use client";

import { FormEvent, useState } from "react";
import { business, links } from "@/data/site";

type StatusType = "idle" | "success" | "error";
type InquiryType = "kupac" | "firma";

export default function Kontakt() {
  const [inquiryType, setInquiryType] = useState<InquiryType>("kupac");
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [mealCount, setMealCount] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<StatusType>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const isCompany = inquiryType === "firma";

  function resetForm() {
    setCompany("");
    setName("");
    setPhone("");
    setEmail("");
    setMealCount("");
    setLocation("");
    setMessage("");
    setWebsite("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("idle");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inquiryType, company, name, phone, email, mealCount, location, message, website }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Došlo je do greške prilikom slanja upita. Molimo pozovite nas direktno.");

      setStatus("success");
      setStatusMessage("Hvala. Vaš upit je primljen i javićemo vam se u najkraćem roku.");
      resetForm();
    } catch (error) {
      setStatus("error");
      setStatusMessage(error instanceof Error ? error.message : "Došlo je do greške prilikom slanja upita. Molimo pozovite nas direktno.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="kontakt" className="relative scroll-mt-[calc(var(--header-offset)+10px)] overflow-hidden bg-[#1b3429] py-10 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#1a3328_0%,#1d372c_22%,#213d31_48%,#244336_72%,#27483a_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(212,185,142,0.10),transparent_24%),radial-gradient(circle_at_78%_20%,rgba(110,146,121,0.12),transparent_28%),radial-gradient(circle_at_50%_78%,rgba(212,185,142,0.08),transparent_24%)]" />
        <div className="absolute left-1/2 top-24 h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-[#d5b88e]/10 blur-3xl sm:h-[360px] sm:w-[360px]" />
        <div className="absolute right-[-80px] top-[26%] h-[240px] w-[240px] rounded-full bg-[#9ab39c]/10 blur-3xl sm:h-[340px] sm:w-[340px]" />
        <div className="absolute bottom-[-80px] left-[-40px] h-[220px] w-[220px] rounded-full bg-[#d7c29b]/10 blur-3xl sm:h-[300px] sm:w-[300px]" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#dcc6a2] backdrop-blur-md sm:text-xs">Kontakt i poručivanje</span>
          <h2 className="mt-4 text-3xl font-semibold leading-tight text-white sm:mt-5 sm:text-4xl lg:text-5xl">Tu smo za vaš ručak ili pitanje</h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-white/78 sm:mt-4 sm:text-lg">Za najbržu porudžbinu pozovite nas direktno. Formu možete koristiti za pitanja, planirane porudžbine i ponude za firme.</p>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-5 lg:grid-cols-3">
          <InfoCard eyebrow="Direktan kontakt" title="Pozovite ili pišite" text="Dostupnost dnevnih jela najbrže proveravate direktnim pozivom ili porukom.">
            <a href={links.phone} className={contactLinkClass}><span>Telefon</span><strong>{business.phoneDisplay}</strong></a>
            <a href={links.whatsapp} target="_blank" rel="noreferrer" className={contactLinkClass}><span>WhatsApp</span><strong>Pošaljite nam poruku</strong></a>
            <a href={links.email} className={contactLinkClass}><span>Email</span><strong className="break-all">{business.email}</strong></a>
          </InfoCard>

          <InfoCard eyebrow="Poručivanje" title="Direktno i jednostavno" text="Za direktnu porudžbinu i lično preuzimanje u lokalu odobravamo 10% popusta na redovnu cenu.">
            <a href={links.wolt} target="_blank" rel="noreferrer" className={contactLinkClass}><span>Wolt</span><strong>Poručite preko Wolta</strong></a>
            <a href={links.glovo} target="_blank" rel="noreferrer" className={contactLinkClass}><span>Glovo</span><strong>Poručite preko Glova</strong></a>
          </InfoCard>

          <InfoCard eyebrow="Za firme" title="Domaći ručkovi za zaposlene" text="Za redovnu saradnju pripremamo obroke za timove uz jasan dogovor i unapred planiranu količinu.">
            <div className="mt-5 space-y-3 text-sm leading-relaxed text-white/82 sm:text-base">
              <p>• minimum {business.corporateMinimumMeals} obroka po isporuci</p>
              <p>• {business.corporateDiscount}% popusta za firme</p>
              <p>• mogućnost redovne saradnje</p>
              <a href={links.maps} target="_blank" rel="noreferrer" className="inline-flex pt-1 font-semibold text-[#e4cd9e] underline-offset-4 hover:underline">Požeška 78, Banovo brdo</a>
            </div>
          </InfoCard>
        </div>

        <div className="relative mt-8 sm:mt-10">
          <div className="absolute -inset-[1px] rounded-[30px] bg-[linear-gradient(135deg,rgba(221,196,160,0.34),rgba(162,185,166,0.10),rgba(255,255,255,0.08))] blur-sm" />
          <div className={mainPanelClassName}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(217,194,160,0.10),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(120,158,131,0.10),transparent_28%)]" />
            <div className="relative border-b border-white/10 px-5 py-6 sm:px-7 sm:py-7 lg:px-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d9c2a0]">Kontakt forma</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" onClick={() => setInquiryType("kupac")} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${!isCompany ? "bg-white text-[#1f3d2b]" : "border border-white/20 text-white/84 hover:bg-white/10"}`}>Direktna porudžbina</button>
                <button type="button" onClick={() => setInquiryType("firma")} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${isCompany ? "bg-white text-[#1f3d2b]" : "border border-white/20 text-white/84 hover:bg-white/10"}`}>Ponuda za firmu</button>
              </div>
              <h3 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">{isCompany ? "Zatražite ponudu za firmu" : "Pošaljite nam upit"}</h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/76 sm:text-base">{isCompany ? `Redovna saradnja za timove od najmanje ${business.corporateMinimumMeals} obroka po isporuci.` : "Za direktnu porudžbinu pozovite nas. Formu koristite za pitanja i planirane porudžbine."}</p>
            </div>

            <form onSubmit={handleSubmit} className="relative px-5 py-6 sm:px-7 sm:py-7 lg:px-8 lg:py-8">
              <input tabIndex={-1} aria-hidden="true" value={website} onChange={(event) => setWebsite(event.target.value)} className="absolute h-px w-px opacity-0" autoComplete="off" name="website" />
              <div className="grid gap-8">
                <div>
                  <p className="mb-4 text-base font-semibold text-white sm:text-lg">Osnovni podaci</p>
                  <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
                    {isCompany && <Field label="Naziv firme" required><input value={company} onChange={(event) => setCompany(event.target.value)} className={inputClassName} required placeholder="Naziv firme" /></Field>}
                    <Field label="Kontakt osoba" required><input value={name} onChange={(event) => setName(event.target.value)} className={inputClassName} required placeholder="Ime i prezime" /></Field>
                    <Field label="Telefon" required><input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} className={inputClassName} required placeholder="Unesite broj telefona" /></Field>
                    <Field label="Email" required><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className={inputClassName} required placeholder="ime@primer.rs" /></Field>
                  </div>
                </div>

                <div className="h-px w-full bg-white/10" />
                <div>
                  <p className="mb-4 text-base font-semibold text-white sm:text-lg">Detalji upita</p>
                  <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
                    {isCompany && <Field label="Približan broj obroka" required><input value={mealCount} onChange={(event) => setMealCount(event.target.value)} className={inputClassName} required placeholder="Na primer: 15" /></Field>}
                    <Field label="Lokacija" required><input value={location} onChange={(event) => setLocation(event.target.value)} className={inputClassName} required placeholder={isCompany ? "Grad / opština firme" : "Grad / opština"} /></Field>
                    <div className={isCompany ? "md:col-span-2" : ""}>
                      <label htmlFor="message" className="mb-2 block text-sm font-semibold text-white/88">Poruka <span className="text-white/55">(opciono)</span></label>
                      <textarea id="message" rows={6} value={message} onChange={(event) => setMessage(event.target.value)} placeholder={isCompany ? "Recite nam nešto više o potrebama tima." : "Napišite nam šta vam je potrebno."} className={`${inputClassName} min-h-[160px] resize-none py-4`} />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 border-t border-white/10 pt-6 sm:pt-7 md:flex-row md:items-center md:justify-between">
                  <button type="submit" disabled={loading} className="inline-flex min-h-[54px] w-full items-center justify-center rounded-lg border border-[#d6c1a0] bg-white px-7 py-3 text-sm font-semibold text-[#1f3d2b] shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-200 hover:border-[#cbb38d] hover:bg-[#f9f7f2] disabled:cursor-not-allowed disabled:opacity-70 md:w-auto">{loading ? "Obrada..." : isCompany ? "Zatražite ponudu za firmu" : "Pošaljite upit"}</button>
                  <p className="max-w-md text-sm leading-relaxed text-white/66 md:text-right">Odgovaramo u najkraćem roku. Za hitnu dnevnu porudžbinu pozovite nas direktno.</p>
                </div>
                {status !== "idle" && <div className={`rounded-2xl border px-4 py-3 text-sm leading-relaxed sm:text-base ${status === "success" ? "border-[#4e7a59] bg-[#1e3a29]/90 text-[#d7f1dc]" : "border-[#7f4141] bg-[#3a1f1f]/90 text-[#ffd2d2]"}`}>{statusMessage}</div>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ eyebrow, title, text, children }: { eyebrow: string; title: string; text: string; children: React.ReactNode }) {
  return <div className="rounded-[26px] border border-white/18 bg-white/[0.14] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:p-6"><p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d9c2a0]">{eyebrow}</p><h3 className="mt-3 text-2xl font-semibold leading-tight text-white">{title}</h3><p className="mt-3 text-sm leading-relaxed text-white/78 sm:text-base">{text}</p><div className="mt-5 space-y-3">{children}</div></div>;
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return <div><label className="mb-2 block text-sm font-semibold text-white/88">{label}{required && <span className="text-[#e6aaaa]"> *</span>}</label>{children}</div>;
}

const contactLinkClass = "block rounded-2xl border border-white/16 bg-white/[0.16] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-md transition hover:border-[#d6c1a0]/40 hover:bg-white/[0.18]";
const mainPanelClassName = "relative overflow-hidden rounded-[30px] border border-white/14 bg-white/[0.08] shadow-[0_28px_90px_rgba(0,0,0,0.24)] backdrop-blur-2xl";
const autofillClass = "[&:-webkit-autofill]:[-webkit-text-fill-color:#1f1f1c] [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_rgba(255,255,255,0.92)] [&:-webkit-autofill:hover]:shadow-[inset_0_0_0px_1000px_rgba(255,255,255,0.92)] [&:-webkit-autofill:focus]:shadow-[inset_0_0_0px_1000px_rgba(255,255,255,0.96)]";
const inputClassName = `h-[56px] w-full rounded-2xl border border-white/12 bg-white/90 px-4 text-[15px] text-[#1f1f1c] caret-[#1f1f1c] outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-md transition placeholder:text-[#7a7a72] focus:border-[#d6c1a0]/55 focus:bg-white focus:text-[#1f1f1c] focus:ring-4 focus:ring-[#d6c1a0]/12 ${autofillClass}`;
