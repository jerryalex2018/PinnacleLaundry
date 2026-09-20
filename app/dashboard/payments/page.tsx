"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function PaymentsPage() {
  const [transactionCode, setTransactionCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );

  const handleCopyTill = () => {
    navigator.clipboard.writeText("XXXXX");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionCode.trim()) return;
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Payment</h1>

      <div className="max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-slate-900">
            Order #PIN-1048
          </span>
          <span className="text-xl font-extrabold text-[#0088cc]">KSh 200</span>
        </div>

        <p className="text-[11px] text-amber-600">
          ⓘ Estimated — final amount confirmed after weighing.
        </p>

        {/* Till Box */}
        <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-500 font-medium">
              Pay via M-Pesa
            </p>
            <p className="text-xl font-extrabold text-emerald-600 tracking-wider">
              XXXXX
            </p>
            <p className="text-[10px] text-amber-600">
              Placeholder Till Number
            </p>
          </div>
          <button
            type="button"
            onClick={handleCopyTill}
            className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5 shadow-sm hover:bg-slate-50 transition"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        {/* Steps List */}
        <div className="space-y-2 text-xs text-slate-600">
          <div className="flex items-center gap-3">
            <span className="w-4 text-center font-bold text-slate-400">1</span>
            <span>Open M-Pesa</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-4 text-center font-bold text-slate-400">2</span>
            <span>Select Lipa na M-Pesa</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-4 text-center font-bold text-slate-400">3</span>
            <span>Select Buy Goods and Services</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-4 text-center font-bold text-slate-400">4</span>
            <span>Enter the Pinnacle Till Number</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-4 text-center font-bold text-slate-400">5</span>
            <span>Enter the amount</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-4 text-center font-bold text-slate-400">6</span>
            <span>Confirm payment</span>
          </div>
        </div>

        {/* Transaction Input */}
        <form onSubmit={handleSubmitPayment} className="space-y-4 pt-2">
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">
              Enter M-Pesa Transaction Code
            </label>
            <input
              type="text"
              placeholder="E.G. QJK8R7T5PL"
              value={transactionCode}
              onChange={(e) => setTransactionCode(e.target.value.toUpperCase())}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold uppercase tracking-wider outline-none focus:ring-2 focus:ring-[#0088cc]"
            />
          </div>

          <button
            type="submit"
            disabled={status === "submitting" || !transactionCode.trim()}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 text-white text-xs font-bold transition shadow-sm"
          >
            {status === "submitting"
              ? "Verifying..."
              : status === "success"
                ? "Code Submitted"
                : "Submit Payment"}
          </button>

          <p className="text-[10px] text-center text-amber-600 flex items-center justify-center gap-1">
            ⓘ Payment pending verification by Pinnacle team
          </p>
        </form>
      </div>
    </div>
  );
}
