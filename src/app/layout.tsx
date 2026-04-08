import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import { TwinklingStars } from "@/components/ui/TwinklingStars";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { prisma } from "@/lib/db";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const revalidate = 3600;
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  let settings = null;
  try {
    settings = await prisma.settings.findUnique({ where: { id: "global" } });
  } catch (e) {
    // Database might not be initialized yet
  }

  return {
    title: settings?.metaTitle || "Mystic Tarot Card | Paramarsh aur Reading",
    description: settings?.metaDescription || "Gahan adhyatmik antardrishti ke saath adhunik, sundar tarot paramarsh aur muft reading ka anubhav karein.",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let whatsappNumber = "7376916925";
  try {
    const settings = await prisma.settings.findUnique({ where: { id: "global" } });
    if (settings?.whatsappNumber) {
      whatsappNumber = settings.whatsappNumber;
    }
  } catch (e) {
    // Fallback
  }

  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${playfair.variable} ${poppins.variable} font-sans antialiased selection:bg-primary selection:text-white`}
      >
        <LanguageProvider>
          <TwinklingStars count={150} />
          <div className="relative z-10 flex min-h-screen flex-col">
            <Navbar whatsappNumber={whatsappNumber} />
            <main className="flex-grow pt-16">{children}</main>
            <Footer />
          </div>
          <WhatsAppButton whatsappNumber={whatsappNumber} />
        </LanguageProvider>
      </body>
    </html>
  );
}
