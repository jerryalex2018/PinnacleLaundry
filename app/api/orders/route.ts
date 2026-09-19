import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // TODO: Insert into database orders table and generate Tag ID
    const mockOrderId = `PIN-${Math.floor(1000 + Math.random() * 9000)}`;

    return NextResponse.json({
      success: true,
      orderId: mockOrderId,
      status: "intake_pending",
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
