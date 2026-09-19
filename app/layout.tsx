import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import "./globals.css";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pinnacle Laundry — Clean Clothes. Zero Hassle.",
  description:
    "Professional laundry services near Breeze Point and Student Center.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={font.className}>
      <body className="min-h-screen flex flex-col antialiased bg-white text-slate-900">
        <Navbar />
        <main className="flex-1 bg-white">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
