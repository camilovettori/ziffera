import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = "Ziffera <hello@ziffera.ie>";
const logoUrl = "https://ziffera.ie/logos/ziffera-logo.png";

type ContactBody = Partial<{
  name: string;
  email: string;
  businessName: string;
  need: string;
  budget: string;
  timeline: string;
  message: string;
}>;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildAdminEmailHtml(data: Required<Pick<ContactBody, "name" | "email" | "message">> & ContactBody, submittedAt: string) {
  const rows = [
    ["Name", data.name],
    ["Email", data.email],
    ["Business / Brand", data.businessName],
    ["Need", data.need],
    ["Budget", data.budget],
    ["Timeline", data.timeline],
    ["Submitted", submittedAt],
  ].filter(([, value]) => Boolean(value)) as Array<[string, string]>;

  return `
    <div style="margin:0;padding:0;background:#f8fbff;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
      <div style="max-width:600px;margin:0 auto;padding:28px 20px;">
        <div style="overflow:hidden;border:1px solid #e2e8f0;border-radius:20px;background:#ffffff;box-shadow:0 18px 40px rgba(15,23,42,0.08);">
          <div style="padding:28px 28px 18px;text-align:center;">
            <img src="${logoUrl}" alt="Ziffera" width="168" style="display:block;margin:0 auto 14px;max-width:168px;height:auto;" />
            <div style="height:1px;background:#e2e8f0;"></div>
          </div>

          <div style="padding:0 28px 28px;">
            <h1 style="margin:0 0 16px;font-size:24px;line-height:1.2;letter-spacing:-0.03em;color:#0f172a;">New contact form submission</h1>

            <div style="border:1px solid #e2e8f0;border-radius:16px;background:#f8fafc;padding:16px 18px;">
              ${rows
                .map(
                  ([label, value]) => `
                    <p style="margin:0 0 10px;font-size:15px;line-height:1.6;color:#334155;">
                      <strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}
                    </p>
                  `
                )
                .join("")}
            </div>

            <div style="margin-top:18px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#64748b;">Message</div>
            <div style="margin-top:10px;white-space:pre-wrap;font-size:15px;line-height:1.7;color:#0f172a;border:1px solid #e2e8f0;border-radius:16px;background:#ffffff;padding:16px 18px;">${escapeHtml(data.message)}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function buildAutoReplyHtml(name: string) {
  return `
    <div style="margin:0;padding:0;background:#f8fbff;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
      <div style="max-width:600px;margin:0 auto;padding:28px 20px;">
        <div style="overflow:hidden;border:1px solid #e2e8f0;border-radius:20px;background:#ffffff;box-shadow:0 18px 40px rgba(15,23,42,0.08);">
          <div style="padding:28px 28px 18px;text-align:center;">
            <img src="${logoUrl}" alt="Ziffera" width="168" style="display:block;margin:0 auto 14px;max-width:168px;height:auto;" />
            <div style="height:1px;background:#e2e8f0;"></div>
          </div>

          <div style="padding:0 28px 28px;">
            <h1 style="margin:0 0 18px;font-size:28px;line-height:1.15;letter-spacing:-0.04em;color:#0f172a;">Your message has been received</h1>
            <p style="margin:0 0 14px;font-size:16px;line-height:1.7;color:#334155;">Hi ${escapeHtml(name)},</p>
            <p style="margin:0 0 14px;font-size:16px;line-height:1.7;color:#334155;">Thank you for reaching out to Ziffera.</p>
            <p style="margin:0 0 14px;font-size:16px;line-height:1.7;color:#334155;">We&apos;ve received your message and will get back to you shortly.<br />We typically respond within 24 hours.</p>
            <p style="margin:0 0 22px;font-size:16px;line-height:1.7;color:#334155;">If your request is urgent, feel free to reply directly to this email.</p>
            <p style="margin:0;font-size:16px;line-height:1.7;color:#334155;">&mdash; Ziffera Team</p>
          </div>
        </div>

        <div style="padding:18px 8px 0;text-align:center;color:#94a3b8;font-size:13px;line-height:1.6;">
          <div style="margin-bottom:4px;">Premium websites &amp; software built for growth</div>
          <div>hello@ziffera.ie</div>
        </div>
      </div>
    </div>
  `;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactBody;
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const businessName =
      typeof body.businessName === "string" ? body.businessName.trim() : "";
    const need = typeof body.need === "string" ? body.need.trim() : "";
    const budget = typeof body.budget === "string" ? body.budget.trim() : "";
    const timeline = typeof body.timeline === "string" ? body.timeline.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const submittedAt = new Date().toISOString();

    console.log("Contact form submission received", {
      name,
      email,
      businessName,
      need,
      budget,
      timeline,
      submittedAt,
      messageLength: message.length,
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

    const adminText = [
      `Name: ${name}`,
      `Email: ${email}`,
      businessName ? `Business / Brand: ${businessName}` : null,
      need ? `Need: ${need}` : null,
      budget ? `Budget: ${budget}` : null,
      timeline ? `Timeline: ${timeline}` : null,
      `Submitted: ${submittedAt}`,
      "",
      "Message:",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const adminResult = await resend.emails.send({
        from: fromEmail,
        to: "hello@ziffera.ie",
        replyTo: email,
        subject: "New contact form submission \u2014 Ziffera",
        text: adminText,
        html: buildAdminEmailHtml(
          {
            name,
            email,
            businessName,
            need,
            budget,
            timeline,
            message,
          },
          submittedAt
        ),
      });

      console.log("Admin notification sent", adminResult);
    } catch (adminError) {
      console.error("Admin notification failed", adminError);
      return NextResponse.json(
        { error: "Failed to send the admin notification." },
        { status: 500 }
      );
    }

    try {
      const autoReplyResult = await resend.emails.send({
        from: fromEmail,
        to: email,
        replyTo: "hello@ziffera.ie",
        subject: "We received your message \u2014 Ziffera",
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
      return NextResponse.json(
        { error: "Failed to send the auto-reply email." },
        { status: 500 }
      );
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
