import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/organisms/Navbar";
import { Footer } from "../components/organisms/Footer";

const inter = Inter({ subsets: ["latin"] });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    shortcut: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/icon.png", type: "image/png" }],
  },
  title: {
    default: "MealFinder | Discover Recipes by Ingredient",
    template: "%s | MealFinder",
  },
  description: "Find meals by ingredient, browse recipe details, and watch cooking tutorials powered by TheMealDB.",
  applicationName: "MealFinder",
  keywords: ["recipes", "meal finder", "ingredients", "cooking", "TheMealDB"],
  openGraph: {
    type: "website",
    siteName: "MealFinder",
    title: "MealFinder | Discover Recipes by Ingredient",
    description: "Find meals by ingredient, browse recipe details, and watch cooking tutorials.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MealFinder | Discover Recipes by Ingredient",
    description: "Find meals by ingredient, browse recipe details, and watch cooking tutorials.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-900 antialiased flex flex-col min-h-screen`}>
        <Navbar />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
