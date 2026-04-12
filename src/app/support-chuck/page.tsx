import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const donationMethods = [
  {
    icon: "💸",
    name: "Venmo",
    handle: "@chucksupport",
    url: "https://venmo.com/chucksupport",
    color: "bg-[#3d95ce]",
  },
  {
    icon: "💵",
    name: "Cash App",
    handle: "$chucksupport",
    url: "https://cash.app/$chucksupport",
    color: "bg-[#00d632]",
  },
  {
    icon: "🅿️",
    name: "PayPal",
    handle: "paypal.me/chucksupport",
    url: "https://paypal.me/chucksupport",
    color: "bg-[#003087]",
  },
];

export default function SupportChuckPage() {
  return (
    <div className="flex flex-col gap-8 px-6 py-10 max-w-2xl">
      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl font-bold text-foreground">Support Chuck</h1>
          <Badge className="bg-primary/20 text-primary border border-primary/30 text-xs">
            Donations
          </Badge>
        </div>
        <p className="text-muted-foreground text-base leading-relaxed">
          If Chuck has helped you out or you just want to show some love, any
          amount is appreciated. Choose your preferred platform below.
        </p>
      </section>

      <div className="flex flex-col gap-4">
        {donationMethods.map(({ icon, name, handle, url, color }) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-4 hover:border-primary/40 transition-colors group"
          >
            <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center text-2xl shrink-0`}>
              {icon}
            </div>
            <div className="flex flex-col gap-0.5 flex-1">
              <span className="font-semibold text-card-foreground">{name}</span>
              <span className="text-sm text-muted-foreground font-mono">{handle}</span>
            </div>
            <span className="text-muted-foreground group-hover:text-primary transition-colors text-lg">→</span>
          </a>
        ))}
      </div>

      <Separator className="bg-border" />

      <p className="text-sm text-muted-foreground leading-relaxed pb-6">
        Thank you. Every bit helps keep Chuck Support running.
        If you&apos;d rather pay for a specific service, head to the{" "}
        <a href="/buy-support" className="text-primary underline underline-offset-2">
          Buy Support
        </a>{" "}
        page.
      </p>
    </div>
  );
}
