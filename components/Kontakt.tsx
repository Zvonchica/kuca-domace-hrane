export default function Kontakt() {
  return (
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
          <button className="rounded-lg bg-white px-6 py-3 text-[#1f3d2b] transition hover:bg-[#f1f4f2]">
            Zatražite ponudu
          </button>
          <button className="rounded-lg border border-white/30 px-6 py-3 text-white transition hover:bg-white/10">
            Popuni Google formu
          </button>
        </div>
      </div>
    </section>
  );
}