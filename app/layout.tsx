import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AiSupportChat } from "@/components/AiSupportChat";
import { CartProvider } from "@/components/CartProvider";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { WhatsAppBubble } from "@/components/WhatsAppBubble";
import { storeInfo } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.alanyapetshops.com"),
  title: {
    default: `${storeInfo.name} | Modern Pet Shop`,
    template: `%s | ${storeInfo.shortName}`
  },
  description: storeInfo.tagline,
  keywords: [
    "Alanya petshop",
    "kedi maması",
    "köpek maması",
    "akvaryum",
    "pet shop Alanya",
    "Pozitif Petshop"
  ],
  openGraph: {
    title: storeInfo.name,
    description: storeInfo.tagline,
    type: "website",
    locale: "tr_TR",
    images: ["/images/hero-store.png"]
  }
};

export const viewport: Viewport = {
  themeColor: "#1f7a3d",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <CartProvider>
          <Navigation />
          {children}
          <Footer />
          <AiSupportChat />
          <WhatsAppBubble />
        </CartProvider>
      </body>
    </html>
  );
}
