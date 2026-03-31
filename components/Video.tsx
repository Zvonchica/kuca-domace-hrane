"use client";

type VideoItem = {
  id: number;
  title: string;
  desc: string;
};

const videoItems: VideoItem[] = [
  { id: 1, title: "Priprema današnjeg menija", desc: "Kuvanje domaćih jela za firme" },
  { id: 2, title: "Topla kuhinja u radu", desc: "Organizovan proces i pažljiva priprema" },
  { id: 3, title: "Pakovanje obroka", desc: "Uredno, čisto i spremno za isporuku" },
  { id: 4, title: "Detalji serviranja", desc: "Poverenje se gradi i izgledom" },
  { id: 5, title: "Spremno za polazak", desc: "Obroci organizovani za dostavu" },
  { id: 6, title: "Isporuka za tim", desc: "Pouzdano i u dogovoreno vreme" },
  { id: 7, title: "Domaći kuvani ručak", desc: "Hrana koja vraća energiju radnom danu" },
  { id: 8, title: "Kvalitetne namirnice", desc: "Osnova svakog ozbiljnog obroka" },
  { id: 9, title: "Radna atmosfera kuhinje", desc: "Ozbiljno, toplo i profesionalno" },
  { id: 10, title: "Svaki dan bez improvizacije", desc: "Stabilan sistem za firme" },
];

export default function Video() {
  const scrollByAmount = (direction: "left" | "right") => {
    const track = document.getElementById("video-track");
    if (!track) return;

    const amount = window.innerWidth < 640 ? 280 : window.innerWidth < 1024 ? 360 : 420;
    track.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="video"
      className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8"
    >
      <div className="flex flex-col gap-4">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Kako izgleda u praksi
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[#555]">
            Kratki prikaz pripreme, pakovanja i svakodnevnog ritma rada.
          </p>
        </div>

        <div className="flex justify-center gap-3">
          <button
            onClick={() => scrollByAmount("left")}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d7ddd8] bg-white text-lg text-[#1f3d2b] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f5f7f5]"
            aria-label="Prethodni video"
          >
            ←
          </button>
          <button
            onClick={() => scrollByAmount("right")}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d7ddd8] bg-white text-lg text-[#1f3d2b] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f5f7f5]"
            aria-label="Sledeći video"
          >
            →
          </button>
        </div>
      </div>

      <div
        id="video-track"
        className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {videoItems.map((item) => (
          <article
            key={item.id}
            className="min-w-[82%] snap-start overflow-hidden rounded-3xl bg-white p-3 shadow-md sm:min-w-[48%] lg:min-w-[31%] xl:min-w-[23.5%]"
          >
            <div className="relative aspect-[4/5] rounded-2xl bg-[#e3e3de]">
              <div className="absolute inset-0 flex items-center justify-center text-sm text-[#222]">
                video
              </div>

              <div className="absolute inset-x-0 bottom-4 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/92 text-lg shadow-sm backdrop-blur-sm">
                  <span className="ml-1 text-[#1f3d2b]">▶</span>
                </div>
              </div>
            </div>

            <div className="mt-4 text-base font-semibold text-[#333]">{item.title}</div>
            <div className="mt-1 text-sm leading-6 text-[#222]">{item.desc}</div>
          </article>
        ))}
      </div>
    </section>
  );
}