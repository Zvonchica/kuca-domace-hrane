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
      className="relative scroll-mt-[var(--header-offset)] overflow-hidden bg-[#1b3429] py-16 sm:py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#1a3328_0%,#1d372c_22%,#213d31_48%,#244336_72%,#27483a_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(212,185,142,0.10),transparent_24%),radial-gradient(circle_at_78%_20%,rgba(110,146,121,0.12),transparent_28%),radial-gradient(circle_at_50%_78%,rgba(212,185,142,0.08),transparent_24%)]" />
        <div className="absolute left-1/2 top-24 h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-[#d5b88e]/10 blur-3xl sm:h-[360px] sm:w-[360px]" />
        <div className="absolute right-[-80px] top-[26%] h-[240px] w-[240px] rounded-full bg-[#9ab39c]/10 blur-3xl sm:h-[340px] sm:w-[340px]" />
        <div className="absolute bottom-[-80px] left-[-40px] h-[220px] w-[220px] rounded-full bg-[#d7c29b]/10 blur-3xl sm:h-[300px] sm:w-[300px]" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#dcc6a2] backdrop-blur-md sm:text-xs">
            Zatražite ponudu
          </span>

          <h2 className="mt-5 text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
            Recite nam šta vam je potrebno
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/78 sm:text-lg">
            Za dnevne i nedeljne obroke, model saradnje za firmu ili ketering
            ponudu. Pošaljite podatke, a mi vam se javljamo sa jasnim i
            konkretnim predlogom.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-5 lg:grid-cols-3">
          <div className="rounded-[26px] border border-white/18 bg-white/[0.14] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d9c2a0]">
              Direktan kontakt
            </p>
            <h3 className="mt-3 text-2xl font-semibold leading-tight text-white">
              Brz i jasan dogovor
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/78 sm:text-base">
              Ako želite, možete nam pisati i direktno. Za najprecizniju ponudu
              ipak savetujemo da popunite formu.
            </p>

            <div className="mt-5 space-y-3">
              <a
                href="https://wa.me/381603007743"
                target="_blank"
                rel="noreferrer"
                className="block rounded-2xl border border-white/16 bg-white/[0.16] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-md transition hover:border-[#d6c1a0]/40 hover:bg-white/[0.18]"
              >
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#cdb894]">
                  WhatsApp / telefon
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  +381 60 300 7743
                </p>
              </a>

              <a
                href="mailto:marinaprsic@gmail.com"
                className="block rounded-2xl border border-white/16 bg-white/[0.16] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-md transition hover:border-[#d6c1a0]/40 hover:bg-white/[0.18]"
              >
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#cdb894]">
                  Email
                </p>
                <p className="mt-2 break-all text-lg font-semibold text-white">
                  marinaprsic@gmail.com
                </p>
              </a>
            </div>
          </div>

          <div className="rounded-[26px] border border-white/18 bg-white/[0.14] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d9c2a0]">
              Za firme
            </p>
            <h3 className="mt-3 text-2xl font-semibold leading-tight text-white">
              Profesionalno i bez komplikacije
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/78 sm:text-base">
              Saradnja je namenjena firmama, timovima, kancelarijama,
              sastancima, događajima i poslovima koji traže pouzdanu i ukusnu
              organizaciju obroka.
            </p>

            <div className="mt-5 space-y-3 text-sm leading-relaxed text-white/82 sm:text-base">
              <p>• dnevni i nedeljni obroci za zaposlene</p>
              <p>• mini ketering i poslovni događaji</p>
              <p>• modeli saradnje po dogovoru i potrebama firme</p>
            </div>
          </div>

          <div className="rounded-[26px] border border-white/18 bg-white/[0.14] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d9c2a0]">
              Kako ide proces
            </p>
            <h3 className="mt-3 text-2xl font-semibold leading-tight text-white">
              Brzo, jasno i uredno
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/78 sm:text-base">
              Nakon prijema upita pregledamo vaše potrebe i javljamo se sa
              predlogom saradnje, količinama i narednim koracima.
            </p>

            <div className="mt-5 space-y-3 text-sm leading-relaxed text-white/82 sm:text-base">
              <p>1. Pošaljete podatke i zahtev</p>
              <p>2. Mi pregledamo upit i predlog</p>
              <p>3. Dogovaramo model saradnje i isporuku</p>
            </div>
          </div>
        </div>

        <div className="relative mt-8 sm:mt-10">
          <div className="absolute -inset-[1px] rounded-[30px] bg-[linear-gradient(135deg,rgba(221,196,160,0.34),rgba(162,185,166,0.10),rgba(255,255,255,0.08))] blur-sm" />

          <div className={mainPanelClassName}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(217,194,160,0.10),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(120,158,131,0.10),transparent_28%)]" />

            <div className="relative border-b border-white/10 px-5 py-6 sm:px-7 sm:py-7 lg:px-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d9c2a0]">
                Kontakt forma
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                Pošaljite upit za ponudu
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/76 sm:text-base">
                Popunite podatke ispod. Što više informacija ostavite, to ćemo
                vam poslati precizniji predlog za dnevne obroke, nedeljni ili
                mesečni model, kao i za ketering.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="relative px-5 py-6 sm:px-7 sm:py-7 lg:px-8 lg:py-8"
            >
              <div className="grid gap-8">
                <div>
                  <p className="mb-4 text-base font-semibold text-white sm:text-lg">
                    Osnovni podaci
                  </p>

                  <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="firma"
                        className="mb-2 block text-sm font-semibold text-white/88"
                      >
                        Naziv firme <span className="text-[#e6aaaa]">*</span>
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
                        className="mb-2 block text-sm font-semibold text-white/88"
                      >
                        Kontakt osoba <span className="text-[#e6aaaa]">*</span>
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

                    <div>
                      <label
                        htmlFor="telefon"
                        className="mb-2 block text-sm font-semibold text-white/88"
                      >
                        Telefon <span className="text-[#e6aaaa]">*</span>
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
                        className="mb-2 block text-sm font-semibold text-white/88"
                      >
                        Email <span className="text-[#e6aaaa]">*</span>
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
                </div>

                <div className="h-px w-full bg-white/10" />

                <div>
                  <p className="mb-4 text-base font-semibold text-white sm:text-lg">
                    Detalji zahteva
                  </p>

                  <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="lokacija"
                        className="mb-2 block text-sm font-semibold text-white/88"
                      >
                        Lokacija <span className="text-[#e6aaaa]">*</span>
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
                        className="mb-2 block text-sm font-semibold text-white/88"
                      >
                        Broj zaposlenih <span className="text-[#e6aaaa]">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="brojZaposlenih"
                          name="brojZaposlenih"
                          value={brojZaposlenih}
                          onChange={(e) => setBrojZaposlenih(e.target.value)}
                          className={selectClassName}
                          required
                        >
                          <option value="" className="bg-white text-black">
                            Izaberite
                          </option>
                          <option value="1-10" className="bg-white text-black">
                            1–10
                          </option>
                          <option value="11-20" className="bg-white text-black">
                            11–20
                          </option>
                          <option value="21-50" className="bg-white text-black">
                            21–50
                          </option>
                          <option value="51+" className="bg-white text-black">
                            51+
                          </option>
                        </select>
                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#1f1f1c]/70">
                          ▾
                        </span>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="kadaTreba"
                        className="mb-2 block text-sm font-semibold text-white/88"
                      >
                        Kada vam treba usluga <span className="text-[#e6aaaa]">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="kadaTreba"
                          name="kadaTreba"
                          value={kadaTreba}
                          onChange={(e) => setKadaTreba(e.target.value)}
                          className={selectClassName}
                          required
                        >
                          <option value="" className="bg-white text-black">
                            Izaberite
                          </option>
                          <option value="Odmah" className="bg-white text-black">
                            Odmah
                          </option>
                          <option
                            value="Sledeće nedelje"
                            className="bg-white text-black"
                          >
                            Sledeće nedelje
                          </option>
                          <option
                            value="Uskoro / planiramo"
                            className="bg-white text-black"
                          >
                            Uskoro / planiramo
                          </option>
                        </select>
                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#1f1f1c]/70">
                          ▾
                        </span>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="tipUsluge"
                        className="mb-2 block text-sm font-semibold text-white/88"
                      >
                        Tip usluge <span className="text-[#e6aaaa]">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="tipUsluge"
                          name="tipUsluge"
                          value={tipUsluge}
                          onChange={(e) => setTipUsluge(e.target.value)}
                          className={selectClassName}
                          required
                        >
                          <option value="" className="bg-white text-black">
                            Izaberite
                          </option>
                          <option
                            value="Dnevni obroci za firmu"
                            className="bg-white text-black"
                          >
                            Dnevni obroci za firmu
                          </option>
                          <option
                            value="Nedeljni meni"
                            className="bg-white text-black"
                          >
                            Nedeljni meni
                          </option>
                          <option
                            value="Mesečni model ishrane"
                            className="bg-white text-black"
                          >
                            Mesečni model ishrane
                          </option>
                          <option
                            value="Mini ketering"
                            className="bg-white text-black"
                          >
                            Mini ketering
                          </option>
                          <option
                            value="Ketering za događaj"
                            className="bg-white text-black"
                          >
                            Ketering za događaj
                          </option>
                          <option
                            value="Obroci po posebnom režimu"
                            className="bg-white text-black"
                          >
                            Obroci po posebnom režimu
                          </option>
                          <option
                            value="Po dogovoru"
                            className="bg-white text-black"
                          >
                            Po dogovoru
                          </option>
                        </select>
                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#1f1f1c]/70">
                          ▾
                        </span>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label
                        htmlFor="trenutniModel"
                        className="mb-2 block text-sm font-semibold text-white/88"
                      >
                        Kako trenutno rešavate obroke?
                      </label>
                      <div className="relative">
                        <select
                          id="trenutniModel"
                          name="trenutniModel"
                          value={trenutniModel}
                          onChange={(e) => setTrenutniModel(e.target.value)}
                          className={selectClassName}
                        >
                          <option value="" className="bg-white text-black">
                            Izaberite
                          </option>
                          <option
                            value="Nemamo organizovano"
                            className="bg-white text-black"
                          >
                            Nemamo organizovano
                          </option>
                          <option
                            value="Poručujemo dostavu"
                            className="bg-white text-black"
                          >
                            Poručujemo dostavu
                          </option>
                          <option
                            value="Imamo kuhinju"
                            className="bg-white text-black"
                          >
                            Imamo kuhinju
                          </option>
                          <option
                            value="Kombinujemo"
                            className="bg-white text-black"
                          >
                            Kombinujemo
                          </option>
                        </select>
                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#1f1f1c]/70">
                          ▾
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-px w-full bg-white/10" />

                <div>
                  <p className="mb-4 text-base font-semibold text-white sm:text-lg">
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
                        className="flex min-h-[58px] cursor-pointer items-center gap-3 rounded-2xl border border-white/12 bg-white/90 px-4 py-3 text-sm text-[#1f1f1c] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-md transition hover:border-[#d6c1a0]/60 hover:bg-white"
                      >
                        <input
                          type="checkbox"
                          checked={posebniRezim.includes(item)}
                          onChange={() => togglePosebniRezim(item)}
                          className="h-4 w-4 shrink-0 rounded border-[#cdb894] accent-[#1f3d2b]"
                        />
                        <span className="leading-relaxed">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="poruka"
                    className="mb-2 block text-sm font-semibold text-white/88"
                  >
                    Poruka
                  </label>
                  <textarea
                    id="poruka"
                    name="poruka"
                    rows={7}
                    value={poruka}
                    onChange={(e) => setPoruka(e.target.value)}
                    placeholder="Napišite ukratko šta vam je potrebno, za koliko osoba i od kada."
                    className={`${inputClassName} min-h-[180px] resize-none py-4`}
                  />
                </div>

                <div className="flex flex-col gap-4 border-t border-white/10 pt-6 sm:pt-7 md:flex-row md:items-center md:justify-between ">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex min-h-[54px] w-full items-center justify-center rounded-lg border border-[#d6c1a0] bg-white px-7 py-3 text-sm font-semibold text-[#1f3d2b] transition-all duration-200 hover:border-[#cbb38d] hover:bg-[#f9f7f2] md:w-auto shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                  >
                    {loading ? "Obrada..." : "Zatražite ponudu"}

                  </button>

                  <p className="max-w-md text-sm leading-relaxed text-white/66 md:text-right">
                    Odgovaramo u najkraćem roku sa konkretnim predlogom saradnje.
                  </p>
                </div>

                {status !== "idle" && (
                  <div
                    className={`rounded-2xl border px-4 py-3 text-sm leading-relaxed sm:text-base ${status === "success"
                      ? "border-[#4e7a59] bg-[#1e3a29]/90 text-[#d7f1dc]"
                      : "border-[#7f4141] bg-[#3a1f1f]/90 text-[#ffd2d2]"
                      }`}
                  >
                    {statusMessage}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

const mainPanelClassName =
  "relative overflow-hidden rounded-[30px] border border-white/14 bg-white/[0.08] shadow-[0_28px_90px_rgba(0,0,0,0.24)] backdrop-blur-2xl";

const panelClassName =
  "rounded-[26px] border border-white/14 bg-white/[0.08] shadow-[0_28px_90px_rgba(0,0,0,0.24)] backdrop-blur-2xl p-5 sm:p-6";

const innerPanelClassName =
  "block rounded-2xl border border-white/12 bg-white/[0.10] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-md transition hover:border-[#d6c1a0]/40 hover:bg-white/[0.13]";

const autofillClass =
  "[&:-webkit-autofill]:[-webkit-text-fill-color:#1f1f1c] [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_rgba(255,255,255,0.92)] [&:-webkit-autofill:hover]:shadow-[inset_0_0_0px_1000px_rgba(255,255,255,0.92)] [&:-webkit-autofill:focus]:shadow-[inset_0_0_0px_1000px_rgba(255,255,255,0.96)]";

const inputClassName =
  `h-[56px] w-full rounded-2xl border border-white/12 bg-white/90 px-4 text-[15px] text-[#1f1f1c] caret-[#1f1f1c] outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-md transition placeholder:text-[#7a7a72] focus:border-[#d6c1a0]/55 focus:bg-white focus:text-[#1f1f1c] focus:ring-4 focus:ring-[#d6c1a0]/12 ${autofillClass}`;

const selectClassName =
  "h-[56px] w-full appearance-none rounded-2xl border border-white/12 bg-white/90 px-4 pr-12 text-[15px] text-[#1f1f1c] outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-md transition focus:border-[#d6c1a0]/55 focus:bg-white focus:text-[#1f1f1c] focus:ring-4 focus:ring-[#d6c1a0]/12";