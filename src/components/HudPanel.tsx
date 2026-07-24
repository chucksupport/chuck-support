import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Tiny mono system tag rendered top-left, e.g. "COMM_CHANNEL.01" */
  label?: string;
  /** Rendered top-right, mirrors the label style without the indicator */
  labelRight?: string;
  className?: string;
  /** Adds a hover lift */
  lift?: boolean;
};

/**
 * Glass HUD slab with corner brackets and a glowing top accent line.
 * Server-safe — all effects are CSS.
 */
export function HudPanel({ children, label, labelRight, className, lift }: Props) {
  return (
    <div className={`hud-panel ${lift ? "hud-panel--lift" : ""} ${className ?? ""}`}>
      {(label || labelRight) && (
        <div className="flex items-center justify-between gap-3 px-5 pt-4">
          {label ? <span className="hud-label">{label}</span> : <span />}
          {labelRight && (
            <span
              className="font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{ color: "oklch(0.82 0.21 195 / 0.45)" }}
            >
              {labelRight}
            </span>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
