import type { Metadata } from "next";
import { Caveat, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://safepaws.vercel.app"),
  title: {
    default: "SafePaws — чертежи домиков и поилок для уличных кошек",
    template: "%s · SafePaws",
  },
  description:
    "Открытый проект: бесплатные чертежи защитных домиков и поилок для бездомных кошек. Скачай DXF/PDF, собери сам или помоги иначе.",
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
  openGraph: {
    type: "website",
    url: "https://safepaws.vercel.app",
    siteName: "SafePaws",
    title: "SafePaws — чертежи домиков и поилок для уличных кошек",
    description:
      "Бесплатные чертежи защитных домиков и поилок для бездомных кошек. Скачай, собери, установи — или помоги иначе.",
    locale: "ru_RU",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SafePaws — домики и поилки для уличных кошек",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SafePaws — чертежи домиков и поилок для уличных кошек",
    description:
      "Бесплатные чертежи защитных домиков и поилок для бездомных кошек. Скачай, собери, установи.",
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${caveat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
