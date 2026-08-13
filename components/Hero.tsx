import Image from "next/image";

export default function Hero() {
  return (
    <section id="pocetna" className="relative scroll-mt-[var(--header-offset)] flex min-h-[500px] items-center justify-center overflow-hidden sm:min-h-[560px] lg:min-h-[640px]">
      <Image
        src="/images/hero-food.webp"
        alt="Domaća kuvana hrana Maka i Ika"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/28 sm:bg-black/35 lg:bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/38 sm:from-black/12 sm:via-black/30 sm:to-black/45 lg:from-black/15 lg:via-black/35 lg:to-black/50" />

      <div className="relative z-10 mx-auto flex w-full items-center justify-center px-4 pb-10 pt-6 sm:px-6 sm:pb-12 sm:pt-8 lg:px-8 lg:pb-16 lg:pt-12">
        <div className="max-w-3xl text-center text-white">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#f2d79b] sm:text-sm">Maka i Ika – domaća kuhinja</p>
          <h1 className="text-[34px] font-semibold leading-[1.04] tracking-tight sm:text-[46px] lg:text-[58px] xl:text-[64px]">
            Domaće, sveže i kuvano
            <br />
            kao za svoje.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-7 text-white/90 sm:text-xl sm:leading-8">
            Kuvamo svakog dana u manjim količinama, od pažljivo odabranih namirnica, za ručak koji se pamti po domaćem ukusu.
          </p>

          <div className="mt-6 space-y-2.5 text-[15px] text-white/90 sm:text-base lg:text-lg">
            <div>✔ Dnevna kuvana jela i stalna ponuda</div>
            <div>✔ Direktna porudžbina i lično preuzimanje uz 10% popusta</div>
            <div>✔ Banovo brdo · Požeška 78 · Wolt i Glovo</div>
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href="#meni"
              className="inline-flex items-center justify-center rounded-lg bg-[#1f6b53] px-8 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-[#17523f]"
            >
              Pogledajte dnevni meni
            </a>
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center rounded-lg border border-white/65 bg-white/10 px-8 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-white/20"
            >
              Poručite
            </a>
          </div>

          <p className="mt-4 text-sm text-white/90 sm:text-base">Ograničene količine – dok traju zalihe.</p>
        </div>
      </div>
    </section>
  );
}
