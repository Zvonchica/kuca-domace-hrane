"use client";

import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";
import {
  Building2,
  ChevronDown,
  CircleCheck,
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Package,
  Phone,
  Salad,
  ShieldCheck,
  ShoppingBag,
  X,
} from "lucide-react";
import {
  additionalTodayDishes,
  business,
  formatPrice,
  futureMedia,
  getTodayMenuKey,
  largerOrderGroups,
  links,
  navigation,
  permanentOffer,
  pies,
  possibleSideDishes,
  saladsAndPeppers,
  weeklyMenu,
} from "@/data/site";

const iconStroke = 1.7;

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b58945] sm:text-sm">{eyebrow}</p>
      <h2 className="mt-3 font-serif text-4xl leading-[0.95] tracking-[-0.035em] text-[#143d2a] sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description && <p className="mt-5 text-base leading-8 text-[#4d554a] sm:text-lg">{description}</p>}
    </div>
  );
}

function Price({ value }: { value: number }) {
  return <span className="whitespace-nowrap font-semibold text-[#143d2a]">{formatPrice(value)}</span>;
}

function OrderButtons({ compact = false }: { compact?: boolean }) {
  const base = compact
    ? "inline-flex min-h-11 items-center justify-center rounded-full px-4 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cfae6d] focus-visible:ring-offset-2"
    : "inline-flex min-h-12 items-center justify-center rounded-full px-5 py-3 text-base font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cfae6d] focus-visible:ring-offset-2";

  return (
    <div className={compact ? "flex flex-wrap gap-2" : "flex flex-wrap gap-3"}>
      <a href={links.phone} className={`${base} bg-[#d6b36d] text-[#173d2a] hover:bg-[#e3c88f]`}>
        <Phone className="mr-2 h-4 w-4" strokeWidth={iconStroke} />
        Pozovite nas
      </a>
      <a href={links.whatsapp} target="_blank" rel="noreferrer" className={`${base} border border-white/30 bg-white/10 text-white hover:bg-white/20`}>
        <MessageCircle className="mr-2 h-4 w-4" strokeWidth={iconStroke} />
        WhatsApp
      </a>
    </div>
  );
}

function DishCard({
  dish,
  emphasis = false,
}: {
  dish: { name: string; quantity: string; price: number; soldOut?: boolean };
  emphasis?: boolean;
}) {
  return (
    <article
      className={`relative flex h-full flex-col rounded-[1.5rem] border p-5 shadow-[0_14px_34px_rgba(20,61,42,0.08)] sm:p-6 ${
        emphasis ? "border-[#d9bc7e] bg-[#fffaf0]" : "border-[#e2ddcf] bg-white"
      }`}
    >
      {dish.soldOut && (
        <span className="absolute right-4 top-4 rounded-full bg-[#eee8dc] px-3 py-1 text-xs font-semibold text-[#535648]">Rasprodato</span>
      )}
      <h3 className="max-w-[18rem] font-serif text-2xl leading-tight text-[#173d2a] sm:text-[1.7rem]">{dish.name}</h3>
      <div className="mt-auto flex items-end justify-between gap-4 border-t border-[#e8dfcf] pt-5">
        <span className="text-sm font-medium text-[#6c6d62]">{dish.quantity}</span>
        <Price value={dish.price} />
      </div>
    </article>
  );
}

