type ReviewItem = {
  quote: string;
  author: string;
};

const reviews: ReviewItem[] = [
  {
    quote:
      "Od kada radimo sa njima, ručak više nije tema oko koje gubimo vreme. Sve je uredno, jasno i ukusno.",
    author: "Mali tim iz kancelarije",
  },
  {
    quote:
      "Najviše nam znači što je saradnja jednostavna. Nema komplikacija, a obroci su domaći i pouzdani.",
    author: "Agencija od 8 zaposlenih",
  },
  {
    quote:
      "Kada imaš radni dan pun sastanaka, mnogo znači da znaš da je ručak već rešen.",
    author: "Privatna ordinacija",
  },
];

export default function Recenzije() {
  return (
    <section
      id="recenzije"
      className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8"
    >
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Šta kažu firme
      </h2>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {reviews.map((review) => (
          <div key={review.author} className="rounded-2xl bg-white p-6 shadow-md">
            <div className="text-sm leading-7 text-[#555]">“{review.quote}”</div>
            <div className="mt-4 text-sm font-semibold text-[#1f3d2b]">
              {review.author}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}