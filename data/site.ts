export type MenuDayKey =
  | "ponedeljak"
  | "utorak"
  | "sreda"
  | "cetvrtak"
  | "petak";

export type PriceOption = {
  label: string;
  price: number;
};

export type MenuDish = {
  id: string;
  name: string;
  quantity: string;
  price: number;
  soldOut?: boolean;
};

export type WeeklyMenuDay = {
  key: MenuDayKey;
  name: string;
  dishes: MenuDish[];
};

export type AdditionalDish = MenuDish & {
  sourceDay?: MenuDayKey;
};

export type Product = {
  id: string;
  name: string;
  quantity?: string;
  price?: number;
  options?: PriceOption[];
};

export const business = {
  name: "Maka i Ika – domaća kuhinja",
  legalName: "MARINA PRŠIĆ PR KETERING MAKA I IKA DOMAĆA KUHINJA",
  phoneDisplay: "060 30 60 486",
  phoneE164: "+381603060486",
  email: "makaika.rs@gmail.com",
  kitchenAddress: "Požeška 78, 11000 Beograd – Čukarica",
  registeredAddress: "Svetosavska 56, 22304 Novi Banovci, Stara Pazova",
  pib: "115826738",
  registrationNumber: "68668344",
  hours: ["Ponedeljak–petak 12:00–18:00", "Vikendom ne radimo."],
  vatStatus: "Preduzetnik nije u sistemu PDV-a.",
  directOrderDiscount: 10,
  corporateDiscount: 20,
  corporateMinimumMeals: 10,
} as const;

export const links = {
  wolt: "https://wolt.com/en/srb/belgrade/restaurant/maka-i-ika-domaca-kuhinja",
  glovo: "https://glovoapp.com/sr/rs/belgrade/stores/maka-i-ika-domaca-kuhinja-beg",
  instagram: "https://www.instagram.com/maka_i_ika/",
  facebook: "https://www.facebook.com/profile.php?id=61591832623273",
  maps: "https://maps.app.goo.gl/ykZQzkXHV9xUofgG7",
  whatsapp: "https://wa.me/381603060486",
  phone: `tel:${business.phoneE164}`,
  email: `mailto:${business.email}`,
} as const;

export const navigation = [
  { href: "#danas", label: "Danas" },
  { href: "#meni", label: "Jelovnik" },
  { href: "#stalna-ponuda", label: "Ponuda" },
  { href: "#porucivanje", label: "Poručivanje" },
  { href: "#za-firme", label: "Za firme" },
  { href: "#o-nama", label: "O nama" },
] as const;

export const weeklyMenu: WeeklyMenuDay[] = [
  {
    key: "ponedeljak",
    name: "Ponedeljak",
    dishes: [
      {
        id: "cufte-u-paradajz-sosu",
        name: "Ćufte od junetine u paradajz sosu + domaći pire",
        quantity: "250 g + 200 g",
        price: 900,
      },
    ],
  },
  {
    key: "utorak",
    name: "Utorak",
    dishes: [
      {
        id: "punjene-paprike",
        name: "Punjene paprike sa junetinom + domaći pire",
        quantity: "250 g + 200 g",
        price: 900,
      },
    ],
  },
  {
    key: "sreda",
    name: "Sreda",
    dishes: [
      {
        id: "gulas",
        name: "Gulaš od junetine + domaći pire",
        quantity: "250 g + 200 g",
        price: 1090,
      },
    ],
  },
  {
    key: "cetvrtak",
    name: "Četvrtak",
    dishes: [
      {
        id: "leskovacka-muckalica",
        name: "Leskovačka mućkalica + domaći pire",
        quantity: "250 g + 200 g",
        price: 1060,
      },
    ],
  },
  {
    key: "petak",
    name: "Petak",
    dishes: [
      {
        id: "pasulj-sa-rebarcima",
        name: "Pasulj sa dimljenim rebarcima i kobasicama",
        quantity: "400 g",
        price: 810,
      },
      {
        id: "posni-prebranac",
        name: "Posni prebranac",
        quantity: "400 g",
        price: 660,
      },
    ],
  },
];

/**
 * Ručno dodajte jelo koje je ostalo dostupno iz prethodnog dana.
 * Prazan niz znači da trenutno nema dodatnih jela za danas.
 */
export const additionalTodayDishes: AdditionalDish[] = [];

/**
 * Za ručnu kontrolu dostupnosti promenite soldOut na odgovarajućem jelu
 * ili ga uklonite iz nedeljnog jelovnika kada više nije u ponudi.
 */
export const permanentOffer: Product[] = [
  { id: "becka-snicla", name: "Bečka šnicla od svinjetine", quantity: "250 g + prilog 200 g", price: 950 },
  { id: "pohovana-piletina", name: "Pohovana piletina", quantity: "250 g + prilog 200 g", price: 950 },
  { id: "pileci-stapici", name: "Pileći štapići sa susamom", quantity: "250 g + prilog 200 g", price: 950 },
  { id: "belo-meso", name: "Belo pileće meso iz tiganja", quantity: "250 g + prilog 200 g", price: 950 },
  { id: "svinjski-vrat", name: "Sočni svinjski vrat", quantity: "250 g + prilog 200 g", price: 990 },
  { id: "pohovani-kackavalj", name: "Pohovani kačkavalj", quantity: "250 g + prilog 200 g", price: 900 },
];

