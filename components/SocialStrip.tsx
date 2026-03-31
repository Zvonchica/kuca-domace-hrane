export default function SocialStrip() {
  return (
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
  );
}