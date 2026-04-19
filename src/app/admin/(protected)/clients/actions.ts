"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdminSession } from "@/lib/core/auth";
import {
  createClient,
  setClientStatus,
  updateClientProfile,
  upsertClientContact,
} from "@/lib/core/admin-data";
import { refreshClientBillingSnapshotForClientId } from "@/lib/core/billing-snapshots";

const clientProfileSchema = z.object({
  name: z.string().min(2),
  legalName: z.string().optional(),
  companyName: z.string().optional(),
  clientType: z.enum(["saas", "project", "mixed"]),
  assignedProductId: z.string().uuid().optional().or(z.literal("")),
  billingEmail: z.string().email().optional().or(z.literal("")),
  websiteUrl: z.string().url().optional().or(z.literal("")),
  supportEmail: z.string().email().optional().or(z.literal("")),
  internalNotes: z.string().optional(),
  billingStatus: z
    .enum(["none", "trial", "current", "overdue", "paid_in_full"])
    .optional(),
});

const clientCreateSchema = clientProfileSchema.extend({
  serviceStatus: z
    .enum(["active", "trial", "overdue", "suspended", "inactive", "paid_in_full"])
    .optional(),
  serviceStatusReason: z.string().optional(),
});

const clientUpdateSchema = clientProfileSchema.extend({
  clientId: z.string().uuid(),
});