export const possibleSideDishes = [
  { id: "pire", name: "Domaći pire krompir", availableToday: false },
  { id: "pekarski", name: "Pekarski krompir", availableToday: false },
  { id: "pirinac", name: "Pirinač sa povrćem", availableToday: false },
  { id: "spanac", name: "Spanać na mleku sa belim lukom", availableToday: false },
] as const;

export const saladsAndPeppers: Product[] = [
  { id: "kupus", name: "Kupus salata", quantity: "200 g", price: 210 },
  { id: "krompir-salata", name: "Krompir salata sa crnim lukom", quantity: "200 g", price: 260 },
  { id: "sopska", name: "Šopska salata", quantity: "200 g", price: 390 },
  { id: "vitaminska", name: "Vitaminska salata", quantity: "200 g", price: 260 },
  { id: "belolucane", name: "Belolučane paprike", quantity: "2 kom", price: 440 },
  { id: "pecene-ljute", name: "Pečene ljute paprike sa belim lukom", quantity: "2 kom", price: 380 },
];

export const largerOrderGroups = [
  {
    title: "Salate",
    items: [
      { id: "kupus-veca", name: "Kupus salata", options: [{ label: "200 g", price: 210 }, { label: "500 g", price: 500 }, { label: "1 kg", price: 880 }] },
      { id: "krompir-veca", name: "Krompir salata sa crnim lukom", options: [{ label: "200 g", price: 260 }, { label: "500 g", price: 650 }, { label: "1 kg", price: 1130 }] },
      { id: "cvekla-veca", name: "Salata od cvekle", options: [{ label: "200 g", price: 250 }, { label: "500 g", price: 600 }, { label: "1 kg", price: 1060 }] },
      { id: "srpska-veca", name: "Srpska salata", options: [{ label: "200 g", price: 360 }, { label: "500 g", price: 810 }, { label: "1 kg", price: 1500 }] },
      { id: "sopska-veca", name: "Šopska salata", options: [{ label: "200 g", price: 390 }, { label: "500 g", price: 880 }, { label: "1 kg", price: 1650 }] },
      { id: "vitaminska-veca", name: "Vitaminska salata", options: [{ label: "200 g", price: 260 }, { label: "500 g", price: 650 }, { label: "1 kg", price: 1130 }] },
    ],
  },
  {
    title: "Delikates salate",
    items: [
      { id: "ruska", name: "Ruska salata", options: [{ label: "200 g", price: 450 }, { label: "500 g", price: 1060 }, { label: "1 kg", price: 2000 }] },
      { id: "mimoza", name: "Mimoza salata", options: [{ label: "200 g", price: 450 }, { label: "500 g", price: 1060 }, { label: "1 kg", price: 2000 }] },
      { id: "piletina-pecurke", name: "Salata sa piletinom, pečurkama i origanom", options: [{ label: "200 g", price: 510 }, { label: "500 g", price: 1130 }, { label: "1 kg", price: 2130 }] },
    ],
  },
  {
    title: "Porodična pakovanja – prilozi",
    items: [
      { id: "pire-porodicno", name: "Domaći pire krompir", options: [{ label: "500 g", price: 630 }, { label: "1 kg", price: 1130 }] },
      { id: "pirinac-porodicno", name: "Pirinač sa povrćem", options: [{ label: "500 g", price: 630 }, { label: "1 kg", price: 1130 }] },
      { id: "makarone", name: "Makarone", options: [{ label: "500 g", price: 560 }, { label: "1 kg", price: 1000 }] },
      { id: "spanac-porodicno", name: "Spanać na mleku sa belim lukom", options: [{ label: "500 g", price: 750 }, { label: "1 kg", price: 1380 }] },
      { id: "krompir-povrce", name: "Krompir i povrće iz rerne", options: [{ label: "500 g", price: 650 }, { label: "1 kg", price: 1130 }] },
      { id: "pekarski-porodicno", name: "Pekarski krompir", options: [{ label: "500 g", price: 650 }, { label: "1 kg", price: 1130 }] },
      { id: "krompir-blitva", name: "Krompir sa blitvom", options: [{ label: "500 g", price: 690 }, { label: "1 kg", price: 1250 }] },
      { id: "krompir-salata-porodicno", name: "Krompir salata sa crnim lukom", options: [{ label: "500 g", price: 650 }, { label: "1 kg", price: 1130 }] },
    ],
  },
] as const;

export const pies: Product[] = [
  { id: "pita-krompir", name: "Pita sa krompirom", options: [{ label: "oko 300 g", price: 410 }, { label: "ceo pleh", price: 3500 }] },
  { id: "pita-meso", name: "Pita sa mesom – junetina", options: [{ label: "oko 300 g", price: 530 }, { label: "ceo pleh", price: 4300 }] },
  { id: "zeljanica", name: "Zeljanica sa sirom i spanaćem", options: [{ label: "oko 300 g", price: 540 }, { label: "ceo pleh", price: 4300 }] },
  { id: "gibanica", name: "Gibanica", options: [{ label: "oko 300 g", price: 510 }, { label: "ceo pleh", price: 4300 }] },
];

export const futureMedia = {
  heroPhoto: null as string | null,
  gallery: [] as { src: string; alt: string }[],
  video: null as { src: string; poster?: string; title: string } | null,
};

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("sr-RS").format(price) + " din";

export const getTodayMenuKey = (date = new Date()): MenuDayKey | null => {
  const dayMap: Record<number, MenuDayKey | null> = {
    0: null,
    1: "ponedeljak",
    2: "utorak",
    3: "sreda",
    4: "cetvrtak",
    5: "petak",
    6: null,
  };

  return dayMap[date.getDay()];
};
