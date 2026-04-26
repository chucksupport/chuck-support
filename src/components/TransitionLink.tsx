"use client";

import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps, MouseEvent, ReactNode } from "react";

type Props = LinkProps &
  Omit<ComponentProps<"a">, keyof LinkProps> & {
    children: ReactNode;
  };

/**
 * next/link wrapper that drives the View Transitions API directly.
 *
 * Next.js's experimental.viewTransition flag requires React canary's
 * <ViewTransition> component to actually animate route changes; on
 * stable React it's a no-op. Wrapping router.push() in
 * document.startViewTransition gives us the transition on stable
 * React in any browser that supports the API (Chrome 111+, Edge,
 * Safari 18+). Firefox falls through to a normal nav.
 */
export function TransitionLink({ href, onClick, ...rest }: Props) {
  const router = useRouter();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (typeof href !== "string") return;

    const start = (
      document as Document & {
        startViewTransition?: (cb: () => void) => unknown;
      }
    ).startViewTransition;

    if (typeof start !== "function") return; // browser without VT support → default Link nav

    e.preventDefault();
    // Return a promise so the View Transition API waits for the new
    // route to actually render before snapshotting the "new" frame.
    // Without this, App Router's router.push returns synchronously
    // but the new page commits a tick later — VT captures two
    // near-identical frames and the dissolve is invisible.
    start.call(
      document,
      () =>
        new Promise<void>((resolve) => {
          router.push(href);
          requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
        }),
    );
  }

  return <Link href={href} onClick={handleClick} {...rest} />;
}
