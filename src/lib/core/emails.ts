import "server-only";

import { Resend } from "resend";
import { query } from "@/lib/core/db";
import { env } from "@/lib/core/env";
import type { EmailEventRecord, EmailStatus } from "@/lib/core/models";

const supportFromEmail = "Ziffera <support@ziffera.ie>";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildMarginFlowConfirmationHtml(input: {
  name: string;
  productName: string;
  priceLabel: string;
  trialDays: number;
}) {
  return `
    <div style="margin:0;padding:0;background:#f8fbff;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
      <div style="max-width:620px;margin:0 auto;padding:28px 20px;">
        <div style="overflow:hidden;border:1px solid #e2e8f0;border-radius:22px;background:#ffffff;box-shadow:0 18px 44px rgba(15,23,42,0.08);">
          <div style="padding:28px 28px 18px;text-align:center;border-bottom:1px solid #e2e8f0;">
            <div style="display:inline-flex;align-items:center;justify-content:center;height:48px;padding:0 18px;border-radius:999px;background:linear-gradient(135deg,#eff6ff 0%,#ffffff 100%);border:1px solid #dbeafe;color:#1d4ed8;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;font-size:12px;">
              Ziffera
            </div>
          </div>

          <div style="padding:0 28px 28px;">
            <div style="margin-top:28px;display:inline-flex;border:1px solid #bfdbfe;border-radius:999px;background:#eff6ff;color:#1d4ed8;font-size:11px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;padding:8px 14px;">
              Trial started
            </div>

            <h1 style="margin:18px 0 14px;font-size:30px;line-height:1.08;letter-spacing:-0.05em;color:#0f172a;">Your MarginFlow trial is ready</h1>
            <p style="margin:0 0 14px;font-size:16px;line-height:1.75;color:#334155;">Hi ${escapeHtml(input.name)},</p>
            <p style="margin:0 0 14px;font-size:16px;line-height:1.75;color:#334155;">Thanks for starting with ${escapeHtml(input.productName)}. Your 14-day free trial has started and your checkout details are being handled securely by Stripe.</p>
            <div style="margin:20px 0;border:1px solid #e2e8f0;border-radius:18px;background:#f8fafc;padding:18px 20px;">
              <p style="margin:0 0 8px;font-size:15px;line-height:1.7;color:#0f172a;"><strong>Plan:</strong> ${escapeHtml(input.priceLabel)}</p>
              <p style="margin:0;font-size:15px;line-height:1.7;color:#0f172a;"><strong>Trial:</strong> ${input.trialDays} days free</p>
            </div>
            <p style="margin:0 0 14px;font-size:16px;line-height:1.75;color:#334155;">If you need anything, reply to this email or reach us at <a href="mailto:support@ziffera.ie" style="color:#1d4ed8;text-decoration:none;font-weight:600;">support@ziffera.ie</a>.</p>
            <p style="margin:0;font-size:16px;line-height:1.75;color:#334155;">&mdash; Ziffera Team</p>
          </div>
        </div>

        <div style="padding:18px 8px 0;text-align:center;color:#94a3b8;font-size:13px;line-height:1.6;">
          <div style="margin-bottom:4px;">Premium websites &amp; software built for growth</div>
          <div>support@ziffera.ie</div>
        </div>
      </div>
    </div>
  `;
}

export async function createEmailEvent(input: {
  clientId?: string | null;
  adminId?: string | null;
  toEmail: string;
  templateKey: string;
  subject?: string | null;
  metadata?: Record<string, unknown>;
  emailStatus?: EmailStatus;
  failureReason?: string | null;
  providerMessageId?: string | null;
}) {
  const result = await query<EmailEventRecord>(
    `INSERT INTO email_events (
      client_id,
      admin_id,
      to_email,
      template_key,
      email_status,
      subject,
      provider_message_id,
      metadata,
      failure_reason,
      sent_at,
      failed_at
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
    RETURNING *`,
    [
      input.clientId ?? null,
      input.adminId ?? null,
      input.toEmail,
      input.templateKey,
      input.emailStatus ?? "queued",
      input.subject ?? null,
      input.providerMessageId ?? null,
      input.metadata ?? {},
      input.failureReason ?? null,
      input.emailStatus === "sent" ? new Date().toISOString() : null,
      input.emailStatus === "failed" ? new Date().toISOString() : null,
    ]
  );

  return result.rows[0] ?? null;
}

export async function sendMarginFlowConfirmationEmail(input: {
  clientId?: string | null;
  toEmail: string;
  name: string;
  companyName?: string | null;
  priceLabel: string;
  trialDays: number;
  productName: string;
  checkoutSessionId?: string | null;
}) {
  const emailEvent = await createEmailEvent({
    clientId: input.clientId ?? null,
    toEmail: input.toEmail,
    templateKey: "subscription_started",
    subject: "Your MarginFlow trial is ready",
    metadata: {
      productName: input.productName,
      companyName: input.companyName ?? null,
      checkoutSessionId: input.checkoutSessionId ?? null,
      supportEmail: env.supportEmail,
      trialDays: input.trialDays,
      priceLabel: input.priceLabel,
    },
  });

  if (!env.resendApiKey) {
    await query(
      `UPDATE email_events
       SET email_status = 'failed',
           failure_reason = $1,
           failed_at = NOW(),
           updated_at = NOW()
       WHERE id = $2`,
      ["RESEND_API_KEY is not configured.", emailEvent?.id ?? ""]
    );

    return {
      sent: false,
      emailEventId: emailEvent?.id ?? null,
    };
  }

  const resend = new Resend(env.resendApiKey);

  try {
    const result = await resend.emails.send({
      from: supportFromEmail,
      to: input.toEmail,
      replyTo: "support@ziffera.ie",
      subject: "Your MarginFlow trial is ready",
      text:
        `Hi ${input.name},\n\n` +
        `Thanks for starting with ${input.productName}. Your ${input.trialDays}-day free trial has started and your checkout details are being handled securely by Stripe.\n\n` +
        `Plan: ${input.priceLabel}\n` +
        `Trial: ${input.trialDays} days free\n\n` +
        `If you need anything, reply to this email or reach us at support@ziffera.ie.\n\n` +
        `- Ziffera Team\n\n` +
        `Premium websites & software built for growth\n` +
        `support@ziffera.ie`,
      html: buildMarginFlowConfirmationHtml({
        name: input.name,
        productName: input.productName,
        priceLabel: input.priceLabel,
        trialDays: input.trialDays,
      }),
    });

    await query(
      `UPDATE email_events
       SET email_status = 'sent',
           provider_message_id = $1,
           sent_at = NOW(),
           updated_at = NOW()
       WHERE id = $2`,
      [
        typeof result.data?.id === "string" ? result.data.id : null,
        emailEvent?.id ?? "",
      ]
    );

    return {
      sent: true,
      emailEventId: emailEvent?.id ?? null,
      providerMessageId:
        typeof result.data?.id === "string" ? result.data.id : null,
    };
  } catch (error) {
    const reason = error instanceof Error ? error.message : "Unable to send confirmation email.";

    await query(
      `UPDATE email_events
       SET email_status = 'failed',
           failure_reason = $1,
           failed_at = NOW(),
           updated_at = NOW()
       WHERE id = $2`,
      [reason, emailEvent?.id ?? ""]
    );

    return {
      sent: false,
      emailEventId: emailEvent?.id ?? null,
      failureReason: reason,
    };
  }
}
