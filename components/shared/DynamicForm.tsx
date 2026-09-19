"use client";

import React from "react";
import { FormFieldConfig } from "@/types/forms";

interface DynamicFormProps {
  fields: FormFieldConfig[];
  formData: Record<string, any>;
  onChange: (name: string, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitText: string;
  isLoading?: boolean;
  children?: React.ReactNode;
}

export default function DynamicForm({
  fields,
  formData,
  onChange,
  onSubmit,
  submitText,
  isLoading = false,
  children,
}: DynamicFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Slot for custom headers, segment selectors, or GPS buttons */}
      {children}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {fields.map((field) => {
          const isHalf = field.gridSpan === "half";

          return (
            <div
              key={field.name}
              className={isHalf ? "col-span-1" : "col-span-1 sm:col-span-2"}
            >
              <label
                htmlFor={field.name}
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                {field.label}{" "}
                {field.required && <span className="text-rose-500">*</span>}
              </label>

              {field.type === "select" ? (
                <select
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  value={formData[field.name] || ""}
                  onChange={(e) => onChange(field.name, e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0088cc] focus:border-transparent transition-all"
                >
                  <option value="" disabled>
                    {field.placeholder || "Select an option"}
                  </option>
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : field.type === "textarea" ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  rows={3}
                  required={field.required}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ""}
                  onChange={(e) => onChange(field.name, e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0088cc] focus:border-transparent transition-all resize-none"
                />
              ) : (
                <input
                  id={field.name}
                  type={field.type}
                  name={field.name}
                  required={field.required}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ""}
                  onChange={(e) => onChange(field.name, e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0088cc] focus:border-transparent transition-all"
                />
              )}

              {field.helpText && (
                <p className="text-[11px] text-slate-400 mt-1">
                  {field.helpText}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-2 py-3 rounded-xl bg-[#0088cc] hover:bg-[#0077b3] disabled:bg-slate-300 text-white font-semibold text-sm shadow-sm transition-all active:scale-[0.99] flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          submitText
        )}
      </button>
    </form>
  );
}
