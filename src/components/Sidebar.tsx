"use client";

import { TransitionLink as Link } from "@/components/TransitionLink";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";

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
          {navLinks.map(({ href, label }) => {
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
        className={`fixed top-4 right-4 z-50 md:hidden h-12 min-w-[5.5rem] px-5 rounded-full transition-all duration-300 overflow-hidden${
          menuOpen ? "" : " hud-pulse"
        }`}
        style={{
          background: menuOpen
            ? "oklch(0.13 0.018 240 / 0.9)"
            : "var(--primary)",
          border: menuOpen
            ? "1.5px solid var(--px-50)"
            : "1.5px solid transparent",
          boxShadow: menuOpen
            ? "0 0 24px var(--px-30)"
            : undefined,
          backdropFilter: menuOpen ? "blur(12px)" : "none",
        }}
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
      >
        {/* "menu" label — visible when closed */}
        <span
          className="absolute inset-0 flex items-center justify-center font-bold tracking-wide text-sm lowercase transition-opacity duration-200 select-none"
          style={{
            color: "oklch(0.08 0 0)",
            opacity: menuOpen ? 0 : 1,
          }}
        >
          menu
        </span>
        {/* "close" label — visible when open */}
        <span
          className="absolute inset-0 flex items-center justify-center font-bold tracking-wide text-sm lowercase transition-opacity duration-200 select-none"
          style={{
            color: "var(--primary)",
            opacity: menuOpen ? 1 : 0,
          }}
        >
          close
        </span>
      </button>

      {/* ──────────────────────────────────────────
          MOBILE: FULL-SCREEN OVERLAY
      ────────────────────────────────────────── */}
      <div
        className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center transition-all duration-300"
        style={{
          background: "oklch(0.09 0.015 240 / 0.97)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          opacity: menuOpen ? 1 : 0,
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

        {/* Profile */}
        <div
          className="mb-10 flex flex-col items-center gap-2 relative z-10 transition-all duration-400"
          style={{
            transitionDelay: menuOpen ? "60ms" : "0ms",
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateY(0)" : "translateY(16px)",
          }}
        >
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
          <span className="text-sm font-bold gradient-text">chuck.support</span>
        </div>

        {/* Nav links — staggered fade-up */}
        <nav className="flex flex-col items-center gap-1 relative z-10">
          {navLinks.map(({ href, label }, i) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="text-4xl font-black tracking-tight py-1 px-6 rounded-xl transition-all duration-300"
                style={{
                  transitionDelay: menuOpen ? `${(i + 1) * 55}ms` : "0ms",
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                  color: active ? "var(--primary)" : "oklch(0.94 0.005 220 / 0.8)",
                  textShadow: active ? "0 0 30px var(--px-40)" : "none",
                }}
                onMouseEnter={(e) => {
                  if (!active)
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "oklch(0.94 0.005 220)";
                }}
                onMouseLeave={(e) => {
                  if (!active)
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "oklch(0.94 0.005 220 / 0.8)";
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
