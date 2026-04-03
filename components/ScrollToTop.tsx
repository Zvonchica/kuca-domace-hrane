"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // 🔴 OVO JE KLJUČNO
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);

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
      className="fixed bottom-24 right-4 z-40 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/85 text-[#1f3d2b] shadow-lg backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white sm:bottom-6 sm:right-6 sm:h-11 sm:w-11"
      aria-label="Vrati na vrh"
    >
      ↑
    </button>
  );
}