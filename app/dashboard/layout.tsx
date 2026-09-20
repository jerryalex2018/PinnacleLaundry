"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Search,
  CreditCard,
  User,
  HelpCircle,
  LogOut,
  Bell,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const NAV_ITEMS = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Orders", href: "/dashboard/orders", icon: ClipboardList },
  { label: "Track Laundry", href: "/track-order", icon: Search },
  { label: "Payments", href: "/dashboard/payments", icon: CreditCard },
  { label: "Profile", href: "/dashboard/profile", icon: User },
  { label: "Help & Support", href: "/dashboard/help", icon: HelpCircle },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const supabase = createClient();
  const [profile, setProfile] = useState<{
    full_name?: string;
    phone?: string;
    email?: string;
  } | null>(null);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("full_name, phone, email")
          .eq("id", user.id)
          .maybeSingle();
        setProfile(
          data || { full_name: user.email?.split("@")[0], email: user.email },
        );
      }
    }
    loadUser();
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("auth_token");
    window.location.href = "/login";
  };

  const initial = profile?.full_name
    ? profile.full_name.charAt(0).toUpperCase()
    : "B";

  return (
    <div className="h-screen w-full bg-[#f8fafc] flex overflow-hidden">
      {/* Pinned Left Sidebar */}
      <aside className="w-64 h-full bg-white border-r border-slate-100 p-6 flex flex-col justify-between shrink-0 hidden md:flex">
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#0088cc] text-white flex items-center justify-center font-bold text-sm">
              P
            </div>
            <span className="font-bold text-slate-900 text-sm">
              Pinnacle Laundry
            </span>
          </Link>

          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? "bg-sky-50 text-[#0088cc] font-bold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon className="w-4 h-4" /> {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer with Sign Out */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-xs text-slate-500 hover:text-rose-600 transition w-full px-1 font-medium"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Workspace */}
      <div className="flex-1 h-full flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-100 h-16 px-8 flex items-center justify-between shrink-0 sticky top-0 z-20">
          <div>
            <p className="text-[11px] text-slate-400">Welcome back,</p>
            <p className="text-xs font-bold text-slate-800">
              {profile?.full_name || "Brian Mwangi"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 relative">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                2
              </span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#0088cc] text-white flex items-center justify-center font-bold text-xs">
              {initial}
            </div>
          </div>
        </header>

        {/* Full-width container */}
        <div className="flex-1 p-8 w-full min-w-0">{children}</div>
      </div>
    </div>
  );
}
