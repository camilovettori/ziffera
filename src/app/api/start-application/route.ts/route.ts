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

    // 🛑 validação básica
    if (!fullName || !businessName || !email || !projectType || !message) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // 📩 Aqui você decide o que fazer com o lead

    // 👉 OPÇÃO 1 (simples - console)
    console.log("🚀 NEW LEAD:");
    console.log({
      fullName,
      businessName,
      email,
      phone,
      projectType,
      message,
      contactMethod,
      createdAt: new Date().toISOString(),
    });

    // 👉 depois podemos trocar por:
    // - enviar email (Resend)
    // - salvar no DB (Supabase/Postgres)
    // - enviar para CRM

    return NextResponse.json(
      { success: true, message: "Application received." },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ ERROR:", error);

    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}