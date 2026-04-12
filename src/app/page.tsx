import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const services = [
  { icon: "🌐", title: "Website Construction", desc: "From landing pages to full-stack apps — designed, built, and launched." },
  { icon: "📦", title: "Data Migrations", desc: "Move your data safely between platforms, databases, and systems." },
  { icon: "🔌", title: "Networking", desc: "Home and small-business network setup, configuration, and troubleshooting." },
  { icon: "🖥️", title: "Hosting", desc: "Reliable managed hosting on modern infrastructure. No surprises." },
  { icon: "💻", title: "Programming", desc: "Custom software solutions — automation, scripts, APIs, and more." },
  { icon: "🎙️", title: "Audio Recording", desc: "Professional-grade recording, mixing, and production in a creative environment." },
  { icon: "⛓️", title: "Blockchain & Crypto", desc: "Web3 development, wallet integrations, smart contracts, and crypto consulting." },
  { icon: "☀️", title: "Renewable Energy", desc: "Solar, battery storage, and off-grid power consulting for homes and builds." },
  { icon: "🏗️", title: "Sustainable Building", desc: "Eco-conscious construction consulting — materials, design, and systems." },
];

export default function HomePage() {
  return (
    <div className="flex flex-col gap-10 px-6 py-10 max-w-4xl">
      {/* Hero */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Chuck Support
          </h1>
          <Badge className="bg-primary/20 text-primary border border-primary/30 text-xs">
            Full-Service Digital Agency
          </Badge>
        </div>

        <p className="text-muted-foreground text-base leading-relaxed max-w-2xl">
          Welcome to Chuck Support — where technology meets craftsmanship.
          Whether you need a website built from scratch, your data moved safely
          to a new home, a network that actually works, or a custom piece of
          software that solves a real problem: this is the place.
        </p>

        <p className="text-muted-foreground text-base leading-relaxed max-w-2xl">
          Chuck Support is a one-person agency with zero bureaucracy, deep
          technical chops, and a genuine commitment to doing the job right.
          From the first conversation to the final deploy — you work directly
          with Chuck.
        </p>
      </section>

      <Separator className="bg-border" />

      {/* YouTube embed */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border bg-muted">
        <iframe
          src="https://www.youtube.com/embed/3A350q6LUIk"
          title="The Endo Project by Jordan P. Anderson"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>

      <Separator className="bg-border" />

      {/* Services grid */}
      <section className="flex flex-col gap-5">
        <h2 className="text-xl font-semibold text-foreground">What We Do</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map(({ icon, title, desc }) => (
            <Card
              key={title}
              className="bg-card border-border hover:border-primary/40 transition-colors"
            >
              <CardContent className="pt-5 pb-5 px-5 flex flex-col gap-2">
                <span className="text-2xl">{icon}</span>
                <h3 className="font-semibold text-sm text-card-foreground">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="bg-border" />

      {/* CTA */}
      <section className="flex flex-col gap-3 pb-10">
        <h2 className="text-lg font-semibold text-foreground">Ready to get started?</h2>
        <p className="text-sm text-muted-foreground max-w-xl">
          Head to the{" "}
          <a href="/buy-support" className="text-primary underline underline-offset-2">
            Buy Support
          </a>{" "}
          page to browse services, or visit the{" "}
          <a href="/help" className="text-primary underline underline-offset-2">
            Help
          </a>{" "}
          page to get in touch.
        </p>
      </section>
    </div>
  );
}
