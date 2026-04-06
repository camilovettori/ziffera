"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdminSession } from "@/lib/core/auth";
import {
  createStripeCustomerForSubscription,
  syncSubscriptionFromStripeIdentifier,
  updateSubscriptionRecord,
} from "@/lib/core/subscriptions";

const subscriptionFormSchema = z.object({
  subscriptionId: z.string().uuid(),
  subscriptionName: z.string().optional(),
  status: z.enum([
    "trialing",
    "active",
    "past_due",
    "paused",
    "canceled",
    "incomplete",
    "manual_override",
  ]),
  billingInterval: z.enum(["month", "year"]).optional(),
  amountCents: z.coerce.number().int().nonnegative().optional(),
  currency: z.string().min(3).max(3).optional(),
  trialStartAt: z.string().optional(),
  trialEndAt: z.string().optional(),
  currentPeriodStartAt: z.string().optional(),
  currentPeriodEndAt: z.string().optional(),
  cancelAtPeriodEnd: z.string().optional(),
  manualOverrideStatus: z.string().optional(),
  notes: z.string().optional(),
  stripeCustomerId: z.string().optional(),
  stripeSubscriptionId: z.string().optional(),
  stripePriceId: z.string().optional(),
  stripeProductId: z.string().optional(),
  stripeLatestInvoiceId: z.string().optional(),
  stripeLatestInvoiceStatus: z.string().optional(),
  stripeStatusRaw: z.string().optional(),
});

const subscriptionIdSchema = z.object({
  subscriptionId: z.string().uuid(),
});

function cleanOptional(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

export async function updateSubscriptionAction(formData: FormData) {
  "use server";
  const session = await requireAdminSession();
  const parsed = subscriptionFormSchema.safeParse({
    subscriptionId: formData.get("subscriptionId"),
    subscriptionName: cleanOptional(formData.get("subscriptionName")),
    status: formData.get("status"),
    billingInterval: formData.get("billingInterval") || undefined,
    amountCents: formData.get("amountCents") || undefined,
    currency: cleanOptional(formData.get("currency")),
    trialStartAt: cleanOptional(formData.get("trialStartAt")),
    trialEndAt: cleanOptional(formData.get("trialEndAt")),
    currentPeriodStartAt: cleanOptional(formData.get("currentPeriodStartAt")),
    currentPeriodEndAt: cleanOptional(formData.get("currentPeriodEndAt")),
    cancelAtPeriodEnd: formData.get("cancelAtPeriodEnd")?.toString(),
    manualOverrideStatus: cleanOptional(formData.get("manualOverrideStatus")),
    notes: cleanOptional(formData.get("notes")),
    stripeCustomerId: cleanOptional(formData.get("stripeCustomerId")),
    stripeSubscriptionId: cleanOptional(formData.get("stripeSubscriptionId")),
    stripePriceId: cleanOptional(formData.get("stripePriceId")),
    stripeProductId: cleanOptional(formData.get("stripeProductId")),
    stripeLatestInvoiceId: cleanOptional(formData.get("stripeLatestInvoiceId")),
    stripeLatestInvoiceStatus: cleanOptional(
      formData.get("stripeLatestInvoiceStatus")
    ),
    stripeStatusRaw: cleanOptional(formData.get("stripeStatusRaw")),
  });

  if (!parsed.success) {
    throw new Error("Please complete the subscription fields.");
  }

  const subscription = await updateSubscriptionRecord({
    subscriptionId: parsed.data.subscriptionId,
    subscriptionName: parsed.data.subscriptionName ?? null,
    status: parsed.data.status,
    billingInterval: parsed.data.billingInterval,
    amountCents: parsed.data.amountCents,
    currency: parsed.data.currency?.toUpperCase(),
    trialStartAt: parsed.data.trialStartAt ?? null,
    trialEndAt: parsed.data.trialEndAt ?? null,
    currentPeriodStartAt: parsed.data.currentPeriodStartAt ?? null,
    currentPeriodEndAt: parsed.data.currentPeriodEndAt ?? null,
    cancelAtPeriodEnd: parsed.data.cancelAtPeriodEnd === "on",
    manualOverrideStatus: parsed.data.manualOverrideStatus ?? null,
    notes: parsed.data.notes ?? null,
    stripeCustomerId: parsed.data.stripeCustomerId ?? null,
    stripeSubscriptionId: parsed.data.stripeSubscriptionId ?? null,
    stripePriceId: parsed.data.stripePriceId ?? null,
    stripeProductId: parsed.data.stripeProductId ?? null,
    stripeLatestInvoiceId: parsed.data.stripeLatestInvoiceId ?? null,
    stripeLatestInvoiceStatus: parsed.data.stripeLatestInvoiceStatus ?? null,
    stripeStatusRaw: parsed.data.stripeStatusRaw ?? null,
    actorAdminId: session.admin.id,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/subscriptions");
  revalidatePath(`/admin/subscriptions/${subscription.id}`);
}

export async function createStripeCustomerAction(formData: FormData) {
  "use server";
  const session = await requireAdminSession();
  const parsed = subscriptionIdSchema.safeParse({
    subscriptionId: formData.get("subscriptionId"),
  });

  if (!parsed.success) {
    throw new Error("Please choose a valid subscription.");
  }

  const customer = await createStripeCustomerForSubscription({
    subscriptionId: parsed.data.subscriptionId,
    actorAdminId: session.admin.id,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/subscriptions");
  revalidatePath(`/admin/subscriptions/${parsed.data.subscriptionId}`);

  if (!customer) {
    throw new Error("Failed to create or link the Stripe customer.");
  }
}

export async function syncSubscriptionFromStripeAction(formData: FormData) {
  "use server";
  const session = await requireAdminSession();
  const parsed = subscriptionIdSchema.safeParse({
    subscriptionId: formData.get("subscriptionId"),
  });

  if (!parsed.success) {
    throw new Error("Please choose a valid subscription.");
  }

  await syncSubscriptionFromStripeIdentifier({
    subscriptionId: parsed.data.subscriptionId,
    actorAdminId: session.admin.id,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/subscriptions");
  revalidatePath(`/admin/subscriptions/${parsed.data.subscriptionId}`);
}

