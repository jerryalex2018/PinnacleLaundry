"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  ShoppingBag,
  Truck,
  Layers,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  CheckCircle2,
  RefreshCw,
  TrendingUp,
} from "lucide-react";

interface OrderItem {
  id: string;
  order_code: string;
  full_name: string;
  services: string[];
  actual_weight_kg?: number;
  estimated_weight_kg?: number;
  status: string;
}

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<OrderItem[]>([
    {
      id: "1",
      order_code: "#PIN-1048",
      full_name: "Brian Mwangi",
      services: ["Wash + Fold"],
      estimated_weight_kg: 4,
      status: "Washing",
    },
    {
      id: "2",
      order_code: "#PIN-1047",
      full_name: "Amina Kariuki",
      services: ["Washing"],
      estimated_weight_kg: 2,
      status: "Ready",
    },
    {
      id: "3",
      order_code: "#PIN-1046",
      full_name: "David Otieno",
      services: ["Blankets"],
      estimated_weight_kg: 2,
      status: "Ironing",
    },
    {
      id: "4",
      order_code: "#PIN-1044",
      full_name: "Kevin Kipchoge",
      services: ["Washing"],
      estimated_weight_kg: 5,
      status: "New",
    },
    {
      id: "5",
      order_code: "#PIN-1043",
      full_name: "Faith Mutua",
      services: ["Folding"],
      estimated_weight_kg: 2,
      status: "Folding",
    },
  ]);

  const stats = [
    {
      label: "Today's Orders",
      value: "6",
      icon: ShoppingBag,
      color: "text-sky-500 bg-sky-50",
    },
    {
      label: "Active Laundry",
      value: "4",
      icon: RefreshCw,
      color: "text-purple-500 bg-purple-50",
    },
    {
      label: "Ready Collection",
      value: "1",
      icon: CheckCircle2,
      color: "text-emerald-500 bg-emerald-50",
    },
    {
      label: "Pickup Requests",
      value: "3",
      icon: Truck,
      color: "text-sky-500 bg-sky-50",
    },
    {
      label: "Today's Revenue",
      value: "KSh 1850",
      icon: TrendingUp,
      color: "text-amber-500 bg-amber-50",
    },
  ];

  const handleAction = (orderCode: string, currentStatus: string) => {
    let nextStatus = "Completed";
    if (currentStatus === "New") nextStatus = "Washing";
    else if (currentStatus === "Washing") nextStatus = "Drying";
    else if (currentStatus === "Ironing" || currentStatus === "Drying")
      nextStatus = "Folding";
    else if (currentStatus === "Folding") nextStatus = "Ready";

    setOrders((prev) =>
      prev.map((ord) =>
        ord.order_code === orderCode ? { ...ord, status: nextStatus } : ord,
      ),
    );
  };

  const getActionLabel = (status: string) => {
    switch (status) {
      case "New":
        return "Accept Order";
      case "Washing":
        return "Complete Wash";
      case "Ironing":
        return "Start Folding";
      case "Folding":
        return "Mark Ready";
      case "Ready":
        return "Mark Collected";
      default:
        return "Update";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Dark Sidebar */}
      <aside className="w-64 bg-[#0d1726] text-slate-300 p-6 flex flex-col justify-between hidden md:flex">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0088cc] text-white flex items-center justify-center font-bold text-sm">
              P
            </div>
            <div>
              <p className="font-bold text-white text-sm leading-tight">
                Pinnacle Laundry
              </p>
              <p className="text-[10px] text-sky-400">Admin Panel</p>
            </div>
          </div>

          <nav className="space-y-1">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[#0088cc] text-white text-xs font-bold shadow-sm"
            >
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </Link>
            <Link
              href="/admin/orders"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-slate-800/60 text-xs font-medium"
            >
              <ShoppingBag className="w-4 h-4" /> Orders
            </Link>
            <Link
              href="/admin/pickups"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-slate-800/60 text-xs font-medium"
            >
              <Truck className="w-4 h-4" /> Pickup Requests
            </Link>
            <Link
              href="/admin/queue"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-slate-800/60 text-xs font-medium"
            >
              <Layers className="w-4 h-4" /> Laundry Queue
            </Link>
            <Link
              href="/admin/customers"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-slate-800/60 text-xs font-medium"
            >
              <Users className="w-4 h-4" /> Customers
            </Link>
            <Link
              href="/admin/payments"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-slate-800/60 text-xs font-medium"
            >
              <CreditCard className="w-4 h-4" /> Payments
            </Link>
            <Link
              href="/admin/analytics"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-slate-800/60 text-xs font-medium"
            >
              <BarChart3 className="w-4 h-4" /> Analytics
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-slate-800/60 text-xs font-medium"
            >
              <Settings className="w-4 h-4" /> Settings
            </Link>
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-800 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-[#0088cc] text-white flex items-center justify-center font-bold text-xs">
              A
            </div>
            <div>
              <p className="text-xs font-bold text-white">Admin User</p>
              <p className="text-[10px] text-slate-400">admin@pinnacle.co.ke</p>
            </div>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("auth_token");
              window.location.href = "/login";
            }}
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-rose-400 w-full px-2"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Admin Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-100 h-16 px-8 flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-900">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-medium rounded-full border border-amber-200/80 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />{" "}
              Live Data
            </span>
            <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-8 space-y-6 max-w-7xl">
          {/* Top 5 Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between"
              >
                <div className="flex justify-between items-start">
                  <p className="text-[11px] text-slate-500 font-medium">
                    {s.label}
                  </p>
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${s.color}`}
                  >
                    <s.icon className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-2xl font-extrabold text-slate-900 mt-3">
                  {s.value}
                </p>
              </div>
            ))}
          </div>

          {/* Revenue Chart & Service Mix Donuts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue Chart Visual */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h2 className="text-sm font-bold text-slate-800 mb-6">
                Revenue This Week
              </h2>
              <div className="h-44 flex items-end justify-between gap-4 px-4 pb-2 border-b border-slate-100">
                {[
                  { day: "Mon", height: "40%" },
                  { day: "Tue", height: "65%" },
                  { day: "Wed", height: "55%" },
                  { day: "Thu", height: "75%" },
                  { day: "Fri", height: "85%" },
                  { day: "Sat", height: "95%" },
                  { day: "Sun", height: "70%" },
                ].map((bar) => (
                  <div
                    key={bar.day}
                    className="flex-1 flex flex-col items-center gap-2 h-full justify-end"
                  >
                    <div
                      style={{ height: bar.height }}
                      className="w-full max-w-[36px] bg-[#0088cc] rounded-t-md hover:bg-[#0077b3] transition-all cursor-pointer"
                    />
                    <span className="text-[11px] text-slate-400 font-medium">
                      {bar.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Mix Breakdown */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <h2 className="text-sm font-bold text-slate-800 mb-4">
                Service Mix
              </h2>
              <div className="flex items-center justify-center my-auto">
                <div className="w-32 h-32 rounded-full border-8 border-sky-500 border-t-emerald-500 border-r-amber-500 border-b-purple-500 flex items-center justify-center">
                  <span className="text-xs font-bold text-slate-700">
                    100% Total
                  </span>
                </div>
              </div>
              <div className="space-y-1.5 text-xs text-slate-600 pt-4">
                <div className="flex justify-between">
                  <span>● Washing</span>
                  <span className="font-bold">45%</span>
                </div>
                <div className="flex justify-between">
                  <span>● Wash+Fold</span>
                  <span className="font-bold">30%</span>
                </div>
                <div className="flex justify-between">
                  <span>● Blankets</span>
                  <span className="font-bold">15%</span>
                </div>
                <div className="flex justify-between">
                  <span>● Ironing</span>
                  <span className="font-bold">10%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Today's Laundry Queue */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Today&apos;s Laundry Queue — Orders Requiring Action
                </h2>
              </div>
              <Link
                href="/admin/queue"
                className="text-xs font-bold text-[#0088cc] hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#0088cc]">
                        {ord.order_code}
                      </span>
                      <span className="text-xs font-semibold text-slate-700">
                        {ord.full_name}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-[#0088cc] border border-sky-100">
                        {ord.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      {ord.services.join(", ")} · {ord.estimated_weight_kg}kg
                    </p>
                  </div>

                  <button
                    onClick={() => handleAction(ord.order_code, ord.status)}
                    className="px-5 py-2 rounded-xl bg-[#0088cc] hover:bg-[#0077b3] text-white text-xs font-bold transition shadow-sm self-start sm:self-center"
                  >
                    {getActionLabel(ord.status)}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
