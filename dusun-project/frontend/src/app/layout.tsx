import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Dusun Karangasem Kulon",
  description: "Profil digital dan portal informasi Dusun Karangasem Kulon",
};

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${jakarta.variable} ${fraunces.variable}`}>
      <body className="font-sans bg-rice text-forest antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
