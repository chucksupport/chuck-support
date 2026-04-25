import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const services = [
  { icon: "🌐", title: "Website Construction",  desc: "From landing pages to full-stack apps — designed, built, and launched." },
  { icon: "📦", title: "Data Migrations",        desc: "Move your data safely between platforms, databases, and systems." },
  { icon: "🔌", title: "Networking",             desc: "Home and small-business network setup, configuration, and troubleshooting." },
  { icon: "🖥️", title: "Hosting",               desc: "Reliable managed hosting on modern infrastructure. No surprises." },
  { icon: "💻", title: "Programming",            desc: "Custom software solutions — automation, scripts, APIs, and more." },
  { icon: "🎙️", title: "Audio Recording",        desc: "Professional-grade recording, mixing, and production in a creative environment." },
  { icon: "⛓️", title: "Blockchain & Crypto",    desc: "Web3 development, wallet integrations, smart contracts, and crypto consulting." },
  { icon: "☀️", title: "Renewable Energy",       desc: "Solar, battery storage, and off-grid power consulting for homes and builds." },
  { icon: "🏗️", title: "Sustainable Building",  desc: "Eco-conscious construction consulting — materials, design, and systems." },
];

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12 px-6 py-10 max-w-4xl w-full">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        {/* Decorative glow blob */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-60px",
            right: "-80px",
            width: "360px",
            height: "360px",
            borderRadius: "50%",
            background: "radial-gradient(circle, oklch(0.82 0.21 195 / 0.15), transparent 70%)",
            filter: "blur(48px)",
          }}
        />

        <div className="relative flex flex-col gap-5">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="h-px w-8" style={{ background: "var(--primary)" }} />
            <span
              className="text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: "var(--primary)" }}
            >
              Full-Service Digital Agency
            </span>
          </div>

          {/* Main heading */}
          <div className="leading-none">
            <h1 className="text-6xl sm:text-7xl font-black tracking-tighter gradient-text">
              CHUCK
            </h1>
            <h1
              className="text-6xl sm:text-7xl font-black tracking-tighter"
              style={{ color: "oklch(0.94 0.005 220)" }}
            >
              SUPPORT
            </h1>
          </div>

          {/* Tagline */}
          <p
            className="text-base leading-relaxed max-w-xl"
            style={{ color: "oklch(0.60 0.012 230)" }}
          >
            Technology meets craftsmanship. Websites, networks, hosting,
            programming, audio, crypto — built right, the first time.
            One person. Zero bureaucracy. Direct line to Chuck.
          </p>

          {/* CTA links */}
          <div className="flex gap-5 text-sm font-semibold">
            <a href="/buy-support" className="link-accent">Browse Services →</a>
            <a href="/help" className="link-muted">Get in Touch</a>
          </div>
        </div>
      </section>

      <Separator style={{ background: "oklch(1 0 0 / 0.06)" }} />

      {/* ── FEATURED FILM ── */}
      <div className="relative">
        {/* Outer glow halo */}
        <div
          className="absolute -inset-1 rounded-2xl pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.82 0.21 195 / 0.18), oklch(0.72 0.18 230 / 0.08))",
            filter: "blur(10px)",
          }}
        />
        <div
          className="relative w-full aspect-video rounded-xl overflow-hidden bg-black"
          style={{
            border: "1px solid oklch(0.82 0.21 195 / 0.25)",
            boxShadow:
              "0 0 48px oklch(0.82 0.21 195 / 0.07), 0 24px 64px oklch(0 0 0 / 0.5)",
          }}
        >
          <video
            src="/videos/endo-project.mp4"
            poster="/videos/endo-project-poster.jpg"
            controls
            preload="metadata"
            playsInline
            title="The Endo Project — directed by Jordan P. Anderson"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <p
          className="mt-3 text-xs tracking-wide text-center"
          style={{ color: "oklch(0.60 0.012 230)" }}
        >
          The Endo Project — a short film by Jordan P. Anderson, starring Chuck.
        </p>
      </div>

      <Separator style={{ background: "oklch(1 0 0 / 0.06)" }} />

      {/* ── SERVICES ── */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2
            className="text-2xl font-black tracking-tight"
            style={{ color: "oklch(0.94 0.005 220)" }}
          >
            What We Do
          </h2>
          <p className="text-sm" style={{ color: "oklch(0.60 0.012 230)" }}>
            A wide range of technical and creative services — all under one roof.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {services.map(({ icon, title, desc }) => (
            <Card
              key={title}
              className="service-card"
              style={{ background: "oklch(0.13 0.018 240)" }}
            >
              <CardContent className="pt-5 pb-5 px-5 flex flex-col gap-2">
                <span className="text-2xl">{icon}</span>
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
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator style={{ background: "oklch(1 0 0 / 0.06)" }} />

      {/* ── CTA ── */}
      <section className="flex flex-col gap-3 pb-10">
        <h2
          className="text-lg font-bold"
          style={{ color: "oklch(0.94 0.005 220)" }}
        >
          Ready to get started?
        </h2>
        <p
          className="text-sm max-w-xl leading-relaxed"
          style={{ color: "oklch(0.60 0.012 230)" }}
        >
          Head to the{" "}
          <a href="/buy-support" className="link-accent font-semibold">
            Buy Support
          </a>{" "}
          page to browse services, or visit{" "}
          <a href="/help" className="link-accent font-semibold">
            Help
          </a>{" "}
          to get in touch directly.
        </p>
      </section>
    </div>
  );
}
