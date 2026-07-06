import type { Metadata } from "next";
import localFont from "next/font/local";
import { Suspense } from "react";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DonateModalProvider } from "@/components/DonateModalProvider";
import { JsonLd } from "@/components/JsonLd";
import { BASE_URL, siteUrl } from "@/lib/site";

const inter = localFont({
  src: [
    { path: "../../public/fonts/Inter/Inter-VariableFont_opsz,wght.ttf", style: "normal" },
    { path: "../../public/fonts/Inter/Inter-Italic-VariableFont_opsz,wght.ttf", style: "italic" },
  ],
  variable: "--font-inter",
  display: "swap",
});

const lora = localFont({
  src: [
    { path: "../../public/fonts/Lora/Lora-VariableFont_wght.ttf", style: "normal" },
    { path: "../../public/fonts/Lora/Lora-Italic-VariableFont_wght.ttf", style: "italic" },
  ],
  variable: "--font-lora",
  display: "swap",
});

const caveat = localFont({
  src: "../../public/fonts/Caveat/Caveat-VariableFont_wght.ttf",
  variable: "--font-caveat",
  display: "swap",
});

const METADATA_TITLE = "SafePaws — чертежи домиков и поилок для уличных кошек";
const METADATA_DESCRIPTION =
  "Открытый проект: бесплатные чертежи защитных домиков и поилок для бездомных кошек. Скачай DXF/PDF, собери сам или помоги иначе.";

export const metadata: Metadata = {
  metadataBase: new URL("https://safepaws.ru"),
  title: {
    default: METADATA_TITLE,
    template: "%s · SafePaws",
  },
  description: METADATA_DESCRIPTION,
  keywords: [
    "бездомные кошки",
    "домик для кошки",
    "чертежи",
    "DXF",
    "волонтёрство",
    "SafePaws",
    "уличные кошки",
    "поилка для кошек",
    "открытый проект",
  ],
  authors: [{ name: "SafePaws" }],
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/images/favicon/favicon.ico", sizes: "any" },
      { url: "/images/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/images/favicon/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: "/images/favicon/apple-touch-icon.png",
  },
  manifest: "/images/favicon/site.webmanifest",
  openGraph: {
    type: "website",
    url: "https://safepaws.ru",
    siteName: "SafePaws",
    title: METADATA_TITLE,
    description: METADATA_DESCRIPTION,
    locale: "ru_RU",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SafePaws",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: METADATA_TITLE,
    description: METADATA_DESCRIPTION,
    images: ["/images/og-image.jpg"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SafePaws",
  url: siteUrl("/"),
  logo: `${BASE_URL}/images/favicon/favicon.svg`,
  description: METADATA_DESCRIPTION,
  foundingYear: "2025",
  email: "safepaws.help@proton.me",
  sameAs: [
    "https://github.com/kkrugley/safepaws",
    "https://opencollective.com/safepawsorganization",
    "https://www.instagram.com/safepaws.help",
    "https://t.me/safepaws_help",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${lora.variable} ${caveat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-paper text-ink" suppressHydrationWarning>
        <JsonLd data={organizationSchema} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Suspense>
          <DonateModalProvider />
        </Suspense>
        <SpeedInsights />
      </body>
    </html>
  );
}
