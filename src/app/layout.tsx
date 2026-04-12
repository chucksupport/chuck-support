import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { CartProvider } from "@/contexts/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex bg-background text-foreground">
        <CartProvider>
          <Sidebar />
          <main className="flex-1 min-w-0 flex flex-col">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
