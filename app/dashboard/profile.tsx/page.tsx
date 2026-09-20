"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ProfilePage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "Brian Mwangi",
    phone: "07XXXXXXXX",
    email: "brian@example.com",
    defaultLocation: "Near Student Center, Block C",
    instructions: "Room 204, second floor",
  });

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("full_name, phone, email, hostel_name, room_number")
          .eq("id", user.id)
          .maybeSingle();

        if (data) {
          setFormData({
            fullName: data.full_name || "",
            phone: data.phone || "",
            email: data.email || user.email || "",
            defaultLocation: data.hostel_name || "Near Student Center, Block C",
            instructions: data.room_number
              ? `Room ${data.room_number}`
              : "Room 204, second floor",
          });
        }
      }
    }
    loadProfile();
  }, [supabase]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from("profiles")
        .update({
          full_name: formData.fullName,
          phone: formData.phone,
          hostel_name: formData.defaultLocation,
        })
        .eq("id", user.id);
    }

    setLoading(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Profile</h1>

      <div className="max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
        {/* User Card */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#0088cc] text-white flex items-center justify-center font-bold text-lg shadow-sm">
            {formData.fullName.charAt(0)}
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              {formData.fullName}
            </h2>
            <p className="text-[11px] text-slate-400">
              Customer · Member since Dec 2024
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4 pt-2">
          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-[#0088cc]"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-[#0088cc]"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">
              Email
            </label>
            <input
              type="email"
              disabled
              value={formData.email}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-100 bg-slate-50 text-xs text-slate-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">
              Default Pickup Location
            </label>
            <input
              type="text"
              value={formData.defaultLocation}
              onChange={(e) =>
                setFormData({ ...formData, defaultLocation: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-[#0088cc]"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">
              Pickup Instructions
            </label>
            <input
              type="text"
              value={formData.instructions}
              onChange={(e) =>
                setFormData({ ...formData, instructions: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-[#0088cc]"
            />
          </div>

          {success && (
            <p className="text-xs font-semibold text-emerald-600">
              ✓ Changes saved successfully
            </p>
          )}

          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              className="flex-1 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition"
            >
              Change Password
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl bg-[#0088cc] hover:bg-[#0077b3] text-white text-xs font-bold transition shadow-sm"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
