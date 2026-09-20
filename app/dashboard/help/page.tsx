"use client";

import { useState } from "react";
import { Phone, MapPin, ChevronRight, ChevronDown } from "lucide-react";

export default function HelpSupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "How do I book laundry?",
      a: "Click on 'Book Laundry' in the sidebar or from the Overview dashboard, select your services, estimate the weight, upload a photo of your clothes, choose pickup or drop-off, and confirm your booking.",
    },
    {
      q: "How do I pay with M-Pesa?",
      a: "Go to the Payments tab, copy our M-Pesa Till Number, make payment through Lipa na M-Pesa (Buy Goods and Services), and submit your transaction code for quick attendant verification.",
    },
    {
      q: "How do I request a pickup?",
      a: "During the booking flow on step 4, choose 'Request Pickup' and tap 'Use My Location' so our staff can navigate directly to your hostel or building entrance.",
    },
    {
      q: "Can I cancel my order?",
      a: "Orders can be canceled anytime before our staff marks them as 'Washing'. Once clothes enter the washing cycle, cancellations are disabled.",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Help & Support</h1>

      {/* Contact Us Card */}
      <div className="max-w-md bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
        <h2 className="text-xs font-bold text-slate-800">Contact Us</h2>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-[#0088cc] flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400">Call / WhatsApp</p>
              <a
                href="https://wa.me/254793002308"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-[#0088cc] hover:underline"
              >
                0793002308
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-[#0088cc] flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400">Location</p>
              <p className="text-xs font-bold text-slate-800">
                Near Breeze Point, Student Center
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Help Accordion List */}
      <div className="max-w-md bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-3">
        <h2 className="text-xs font-bold text-slate-800 mb-2">Quick Help</h2>

        <div className="divide-y divide-slate-100">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={faq.q} className="py-3">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left text-xs font-medium text-slate-700 hover:text-slate-900"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  )}
                </button>
                {isOpen && (
                  <p className="text-[11px] text-slate-500 mt-2 leading-relaxed bg-slate-50 p-3 rounded-xl">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
