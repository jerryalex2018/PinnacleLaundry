import Link from "next/link";
import { MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0b1320] text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#0088cc] text-white flex items-center justify-center font-bold text-xs">
                P
              </div>
              <span className="font-bold text-white text-base tracking-tight">
                Pinnacle Laundry
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              &ldquo;Clean Clothes. Zero Hassle.&rdquo;
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="w-8 h-8 rounded-full bg-slate-800/80 flex items-center justify-center text-xs font-medium text-slate-300 hover:bg-slate-700 cursor-pointer transition">
                X
              </span>
              <span className="w-8 h-8 rounded-full bg-slate-800/80 flex items-center justify-center text-xs font-medium text-slate-300 hover:bg-slate-700 cursor-pointer transition">
                IG
              </span>
              <span className="w-8 h-8 rounded-full bg-slate-800/80 flex items-center justify-center text-xs font-medium text-slate-300 hover:bg-slate-700 cursor-pointer transition">
                FB
              </span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/services" className="hover:text-white transition">
                  Washing
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition">
                  Ironing
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition">
                  Folding
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition">
                  Blankets
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition">
                  Pickup & Delivery
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/track-order"
                  className="hover:text-white transition"
                >
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition">
                  Book Laundry
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#0088cc] shrink-0 mt-0.5" />
                <span>Near Breeze Point, near Student Center</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#0088cc] shrink-0" />
                <span>0793002308</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800/80 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2024 Pinnacle Laundry. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-slate-400 cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-slate-400 cursor-pointer">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
