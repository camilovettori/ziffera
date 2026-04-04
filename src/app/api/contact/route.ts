import { Resend } from "resend";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = "Ziffera <hello@ziffera.ie>";
const logoUrl = "https://ziffera.ie/logos/ziffera-logo.png";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildAdminEmailHtml(name: string, email: string, message: string) {
  return `
    <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #0f172a; background: #ffffff; padding: 24px 0;">
      <div style="max-width: 600px; margin: 0 auto; padding: 0 20px;">
        <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 20px; box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08); overflow: hidden;">
          <div style="padding: 28px 28px 20px; text-align: center;">
            <img src="${logoUrl}" alt="Ziffera" width="168" style="display: block; margin: 0 auto 14px; max-width: 168px; height: auto;" />
            <div style="height: 1px; background: #e5e7eb; margin: 0 auto; width: 100%;"></div>
          </div>
          <div style="padding: 0 28px 28px;">
            <h2 style="margin: 0 0 16px; font-size: 24px; line-height: 1.2; color: #0f172a; letter-spacing: -0.03em;">New contact form submission</h2>
            <p style="margin: 0 0 12px; font-size: 15px; color: #334155;"><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p style="margin: 0 0 12px; font-size: 15px; color: #334155;"><strong>Email:</strong> ${escapeHtml(email)}</p>
            <div style="margin-top: 18px; padding: 18px; border: 1px solid #e5e7eb; border-radius: 16px; background: #f8fafc;">
              <div style="font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: #64748b; margin-bottom: 10px;">Message</div>
              <div style="white-space: pre-wrap; font-size: 15px; color: #0f172a;">${escapeHtml(message)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function buildAutoReplyHtml(name: string) {
  return `
    <div style="margin: 0; padding: 0; background: #f8fafc; font-family: Arial, Helvetica, sans-serif; color: #0f172a;">
      <div style="max-width: 600px; margin: 0 auto; padding: 32px 20px;">
        <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 22px; box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08); overflow: hidden;">
          <div style="padding: 28px 28px 20px; text-align: center;">
            <img src="${logoUrl}" alt="Ziffera" width="168" style="display: block; margin: 0 auto 14px; max-width: 168px; height: auto;" />
            <div style="height: 1px; background: #e5e7eb; margin: 0 auto; width: 100%;"></div>
          </div>

          <div style="padding: 0 28px 30px;">
            <h1 style="margin: 0 0 18px; font-size: 28px; line-height: 1.15; letter-spacing: -0.04em; color: #0f172a;">Your message has been received</h1>
            <p style="margin: 0 0 14px; font-size: 16px; line-height: 1.7; color: #334155;">Hi ${escapeHtml(name)},</p>
            <p style="margin: 0 0 14px; font-size: 16px; line-height: 1.7; color: #334155;">Thank you for reaching out to Ziffera.</p>
            <p style="margin: 0 0 14px; font-size: 16px; line-height: 1.7; color: #334155;">We&apos;ve received your message and will get back to you shortly.<br />We typically respond within 24 hours.</p>
            <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.7; color: #334155;">If your request is urgent, feel free to reply directly to this email.</p>
            <p style="margin: 0; font-size: 16px; line-height: 1.7; color: #334155;">&mdash; Ziffera Team</p>
          </div>
        </div>

        <div style="padding: 18px 8px 0; text-align: center; color: #94a3b8; font-size: 13px; line-height: 1.6;">
          <div style="margin-bottom: 4px;">Premium websites &amp; software built for growth</div>
          <div>hello@ziffera.ie</div>
        </div>
      </div>
    </div>
  `;
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

    const subject = "New contact form submission - Ziffera";
    const adminResult = await resend.emails.send({
      from: fromEmail,
      to: "hello@ziffera.ie",
      replyTo: email,
      subject,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: buildAdminEmailHtml(name, email, message),
    });

    console.log("Admin notification sent", adminResult);

    try {
      const autoReplyResult = await resend.emails.send({
        from: fromEmail,
        to: email,
        replyTo: "hello@ziffera.ie",
        subject: "We received your message - Ziffera",
        text:
          `Hi ${name},\n\n` +
          "Thank you for reaching out to Ziffera.\n\n" +
          "We've received your message and will get back to you shortly.\n" +
          "We typically respond within 24 hours.\n\n" +
          "If your request is urgent, feel free to reply directly to this email.\n\n" +
          "- Ziffera Team\n\n" +
          "Premium websites & software built for growth\n" +
          "hello@ziffera.ie",
        html: buildAutoReplyHtml(name),
      });

      console.log("Auto-reply sent", autoReplyResult);
    } catch (autoReplyError) {
      console.error("Auto-reply failed", autoReplyError);
    }

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
