"use client";

import { useState } from "react";

type FaqItem = { q: string; a: string };

const faqItems: FaqItem[] = [
  { q: "Kako mogu da poručim?", a: "Možete nas pozvati na 060 30 60 486, pisati na WhatsApp ili poručiti preko Wolt i Glovo platformi." },
  { q: "Da li mogu lično da preuzmem hranu?", a: "Da. Lično preuzimanje je u Požeškoj 78 na Banovom brdu. Pre dolaska je najbolje da potvrdite dostupnost." },
  { q: "Koliki je popust za direktne porudžbine?", a: "Za direktnu porudžbinu i lično preuzimanje u lokalu odobravamo 10% popusta na redovnu cenu. Popust se ne odnosi na Wolt i Glovo porudžbine." },
  { q: "Da li dostavljate preko Wolt i Glovo?", a: "Da. Maka i Ika možete pronaći na zvaničnim Wolt i Glovo stranicama, čiji su linkovi dostupni na sajtu." },
  { q: "Da li su količine dnevnog menija ograničene?", a: "Da. Kuvamo u manjim količinama da bi hrana bila sveža, zato dnevna jela važe dok traju zalihe." },
  { q: "Šta se dešava kada se jelo rasproda?", a: "Rasprodato jelo ostaje vidljivo u dnevnom meniju, ali je jasno označeno kao nedostupno. Ponekad se mogu pojaviti i jela koja su ostala dostupna od prethodnog dana." },
  { q: "Kako funkcioniše ponuda za firme?", a: "Za firme pripremamo domaće ručkove za zaposlene uz minimum 10 obroka po isporuci, unapred dogovorenu količinu, mogućnost redovne saradnje i 20% popusta." },
  { q: "Koje je radno vreme?", a: "Radimo od ponedeljka do petka, od 12:00 do 18:00. Vikendom ne radimo." },
];

export default function Faq() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-[calc(var(--header-offset)+8px)] mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Česta pitanja</h2>
      <div className="mt-6 space-y-4 sm:mt-8">
        {faqItems.map((item, index) => {
          const isOpen = openFaq === index;
          return (
            <div key={item.q} className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <button onClick={() => setOpenFaq(isOpen ? null : index)} className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left">
                <span className="font-medium">{item.q}</span>
                <span className="text-2xl text-[#1f3d2b]">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && <div className="border-t border-[#f0f0f0] px-5 py-5 text-sm leading-7 text-[#666]">{item.a}</div>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
