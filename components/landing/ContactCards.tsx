import { Phone, MapPin } from "lucide-react";

export default function ContactCards() {
  return (
    <section id="contact" className="py-16 px-4 sm:px-6 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Get in Touch
        </h2>
        <p className="text-slate-500 mt-2 text-xs sm:text-sm">
          Have questions? Reach us directly.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a
          href="tel:0793002308"
          className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-[#0088cc]">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
              Call Us
            </span>
            <span className="text-sm font-bold text-slate-900">0793002308</span>
          </div>
        </a>

        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-[#0088cc]">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
              Location
            </span>
            <span className="text-sm font-bold text-slate-900">
              Near Breeze Point, Student Center
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
