"use client";

import { useEffect } from "react";

const BOOT_KEY = "hud-booted";
const BOOT_DURATION_MS = 1500;

/**
 * JARVIS-style boot reveal. Visibility is driven entirely by a
 * data-boot attribute on <html>, so the component never holds React
 * state and avoids hydration mismatch — the overlay markup is always
 * present, CSS keeps it hidden until the attribute flips to "active".
 */
export function BootSequence() {
  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.boot) return; // already handled this session

    const seen = sessionStorage.getItem(BOOT_KEY) === "1";
    const reduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    if (seen || reduced) {
      root.dataset.boot = "done";
      return;
    }

    sessionStorage.setItem(BOOT_KEY, "1");
    root.dataset.boot = "active";

    const t = window.setTimeout(() => {
      root.dataset.boot = "done";
    }, BOOT_DURATION_MS);

    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="boot-overlay" aria-hidden>
      <span className="boot-line boot-line--top" />
      <span className="boot-line boot-line--left" />
      <span className="boot-line boot-line--right" />
      <span className="boot-line boot-line--bottom" />
      <span className="boot-bracket boot-bracket--tl" />
      <span className="boot-bracket boot-bracket--tr" />
      <span className="boot-bracket boot-bracket--bl" />
      <span className="boot-bracket boot-bracket--br" />
    </div>
  );
}
