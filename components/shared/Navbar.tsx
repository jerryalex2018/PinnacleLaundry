"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LayoutDashboard, Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const supabase = createClient();

  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string>("customer");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .maybeSingle();
        if (profile?.role) setRole(profile.role);
      } else {
        setUser(null);
      }
    }

    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser(session.user);
          checkAuth();
        } else {
          setUser(null);
          setRole("customer");
        }
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  const dashboardHref =
    role === "admin" || role === "staff" ? "/admin" : "/dashboard";

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#0088cc] text-white flex items-center justify-center font-bold text-sm">
            P
          </div>
          <span className="font-bold text-slate-900 text-base tracking-tight">
            Pinnacle Laundry
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
          <Link
            href="/services"
            className={`hover:text-[#0088cc] transition ${
              pathname === "/services" ? "text-[#0088cc]" : ""
            }`}
          >
            Services
          </Link>
          <Link
            href="/book"
            className={`hover:text-[#0088cc] transition ${
              pathname === "/book" ? "text-[#0088cc]" : ""
            }`}
          >
            Book Laundry
          </Link>
          <Link
            href="/track-order"
            className={`hover:text-[#0088cc] transition ${
              pathname.startsWith("/track-order") ? "text-[#0088cc]" : ""
            }`}
          >
            Track Order
          </Link>
        </nav>

        {/* Right Action Control */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <Link
              href={dashboardHref}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-[#0088cc] text-xs font-bold transition shadow-sm"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-[#0088cc] transition"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 rounded-xl bg-[#0088cc] hover:bg-[#0077b3] text-white text-xs font-bold shadow-sm transition"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-600"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-3">
          <Link
            href="/services"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-700"
          >
            Services
          </Link>
          <Link
            href="/book"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-700"
          >
            Book Laundry
          </Link>
          <Link
            href="/track-order"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-700"
          >
            Track Order
          </Link>

          <div className="pt-3 border-t border-slate-100">
            {user ? (
              <Link
                href={dashboardHref}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold text-white bg-[#0088cc] rounded-xl"
              >
                <LayoutDashboard className="w-4 h-4" />
                Go to Dashboard
              </Link>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 text-xs font-bold text-slate-700 border border-slate-200 rounded-xl"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 text-xs font-bold text-white bg-[#0088cc] rounded-xl"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
