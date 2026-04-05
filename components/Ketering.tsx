import Image from "next/image";

export default function Ketering() {
  return (
    <section
      id="ketering"
      className="relative w-full scroll-mt-[80px] overflow-hidden"
    >
      <div className="relative h-[360px] sm:h-[470px] lg:h-[560px]">
        <Image
          src="/images/ketering-posluzenje-kanapei.webp"
          alt="Ketering posluženje"
          fill
          priority={false}
          sizes="100vw"
          className="object-cover object-[72%_78%]"
        />

        <div className="absolute inset-0 bg-black/12 sm:bg-black/14 lg:bg-black/18" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/42 via-black/16 to-transparent sm:from-black/44 sm:via-black/16 lg:from-black/52 lg:via-black/22 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/8 via-transparent to-black/14 sm:from-black/8 sm:to-black/16 lg:from-black/10 lg:to-black/18" />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="max-w-[320px] rounded-[22px] bg-black/14 p-4 text-white backdrop-blur-[2px] sm:max-w-[540px] sm:bg-transparent sm:p-0 sm:backdrop-blur-0 lg:ml-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/80 sm:text-xs">
              Ketering
            </p>

            <h2 className="mt-2 max-w-[280px] text-[28px] font-semibold leading-[1.02] tracking-[-0.01em] sm:mt-3 sm:max-w-xl sm:text-[44px] lg:text-[56px]">
              Ketering za firme i proslave
            </h2>

            <p className="mt-3 max-w-[280px] text-sm leading-6 text-white/92 sm:mt-5 sm:max-w-xl sm:text-lg sm:leading-8">
              Priprema hrane za manje događaje, poslovne sastanke, rođendane i
              okupljanja.
            </p>

            <div className="mt-4 space-y-1.5 text-sm text-white/92 sm:mt-6 sm:space-y-2.5 sm:text-base lg:text-lg">
              <div>• Manji poslovni događaji</div>
              <div>• Rođendani i proslave</div>
              <div>• Posna i standardna ponuda</div>
              <div>• Dogovor prema vašim potrebama</div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-7 sm:gap-4">
              <a
                href="#kontakt"
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#1f3d2b] shadow-sm transition hover:bg-[#f2f2ef] sm:px-8 sm:py-3.5 sm:text-base"
              >
                Zatražite ponudu
              </a>

              <p className="hidden text-sm text-white/82 sm:block sm:text-base">
                Za manje događaje i dogovorene isporuke
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}