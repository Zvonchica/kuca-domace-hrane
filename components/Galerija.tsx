"use client";

type GalleryItem = {
  id: number;
  label: string;
};

const galleryItems: GalleryItem[] = [
  { id: 1, label: "Dnevni meni" },
  { id: 2, label: "Topli kuvani obroci" },
  { id: 3, label: "Detalj serviranja" },
  { id: 4, label: "Pakovanje za dostavu" },
  { id: 5, label: "Domaća supa ili čorba" },
  { id: 6, label: "Glavno jelo dana" },
  { id: 7, label: "Prilog i salata" },
  { id: 8, label: "Uredna prezentacija" },
  { id: 9, label: "Kuhinja u radu" },
  { id: 10, label: "Obrok za tim" },
];

export default function Galerija() {
  const scrollByAmount = (direction: "left" | "right") => {
    const track = document.getElementById("gallery-track");
    if (!track) return;

    const amount = window.innerWidth < 640 ? 280 : window.innerWidth < 1024 ? 360 : 420;
    track.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="galerija"
      className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8"
    >
      <div className="flex flex-col gap-4">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Galerija obroka
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[#555]">
            Fotografije hrane, detalja i urednog pakovanja koje grade poverenje.
          </p>
        </div>

        <div className="flex justify-center gap-3">
          <button
            onClick={() => scrollByAmount("left")}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d7ddd8] bg-white text-lg text-[#1f3d2b] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f5f7f5]"
            aria-label="Prethodna fotografija"
          >
            ←
          </button>
          <button
            onClick={() => scrollByAmount("right")}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d7ddd8] bg-white text-lg text-[#1f3d2b] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f5f7f5]"
            aria-label="Sledeća fotografija"
          >
            →
          </button>
        </div>
      </div>

      <div
        id="gallery-track"
        className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {galleryItems.map((item) => (
          <article
            key={item.id}
            className="min-w-[82%] snap-start overflow-hidden rounded-3xl bg-white p-3 shadow-md sm:min-w-[48%] lg:min-w-[31%] xl:min-w-[23.5%]"
          >
            <div className="aspect-[4/5] rounded-2xl bg-[#e3e3de]" />
            <div className="mt-4 text-sm leading-6 text-[#666]">
              {item.label} — obrok / posluženje / detalj
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}