import Link from "next/link";
import { Shirt, Box, Phone } from "lucide-react";

export default function PricingSection() {
  return (
    <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="rounded-3xl bg-gradient-to-b from-[#0a2540] to-[#001b33] text-white py-14 px-6 sm:px-12">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Simple, Fair Pricing
          </h2>
          <p className="text-slate-300 mt-2 text-xs sm:text-sm">
            No hidden fees. Final price confirmed after weighing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-10">
          {/* Standard Laundry */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center mb-4 text-white">
                <Shirt className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold">Standard Laundry</h3>
              <p className="text-xs text-slate-300 mt-1">
                Washing, drying, folding
              </p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-bold">KSh 50</span>
                <span className="text-xs text-slate-300">/kg</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-4">
              Estimated — final amount after weighing
            </p>
          </div>

          {/* Blankets */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center mb-4 text-white">
                <Box className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold">Blankets</h3>
              <p className="text-xs text-slate-300 mt-1">
                Full blanket cleaning
              </p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-bold">KSh 250</span>
                <span className="text-xs text-slate-300">/each</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-4">
              Per blanket — any size
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/services"
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-white text-slate-900 font-semibold text-sm hover:bg-slate-100 transition shadow-sm text-center"
          >
            Book Now
          </Link>
          <a
            href="tel:0793002308"
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium text-sm transition flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-[#0088cc]" />
            <span>Call us: 0793002308</span>
          </a>
        </div>
      </div>
    </section>
  );
}
