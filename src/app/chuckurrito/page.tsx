import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { HudPageHeader } from "@/components/HudPageHeader";
import { HudPanel } from "@/components/HudPanel";

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
    <div className="flex flex-col gap-8 px-6 py-10 max-w-4xl w-full mx-auto">
      <HudPageHeader
        code="SEC.04 // CLASSIFIED_CUISINE"
        title="The Chuckurrito"
        chip="$10.00"
        telemetry={["PAYLOAD: DELICIOUS", "TORTILLA_INTEGRITY: 100%"]}
      >
        <p>
          🌯 The Chuckurrito is not just a burrito. It is a philosophy. Hand-crafted,
          generously stuffed, and wrapped with the kind of care that only comes
          from someone who genuinely believes in what they&apos;re making.
        </p>
        <p className="mt-3">
          Born from necessity, perfected through iteration, the Chuckurrito is
          the kind of meal that makes you slow down and actually taste your food.
        </p>
      </HudPageHeader>

      <section className="flex flex-col gap-4">
        <h2 className="hud-title text-lg font-semibold text-foreground">
          What&apos;s Inside
        </h2>
        <HudPanel label="COMPONENT_MANIFEST" labelRight="10 MODULES" className="max-w-md">
          <div className="px-5 pt-3 pb-5">
            <ul className="flex flex-col gap-2">
              {ingredients.map((ing, i) => (
                <li key={ing} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span
                    className="font-mono text-[10px] pt-0.5 shrink-0"
                    style={{ color: "oklch(0.82 0.21 195 / 0.6)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-primary mt-0.5">✓</span>
                  <span>{ing}</span>
                </li>
              ))}
            </ul>
          </div>
        </HudPanel>
        <p className="text-xs text-muted-foreground">
          * Actual ingredients may vary. Chuck improvises. It&apos;s always good.
        </p>
      </section>

      <div className="hud-rule" />

      <section className="flex flex-col gap-4">
        <h2 className="hud-title text-lg font-semibold text-foreground">
          What People Are Saying
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {testimonials.map(({ name, quote }, i) => (
            <HudPanel key={name} label={`FIELD_REPORT.${String(i + 1).padStart(2, "0")}`} lift>
              <div className="px-5 pt-3 pb-5 flex flex-col gap-2">
                <p className="text-sm text-muted-foreground italic leading-relaxed">
                  &ldquo;{quote}&rdquo;
                </p>
                <p className="text-xs text-primary font-medium">— {name}</p>
              </div>
            </HudPanel>
          ))}
        </div>
      </section>

      <div className="hud-rule" />

      <section className="flex flex-col gap-3">
        <h2 className="hud-title text-lg font-semibold text-foreground">
          Get Your Chuckurrito
        </h2>
        <p className="text-sm text-muted-foreground max-w-xl">
          Only $10. Available by request — order through the Buy Support page
          or reach out directly. Delivery and availability depend on location
          and Chuck&apos;s schedule.
        </p>
        <div className="flex gap-3">
          <span className="hud-btn-glow">
            <Link
              href="/buy-support"
              className={cn(buttonVariants(), "hud-btn bg-primary text-primary-foreground hover:bg-primary/90")}
            >
              Order Now — $10
            </Link>
          </span>
          <Link href="/help" className={cn(buttonVariants({ variant: "outline" }), "hud-btn")}>
            Ask Chuck
          </Link>
        </div>
      </section>
    </div>
  );
}
