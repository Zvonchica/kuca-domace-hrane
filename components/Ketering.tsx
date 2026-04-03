import Image from "next/image";

export default function Ketering() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[420px] sm:h-[500px] lg:h-[560px]">
        <Image
          src="/images/ketering-posluzenje-kanapei.webp"
          alt="Ketering posluženje"
          fill
          priority={false}
          sizes="100vw"
          className="object-cover object-[62%_80%]"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-[#1f3d2b]/35" />

        {/* content */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl text-white">
            <p className="text-sm uppercase tracking-[0.18em] text-white/80">
              Ketering
            </p>

            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              Ketering za firme i proslave
            </h2>

            <p className="mt-4 text-base leading-8 text-white/85 sm:text-lg">
              Priprema hrane za manje događaje — poslovne sastanke,
              rođendane i okupljanja. Domaća kuhinja i organizacija po dogovoru.
            </p>

            <ul className="mt-6 space-y-2 text-white/85">
              <li>• Manji poslovni događaji</li>
              <li>• Rođendani i proslave</li>
              <li>• Posna i standardna ponuda</li>
              <li>• Dogovor prema vašim potrebama</li>
            </ul>

            <a
              href="#kontakt"
              className="mt-8 inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-medium text-[#1f3d2b] transition hover:bg-[#f2f2ef]"
            >
              Zatražite ponudu
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}