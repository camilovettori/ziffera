import { NextResponse } from "next/server";
import { prepareMarginFlowSubscription } from "@/lib/core/marginflow-subscribe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type SubscribeBody = Partial<{
  name: string;
  email: string;
  company: string;
}>;

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SubscribeBody;
    const name = cleanText(body.name);
    const email = cleanText(body.email);
    const companyName = cleanText(body.company);

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

    const result = await prepareMarginFlowSubscription({
      name,
      email,
      companyName: companyName || null,
    });

    if (result.alreadySubscribed) {
      return NextResponse.json({
        success: true,
        alreadySubscribed: true,
        successUrl: "/marginflow/subscribe/success?status=existing",
      });
    }

    return NextResponse.json({
      success: true,
      checkoutSessionId: result.checkoutSessionId,
      clientSecret: result.clientSecret,
      successUrl: "/marginflow/subscribe/success",
    });
  } catch (error) {
    console.error("MarginFlow subscribe route failed", error);

    return NextResponse.json(
      {
        error:
          "We could not start the trial right now. Please try again in a moment.",
      },
      { status: 500 }
    );
  }
}
