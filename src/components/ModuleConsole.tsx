"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Globe,
  DatabaseZap,
  Network,
  Server,
  Code2,
  Mic,
  Link as LinkIcon,
  Sun,
  Leaf,
  type LucideIcon,
} from "lucide-react";
import { DecodeText } from "@/components/DecodeText";

type Module = {
  Icon: LucideIcon;
  title: string;
  tag: string;
  desc: string;
  hue: number;
  stats: [string, number][];
  boot: string[];
};

const MODULES: Module[] = [
  {
    Icon: Globe, title: "Website Construction", tag: "WEB_OPS", hue: 195,
    desc: "From landing pages to full-stack apps — designed, built, and launched.",
    stats: [["PWR", 94], ["NET", 88], ["OPS", 91]],
    boot: ["mounting web_ops module", "stack: next.js + edge runtime", "status: ready to build"],
  },
  {
    Icon: DatabaseZap, title: "Data Migrations", tag: "DATA_CORE", hue: 210,
    desc: "Move your data safely between platforms, databases, and systems.",
    stats: [["PWR", 87], ["NET", 92], ["OPS", 96]],
    boot: ["mounting data_core module", "checksums: verified twice, always", "status: zero-loss transfer armed"],
  },
  {
    Icon: Network, title: "Networking", tag: "NET_MESH", hue: 180,
    desc: "Home and small-business network setup, configuration, and troubleshooting.",
    stats: [["PWR", 82], ["NET", 98], ["OPS", 85]],
    boot: ["mounting net_mesh module", "topology: mapped and hardened", "status: packets flowing clean"],
  },
  {
    Icon: Server, title: "Hosting", tag: "HOST_GRID", hue: 225,
    desc: "Reliable managed hosting on modern infrastructure. No surprises.",
    stats: [["PWR", 96], ["NET", 90], ["OPS", 93]],
    boot: ["mounting host_grid module", "uptime target: boringly high", "status: serving traffic"],
  },
  {
    Icon: Code2, title: "Programming", tag: "CODE_FORGE", hue: 195,
    desc: "Custom software solutions — automation, scripts, APIs, and more.",
    stats: [["PWR", 91], ["NET", 80], ["OPS", 95]],
    boot: ["mounting code_forge module", "languages: yes", "status: compiling ideas → software"],
  },
  {
    Icon: Mic, title: "Audio Recording", tag: "AUDIO_LAB", hue: 200,
    desc: "Professional-grade recording, mixing, and production in a creative environment.",
    stats: [["PWR", 89], ["NET", 76], ["OPS", 92]],
    boot: ["mounting audio_lab module", "signal chain: warm and clean", "status: levels set, tape rolling"],
  },
  {
    Icon: LinkIcon, title: "Blockchain & Crypto", tag: "CHAIN_LINK", hue: 215,
    desc: "Web3 development, wallet integrations, smart contracts, and crypto consulting.",
    stats: [["PWR", 85], ["NET", 94], ["OPS", 84]],
    boot: ["mounting chain_link module", "wallets: connected, keys: yours", "status: on-chain and verified"],
  },
  {
    Icon: Sun, title: "Renewable Energy", tag: "SOLAR_ARRAY", hue: 175,
    desc: "Solar, battery storage, and off-grid power consulting for homes and builds.",
    stats: [["PWR", 99], ["NET", 72], ["OPS", 88]],
    boot: ["mounting solar_array module", "input: one (1) local star", "status: harvesting photons"],
  },
  {
    Icon: Leaf, title: "Sustainable Building", tag: "ECO_BUILD", hue: 160,
    desc: "Eco-conscious construction consulting — materials, design, and systems.",
    stats: [["PWR", 84], ["NET", 70], ["OPS", 90]],
    boot: ["mounting eco_build module", "materials: honest and durable", "status: building for the long run"],
  },
];

type Diag = { lines: string[]; shown: number; done: boolean };

