export default function Footer() {
  return (
    <footer className="border-t border-[#eaeaea] bg-white py-12">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-[1.1fr_1fr_1fr] lg:px-8">
        <div>
          <div className="mb-3 text-xl font-semibold">Kuća domaće hrane</div>
          <div className="max-w-sm text-sm leading-7 text-[#666]">
            Domaći obroci za firme i kancelarije. Pouzdana dostava, uredna
            saradnja i meni koji se dogovara unapred.
          </div>
          <div className="mt-5 flex flex-wrap gap-3 text-sm text-[#1f3d2b]">
            <span className="rounded-full bg-[#eef4f0] px-3 py-2">Instagram</span>
            <span className="rounded-full bg-[#eef4f0] px-3 py-2">TikTok</span>
            <span className="rounded-full bg-[#eef4f0] px-3 py-2">Facebook</span>
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
  );
}