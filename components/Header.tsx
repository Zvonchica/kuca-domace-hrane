"use client";

import { useEffect, useState } from "react";

const navItems = [
  { href: "#kako", label: "Kako funkcioniše" },
  { href: "#ketering", label: "Ketering" },
  { href: "#ponuda", label: "Ponuda" },
  { href: "#galerija", label: "Galerija" },
  { href: "#video", label: "Video" },
  { href: "#meni", label: "Meni" },
  { href: "#recenzije", label: "Recenzije" },
  { href: "#onama", label: "O nama" },
  { href: "#faq", label: "Pitanja" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.style.scrollBehavior = "smooth";
    root.style.setProperty("--header-offset", "120px");

    const updateHeaderOffset = () => {
      const isMobile = window.innerWidth < 640;
      const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;

      if (isMobile) {
        root.style.setProperty("--header-offset", "112px");
      } else if (isTablet) {
        root.style.setProperty("--header-offset", "120px");
      } else {
        root.style.setProperty("--header-offset", "132px");
      }
    };

    updateHeaderOffset();
    window.addEventListener("resize", updateHeaderOffset);

    return () => {
      window.removeEventListener("resize", updateHeaderOffset);
    };
  }, []);

  function handleAnchorClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    closeMobile = false
  ) {
    const id = href.replace("#", "");
    const target = document.getElementById(id);

    if (!target) {
      if (closeMobile) setMobileMenuOpen(false);
      return;
    }

    e.preventDefault();

    const headerOffset =
      Number.parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--header-offset"
        ),
        10
      ) || 120;

    const targetTop =
      target.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: "smooth",
    });

    if (closeMobile) {
      setMobileMenuOpen(false);
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(255,255,255,0.86)] backdrop-blur-xl supports-[backdrop-filter]:bg-[rgba(255,255,255,0.78)]">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a
          href="#kako"
          onClick={(e) => handleAnchorClick(e, "#kako")}
          className="min-w-0 pr-3 outline-none transition-opacity hover:opacity-90 focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-[#1f3d2b]/30"
        >
          <div className="truncate text-base font-semibold tracking-tight text-[#1f1f1c] sm:text-[20px]">
            Kuća domaće hrane
          </div>
          <div className="truncate text-[11px] text-[#5a5a55] sm:text-xs">
            Dnevni i nedeljni obroci za male firme
          </div>
        </a>

        <nav className="hidden items-center gap-5 text-sm text-[#353530] lg:flex xl:gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleAnchorClick(e, item.href)}
              className="whitespace-nowrap rounded-md px-1 py-1 transition-colors duration-200 hover:text-[#1f3d2b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f3d2b]/30"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href="#kontakt"
            onClick={(e) => handleAnchorClick(e, "#kontakt")}
            className="inline-flex items-center justify-center rounded-lg bg-[#1f3d2b] px-5 py-3 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#28543c] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f3d2b]/30"
          >
            Zatražite ponudu
          </a>
        </div>

        <button
          type="button"
          aria-label={mobileMenuOpen ? "Zatvori meni" : "Otvori meni"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#ddddda] bg-white text-[#2f2f2f] shadow-sm transition-colors duration-200 hover:border-[#cfcfc8] hover:bg-[#f8f8f5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f3d2b]/30 lg:hidden"
        >
          <span className="text-lg leading-none">
            {mobileMenuOpen ? "✕" : "☰"}
          </span>
        </button>
      </div>

      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-[#ecece7] bg-white/95 backdrop-blur-xl lg:hidden"
        >
          <div className="mx-auto flex w-full max-w-7xl flex-col px-4 py-4 sm:px-6">
            <nav className="flex flex-col">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleAnchorClick(e, item.href, true)}
                  className="rounded-md border-b border-[#f0f0eb] py-3 text-sm text-[#2f2f2f] transition-colors duration-200 hover:text-[#1f3d2b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f3d2b]/30 last:border-b-0"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <a
              href="#kontakt"
              onClick={(e) => handleAnchorClick(e, "#kontakt", true)}
              className="mt-4 inline-flex items-center justify-center rounded-lg bg-[#1f3d2b] px-5 py-3 text-center text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#28543c] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f3d2b]/30"
            >
              Zatražite ponudu
            </a>
          </div>
        </div>
      )}
    </header>
  );
}