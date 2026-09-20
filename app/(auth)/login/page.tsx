"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import DynamicForm from "@/components/shared/DynamicForm";
import { FormFieldConfig } from "@/types/forms";
import { useAuthMutation } from "@/hooks/useAuthMutation";
import { X } from "lucide-react";

const loginFields: FormFieldConfig[] = [
  {
    name: "identifier",
    label: "Phone Number or Email",
    type: "text",
    placeholder: "0793002308 or alex@example.com",
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

export default function LoginPage() {
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get("redirect") || "/dashboard";

  const [formData, setFormData] = useState<Record<string, any>>({
    identifier: "",
    password: "",
  });

  const { login, loading, error } = useAuthMutation();

  const handleFieldChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({
      identifier: formData.identifier,
      password: formData.password,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-12">
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
          <h1 className="text-xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Sign in to check orders or schedule laundry
          </p>
        </div>

        {/* Mode Switch Tabs: Sign In vs Sign Up */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl mb-6">
          <button
            type="button"
            className="py-2 text-center text-xs font-bold bg-white text-[#0088cc] shadow-sm rounded-xl"
          >
            Sign In
          </button>
          <Link
            href={`/signup?redirect=${encodeURIComponent(redirectParam)}`}
            className="py-2 text-center text-xs font-semibold text-slate-600 hover:text-slate-900 transition rounded-xl"
          >
            Create Account
          </Link>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-xs font-medium">
            {error}
          </div>
        )}

        <DynamicForm
          fields={loginFields}
          formData={formData}
          onChange={handleFieldChange}
          onSubmit={handleSubmit}
          submitText="Sign In"
          isLoading={loading}
        />

        {/* Cancel Button */}
        <div className="mt-5 pt-4 border-t border-slate-100 text-center">
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
