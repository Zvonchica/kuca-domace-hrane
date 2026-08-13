import type { Metadata } from "next";
import "./globals.css";
import { business, links } from "@/data/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

const structuredData = {
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  name: business.name,
  description: "Domaća kuhinja sa dnevnim menijem, kuvanim jelima i ponudom za firme na Banovom brdu.",
  telephone: business.phoneE164,
  email: business.email,
  url: siteUrl,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Požeška 78",
    addressLocality: "Beograd",
    addressRegion: "Čukarica",
    postalCode: "11000",
    addressCountry: "RS",
  },
  openingHoursSpecification: [{
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "12:00",
    closes: "18:00",
  }],
  sameAs: [links.instagram, links.facebook],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Maka i Ika – domaća kuhinja | Banovo brdo",
  description:
    "Maka i Ika – domaća kuhinja u Požeškoj na Banovom brdu, Beograd. Dnevni meni, kuvana jela, domaća hrana, dostava i ručkovi za firme.",
  applicationName: "Maka i Ika – domaća kuhinja",
  openGraph: {
    title: "Maka i Ika – domaća kuhinja",
    description:
      "Domaće, sveže i kuvano kao za svoje. Dnevni meni i kuvana jela na Banovom brdu u Beogradu.",
    locale: "sr_RS",
    type: "website",
    images: [
      {
        url: "/brand/makai-ika-social.png",
        width: 1144,
        height: 1143,
        alt: "Maka i Ika – domaća kuhinja",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maka i Ika – domaća kuhinja",
    description: "Dnevni meni, domaća hrana i kuvana jela na Banovom brdu.",
    images: ["/brand/makai-ika-social.png"],
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sr-Latn">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}
