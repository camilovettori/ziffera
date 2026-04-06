"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdminSession } from "@/lib/core/auth";
import { upsertProductConnection } from "@/lib/core/admin-data";

const productConnectionSchema = z.object({
  productId: z.string().uuid(),
  appUrl: z.string().url().optional().or(z.literal("")),
  apiUrl: z.string().url().optional().or(z.literal("")),
  serviceStatus: z.enum(["active", "suspended", "trial", "maintenance", "inactive"]),
  environmentLabel: z.string().min(1).optional(),
  managedExternally: z.enum(["true", "false"]),
  internalNotes: z.string().optional(),
  internalLinks: z.string().optional(),
});

function cleanOptional(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

export async function upsertProductConnectionAction(formData: FormData) {
  "use server";
  await requireAdminSession();

  const parsed = productConnectionSchema.safeParse({
    productId: formData.get("productId"),
    appUrl: cleanOptional(formData.get("appUrl")),
    apiUrl: cleanOptional(formData.get("apiUrl")),
    serviceStatus: formData.get("serviceStatus"),
    environmentLabel: cleanOptional(formData.get("environmentLabel")),
    managedExternally: formData.get("managedExternally"),
    internalNotes: cleanOptional(formData.get("internalNotes")),
    internalLinks: cleanOptional(formData.get("internalLinks")),
  });

  if (!parsed.success) {
    throw new Error("Please complete the product connection fields.");
  }

  await upsertProductConnection({
    productId: parsed.data.productId,
    appUrl: parsed.data.appUrl || null,
    apiUrl: parsed.data.apiUrl || null,
    serviceStatus: parsed.data.serviceStatus,
    environmentLabel: parsed.data.environmentLabel || "production",
    managedExternally: parsed.data.managedExternally === "true",
    internalNotes: parsed.data.internalNotes || null,
    internalLinks: parsed.data.internalLinks || null,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/products");
  revalidatePath("/admin/infrastructure");
}
