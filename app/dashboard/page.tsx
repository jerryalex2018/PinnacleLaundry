"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Shirt,
  Layers,
  CheckCircle2,
  CreditCard,
  Plus,
  Search,
  Truck,
  ChevronRight,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface OrderItem {
  id: string;
  order_code: string;
  services: string[];
  estimated_weight_kg: number;
  actual_weight_kg?: number;
  estimated_amount: number;
  status: string;
  created_at: string;
}

export default function CustomerDashboardPage() {
  const router = useRouter();
  const supabase = createClient();

  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push("/login?redirect=/dashboard");
          return;
        }

        const res = await fetch("/api/orders");
        const data = await res.json();
        if (data.orders) {
          setOrders(data.orders);
        }
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, [router, supabase]);

  const activeOrder = orders.find(
    (o) => o.status !== "completed" && o.status !== "cancelled",
  );
  const readyOrders = orders.filter((o) => o.status === "ready_for_pickup");
  const totalOutstanding = orders
    .filter((o) => o.status !== "completed")
    .reduce((acc, curr) => acc + Number(curr.estimated_amount || 0), 0);

  return (
    <div className="w-full space-y-6">
      {/* Page Title & Action */}
      <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <Link
          href="/book"
          className="px-4 py-2 bg-[#0088cc] hover:bg-[#0077b3] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition"
        >
          <Plus className="w-4 h-4" /> Book Laundry
        </Link>
      </div>

      {/* Metric Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 flex justify-between items-start shadow-sm">
          <div>
            <p className="text-[11px] text-slate-500">Active Order</p>
            <p className="text-xl font-extrabold text-slate-900 mt-1">
              {activeOrder ? 1 : 0}
            </p>
          </div>
          <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center">
            <Shirt className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 flex justify-between items-start shadow-sm">
          <div>
            <p className="text-[11px] text-slate-500">Ready Orders</p>
            <p className="text-xl font-extrabold text-slate-900 mt-1">
              {readyOrders.length}
            </p>
          </div>
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 flex justify-between items-start shadow-sm">
          <div>
            <p className="text-[11px] text-slate-500">Total Orders</p>
            <p className="text-xl font-extrabold text-slate-900 mt-1">
              {orders.length}
            </p>
          </div>
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 flex justify-between items-start shadow-sm">
          <div>
            <p className="text-[11px] text-slate-500">Outstanding</p>
            <p className="text-xl font-extrabold text-slate-900 mt-1">
              KSh {totalOutstanding}
            </p>
          </div>
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
            <CreditCard className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Current Laundry / Active Order Spotlight */}
      {activeOrder && (
        <div className="w-full bg-white p-5 rounded-2xl border border-slate-100 space-y-3 shadow-sm">
          <p className="text-xs font-bold text-slate-800">Current Laundry</p>
          <div className="bg-sky-50/50 border border-sky-100 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-sky-100 text-[#0088cc] flex items-center justify-center">
                <Shirt className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-800">
                    {activeOrder.order_code}
                  </span>
                  <span className="px-2 py-0.5 bg-sky-100 text-[#0088cc] rounded-md text-[10px] font-bold capitalize">
                    {activeOrder.status.replace("_", " ")}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {activeOrder.services?.join(" + ")} ·{" "}
                  {activeOrder.estimated_weight_kg}kg · KSh{" "}
                  {activeOrder.estimated_amount}
                </p>
              </div>
            </div>
            <Link
              href={`/track-order?orderId=${activeOrder.order_code.replace("#", "")}`}
              className="text-xs font-bold text-[#0088cc] flex items-center gap-1 hover:underline"
            >
              Track <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="w-full space-y-3">
        <p className="text-xs font-bold text-slate-800">Quick Actions</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
          {[
            {
              title: "Book Laundry",
              icon: Plus,
              href: "/book",
              color: "text-sky-500 bg-sky-50",
            },
            {
              title: "Track Order",
              icon: Search,
              href: "/track-order",
              color: "text-emerald-500 bg-emerald-50",
            },
            {
              title: "Request Pickup",
              icon: Truck,
              href: "/book",
              color: "text-purple-500 bg-purple-50",
            },
          ].map((act) => (
            <Link
              key={act.title}
              href={act.href}
              className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 hover:border-slate-200 transition-all text-center shadow-sm"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${act.color}`}
              >
                <act.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800">
                {act.title}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Orders History Table */}
      <div className="w-full bg-white rounded-2xl border border-slate-100 p-5 space-y-4 shadow-sm">
        <p className="text-xs font-bold text-slate-800">Recent Orders</p>
        {loading ? (
          <p className="text-xs text-slate-400 py-4">Loading your orders...</p>
        ) : orders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xs text-slate-400">No orders placed yet.</p>
            <Link
              href="/book"
              className="text-xs text-[#0088cc] font-bold mt-1 inline-block hover:underline"
            >
              Book your first wash →
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 text-xs w-full">
            {orders.map((ord) => (
              <div
                key={ord.id}
                className="py-3 flex items-center justify-between w-full"
              >
                <span className="font-bold text-[#0088cc] w-24">
                  {ord.order_code}
                </span>
                <span className="text-slate-600 flex-1 truncate pr-2">
                  {ord.services?.join(", ")}
                </span>
                <span className="font-bold text-slate-800 w-24 text-right">
                  KSh {ord.estimated_amount}
                </span>
                <div className="w-28 text-right">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-sky-50 text-[#0088cc] capitalize">
                    {ord.status.replace("_", " ")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
