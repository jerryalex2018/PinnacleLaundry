// app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      fullName,
      phone,
      email,
      password,
      customerType,
      hostelName,
      roomNumber,
      buildingName,
      houseNumber,
      latitude,
      longitude,
    } = body;

    if (!fullName || !phone || !email || !password) {
      return NextResponse.json(
        { message: "Full name, phone, email, and password are required." },
        { status: 400 },
      );
    }

    const supabase = await createClient();

    // 1. Sign up the user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phone,
        },
      },
    });

    if (authError) {
      return NextResponse.json({ message: authError.message }, { status: 400 });
    }

    if (!authData.user) {
      return NextResponse.json(
        { message: "User registration failed." },
        { status: 500 },
      );
    }

    // 2. Insert profile record including email
    const { error: profileError } = await supabase.from("profiles").insert({
      id: authData.user.id,
      full_name: fullName,
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      role: "customer",
      customer_type: customerType || "student",
      hostel_name: hostelName || null,
      room_number: roomNumber || null,
      building_name: buildingName || null,
      house_number: houseNumber || null,
      latitude: latitude || null,
      longitude: longitude || null,
    });

    if (profileError) {
      return NextResponse.json(
        { message: profileError.message },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      role: "customer",
      token: authData.session?.access_token || "authenticated",
      user: {
        id: authData.user.id,
        fullName,
        phone,
        email,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
