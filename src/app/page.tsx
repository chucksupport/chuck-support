import { ServicesGrid } from "@/components/ServicesGrid";
import { HudTelemetry } from "@/components/HudTelemetry";
import { ArcReactor } from "@/components/ArcReactor";
import { DecodeText } from "@/components/DecodeText";

function SectionCode({ code }: { code: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-8" style={{ background: "var(--primary)" }} />
      <span
        className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em]"
        style={{ color: "var(--primary)" }}
      >
        {code}
      </span>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12 px-6 py-10 max-w-4xl w-full mx-auto">

      {/* ── HERO ── */}
      <section className="relative overflow-visible">
        {/* Arc reactor — floats behind the heading, right side */}
        <div
          className="absolute pointer-events-none hidden sm:block"
          style={{ top: "-40px", right: "-60px", opacity: 0.9 }}
        >
          <ArcReactor size={300} />
        </div>
        {/* Decorative glow blob behind the reactor */}
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
          <SectionCode code="SYS.00 // FULL-SERVICE DIGITAL AGENCY" />

          {/* Main heading — Stark display type with decode-in */}
          <div className="leading-none">
            <h1 className="hud-title text-5xl sm:text-6xl md:text-7xl font-black gradient-text">
              <DecodeText text="CHUCK" speed={45} />
            </h1>
            <h1
              className="hud-title text-5xl sm:text-6xl md:text-7xl font-black"
              style={{ color: "oklch(0.94 0.005 220)" }}
            >
              <DecodeText text="SUPPORT" delay={250} speed={45} />
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

          {/* Telemetry readout */}
          <HudTelemetry
            items={[
              "STATUS: ONLINE",
              { kind: "uptime" },
              { kind: "latency" },
            ]}
          />
        </div>
      </section>

      <div className="hud-rule" />

      {/* ── FEATURED FILM ── */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <SectionCode code="MEDIA_FEED.01 // THE ENDO PROJECT" />
          <span
            className="font-mono text-[10px] uppercase tracking-[0.2em] hidden sm:block"
            style={{ color: "oklch(0.82 0.21 195 / 0.45)" }}
          >
            REC ● 16:9
          </span>
        </div>
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
        </div>
        <p
          className="text-xs tracking-wide text-center"
          style={{ color: "oklch(0.60 0.012 230)" }}
        >
          The Endo Project — a short film by Jordan P. Anderson, starring Chuck.
        </p>
      </section>

      <div className="hud-rule" />

      {/* ── SERVICES ── */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <SectionCode code="SEC.01 // CAPABILITIES" />
          <h2 className="hud-title text-2xl font-black" style={{ color: "oklch(0.94 0.005 220)" }}>
            What We Do
          </h2>
          <p className="text-sm" style={{ color: "oklch(0.60 0.012 230)" }}>
            A wide range of technical and creative services — all under one roof.
          </p>
          <HudTelemetry
            items={["SYS_OPS", "9 MODULES LOADED", "RUNTIME OK"]}
          />
        </div>

        <ServicesGrid />
      </section>

      <div className="hud-rule" />

      {/* ── CTA ── */}
      <section className="flex flex-col gap-3 pb-10">
        <SectionCode code="SEC.02 // INITIALIZE" />
        <h2
          className="hud-title text-lg font-bold"
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
