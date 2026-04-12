"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
      {/* Mobile hamburger */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-card border border-border rounded-md p-2 text-foreground"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle navigation"
      >
        <span className="block w-5 h-0.5 bg-current mb-1" />
        <span className="block w-5 h-0.5 bg-current mb-1" />
        <span className="block w-5 h-0.5 bg-current" />
      </button>

      {/* Overlay for mobile */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={[
          "fixed top-0 left-0 h-full z-40 flex flex-col",
          "w-60 bg-sidebar border-r border-sidebar-border",
          "transition-transform duration-200",
          menuOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0 md:static md:flex",
        ].join(" ")}
      >
        {/* Profile area */}
        <div className="flex flex-col items-center gap-3 px-4 py-6">
          <div className="w-24 h-24 rounded-full bg-muted border-2 border-primary/40 flex items-center justify-center overflow-hidden">
            {/* Replace src with actual profile photo */}
            <span className="text-4xl select-none">🤙</span>
          </div>
          <div className="text-center">
            <p className="font-semibold text-sidebar-foreground text-sm">Chuck Support</p>
            <p className="text-xs text-muted-foreground">chuck.support</p>
          </div>
        </div>

        <Separator className="bg-sidebar-border" />

        {/* Nav links */}
        <nav className="flex flex-col gap-1 px-2 py-4 flex-1">
          {navLinks.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={[
                  "flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                ].join(" ")}
              >
                <span>{label}</span>
                {href === "/buy-support" && totalItems > 0 && (
                  <Badge className="bg-primary text-primary-foreground text-xs px-1.5 py-0">
                    {totalItems}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        <Separator className="bg-sidebar-border" />

        {/* Footer */}
        <div className="px-4 py-4 text-xs text-muted-foreground text-center">
          <p>© {new Date().getFullYear()} Chuck Support</p>
          <p className="mt-0.5">Full-Service Digital Agency</p>
        </div>
      </aside>
    </>
  );
}