function ContactForm() {
  const [kind, setKind] = useState<"kupac" | "firma">("kupac");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, inquiryType: kind }),
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error || "Slanje upita nije uspelo.");

      form.reset();
      setMessage("Hvala. Vaš upit je primljen; javićemo vam se čim budemo u mogućnosti.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Došlo je do greške. Pozovite nas direktno.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const isCompany = kind === "firma";

  return (
    <div className="rounded-[2rem] border border-[#e1d7c5] bg-[#fffdf8] p-5 shadow-[0_18px_50px_rgba(20,61,42,0.10)] sm:p-8">
      <div className="flex flex-wrap gap-2" aria-label="Vrsta upita">
        <button
          type="button"
          onClick={() => setKind("kupac")}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143d2a] ${
            !isCompany ? "bg-[#143d2a] text-white" : "bg-[#f0eadc] text-[#38503e] hover:bg-[#e8dfcf]"
          }`}
        >
          Direktna porudžbina
        </button>
        <button
          type="button"
          onClick={() => setKind("firma")}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143d2a] ${
            isCompany ? "bg-[#143d2a] text-white" : "bg-[#f0eadc] text-[#38503e] hover:bg-[#e8dfcf]"
          }`}
        >
          Ponuda za firmu
        </button>
      </div>

      <h3 className="mt-6 font-serif text-3xl leading-none text-[#143d2a]">{isCompany ? "Zatražite ponudu za firmu" : "Pošaljite nam upit"}</h3>
      <p className="mt-3 text-sm leading-6 text-[#5a6258] sm:text-base">
        {isCompany
          ? `Redovna saradnja za timove od najmanje ${business.corporateMinimumMeals} obroka po isporuci.`
          : "Za najbržu porudžbinu pozovite nas direktno. Formu možete koristiti za pitanja i planirane porudžbine."}
      </p>

      <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
        <label className={isCompany ? "block" : "hidden"}>
          <span className="mb-2 block text-sm font-semibold text-[#2a4736]">Naziv firme</span>
          <input name="company" autoComplete="organization" required={isCompany} className="form-input" />
        </label>
        <label>
          <span className="mb-2 block text-sm font-semibold text-[#2a4736]">Kontakt osoba</span>
          <input name="name" autoComplete="name" required className="form-input" />
        </label>
        <label>
          <span className="mb-2 block text-sm font-semibold text-[#2a4736]">Telefon</span>
          <input name="phone" type="tel" autoComplete="tel" required className="form-input" />
        </label>
        <label>
          <span className="mb-2 block text-sm font-semibold text-[#2a4736]">Email</span>
          <input name="email" type="email" autoComplete="email" required className="form-input" />
        </label>
        <label className={isCompany ? "block" : "hidden"}>
          <span className="mb-2 block text-sm font-semibold text-[#2a4736]">Približan broj obroka</span>
          <input name="mealCount" inputMode="numeric" required={isCompany} className="form-input" />
        </label>
        <label className="sm:col-span-2">
          <span className="mb-2 block text-sm font-semibold text-[#2a4736]">Lokacija</span>
          <input name="location" autoComplete="street-address" required className="form-input" />
        </label>
        <label className="sm:col-span-2">
          <span className="mb-2 block text-sm font-semibold text-[#2a4736]">Poruka <span className="font-normal text-[#6c6d62]">(opciono)</span></span>
          <textarea name="message" rows={4} className="form-input min-h-28 resize-y" />
        </label>
        <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <div className="sm:col-span-2">
          <button type="submit" disabled={isSubmitting} className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#143d2a] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#21563b] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6b36d] focus-visible:ring-offset-2">
            {isSubmitting ? "Slanje upita..." : isCompany ? "Zatražite ponudu za firmu" : "Pošaljite upit"}
          </button>
          {message && <p className="mt-4 text-sm leading-6 text-[#38503e]" role="status">{message}</p>}
        </div>
      </form>
    </div>
  );
}

