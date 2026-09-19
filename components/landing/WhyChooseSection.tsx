import { Clock, DollarSign, Search, Truck } from "lucide-react";

const reasons = [
  {
    icon: Clock,
    iconColor: "text-sky-500",
    bgColor: "bg-sky-50",
    title: "Convenient",
    desc: "Book your laundry without unnecessary trips.",
  },
  {
    icon: DollarSign,
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-50",
    title: "Transparent Pricing",
    desc: "Standard laundry from KSh 50/kg.",
  },
  {
    icon: Search,
    iconColor: "text-purple-500",
    bgColor: "bg-purple-50",
    title: "Easy Tracking",
    desc: "Know what stage your laundry is at.",
  },
  {
    icon: Truck,
    iconColor: "text-amber-500",
    bgColor: "bg-amber-50",
    title: "Flexible Collection",
    desc: "Pickup or manual retrieval.",
  },
];

export default function WhyChooseSection() {
  return (
    <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-xl mx-auto mb-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Why Choose Pinnacle?
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {reasons.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition text-center flex flex-col items-center"
            >
              <div
                className={`w-12 h-12 rounded-full ${item.bgColor} flex items-center justify-center mb-4`}
              >
                <Icon className={`w-5 h-5 ${item.iconColor}`} />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">
                {item.title}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
