"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import DynamicForm from "@/components/shared/DynamicForm";
import { FormFieldConfig } from "@/types/forms";
import { CustomerType } from "@/types/auth";
import { useAuthMutation } from "@/hooks/useAuthMutation";
import { GraduationCap, User, MapPin, CheckCircle2, X } from "lucide-react";

const baseFields: FormFieldConfig[] = [
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    placeholder: "Alex Kimani",
    required: true,
  },
  {
    name: "phone",
    label: "Phone Number (Login ID)",
    type: "tel",
    placeholder: "0793002308",
    required: true,
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "alex@example.com",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "••••••••",
    required: true,
  },
];

const studentFields: FormFieldConfig[] = [
  {
    name: "hostelName",
    label: "Hostel Name",
    type: "text",
    placeholder: "Breeze Point",
    required: true,
    gridSpan: "half",
  },
  {
    name: "roomNumber",
    label: "Room No.",
    type: "text",
    placeholder: "B-12",
    required: true,
    gridSpan: "half",
  },
];

const residentFields: FormFieldConfig[] = [
  {
    name: "buildingName",
    label: "Estate / Building",
    type: "text",
    placeholder: "Sunrise Plaza",
    required: true,
    gridSpan: "half",
  },
  {
    name: "houseNumber",
    label: "House / Apt No.",
    type: "text",
    placeholder: "H-4",
    required: true,
    gridSpan: "half",
  },
];

export default function SignupPage() {
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get("redirect") || "/dashboard";

  const [customerType, setCustomerType] = useState<CustomerType>("student");
  const [formData, setFormData] = useState<Record<string, any>>({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    hostelName: "",
    roomNumber: "",
    buildingName: "",
    houseNumber: "",
    latitude: null,
    longitude: null,
  });

  const [locationStatus, setLocationStatus] = useState<
    "idle" | "fetching" | "success" | "denied"
  >("idle");
  const { signup, loading, error } = useAuthMutation();

  const handleFieldChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) return;
    setLocationStatus("fetching");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setFormData((prev) => ({
          ...prev,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }));
        setLocationStatus("success");
      },
      () => setLocationStatus("denied"),
      { enableHighAccuracy: true },
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup({
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
      customerType,
      hostelName: formData.hostelName,
      roomNumber: formData.roomNumber,
      buildingName: formData.buildingName,
      houseNumber: formData.houseNumber,
      latitude: formData.latitude,
      longitude: formData.longitude,
    });
  };

  const fields = [
    ...baseFields,
    ...(customerType === "student" ? studentFields : residentFields),
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 relative">
        {/* Top Cancel/Close Icon */}
        <Link
          href="/"
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition"
          aria-label="Cancel and go home"
        >
          <X className="w-4 h-4" />
        </Link>

        {/* Brand Icon & Heading */}
        <div className="text-center mb-5">
          <div className="w-10 h-10 rounded-2xl bg-[#0088cc]/10 text-[#0088cc] flex items-center justify-center font-bold text-lg mx-auto mb-2">
            P
          </div>
          <h1 className="text-xl font-bold text-slate-900">Pinnacle Laundry</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Choose an option to continue
          </p>
        </div>

        {/* Mode Switch Tabs: Sign In vs Sign Up */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl mb-5">
          <Link
            href={`/login?redirect=${encodeURIComponent(redirectParam)}`}
            className="py-2 text-center text-xs font-semibold text-slate-600 hover:text-slate-900 transition rounded-xl"
          >
            Sign In
          </Link>
          <button
            type="button"
            className="py-2 text-center text-xs font-bold bg-white text-[#0088cc] shadow-sm rounded-xl"
          >
            Create Account
          </button>
        </div>

        {/* Customer Type Selector */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-50 border border-slate-100 rounded-xl mb-4">
          <button
            type="button"
            onClick={() => setCustomerType("student")}
            className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              customerType === "student"
                ? "bg-white text-[#0088cc] shadow-sm"
                : "text-slate-500"
            }`}
          >
            <GraduationCap className="w-4 h-4" /> Student
          </button>
          <button
            type="button"
            onClick={() => setCustomerType("resident")}
            className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              customerType === "resident"
                ? "bg-white text-[#0088cc] shadow-sm"
                : "text-slate-500"
            }`}
          >
            <User className="w-4 h-4" /> Non-Student
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-xs font-medium">
            {error}
          </div>
        )}

        <DynamicForm
          fields={fields}
          formData={formData}
          onChange={handleFieldChange}
          onSubmit={handleSubmit}
          submitText="Create Account & Continue"
          isLoading={loading}
        >
          {/* GPS Pin Button */}
          <div className="pb-1">
            <button
              type="button"
              onClick={handleGetLocation}
              className={`w-full py-2.5 px-4 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold transition ${
                locationStatus === "success"
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
              }`}
            >
              {locationStatus === "success" ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Location
                  Captured
                </>
              ) : (
                <>
                  <MapPin className="w-4 h-4 text-[#0088cc]" />
                  {locationStatus === "fetching"
                    ? "Getting GPS..."
                    : "Allow Delivery Location Pin"}
                </>
              )}
            </button>
          </div>
        </DynamicForm>

        {/* Cancel Button */}
        <div className="mt-4 pt-3 border-t border-slate-100 text-center">
          <Link
            href="/"
            className="text-xs font-medium text-slate-500 hover:text-slate-800 transition inline-block"
          >
            Cancel and Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
