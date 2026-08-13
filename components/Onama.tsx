export default function Onama() {
  return (
    <section id="onama" className="scroll-mt-[var(--header-offset)] py-0">
      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/o-nama-hrana.webp')" }} />
        <div className="absolute inset-0 bg-black/18 sm:bg-black/22 lg:bg-black/28" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/6 via-black/10 to-black/22 sm:from-black/8 sm:via-black/14 sm:to-black/24 lg:from-black/10 lg:via-black/18 lg:to-black/28" />

        <div className="h-[700px] w-full sm:h-[680px] lg:h-[760px]" />

        <div className="absolute inset-0 flex items-end justify-center px-4 pb-6 sm:items-center sm:px-6 sm:pb-0 lg:px-10">
          <div className="w-full max-w-3xl rounded-[24px] bg-black/18 p-5 backdrop-blur-[2px] sm:rounded-none sm:bg-transparent sm:p-0 sm:backdrop-blur-0">
            <div className="w-full text-left text-white sm:text-center">
              <div className="mb-3 text-[11px] uppercase tracking-[0.2em] text-white/78 sm:mb-4 sm:text-sm" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.35)" }}>O nama</div>
              <h2 className="max-w-md text-3xl font-semibold leading-tight tracking-tight sm:mx-auto sm:max-w-2xl sm:text-4xl md:text-5xl lg:text-6xl" style={{ textShadow: "0 3px 16px rgba(0,0,0,0.38)" }}>
                Kuvamo za druge onako kako kuvamo za svoje.
              </h2>
              <p className="mt-4 max-w-md text-lg leading-7 text-white/95 sm:mx-auto sm:max-w-2xl sm:text-xl sm:leading-8" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.32)" }}>
                Maka i Ika je domaća kuhinja nastala iz jednostavne ideje – da svaki ručak bude pripremljen sa pažnjom.
              </p>

              <div className="mt-5 max-w-md space-y-3 text-sm leading-6 text-white/90 sm:mx-auto sm:mt-6 sm:max-w-2xl sm:space-y-4 sm:text-base sm:leading-7 lg:max-w-3xl" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.28)" }}>
                <p>Biramo namirnice sa lokalnih pijaca i od proverenih dobavljača, vodeći se istim kriterijumom kojim biramo hranu za sopstvenu porodicu.</p>
                <p>Koristimo domaća jaja, sveže povrće i kvalitetno meso. Jela označena kao juneća pripremamo od junetine, dok je svinjetina jasno navedena tamo gde se koristi.</p>
                <p>Kuvamo svakog dana, u manjim količinama. Ne želimo industrijski pristup niti hranu koja danima čeka kupca.</p>
                <p className="font-medium text-white">Ono što ne bismo stavili na svoj sto, nećemo staviti ni na vaš.</p>
              </div>

              <div className="mt-7 flex justify-start sm:mt-10 sm:justify-center lg:mt-12">
                <a href="#meni" className="inline-flex min-h-[52px] items-center justify-center rounded-lg bg-[#1f3d2b] px-7 py-3.5 text-base font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#28543c] sm:px-8 sm:py-4 sm:text-lg">Pogledajte dnevni meni</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
