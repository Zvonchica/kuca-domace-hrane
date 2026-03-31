type StepItem = {
  num: string;
  title: string;
  desc: string;
  icon: string;
};

const steps: StepItem[] = [
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
];

export default function Kako() {
  return (
    <section
      id="kako"
      className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8"
    >
      <h2 className="text-center text-3xl font-semibold tracking-tight sm:text-4xl">
        Kako funkcioniše
      </h2>

      <div className="mt-10 hidden lg:grid lg:grid-cols-3 lg:items-start">
        {steps.map((item, index, arr) => (
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
        {steps.map((item) => (
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
  );
}