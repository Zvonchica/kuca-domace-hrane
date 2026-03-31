"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!showScrollTop) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-24 right-4 z-40 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/85 text-[#1f3d2b] shadow-[0_6px_20px_rgba(0,0,0,0.15)] backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white sm:bottom-6 sm:right-6 sm:h-11 sm:w-11"
      aria-label="Vrati na vrh"
    >
      <span className="text-xs font-semibold sm:text-base">↑</span>
    </button>
  );
}