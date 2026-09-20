"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client"; // Import browser client
import {
  Shirt,
  Flame,
  Layers,
  PackageCheck,
  Truck,
  RotateCcw,
  Check,
} from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price?: string;
  icon: any;
  color: string;
}

const servicesData: ServiceItem[] = [
  {
    id: "washing",
    title: "Washing",
    description: "Professional washing for everyday clothes.",
    price: "KSh 50/kg",
    icon: Shirt,
    color: "text-sky-500 bg-sky-50",
  },
  {
    id: "ironing",
    title: "Ironing",
    description: "Freshly pressed clothes ready to wear.",
    icon: Flame,
    color: "text-emerald-500 bg-emerald-50",
  },
  {
    id: "folding",
    title: "Folding",
    description: "Neatly folded and organized clothes.",
    icon: Layers,
    color: "text-purple-500 bg-purple-50",
  },
  {
    id: "blankets",
    title: "Blankets",
    description: "Full blanket cleaning service.",
    price: "KSh 250 each",
    icon: PackageCheck,
    color: "text-amber-500 bg-amber-50",
  },
  {
    id: "pickup",
    title: "Pickup",
    description: "Request pickup from your location.",
    icon: Truck,
    color: "text-sky-500 bg-sky-50",
  },
  {
    id: "retrieval",
    title: "Retrieval",
    description: "Collect your completed laundry or request retrieval.",
    icon: RotateCcw,
    color: "text-pink-500 bg-pink-50",
  },
];

export default function ServicesPage() {
  const router = useRouter();
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "washing",
  ]);
  const [submitting, setSubmitting] = useState(false);
  const supabase = createClient();

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleBookNow = async () => {
    if (selectedServices.length === 0) {
      alert("Please select at least one service.");
      return;
    }

    setSubmitting(true);

    // 1. Stash selection in localStorage for draft persistence
    const bookingDraft = {
      services: selectedServices,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem("pending_booking", JSON.stringify(bookingDraft));

    // 2. Real auth check via Supabase
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      // Guest: redirect to auth
      router.push("/signup?redirect=/book");
    } else {
      // Logged in: advance straight into the multi-step booking stepper
      router.push("/book");
    }

    setSubmitting(false);
  };

  return (
    <div className="bg-white min-h-screen py-10 px-4 sm:px-6 pb-24">
      <div className="max-w-6xl mx-auto">
        {/* Title Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Our Services
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Everything your laundry needs — from washing to delivery.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {servicesData.map((service) => {
            const isSelected = selectedServices.includes(service.id);
            const Icon = service.icon;

            return (
              <div
                key={service.id}
                onClick={() => toggleService(service.id)}
                className={`relative rounded-3xl p-6 border transition-all cursor-pointer flex flex-col justify-between select-none ${
                  isSelected
                    ? "border-[#0088cc] shadow-md bg-sky-50/20"
                    : "border-slate-100 bg-white hover:border-slate-300 shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${service.color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                      isSelected
                        ? "border-[#0088cc] bg-[#0088cc] text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="mt-4 pt-3">
                  {service.price ? (
                    <span className="text-xs font-bold text-[#0088cc]">
                      {service.price}
                    </span>
                  ) : (
                    <span className="text-xs text-transparent select-none">
                      Spacer
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Booking Action Bar */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between p-4 sm:p-5 bg-slate-50 border border-slate-200/80 rounded-2xl gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {selectedServices.length === 0
                ? "No services selected"
                : `${selectedServices.length} service${selectedServices.length > 1 ? "s" : ""} selected`}
            </p>
            <p className="text-xs text-slate-500">
              Select all options you need before proceeding to schedule.
            </p>
          </div>

          <button
            onClick={handleBookNow}
            disabled={selectedServices.length === 0 || submitting}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#0088cc] hover:bg-[#0077b3] disabled:bg-slate-300 text-white text-sm font-semibold shadow-sm transition-all active:scale-98 flex items-center justify-center"
          >
            {submitting
              ? "Checking session..."
              : `Book Now (${selectedServices.length})`}
          </button>
        </div>
      </div>
    </div>
  );
}
