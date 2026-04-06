import { NextResponse } from "next/server";
import {
  createSiteCheckoutSession,
  type SiteCheckoutFlowSlug,
} from "@/lib/site-checkout";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type CheckoutBody = Partial<{
  name: string;
  email: string;
  company: string;
}>;

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isCheckoutFlowSlug(value: string): value is SiteCheckoutFlowSlug {
  return value === "monthly" || value === "setup-deposit" || value === "setup-final";
}

export async function POST(
  request: Request,
  context: RouteContext<"/api/checkout/[flow]">
) {
  try {
    const { flow } = await context.params;
    if (!isCheckoutFlowSlug(flow)) {
      return NextResponse.json(
        { error: "Unknown checkout flow." },
        { status: 404 }
      );
    }

    const body = (await request.json()) as CheckoutBody;
    const name = cleanText(body.name);
    const email = cleanText(body.email);
    const company = cleanText(body.company);

    if (!name || !email) {
      return NextResponse.json(
        { error: "Please provide your name and email address." },
        { status: 400 }
      );
    }

    const emailPattern = /^\S+@\S+\.\S+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const checkout = await createSiteCheckoutSession({
      slug: flow,
      name,
      email,
      company: company || null,
    });

    return NextResponse.json({
      clientSecret: checkout.clientSecret,
    });
  } catch (error) {
    console.error("Checkout flow route failed", error);

    return NextResponse.json(
      {
        error:
          "We could not start checkout right now. Please try again in a moment.",
      },
      { status: 500 }
    );
  }
}
