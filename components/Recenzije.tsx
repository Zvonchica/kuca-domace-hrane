export default function Recenzije() {
  const reviews = [
    {
      text: "Od kada radimo sa njima, ručak više nije tema oko koje gubimo vreme. Sve je uredno, jasno i ukusno.",
      author: "Mali tim iz kancelarije",
    },
    {
      text: "Najviše nam znači što je saradnja jednostavna. Nema komplikacija, a obroci su domaći i pouzdani.",
      author: "Agencija od 8 zaposlenih",
    },
    {
      text: "Kada imaš radni dan pun sastanaka, mnogo znači da znaš da je ručak već rešen.",
      author: "Privatna ordinacija",
    },
    {
      text: "Hrana je domaća, porcije su ozbiljne i sve stiže na vreme. To nam je najvažnije.",
      author: "Mali IT tim",
    },
    {
      text: "Konačno smo rešili organizaciju ručka bez stresa i svakodnevnog dogovaranja.",
      author: "Kancelarija od 6 ljudi",
    },
    {
      text: "Uvek uredno spakovano, toplo i tačno na vreme. Saradnja bez greške.",
      author: "Računovodstvena firma",
    },
  ];

  return (
    <section
      id="recenzije"
      className="relative scroll-mt-[var(--header-offset)] overflow-hidden bg-[#1b3429] py-12 sm:py-14 lg:py-16"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#162d23_0%,#1b3429_50%,#1e3a2d_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(212,185,142,0.12),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(116,150,126,0.10),transparent_24%),radial-gradient(circle_at_50%_84%,rgba(212,185,142,0.08),transparent_26%)]" />
        <div className="absolute left-[-40px] top-10 h-[180px] w-[180px] rounded-full bg-[#d5b88e]/10 blur-3xl sm:h-[240px] sm:w-[240px]" />
        <div className="absolute right-[-60px] bottom-6 h-[200px] w-[200px] rounded-full bg-[#9ab39c]/10 blur-3xl sm:h-[260px] sm:w-[260px]" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d9c2a0] sm:text-xs">
            Iskustva klijenata
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:mt-4 sm:text-4xl lg:text-5xl">
            Šta kažu firme
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/78 sm:text-base lg:text-lg">
            Saradnja koja štedi vreme, olakšava organizaciju i donosi domaći
            obrok bez svakodnevnog dogovaranja.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
          {reviews.map((item) => (
            <article
              key={item.text}
              className="group relative overflow-hidden rounded-[26px] border border-white/18 bg-white/[0.12] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#d6c1a0]/35 hover:bg-white/[0.14] sm:p-6"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_34%)] opacity-80" />

              <div className="relative">
                <div className="mb-4 text-[16px] tracking-[2px] text-[#d9b15c]">
                  ★★★★★
                </div>

                <p className="text-[15px] leading-7 text-white/92 sm:text-base">
                  “{item.text}”
                </p>

                <div className="mt-5 h-px w-full bg-white/10" />

                <div className="mt-4">
                  <p className="text-sm font-semibold text-white">
                    {item.author}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}