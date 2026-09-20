import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { identifier, password } = body;

    if (!identifier || !password) {
      return NextResponse.json(
        { message: "Phone number or email, and password are required." },
        { status: 400 },
      );
    }

    const cleanId = identifier.trim();
    let loginEmail = cleanId;

    // If identifier does not have '@', look up the actual email from profiles
    if (!cleanId.includes("@")) {
      // Use service role or direct supabase client to bypass RLS for login lookup
      const adminClient = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY ||
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      );

      const { data: profile } = await adminClient
        .from("profiles")
        .select("email")
        .eq("phone", cleanId)
        .maybeSingle();

      if (profile?.email) {
        loginEmail = profile.email;
      } else {
        // Fallbacks if not mapped yet
        loginEmail = `${cleanId}@pinnacle.internal`;
      }
    }

    // Authenticate with the resolved real email
    const supabase = await createServerClient();
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email: loginEmail,
        password,
      });

    if (authError) {
      return NextResponse.json({ message: authError.message }, { status: 401 });
    }

    // Fetch user details
    const { data: userProfile } = await supabase
      .from("profiles")
      .select("role, full_name, customer_type")
      .eq("id", authData.user.id)
      .maybeSingle();

    return NextResponse.json({
      success: true,
      role: userProfile?.role || "customer",
      customerType: userProfile?.customer_type || "student",
      token: authData.session.access_token,
      user: {
        id: authData.user.id,
        fullName: userProfile?.full_name || authData.user.email,
        email: authData.user.email,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