function normalizeWebsiteUrl(value: string | null) {
  const trimmed = cleanOptional(value);
  if (!trimmed) {
    return undefined;
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

function validationErrorMessage(
  scope: string,
  error: z.ZodError
) {
  const fieldErrorsMap = error.flatten().fieldErrors as Record<string, string[] | undefined>;
  const fieldErrors = Object.entries(fieldErrorsMap)
    .filter(([, messages]) => Boolean(messages && messages.length))
    .map(([field, messages]) => `${field}: ${messages?.join(", ")}`)
    .join("; ");
  const formErrors = error.flatten().formErrors.join("; ");

  const details = [fieldErrors, formErrors].filter(Boolean).join(" | ");
  return details ? `${scope} validation failed: ${details}` : `${scope} validation failed.`;
}

const contactFormSchema = z.object({
  clientId: z.string().uuid(),
  contactId: z.string().uuid().optional().or(z.literal("")),
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  role: z.string().optional(),
  isPrimary: z.string().optional(),
  notes: z.string().optional(),
});

const statusFormSchema = z.object({
  clientId: z.string().uuid(),
  serviceStatus: z.enum(["active", "trial", "overdue", "suspended", "inactive", "paid_in_full"]),
  reason: z.string().optional(),
  effectiveAt: z.string().optional(),
  gracePeriodEndsAt: z.string().optional(),
});

function cleanOptional(value: string | null) {
  if (value == null) {
    return undefined;
  }
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export async function createClientAction(formData: FormData) {
  "use server";
  const session = await requireAdminSession();

  const parsed = clientCreateSchema.safeParse({
    name: formData.get("name"),
    legalName: formData.get("legalName"),
    companyName: formData.get("companyName"),
    clientType: formData.get("clientType"),
    assignedProductId: cleanOptional(formData.get("assignedProductId")?.toString() ?? null),
    billingEmail: cleanOptional(formData.get("billingEmail")?.toString() ?? null),
    websiteUrl: normalizeWebsiteUrl(formData.get("websiteUrl")?.toString() ?? null),
    supportEmail: cleanOptional(formData.get("supportEmail")?.toString() ?? null),
    internalNotes: cleanOptional(formData.get("internalNotes")?.toString() ?? null),
    billingStatus: formData.get("billingStatus") || undefined,
    serviceStatus: formData.get("serviceStatus") || undefined,
    serviceStatusReason: cleanOptional(
      formData.get("serviceStatusReason")?.toString() ?? null
    ),
  });

  if (!parsed.success) {
    throw new Error(validationErrorMessage("Client creation", parsed.error));
  }

  const client = await createClient({
    ...parsed.data,
    actorAdminId: session.admin.id,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/clients");
  redirect(`/admin/clients/${client.id}`);
}

export async function updateClientProfileAction(formData: FormData) {
  "use server";
  const session = await requireAdminSession();
  const parsed = clientUpdateSchema.safeParse({
    clientId: formData.get("clientId"),
    name: formData.get("name"),
    legalName: formData.get("legalName"),
    companyName: formData.get("companyName"),
    clientType: formData.get("clientType"),
    assignedProductId: cleanOptional(formData.get("assignedProductId")?.toString() ?? null),
    billingEmail: cleanOptional(formData.get("billingEmail")?.toString() ?? null),
    websiteUrl: normalizeWebsiteUrl(formData.get("websiteUrl")?.toString() ?? null),
    supportEmail: cleanOptional(formData.get("supportEmail")?.toString() ?? null),
    internalNotes: cleanOptional(formData.get("internalNotes")?.toString() ?? null),
    billingStatus: formData.get("billingStatus") || undefined,
  });

  if (!parsed.success) {
    throw new Error(validationErrorMessage("Client profile update", parsed.error));
  }

  await updateClientProfile(parsed.data.clientId, {
    ...parsed.data,
    actorAdminId: session.admin.id,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/clients");
  revalidatePath(`/admin/clients/${parsed.data.clientId}`);
}

export async function refreshClientBillingAction(formData: FormData) {
  "use server";
  await requireAdminSession();

  const parsed = z
    .object({
      clientId: z.string().uuid(),
    })
    .safeParse({
      clientId: formData.get("clientId"),
    });

  if (!parsed.success) {
    throw new Error(validationErrorMessage("Billing refresh", parsed.error));
  }

  await refreshClientBillingSnapshotForClientId(parsed.data.clientId);

  revalidatePath("/admin");
  revalidatePath("/admin/clients");
  revalidatePath(`/admin/clients/${parsed.data.clientId}`);
  revalidatePath("/admin/payments");
  revalidatePath("/admin/subscriptions");
}

export async function updateClientAction(formData: FormData) {
  "use server";
  return updateClientProfileAction(formData);
}

export async function upsertClientContactAction(formData: FormData) {
  "use server";
  await requireAdminSession();

  const parsed = contactFormSchema.safeParse({
    clientId: formData.get("clientId"),
    contactId: cleanOptional(formData.get("contactId")?.toString() ?? null),
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: cleanOptional(formData.get("phone")?.toString() ?? null),
    role: cleanOptional(formData.get("role")?.toString() ?? null),
    isPrimary: formData.get("isPrimary")?.toString(),
    notes: cleanOptional(formData.get("notes")?.toString() ?? null),
  });

  if (!parsed.success) {
    throw new Error("Please complete the contact fields.");
  }

  await upsertClientContact({
    clientId: parsed.data.clientId,
    contactId: parsed.data.contactId || undefined,
    fullName: parsed.data.fullName,
    email: parsed.data.email,
    phone: parsed.data.phone,
    role: parsed.data.role,
    isPrimary: parsed.data.isPrimary === "on",
    notes: parsed.data.notes,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/clients");
  revalidatePath(`/admin/clients/${parsed.data.clientId}`);
}

export async function changeClientServiceStatusAction(formData: FormData) {
  "use server";
  const session = await requireAdminSession();
  const parsed = statusFormSchema.safeParse({
    clientId: formData.get("clientId"),
    serviceStatus: formData.get("serviceStatus"),
    reason: cleanOptional(formData.get("reason")?.toString() ?? null),
    effectiveAt: cleanOptional(formData.get("effectiveAt")?.toString() ?? null),
    gracePeriodEndsAt: cleanOptional(
      formData.get("gracePeriodEndsAt")?.toString() ?? null
    ),
  });

  if (!parsed.success) {
    throw new Error("Please choose a valid service status.");
  }

  await setClientStatus({
    clientId: parsed.data.clientId,
    serviceStatus: parsed.data.serviceStatus,
    reason: parsed.data.reason,
    effectiveAt: parsed.data.effectiveAt,
    gracePeriodEndsAt: parsed.data.gracePeriodEndsAt,
    actorAdminId: session.admin.id,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/clients");
  revalidatePath(`/admin/clients/${parsed.data.clientId}`);
  revalidatePath("/admin/service-controls");
}
