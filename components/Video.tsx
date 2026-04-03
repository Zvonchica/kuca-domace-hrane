"use client";

import { useEffect, useRef, useState } from "react";

type VideoItem = {
  title: string;
  desc: string;
  src: string;
};

const videos: VideoItem[] = [
  {
    title: "Priprema današnjeg menija",
    desc: "Kuvanje domaćih jela za firme.",
    src: "/video/video-1.mp4",
  },
  {
    title: "Topla kuhinja u radu",
    desc: "Organizovan proces i pažljiva priprema.",
    src: "/video/video-2.mp4",
  },
  {
    title: "Pakovanje obroka",
    desc: "Uredno, čisto i spremno za isporuku.",
    src: "/video/video-3.mp4",
  },
  {
    title: "Detalji serviranja",
    desc: "Poverenje se gradi i izgledom.",
    src: "/video/video-4.mp4",
  },
];

export default function Video() {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  const scrollByAmount = (direction: "left" | "right") => {
    if (!sliderRef.current) return;

    const amount = sliderRef.current.clientWidth * 0.72;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveVideo(null);
      }
    };

    if (activeVideo) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeVideo]);

  return (
    <>
      <section
        id="video"
        className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#1f3d2b]">
            Uvid u rad
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#1f1f1c] sm:text-4xl lg:text-5xl">
            Kako izgleda u praksi
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#5f5f59] sm:text-lg">
            Kratki prikaz pripreme, pakovanja i svakodnevnog ritma rada.
          </p>
        </div>

        <div className="mt-6 hidden items-center justify-center gap-4 md:flex">
          <button
            type="button"
            aria-label="Prethodni video"
            onClick={() => scrollByAmount("left")}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d9ddd7] bg-white text-[#1f3d2b] shadow-sm transition hover:border-[#cfd6d0] hover:bg-[#f8faf7]"
          >
            ←
          </button>

          <button
            type="button"
            aria-label="Sledeći video"
            onClick={() => scrollByAmount("right")}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d9ddd7] bg-white text-[#1f3d2b] shadow-sm transition hover:border-[#cfd6d0] hover:bg-[#f8faf7]"
          >
            →
          </button>
        </div>

        <div
          ref={sliderRef}
          className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-5"
        >
          {videos.map((item) => (
            <article
              key={item.title}
              className="min-w-[82%] snap-center rounded-[26px] border border-[#e7e7e2] bg-white p-3 shadow-[0_8px_22px_rgba(0,0,0,0.05)] sm:min-w-[58%] md:min-w-[31.5%] lg:min-w-[23.8%]"
            >
              <button
                type="button"
                onClick={() => setActiveVideo(item)}
                className="block w-full text-left"
                aria-label={`Otvori video: ${item.title}`}
              >
                <div className="overflow-hidden rounded-[22px] border border-[#e4e4de] bg-[#f1f1eb]">
                  <div className="relative aspect-[9/14] w-full bg-[#d9d9d3]">
                    <video
                      className="h-full w-full object-cover"
                      playsInline
                      preload="none"
                      muted
                    >
                      <source src={item.src} type="video/mp4" />
                    </video>

                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/88 text-[#1f3d2b] shadow-[0_8px_24px_rgba(0,0,0,0.16)]">
                        <span className="ml-0.5 text-lg">▶</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-1 pb-1 pt-4">
                  <h3 className="text-lg font-semibold leading-snug text-[#1f1f1c]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-[#5f5f59]">
                    {item.desc}
                  </p>
                </div>
              </button>
            </article>
          ))}
        </div>
      </section>

      {activeVideo && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 p-4 sm:p-6"
          onClick={() => setActiveVideo(null)}
        >
          <div className="flex h-full w-full items-center justify-center">
            <div
              className="relative w-full max-w-[420px] sm:max-w-[460px] md:max-w-[520px]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Zatvori video"
                onClick={() => setActiveVideo(null)}
                className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white backdrop-blur transition hover:bg-white/20"
              >
                ✕
              </button>

              <div className="overflow-hidden rounded-[24px] bg-black shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
                <video
                  key={activeVideo.src}
                  className="h-auto w-full"
                  controls
                  playsInline
                  autoPlay
                >
                  <source src={activeVideo.src} type="video/mp4" />
                </video>
              </div>

              <div className="mt-4 text-center text-white">
                <h3 className="text-lg font-semibold sm:text-xl">
                  {activeVideo.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-white/80 sm:text-base">
                  {activeVideo.desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}