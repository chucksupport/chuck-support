"use client";

import { TransitionLink as Link } from "@/components/TransitionLink";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { ArcReactor } from "@/components/ArcReactor";
import { DecodeText } from "@/components/DecodeText";
import { HudTelemetry } from "@/components/HudTelemetry";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/buy-support", label: "Buy Support" },
  { href: "/karaoke-dj", label: "Karaoke / DJ" },
  { href: "/chuckurrito", label: "Chuckurrito" },
  { href: "/support-chuck", label: "Support Chuck" },
  { href: "/help", label: "Help" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  // While the overlay is open: lock background scroll and close on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      {/* ──────────────────────────────────────────
          DESKTOP SIDEBAR
      ────────────────────────────────────────── */}
      <aside
        className="hidden md:flex flex-col w-56 shrink-0 h-screen sticky top-0 overflow-y-auto z-30"
        style={{
          background: "oklch(0.11 0.018 240 / 0.92)",
          backdropFilter: "blur(20px)",
          borderRight: "1px solid oklch(1 0 0 / 0.07)",
        }}
      >
        {/* Right-edge accent gradient */}
        <div
          className="absolute right-0 top-0 bottom-0 w-px pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, var(--px-40) 40%, var(--px-40) 60%, transparent 100%)",
          }}
        />

        {/* Profile */}
        <div className="flex flex-col items-center gap-3 px-4 py-8">
          <div className="relative">
            {/* Animated glow behind photo */}
            <div
              className="absolute rounded-full glow-blob pointer-events-none"
              style={{
                inset: "-6px",
                background: "radial-gradient(circle, var(--px-40), transparent 70%)",
              }}
            />
            {/* Arc-reactor orbit rings */}
            <span className="reactor-ring" aria-hidden />
            <span className="reactor-ring reactor-ring--rev" aria-hidden />
            <div
              className="relative w-20 h-20 rounded-full overflow-hidden"
              style={{
                border: "2px solid var(--px-50)",
                boxShadow: "0 0 24px var(--px-20)",
              }}
            >
              <img
                src="/images/profile.jpg"
                alt="Chuck"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="text-center">
            <p className="font-bold text-sm text-foreground tracking-tight">
              Chuck Support
            </p>
            <p
              className="text-xs font-medium mt-0.5"
              style={{ color: "var(--primary)" }}
            >
              chuck.support
            </p>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-0.5 px-2 flex-1 pb-4">
          {navLinks.map(({ href, label }, i) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className="relative flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 group"
                style={
                  active
                    ? {
                        background: "var(--px-15)",
                        color: "oklch(0.94 0.005 220)",
                      }
                    : undefined
                }
                onMouseEnter={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLAnchorElement).style.background =
                      "oklch(1 0 0 / 0.04)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLAnchorElement).style.background =
                      "transparent";
                  }
                }}
              >
                {/* Active left accent bar */}
                {active && (
                  <span
                    className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full"
                    style={{ background: "var(--primary)" }}
                  />
                )}

                <span className="flex items-center gap-2.5">
                  <span
                    className="nav-index"
                    style={active ? { color: "var(--primary)" } : undefined}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="transition-colors duration-200"
                    style={
                      active
                        ? { color: "var(--primary)" }
                        : { color: "oklch(0.60 0.012 230)" }
                    }
                  >
                    {label}
                  </span>
                </span>

                {href === "/buy-support" && totalItems > 0 && (
                  <Badge
                    className="text-xs px-1.5 py-0 border-0 font-bold"
                    style={{
                      background: "var(--primary)",
                      color: "oklch(0.08 0 0)",
                    }}
                  >
                    {totalItems}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div
          className="px-4 py-4 text-center"
          style={{ borderTop: "1px solid oklch(1 0 0 / 0.05)" }}
        >
          <p className="text-xs font-medium" style={{ color: "var(--px-50)" }}>
            © {new Date().getFullYear()} chuck.support
          </p>
        </div>
      </aside>

      {/* ──────────────────────────────────────────
          MOBILE: FLOATING MENU BUTTON
      ────────────────────────────────────────── */}
      <button
        onClick={() => setMenuOpen((v) => !v)}
        className={`menu-fab fixed top-4 right-4 z-50 md:hidden h-14 w-14 rounded-full flex items-center justify-center transition-all duration-300${
          menuOpen ? " menu-fab--open" : " hud-pulse"
        }`}
        style={{
          background: "oklch(0.13 0.018 240 / 0.92)",
          border: "1.5px solid var(--px-50)",
          boxShadow: menuOpen ? "0 0 24px var(--px-30)" : undefined,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
      >
        <span className={`menu-ring${menuOpen ? " menu-ring--open" : ""}`} aria-hidden />
        <span className="flex flex-col items-center gap-1" aria-hidden>
          <span className="menu-bar" />
          <span className="menu-bar" />
          <span className="menu-bar" />
        </span>
      </button>

      {/* ──────────────────────────────────────────
          MOBILE: FULL-SCREEN OVERLAY
      ────────────────────────────────────────── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center transition-all duration-300${
          menuOpen ? " menu-overlay--open" : ""
        }`}
        style={{
          background: "oklch(0.09 0.015 240 / 0.97)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          opacity: menuOpen ? 1 : 0,
          // visibility transitions discretely at the end of the fade-out,
          // so the hidden menu can't trap keyboard focus or screen readers
          visibility: menuOpen ? "visible" : "hidden",
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        {/* Decorative radial glow in center */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, var(--px-10), transparent)",
          }}
        />

        {/* Giant arc reactor slowly spinning behind the nav */}
        {menuOpen && (
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: 0.16 }}
            aria-hidden
          >
            <ArcReactor size={380} />
          </div>
        )}

        {/* HUD corner brackets */}
        <span className="menu-bracket menu-bracket--tl" aria-hidden />
        <span className="menu-bracket menu-bracket--tr" style={{ transitionDelay: "60ms" }} aria-hidden />
        <span className="menu-bracket menu-bracket--bl" style={{ transitionDelay: "120ms" }} aria-hidden />
        <span className="menu-bracket menu-bracket--br" style={{ transitionDelay: "180ms" }} aria-hidden />

        {/* One-shot scan sweep — remounts (and replays) on each open */}
        {menuOpen && <span className="menu-scan" aria-hidden />}

        {/* Profile */}
        <div
          className="mb-10 flex flex-col items-center gap-2 relative z-10 transition-all duration-400"
          style={{
            transitionDelay: menuOpen ? "60ms" : "0ms",
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <div className="relative">
            <span className="reactor-ring" aria-hidden />
            <div
              className="w-16 h-16 rounded-full overflow-hidden"
              style={{
                border: "2px solid var(--px-50)",
                boxShadow: "0 0 20px var(--px-30)",
              }}
            >
              <img
                src="/images/profile.jpg"
                alt="Chuck"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <span className="text-sm font-bold gradient-text">chuck.support</span>
        </div>

        {/* Nav links — staggered fade-up with decode-in labels */}
        <nav className="flex flex-col items-stretch gap-1 relative z-10 w-full max-w-sm px-8">
          {navLinks.map(({ href, label }, i) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="hud-title flex items-baseline gap-3 whitespace-nowrap text-[clamp(1.1rem,5.2vw,1.55rem)] font-black py-2.5 px-4 rounded-lg transition-all duration-300 active:scale-95"
                style={{
                  transitionDelay: menuOpen ? `${(i + 1) * 55}ms` : "0ms",
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                  color: active ? "var(--primary)" : "oklch(0.94 0.005 220 / 0.85)",
                  textShadow: active ? "0 0 30px var(--px-40)" : "none",
                  background: active ? "var(--px-10)" : "transparent",
                }}
              >
                <span
                  className="font-mono text-[11px] font-normal tracking-[0.14em]"
                  style={{
                    color: active ? "var(--primary)" : "var(--px-40)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {menuOpen ? (
                  <DecodeText
                    key={`decode-${i}`}
                    text={label}
                    delay={140 + i * 70}
                    speed={26}
                  />
                ) : (
                  label
                )}
                {href === "/buy-support" && totalItems > 0 && (
                  <span
                    className="ml-auto self-center font-mono text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{
                      background: "var(--primary)",
                      color: "oklch(0.08 0 0)",
                    }}
                  >
                    {totalItems}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Live telemetry footer */}
        {menuOpen && (
          <div className="absolute bottom-8 left-0 right-0 flex justify-center">
            <HudTelemetry
              items={["NAV_SYS", { kind: "uptime" }, { kind: "latency" }]}
            />
          </div>
        )}
      </div>
    </>
  );
}