export default function MakaIkaSite() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLargeOrders, setShowLargeOrders] = useState(false);
  const todayKey = useMemo(() => getTodayMenuKey(), []);
  const todayMenu = weeklyMenu.find((day) => day.key === todayKey) ?? null;
  const availableSideDishes = possibleSideDishes.filter((side) => side.availableToday);

  function closeMobileMenu() {
    setMobileOpen(false);
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fcfaf4] text-[#263d2f]">
      <a href="#sadrzaj" className="skip-link">Preskočite na sadržaj</a>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#123b29]/95 text-white shadow-[0_8px_25px_rgba(16,52,36,0.18)] backdrop-blur">
        <div className="mx-auto flex min-h-[4.75rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <a href="#danas" className="flex min-w-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6b36d]" onClick={closeMobileMenu}>
            <Image src="/brand/makai-ika-zlatna.svg" width={42} height={48} alt="Maka i Ika – domaća kuhinja" className="h-11 w-auto shrink-0" priority />
            <span className="min-w-0">
              <span className="block truncate font-serif text-xl leading-none tracking-wide text-[#f4d897] sm:text-2xl">Maka i Ika</span>
              <span className="mt-1 block truncate text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/75 sm:text-xs">Domaća kuhinja</span>
            </span>
          </a>

          <nav className="hidden items-center gap-5 text-sm font-semibold lg:flex" aria-label="Glavna navigacija">
            {navigation.map((item) => <a key={item.href} href={item.href} className="rounded-md px-1 py-2 text-white/85 transition hover:text-[#f4d897] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6b36d]">{item.label}</a>)}
          </nav>

          <a href={links.phone} className="hidden min-h-11 items-center rounded-full bg-[#d6b36d] px-5 text-sm font-bold text-[#143d2a] transition hover:bg-[#e5c989] lg:inline-flex">
            <Phone className="mr-2 h-4 w-4" strokeWidth={iconStroke} />
            Poručite
          </a>
          <button type="button" aria-label={mobileOpen ? "Zatvori meni" : "Otvori meni"} aria-expanded={mobileOpen} onClick={() => setMobileOpen((open) => !open)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6b36d]">
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {mobileOpen && (
          <nav className="border-t border-white/10 bg-[#123b29] px-4 py-4 lg:hidden" aria-label="Mobilna navigacija">
            <div className="mx-auto grid max-w-7xl gap-1">
              {navigation.map((item) => <a key={item.href} href={item.href} onClick={closeMobileMenu} className="rounded-lg px-4 py-3 font-semibold text-white/90 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6b36d]">{item.label}</a>)}
              <a href={links.phone} onClick={closeMobileMenu} className="mt-2 rounded-lg bg-[#d6b36d] px-4 py-3 font-bold text-[#143d2a]">Pozovite {business.phoneDisplay}</a>
            </div>
          </nav>
        )}
      </header>

      <main id="sadrzaj">
        <section className="relative overflow-hidden bg-[#123b29] pb-16 pt-14 text-white sm:pb-20 sm:pt-20">
          <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_12%_8%,rgba(214,179,109,0.2),transparent_22%),radial-gradient(circle_at_86%_14%,rgba(255,255,255,0.08),transparent_22%),radial-gradient(circle_at_52%_100%,rgba(214,179,109,0.15),transparent_35%)]" />
          <div className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full border border-[#d6b36d]/25 sm:h-96 sm:w-96" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.12fr_0.88fr] lg:px-8">
            <div className="max-w-3xl">
              <p className="inline-flex items-center rounded-full border border-[#d6b36d]/45 bg-[#d6b36d]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#f4d897] sm:text-sm">Banovo brdo · kuvano svakog dana</p>
              <h1 className="mt-6 font-serif text-5xl leading-[0.88] tracking-[-0.045em] text-[#fffaf0] sm:text-6xl lg:text-7xl">Domaće, sveže i kuvano kao za svoje.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82 sm:text-xl">Maka i Ika je lokalna domaća kuhinja iz Požeške. Kuvamo u manjim količinama, od pažljivo odabranih namirnica, dok traju zalihe.</p>
              <div className="mt-8"><OrderButtons /></div>
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/75 sm:text-base">
                <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-[#d6b36d]" /> {business.hours[0]}</span>
                <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-[#d6b36d]" /> Banovo brdo</span>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-sm rounded-[2rem] border border-[#d6b36d]/35 bg-white/[0.06] p-6 shadow-[0_28px_70px_rgba(0,0,0,0.22)] backdrop-blur-sm sm:p-8">
              <Image src="/brand/makai-ika-zlatna.svg" alt="Zvanični logo Maka i Ika – domaća kuhinja" width={835} height={954} className="mx-auto h-auto w-full max-w-[17rem]" priority />
            </div>
          </div>
        </section>

        <section id="danas" className="scroll-mt-24 border-y border-[#dfd6c5] bg-[#f4ead8] py-14 sm:py-18">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.19em] text-[#9c733a]">Dostupno danas</p>
                <h2 className="mt-3 font-serif text-5xl leading-[0.9] tracking-[-0.04em] text-[#143d2a] sm:text-6xl">Šta danas kuvamo?</h2>
              </div>
              <p className="max-w-2xl text-lg leading-8 text-[#495549]">Kuvamo u ograničenim količinama. Pozovite nas da potvrdite dostupnost i rezervišete svoj ručak.</p>
            </div>
            <div className="mt-8 rounded-[1.75rem] border border-[#d8b978] bg-[#143d2a] p-5 text-white shadow-[0_18px_45px_rgba(20,61,42,0.18)] sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-6">
              <div className="flex items-start gap-4">
                <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#d6b36d] text-[#143d2a]"><Package className="h-5 w-5" strokeWidth={iconStroke} /></span>
                <div><p className="font-serif text-2xl text-[#f7dfa9]">Ograničene količine – dok traju zalihe</p><p className="mt-1 text-sm leading-6 text-white/75 sm:text-base">Dostupnost se menja tokom dana. Najsigurnije je da nas pozovete pre dolaska.</p></div>
              </div>
              <a href={links.phone} className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-bold text-[#143d2a] transition hover:bg-[#f7eddb] sm:mt-0">Proverite dostupnost</a>
            </div>

            {todayMenu ? (
              <div className="mt-8">
                <p className="mb-4 text-lg font-semibold text-[#2c4937]">{todayMenu.name}</p>
                <div className="grid gap-4 md:grid-cols-2">{todayMenu.dishes.map((dish) => <DishCard key={dish.id} dish={dish} emphasis />)}</div>
              </div>
            ) : (
              <div className="mt-8 rounded-[1.5rem] border border-[#ddcfb7] bg-white p-6 text-[#475348]"><p className="font-serif text-2xl text-[#143d2a]">Danas ne radimo.</p><p className="mt-2 leading-7">Radujemo se novoj nedelji domaćih ručkova. Pogledajte naš jelovnik za radne dane ili nas kontaktirajte za planiranu porudžbinu.</p></div>
            )}
            {additionalTodayDishes.length > 0 && <div className="mt-5"><p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#9c733a]">Još dostupno danas – dok traju zalihe</p><div className="grid gap-4 md:grid-cols-2">{additionalTodayDishes.map((dish) => <DishCard key={dish.id} dish={dish} />)}</div></div>}
          </div>
        </section>

        <section id="meni" className="scroll-mt-24 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Nedeljni jelovnik" title="Domaći ručak za svaki radni dan" description="Jelovnik je pregledan unapred, a dostupnost za isti dan potvrdite telefonom. Cene i ponuda se lako ažuriraju u jednoj datoteci." />
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">{weeklyMenu.map((day) => <article key={day.key} className={`rounded-[1.5rem] border p-5 ${day.key === todayKey ? "border-[#d2b16e] bg-[#fff9ed] shadow-[0_16px_34px_rgba(20,61,42,0.10)]" : "border-[#e5dfd2] bg-white"}`}><p className="text-sm font-bold uppercase tracking-[0.15em] text-[#a1783b]">{day.key === todayKey ? "Danas" : day.name}</p><h3 className="mt-3 font-serif text-2xl text-[#143d2a]">{day.name}</h3><div className="mt-5 space-y-4">{day.dishes.map((dish) => <div key={dish.id} className="border-t border-[#ece5d7] pt-4"><p className="font-semibold leading-6 text-[#274434]">{dish.name}</p><p className="mt-2 text-sm text-[#6a7067]">{dish.quantity}</p><p className="mt-1"><Price value={dish.price} /></p></div>)}</div></article>)}</div>
          </div>
        </section>

        <section id="stalna-ponuda" className="scroll-mt-24 bg-[#f1ede3] py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Stalna ponuda" title="Kada želite nešto provereno domaće" description="Uz svako jelo iz stalne ponude uključen je jedan prilog od 200 g. Prilog zavisi od dnevne ponude." />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{permanentOffer.map((dish) => <DishCard key={dish.id} dish={{ name: dish.name, quantity: dish.quantity ?? "", price: dish.price ?? 0 }} />)}</div>
            <div className="mt-8 rounded-[1.5rem] border border-[#d9d0bf] bg-white p-5 sm:p-6"><p className="font-serif text-2xl text-[#143d2a]">Dnevni prilozi</p>{availableSideDishes.length ? <div className="mt-4 flex flex-wrap gap-2">{availableSideDishes.map((side) => <span key={side.id} className="rounded-full bg-[#e7efe7] px-4 py-2 text-sm font-semibold text-[#244837]">{side.name}</span>)}</div> : <p className="mt-3 text-sm leading-6 text-[#5b6358] sm:text-base">Dostupnost priloga se menja iz dana u dan. Potvrdite izbor pri poručivanju.</p>}</div>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[1.02fr_0.98fr]">
              <div>
                <SectionHeading eyebrow="Salate i paprike" title="Uz ručak, po vašem ukusu" description="Dnevna raspoloživost se potvrđuje pri poručivanju." />
                <div className="mt-8 grid gap-3 sm:grid-cols-2">{saladsAndPeppers.map((item) => <article key={item.id} className="flex items-end justify-between gap-4 rounded-2xl border border-[#e5dfd2] bg-white p-4"><div><h3 className="font-semibold text-[#244837]">{item.name}</h3><p className="mt-1 text-sm text-[#6b7267]">{item.quantity}</p></div><Price value={item.price ?? 0} /></article>)}</div>
              </div>
              <div className="rounded-[2rem] bg-[#143d2a] p-6 text-white sm:p-8">
                <Salad className="h-9 w-9 text-[#d6b36d]" strokeWidth={iconStroke} />
                <h2 className="mt-6 font-serif text-4xl leading-none text-[#fff8e9]">Porodične porudžbine i domaće pite</h2>
                <p className="mt-4 leading-7 text-white/75">Za veću količinu salata, priloga i pite u celom plehu dogovaramo porudžbinu unapred.</p>
                <button type="button" onClick={() => setShowLargeOrders((shown) => !shown)} className="mt-6 inline-flex min-h-11 items-center rounded-full border border-[#d6b36d]/60 px-5 text-sm font-bold text-[#f4d897] transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6b36d]">{showLargeOrders ? "Sakrij detaljnu ponudu" : "Pogledajte detaljnu ponudu"}<ChevronDown className={`ml-2 h-4 w-4 transition ${showLargeOrders ? "rotate-180" : ""}`} /></button>
              </div>
            </div>
            {showLargeOrders && <div className="mt-8 grid gap-5 lg:grid-cols-3">{largerOrderGroups.map((group) => <article key={group.title} className="rounded-[1.5rem] border border-[#dfd7c7] bg-white p-5"><h3 className="font-serif text-2xl text-[#143d2a]">{group.title}</h3><div className="mt-5 space-y-4">{group.items.map((item) => <div key={item.id} className="border-t border-[#ece6da] pt-4"><p className="font-semibold text-[#294735]">{item.name}</p><div className="mt-2 space-y-1 text-sm text-[#5d655b]">{item.options.map((option) => <div key={option.label} className="flex justify-between gap-3"><span>{option.label}</span><Price value={option.price} /></div>)}</div></div>)}</div></article>)}<article className="rounded-[1.5rem] border border-[#dfd7c7] bg-[#fffaf0] p-5"><h3 className="font-serif text-2xl text-[#143d2a]">Domaće pite</h3><div className="mt-5 space-y-4">{pies.map((item) => <div key={item.id} className="border-t border-[#e8ddca] pt-4"><p className="font-semibold text-[#294735]">{item.name}</p><div className="mt-2 space-y-1 text-sm text-[#5d655b]">{item.options?.map((option) => <div key={option.label} className="flex justify-between gap-3"><span>{option.label}</span><Price value={option.price} /></div>)}</div></div>)}</div></article></div>}
          </div>
        </section>

        <section id="porucivanje" className="scroll-mt-24 bg-[#f3e8d2] py-16 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
            <div>
              <SectionHeading eyebrow="Poručivanje i preuzimanje" title="Direktno, jednostavno i sa popustom" description={`Za direktnu porudžbinu i lično preuzimanje u lokalu odobravamo ${business.directOrderDiscount}% popusta na redovnu cenu.`} />
              <div className="mt-8 space-y-4"><a href={links.phone} className="group flex items-center gap-4 rounded-[1.5rem] border border-[#d7bc84] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#143d2a] text-[#f4d897]"><Phone className="h-5 w-5" /></span><span><span className="block font-semibold text-[#143d2a]">Direktna porudžbina / lično preuzimanje</span><span className="mt-1 block text-sm text-[#5e665b]">{business.phoneDisplay} · {business.directOrderDiscount}% popusta</span></span></a><a href={links.whatsapp} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-[1.5rem] border border-[#d7bc84] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#143d2a] text-[#f4d897]"><MessageCircle className="h-5 w-5" /></span><span><span className="block font-semibold text-[#143d2a]">WhatsApp</span><span className="mt-1 block text-sm text-[#5e665b]">Pošaljite nam poruku</span></span></a><a href={links.phone} className="group flex items-center gap-4 rounded-[1.5rem] border border-[#d7bc84] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#143d2a] text-[#f4d897]"><Phone className="h-5 w-5" /></span><span><span className="block font-semibold text-[#143d2a]">Viber / poziv</span><span className="mt-1 block text-sm text-[#5e665b]">Siguran kontakt na poslovni broj</span></span></a></div>
            </div>
            <div className="rounded-[2rem] bg-[#143d2a] p-6 text-white shadow-[0_24px_60px_rgba(20,61,42,0.2)] sm:p-8"><ShoppingBag className="h-9 w-9 text-[#d6b36d]" strokeWidth={iconStroke} /><h2 className="mt-6 font-serif text-4xl leading-none text-[#fff8e9]">Naručite i preko dostavnih platformi</h2><p className="mt-4 leading-7 text-white/75">Ako vam je tako jednostavnije, pronađite Maka i Ika na zvaničnim platformama.</p><div className="mt-7 grid gap-3 sm:grid-cols-2"><a href={links.wolt} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#d6b36d] px-5 font-bold text-[#143d2a] transition hover:bg-[#e5c989]">Wolt <ExternalLink className="ml-2 h-4 w-4" /></a><a href={links.glovo} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-5 font-bold text-white transition hover:bg-white/10">Glovo <ExternalLink className="ml-2 h-4 w-4" /></a></div></div>
          </div>
        </section>

        <section id="za-firme" className="scroll-mt-24 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="rounded-[2.2rem] bg-[#143d2a] px-6 py-10 text-white shadow-[0_25px_70px_rgba(20,61,42,0.22)] sm:px-10 sm:py-14"><div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"><div><Building2 className="h-10 w-10 text-[#d6b36d]" strokeWidth={iconStroke} /><p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-[#d6b36d]">Ponuda za firme</p><h2 className="mt-3 font-serif text-5xl leading-[0.9] text-[#fff8e9] sm:text-6xl">Domaći ručak za zaposlene</h2><p className="mt-6 text-lg leading-8 text-white/78">Za kancelarije i timove kojima je važan jasan dogovor, pouzdana količina i domaći obrok bez komplikacija.</p><ul className="mt-7 space-y-3 text-white/88">{["unapred dogovorena količina", "jednostavno poručivanje i direktna komunikacija", "jasan trošak i mogućnost redovne saradnje", `minimum ${business.corporateMinimumMeals} obroka po jednoj isporuci`, `${business.corporateDiscount}% popusta prema važećoj korporativnoj ponudi`].map((item) => <li key={item} className="flex gap-3"><CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#d6b36d]" strokeWidth={iconStroke} />{item}</li>)}</ul></div><div className="rounded-[1.75rem] border border-white/15 bg-white/[0.07] p-6 sm:p-8"><p className="font-serif text-3xl text-[#fff8e9]">Zatražite ponudu za firmu</p><p className="mt-3 leading-7 text-white/75">Ostavite kontakt i približan broj obroka. Javljamo se sa jasnim predlogom saradnje.</p><a href="#kontakt" className="mt-7 inline-flex min-h-12 items-center rounded-full bg-[#d6b36d] px-6 font-bold text-[#143d2a] transition hover:bg-[#e5c989]">Otvorite kontakt formu</a></div></div></div></div>
        </section>

        <section id="o-nama" className="scroll-mt-24 bg-[#f1ede3] py-16 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8"><div className="rounded-[2rem] border border-[#d5c4a4] bg-[#f4e1bc] p-6 sm:p-9"><Image src="/brand/makai-ika-zlatna.svg" alt="" width={835} height={954} className="mx-auto h-auto w-full max-w-[19rem]" /></div><div><SectionHeading eyebrow="O nama" title="Kuvamo za druge onako kako kuvamo za svoje." /><div className="mt-7 space-y-5 text-base leading-8 text-[#4d574c] sm:text-lg"><p>Maka i Ika je domaća kuhinja nastala iz jednostavne ideje – da kuvamo za druge onako kako kuvamo za svoje.</p><p>Kod nas nema prečica kada je u pitanju kvalitet. Biramo namirnice sa lokalnih pijaca i od proverenih dobavljača, vodeći se istim kriterijumom kojim biramo hranu za sopstvenu porodicu.</p><p>Koristimo domaća jaja, sveže povrće i kvalitetno meso, uz pažnju prema poreklu i svežini namirnica. Jela označena kao juneća pripremamo od junetine, dok je svinjetina jasno navedena tamo gde se koristi.</p><p>Kuvamo svakog dana, u manjim količinama. Želimo da kada otvorite našu kutiju imate osećaj da je neko tog dana kuvao ručak baš za vas.</p></div><blockquote className="mt-7 border-l-4 border-[#b58945] pl-5 font-serif text-2xl leading-tight text-[#143d2a] sm:text-3xl">„Ono što ne bismo stavili na svoj sto, nećemo staviti ni na vaš.”</blockquote></div></div>
        </section>

        <section className="py-16 sm:py-24"><div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8"><article className="rounded-[2rem] border border-[#dde2d8] bg-[#eff4ee] p-6 sm:p-8"><ShieldCheck className="h-10 w-10 text-[#143d2a]" strokeWidth={iconStroke} /><h2 className="mt-6 font-serif text-4xl leading-none text-[#143d2a]">Bezbednost hrane nam je važna.</h2><p className="mt-5 leading-8 text-[#4a5c4d]">Poslujemo po principima dobre higijenske prakse i HACCP sistema, uz kontrolu prijema namirnica, pripreme, čuvanja i rukovanja hranom.</p></article><article className="rounded-[2rem] border border-[#e0d3b9] bg-[#fff8eb] p-6 sm:p-8"><MapPin className="h-10 w-10 text-[#a87832]" strokeWidth={iconStroke} /><h2 className="mt-6 font-serif text-4xl leading-none text-[#143d2a]">Svratite do nas.</h2><p className="mt-5 leading-8 text-[#4a5c4d]">Kuhinja se nalazi na adresi {business.kitchenAddress}. Radimo {business.hours[0].toLowerCase()}</p><a href={links.maps} target="_blank" rel="noreferrer" className="mt-6 inline-flex min-h-11 items-center rounded-full bg-[#143d2a] px-5 text-sm font-bold text-white transition hover:bg-[#21563b]">Prikaži na mapi <ExternalLink className="ml-2 h-4 w-4" /></a></article></div></section>

        <section id="kontakt" className="scroll-mt-24 bg-[#f3e8d2] py-16 sm:py-24"><div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8"><div><SectionHeading eyebrow="Kontakt" title="Tu smo za vaše pitanje ili porudžbinu." /><div className="mt-8 space-y-4"><a href={links.phone} className="flex gap-4 rounded-2xl border border-[#ddcfb4] bg-white p-4 transition hover:shadow-md"><Phone className="mt-1 h-5 w-5 shrink-0 text-[#a87832]" /><span><span className="block text-sm text-[#687064]">Telefon</span><span className="mt-1 block font-semibold text-[#173d2a]">{business.phoneDisplay}</span></span></a><a href={links.email} className="flex gap-4 rounded-2xl border border-[#ddcfb4] bg-white p-4 transition hover:shadow-md"><Mail className="mt-1 h-5 w-5 shrink-0 text-[#a87832]" /><span><span className="block text-sm text-[#687064]">Email</span><span className="mt-1 block break-all font-semibold text-[#173d2a]">{business.email}</span></span></a><div className="flex gap-4 rounded-2xl border border-[#ddcfb4] bg-white p-4"><Clock className="mt-1 h-5 w-5 shrink-0 text-[#a87832]" /><span><span className="block text-sm text-[#687064]">Radno vreme</span><span className="mt-1 block font-semibold text-[#173d2a]">{business.hours[0]}<br />{business.hours[1]}</span></span></div></div></div><ContactForm /></div></section>
      </main>

      <footer className="bg-[#0d2c1f] py-12 text-white/82"><div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-[1.1fr_1fr_1fr] lg:px-8"><div><Image src="/brand/makai-ika-zlatna.svg" alt="Maka i Ika – domaća kuhinja" width={835} height={954} className="h-28 w-auto" /><p className="mt-4 max-w-sm text-sm leading-7 text-white/70">Maka i Ika – domaća kuhinja. Domaće, sveže i kuvano kao za svoje.</p><div className="mt-5 flex gap-3"><a href={links.instagram} target="_blank" rel="noreferrer" aria-label="Instagram Maka i Ika" className="rounded-full border border-white/20 p-2.5 transition hover:bg-white/10"><span aria-hidden="true" className="text-sm font-bold">IG</span></a><a href={links.facebook} target="_blank" rel="noreferrer" aria-label="Facebook Maka i Ika" className="rounded-full border border-white/20 p-2.5 transition hover:bg-white/10"><span aria-hidden="true" className="text-sm font-bold">f</span></a><a href={links.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp Maka i Ika" className="rounded-full border border-white/20 p-2.5 transition hover:bg-white/10"><MessageCircle className="h-5 w-5" /></a></div></div><div><h2 className="font-serif text-2xl text-[#f4d897]">Kontakt kuhinje</h2><address className="mt-4 not-italic text-sm leading-7 text-white/72"><p>{business.kitchenAddress}</p><p className="mt-3"><a href={links.phone} className="hover:text-[#f4d897]">{business.phoneDisplay}</a><br /><a href={links.email} className="hover:text-[#f4d897]">{business.email}</a></p><p className="mt-3">{business.hours[0]}<br />{business.hours[1]}</p></address></div><div><h2 className="font-serif text-2xl text-[#f4d897]">Podaci o preduzetniku</h2><div className="mt-4 text-sm leading-7 text-white/72"><p className="font-semibold text-white/88">{business.legalName}</p><p className="mt-3">PIB: {business.pib}<br />Matični broj: {business.registrationNumber}</p><p className="mt-3">Sedište: {business.registeredAddress}</p><p className="mt-3">{business.vatStatus}</p></div></div></div><div className="mx-auto mt-10 max-w-7xl border-t border-white/10 px-4 pt-6 text-center text-sm text-white/55 sm:px-6 lg:px-8">© {new Date().getFullYear()} Maka i Ika – domaća kuhinja. Sva prava zadržana.</div></footer>

      {futureMedia.video && <section aria-label="Video" className="hidden"><video src={futureMedia.video.src} poster={futureMedia.video.poster} preload="metadata" controls /></section>}
    </div>
  );
}
