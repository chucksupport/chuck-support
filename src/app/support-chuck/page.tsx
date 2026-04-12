import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { cn } from "@/lib/utils";

const ways = [
  {
    icon: "💳",
    title: "Buy a Service",
    desc: "The most direct way to support Chuck is to hire Chuck. Head to the Buy Support page and grab something from the catalog.",
    action: { label: "Browse Services", href: "/buy-support" },
  },
  {
    icon: "🌯",
    title: "Buy a Chuckurrito",
    desc: "For just $10, you can fund a legendary hand-crafted burrito and put a smile on Chuck's face.",
    action: { label: "Get a Chuckurrito", href: "/chuckurrito" },
  },
  {
    icon: "💙",
    title: "Hour of Moral Support",
    desc: "Pay what you can for an hour of honest conversation, encouragement, and problem-solving with Chuck.",
    action: { label: "Book a Session", href: "/buy-support" },
  },
  {
    icon: "📣",
    title: "Spread the Word",
    desc: "Know someone who needs a website, a network fixed, or audio recorded? Send them to chuck.support. Word of mouth is the best marketing.",
    action: null,
  },
  {
    icon: "⭐",
    title: "Leave a Review",
    desc: "Had a good experience? Tell someone. Online reviews, social posts, and referrals all help more than you might think.",
    action: null,
  },
  {
    icon: "🤝",
    title: "Collaborate",
    desc: "Have a project where Chuck's skills could be useful? Chuck is open to partnerships, collabs, and interesting work. Reach out.",
    action: { label: "Get in Touch", href: "/help" },
  },
];

export default function SupportChuckPage() {
  return (
    <div className="flex flex-col gap-8 px-6 py-10 max-w-4xl">
      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl font-bold text-foreground">Support Chuck</h1>
          <Badge className="bg-primary/20 text-primary border border-primary/30 text-xs">
            Keep the lights on
          </Badge>
        </div>
        <p className="text-muted-foreground text-base leading-relaxed max-w-2xl">
          Chuck Support runs lean — one person, many skills, a lot of heart.
          If this work has helped you, or if you just believe in what Chuck is
          building, here are some ways to show your support.
        </p>
        <p className="text-muted-foreground text-base leading-relaxed max-w-2xl">
          Everything here — the hosting, the skills, the time — is Chuck&apos;s
          own. Your support keeps it going and makes room for more good work.
        </p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ways.map(({ icon, title, desc, action }) => (
          <Card key={title} className="bg-card border-border hover:border-primary/40 transition-colors flex flex-col">
            <CardContent className="pt-5 pb-5 px-5 flex flex-col gap-3 flex-1">
              <span className="text-3xl">{icon}</span>
              <div className="flex flex-col gap-1 flex-1">
                <h3 className="font-semibold text-card-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
              {action && (
                <Link
                  href={action.href}
                  className={cn(
                    buttonVariants({ size: "sm" }),
                    "w-fit bg-primary text-primary-foreground hover:bg-primary/90 mt-auto"
                  )}
                >
                  {action.label} →
                </Link>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="bg-border" />

      <section className="flex flex-col gap-3 pb-10">
        <h2 className="text-lg font-semibold text-foreground">Thank You</h2>
        <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
          Seriously. Whether you buy something, refer someone, or just visited
          this site and thought &ldquo;this seems legit&rdquo; — it all matters.
          Chuck appreciates every bit of it.
        </p>
        <Link href="/" className={cn(buttonVariants({ variant: "outline" }), "w-fit")}>
          Back to Home
        </Link>
      </section>
    </div>
  );
}
