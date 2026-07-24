import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { HudPageHeader } from "@/components/HudPageHeader";
import { HudPanel } from "@/components/HudPanel";

const offerings = [
  {
    icon: "🎤",
    title: "Private Karaoke Events",
    desc: "Bring the party home (or anywhere). Chuck will set up and run a full karaoke night for your group — song library, sound system, and hype included.",
  },
  {
    icon: "🎧",
    title: "DJ Sets",
    desc: "From chill background vibes to dance-floor energy — custom DJ sets for parties, events, and gatherings of any size.",
  },
  {
    icon: "🎵",
    title: "Custom Playlists & Mixing",
    desc: "Need a curated playlist for a specific mood or event? Chuck will mix and sequence a set that fits perfectly.",
  },
  {
    icon: "🔊",
    title: "Sound System Rental",
    desc: "Quality speakers, mic stands, and PA equipment available for events. Setup and teardown included.",
  },
];

const faqs = [
  {
    q: "What area do you service?",
    a: "Primarily the local area — reach out and Chuck will let you know if your location works.",
  },
  {
    q: "How far in advance do I need to book?",
    a: "At least a week for most events; more lead time is better for larger bookings.",
  },
  {
    q: "What genres do you cover?",
    a: "Everything. Seriously — from classic rock to hip hop, country to EDM, old school R&B to pop. Chuck knows music.",
  },
  {
    q: "Do you take song requests?",
    a: "Always. The vibe is collaborative — you set the tone, Chuck keeps it going.",
  },
];

export default function KaraokeDJPage() {
  return (
    <div className="flex flex-col gap-8 px-6 py-10 max-w-4xl w-full mx-auto">
      <HudPageHeader
        code="SEC.03 // AUDIO_OPS"
        title="Karaoke & DJ"
        chip="Events & Entertainment"
        telemetry={["SOUND_SYSTEM: READY", "DECIBELS: YES", { kind: "uptime" }]}
      >
        Music is a core part of what Chuck does. Whether you need a karaoke
        night for your crew, a DJ for your event, or just someone who really
        knows how to read a room and keep the energy right — Chuck has you
        covered.
      </HudPageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {offerings.map(({ icon, title, desc }, i) => (
          <HudPanel
            key={title}
            label={`MOD.${String(i + 1).padStart(2, "0")}`}
            lift
          >
            <div className="px-5 pt-3 pb-5 flex flex-col gap-2">
              <span className="text-3xl">{icon}</span>
              <h3 className="font-semibold text-card-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          </HudPanel>
        ))}
      </div>

      <div className="hud-rule" />

      <section className="flex flex-col gap-4">
        <h2 className="hud-title text-lg font-semibold text-foreground">FAQ</h2>
        <div className="flex flex-col gap-4">
          {faqs.map(({ q, a }, i) => (
            <div key={q} className="flex gap-4">
              <span
                className="font-mono text-[11px] pt-0.5 shrink-0"
                style={{ color: "oklch(0.82 0.21 195 / 0.6)" }}
              >
                Q.{String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-foreground">{q}</p>
                <p className="text-sm text-muted-foreground">{a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="hud-rule" />

      <section className="flex flex-col gap-3">
        <h2 className="hud-title text-lg font-semibold text-foreground">
          Book Chuck for Your Event
        </h2>
        <p className="text-sm text-muted-foreground max-w-xl">
          Reach out through the Help page to discuss your event, dates, and
          pricing. Most bookings are custom-quoted based on duration and setup.
        </p>
        <div className="flex gap-3">
          <span className="hud-btn-glow">
            <Link
              href="/help"
              className={cn(buttonVariants(), "hud-btn bg-primary text-primary-foreground hover:bg-primary/90")}
            >
              Get in Touch
            </Link>
          </span>
          <Link href="/buy-support" className={cn(buttonVariants({ variant: "outline" }), "hud-btn")}>
            Browse Services
          </Link>
        </div>
      </section>
    </div>
  );
}
