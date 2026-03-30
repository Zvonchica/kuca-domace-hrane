"use client";

import { useEffect, useMemo, useState } from "react";

type GalleryItem = {
  id: number;
  label: string;
};

type VideoItem = {
  id: number;
  title: string;
  desc: string;
};

type FaqItem = {
  q: string;
  a: string;
};

function getVisible<T>(items: T[], startIndex: number, count: number): T[] {
  const visible: T[] = [];
  for (let i = 0; i < count; i++) {
    visible.push(items[(startIndex + i) % items.length]);
  }
  return visible;
}

export default function Page() {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const galleryItems = useMemo<GalleryItem[]>(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        label: `Fotografija ${i + 1}`,
      })),
    []
  );

  const videoItems = useMemo<VideoItem[]>(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        title: `Video ${i + 1}`,
        desc: "Priprema / pakovanje / dostava",
      })),
    []
  );

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

  return (
    <div className="min-h-screen bg-[#fafaf8] text-[#2f2f2f]">
      <header className="sticky top-0 z-30 border-b border-[#e7e7e2] bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="min-w-0 pr-3">
            <div className="truncate text-lg font-semibold tracking-tight sm:text-[20px]">
              Kuća domaće hrane
            </div>
            <div className="truncate text-xs text-[#777]">
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
              className="rounded-2xl bg-[#1f3d2b] px-5 py-3 text-white"
            >
              Ponuda
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#ddddda] bg-white lg:hidden"
            aria-label="Otvori meni"
          >
            {mobileMenuOpen ? (
              <span className="text-[20px]">✕</span>
            ) : (
              <span className="text-[20px]">☰</span>
            )}
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
                className="mt-4 rounded-2xl bg-[#1f3d2b] px-5 py-3 text-center text-white"
              >
                Ponuda
              </a>
            </div>
          </div>
        )}
      </header>

      <section className="relative flex min-h-[560px] items-center justify-center overflow-hidden sm:min-h-[620px] lg:min-h-[720px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-food.jpg')" }}
        />

        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/50" />

        <div className="relative z-10 mx-auto flex w-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-center text-white">

            <h1 className="text-[38px] font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[64px] xl:text-[72px]">
              Ručak za vaš tim —
              <br />
              bez stresa i planiranja
            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-xl leading-8 text-white/90">
              Domaći kuvani obroci za firme. Dogovor unapred, pouzdana dostava i zadovoljan tim — svaki dan.
            </p>

            <div className="mt-7 space-y-3 text-base text-white/90 sm:text-lg">
              <div>✔ Nema više pitanja “šta danas za ručak”</div>
              <div>✔ Dogovor unapred — bez svakodnevne organizacije</div>
              <div>✔ Pouzdana dostava svaki radni dan</div>
            </div>

            <div className="mt-8 flex justify-center">
              <a
                href="#kontakt"
                className="rounded-2xl bg-[#1f6b53] px-9 py-4 text-lg font-semibold text-white shadow-sm transition hover:bg-[#17523f]"
              >
                Zatražite ponudu
              </a>
            </div>

            <p className="mt-4 text-base text-white/75">
              Bez obaveze • Odgovor u toku dana
            </p>

          </div>
        </div>
      </section>

      <section
        id="kako"
        className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8"
      >
        <h2 className="text-center text-3xl font-semibold tracking-tight sm:text-4xl">
          Kako funkcioniše
        </h2>

        <div className="mt-10 hidden lg:grid lg:grid-cols-3 lg:items-start">
          {[
            {
              num: "1",
              title: "Pošaljete broj ljudi i lokaciju",
              desc: "Javite nam veličinu tima, adresu firme i da li želite dnevni ili nedeljni model saradnje.",
              icon: "📋",
            },
            {
              num: "2",
              title: "Dogovaramo meni",
              desc: "Pravimo predlog obroka koji odgovara ritmu vašeg radnog dana i načinu funkcionisanja firme.",
              icon: "👨‍🍳",
            },
            {
              num: "3",
              title: "Dostava na adresu firme",
              desc: "Obroci stižu uredno spakovani i u dogovoreno vreme, bez dodatnog opterećenja za vaš tim.",
              icon: "🚚",
            },
          ].map((item, index, arr) => (
            <div key={item.num} className="relative px-3 text-center xl:px-4">
              {index < arr.length - 1 && (
                <div className="absolute left-[58%] top-[42px] hidden h-[2px] w-[84%] bg-[#1f3d2b] lg:block" />
              )}

              <div className="relative mx-auto flex h-[84px] w-[84px] items-center justify-center rounded-full border-2 border-[#1f3d2b] bg-white">
                <span className="absolute -left-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#1f3d2b] text-xs font-semibold text-white">
                  {item.num}
                </span>
                <span className="text-[28px]">{item.icon}</span>
              </div>

              <h3 className="mx-auto mt-6 max-w-[260px] text-2xl font-semibold leading-tight xl:max-w-[320px]">
                {item.title}
              </h3>

              <p className="mx-auto mt-4 max-w-sm text-base leading-8 text-[#555]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:hidden xl:hidden">
          {[
            {
              num: "1",
              title: "Pošaljete broj ljudi i lokaciju",
              desc: "Javite nam veličinu tima, adresu firme i da li želite dnevni ili nedeljni model saradnje.",
              icon: "📋",
            },
            {
              num: "2",
              title: "Dogovaramo meni",
              desc: "Pravimo predlog obroka koji odgovara ritmu vašeg radnog dana i načinu funkcionisanja firme.",
              icon: "👨‍🍳",
            },
            {
              num: "3",
              title: "Dostava na adresu firme",
              desc: "Obroci stižu uredno spakovani i u dogovoreno vreme, bez dodatnog opterećenja za vaš tim.",
              icon: "🚚",
            },
          ].map((item) => (
            <div key={item.num} className="rounded-3xl bg-white p-6 shadow-sm sm:p-7">
              <div className="mb-4 flex items-center gap-4">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[#1f3d2b] bg-white">
                  <span className="absolute -left-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#1f3d2b] text-[11px] font-semibold text-white">
                    {item.num}
                  </span>
                  <span className="text-[22px]">{item.icon}</span>
                </div>
                <h3 className="text-lg font-semibold leading-tight">{item.title}</h3>
              </div>
              <p className="text-sm leading-7 text-[#666]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="ponuda"
        className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8"
      >
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Dve opcije saradnje
        </h2>

        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          <div className="rounded-3xl bg-white p-7 shadow-md sm:p-10">
            <div className="text-sm text-[#1f3d2b]">Dnevni obrok</div>
            <h3 className="mt-2 text-2xl font-semibold">Po potrebi</h3>
            <p className="mt-3 leading-8 text-[#555]">
              Za firme kojima je potreban kvalitetan ručak bez obaveze dugog
              planiranja. Praktično, jasno i fleksibilno.
            </p>
            <ul className="mt-4 space-y-2 text-[#555]">
              <li>• kuvano za taj dan</li>
              <li>• supa ili čorba</li>
              <li>• glavno jelo</li>
              <li>• prilog i salata</li>
            </ul>
          </div>

          <div className="rounded-3xl bg-[#1f3d2b] p-7 text-white shadow-md sm:p-10">
            <div className="text-sm text-white/80">Nedeljni plan</div>
            <h3 className="mt-2 text-2xl font-semibold">
              Kontinuitet bez razmišljanja
            </h3>
            <p className="mt-3 leading-8 text-white/80">
              Najbolji izbor za timove koji žele da ručak bude unapred rešen,
              organizovan i lak za svakodnevno funkcionisanje.
            </p>
            <ul className="mt-4 space-y-2 text-white/80">
              <li>• meni za celu nedelju</li>
              <li>• unapred dogovoreno</li>
              <li>• stabilan ritam isporuke</li>
              <li>• manje improvizacije i više reda</li>
            </ul>
          </div>
        </div>
      </section>

      <section
        id="video"
        className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Kako izgleda u praksi
            </h2>
            <p className="mt-3 max-w-2xl text-[#555]">
              Kratki snimci pripreme, pakovanja i isporuke koji pokazuju kako
              saradnja izgleda u realnom radu.
            </p>
          </div>

          <div className="flex gap-3 self-start sm:self-auto">
            <button
              onClick={() =>
                setVideoIndex((prev) => (prev - 1 + videoItems.length) % videoItems.length)
              }
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#dcdcdc] bg-white text-lg shadow-sm"
              aria-label="Prethodni video"
            >
              <span>←</span>
            </button>

            <button
              onClick={() =>
                setVideoIndex((prev) => (prev + 1) % videoItems.length)
              }
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#dcdcdc] bg-white text-lg shadow-sm"
              aria-label="Sledeći video"
            >
              <span>→</span>
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {getVisible(videoItems, videoIndex, 4).map((item) => (
            <div key={item.id} className="overflow-hidden rounded-3xl bg-white p-3 shadow-md">
              <div className="relative aspect-[4/5] rounded-2xl bg-[#e3e3de]">
                <div className="absolute inset-0 flex items-center justify-center text-sm text-[#666]">
                  video
                </div>
                <div className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-lg shadow-sm">
                  <span className="ml-1 text-[#1f3d2b]">▶</span>
                </div>
              </div>
              <div className="mt-3 text-sm font-medium text-[#444]">
                {item.title}
              </div>
              <div className="mt-1 text-sm text-[#666]">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section
        id="galerija"
        className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Galerija obroka
            </h2>
            <p className="mt-3 max-w-2xl text-[#555]">
              Velike fotografije hrane, serviranja, pakovanja i detalja koji
              grade poverenje i bude apetit.
            </p>
          </div>

          <div className="flex gap-3 self-start sm:self-auto">
            <button
              onClick={() =>
                setGalleryIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length)
              }
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#dcdcdc] bg-white text-lg shadow-sm"
              aria-label="Prethodna slika"
            >
              <span>←</span>
            </button>

            <button
              onClick={() =>
                setGalleryIndex((prev) => (prev + 1) % galleryItems.length)
              }
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#dcdcdc] bg-white text-lg shadow-sm"
              aria-label="Sledeća slika"
            >
              <span>→</span>
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {getVisible(galleryItems, galleryIndex, 4).map((item) => (
            <div key={item.id} className="overflow-hidden rounded-3xl bg-white p-3 shadow-md">
              <div className="aspect-[4/5] rounded-2xl bg-[#e3e3de]" />
              <div className="mt-3 text-sm text-[#666]">
                {item.label} — obrok / posluženje / detalj
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        id="meni"
        className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8"
      >
        <div className="rounded-3xl bg-white p-6 shadow-md sm:p-10">
          <div className="mb-2 text-sm text-[#1f3d2b]">PRIMER MENIJA</div>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Kako to može da izgleda tokom nedelje
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {[
              ["Ponedeljak", "Pileća supa", "Musaka", "Sezonska salata"],
              ["Utorak", "Teleća čorba", "Piletina sa pirinčem", "Kupus salata"],
              ["Sreda", "Paradajz čorba", "Punjene paprike", "Domaći hleb"],
              ["Četvrtak", "Potaž od povrća", "Juneće ćufte u sosu", "Pire krompir"],
              ["Petak", "Riblja čorba", "Oslić sa krompirom", "Zelena salata"],
            ].map(([d, a, b, c]) => (
              <div key={d} className="rounded-2xl bg-[#f4f4f1] p-5">
                <div className="mb-2 font-semibold">{d}</div>
                <div className="space-y-1 text-sm text-[#555]">
                  <div>{a}</div>
                  <div>{b}</div>
                  <div>{c}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="recenzije"
        className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8"
      >
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Šta kažu firme
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[
            [
              "Od kada radimo sa njima, ručak više nije tema oko koje gubimo vreme. Sve je uredno, jasno i ukusno.",
              "Mali tim iz kancelarije",
            ],
            [
              "Najviše nam znači što je saradnja jednostavna. Nema komplikacija, a obroci su domaći i pouzdani.",
              "Agencija od 8 zaposlenih",
            ],
            [
              "Kada imaš radni dan pun sastanaka, mnogo znači da znaš da je ručak već rešen.",
              "Privatna ordinacija",
            ],
          ].map(([quote, author], i) => (
            <div key={i} className="rounded-2xl bg-white p-6 shadow-md">
              <div className="text-sm leading-7 text-[#555]">“{quote}”</div>
              <div className="mt-4 text-sm font-semibold text-[#1f3d2b]">
                {author}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="onama" className="py-10 sm:py-12">
  <div className="relative w-full overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: "url('/o-nama-hrana.jpg')" }}
    />

    <div className="absolute inset-0 bg-black/25" />
    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/30" />

    <div className="h-[620px] w-full sm:h-[700px] md:h-[760px] lg:h-[820px]" />

    <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-10">
      <div className="w-full max-w-[92%] text-center text-white sm:max-w-2xl lg:max-w-3xl -mt-4 sm:-mt-6 lg:-mt-10">
        <div
          className="mb-4 text-xs uppercase tracking-[0.2em] text-white/80 sm:mb-5 sm:text-sm"
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.45)" }}
        >
          O nama
        </div>

        <h2
          className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
          style={{ textShadow: "0 3px 18px rgba(0,0,0,0.55)" }}
        >
          Domaća kuhinja koja se pamti
        </h2>

        <p
          className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-white/95 sm:mt-5 sm:text-xl md:text-2xl"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.45)" }}
        >
          Hrana pripremljena sa pažnjom, iz kuhinje u kojoj se kuva kako treba.
        </p>

        <div
          className="mx-auto mt-6 max-w-md space-y-4 text-base leading-7 text-white/90 sm:mt-8 sm:max-w-xl sm:space-y-5 sm:text-lg sm:leading-8 md:max-w-2xl md:text-xl lg:max-w-3xl"
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.40)" }}
        >
          <p>
            Ova kuhinja nastala je iz navike da se za stolom okuplja uz dobru,
            domaću hranu — onu koja se pamti.
          </p>

          <p>
            Baka koja kuva stoji iza svakog obroka — sa iskustvom i sigurnošću
            koja se ne može naučiti preko noći.
          </p>

          <p>
            Znanje iz tradicionalne kuhinje prilagodili smo tempu modernih firmi,
            bez kompromisa kada je u pitanju kvalitet.
          </p>

          <p className="font-medium text-white">
            Pouzdan, domaći ručak na koji možete da se oslonite — svaki dan.
          </p>
        </div>

        <div className="mt-10 sm:mt-12 lg:mt-14 flex justify-center">
          <a
            href="#ponuda"
            className="inline-block rounded-lg bg-[#1f3d2b] px-8 py-4 text-lg font-semibold text-white shadow-md transition hover:bg-[#28543c] hover:-translate-y-0.5"
          >
            Pogledajte ponudu
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
      <section
        id="faq"
        className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8"
      >
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Česta pitanja
        </h2>

        <div className="mt-8 space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={item.q} className="overflow-hidden rounded-2xl bg-white shadow-sm">
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

      <section
        id="kontakt"
        className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8"
      >
        <div className="rounded-3xl bg-[#1f3d2b] p-7 text-white sm:p-12">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Pošaljite broj zaposlenih i lokaciju firme
          </h2>
          <p className="mt-4 max-w-2xl text-white/80">
            Dobijate konkretnu ponudu i predlog saradnje za dnevni ili nedeljni
            model, bez nepotrebnog komplikovanja.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <button className="rounded-xl bg-white px-6 py-3 text-[#1f3d2b]">
              Zatražite ponudu
            </button>
            <button className="rounded-xl border border-white/30 px-6 py-3 text-white">
              Popuni Google formu
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8">
        <div className="rounded-3xl border border-[#e9ece8] bg-white px-5 py-6 shadow-sm sm:px-7">
          <div className="text-center text-sm text-[#666] sm:text-base">
            Zapratite nas i pogledajte kako izgleda naša svakodnevna kuhinja
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href="#"
              className="flex items-center gap-2 rounded-full bg-[#eef4f0] px-4 py-3 text-sm text-[#1f3d2b]"
            >
              <span>◎</span> Instagram
            </a>
            <a
              href="#"
              className="flex items-center gap-2 rounded-full bg-[#eef4f0] px-4 py-3 text-sm text-[#1f3d2b]"
            >
              <span>♪</span> TikTok
            </a>
            <a
              href="#"
              className="flex items-center gap-2 rounded-full bg-[#eef4f0] px-4 py-3 text-sm text-[#1f3d2b]"
            >
              <span>f</span> Facebook
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#eaeaea] bg-white py-12">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-[1.1fr_1fr_1fr] lg:px-8">
          <div>
            <div className="mb-3 text-xl font-semibold">Kuća domaće hrane</div>
            <div className="max-w-sm text-sm leading-7 text-[#666]">
              Domaći obroci za firme i kancelarije. Pouzdana dostava, uredna
              saradnja i meni koji se dogovara unapred.
            </div>
            <div className="mt-5 flex flex-wrap gap-3 text-sm text-[#1f3d2b]">
              <span className="rounded-full bg-[#eef4f0] px-3 py-2">
                Instagram
              </span>
              <span className="rounded-full bg-[#eef4f0] px-3 py-2">
                TikTok
              </span>
              <span className="rounded-full bg-[#eef4f0] px-3 py-2">
                Facebook
              </span>
            </div>
          </div>

          <div>
            <div className="mb-3 font-semibold">Podaci o firmi</div>
            <div className="space-y-2 text-sm text-[#666]">
              <div>Ime firme</div>
              <div>Adresa firme</div>
              <div>PIB / Matični broj</div>
              <div>Email adresa</div>
              <div>Telefon</div>
            </div>
          </div>

          <div>
            <div className="mb-3 font-semibold">Ostalo</div>
            <div className="space-y-2 text-sm text-[#666]">
              <div>Uslovi korišćenja</div>
              <div>Politika privatnosti</div>
              <div>Politika poručivanja</div>
              <div>Google forma za upit</div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 flex w-full max-w-7xl flex-col gap-2 border-t border-[#efefef] px-4 pt-6 text-sm text-[#999] sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>© 2026 Kuća domaće hrane. Sva prava zadržana.</div>
          <div>Instagram • TikTok • Facebook</div>
        </div>
      </footer>

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#1f3d2b] text-white shadow-lg"
          aria-label="Vrati na vrh"
        >
          <span>↑</span>
        </button>
      )}
    </div>
  );
}