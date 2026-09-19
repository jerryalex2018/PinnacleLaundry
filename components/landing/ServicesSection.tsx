import Link from "next/link";
import {
  Shirt,
  Flame,
  Layers,
  Box,
  Truck,
  RotateCcw,
  ArrowRight,
} from "lucide-react";

export const services = [
  {
    icon: Shirt,
    iconColor: "text-sky-500",
    bgColor: "bg-sky-50",
    title: "Washing",
    desc: "Professional washing for everyday clothes.",
    price: "KSh 50/kg",
  },
  {
    icon: Flame,
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-50",
    title: "Ironing",
    desc: "Freshly pressed clothes ready to wear.",
  },
  {
    icon: Layers,
    iconColor: "text-purple-500",
    bgColor: "bg-purple-50",
    title: "Folding",
    desc: "Neatly folded and organized clothes.",
  },
  {
    icon: Box,
    iconColor: "text-amber-500",
    bgColor: "bg-amber-50",
    title: "Blankets",
    desc: "Full blanket cleaning service.",
    price: "KSh 250 each",
  },
  {
    icon: Truck,
    iconColor: "text-sky-500",
    bgColor: "bg-sky-50",
    title: "Pickup",
    desc: "Request pickup from your location.",
  },
  {
    icon: RotateCcw,
    iconColor: "text-pink-500",
    bgColor: "bg-pink-50",
    title: "Retrieval",
    desc: "Collect your completed laundry or request retrieval.",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-xl mx-auto mb-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Our Services
        </h2>
        <p className="text-slate-500 mt-2 text-xs sm:text-sm">
          Everything your laundry needs — from washing to delivery.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div
                  className={`w-11 h-11 rounded-xl ${item.bgColor} flex items-center justify-center mb-4`}
                >
                  <Icon className={`w-5 h-5 ${item.iconColor}`} />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-1">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm mb-4">{item.desc}</p>
                {item.price && (
                  <p className="text-[#0088cc] font-semibold text-sm mb-4">
                    {item.price}
                  </p>
                )}
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0088cc] hover:underline"
              >
                Book Now <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
