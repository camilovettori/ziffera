import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      fullName,
      businessName,
      email,
      phone,
      projectType,
      message,
      contactMethod,
    } = body;

    if (!fullName || !businessName || !email || !projectType || !message) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    console.log("NEW LEAD:", {
      fullName,
      businessName,
      email,
      phone,
      projectType,
      message,
      contactMethod,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(
      { success: true, message: "Application received." },
      { status: 200 }
    );
  } catch (error) {
    console.error("START APPLICATION ERROR:", error);

    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
