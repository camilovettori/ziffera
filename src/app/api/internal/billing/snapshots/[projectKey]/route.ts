import { NextResponse } from "next/server";
import { getBillingSnapshotByProjectKey } from "@/lib/core/billing-snapshots";
import {
  authenticateInternalBillingRequest,
  InternalBillingAuthError,
} from "@/lib/core/internal-billing-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  context: RouteContext<"/api/internal/billing/snapshots/[projectKey]">
) {
  const { projectKey } = await context.params;

  try {
    const access = await authenticateInternalBillingRequest(projectKey, request);
    const snapshot = await getBillingSnapshotByProjectKey(
      access.client.billing_project_key
    );

    if (!snapshot) {
      return NextResponse.json(
        { error: "Project key not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, snapshot }, { status: 200 });
  } catch (error) {
    if (error instanceof InternalBillingAuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    console.error("Internal billing snapshot request failed", error);
    return NextResponse.json(
      { error: "Failed to load billing snapshot." },
      { status: 500 }
    );
  }
}
