import type { Metadata } from "next";
import { Suspense } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DonateModalProvider } from "@/components/DonateModalProvider";
import { JsonLd } from "@/components/JsonLd";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { BASE_URL, siteUrl } from "@/lib/site";

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
  const tMeta = await getTranslations({ locale, namespace: "Metadata" });

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SafePaws",
    url: siteUrl("/", locale),
    logo: `${BASE_URL}/images/favicon/favicon.svg`,
    description: tMeta("description"),
    foundingYear: "2025",
    email: "safepaws.help@proton.me",
    sameAs: [
      "https://github.com/kkrugley/safepaws",
      "https://opencollective.com/safepawsorganization",
      "https://www.instagram.com/safepaws.help",
      "https://t.me/safepaws_help",
    ],
  };

  return (
    <NextIntlClientProvider messages={messages}>
      <JsonLd data={organizationSchema} />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <Suspense>
        <DonateModalProvider />
      </Suspense>
      <SpeedInsights />
    </NextIntlClientProvider>
  );
}
