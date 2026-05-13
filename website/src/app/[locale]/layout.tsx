import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DonateModalProvider } from "@/components/DonateModalProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const inter = localFont({
  src: [
    { path: "../../../public/fonts/Inter/Inter-VariableFont_opsz,wght.ttf", style: "normal" },
    { path: "../../../public/fonts/Inter/Inter-Italic-VariableFont_opsz,wght.ttf", style: "italic" },
  ],
  variable: "--font-inter",
  display: "swap",
});

const lora = localFont({
  src: [
    { path: "../../../public/fonts/Lora/Lora-VariableFont_wght.ttf", style: "normal" },
    { path: "../../../public/fonts/Lora/Lora-Italic-VariableFont_wght.ttf", style: "italic" },
  ],
  variable: "--font-lora",
  display: "swap",
});

const caveat = localFont({
  src: "../../../public/fonts/Caveat/Caveat-VariableFont_wght.ttf",
  variable: "--font-caveat",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL("https://safepaws.ru"),
    title: {
      default: t("title"),
      template: "%s · SafePaws",
    },
    description: t("description"),
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
      title: t("title"),
      description: t("description"),
      locale: locale === "ru" ? "ru_RU" : "en_US",
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
      title: t("title"),
      description: t("description"),
      images: ["/images/og-image.jpg"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${lora.variable} ${caveat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <DonateModalProvider />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
