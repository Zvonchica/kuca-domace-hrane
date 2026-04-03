import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex min-h-[560px] items-center justify-center overflow-hidden sm:min-h-[620px] lg:min-h-[720px]">
      <Image
        src="/images/hero-food.webp"
        alt="Domaća kuvana hrana"
        fill
        priority
        fetchPriority="high"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/50" />

      <div className="relative z-10 mx-auto flex w-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl text-center text-white">
          <h1 className="text-[38px] font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[64px] xl:text-[72px]">
            Ručak za vaš tim —
            <br />
            bez stresa i planiranja
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-xl leading-8 text-white/90">
            Domaći kuvani obroci za firme. Dogovor unapred, pouzdana dostava i
            zadovoljan tim — svaki dan.
          </p>

          <div className="mt-7 space-y-3 text-base text-white/90 sm:text-lg">
            <div>✔ Nema više pitanja “šta danas za ručak”</div>
            <div>✔ Dogovor unapred — bez svakodnevne organizacije</div>
            <div>✔ Pouzdana dostava svaki radni dan</div>
          </div>

          <div className="mt-8 flex justify-center">
            <a
              href="#kontakt"
              className="rounded-lg bg-[#1f6b53] px-9 py-4 text-lg font-semibold text-white shadow-sm transition hover:bg-[#17523f]"
            >
              Zatražite ponudu
            </a>
          </div>

          <p className="mt-4 text-base text-white/90">
            Bez obaveze • Odgovor u toku dana
          </p>
        </div>
      </div>
    </section>
  );
}