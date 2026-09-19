import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, phone, email, customerType } = body;

    if (!fullName || !phone || !email) {
      return NextResponse.json(
        { message: "Full name, phone number, and email are required." },
        { status: 400 },
      );
    }

    // TODO: Connect to backend registration & profiles table
    return NextResponse.json({
      success: true,
      role: "customer",
      customerType,
      user: {
        id: "usr_placeholder_new",
        fullName,
        phone,
        email,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
