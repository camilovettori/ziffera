"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/core/auth";
import { createPaymentRecord, getClientById, updateClient } from "@/lib/core/admin-data";
import { z } from "zod";

const paymentSchema = z.object({
  clientId: z.string().uuid(),
  productId: z.string().uuid().optional().or(z.literal("")),
  subscriptionId: z.string().uuid().optional().or(z.literal("")),
  paymentStatus: z.enum(["pending", "paid", "failed", "refunded", "manual", "void"]),
  paymentKind: z.enum(["subscription", "one_off", "manual", "invoice"]),
  amountCents: z.coerce.number().int().nonnegative(),
  currency: z.string().min(3).max(3),
  description: z.string().optional(),
  paidAt: z.string().optional(),
  dueAt: z.string().optional(),
  markPaidInFull: z.string().optional(),
});

function cleanOptional(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

export async function createPaymentAction(formData: FormData) {
  "use server";
  const session = await requireAdminSession();
  const parsed = paymentSchema.safeParse({
    clientId: formData.get("clientId"),
    productId: cleanOptional(formData.get("productId")),
    subscriptionId: cleanOptional(formData.get("subscriptionId")),
    paymentStatus: formData.get("paymentStatus"),
    paymentKind: formData.get("paymentKind"),
    amountCents: formData.get("amountCents"),
    currency: String(formData.get("currency") ?? "EUR"),
    description: cleanOptional(formData.get("description")),
    paidAt: cleanOptional(formData.get("paidAt")),
    dueAt: cleanOptional(formData.get("dueAt")),
    markPaidInFull: cleanOptional(formData.get("markPaidInFull")),
  });

  if (!parsed.success) {
    throw new Error("Please complete the payment fields.");
  }

  await createPaymentRecord({
    clientId: parsed.data.clientId,
    productId: parsed.data.productId || null,
    subscriptionId: parsed.data.subscriptionId || null,
    paymentStatus: parsed.data.paymentStatus,
    paymentKind: parsed.data.paymentKind,
    amountCents: parsed.data.amountCents,
    currency: parsed.data.currency,
    description: parsed.data.description,
    paidAt: parsed.data.paidAt,
    dueAt: parsed.data.dueAt,
    actorAdminId: session.admin.id,
  });

  if (parsed.data.markPaidInFull === "on") {
    const client = await getClientById(parsed.data.clientId);
    if (client) {
      await updateClient(parsed.data.clientId, {
        name: client.name,
        legalName: client.legal_name ?? undefined,
        companyName: client.company_name ?? undefined,
        clientType: client.client_type,
        billingEmail: client.billing_email ?? undefined,
        websiteUrl: client.website_url ?? undefined,
        supportEmail: client.support_email ?? undefined,
        internalNotes: client.internal_notes ?? undefined,
        billingStatus: "paid_in_full",
        serviceStatus: "paid_in_full",
        serviceStatusReason: client.service_status_reason ?? undefined,
        actorAdminId: session.admin.id,
      });
    }
  }

  revalidatePath("/admin");
  revalidatePath("/admin/payments");
  revalidatePath(`/admin/clients/${parsed.data.clientId}`);
}
