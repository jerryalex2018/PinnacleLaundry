"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function TrackSearchSection() {
  const [orderId, setOrderId] = useState("");
  const router = useRouter();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    router.push(`/track-order?id=${encodeURIComponent(orderId.trim())}`);
  };

  return (
    <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="bg-[#e8f4fc] rounded-3xl p-6 sm:p-12 relative flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="w-full md:max-w-md">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Track Your Laundry
          </h2>
          <p className="text-slate-600 mt-2 text-xs sm:text-sm">
            Enter your order ID or check the dashboard to see exactly where your
            laundry is.
          </p>

          <form
            onSubmit={handleTrack}
            className="mt-6 flex flex-col sm:flex-row gap-2"
          >
            <input
              type="text"
              placeholder="Order ID — e.g. #PIN-1048"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0088cc]"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#0088cc] hover:bg-[#0077b3] text-white text-sm font-semibold transition"
            >
              Track
            </button>
          </form>
        </div>

        <div className="hidden md:flex w-20 h-20 rounded-2xl bg-[#0088cc] items-center justify-center text-white shadow-md">
          <Search className="w-9 h-9" />
        </div>
      </div>
    </section>
  );
}
