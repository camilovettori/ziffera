import { Resend } from "resend";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<{
      name: string;
      email: string;
      message: string;
    }>;

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    console.log("Contact form submission received", {
      name,
      email,
      hasMessage: Boolean(message),
    });

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const emailPattern = /^\S+@\S+\.\S+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY environment variable");
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const fromEmail =
      process.env.RESEND_FROM_EMAIL ?? "Ziffera Contact <onboarding@resend.dev>";

    const subject = "New contact form submission - Ziffera";
    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
        <h2 style="margin: 0 0 16px;">New contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <div style="white-space: pre-wrap; background: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 12px;">${escapeHtml(message)}</div>
      </div>
    `;

    const result = await resend.emails.send({
      from: fromEmail,
      to: ["hello@ziffera.ie"],
      replyTo: email,
      subject,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html,
    });

    console.log("Contact email sent", result);

    return NextResponse.json(
      { success: true, message: "Thanks. Your message has been sent." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact route failed", error);

    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
