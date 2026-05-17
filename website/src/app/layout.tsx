import localFont from "next/font/local";
import { Suspense } from "react";
import "./globals.css";
import { LocaleSync } from "@/components/LocaleSync";
import { routing } from "@/i18n/routing";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={routing.defaultLocale}
      className={`${inter.variable} ${lora.variable} ${caveat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-paper text-ink" suppressHydrationWarning>
        <Suspense>
          <LocaleSync />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
