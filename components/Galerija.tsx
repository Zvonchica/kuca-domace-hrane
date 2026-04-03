"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type GalleryItem = {
  src: string;
  alt: string;
};

const galleryItems: GalleryItem[] = [
  { src: "/images/galerija-1.webp", alt: "Domaći obrok 1" },
  { src: "/images/galerija-2.webp", alt: "Domaći obrok 2" },
  { src: "/images/galerija-3.webp", alt: "Domaći obrok 3" },
  { src: "/images/galerija-4.webp", alt: "Domaći obrok 4" },
  { src: "/images/galerija-5.webp", alt: "Domaći obrok 5" },
  { src: "/images/galerija-6.webp", alt: "Domaći obrok 6" },
  { src: "/images/galerija-7.webp", alt: "Domaći obrok 7" },
  { src: "/images/galerija-8.webp", alt: "Domaći obrok 8" },
  { src: "/images/galerija-9.webp", alt: "Domaći obrok 9" },
  { src: "/images/galerija-10.webp", alt: "Domaći obrok 10" },
];

const SHIFT_DESKTOP = -52;
const SHIFT_TABLET = -38;

export default function Galerija() {
  const [activeIndex, setActiveIndex] = useState(7);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const activeLightboxItem = useMemo(() => {
    if (lightboxIndex === null) return null;
    return galleryItems[lightboxIndex];
  }, [lightboxIndex]);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevLightbox = () => {
    setLightboxIndex((prev) => {
      if (prev === null) return 0;
      return (prev - 1 + galleryItems.length) % galleryItems.length;
    });
  };

  const nextLightbox = () => {
    setLightboxIndex((prev) => {
      if (prev === null) return 0;
      return (prev + 1) % galleryItems.length;
    });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (event.key === "Escape") closeLightbox();
        if (event.key === "ArrowLeft") prevLightbox();
        if (event.key === "ArrowRight") nextLightbox();
        return;
      }

      if (event.key === "ArrowLeft") prevSlide();
      if (event.key === "ArrowRight") nextSlide();
    };

    window.addEventListener("keydown", handleKeyDown);

    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  const getRelativePosition = (index: number) => {
    const total = galleryItems.length;
    let diff = index - activeIndex;

    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    return diff;
  };

  const renderImageOrPlaceholder = (
    item: GalleryItem,
    index: number,
    mode: "cover" | "contain" = "cover"
  ) => {
    const failed = failedImages[item.src];

    if (failed) {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(135deg,#f8f6f1_0%,#eef4ee_100%)]">
          <div className="text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#29543a]/70">
              Fotografija
            </p>
            <p className="mt-2 text-sm text-[#2f2f2a]/70">{index + 1}</p>
          </div>
        </div>
      );
    }

    return (
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 400px"
        className={mode === "cover" ? "object-cover" : "object-contain"}
        onError={() =>
          setFailedImages((prev) => ({
            ...prev,
            [item.src]: true,
          }))
        }
      />
    );
  };

  const getCardStyle = (diff: number, isDesktop: boolean) => {
    const shift = isDesktop ? SHIFT_DESKTOP : SHIFT_TABLET;

    const config: Record<
      number,
      {
        x: number;
        y: number;
        rotate: number;
        scale: number;
        opacity: number;
        zIndex: number;
      }
    > = isDesktop
        ? {
          [-2]: { x: -360, y: 34, rotate: -5, scale: 0.84, opacity: 0.35, zIndex: 10 },
          [-1]: { x: -215, y: 16, rotate: -2.5, scale: 0.92, opacity: 0.72, zIndex: 20 },
          [0]: { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, zIndex: 40 },
          [1]: { x: 215, y: 16, rotate: 2.5, scale: 0.92, opacity: 0.72, zIndex: 20 },
          [2]: { x: 360, y: 34, rotate: 5, scale: 0.84, opacity: 0.35, zIndex: 10 },
        }
        : {
          [-2]: { x: -250, y: 24, rotate: -4, scale: 0.82, opacity: 0.34, zIndex: 10 },
          [-1]: { x: -145, y: 12, rotate: -2, scale: 0.91, opacity: 0.72, zIndex: 20 },
          [0]: { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, zIndex: 40 },
          [1]: { x: 145, y: 12, rotate: 2, scale: 0.91, opacity: 0.72, zIndex: 20 },
          [2]: { x: 250, y: 24, rotate: 4, scale: 0.82, opacity: 0.34, zIndex: 10 },
        };

    const item = config[diff];

    return {
      left: "50%",
      top: "50%",
      zIndex: item.zIndex,
      opacity: item.opacity,
      transform: `translate(-50%, -50%) translateX(${item.x + shift}px) translateY(${item.y}px) rotate(${item.rotate}deg) scale(${item.scale})`,
    };
  };

  return (
    <>
      <section
        id="galerija"
        className="relative z-0 overflow-hidden bg-[#faf8f4] py-12 sm:py-16 lg:py-20"
      >
        <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8">
          <div
            className="mx-auto hidden max-w-4xl text-center md:block lg:hidden"
            style={{ transform: `translateX(${SHIFT_TABLET}px)` }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#29543a]/75 sm:text-sm">
              Galerija
            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#1f1f1c] sm:text-4xl lg:text-5xl">
              Kako izgleda naša domaća hrana
            </h2>

            <p className="mx-auto mt-3 max-w-3xl text-base leading-relaxed text-[#5f5a53] sm:text-lg">
              Fotografije obroka, posluženja i pakovanja koje ostavljaju uredan,
              topao i profesionalan utisak.
            </p>
          </div>

          <div
            className="mx-auto hidden max-w-4xl text-center lg:block"
            style={{ transform: `translateX(${SHIFT_DESKTOP}px)` }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#29543a]/75 sm:text-sm">
              Galerija
            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#1f1f1c] sm:text-4xl lg:text-5xl">
              Kako izgleda naša domaća hrana
            </h2>

            <p className="mx-auto mt-3 max-w-3xl text-base leading-relaxed text-[#5f5a53] sm:text-lg">
              Fotografije obroka, posluženja i pakovanja koje ostavljaju uredan,
              topao i profesionalan utisak.
            </p>
          </div>

          <div className="mx-auto max-w-4xl text-center md:hidden">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#29543a]/75 sm:text-sm">
              Galerija
            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#1f1f1c] sm:text-4xl">
              Kako izgleda naša domaća hrana
            </h2>

            <p className="mx-auto mt-3 max-w-3xl text-base leading-relaxed text-[#5f5a53] sm:text-lg">
              Fotografije obroka, posluženja i pakovanja koje ostavljaju uredan,
              topao i profesionalan utisak.
            </p>
          </div>

          <div className="relative mt-10 hidden md:block">
            <div className="pointer-events-none absolute left-1/2 top-[46%] h-[200px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#29543a]/[0.04] blur-2xl lg:h-[240px] lg:w-[860px]" />

            <div className="relative mx-auto h-[300px] w-full max-w-[1280px] lg:h-[360px]">
              {galleryItems.map((item, index) => {
                const diff = getRelativePosition(index);
                const isActive = diff === 0;

                if (Math.abs(diff) > 2) return null;

                return (
                  <button
                    key={item.src}
                    type="button"
                    onClick={() => {
                      if (isActive) {
                        openLightbox(index);
                      } else {
                        setActiveIndex(index);
                      }
                    }}
                    aria-label={
                      isActive
                        ? `Otvori sliku ${index + 1}`
                        : `Prikaži sliku ${index + 1}`
                    }
                    className={[
                      "group absolute overflow-hidden rounded-[30px] border border-[#29543a]/10 bg-white transition-all duration-500 ease-out",
                      "shadow-[0_12px_30px_rgba(20,35,24,0.07)]",
                      "md:h-[260px] md:w-[380px] lg:h-[320px] lg:w-[480px]",
                      isActive
                        ? "ring-1 ring-[#29543a]/15 shadow-[0_16px_38px_rgba(20,35,24,0.10)]"
                        : "hover:opacity-90",
                    ].join(" ")}
                    style={getCardStyle(diff, true)}
                  >
                    <div className="relative h-full w-full md:hidden">
                      {renderImageOrPlaceholder(item, index, "cover")}
                      <div
                        className={[
                          "absolute inset-0 transition duration-300",
                          isActive
                            ? "bg-[linear-gradient(to_top,rgba(14,28,18,0.08),rgba(14,28,18,0.01))]"
                            : "bg-[linear-gradient(to_top,rgba(14,28,18,0.15),rgba(14,28,18,0.04))]",
                        ].join(" ")}
                      />
                    </div>

                    <div className="relative hidden h-full w-full md:block lg:hidden">
                      {renderImageOrPlaceholder(item, index, "cover")}
                      <div
                        className={[
                          "absolute inset-0 transition duration-300",
                          isActive
                            ? "bg-[linear-gradient(to_top,rgba(14,28,18,0.08),rgba(14,28,18,0.01))]"
                            : "bg-[linear-gradient(to_top,rgba(14,28,18,0.15),rgba(14,28,18,0.04))]",
                        ].join(" ")}
                      />
                    </div>

                    <div className="relative hidden h-full w-full lg:block">
                      {renderImageOrPlaceholder(item, index, "cover")}
                      <div
                        className={[
                          "absolute inset-0 transition duration-300",
                          isActive
                            ? "bg-[linear-gradient(to_top,rgba(14,28,18,0.08),rgba(14,28,18,0.01))]"
                            : "bg-[linear-gradient(to_top,rgba(14,28,18,0.15),rgba(14,28,18,0.04))]",
                        ].join(" ")}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            <div
              className="mt-5 hidden items-center justify-center gap-3 md:flex lg:hidden"
              style={{ transform: `translateX(${SHIFT_TABLET}px)` }}
            >
              <button
                type="button"
                onClick={prevSlide}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#29543a]/15 bg-white text-xl text-[#29543a] shadow-[0_6px_18px_rgba(20,35,24,0.05)] transition hover:-translate-y-0.5 hover:bg-[#f3f7f3]"
                aria-label="Prethodna slika"
              >
                ←
              </button>

              <button
                type="button"
                onClick={nextSlide}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#29543a]/15 bg-white text-xl text-[#29543a] shadow-[0_6px_18px_rgba(20,35,24,0.05)] transition hover:-translate-y-0.5 hover:bg-[#f3f7f3]"
                aria-label="Sledeća slika"
              >
                →
              </button>
            </div>

            <div
              className="mt-5 hidden items-center justify-center gap-3 lg:flex"
              style={{ transform: `translateX(${SHIFT_DESKTOP}px)` }}
            >
              <button
                type="button"
                onClick={prevSlide}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#29543a]/15 bg-white text-xl text-[#29543a] shadow-[0_6px_18px_rgba(20,35,24,0.05)] transition hover:-translate-y-0.5 hover:bg-[#f3f7f3]"
                aria-label="Prethodna slika"
              >
                ←
              </button>

              <button
                type="button"
                onClick={nextSlide}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#29543a]/15 bg-white text-xl text-[#29543a] shadow-[0_6px_18px_rgba(20,35,24,0.05)] transition hover:-translate-y-0.5 hover:bg-[#f3f7f3]"
                aria-label="Sledeća slika"
              >
                →
              </button>
            </div>
          </div>

          <div className="mt-10 md:hidden">
            <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden">
              <div className="flex gap-4 pr-4">
                {galleryItems.map((item, index) => (
                  <button
                    key={item.src}
                    type="button"
                    onClick={() => openLightbox(index)}
                    className="group relative h-[420px] w-[84vw] max-w-[340px] shrink-0 snap-center overflow-hidden rounded-[28px] border border-[#29543a]/10 bg-white shadow-[0_12px_28px_rgba(20,35,24,0.07)]"
                    aria-label={`Otvori sliku ${index + 1}`}
                  >
                    <div className="relative h-full w-full">
                      {renderImageOrPlaceholder(item, index, "cover")}
                      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(14,28,18,0.12),rgba(14,28,18,0.02))]" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 flex items-center justify-center gap-2">
              {galleryItems.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 w-2 rounded-full transition ${index === activeIndex ? "bg-[#29543a]" : "bg-[#29543a]/20"
                    }`}
                  aria-label={`Idi na sliku ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {activeLightboxItem && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/88 px-4 py-6"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-[130] flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-2xl text-white backdrop-blur-md transition hover:bg-white/20"
            aria-label="Zatvori"
          >
            ×
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevLightbox();
            }}
            className="absolute left-3 top-1/2 z-[130] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-xl text-white backdrop-blur-md transition hover:bg-white/20 sm:left-5 sm:h-12 sm:w-12"
            aria-label="Prethodna slika"
          >
            ←
          </button>

          <div
            className="relative w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative mx-auto flex h-[72vh] items-center justify-center overflow-hidden rounded-[30px] bg-[#111] shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
              {failedImages[activeLightboxItem.src] ? (
                <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#f8f6f1_0%,#eef4ee_100%)]">
                  <div className="text-center">
                    <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#29543a]/70">
                      Fotografija
                    </p>
                    <p className="mt-2 text-base text-[#2f2f2a]/70">
                      {lightboxIndex + 1}
                    </p>
                  </div>
                </div>
              ) : (
                <Image
                  src={activeLightboxItem.src}
                  alt={activeLightboxItem.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  onError={() =>
                    setFailedImages((prev) => ({
                      ...prev,
                      [activeLightboxItem.src]: true,
                    }))
                  }
                />
              )}
            </div>

            <p className="mt-4 text-center text-sm text-white/80 sm:text-base">
              {activeLightboxItem.alt}
            </p>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextLightbox();
            }}
            className="absolute right-3 top-1/2 z-[130] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-xl text-white backdrop-blur-md transition hover:bg-white/20 sm:right-5 sm:h-12 sm:w-12"
            aria-label="Sledeća slika"
          >
            →
          </button>
        </div>
      )}
    </>
  );
}