"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type VideoItem = {
  id: number;
  title: string;
  videoSrc: string;
};

const videoItems: VideoItem[] = [
  { id: 1, title: "Priprema domaćih obroka", videoSrc: "/video/video-1.mp4" },
  { id: 2, title: "Domaća kuhinja za firme", videoSrc: "/video/video-2.mp4" },
  { id: 3, title: "Uredno serviranje", videoSrc: "/video/video-3.mp4" },
  { id: 4, title: "Pakovanje obroka", videoSrc: "/video/video-4.mp4" },
  { id: 5, title: "Topla domaća hrana", videoSrc: "/video/video-5.mp4" },
  { id: 6, title: "Dnevni meni za kancelarije", videoSrc: "/video/video-6.mp4" },
  { id: 7, title: "Kuvanje u toku dana", videoSrc: "/video/video-7.mp4" },
  { id: 8, title: "Detalji pripreme", videoSrc: "/video/video-8.mp4" },
  { id: 9, title: "Obroci za timove", videoSrc: "/video/video-9.mp4" },
  { id: 10, title: "Bez stresa do toplog obroka", videoSrc: "/video/video-10.mp4" },
];

function wrapIndex(index: number, total: number) {
  return (index + total) % total;
}

export default function Video() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [failedVideos, setFailedVideos] = useState<Record<string, boolean>>({});

  const desktopScrollerRef = useRef<HTMLDivElement | null>(null);
  const mobileScrollerRef = useRef<HTMLDivElement | null>(null);
  const lightboxVideoRef = useRef<HTMLVideoElement | null>(null);
  const cardVideoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

  const activeItem = useMemo(() => videoItems[activeIndex], [activeIndex]);

  const goPrev = () => {
    setActiveIndex((prev) => wrapIndex(prev - 1, videoItems.length));
  };

  const goNext = () => {
    setActiveIndex((prev) => wrapIndex(prev + 1, videoItems.length));
  };

  const scrollCardInsideScroller = (index: number) => {
    const desktopScroller = desktopScrollerRef.current;
    const mobileScroller = mobileScrollerRef.current;

    if (desktopScroller) {
      const desktopCard = desktopScroller.querySelector(
        `[data-video-index="${index}"]`
      ) as HTMLElement | null;

      if (desktopCard) {
        const scrollerRect = desktopScroller.getBoundingClientRect();
        const cardRect = desktopCard.getBoundingClientRect();

        const targetLeft =
          desktopScroller.scrollLeft +
          (cardRect.left - scrollerRect.left) -
          (scrollerRect.width / 2 - cardRect.width / 2);

        desktopScroller.scrollTo({
          left: Math.max(0, targetLeft),
          behavior: "smooth",
        });
      }
    }

    if (mobileScroller) {
      const mobileCard = mobileScroller.querySelector(
        `[data-video-index="${index}"]`
      ) as HTMLElement | null;

      if (mobileCard) {
        const scrollerRect = mobileScroller.getBoundingClientRect();
        const cardRect = mobileCard.getBoundingClientRect();

        const targetLeft =
          mobileScroller.scrollLeft +
          (cardRect.left - scrollerRect.left) -
          (scrollerRect.width / 2 - cardRect.width / 2);

        mobileScroller.scrollTo({
          left: Math.max(0, targetLeft),
          behavior: "smooth",
        });
      }
    }
  };

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const handleVideoError = (src: string) => {
    setFailedVideos((prev) => ({
      ...prev,
      [src]: true,
    }));
  };

  useEffect(() => {
    const id = window.setTimeout(() => {
      scrollCardInsideScroller(activeIndex);
    }, 80);

    return () => window.clearTimeout(id);
  }, [activeIndex]);

  useEffect(() => {
    const activeVideo = cardVideoRefs.current[activeIndex];
    if (!activeVideo) return;
    if (failedVideos[activeItem.videoSrc]) return;

    activeVideo.currentTime = 0;
    void activeVideo.play().catch(() => {});
  }, [activeIndex, activeItem.videoSrc, failedVideos]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!lightboxOpen) return;

      if (event.key === "Escape") setLightboxOpen(false);
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", handleKeyDown);

    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
      const video = lightboxVideoRef.current;
      if (video && !failedVideos[activeItem.videoSrc]) {
        void video.play().catch(() => {});
      }
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, activeItem.videoSrc, failedVideos]);

  const renderFallback = (item: VideoItem, mode: "desktop" | "mobile") => {
    const isMobile = mode === "mobile";

    return (
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#214232_0%,#173326_100%)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_50%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-white/20" />

        {/* desktop zadržava label, mobilni je nema */}
        {!isMobile && (
          <div className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/15 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-white/75 backdrop-blur-sm">
            Video
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-5">
          <p className="text-sm font-semibold leading-tight text-white sm:text-lg">
            {item.title}
          </p>
        </div>
      </div>
    );
  };

  const renderCard = (
    item: VideoItem,
    index: number,
    mode: "desktop" | "mobile"
  ) => {
    const isMobile = mode === "mobile";
    const isActive = index === activeIndex;

    return (
      <button
        key={`${mode}-${item.id}`}
        data-video-index={index}
        type="button"
        onClick={() => handleCardClick(index)}
        className={[
          "group relative shrink-0 overflow-hidden rounded-[22px] border border-white/14 text-left transition-[transform,border-color,box-shadow,opacity] duration-300 ease-out",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
          isMobile
            ? [
                "snap-center",
                "w-[78vw] min-w-[78vw] max-w-[300px]",
                isActive
                  ? "border-white/24 shadow-[0_20px_40px_rgba(0,0,0,0.18)] opacity-100"
                  : "border-white/12 opacity-85",
              ].join(" ")
            : [
                "w-[160px] sm:w-[185px] md:w-[210px] lg:w-[calc((100%-3.75rem)/4)]",
                "hover:border-white/22 hover:translate-y-[-2px]",
              ].join(" "),
        ].join(" ")}
        aria-label={`Otvori video ${item.title}`}
      >
        <div className="relative aspect-[9/16] w-full overflow-hidden">
          {failedVideos[item.videoSrc] ? (
            renderFallback(item, mode)
          ) : (
            <>
              <video
                ref={(el) => {
                  if (isActive) {
                    cardVideoRefs.current[index] = el;
                  }
                }}
                className="h-full w-full object-cover"
                src={item.videoSrc}
                muted
                loop
                playsInline
                autoPlay={isActive}
                preload={isActive ? "metadata" : "none"}
                onLoadedData={(e) => {
                  if (isActive) {
                    void e.currentTarget.play().catch(() => {});
                  }
                }}
                onError={() => handleVideoError(item.videoSrc)}
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(6,14,10,0.58),rgba(6,14,10,0.14)_46%,rgba(6,14,10,0.08))]" />
            </>
          )}

          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/20" />

          {/* desktop zadržava label, mobilni je nema */}
          {!isMobile && (
            <div className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/15 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-white/75 backdrop-blur-sm">
              Video
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-5">
            <p className="text-sm font-semibold leading-tight text-white sm:text-lg">
              {item.title}
            </p>
          </div>
        </div>
      </button>
    );
  };

  return (
    <>
      <section
        id="video"
        className="scroll-mt-[var(--header-offset)] overflow-hidden bg-[#173326] py-12 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex items-start justify-between gap-4 sm:gap-6">
              <div className="max-w-5xl">
                <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/62 sm:text-xs">
                  Video priča
                </p>

                <h2 className="mt-3 max-w-6xl text-[34px] font-semibold leading-[1.04] tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Domaća kuhinja za firme koja izgleda toplo, uredno, kvalitetno i
                  pouzdano u svakom koraku
                </h2>
              </div>

              {/* desktop/tablet broj ostaje, mobilni se sklanja */}
              <p className="hidden shrink-0 pt-1 text-sm text-white/70 md:block">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(videoItems.length).padStart(2, "0")}
              </p>
            </div>

            <div className="mt-6 h-px w-full bg-white/18" />

            <div className="relative mt-7 sm:mt-10">
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-0 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-[#10261c] text-xl text-white shadow-[0_10px_24px_rgba(0,0,0,0.18)] transition duration-200 hover:bg-[#0f2219] lg:flex"
                aria-label="Prethodni video"
              >
                ←
              </button>

              <button
                type="button"
                onClick={goNext}
                className="absolute right-0 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-[#10261c] text-xl text-white shadow-[0_10px_24px_rgba(0,0,0,0.18)] transition duration-200 hover:bg-[#0f2219] lg:flex"
                aria-label="Sledeći video"
              >
                →
              </button>

              <div className="hidden lg:block lg:px-20 xl:px-24">
                <div
                  ref={desktopScrollerRef}
                  className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  <div className="flex items-stretch gap-3 pb-1 sm:gap-4 lg:gap-5">
                    {videoItems.map((item, index) =>
                      renderCard(item, index, "desktop")
                    )}
                  </div>
                </div>
              </div>

              <div className="lg:hidden">
                <div
                  ref={mobileScrollerRef}
                  className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] snap-x snap-mandatory scroll-px-4 [&::-webkit-scrollbar]:hidden"
                >
                  <div className="flex gap-4 pr-8">
                    <div className="w-[4px] shrink-0" />
                    {videoItems.map((item, index) =>
                      renderCard(item, index, "mobile")
                    )}
                    <div className="w-[18vw] max-w-[72px] shrink-0" />
                  </div>
                </div>

                {/* na mobilnom uklonjene strelice i brojač */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/88 px-4 py-6"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 z-[130] flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-2xl text-white backdrop-blur-md transition hover:bg-white/20"
            aria-label="Zatvori"
          >
            ×
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-3 top-1/2 z-[130] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-xl text-white backdrop-blur-md transition hover:bg-white/20 sm:left-5 sm:h-12 sm:w-12"
            aria-label="Prethodni video"
          >
            ←
          </button>

          <div
            className="relative w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative mx-auto aspect-video overflow-hidden rounded-[28px] bg-[#111] shadow-[0_20px_60px_rgba(0,0,0,0.30)]">
              {failedVideos[activeItem.videoSrc] ? (
                renderFallback(activeItem, "desktop")
              ) : (
                <video
                  ref={lightboxVideoRef}
                  key={`lightbox-${activeItem.videoSrc}`}
                  className="h-full w-full object-contain bg-[#111]"
                  src={activeItem.videoSrc}
                  muted
                  loop
                  playsInline
                  controls
                  autoPlay
                  preload="metadata"
                  onError={() => handleVideoError(activeItem.videoSrc)}
                />
              )}
            </div>

            <p className="mt-4 text-center text-sm text-white/80 sm:text-base">
              {activeItem.title}
            </p>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-3 top-1/2 z-[130] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-xl text-white backdrop-blur-md transition hover:bg-white/20 sm:right-5 sm:h-12 sm:w-12"
            aria-label="Sledeći video"
          >
            →
          </button>
        </div>
      )}
    </>
  );
}