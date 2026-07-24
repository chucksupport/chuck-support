"use client";

import { useEffect, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/\\|=+*#";

type Props = {
  text: string;
  className?: string;
  /** ms before the scramble starts */
  delay?: number;
  /** ms per animation frame */
  speed?: number;
};

/**
 * JARVIS-style character decode: text scrambles into place left-to-right.
 * SSR renders the final text (no hydration mismatch, no layout shift —
 * scramble is monospace-agnostic since char count never changes).
 * Honors prefers-reduced-motion by never animating.
 */
export function DecodeText({ text, className, delay = 0, speed = 35 }: Props) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    const reduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (reduced) return;

    let interval: number | undefined;
    const timeout = window.setTimeout(() => {
      let frame = 0;
      // Each char locks in after ~2.5 frames; the rest keep cycling.
      const framesPerChar = 2.5;
      interval = window.setInterval(() => {
        frame++;
        const settled = Math.floor(frame / framesPerChar);
        if (settled >= text.length) {
          setDisplay(text);
          window.clearInterval(interval);
          return;
        }
        setDisplay(
          text
            .split("")
            .map((c, i) => {
              if (c === " " || i < settled) return c;
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            })
            .join(""),
        );
      }, speed);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
      if (interval) window.clearInterval(interval);
    };
  }, [text, delay, speed]);

  return (
    <span className={className} aria-label={text}>
      {display}
    </span>
  );
}
