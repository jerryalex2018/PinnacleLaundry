"use client";

import { useState } from "react";
import Link from "next/link";
import DynamicForm from "@/components/shared/DynamicForm";
import { FormFieldConfig } from "@/types/forms";
import { useAuthMutation } from "@/hooks/useAuthMutation";

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
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
        {/* Brand Icon & Heading */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#0088cc]/10 text-[#0088cc] flex items-center justify-center font-bold text-xl mx-auto mb-3">
            P
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Sign in to check orders or schedule a pickup
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-xs font-medium">
            {error}
          </div>
        )}

        {/* Reusable Form */}
        <DynamicForm
          fields={loginFields}
          formData={formData}
          onChange={handleFieldChange}
          onSubmit={handleSubmit}
          submitText="Sign In"
          isLoading={loading}
        />

        {/* Footer Navigation */}
        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-500">
            Don&apos;t have an account yet?{" "}
            <Link
              href="/signup"
              className="text-[#0088cc] font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
