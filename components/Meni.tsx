"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  additionalTodayDishes,
  formatPrice,
  getTodayMenuKey,
  type MenuDish,
  weeklyMenu,
} from "@/data/site";

type MenuDay = {
  key: string;
  day: string;
  short: string;
  accent: string;
  items: MenuDish[];
};

const shortDays: Record<string, string> = {
  ponedeljak: "Pon",
  utorak: "Uto",
  sreda: "Sre",
  cetvrtak: "Čet",
  petak: "Pet",
};

function wrapIndex(index: number, length: number) {
  return (index + length) % length;
}

function getMenuDays(): MenuDay[] {
  const todayKey = getTodayMenuKey();

  return weeklyMenu.map((day) => ({
    key: day.key,
    day: day.name,
    short: shortDays[day.key],
    accent: "bg-[#eef2ed]",
    items: [
      ...day.dishes,
      ...(day.key === todayKey ? additionalTodayDishes : []),
    ],
  }));
}

export default function Meni() {
  const menuDays = useMemo(() => getMenuDays(), []);
  const todayKey = getTodayMenuKey();
  const initialIndex = Math.max(0, menuDays.findIndex((day) => day.key === todayKey));
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const mobileScrollerRef = useRef<HTMLDivElement | null>(null);

  const total = menuDays.length;
  const prevIndex = useMemo(() => wrapIndex(activeIndex - 1, total), [activeIndex, total]);
  const nextIndex = useMemo(() => wrapIndex(activeIndex + 1, total), [activeIndex, total]);

  const goPrev = () => setActiveIndex((prev) => wrapIndex(prev - 1, total));
  const goNext = () => setActiveIndex((prev) => wrapIndex(prev + 1, total));

  useEffect(() => {
    const scroller = mobileScrollerRef.current;
    if (!scroller) return;

    const activeCard = scroller.querySelector(`[data-menu-index="${activeIndex}"]`) as HTMLElement | null;
    if (!activeCard) return;

    const scrollerRect = scroller.getBoundingClientRect();
    const cardRect = activeCard.getBoundingClientRect();
    const targetLeft = scroller.scrollLeft + (cardRect.left - scrollerRect.left) - (scrollerRect.width / 2 - cardRect.width / 2);

    scroller.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
  }, [activeIndex]);

  useEffect(() => {
    const scroller = mobileScrollerRef.current;
    if (!scroller) return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const handleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        const cards = Array.from(scroller.querySelectorAll<HTMLElement>("[data-menu-index]"));
        if (!cards.length) return;

        const scrollerRect = scroller.getBoundingClientRect();
        const scrollerCenter = scrollerRect.left + scrollerRect.width / 2;
        let closestIndex = 0;
        let closestDistance = Number.POSITIVE_INFINITY;

        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const distance = Math.abs(scrollerCenter - (rect.left + rect.width / 2));
          const index = Number(card.dataset.menuIndex);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        setActiveIndex(closestIndex);
      }, 80);
    };

    scroller.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      scroller.removeEventListener("scroll", handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section id="meni" className="scroll-mt-[var(--header-offset)] w-full bg-[#f7f6f2] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[#295135]">Dnevni meni</div>
          <h2 className="text-3xl font-semibold tracking-tight text-[#183222] sm:text-4xl lg:text-5xl">Šta danas kuvamo?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#4f5f53] sm:text-lg">
            Kuvamo u manjim količinama. Dnevni meni je pregledan unapred, a dostupnost potvrdite pre poručivanja.
          </p>
          <p className="mt-3 text-sm font-semibold text-[#295135] sm:text-base">Ograničene količine – dok traju zalihe.</p>
        </div>

        <div className="mt-10 md:hidden">
          <div ref={mobileScrollerRef} className="-mx-4 overflow-x-auto px-4 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-4 pr-4">
              {menuDays.map((item, index) => (
                <button
                  key={item.key}
                  data-menu-index={index}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`w-[84vw] max-w-[360px] shrink-0 snap-center rounded-[28px] border px-5 py-6 text-left shadow-[0_12px_30px_rgba(20,55,35,0.08)] transition ${index === activeIndex ? "border-[#d8ddd6] bg-[#eef2ed]" : "border-[#e3e5df] bg-[#f4f6f3]"}`}
                  aria-label={item.day}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#295135]/80">Maka i Ika</div>
                    <div className="rounded-full border border-[#cfd6cf] bg-white/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-[#295135]">{item.key === todayKey ? "Danas" : "Dnevni meni"}</div>
                  </div>
                  <h3 className="mt-3 text-[28px] font-semibold tracking-tight text-[#183222]">{item.day}</h3>
                  <div className="mt-4 h-px w-full bg-[#e1e4de]" />
                  <DishList dishes={item.items} compact />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-center gap-2">
            {menuDays.map((item, index) => (
              <button key={item.key} type="button" onClick={() => setActiveIndex(index)} aria-label={item.day} className={`h-2.5 rounded-full transition-all duration-300 ${index === activeIndex ? "w-10 bg-[#295135]" : "w-2.5 bg-[#b8c1b9]"}`} />
            ))}
          </div>

          <div className="mt-6 grid grid-cols-5 gap-2 sm:gap-3">
            {menuDays.map((item, index) => (
              <button key={item.key} type="button" onClick={() => setActiveIndex(index)} className={`rounded-2xl border px-2 py-3 text-center text-xs font-medium transition-all sm:px-3 sm:text-sm ${index === activeIndex ? "border-[#295135] bg-[#295135] text-white shadow-md" : "border-[#d8ddd6] bg-white text-[#2c4d36] hover:border-[#c7d0c8] hover:bg-[#fafbf9]"}`}>{item.short}</button>
            ))}
          </div>
        </div>

        <div className="relative mt-12 hidden md:block">
          <div className="relative overflow-hidden rounded-[32px] border border-[#e3e5df] bg-white px-3 py-6 shadow-[0_10px_40px_rgba(20,55,35,0.08)] sm:px-6 sm:py-8 lg:px-10 lg:py-10">
            <div className="relative flex items-center justify-center">
              <button type="button" onClick={goPrev} aria-label="Prethodni dan" className="absolute left-0 z-20 hidden h-11 w-11 items-center justify-center rounded-full border border-[#d9dfd8] bg-white text-[#295135] shadow-[0_8px_20px_rgba(20,55,35,0.14)] transition duration-300 hover:scale-105 hover:bg-[#f7f8f5] md:flex sm:left-2 sm:h-12 sm:w-12 lg:left-4 lg:h-14 lg:w-14"><span className="text-2xl leading-none">‹</span></button>
              <div className="relative flex h-[380px] w-full items-center justify-center sm:h-[430px] lg:h-[500px]">
                <MenuSideCard data={menuDays[prevIndex]} position="left" onClick={() => setActiveIndex(prevIndex)} />
                <MenuActiveCard data={menuDays[activeIndex]} isToday={menuDays[activeIndex].key === todayKey} />
                <MenuSideCard data={menuDays[nextIndex]} position="right" onClick={() => setActiveIndex(nextIndex)} />
              </div>
              <button type="button" onClick={goNext} aria-label="Sledeći dan" className="absolute right-0 z-20 hidden h-11 w-11 items-center justify-center rounded-full border border-[#d9dfd8] bg-white text-[#295135] shadow-[0_8px_20px_rgba(20,55,35,0.14)] transition duration-300 hover:scale-105 hover:bg-[#f7f8f5] md:flex sm:right-2 sm:h-12 sm:w-12 lg:right-4 lg:h-14 lg:w-14"><span className="text-2xl leading-none">›</span></button>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2">
              {menuDays.map((item, index) => (
                <button key={item.key} type="button" onClick={() => setActiveIndex(index)} aria-label={item.day} className={`h-2.5 rounded-full transition-all duration-300 ${index === activeIndex ? "w-10 bg-[#295135]" : "w-2.5 bg-[#b8c1b9] hover:bg-[#8ea892]"}`} />
              ))}
            </div>

            <div className="mt-6 grid grid-cols-5 gap-2 sm:gap-3">
              {menuDays.map((item, index) => (
                <button key={item.key} type="button" onClick={() => setActiveIndex(index)} className={`rounded-2xl border px-2 py-3 text-center text-xs font-medium transition-all sm:px-3 sm:text-sm lg:text-base ${index === activeIndex ? "border-[#295135] bg-[#295135] text-white shadow-md" : "border-[#d8ddd6] bg-white text-[#2c4d36] hover:border-[#c7d0c8] hover:bg-[#fafbf9]"}`}>{item.short}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <InfoCard title="Ograničene količine" text="Kuvamo svakog dana u manjim količinama. Kada se jelo rasproda, ostaje vidljivo kao nedostupno." />
          <InfoCard title="Stalna ponuda" text="Uz stalnu ponudu uključen je jedan prilog od 200 g, prema dnevnoj raspoloživosti." />
          <InfoCard title="Direktna porudžbina" text="Za porudžbine i lično preuzimanje u lokalu odobravamo 10% popusta na redovnu cenu." />
        </div>
      </div>
    </section>
  );
}

function DishList({ dishes, compact = false }: { dishes: MenuDish[]; compact?: boolean }) {
  return (
    <div className={`mt-4 grid ${compact ? "gap-2.5" : "gap-2.5 sm:mt-6 sm:gap-3"}`}>
      {dishes.map((dish, index) => (
        <div key={dish.id} className={`flex items-start gap-2.5 rounded-xl bg-white px-3 py-2.5 text-left sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-3 ${dish.soldOut ? "opacity-60" : ""}`}>
          <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#295135] text-[10px] font-semibold text-white sm:h-6 sm:w-6 sm:text-xs">{index + 1}</div>
          <div className="min-w-0 flex-1">
            <div className="text-sm leading-relaxed text-[#213729] sm:text-base lg:text-lg">{dish.name}</div>
            <div className="mt-0.5 text-xs text-[#5f6c60] sm:text-sm">{dish.quantity} · {formatPrice(dish.price)}</div>
          </div>
          {dish.soldOut && <span className="rounded-full bg-[#7f4141] px-2 py-1 text-[9px] font-semibold uppercase tracking-wide text-white sm:text-[10px]">Rasprodato</span>}
        </div>
      ))}
    </div>
  );
}

function MenuActiveCard({ data, isToday }: { data: MenuDay; isToday: boolean }) {
  return (
    <div className={`relative z-10 w-full max-w-[90%] sm:max-w-[78%] lg:max-w-[700px] rounded-[28px] sm:rounded-[34px] border border-[#e3e5df] ${data.accent} px-5 py-6 shadow-[0_18px_50px_rgba(20,55,35,0.12)] transition-all duration-500 ease-out sm:px-8 sm:py-8 lg:px-10 lg:py-10`}>
      <div className="absolute right-3 top-3 rounded-full border border-[#cfd6cf] bg-white/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-[#295135] sm:right-5 sm:top-5 sm:px-3 sm:text-xs">{isToday ? "Danas" : "Dnevni meni"}</div>
      <div className="pr-0 sm:pr-16">
        <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#295135]/80 sm:text-xs">Maka i Ika – domaća kuhinja</div>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[#183222] sm:mt-3 sm:text-4xl lg:text-5xl">{data.day}</h3>
        <div className="mt-4 h-px w-full bg-[#e1e4de] sm:mt-6" />
        <DishList dishes={data.items} />
      </div>
    </div>
  );
}

function MenuSideCard({ data, position, onClick }: { data: MenuDay; position: "left" | "right"; onClick: () => void }) {
  const isLeft = position === "left";
  return (
    <button type="button" onClick={onClick} aria-label={data.day} className={`absolute top-1/2 z-0 hidden -translate-y-1/2 overflow-hidden rounded-[28px] border border-[#e3e5df] ${data.accent} p-5 text-left shadow-[0_10px_30px_rgba(20,55,35,0.08)] transition-all duration-500 ease-out hover:scale-[1.02] md:block md:h-[300px] md:w-[155px] lg:h-[370px] lg:w-[210px] ${isLeft ? "left-[7%] lg:left-[9%]" : "right-[7%] lg:right-[9%]"}`}>
      <div className="relative h-full">
        <div className="text-xs font-medium uppercase tracking-[0.2em] text-[#295135]/75">{data.short}</div>
        <div className={`absolute left-1/2 top-1/2 text-[34px] font-semibold uppercase tracking-tight text-[#24412d]/85 md:text-[36px] lg:text-[50px] ${isLeft ? "-translate-x-1/2 -translate-y-1/2 -rotate-90" : "-translate-x-1/2 -translate-y-1/2 rotate-90"}`}>{data.day}</div>
        <div className="absolute bottom-0 left-0 right-0 text-xs leading-relaxed text-[#295135]/70">{data.items[0]?.name}</div>
      </div>
    </button>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[24px] border border-[#e3e5df] bg-white p-6 shadow-[0_8px_24px_rgba(20,55,35,0.05)]">
      <div className="text-lg font-semibold text-[#183222]">{title}</div>
      <p className="mt-2 text-sm leading-relaxed text-[#56665a] sm:text-base">{text}</p>
    </div>
  );
}
