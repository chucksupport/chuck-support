import type { ReactNode } from "react";
import { DecodeText } from "@/components/DecodeText";
import { HudTelemetry, type TelemetryItem } from "@/components/HudTelemetry";

type Props = {
  /** Mono section code, e.g. "SEC.02 // BUY_SUPPORT" */
  code: string;
  title: string;
  /** Optional angular chip next to the title */
  chip?: string;
  /** Description paragraph(s) */
  children?: ReactNode;
  telemetry?: TelemetryItem[];
};

/**
 * Standard Stark-style page header: section code eyebrow, decoding
 * display-type title, optional chip, description, telemetry readout,
 * and a glowing hairline rule.
 */
export function HudPageHeader({ code, title, chip, children, telemetry }: Props) {
  return (
    <header className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="h-px w-8" style={{ background: "var(--primary)" }} />
        <span
          className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em]"
          style={{ color: "var(--primary)" }}
        >
          {code}
        </span>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <h1 className="hud-title text-3xl sm:text-4xl font-black gradient-text">
          <DecodeText text={title} />
        </h1>
        {chip && <span className="hud-chip">{chip}</span>}
      </div>

      {children && (
        <div
          className="text-base leading-relaxed max-w-2xl"
          style={{ color: "oklch(0.60 0.012 230)" }}
        >
          {children}
        </div>
      )}

      {telemetry && <HudTelemetry items={telemetry} />}

      <div className="hud-rule" />
    </header>
  );
}
