"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Pricing", href: "/pricing" },
    { name: "Track Order", href: "/track-order" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#0088cc] text-white flex items-center justify-center font-bold text-sm shadow-sm">
            P
          </div>
          <span className="font-bold text-slate-900 text-base sm:text-lg tracking-tight">
            Pinnacle Laundry
          </span>
        </Link>

        {/* Desktop Nav Links with Active State */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors py-1 relative ${
                  active
                    ? "text-[#0088cc] font-semibold"
                    : "text-slate-600 hover:text-[#0088cc]"
                }`}
              >
                {link.name}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0088cc] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-5">
          <Link
            href="/login"
            className={`text-sm font-medium transition-colors ${
              isActive("/login")
                ? "text-[#0088cc] font-semibold"
                : "text-slate-700 hover:text-[#0088cc]"
            }`}
          >
            Login
          </Link>
          <Link
            href="/services"
            className="px-5 py-2.5 rounded-full bg-[#0088cc] hover:bg-[#0077b3] text-white text-sm font-semibold transition-all shadow-sm active:scale-95"
          >
            Book Laundry
          </Link>
        </div>

        {/* Mobile Hamburger Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 -mr-1 text-slate-700 hover:text-[#0088cc] transition-colors"
          aria-label="Toggle Navigation"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <nav className="flex flex-col space-y-2 text-base font-medium">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`py-2 px-1 transition-colors rounded-lg ${
                    active
                      ? "text-[#0088cc] font-semibold bg-sky-50"
                      : "text-slate-700 hover:text-[#0088cc]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className={`py-2 px-1 transition-colors rounded-lg ${
                isActive("/login")
                  ? "text-[#0088cc] font-semibold bg-sky-50"
                  : "text-slate-700 hover:text-[#0088cc]"
              }`}
            >
              Login
            </Link>
          </nav>
          <div className="pt-2">
            <Link
              href="/services"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-3 rounded-xl bg-[#0088cc] text-white font-semibold text-sm shadow-sm active:scale-98 transition-all"
            >
              Book Laundry
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
