import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { CartProvider } from "@/contexts/CartContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chuck Support — Full-Service Digital Agency",
  description:
    "Website construction, data migrations, networking, hosting, programming, audio recording, blockchain, crypto, renewable energy, and sustainable building.",
  metadataBase: new URL("https://chuck.support"),
  openGraph: {
    title: "Chuck Support",
    description: "Full-Service Digital Agency",
    url: "https://chuck.support",
    siteName: "Chuck Support",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} dark antialiased`}
    >
      <body className="min-h-screen flex bg-background text-foreground">
        <CartProvider>
          <Sidebar />
          <main className="flex-1 min-w-0 flex flex-col pt-16 md:pt-0">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
