import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative scroll-mt-[80px] flex min-h-[500px] items-center justify-center overflow-hidden sm:min-h-[560px] lg:min-h-[640px]">
      <Image
        src="/images/hero-food.webp"
        alt="Domaća kuvana hrana"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/35 to-black/50" />

      <div className="relative z-10 mx-auto flex w-full items-center justify-center px-4 pt-6 pb-10 sm:px-6 sm:pt-8 sm:pb-12 lg:px-8 lg:pt-12 lg:pb-16">
        <div className="max-w-3xl text-center text-white">
          <h1 className="text-[34px] font-semibold leading-[1.04] tracking-tight sm:text-[46px] lg:text-[58px] xl:text-[64px]">
            Ručak za vaš tim —
            <br />
            bez stresa i planiranja
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-7 text-white/90 sm:text-xl sm:leading-8">
            Domaći kuvani obroci za firme. Dogovor unapred, pouzdana dostava i
            zadovoljan tim — svaki dan.
          </p>

          <div className="mt-6 space-y-2.5 text-[15px] text-white/90 sm:text-base lg:text-lg">
            <div>✔ Nema više pitanja „šta danas za ručak”</div>
            <div>✔ Dogovor unapred — bez svakodnevne organizacije</div>
            <div>✔ Pouzdana dostava svaki radni dan</div>
          </div>

          <div className="mt-7 flex justify-center">
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center rounded-lg bg-[#1f6b53] px-8 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-[#17523f]"
            >
              Zatražite ponudu
            </a>
          </div>

          <p className="mt-4 text-sm text-white/90 sm:text-base">
            Bez obaveze • Odgovor u toku dana
          </p>
        </div>
      </div>
    </section>
  );
}