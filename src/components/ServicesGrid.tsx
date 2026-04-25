"use client";

import { useEffect, useRef, useState } from "react";
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

type Service = {
  Icon: LucideIcon;
  title: string;
  desc: string;
};

const services: Service[] = [
  { Icon: Globe,       title: "Website Construction",  desc: "From landing pages to full-stack apps — designed, built, and launched." },
  { Icon: DatabaseZap, title: "Data Migrations",       desc: "Move your data safely between platforms, databases, and systems." },
  { Icon: Network,     title: "Networking",            desc: "Home and small-business network setup, configuration, and troubleshooting." },
  { Icon: Server,      title: "Hosting",               desc: "Reliable managed hosting on modern infrastructure. No surprises." },
  { Icon: Code2,       title: "Programming",           desc: "Custom software solutions — automation, scripts, APIs, and more." },
  { Icon: Mic,         title: "Audio Recording",       desc: "Professional-grade recording, mixing, and production in a creative environment." },
  { Icon: LinkIcon,    title: "Blockchain & Crypto",   desc: "Web3 development, wallet integrations, smart contracts, and crypto consulting." },
  { Icon: Sun,         title: "Renewable Energy",      desc: "Solar, battery storage, and off-grid power consulting for homes and builds." },
  { Icon: Leaf,        title: "Sustainable Building",  desc: "Eco-conscious construction consulting — materials, design, and systems." },
];

// Hue cycle within the cyan/teal/blue family — keeps visual rhythm without chaos.
const HUES = [195, 210, 180, 225, 195, 200, 215, 175, 195];

function ServiceCard({
  service,
  index,
  visible,
}: {
  service: Service;
  index: number;
  visible: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const hue = HUES[index % HUES.length];
  const { Icon, title, desc } = service;

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className="service-card group relative overflow-hidden rounded-xl"
      style={
        {
          "--hue": hue,
          "--card-bg": "oklch(0.13 0.018 240)",
          background: "var(--card-bg)",
          transitionDelay: visible ? `${index * 70}ms` : "0ms",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
        } as React.CSSProperties
      }
    >
      {/* Spotlight overlay — radial gradient that follows the cursor */}
      <div className="service-card__spotlight pointer-events-none absolute inset-0" />

      {/* Animated conic-gradient border — visible on hover */}
      <div className="service-card__border pointer-events-none absolute inset-0 rounded-xl" />

      <div className="relative flex flex-col gap-2 px-5 py-5">
        <div className="service-card__icon relative inline-flex h-10 w-10 items-center justify-center rounded-lg">
          <Icon
            className="service-card__icon-svg relative z-10 h-6 w-6"
            strokeWidth={1.75}
          />
        </div>
        <h3
          className="font-bold text-sm tracking-tight"
          style={{ color: "oklch(0.94 0.005 220)" }}
        >
          {title}
        </h3>
        <p
          className="text-xs leading-relaxed"
          style={{ color: "oklch(0.60 0.012 230)" }}
        >
          {desc}
        </p>
      </div>
    </div>
  );
}

export function ServicesGrid() {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
    >
      {services.map((service, i) => (
        <ServiceCard
          key={service.title}
          service={service}
          index={i}
          visible={visible}
        />
      ))}
    </div>
  );
}
