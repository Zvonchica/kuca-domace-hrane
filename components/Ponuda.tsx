type OfferItem = {
  label: string;
  title: string;
  desc: string;
  bullets: string[];
  dark?: boolean;
};

const offers: OfferItem[] = [
  {
    label: "Dnevni obrok",
    title: "Po potrebi",
    desc: "Za firme kojima je potreban kvalitetan ručak bez obaveze dugog planiranja. Praktično, jasno i fleksibilno.",
    bullets: [
      "kuvano za taj dan",
      "supa ili čorba",
      "glavno jelo",
      "prilog i salata",
    ],
  },
  {
    label: "Nedeljni plan",
    title: "Kontinuitet bez razmišljanja",
    desc: "Najbolji izbor za timove koji žele da ručak bude unapred rešen, organizovan i lak za svakodnevno funkcionisanje.",
    bullets: [
      "meni za celu nedelju",
      "unapred dogovoreno",
      "stabilan ritam isporuke",
      "manje improvizacije i više reda",
    ],
    dark: true,
  },
];

export default function Ponuda() {
  return (
    <section
      id="ponuda"
      className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8"
    >
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Dve opcije saradnje
      </h2>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        {offers.map((offer) => (
          <div
            key={offer.title}
            className={
              offer.dark
                ? "rounded-3xl bg-[#1f3d2b] p-7 text-white shadow-md sm:p-10"
                : "rounded-3xl bg-white p-7 shadow-md sm:p-10"
            }
          >
            <div className={offer.dark ? "text-sm text-white/80" : "text-sm text-[#1f3d2b]"}>
              {offer.label}
            </div>

            <h3 className="mt-2 text-2xl font-semibold">{offer.title}</h3>

            <p className={offer.dark ? "mt-3 leading-8 text-white/80" : "mt-3 leading-8 text-[#555]"}>
              {offer.desc}
            </p>

            <ul className={offer.dark ? "mt-4 space-y-2 text-white/80" : "mt-4 space-y-2 text-[#555]"}>
              {offer.bullets.map((bullet) => (
                <li key={bullet}>• {bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}