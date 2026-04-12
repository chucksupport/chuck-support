import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { cn } from "@/lib/utils";

const ingredients = [
  "Large flour tortilla, perfectly warmed",
  "Rice (seasoned, always fluffy)",
  "Black beans (or pinto — your call)",
  "Grilled protein of choice",
  "Fresh pico de gallo",
  "House-made guac (not extra — never extra)",
  "Sour cream",
  "Shredded cheese blend",
  "Hot sauce (optional but recommended)",
  "Love and good intentions",
];

const testimonials = [
  {
    name: "A Satisfied Human",
    quote: "I don't know how he does it but this is the best burrito I've ever had.",
  },
  {
    name: "Local Burrito Enthusiast",
    quote: "The Chuckurrito is an experience. It's not just food — it's a statement.",
  },
  {
    name: "Friend of Chuck",
    quote: "Ten dollars. That's all. Ten dollars for something this good. Unreal.",
  },
];

export default function ChuckurritoPage() {
  return (
    <div className="flex flex-col gap-8 px-6 py-10 max-w-4xl">
      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl font-bold text-foreground">
            🌯 The Chuckurrito
          </h1>
          <Badge className="bg-primary/20 text-primary border border-primary/30 text-xs">
            $10.00
          </Badge>
        </div>
        <p className="text-muted-foreground text-base leading-relaxed max-w-2xl">
          The Chuckurrito is not just a burrito. It is a philosophy. Hand-crafted,
          generously stuffed, and wrapped with the kind of care that only comes
          from someone who genuinely believes in what they&apos;re making.
        </p>
        <p className="text-muted-foreground text-base leading-relaxed max-w-2xl">
          Born from necessity, perfected through iteration, the Chuckurrito is
          the kind of meal that makes you slow down and actually taste your food.
        </p>
      </section>

      <Separator className="bg-border" />

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-foreground">What&apos;s Inside</h2>
        <Card className="bg-card border-border max-w-md">
          <CardContent className="pt-5 pb-5 px-5">
            <ul className="flex flex-col gap-2">
              {ingredients.map((ing) => (
                <li key={ing} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>{ing}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <p className="text-xs text-muted-foreground">
          * Actual ingredients may vary. Chuck improvises. It&apos;s always good.
        </p>
      </section>

      <Separator className="bg-border" />

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-foreground">What People Are Saying</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {testimonials.map(({ name, quote }) => (
            <Card key={name} className="bg-card border-border">
              <CardContent className="pt-5 pb-5 px-5 flex flex-col gap-2">
                <p className="text-sm text-muted-foreground italic leading-relaxed">
                  &ldquo;{quote}&rdquo;
                </p>
                <p className="text-xs text-primary font-medium">— {name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="bg-border" />

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-foreground">Get Your Chuckurrito</h2>
        <p className="text-sm text-muted-foreground max-w-xl">
          Only $10. Available by request — order through the Buy Support page
          or reach out directly. Delivery and availability depend on location
          and Chuck&apos;s schedule.
        </p>
        <div className="flex gap-3">
          <Link
            href="/buy-support"
            className={cn(buttonVariants(), "bg-primary text-primary-foreground hover:bg-primary/90")}
          >
            Order Now — $10
          </Link>
          <Link href="/help" className={buttonVariants({ variant: "outline" })}>
            Ask Chuck
          </Link>
        </div>
      </section>
    </div>
  );
}
