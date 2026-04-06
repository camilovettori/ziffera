"use server";

import { signOutAdmin } from "@/lib/core/auth";

export async function logoutAdminAction() {
  await signOutAdmin();
}
