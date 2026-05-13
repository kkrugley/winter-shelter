import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DonateModalProvider } from "@/components/DonateModalProvider";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://safepaws.ru"),
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
      className={`${inter.variable} ${lora.variable} ${caveat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <DonateModalProvider />
      </body>
    </html>
  );
}
