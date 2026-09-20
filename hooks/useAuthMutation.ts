"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginPayload, SignupPayload } from "@/types/auth";

export function useAuthMutation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Helper to drain any pending booking draft
  const finalizePendingBooking = async () => {
    const pending = localStorage.getItem("pending_booking");
    if (pending) {
      try {
        const orderData = JSON.parse(pending);
        await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        });
        localStorage.removeItem("pending_booking");
      } catch (err) {
        console.error("Failed to auto-submit pending order:", err);
      }
    }
  };

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
      if (!res.ok) throw new Error(data.message || "Invalid login credentials");

      // Save token for authenticated session detection
      localStorage.setItem("auth_token", data.token || "mock_token");

      // Role check: Admins jump straight to admin panel
      if (data.role === "admin" || data.role === "staff") {
        router.push("/admin");
        return;
      }

      // Normal user: Submit draft if present, then open customer dashboard
      await finalizePendingBooking();
      router.push("/dashboard");
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

      localStorage.setItem("auth_token", data.token || "mock_token");

      await finalizePendingBooking();
      router.push("/dashboard");
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
