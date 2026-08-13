# Maka i Ika – domaća kuhinja

Sajt je izrađen u Next.js-u i predstavlja javnu ponudu domaće kuhinje Maka i Ika na Banovom brdu. Trenutna implementacija je na radnoj grani i ne menja produkcijsku granu `main`.

## Pokretanje lokalno

```bash
npm install
npm run dev
```

Za proveru produkcijske verzije koristite:

```bash
npm run lint
npm run build
npm run start
```

## Održavanje ponude i podataka

Svi podaci koji se često menjaju nalaze se u [`data/site.ts`](./data/site.ts). Tu se održavaju nedeljni jelovnik, dodatna jela dostupna danas, stalna ponuda, cene, prilozi, salate, porodična pakovanja, pite, kontakt, radno vreme i svi potvrđeni eksterni linkovi.

Za ručno dodavanje jela iz prethodnog dana u današnju ponudu dopunite niz `additionalTodayDishes`. Za označavanje rasprodatog jela postavite `soldOut: true` na odgovarajućem jelu. Dnevni prilozi se kontrolišu poljem `availableToday`.

## Zvanični brend resursi

Izvorne, neizmenjene kopije zvaničnog logotipa nalaze se u `public/brand/`. Primarni znak za sajt je `makai-ika-zlatna.svg`. Alternativne bele i crne verzije služe za situacije u kojima je potreban drugačiji kontrast, dok se `makai-ika-social.png` koristi za društveni preview.

## Kontakt-forma

Za slanje email upita potrebne su promenljive okruženja:

| Promenljiva | Namena |
|---|---|
| `RESEND_API_KEY` | API ključ Resend servisa; ne sme se javno objavljivati. |
| `RESEND_FROM_EMAIL` | Pošiljalac sa verifikovanog domena. Ako nije podešen, koristi se razvojni Resend pošiljalac. |
| `CONTACT_RECIPIENT_EMAIL` | Primalac upita; podrazumevano je poslovni email iz `data/site.ts`. |
| `NEXT_PUBLIC_SITE_URL` | Potvrđeni javni URL sajta za apsolutne Open Graph adrese. Podesiti pre produkcijskog objavljivanja. |

## Buduće fotografije i video

Ne objavljuju se neautentične fotografije hrane. Kada budu spremni, originalni mediji se dodaju kroz `futureMedia` konfiguraciju u `data/site.ts`. Video treba da koristi `preload="metadata"` i ne treba da se automatski reprodukuje na mobilnim uređajima.
