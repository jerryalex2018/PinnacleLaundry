"use client";

import { useState } from "react";
import DynamicForm from "@/components/shared/DynamicForm";
import { FormFieldConfig } from "@/types/forms";
import { CustomerType } from "@/types/auth";
import { useAuthMutation } from "@/hooks/useAuthMutation";
import { GraduationCap, User, MapPin, CheckCircle2 } from "lucide-react";

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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Create Account</h1>
          <p className="text-xs text-slate-500 mt-1">
            Set up your profile to book laundry
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-xs">
            {error}
          </div>
        )}

        {/* Customer Type Selector */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl mb-4">
          <button
            type="button"
            onClick={() => setCustomerType("student")}
            className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition ${
              customerType === "student"
                ? "bg-white text-[#0088cc] shadow-sm"
                : "text-slate-600"
            }`}
          >
            <GraduationCap className="w-4 h-4" /> Student
          </button>
          <button
            type="button"
            onClick={() => setCustomerType("resident")}
            className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition ${
              customerType === "resident"
                ? "bg-white text-[#0088cc] shadow-sm"
                : "text-slate-600"
            }`}
          >
            <User className="w-4 h-4" /> Non-Student
          </button>
        </div>

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
      </div>
    </div>
  );
}
