import Image from "next/image";
import { cn } from "@/lib/utils";

type Media =
  | { kind: "video"; src: string; poster: string }
  | { kind: "image"; src: string; width: number; height: number; alt: string };

export default function BrowserFrame({
  url,
  media,
  className,
  aspect = "aspect-[16/11]",
}: {
  url: string;
  media: Media;
  className?: string;
  aspect?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-[0_30px_60px_-30px_rgba(13,21,48,0.35)]",
        className
      )}
    >
      <div className="flex items-center gap-3 border-b border-line bg-paper px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        </span>
        <span className="flex-1 truncate rounded-md border border-line bg-surface px-3 py-1 text-center font-mono text-[11px] text-ink-3">
          {url}
        </span>
      </div>
      <div className={cn("relative bg-paper", aspect)}>
        {media.kind === "video" ? (
          <video
            src={media.src}
            poster={media.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        ) : (
          <Image
            src={media.src}
            alt={media.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 640px"
            className="rounded-none object-cover object-top"
          />
        )}
      </div>
    </div>
  );
}
