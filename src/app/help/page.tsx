import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { HudPageHeader } from "@/components/HudPageHeader";
import { HudPanel } from "@/components/HudPanel";

const contactMethods = [
  {
    icon: "✉️",
    title: "Email",
    desc: "Best for detailed project inquiries, scoping, or anything that needs a written record.",
    value: "chuck@chuck.support",
    href: "mailto:chuck@chuck.support",
    action: "Send Email",
  },
];

const faqItems = [
  {
    q: "What kinds of projects do you take on?",
    a: "Almost anything in the tech space — websites, apps, networking, data work, audio, and more. If you're not sure whether it fits, just ask.",
  },
  {
    q: "How does pricing work?",
    a: "Catalog items have fixed prices. Custom projects are quoted after a conversation to understand scope. No hidden fees.",
  },
  {
    q: "How long do projects take?",
    a: "Depends on the project. Simple websites can be ready in days. Larger systems take longer. Chuck will give you a realistic timeline upfront.",
  },
  {
    q: "Do you offer ongoing support/maintenance?",
    a: "Yes. Hosting includes basic support. Ongoing maintenance agreements can be arranged for websites and systems.",
  },
  {
    q: "What if I'm not happy with the work?",
    a: "Chuck stands behind the work. If something isn't right, we'll fix it. Communication is key — let Chuck know and it'll get sorted.",
  },
  {
    q: "Can I pay in crypto?",
    a: "Yes. Chuck is familiar with crypto and can arrange payment that way if preferred.",
  },
];

export default function HelpPage() {
  return (
    <div className="flex flex-col gap-8 px-6 py-10 max-w-4xl w-full mx-auto">
      <HudPageHeader
        code="SEC.06 // COMMS"
        title="Help"
        chip="Get in touch"
        telemetry={["CHANNEL: DIRECT", "HUMAN: CONFIRMED", "BOTS: 0"]}
      >
        Have a question, a project idea, or just want to talk through
        something? Chuck is a real person and responds personally. No bots,
        no ticket queues.
      </HudPageHeader>

      {/* Contact methods */}
      <div className="flex flex-col gap-4">
        {contactMethods.map(({ icon, title, desc, value, href, action }, i) => (
          <HudPanel
            key={title}
            label={`COMM_CHANNEL.${String(i + 1).padStart(2, "0")}`}
            labelRight="ENCRYPTED"
          >
            <div className="px-5 pt-3 pb-5 flex flex-col sm:flex-row sm:items-center gap-4">
              <span className="text-3xl">{icon}</span>
              <div className="flex flex-col gap-1 flex-1">
                <h3 className="font-semibold text-card-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
                <p className="text-sm text-primary font-mono">{value}</p>
              </div>
              <span className="hud-btn-glow">
                <a
                  href={href}
                  className={cn(
                    buttonVariants(),
                    "hud-btn bg-primary text-primary-foreground hover:bg-primary/90 w-fit",
                  )}
                >
                  {action}
                </a>
              </span>
            </div>
          </HudPanel>
        ))}
      </div>

      <div className="hud-rule" />

      {/* FAQ */}
      <section className="flex flex-col gap-5">
        <h2 className="hud-title text-lg font-semibold text-foreground">
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col gap-5">
          {faqItems.map(({ q, a }, i) => (
            <div key={q} className="flex gap-4">
              <span
                className="font-mono text-[11px] pt-0.5 shrink-0"
                style={{ color: "oklch(0.82 0.21 195 / 0.6)" }}
              >
                Q.{String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-1.5">
                <p className="text-sm font-semibold text-foreground">{q}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="hud-rule" />

      {/* Quick links */}
      <section className="flex flex-col gap-3 pb-10">
        <h2 className="hud-title text-lg font-semibold text-foreground">Quick Links</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/buy-support" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "hud-btn")}>
            Buy Support
          </Link>
          <Link href="/support-chuck" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "hud-btn")}>
            Support Chuck
          </Link>
          <Link href="/chuckurrito" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "hud-btn")}>
            Chuckurrito
          </Link>
          <Link href="/karaoke-dj" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "hud-btn")}>
            Karaoke / DJ
          </Link>
        </div>
      </section>
    </div>
  );
}
