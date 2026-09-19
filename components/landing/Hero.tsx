import Link from "next/link";
import { ArrowRight, ChevronRight, MapPin, Phone } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#eef6fb] to-white pt-10 pb-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-5 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-100 shadow-sm text-xs font-medium text-slate-600">
            <span className="w-2 h-2 rounded-full bg-[#0088cc]" />
            Customer-friendly laundry service
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Clean Clothes. <br />
            <span className="text-[#0088cc]">Zero Hassle.</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-lg leading-relaxed">
            Professional laundry services near Breeze Point and the Student
            Center. Wash, fold, iron, and collect your clothes with ease.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl sm:rounded-full bg-[#0088cc] hover:bg-[#0077b3] text-white text-sm font-semibold shadow-sm transition"
            >
              Book Laundry <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-xl sm:rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium transition"
            >
              How It Works <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-500">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#0088cc]" />
              <span>Near Breeze Point • Student Center</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-[#0088cc]" />
              <span>0793002308</span>
            </div>
          </div>
        </div>

        {/* Right Content: 3D Washing Machine Graphic */}
        <div className="relative flex justify-center items-center mt-6 lg:mt-0">
          <div className="absolute -top-3 -left-3 w-8 h-8 rounded-xl bg-blue-500/20 blur-sm animate-pulse" />
          <div className="absolute -bottom-2 right-4 w-6 h-6 rounded-lg bg-amber-400/30" />

          <div className="w-64 sm:w-80 h-72 sm:h-92 bg-gradient-to-tr from-sky-100 to-sky-50 border-4 border-white rounded-3xl shadow-xl flex flex-col items-center justify-center p-6 relative">
            <div className="w-full flex justify-between items-center mb-6 px-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#0088cc]" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              </div>
              <div className="w-8 h-2.5 rounded bg-slate-200" />
            </div>

            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full border-8 border-white/80 bg-gradient-to-br from-sky-300 via-sky-400 to-[#0088cc] shadow-inner flex items-center justify-center relative overflow-hidden">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white/20" />
              <div className="absolute bottom-4 left-6 w-5 h-5 rounded-full bg-white/40" />
              <div className="absolute top-5 right-7 w-4 h-4 rounded-full bg-white/30" />
            </div>

            <div className="w-16 h-3 bg-sky-200/80 rounded-full mt-6" />
          </div>

          {/* <div className="absolute -bottom-4 right-2 sm:right-6 bg-white border border-slate-100 px-3.5 py-2 rounded-xl shadow-md text-xs text-slate-700">
            <span className="font-semibold block text-slate-900">
              Serving students
            </span>
            Breeze Point Area
          </div> */}
        </div>
      </div>
    </section>
  );
}
