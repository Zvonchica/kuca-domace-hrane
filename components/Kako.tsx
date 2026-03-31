import type { LucideIcon } from "lucide-react";
import { ClipboardList, UtensilsCrossed, Truck } from "lucide-react";

type StepItem = {
  num: string;
  title: string;
  desc: string;
  Icon: LucideIcon;
};

const steps: StepItem[] = [
  {
    num: "1",
    title: "Pošaljete broj ljudi i lokaciju",
    desc: "Javite nam veličinu tima, adresu firme i da li želite dnevni ili nedeljni model saradnje.",
    Icon: ClipboardList,
  },
  {
    num: "2",
    title: "Dogovaramo meni",
    desc: "Pravimo predlog obroka koji odgovara ritmu vašeg radnog dana i načinu funkcionisanja firme.",
    Icon: UtensilsCrossed,
  },
  {
    num: "3",
    title: "Dostava na adresu firme",
    desc: "Obroci stižu uredno spakovani i u dogovoreno vreme, bez dodatnog opterećenja za vaš tim.",
    Icon: Truck,
  },
];

export default function Kako() {
  return (
    <section
      id="kako"
      className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#1f3d2b]">
          Jednostavna organizacija
        </p>

        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#1f1f1c] sm:text-4xl lg:text-5xl">
          Kako funkcioniše
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#5f5f59] sm:text-lg">
          Saradnja je jednostavna, pregledna i prilagođena malim firmama koje
          žele pouzdane domaće obroke bez dodatne organizacije u toku dana.
        </p>
      </div>

      <div className="mt-16 hidden lg:grid lg:grid-cols-3 lg:items-start lg:gap-10">
        {steps.map((item, index) => {
          const Icon = item.Icon;

          return (
            <div key={item.num} className="relative text-center">
              {index < steps.length - 1 && (
                <div className="absolute left-[68%] top-[34px] h-px w-[64%] bg-[#d9ddd7]" />
              )}

              <div className="relative mx-auto flex h-[70px] w-[70px] items-center justify-center rounded-full border border-[#d7ddd7] bg-white">
                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#1f3d2b] text-[11px] font-semibold text-white">
                  {item.num}
                </span>
                <Icon className="h-7 w-7 text-[#1f3d2b]" strokeWidth={1.9} />
              </div>

              <div className="mx-auto mt-6 max-w-[290px]">
                <h3 className="text-[22px] font-semibold leading-[1.25] text-[#1f1f1c]">
                  {item.title}
                </h3>

                <p className="mt-4 text-[17px] leading-8 text-[#5f5f59]">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 grid gap-8 lg:hidden">
        {steps.map((item) => {
          const Icon = item.Icon;

          return (
            <div
              key={item.num}
              className="border-b border-[#e7e7e2] pb-8 last:border-b-0 last:pb-0"
            >
              <div className="flex items-start gap-4">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#d9ddd7] bg-white">
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#1f3d2b] text-[10px] font-semibold text-white">
                    {item.num}
                  </span>
                  <Icon className="h-6 w-6 text-[#1f3d2b]" strokeWidth={1.9} />
                </div>

                <div className="min-w-0">
                  <h3 className="text-xl font-semibold leading-snug text-[#1f1f1c]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#5f5f59] sm:text-[15px]">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}