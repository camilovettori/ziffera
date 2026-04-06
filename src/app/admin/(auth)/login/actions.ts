"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { adminLoginSchema, authenticateAdmin } from "@/lib/core/auth";
import { writeAuditLog } from "@/lib/core/admin-data";

export type AdminLoginFormState = {
  error: string;
};

const emptyState: AdminLoginFormState = {
  error: "",
};

export async function loginAdminAction(
  _previousState: AdminLoginFormState,
  formData: FormData
): Promise<AdminLoginFormState> {
  const parsed = adminLoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      error: "Enter a valid email and password.",
    };
  }

  const result = await authenticateAdmin({
    email: parsed.data.email,
    password: parsed.data.password,
    userAgent: (await headers()).get("user-agent"),
  });

  if (!result.ok) {
    return {
      error: result.error,
    };
  }

  await writeAuditLog({
    actorAdminId: result.admin.id,
    action: "admin.login",
    entityType: "admin",
    entityId: result.admin.id,
    metadata: {
      userAgent: (await headers()).get("user-agent"),
    },
  });

  redirect("/admin");
  return emptyState;
}
