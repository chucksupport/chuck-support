type Props = {
  size?: number;
  className?: string;
};

/**
 * Animated arc-reactor ornament — pure SVG + CSS, no client JS.
 * Three counter-rotating rings around a pulsing core.
 */
export function ArcReactor({ size = 280, className }: Props) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={`arc-reactor ${className ?? ""}`}
      aria-hidden
    >
      {/* Outer tick ring — 36 radial ticks */}
      <g className="arc-reactor__spin" stroke="oklch(0.82 0.21 195 / 0.45)" strokeWidth="1.5">
        {Array.from({ length: 36 }, (_, i) => {
          const a = (i * 10 * Math.PI) / 180;
          const r1 = 92;
          const r2 = i % 3 === 0 ? 84 : 88;
          return (
            <line
              key={i}
              x1={100 + r1 * Math.cos(a)}
              y1={100 + r1 * Math.sin(a)}
              x2={100 + r2 * Math.cos(a)}
              y2={100 + r2 * Math.sin(a)}
            />
          );
        })}
      </g>

      {/* Segmented mid ring */}
      <circle
        className="arc-reactor__spin--rev"
        cx="100"
        cy="100"
        r="72"
        fill="none"
        stroke="oklch(0.82 0.21 195 / 0.55)"
        strokeWidth="3"
        strokeDasharray="30 8 12 8"
      />

      {/* Thin dashed ring */}
      <circle
        className="arc-reactor__spin--fast"
        cx="100"
        cy="100"
        r="58"
        fill="none"
        stroke="oklch(0.82 0.21 195 / 0.35)"
        strokeWidth="1"
        strokeDasharray="4 6"
      />

      {/* Inner triangle cage — the Mark-anything silhouette */}
      <g className="arc-reactor__spin--rev" stroke="oklch(0.82 0.21 195 / 0.5)" strokeWidth="1" fill="none">
        <polygon points="100,56 138,122 62,122" />
        <polygon points="100,144 62,78 138,78" />
      </g>

      {/* Core */}
      <circle
        className="arc-reactor__core"
        cx="100"
        cy="100"
        r="26"
        fill="oklch(0.82 0.21 195 / 0.12)"
        stroke="oklch(0.82 0.21 195 / 0.8)"
        strokeWidth="1.5"
      />
      <circle className="arc-reactor__core" cx="100" cy="100" r="14" fill="oklch(0.88 0.19 195 / 0.5)" />
      <circle cx="100" cy="100" r="6" fill="oklch(0.97 0.05 195)" />
    </svg>
  );
}
