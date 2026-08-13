type OfferItem = {
  label: string;
  title: string;
  desc: string;
  bullets: string[];
  dark?: boolean;
};

const offers: OfferItem[] = [
  {
    label: "Stalna ponuda",
    title: "Uvek domaće",
    desc: "Uz svako jelo iz stalne ponude uključen je jedan prilog od 200 g. Dostupnost priloga se potvrđuje pri poručivanju.",
    bullets: [
      "Bečka šnicla od svinjetine — 950 din",
      "Pohovana piletina — 950 din",
      "Pileći štapići sa susamom — 950 din",
      "Belo pileće meso iz tiganja — 950 din",
      "Sočni svinjski vrat — 990 din",
      "Pohovani kačkavalj — 900 din",
    ],
  },
  {
    label: "Salate i paprike",
    title: "Uz ručak, po vašem ukusu",
    desc: "Dnevna raspoloživost se potvrđuje pri poručivanju, a cene važe za navedene količine.",
    bullets: [
      "Kupus salata — 200 g · 210 din",
      "Krompir salata sa crnim lukom — 200 g · 260 din",
      "Šopska salata — 200 g · 390 din",
      "Vitaminska salata — 200 g · 260 din",
      "Belolučane paprike — 2 kom · 440 din",
      "Pečene ljute paprike — 2 kom · 380 din",
    ],
    dark: true,
  },
  {
    label: "Veće porudžbine",
    title: "Porodična pakovanja i pite",
    desc: "Za veću količinu salata, priloga i pite u celom plehu dogovaramo porudžbinu unapred.",
    bullets: [
      "Salate i prilozi u pakovanjima od 500 g i 1 kg",
      "Pita sa krompirom — od 410 din",
      "Pita sa mesom, zeljanica i gibanica — od 510 din",
      "Celi pleh pite — od 3.500 din",
    ],
  },
];

export default function Ponuda() {
  return (
    <section
      id="ponuda"
      className="scroll-mt-[var(--header-offset)] mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8"
    >
      <div className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#1f3d2b]">
          Stalna ponuda
        </p>

        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#1f1f1c] sm:text-4xl lg:text-5xl">
          Domaći izbor za svaki dan
        </h2>

        <p className="mt-4 max-w-2xl text-base leading-8 text-[#5f5f59] sm:text-lg">
          Dnevno kuvamo ograničene količine, a ove omiljene opcije dostupne su kada želite nešto provereno domaće.
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {offers.map((offer) => (
          <article
            key={offer.title}
            className={
              offer.dark
                ? "group flex h-full flex-col rounded-[28px] border border-[#234633] bg-[#1f3d2b] p-7 text-white shadow-[0_10px_28px_rgba(0,0,0,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(0,0,0,0.14)] sm:p-8 lg:p-9"
                : "group flex h-full flex-col rounded-[28px] border border-[#e7e7e2] bg-white p-7 text-[#2f2f2f] shadow-[0_8px_22px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#d8ddd7] hover:shadow-[0_16px_38px_rgba(0,0,0,0.09)] sm:p-8 lg:p-9"
            }
          >
            <div
              className={
                offer.dark
                  ? "inline-flex w-fit rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium tracking-[0.08em] text-white/85"
                  : "inline-flex w-fit rounded-full border border-[#dce3dc] bg-[#f6f8f5] px-3 py-1 text-xs font-medium tracking-[0.08em] text-[#1f3d2b]"
              }
            >
              {offer.label}
            </div>

            <h3 className="mt-5 text-[28px] font-semibold leading-tight tracking-tight sm:text-[32px]">
              {offer.title}
            </h3>

            <p
              className={
                offer.dark
                  ? "mt-4 text-base leading-8 text-white/82 sm:text-[17px]"
                  : "mt-4 text-base leading-8 text-[#5f5f59] sm:text-[17px]"
              }
            >
              {offer.desc}
            </p>

            <ul className="mt-6 space-y-3">
              {offer.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className={
                    offer.dark
                      ? "flex items-start gap-3 text-[15px] leading-7 text-white/85 sm:text-base"
                      : "flex items-start gap-3 text-[15px] leading-7 text-[#5f5f59] sm:text-base"
                  }
                >
                  <span
                    className={
                      offer.dark
                        ? "mt-[9px] h-2 w-2 shrink-0 rounded-full bg-white/85"
                        : "mt-[9px] h-2 w-2 shrink-0 rounded-full bg-[#1f3d2b]"
                    }
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto" />

            <a
              href="#kontakt"
              className={
                offer.dark
                  ? "mt-8 inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-medium text-[#1f3d2b] transition duration-200 hover:bg-[#f2f2ef]"
                  : "mt-8 inline-flex items-center justify-center rounded-lg bg-[#1f3d2b] px-5 py-3 text-sm font-medium text-white transition duration-200 hover:bg-[#28543c]"
              }
            >
              Poručite direktno
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}