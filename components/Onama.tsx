export default function Onama() {
  return (
    <section
      id="onama"
      className="scroll-mt-[var(--header-offset)] py-0"
    >
      <div className="relative w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/o-nama-hrana.webp')" }}
        />

        <div className="absolute inset-0 bg-black/18 sm:bg-black/22 lg:bg-black/28" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/6 via-black/10 to-black/22 sm:from-black/8 sm:via-black/14 sm:to-black/24 lg:from-black/10 lg:via-black/18 lg:to-black/28" />

        <div className="h-[700px] w-full sm:h-[680px] lg:h-[760px]" />

        <div className="absolute inset-0 flex items-end justify-center px-4 pb-6 sm:items-center sm:px-6 sm:pb-0 lg:px-10">
          <div className="w-full max-w-3xl rounded-[24px] bg-black/18 p-5 backdrop-blur-[2px] sm:rounded-none sm:bg-transparent sm:p-0 sm:backdrop-blur-0">
            <div className="w-full text-left text-white sm:text-center">
              <div
                className="mb-3 text-[11px] uppercase tracking-[0.2em] text-white/78 sm:mb-4 sm:text-sm"
                style={{ textShadow: "0 2px 10px rgba(0,0,0,0.35)" }}
              >
                O nama
              </div>

              <h2
                className="max-w-md text-3xl font-semibold leading-tight tracking-tight sm:mx-auto sm:max-w-2xl sm:text-4xl md:text-5xl lg:text-6xl"
                style={{ textShadow: "0 3px 16px rgba(0,0,0,0.38)" }}
              >
                Domaća kuhinja koja se pamti
              </h2>

              <p
                className="mt-4 max-w-md text-lg leading-7 text-white/95 sm:mx-auto sm:max-w-2xl sm:text-xl sm:leading-8"
                style={{ textShadow: "0 2px 10px rgba(0,0,0,0.32)" }}
              >
                Hrana pripremljena sa pažnjom, iz kuhinje u kojoj se kuva kako
                treba.
              </p>

              <div
                className="mt-5 max-w-md space-y-4 text-base leading-7 text-white/90 sm:mx-auto sm:mt-6 sm:max-w-2xl sm:space-y-5 sm:text-lg sm:leading-8 lg:max-w-3xl"
                style={{ textShadow: "0 2px 10px rgba(0,0,0,0.28)" }}
              >
                <p>
                  Ova kuhinja nastala je iz navike da se za stolom okuplja uz
                  dobru, domaću hranu — onu koja se pamti.
                </p>

                <p>
                  Baka koja kuva stoji iza svakog obroka — sa iskustvom i
                  sigurnošću koja se ne može naučiti preko noći.
                </p>

                <p>
                  Znanje iz tradicionalne kuhinje prilagodili smo tempu modernih
                  firmi, bez kompromisa kada je u pitanju kvalitet.
                </p>

                <p className="font-medium text-white">
                  Pouzdan, domaći ručak na koji možete da se oslonite — svaki
                  dan.
                </p>
              </div>

              <div className="mt-7 flex justify-start sm:mt-10 sm:justify-center lg:mt-12">
                <a
                  href="#ponuda"
                  className="inline-flex min-h-[52px] items-center justify-center rounded-lg bg-[#1f3d2b] px-7 py-3.5 text-base font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#28543c] sm:px-8 sm:py-4 sm:text-lg"
                >
                  Pogledajte ponudu
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}