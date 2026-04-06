"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/core/auth";
import { setEntitlement } from "@/lib/core/admin-data";
import { z } from "zod";

const entitlementSchema = z.object({
  clientId: z.string().uuid(),
  productId: z.string().uuid(),
  entitlementStatus: z.enum(["active", "trial", "paused", "suspended", "revoked"]),
  accessSource: z.enum(["manual", "subscription", "payment", "seed"]).optional(),
  notes: z.string().optional(),
  subscriptionId: z.string().uuid().optional().or(z.literal("")),
});

function cleanOptional(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

export async function setEntitlementAction(formData: FormData) {
  "use server";
  const session = await requireAdminSession();
  const parsed = entitlementSchema.safeParse({
    clientId: formData.get("clientId"),
    productId: formData.get("productId"),
    entitlementStatus: formData.get("entitlementStatus"),
    accessSource: formData.get("accessSource") || undefined,
    notes: cleanOptional(formData.get("notes")),
    subscriptionId: cleanOptional(formData.get("subscriptionId")),
  });

  if (!parsed.success) {
    throw new Error("Please choose a valid entitlement state.");
  }

  await setEntitlement({
    clientId: parsed.data.clientId,
    productId: parsed.data.productId,
    entitlementStatus: parsed.data.entitlementStatus,
    accessSource: parsed.data.accessSource,
    notes: parsed.data.notes,
    subscriptionId: parsed.data.subscriptionId || null,
    actorAdminId: session.admin.id,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/entitlements");
  revalidatePath(`/admin/clients/${parsed.data.clientId}`);
  revalidatePath(`/admin/products/${parsed.data.productId}`);
}
