"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/core/auth";
import { setProductActive } from "@/lib/core/admin-data";
import { z } from "zod";

const productStatusSchema = z.object({
  productId: z.string().uuid(),
  isActive: z.enum(["true", "false"]),
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
}
