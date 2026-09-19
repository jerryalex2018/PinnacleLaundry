"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookingPayload } from "@/types/order";

export function useBookingMutation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const submitBooking = async (
    payload: BookingPayload,
    isAuthenticated: boolean,
  ) => {
    // Intercept guest users and stash draft in localStorage
    if (!isAuthenticated) {
      localStorage.setItem("pending_booking", JSON.stringify(payload));
      router.push("/signup?redirect=/book");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Booking failed");

      localStorage.removeItem("pending_booking");
      router.push(`/track-order?orderId=${data.orderId}`);
      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { submitBooking, loading, error };
}
