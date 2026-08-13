import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Maka i Ika – domaća kuhinja | Banovo brdo",
  description:
    "Maka i Ika – domaća kuhinja na Banovom brdu. Dnevna kuvana jela, stalna ponuda, porodične porudžbine i ručkovi za firme.",
  applicationName: "Maka i Ika – domaća kuhinja",
  openGraph: {
    title: "Maka i Ika – domaća kuhinja",
    description:
      "Domaće, sveže i kuvano kao za svoje. Dnevna ponuda na Banovom brdu.",
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
    description: "Domaće, sveže i kuvano kao za svoje.",
    images: ["/brand/makai-ika-social.png"],
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sr-Latn">
      <body>{children}</body>
    </html>
  );
}
