const menuDays = [
  ["Ponedeljak", "Pileća supa", "Musaka", "Sezonska salata"],
  ["Utorak", "Teleća čorba", "Piletina sa pirinčem", "Kupus salata"],
  ["Sreda", "Paradajz čorba", "Punjene paprike", "Domaći hleb"],
  ["Četvrtak", "Potaž od povrća", "Juneće ćufte u sosu", "Pire krompir"],
  ["Petak", "Riblja čorba", "Oslić sa krompirom", "Zelena salata"],
];

export default function Meni() {
  return (
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
          {menuDays.map(([day, a, b, c]) => (
            <div key={day} className="rounded-2xl bg-[#f4f4f1] p-5">
              <div className="mb-2 font-semibold">{day}</div>
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
  );
}