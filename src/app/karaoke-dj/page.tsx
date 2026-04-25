import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl font-bold text-foreground">Karaoke & DJ</h1>
          <Badge className="bg-primary/20 text-primary border border-primary/30 text-xs">
            Events & Entertainment
          </Badge>
        </div>
        <p className="text-muted-foreground text-base leading-relaxed max-w-2xl">
          Music is a core part of what Chuck does. Whether you need a karaoke
          night for your crew, a DJ for your event, or just someone who really
          knows how to read a room and keep the energy right — Chuck has you
          covered.
        </p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {offerings.map(({ icon, title, desc }) => (
          <Card key={title} className="bg-card border-border hover:border-primary/40 transition-colors">
            <CardContent className="pt-5 pb-5 px-5 flex flex-col gap-2">
              <span className="text-3xl">{icon}</span>
              <h3 className="font-semibold text-card-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="bg-border" />

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-foreground">FAQ</h2>
        <div className="flex flex-col gap-4">
          {faqs.map(({ q, a }) => (
            <div key={q} className="flex flex-col gap-1">
              <p className="text-sm font-medium text-foreground">{q}</p>
              <p className="text-sm text-muted-foreground">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <Separator className="bg-border" />

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-foreground">Book Chuck for Your Event</h2>
        <p className="text-sm text-muted-foreground max-w-xl">
          Reach out through the Help page to discuss your event, dates, and
          pricing. Most bookings are custom-quoted based on duration and setup.
        </p>
        <div className="flex gap-3">
          <Link
            href="/help"
            className={cn(buttonVariants(), "bg-primary text-primary-foreground hover:bg-primary/90")}
          >
            Get in Touch
          </Link>
          <Link href="/buy-support" className={buttonVariants({ variant: "outline" })}>
            Browse Services
          </Link>
        </div>
      </section>
    </div>
  );
}
