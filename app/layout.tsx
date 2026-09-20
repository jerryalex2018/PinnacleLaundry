"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import "@/app/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAppShell =
    pathname.startsWith("/dashboard") || pathname.startsWith("/admin");

  return (
    <html lang="en">
      <body className="bg-white text-slate-900 antialiased selection:bg-[#0088cc]/10 selection:text-[#0088cc]">
        {!isAppShell && <Navbar />}
        <main className={isAppShell ? "" : "min-h-[calc(100vh-4rem)]"}>
          {children}
        </main>
        {!isAppShell && <Footer />}
      </body>
    </html>
  );
}
