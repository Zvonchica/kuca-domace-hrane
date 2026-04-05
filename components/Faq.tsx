"use client";

import { useState } from "react";

type FaqItem = {
  q: string;
  a: string;
};

const faqItems: FaqItem[] = [
  {
    q: "Kako funkcioniše poručivanje za firme?",
    a: "Pošaljete broj zaposlenih, lokaciju firme i da li želite dnevni ili nedeljni model. Nakon toga dobijate predlog saradnje, organizaciju menija i jasan dogovor oko dostave.",
  },
  {
    q: "Da li je moguće prilagoditi meni?",
    a: "Da. Meni može da se prilagodi ritmu firme, vrsti obroka, posnim danima i osnovnim preferencijama tima, tako da saradnja bude praktična i dugoročno održiva.",
  },
  {
    q: "Za koliko ljudi radite?",
    a: "Radimo za manje firme, kancelarije, ordinacije i timove kojima je važan kvalitet, urednost i pouzdanost. Model saradnje je naročito dobar za manje kolektive kojima treba stabilan sistem obroka.",
  },
  {
    q: "Koliko unapred se dogovara dostava?",
    a: "Za dnevne porudžbine dogovor se pravi unapred prema raspoloživosti, a za nedeljni model je najpraktičnije da se plan potvrdi ranije kako bi sve bilo organizovano bez zastoja.",
  },
];

export default function Faq() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="scroll-mt-[var(--header-offset)] mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8"
    >
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Česta pitanja
      </h2>

      <div className="mt-8 space-y-4">
        {faqItems.map((item, index) => {
          const isOpen = openFaq === index;

          return (
            <div
              key={item.q}
              className="overflow-hidden rounded-2xl bg-white shadow-sm"
            >
              <button
                onClick={() => setOpenFaq(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
              >
                <span className="font-medium">{item.q}</span>
                <span className="text-2xl text-[#1f3d2b]">
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              {isOpen && (
                <div className="border-t border-[#f0f0f0] px-5 py-5 text-sm leading-7 text-[#666]">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}