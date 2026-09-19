"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginPayload, SignupPayload } from "@/types/auth";

export function useAuthMutation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async (payload: LoginPayload) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to log in");

      // Dynamic redirect resolved by user role
      if (data.role === "admin" || data.role === "staff") {
        router.push("/admin");
      } else {
        const pending = localStorage.getItem("pending_booking");
        if (pending) {
          router.push("/book?resume=true");
        } else {
          router.push("/dashboard");
        }
      }
      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (payload: SignupPayload) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create account");

      const pending = localStorage.getItem("pending_booking");
      if (pending) {
        router.push("/book?resume=true");
      } else {
        router.push("/dashboard");
      }
      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, signup, loading, error };
}
