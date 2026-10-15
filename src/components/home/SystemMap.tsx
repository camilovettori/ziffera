import Image from "next/image";

type Node = {
  name: string;
  does: string;
  logo?: string;
  logoW?: number;
  logoH?: number;
  /** position of the node centre inside the map, in % */
  x: number;
  y: number;
};

const nodes: Node[] = [
  {
    name: "Rub & Scrub",
    does: "Bookings via WhatsApp",
    logo: "/systems/rubandscrub-logo.png",
    logoW: 360,
    logoH: 271,
    x: 22,
    y: 13,
  },
  {
    name: "Frequency Framed",
    does: "Shop + Stripe checkout",
    logo: "/systems/frequency-framed-logo.png",
    logoW: 520,
    logoH: 273,
    x: 78,
    y: 13,
  },
  {
    name: "Zconnect",
    does: "Orders → Zoho invoices",
    x: 82,
    y: 52,
  },
  {
    name: "ZRecipe",
    does: "Recipe costing",
    logo: "/systems/zrecipe-icon.png",
    logoW: 200,
    logoH: 242,
    x: 71,
    y: 88,
  },
  {
    name: "MarginFlow",
    does: "Café finance reports",
    logo: "/systems/marginflow-icon.png",
    logoW: 200,
    logoH: 194,
    x: 29,
    y: 88,
  },
];

const HUB = { x: 50, y: 50 };

function NodeCard({ node, index }: { node: Node; index: number }) {
  return (
    <div
      className="node-in flex w-full items-center lg:w-[13rem] gap-3 rounded-xl border border-line bg-surface p-2.5 pr-3 shadow-[0_10px_28px_-16px_rgba(13,21,48,0.35)]"
      style={{ animationDelay: `${150 + index * 90}ms` }}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-line bg-white">
        {node.logo ? (
          <Image
            src={node.logo}
            alt=""
            width={node.logoW}
            height={node.logoH}
            className="h-8 w-8 rounded-none object-contain"
          />
        ) : (
          <Image
            src="/brand/ziffera-mark.png"
            alt=""
            width={360}
            height={308}
            className="h-6 w-auto rounded-none"
          />
        )}
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold leading-5 text-ink">{node.name}</span>
        <span className="block font-mono text-[11px] leading-4 text-ink-3">{node.does}</span>
      </span>
    </div>
  );
}

/**
 * Wiring diagram of things Ziffera has shipped, all hanging off the Z.
 * Desktop: positioned nodes with animated connectors. Mobile: a simple grid.
 */
export default function SystemMap() {
  return (
    <figure className="relative" aria-label="Systems built by Ziffera">
      {/* Desktop map */}
      <div className="relative hidden aspect-[1.08/1] w-full lg:block">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {nodes.map((n) => {
            const d = `M ${HUB.x} ${HUB.y} C ${HUB.x} ${(HUB.y + n.y) / 2}, ${n.x} ${(HUB.y + n.y) / 2}, ${n.x} ${n.y}`;
            return (
              <g key={n.name}>
                <path
                  d={d}
                  fill="none"
                  stroke="var(--line-strong)"
                  strokeWidth="1.25"
                  strokeDasharray="3 4"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d={d}
                  pathLength={100}
                  fill="none"
                  stroke="var(--z-blue)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  className="packet"
                  style={{ animationDelay: `${nodes.indexOf(n) * -0.7}s` }}
                />
              </g>
            );
          })}
        </svg>

        {/* Hub */}
        <div
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
          style={{ left: `${HUB.x}%`, top: `${HUB.y}%` }}
        >
          <div className="flex h-28 w-28 items-center justify-center rounded-[1.75rem] border border-z-blue/25 bg-surface shadow-[0_0_0_10px_rgba(31,91,255,0.06),0_24px_48px_-20px_rgba(31,91,255,0.55)]">
            <Image
              src="/brand/ziffera-mark.png"
              alt="Ziffera"
              width={360}
              height={308}
              priority
              className="h-16 w-auto rounded-none"
            />
          </div>
        </div>

        {nodes.map((n, i) => (
          <div
            key={n.name}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            <NodeCard node={n} index={i} />
          </div>
        ))}
      </div>

      {/* Mobile list */}
      <div className="grid gap-2.5 sm:grid-cols-2 lg:hidden">
        {nodes.map((n, i) => (
          <NodeCard key={n.name} node={n} index={i} />
        ))}
      </div>
    </figure>
  );
}
