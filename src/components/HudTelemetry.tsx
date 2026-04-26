"use client";

import { useEffect, useState } from "react";

export type TelemetryItem =
  | string
  | { kind: "uptime"; prefix?: string }
  | { kind: "latency"; prefix?: string };

type Props = {
  items: TelemetryItem[];
  className?: string;
};

const PLACEHOLDER = "--";

function formatUptime(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600).toString().padStart(2, "0");
  const m = Math.floor((total % 3600) / 60).toString().padStart(2, "0");
  const s = (total % 60).toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export function HudTelemetry({ items, className }: Props) {
  const [now, setNow] = useState<number | null>(null);
  const [latency, setLatency] = useState<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    // Defer initial setState past the effect commit to avoid the
    // react-hooks/set-state-in-effect rule. rAF runs on the next paint.
    const raf = requestAnimationFrame(() => {
      setNow(0);
      setLatency(8 + Math.floor(Math.random() * 14)); // 8–21ms
    });
    const tick = window.setInterval(() => {
      setNow(performance.now() - start);
    }, 1000);
    const ping = window.setInterval(() => {
      setLatency(8 + Math.floor(Math.random() * 14));
    }, 4200);
    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(tick);
      window.clearInterval(ping);
    };
  }, []);

  const rendered = items.map((item, i): { key: string; text: string } => {
    if (typeof item === "string") return { key: `s${i}`, text: item };
    if (item.kind === "uptime") {
      const value = now == null ? PLACEHOLDER : formatUptime(now);
      return { key: `u${i}`, text: `${item.prefix ?? "UPTIME"} ${value}` };
    }
    const value = latency == null ? PLACEHOLDER : `${latency}ms`;
    return { key: `l${i}`, text: `${item.prefix ?? "LAT"} ${value}` };
  });

  return (
    <div
      className={`hud-telemetry inline-flex items-center gap-1.5 text-[10px] tracking-[0.18em] ${className ?? ""}`}
      role="status"
      aria-live="off"
    >
      <span className="hud-telemetry__indicator" aria-hidden />
      <span className="font-mono uppercase whitespace-nowrap overflow-hidden text-ellipsis">
        {rendered.map((r, i) => (
          <span key={r.key}>
            {i > 0 && <span className="hud-telemetry__sep"> · </span>}
            {r.text}
          </span>
        ))}
      </span>
    </div>
  );
}
