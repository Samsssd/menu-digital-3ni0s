import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT"],
});

export const metadata: Metadata = {
  title: {
    default: "Menu Digital — Café & Brunch",
    template: "%s · Menu Digital",
  },
  description:
    "Menu numérique de notre café : boissons chaudes, pâtisseries maison et brunch. Filtrez par catégorie et préférences diététiques.",
  keywords: [
    "café",
    "menu numérique",
    "brunch",
    "pâtisseries",
    "Paris",
    "vegan",
    "sans gluten",
  ],
  openGraph: {
    title: "Menu Digital — Café & Brunch",
    description:
      "Découvrez notre carte de saison : boissons chaudes, pâtisseries maison et brunch.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
