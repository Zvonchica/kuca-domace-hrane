"use client";

import { useState } from "react";

const navItems = [
  { href: "#kako", label: "Kako funkcioniše" },
  { href: "#ponuda", label: "Ponuda" },
  { href: "#video", label: "Video" },
  { href: "#galerija", label: "Galerija" },
  { href: "#meni", label: "Meni" },
  { href: "#recenzije", label: "Recenzije" },
  { href: "#onama", label: "O nama" },
  { href: "#faq", label: "Pitanja" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-[#e7e7e2] bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="min-w-0 pr-3">
          <div className="truncate text-lg font-semibold tracking-tight sm:text-[20px]">
            Kuća domaće hrane
          </div>
          <div className="truncate text-xs text-[#333]">
            Dnevni i nedeljni obroci za male firme
          </div>
        </div>

        <nav className="hidden items-center gap-5 text-sm lg:flex xl:gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap transition hover:text-[#1f3d2b]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href="#kontakt"
            className="rounded-lg bg-[#1f3d2b] px-5 py-3 text-white transition hover:bg-[#28543c]"
          >
            Ponuda
          </a>
        </div>

        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#ddddda] bg-white lg:hidden"
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-[#ecece7] bg-white lg:hidden">
          <div className="mx-auto flex w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="border-b border-[#f0f0eb] py-3 text-sm last:border-b-0"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#kontakt"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 rounded-lg bg-[#1f3d2b] px-5 py-3 text-center text-white"
            >
              Ponuda
            </a>
          </div>
        </div>
      )}
    </header>
  );
}