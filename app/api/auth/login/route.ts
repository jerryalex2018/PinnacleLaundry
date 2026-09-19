import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { identifier, password } = body;

    if (!identifier || !password) {
      return NextResponse.json(
        { message: "Phone number/email and password are required." },
        { status: 400 },
      );
    }

    // TODO: Connect to backend authentication service (e.g. Supabase Auth)
    // Placeholder response simulating successful auth
    const mockRole = identifier.includes("admin") ? "admin" : "customer";

    return NextResponse.json({
      success: true,
      role: mockRole,
      user: {
        id: "usr_placeholder_123",
        identifier,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
