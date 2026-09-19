import Link from "next/link";

const steps = [
  {
    num: "01",
    title: "Book",
    desc: "Choose your laundry service, weight, and preferences.",
  },
  {
    num: "02",
    title: "Drop Off or Request Pickup",
    desc: "Bring laundry to us or have us collect from your location.",
  },
  {
    num: "03",
    title: "We Clean",
    desc: "Pinnacle handles washing, ironing, and folding with care.",
  },
  {
    num: "04",
    title: "Track",
    desc: "Monitor your order status every step of the way.",
  },
  {
    num: "05",
    title: "Collect",
    desc: "Get your clean clothes back — delivered or ready for pickup.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-xl mx-auto mb-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          How It Works
        </h2>
        <p className="text-slate-500 mt-2 text-xs sm:text-sm">
          Five simple steps to clean laundry.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-center relative"
          >
            {idx < steps.length - 1 && (
              <div className="hidden md:block absolute top-5 left-[60%] w-full h-[2px] bg-sky-200 z-0" />
            )}
            <div className="w-10 h-10 rounded-full bg-[#0088cc] text-white flex items-center justify-center font-bold text-xs shadow-sm z-10 mb-3">
              {step.num}
            </div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1">
              {step.title}
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed max-w-[200px]">
              {step.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          href="/services"
          className="inline-block w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#0088cc] hover:bg-[#0077b3] text-white text-sm font-semibold shadow-sm transition"
        >
          Get Started — Book Now
        </Link>
      </div>
    </section>
  );
}
