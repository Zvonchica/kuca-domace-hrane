"use client";

import { FormEvent, useState } from "react";

type StatusType = "idle" | "success" | "error";

export default function Kontakt() {
  const [firma, setFirma] = useState("");
  const [ime, setIme] = useState("");
  const [telefon, setTelefon] = useState("");
  const [email, setEmail] = useState("");
  const [lokacija, setLokacija] = useState("");
  const [brojZaposlenih, setBrojZaposlenih] = useState("");
  const [kadaTreba, setKadaTreba] = useState("");
  const [tipUsluge, setTipUsluge] = useState("");
  const [trenutniModel, setTrenutniModel] = useState("");
  const [posebniRezim, setPosebniRezim] = useState<string[]>([]);
  const [poruka, setPoruka] = useState("");

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<StatusType>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  function togglePosebniRezim(vrednost: string) {
    setPosebniRezim((prev) =>
      prev.includes(vrednost)
        ? prev.filter((item) => item !== vrednost)
        : [...prev, vrednost]
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setStatus("idle");
    setStatusMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firma,
          ime,
          telefon,
          email,
          lokacija,
          brojZaposlenih,
          kadaTreba,
          tipUsluge,
          trenutniModel,
          posebniRezim,
          poruka,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error ||
            "Došlo je do greške prilikom slanja upita. Molimo pokušajte ponovo ili nas kontaktirajte direktno putem telefona."
        );
      }

      setStatus("success");
      setStatusMessage(
        "Upit je uspešno primljen. Nakon pregleda vaših podataka, javljamo vam se sa konkretnim predlogom saradnje."
      );

      setFirma("");
      setIme("");
      setTelefon("");
      setEmail("");
      setLokacija("");
      setBrojZaposlenih("");
      setKadaTreba("");
      setTipUsluge("");
      setTrenutniModel("");
      setPosebniRezim([]);
      setPoruka("");
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Došlo je do greške prilikom slanja upita. Molimo pokušajte ponovo ili nas kontaktirajte direktno putem telefona."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="kontakt"
      className="scroll-mt-[80px] w-full bg-[#f8f5ef] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <span className="inline-flex rounded-full border border-[#e2d8c8] bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6d5c49] sm:text-xs">
            Zatražite ponudu
          </span>

          <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#2b2b2b] sm:text-4xl lg:text-5xl">
            Recite nam šta vam je potrebno
          </h2>

          <p className="mt-4 text-base leading-relaxed text-[#5c5c5c] sm:text-lg">
            Pošaljite osnovne podatke i potrebu firme. Dobijate jasan predlog
            saradnje bez komplikacije.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
          <div className="overflow-hidden rounded-[28px] border border-[#e7dfd2] bg-white shadow-[0_20px_60px_rgba(31,61,43,0.06)]">
            <div className="border-b border-[#efe7db] px-5 py-5 sm:px-7 sm:py-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7b6a57]">
                Kontakt forma
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-[#2b2b2b] sm:text-3xl">
                Pošaljite upit
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#62584d] sm:text-base">
                Ostavite podatke i napišite ukratko šta vam je potrebno. Na
                osnovu toga šaljemo predlog za dnevne obroke, mesečni ili
                nedeljni model, kao i za ketering.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-5 sm:p-7">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firma"
                    className="mb-2 block text-sm font-semibold text-[#3b342d]"
                  >
                    Naziv firme <span className="text-[#8b2d2d]">*</span>
                  </label>
                  <input
                    id="firma"
                    name="firma"
                    type="text"
                    value={firma}
                    onChange={(e) => setFirma(e.target.value)}
                    placeholder="Naziv firme"
                    className={inputClassName}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="ime"
                    className="mb-2 block text-sm font-semibold text-[#3b342d]"
                  >
                    Kontakt osoba <span className="text-[#8b2d2d]">*</span>
                  </label>
                  <input
                    id="ime"
                    name="ime"
                    type="text"
                    value={ime}
                    onChange={(e) => setIme(e.target.value)}
                    placeholder="Ime i prezime"
                    className={inputClassName}
                    required
                  />
                </div>
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="telefon"
                    className="mb-2 block text-sm font-semibold text-[#3b342d]"
                  >
                    Telefon <span className="text-[#8b2d2d]">*</span>
                  </label>
                  <input
                    id="telefon"
                    name="telefon"
                    type="tel"
                    value={telefon}
                    onChange={(e) => setTelefon(e.target.value)}
                    placeholder="Unesite broj telefona"
                    className={inputClassName}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-[#3b342d]"
                  >
                    Email <span className="text-[#8b2d2d]">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ime@firma.com"
                    className={inputClassName}
                    required
                  />
                </div>
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="lokacija"
                    className="mb-2 block text-sm font-semibold text-[#3b342d]"
                  >
                    Lokacija <span className="text-[#8b2d2d]">*</span>
                  </label>
                  <input
                    id="lokacija"
                    name="lokacija"
                    type="text"
                    value={lokacija}
                    onChange={(e) => setLokacija(e.target.value)}
                    placeholder="Grad / opština"
                    className={inputClassName}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="brojZaposlenih"
                    className="mb-2 block text-sm font-semibold text-[#3b342d]"
                  >
                    Broj zaposlenih <span className="text-[#8b2d2d]">*</span>
                  </label>
                  <select
                    id="brojZaposlenih"
                    name="brojZaposlenih"
                    value={brojZaposlenih}
                    onChange={(e) => setBrojZaposlenih(e.target.value)}
                    className={inputClassName}
                    required
                  >
                    <option value="">Izaberite</option>
                    <option value="1-10">1–10</option>
                    <option value="11-20">11–20</option>
                    <option value="21-50">21–50</option>
                    <option value="51+">51+</option>
                  </select>
                </div>
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="kadaTreba"
                    className="mb-2 block text-sm font-semibold text-[#3b342d]"
                  >
                    Kada vam treba usluga{" "}
                    <span className="text-[#8b2d2d]">*</span>
                  </label>
                  <select
                    id="kadaTreba"
                    name="kadaTreba"
                    value={kadaTreba}
                    onChange={(e) => setKadaTreba(e.target.value)}
                    className={inputClassName}
                    required
                  >
                    <option value="">Izaberite</option>
                    <option value="Odmah">Odmah</option>
                    <option value="Sledeće nedelje">Sledeće nedelje</option>
                    <option value="Uskoro / planiramo">
                      Uskoro / planiramo
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="tipUsluge"
                    className="mb-2 block text-sm font-semibold text-[#3b342d]"
                  >
                    Tip usluge <span className="text-[#8b2d2d]">*</span>
                  </label>
                  <select
                    id="tipUsluge"
                    name="tipUsluge"
                    value={tipUsluge}
                    onChange={(e) => setTipUsluge(e.target.value)}
                    className={inputClassName}
                    required
                  >
                    <option value="">Izaberite</option>
                    <option value="Dnevni obroci za firmu">
                      Dnevni obroci za firmu
                    </option>
                    <option value="Nedeljni meni">Nedeljni meni</option>
                    <option value="Mesečni model ishrane">
                      Mesečni model ishrane
                    </option>
                    <option value="Mini ketering">Mini ketering</option>
                    <option value="Ketering za događaj">
                      Ketering za događaj
                    </option>
                    <option value="Obroci po posebnom režimu">
                      Obroci po posebnom režimu
                    </option>
                    <option value="Po dogovoru">Po dogovoru</option>
                  </select>
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="trenutniModel"
                  className="mb-2 block text-sm font-semibold text-[#3b342d]"
                >
                  Kako trenutno rešavate obroke?
                </label>
                <select
                  id="trenutniModel"
                  name="trenutniModel"
                  value={trenutniModel}
                  onChange={(e) => setTrenutniModel(e.target.value)}
                  className={inputClassName}
                >
                  <option value="">Izaberite</option>
                  <option value="Nemamo organizovano">Nemamo organizovano</option>
                  <option value="Poručujemo dostavu">
                    Poručujemo dostavu
                  </option>
                  <option value="Imamo kuhinju">Imamo kuhinju</option>
                  <option value="Kombinujemo">Kombinujemo</option>
                </select>
              </div>

              <div className="mt-5">
                <p className="mb-3 block text-sm font-semibold text-[#3b342d]">
                  Specifične potrebe
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    "Posno",
                    "Bez glutena",
                    "Bez svinjetine",
                    "Nema posebnih zahteva",
                  ].map((item) => (
                    <label
                      key={item}
                      className="flex items-center gap-3 rounded-2xl border border-[#ddd4c7] bg-[#fcfbf8] px-4 py-3 text-sm text-[#2b2b2b] transition hover:border-[#1f3d2b]/40"
                    >
                      <input
                        type="checkbox"
                        checked={posebniRezim.includes(item)}
                        onChange={() => togglePosebniRezim(item)}
                        className="h-4 w-4 accent-[#1f3d2b]"
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="poruka"
                  className="mb-2 block text-sm font-semibold text-[#3b342d]"
                >
                  Poruka
                </label>
                <textarea
                  id="poruka"
                  name="poruka"
                  rows={6}
                  value={poruka}
                  onChange={(e) => setPoruka(e.target.value)}
                  placeholder="Napišite ukratko šta vam je potrebno, za koliko osoba i od kada."
                  className={`${inputClassName} resize-none`}
                />
              </div>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex min-h-[56px] items-center justify-center rounded-full bg-[#1f3d2b] px-7 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#295238] hover:shadow-lg disabled:cursor-not-allowed disabled:bg-[#8a948d] disabled:hover:translate-y-0 disabled:hover:shadow-none sm:text-base"
                >
                  {loading ? "Obrada upita u toku..." : "Pošaljite upit"}
                </button>

                <p className="text-sm leading-relaxed text-[#6a6054]">
                  Odgovaramo u najkraćem roku.
                </p>
              </div>

              {status !== "idle" && (
                <div
                  className={`mt-5 rounded-2xl border px-4 py-3 text-sm leading-relaxed sm:text-base ${
                    status === "success"
                      ? "border-[#cfe2d4] bg-[#f3faf5] text-[#214930]"
                      : "border-[#f1d1d1] bg-[#fff5f5] text-[#8b2d2d]"
                  }`}
                >
                  {statusMessage}
                </div>
              )}
            </form>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-[28px] bg-[#1f3d2b] p-6 text-white shadow-[0_20px_60px_rgba(31,61,43,0.12)] sm:p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                Direktan kontakt
              </p>
              <h3 className="mt-2 text-2xl font-semibold sm:text-3xl">
                Brz dogovor
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">
                Za hitne upite možete nam pisati i direktno. Za konkretnu ponudu
                ipak je najbolje da popunite formu.
              </p>

              <div className="mt-6 space-y-4">
                <a
                  href="https://wa.me/381603007743"
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-2xl border border-white/15 bg-white/10 px-5 py-4 transition hover:bg-white/15"
                >
                  <p className="text-sm text-white/70">WhatsApp</p>
                  <p className="mt-1 text-lg font-semibold">+381 60 300 7743</p>
                </a>

                <a
                  href="mailto:marinaprsic@gmail.com"
                  className="block rounded-2xl border border-white/15 bg-white/10 px-5 py-4 transition hover:bg-white/15"
                >
                  <p className="text-sm text-white/70">Email</p>
                  <p className="mt-1 break-all text-lg font-semibold">
                    marinaprsic@gmail.com
                  </p>
                </a>
              </div>
            </div>

            <div className="rounded-[28px] border border-[#e7dfd2] bg-white p-6 shadow-[0_20px_60px_rgba(31,61,43,0.06)] sm:p-7">
              <h3 className="text-2xl font-semibold text-[#2b2b2b]">
                Kako funkcioniše
              </h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[#62584d] sm:text-base">
                <li>Pošaljete osnovne podatke i potrebu.</li>
                <li>Mi pregledamo upit i javljamo se sa predlogom.</li>
                <li>Dogovaramo model saradnje i isporuku.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const inputClassName =
  "w-full rounded-2xl border border-[#ddd4c7] bg-[#fcfbf8] px-4 py-3 text-[#2b2b2b] outline-none transition placeholder:text-[#9c9083] focus:border-[#1f3d2b] focus:bg-white focus:ring-4 focus:ring-[#1f3d2b]/10";