export function ModuleConsole() {
  const [active, setActive] = useState(0);
  const [bootShown, setBootShown] = useState(0);
  const [diag, setDiag] = useState<Diag | null>(null);
  const [diagCount, setDiagCount] = useState(0);
  const [ripple, setRipple] = useState<{ id: number; tile: number; x: number; y: number } | null>(null);
  const timers = useRef<number[]>([]);
  const tileRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const mod = MODULES[active];

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);

  const startBoot = useCallback(
    (m: Module) => {
      clearTimers();
      const reduced =
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
      if (reduced) {
        timers.current.push(
          window.setTimeout(() => setBootShown(m.boot.length), 0),
        );
        return;
      }
      m.boot.forEach((_, i) => {
        timers.current.push(
          window.setTimeout(() => setBootShown(i + 1), 220 + i * 340),
        );
      });
    },
    [clearTimers],
  );

  useEffect(() => {
    startBoot(MODULES[0]);
    return clearTimers;
  }, [startBoot, clearTimers]);

  function select(i: number) {
    if (i === active) return;
    setActive(i);
    setBootShown(0);
    setDiag(null);
    startBoot(MODULES[i]);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    const n = MODULES.length;
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (active + 1) % n;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (active + n - 1) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    if (next != null) {
      e.preventDefault();
      select(next);
      tileRefs.current[next]?.focus();
    }
  }

  function runDiag() {
    if (diag && !diag.done) return;
    const m = mod;
    const lat = 6 + Math.floor(Math.random() * 18);
    const lines = [
      `spooling ${m.tag.toLowerCase()} core …`,
      "integrity check … 100%",
      `latency probe … ${lat}ms`,
      "thermal envelope … nominal",
      `${m.tag} NOMINAL — READY FOR DEPLOYMENT`,
    ];
    clearTimers();
    setBootShown(m.boot.length);
    setDiag({ lines, shown: 0, done: false });
    const reduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    lines.forEach((_, i) => {
      const done = i + 1 === lines.length;
      timers.current.push(
        window.setTimeout(() => {
          setDiag((d) => (d ? { ...d, shown: i + 1, done } : d));
          if (done) setDiagCount((c) => c + 1);
        }, reduced ? 0 : 320 + i * 400),
      );
    });
  }

  function onTileMove(e: React.MouseEvent<HTMLButtonElement>) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  function onTileDown(i: number, e: React.PointerEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple((r) => ({
      id: (r?.id ?? 0) + 1,
      tile: i,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }));
  }

  const running = diag != null && !diag.done;
  const progress = diag ? Math.round((diag.shown / diag.lines.length) * 100) : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-4 items-start">

      {/* ── Module tiles ── */}
      <div
        role="tablist"
        aria-label="Service modules"
        aria-orientation="horizontal"
        onKeyDown={onKeyDown}
        className="grid grid-cols-3 gap-2"
      >
        {MODULES.map((m, i) => {
          const isActive = i === active;
          return (
            <button
              key={m.tag}
              ref={(el) => {
                tileRefs.current[i] = el;
              }}
              role="tab"
              id={`module-tab-${i}`}
              aria-selected={isActive}
              aria-controls="module-inspector"
              tabIndex={isActive ? 0 : -1}
              onClick={() => select(i)}
              onMouseMove={onTileMove}
              onPointerDown={(e) => onTileDown(i, e)}
              className="service-card group relative overflow-hidden rounded-lg flex flex-col items-center gap-1.5 px-2 py-3 cursor-pointer"
              style={
                {
                  "--hue": m.hue,
                  background: isActive
                    ? `oklch(0.82 0.21 ${m.hue} / 0.1)`
                    : "oklch(0.13 0.018 240)",
                  borderColor: isActive
                    ? `oklch(0.82 0.21 ${m.hue} / 0.45)`
                    : undefined,
                  boxShadow: isActive
                    ? `0 0 20px oklch(0.82 0.21 ${m.hue} / 0.15)`
                    : undefined,
                } as React.CSSProperties
              }
            >
              <div className="service-card__spotlight pointer-events-none absolute inset-0" />
              {ripple && ripple.tile === i && (
                <span
                  key={ripple.id}
                  className="service-card__ripple"
                  style={{ "--rx": `${ripple.x}px`, "--ry": `${ripple.y}px` } as React.CSSProperties}
                  aria-hidden
                />
              )}
              <span
                className="font-mono text-[9px] tracking-[0.14em] self-start"
                style={{
                  color: isActive
                    ? `oklch(0.82 0.21 ${m.hue})`
                    : "oklch(0.5 0.012 230)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="service-card__icon relative inline-flex h-9 w-9 items-center justify-center rounded-md">
                <m.Icon className="service-card__icon-svg relative z-10 h-5 w-5" strokeWidth={1.75} />
              </span>
              <span
                className="text-[10px] font-semibold leading-tight text-center"
                style={{
                  color: isActive
                    ? "oklch(0.94 0.005 220)"
                    : "oklch(0.60 0.012 230)",
                }}
              >
                {m.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Inspector ── */}
      <div
        id="module-inspector"
        role="tabpanel"
        aria-labelledby={`module-tab-${active}`}
        className="hud-panel relative"
        style={{ "--hue": mod.hue } as React.CSSProperties}
      >
        {running && <div className="console-sweep" aria-hidden />}

        {/* Header row */}
        <div className="flex items-center justify-between gap-3 px-5 pt-4">
          <span className="hud-label">
            MODULE.{String(active + 1).padStart(2, "0")}
            {" // "}
            {mod.tag}
          </span>
          <div className="flex items-center gap-3">
            {diagCount > 0 && (
              <span
                className="font-mono text-[10px] tracking-[0.16em] hidden sm:block"
                style={{ color: "oklch(0.82 0.21 195 / 0.45)" }}
              >
                DIAG_RUNS: {diagCount}
              </span>
            )}
            {/* Mini reticle */}
            <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden>
              <circle cx="10" cy="10" r="8" fill="none" stroke="oklch(0.82 0.21 195 / 0.4)" strokeWidth="1" strokeDasharray="3 3" className="arc-reactor__spin--fast" />
              <circle cx="10" cy="10" r="2.5" fill="oklch(0.82 0.21 195 / 0.7)" />
            </svg>
          </div>
        </div>

        <div className="px-5 pt-3 pb-5 flex flex-col gap-4">
          {/* Title + description — re-keyed so the decode replays per module */}
          <div className="flex flex-col gap-1.5">
            <h3
              className="hud-title text-xl font-black"
              style={{ color: "oklch(0.94 0.005 220)" }}
            >
              <DecodeText key={mod.tag} text={mod.title} speed={22} />
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "oklch(0.60 0.012 230)" }}>
              {mod.desc}
            </p>
          </div>

          {/* Stat bars */}
          <div className="flex flex-col gap-2">
            {mod.stats.map(([label, value]) => (
              <div key={label} className="flex items-center gap-3">
                <span
                  className="font-mono text-[10px] tracking-[0.16em] w-9 shrink-0"
                  style={{ color: "oklch(0.60 0.012 230)" }}
                >
                  {label}
                </span>
                <div className="stat-track flex-1 rounded-sm">
                  <div className="stat-fill" style={{ width: `${value}%` }} />
                </div>
                <span
                  className="font-mono text-[10px] w-7 text-right shrink-0"
                  style={{ color: `oklch(0.82 0.21 ${mod.hue})` }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Console log */}
          <div
            className="rounded-md px-3.5 py-3 font-mono text-[11px] leading-relaxed min-h-[8.5rem]"
            style={{
              background: "oklch(0.09 0.015 240)",
              border: "1px solid oklch(1 0 0 / 0.06)",
            }}
            aria-live="polite"
          >
            {mod.boot.slice(0, bootShown).map((line) => (
              <p key={line} style={{ color: "oklch(0.60 0.012 230)" }}>
                <span style={{ color: "oklch(0.82 0.21 195 / 0.6)" }}>&gt; </span>
                {line}
              </p>
            ))}
            {diag?.lines.slice(0, diag.shown).map((line, i) => {
              const isFinal = i === diag.lines.length - 1;
              return (
                <p
                  key={line}
                  style={{
                    color: isFinal ? "oklch(0.8 0.17 155)" : "oklch(0.60 0.012 230)",
                  }}
                >
                  <span
                    style={{
                      color: isFinal
                        ? "oklch(0.8 0.17 155)"
                        : "oklch(0.82 0.21 195 / 0.6)",
                    }}
                  >
                    {isFinal ? "✓ " : "> "}
                  </span>
                  {line}
                </p>
              );
            })}
            <span className="console-cursor" aria-hidden />
          </div>

          {/* Diagnostic controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={runDiag}
              disabled={running}
              className="hud-btn px-4 py-2 text-xs font-bold tracking-[0.12em] font-mono transition-colors disabled:opacity-60"
              style={{
                background: running ? "var(--px-15)" : "var(--primary)",
                color: running ? "var(--primary)" : "oklch(0.08 0 0)",
              }}
            >
              {running ? "SCANNING…" : "RUN DIAGNOSTIC"}
            </button>
            <div className="stat-track flex-1 rounded-sm">
              <div
                className="stat-fill"
                style={{
                  width: `${progress}%`,
                  "--hue": diag?.done ? 155 : mod.hue,
                } as React.CSSProperties}
              />
            </div>
            <span
              className="font-mono text-[10px] w-9 text-right"
              style={{
                color: diag?.done ? "oklch(0.8 0.17 155)" : `oklch(0.82 0.21 ${mod.hue})`,
              }}
            >
              {progress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
