import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  IBM_Plex_Sans_Arabic,
  Instrument_Serif,
  Manrope,
} from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import { Providers } from "@/app/providers";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
});

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-arabic",
});

export const metadata: Metadata = {
  title: "Storefront",
  description: "Browse products and manage a shopping cart.",
};

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const isArabic = locale === "ar";

  return (
    <html
      lang={locale}
      dir={isArabic ? "rtl" : "ltr"}
      className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} ${instrumentSerif.variable} ${ibmPlexSansArabic.variable} h-full antialiased`}
    >
      <body
        className={`flex min-h-full flex-col bg-[#faf8f5] text-[#1a1a1a] ${
          isArabic
            ? "font-[family-name:var(--font-ibm-plex-arabic)]"
            : "font-[family-name:var(--font-manrope)]"
        }`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
