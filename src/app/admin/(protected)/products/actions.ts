"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/core/auth";
import {
  createProduct,
  setProductActive,
  updateProduct,
} from "@/lib/core/admin-data";
import { z } from "zod";

const productStatusSchema = z.object({
  productId: z.string().uuid(),
  isActive: z.enum(["true", "false"]),
});

const productFormSchema = z.object({
  productId: z.string().uuid().optional(),
  name: z.string().min(2),
  publicName: z.string().min(2).optional(),
  productKind: z.enum(["saas", "service", "project", "integration"]),
  billingType: z.enum(["recurring", "one_off"]),
  billingInterval: z.enum(["month", "year"]).optional().or(z.literal("")),
  amountCents: z.coerce.number().int().min(0).optional(),
  currency: z.string().min(3).max(3).optional(),
  description: z.string().optional(),
  publicUrl: z.string().url().optional().or(z.literal("")),
  stripeProductId: z.string().optional(),
  stripePriceId: z.string().optional(),
  stripePaymentLinkUrl: z.string().url().optional().or(z.literal("")),
  sortOrder: z.coerce.number().int().optional(),
  isActive: z.enum(["true", "false"]).optional(),
});

export async function setProductActiveAction(formData: FormData) {
  "use server";
  const session = await requireAdminSession();
  const parsed = productStatusSchema.safeParse({
    productId: formData.get("productId"),
    isActive: formData.get("isActive"),
  });

  if (!parsed.success) {
    throw new Error("Please choose a valid product state.");
  }

  await setProductActive({
    productId: parsed.data.productId,
    isActive: parsed.data.isActive === "true",
    actorAdminId: session.admin.id,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/products");
  revalidatePath("/admin/infrastructure");
  revalidatePath("/admin/clients");
  revalidatePath("/admin/subscriptions");
}

export async function createProductAction(formData: FormData) {
  "use server";
  const session = await requireAdminSession();

  const parsed = productFormSchema.safeParse({
    name: formData.get("name"),
    publicName: cleanOptional(formData.get("publicName")),
    productKind: formData.get("productKind"),
    billingType: formData.get("billingType"),
    billingInterval: cleanOptional(formData.get("billingInterval")),
    amountCents: formData.get("amountCents") || undefined,
    currency: cleanOptional(formData.get("currency")),
    description: cleanOptional(formData.get("description")),
    publicUrl: cleanOptional(formData.get("publicUrl")),
    stripeProductId: cleanOptional(formData.get("stripeProductId")),
    stripePriceId: cleanOptional(formData.get("stripePriceId")),
    stripePaymentLinkUrl: cleanOptional(formData.get("stripePaymentLinkUrl")),
    sortOrder: formData.get("sortOrder") || undefined,
    isActive: formData.get("isActive")?.toString() ?? undefined,
  });

  if (!parsed.success) {
    throw new Error("Please complete the product fields.");
  }

  await createProduct({
    name: parsed.data.name,
    publicName: parsed.data.publicName,
    productKind: parsed.data.productKind,
    billingType: parsed.data.billingType,
    billingInterval: parsed.data.billingInterval || null,
    amountCents: parsed.data.amountCents,
    currency: parsed.data.currency || "EUR",
    description: parsed.data.description,
    publicUrl: parsed.data.publicUrl || undefined,
    stripeProductId: parsed.data.stripeProductId,
    stripePriceId: parsed.data.stripePriceId,
    stripePaymentLinkUrl: parsed.data.stripePaymentLinkUrl || undefined,
    sortOrder: parsed.data.sortOrder,
    isActive: parsed.data.isActive !== "false",
    actorAdminId: session.admin.id,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/products");
  revalidatePath("/admin/infrastructure");
  revalidatePath("/admin/clients");
  revalidatePath("/admin/subscriptions");
}

export async function updateProductAction(formData: FormData) {
  "use server";
  const session = await requireAdminSession();

  const parsed = productFormSchema.safeParse({
    productId: formData.get("productId"),
    name: formData.get("name"),
    publicName: cleanOptional(formData.get("publicName")),
    productKind: formData.get("productKind"),
    billingType: formData.get("billingType"),
    billingInterval: cleanOptional(formData.get("billingInterval")),
    amountCents: formData.get("amountCents") || undefined,
    currency: cleanOptional(formData.get("currency")),
    description: cleanOptional(formData.get("description")),
    publicUrl: cleanOptional(formData.get("publicUrl")),
    stripeProductId: cleanOptional(formData.get("stripeProductId")),
    stripePriceId: cleanOptional(formData.get("stripePriceId")),
    stripePaymentLinkUrl: cleanOptional(formData.get("stripePaymentLinkUrl")),
    sortOrder: formData.get("sortOrder") || undefined,
    isActive: formData.get("isActive")?.toString() ?? undefined,
  });

  if (!parsed.success || !parsed.data.productId) {
    throw new Error("Please complete the product fields.");
  }

  await updateProduct(parsed.data.productId, {
    name: parsed.data.name,
    publicName: parsed.data.publicName,
    productKind: parsed.data.productKind,
    billingType: parsed.data.billingType,
    billingInterval: parsed.data.billingInterval || null,
    amountCents: parsed.data.amountCents,
    currency: parsed.data.currency || "EUR",
    description: parsed.data.description,
    publicUrl: parsed.data.publicUrl || undefined,
    stripeProductId: parsed.data.stripeProductId,
    stripePriceId: parsed.data.stripePriceId,
    stripePaymentLinkUrl: parsed.data.stripePaymentLinkUrl || undefined,
    sortOrder: parsed.data.sortOrder,
    isActive: parsed.data.isActive !== "false",
    actorAdminId: session.admin.id,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/products");
  revalidatePath("/admin/infrastructure");
  revalidatePath("/admin/clients");
  revalidatePath("/admin/subscriptions");
}

function cleanOptional(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}
