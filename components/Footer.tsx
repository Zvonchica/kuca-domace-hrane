import Image from "next/image";
import { business, links } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-[#eaeaea] bg-white py-12">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-[1.1fr_1fr_1fr] lg:px-8">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <Image src="/brand/makai-ika-crna.svg" width={42} height={48} alt="Maka i Ika – domaća kuhinja" className="h-10 w-auto" />
            <div className="text-xl font-semibold">Maka i Ika – domaća kuhinja</div>
          </div>
          <div className="max-w-sm text-sm leading-7 text-[#666]">Domaće, sveže i kuvano kao za svoje. Dnevni meni, stalna ponuda i porudžbine na Banovom brdu.</div>
          <div className="mt-5 flex flex-wrap gap-2 text-sm">
            <a href={links.instagram} target="_blank" rel="noreferrer" className="rounded-full bg-[#eef4f0] px-3 py-2 transition hover:bg-[#dfeadd]">Instagram</a>
            <a href={links.facebook} target="_blank" rel="noreferrer" className="rounded-full bg-[#eef4f0] px-3 py-2 transition hover:bg-[#dfeadd]">Facebook</a>
            <a href={links.whatsapp} target="_blank" rel="noreferrer" className="rounded-full bg-[#eef4f0] px-3 py-2 transition hover:bg-[#dfeadd]">WhatsApp</a>
          </div>
        </div>

        <div>
          <div className="mb-3 font-semibold">Kontakt kuhinje</div>
          <address className="space-y-2 text-sm not-italic text-[#666]">
            <a href={links.maps} target="_blank" rel="noreferrer" className="block hover:text-[#1f3d2b]">{business.kitchenAddress}</a>
            <a href={links.phone} className="block hover:text-[#1f3d2b]">{business.phoneDisplay}</a>
            <a href={links.email} className="block hover:text-[#1f3d2b]">{business.email}</a>
            <p>{business.hours[0]}<br />{business.hours[1]}</p>
          </address>
        </div>

        <div>
          <div className="mb-3 font-semibold">Podaci o preduzetniku</div>
          <div className="space-y-2 text-sm text-[#666]">
            <p className="font-medium text-[#444]">{business.legalName}</p>
            <p>Sedište: {business.registeredAddress}</p>
            <p>PIB: {business.pib}<br />Matični broj: {business.registrationNumber}</p>
            <p>{business.vatStatus}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex w-full max-w-7xl flex-col gap-3 border-t border-[#efefef] px-4 pt-6 text-sm text-[#999] sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="text-center md:text-left">© {new Date().getFullYear()} Maka i Ika – domaća kuhinja. Sva prava zadržana.</div>
        <div className="text-center md:text-right">Instagram • Facebook • WhatsApp</div>
      </div>
    </footer>
  );
}
