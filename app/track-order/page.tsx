"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/shared/Breadcrumb";
import TrackSearchSection from "@/components/landing/TrackSearchSection";
import { Check, Clock, Truck, Search, ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface TimelineStep {
  key: string;
  label: string;
  subtext?: string;
}

const ORDER_STEPS: TimelineStep[] = [
  { key: "submitted", label: "Booking Created" },
  { key: "pickup_scheduled", label: "Pickup Scheduled" },
  { key: "intake_weighed", label: "Laundry Received" },
  { key: "washing", label: "Washing", subtext: "In progress..." },
  { key: "folding_qc", label: "Ironing / Folding" },
  { key: "ready_for_pickup", label: "Ready" },
  { key: "completed", label: "Collected / Delivered" },
];

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const rawId = searchParams.get("orderId") || searchParams.get("id");
  const normalizedId = rawId ? rawId.replace(/^#/, "").toUpperCase() : null;

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(Boolean(normalizedId));
  const [notFound, setNotFound] = useState<boolean>(false);
  const supabase = createClient();

  useEffect(() => {
    if (!normalizedId) {
      setLoading(false);
      return;
    }

    async function fetchOrder() {
      setLoading(true);
      setNotFound(false);
      try {
        // Query matching order by human code PIN-XXXX
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .ilike("order_code", `%${normalizedId}%`)
          .maybeSingle();

        if (error || !data) {
          setNotFound(true);
        } else {
          setOrder(data);
        }
      } catch (err) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [normalizedId, supabase]);

  const getStepIndex = (status: string) => {
    switch (status) {
      case "submitted":
        return 0;
      case "pickup_scheduled":
        return 1;
      case "intake_weighed":
        return 2;
      case "washing":
        return 3;
      case "drying_line":
      case "folding_qc":
        return 4;
      case "ready_for_pickup":
        return 5;
      case "completed":
        return 6;
      default:
        return 3;
    }
  };

  // 1. If no ID was searched, show the search box
  if (!normalizedId) {
    return (
      <div className="min-h-[70vh]">
        <Breadcrumb currentPage="Track Order" />
        <TrackSearchSection />
      </div>
    );
  }

  // 2. Loading state
  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-xs font-semibold text-slate-400 animate-pulse">
          Searching for order #{normalizedId}...
        </p>
      </div>
    );
  }

  // 3. Not found state
  if (notFound || !order) {
    return (
      <div className="min-h-[70vh] max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
          <Search className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-slate-800">Order Not Found</h2>
        <p className="text-xs text-slate-500">
          We couldn&apos;t find an order matching{" "}
          <span className="font-semibold text-slate-700">#{normalizedId}</span>.
          Please verify your order number and try again.
        </p>
        <Link
          href="/track-order"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0088cc] hover:underline pt-2"
        >
          <ArrowLeft className="w-4 h-4" /> Try another search
        </Link>
      </div>
    );
  }

  const activeIndex = getStepIndex(order.status);

  // 4. Live Timeline & Map Details view matching your design
  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      <Breadcrumb currentPage={`Track #${order.order_code}`} />

      <main className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
        {/* Back Link */}
        <Link
          href="/track-order"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition"
        >
          <ArrowLeft className="w-4 h-4" /> New Search
        </Link>

        {/* Order Header Summary Banner */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-slate-900">
                {order.order_code}
              </span>
              <span className="px-3 py-1 bg-sky-50 text-[#0088cc] rounded-full text-xs font-bold capitalize">
                {order.status.replace("_", " ")}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {order.services?.join(" + ") || "Washing"} ·{" "}
              {order.actual_weight_kg || order.estimated_weight_kg}kg
            </p>
            <p className="text-xs text-slate-400 mt-2">
              Pinnacle crew is processing your laundry.
            </p>
          </div>
        </div>

        {/* Vertical Timeline Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
          <h2 className="text-xs font-bold text-slate-800">Order Timeline</h2>

          <div className="relative pl-6 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
            {ORDER_STEPS.map((step, idx) => {
              const isCompleted = idx < activeIndex;
              const isCurrent = idx === activeIndex;

              return (
                <div key={step.key} className="relative flex items-start gap-4">
                  <div
                    className={`absolute -left-[23px] w-6 h-6 rounded-full flex items-center justify-center text-white transition-all z-10 ${
                      isCompleted
                        ? "bg-emerald-500"
                        : isCurrent
                          ? "bg-sky-400 ring-4 ring-sky-100"
                          : "bg-slate-200"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    ) : isCurrent ? (
                      <Clock className="w-3.5 h-3.5 stroke-[2.5]" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-slate-400" />
                    )}
                  </div>

                  <div>
                    <p
                      className={`text-xs font-bold leading-tight ${
                        isCompleted || isCurrent
                          ? "text-slate-900"
                          : "text-slate-400"
                      }`}
                    >
                      {step.label}
                    </p>
                    {isCurrent && (
                      <p className="text-[11px] font-semibold text-sky-500 mt-0.5">
                        {step.subtext || "In progress..."}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pickup Status Card with Map Placeholder */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
          <h2 className="text-xs font-bold text-slate-800">Pickup Status</h2>

          <div className="h-36 bg-sky-50 rounded-2xl border border-sky-100 flex flex-col items-center justify-center gap-1.5 relative">
            <span className="text-xs font-semibold text-[#0088cc]">
              Google Maps Integration
            </span>
            <Truck className="w-6 h-6 text-[#0088cc]" />
            <span className="text-[11px] text-slate-500">
              Crew location shown here
            </span>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#0088cc] flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase">
                Crew Status
              </p>
              <p className="text-xs font-bold text-slate-800">
                {order.collection_method === "pickup"
                  ? "Laundry collected — now at facility"
                  : "Drop-off received at counter"}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh]" />}>
      <TrackOrderContent />
    </Suspense>
  );
}
