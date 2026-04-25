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
  title: "SafePaws — чертежи домиков и поилок для уличных кошек",
  description:
    "Открытый проект: бесплатные чертежи защитных решений для бездомных животных. Скачай, собери, установи — или помоги иначе.",
  openGraph: {
    title: "SafePaws",
    description: "Открытые чертежи для защиты уличных животных",
    images: ["/images/og-preview.jpg"],
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
