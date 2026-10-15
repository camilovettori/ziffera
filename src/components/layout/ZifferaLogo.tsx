import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The Z mark from the brand file plus a typeset wordmark.
 * The original PNG wordmark is white-outlined and disappears on light
 * backgrounds, so the name is set in the site typeface instead.
 */
export default function ZifferaLogo({
  className,
  markClassName,
  tone = "ink",
}: {
  className?: string;
  markClassName?: string;
  tone?: "ink" | "white";
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/brand/ziffera-mark.png"
        alt=""
        width={360}
        height={308}
        priority
        className={cn("h-8 w-auto rounded-none", markClassName)}
      />
      <span
        className={cn(
          "text-[1.35rem] font-extrabold tracking-[-0.045em]",
          tone === "ink" ? "text-ink" : "text-white"
        )}
      >
        Ziffera
      </span>
    </span>
  );
}
