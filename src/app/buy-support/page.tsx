"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { HudPageHeader } from "@/components/HudPageHeader";
import { useCart } from "@/contexts/CartContext";
import { products, type Product } from "@/lib/products";

const PWYW_PRESETS = [3, 5, 10, 20];

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { addItem, items, removeItem } = useCart();
  const cartItem = items.find((i) => i.product.id === product.id);
  // Dollars per month for pay-what-you-want subscriptions (quantity of a $1 price).
  const [amount, setAmount] = useState(5);

  return (
    <div className="hud-panel hud-panel--lift flex flex-col">
      <div className="flex items-center justify-between gap-3 px-5 pt-4">
        <span className="hud-label">{product.category}</span>
        <span
          className="font-mono text-[10px] uppercase tracking-[0.2em]"
          style={{ color: "oklch(0.82 0.21 195 / 0.45)" }}
        >
          UNIT.{String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="px-5 pt-3 pb-2 flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{product.emoji}</span>
          <h3 className="text-base font-bold leading-tight text-card-foreground">
            {product.name}
          </h3>
        </div>
        <span className="font-mono text-lg font-bold text-primary whitespace-nowrap"
          style={{ textShadow: "0 0 16px var(--px-40)" }}
        >
          {product.priceDisplay}
        </span>
      </div>
      <div className="px-5 pb-5 flex flex-col gap-4 flex-1">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {product.description}
        </p>
        <div className="mt-auto">
          {cartItem ? (
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                In cart: {product.payWhatYouWant ? `$${cartItem.quantity}/mo` : cartItem.quantity}
              </span>
              {!product.payWhatYouWant && (
                <Button
                  size="sm"
                  variant="outline"
                  className="ml-auto"
                  onClick={() => addItem(product)}
                >
                  + Add more
                </Button>
              )}
              <Button
                size="sm"
                variant="destructive"
                className={product.payWhatYouWant ? "ml-auto" : undefined}
                onClick={() => removeItem(product.id)}
              >
                Remove
              </Button>
            </div>
          ) : product.payWhatYouWant ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                {PWYW_PRESETS.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setAmount(n)}
                    className={
                      "flex-1 rounded border px-2 py-1 font-mono text-xs transition-colors " +
                      (amount === n
                        ? "border-primary text-primary"
                        : "border-border text-muted-foreground hover:text-foreground")
                    }
                  >
                    ${n}
                  </button>
                ))}
                <label className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
                  $
                  <input
                    type="number"
                    min={1}
                    max={999}
                    step={1}
                    value={amount}
                    onChange={(e) =>
                      setAmount(Math.min(999, Math.max(1, Math.floor(Number(e.target.value) || 1))))
                    }
                    className="w-16 rounded border border-border bg-transparent px-2 py-1 text-right text-foreground"
                    aria-label="Dollars per month"
                  />
                  /mo
                </label>
              </div>
              <Button
                className="hud-btn w-full bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => addItem(product, amount)}
              >
                Add ${amount}/mo to Cart
              </Button>
            </div>
          ) : (
            <Button
              className="hud-btn w-full bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => addItem(product)}
            >
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function CartSummary() {
  const { items, totalItems, totalPrice, clearCart, updateQuantity } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="hud-panel p-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          CART_MANIFEST: EMPTY — add something below
        </p>
      </div>
    );
  }

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.product.id,
            quantity: i.quantity,
          })),
        }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error || "Checkout failed");
      window.location.href = data.url;
    } catch (err) {
      setError(
        err instanceof Error && err.message !== "Checkout failed"
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="hud-panel flex flex-col gap-4 p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="hud-label">CART_MANIFEST</span>
        <span
          className="font-mono text-[10px] uppercase tracking-[0.2em]"
          style={{ color: "oklch(0.82 0.21 195 / 0.45)" }}
        >
          {totalItems} ITEM{totalItems !== 1 ? "S" : ""}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <div key={item.product.id} className="flex items-center gap-3 text-sm">
            <span>{item.product.emoji}</span>
            <span className="flex-1 text-card-foreground">{item.product.name}</span>
            <div className="flex items-center gap-1">
              <button
                className="w-6 h-6 rounded text-muted-foreground hover:text-foreground border border-border text-xs"
                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
              >
                −
              </button>
              <span className="min-w-6 text-center font-mono">
                {item.product.payWhatYouWant ? `$${item.quantity}` : item.quantity}
              </span>
              <button
                className="w-6 h-6 rounded text-muted-foreground hover:text-foreground border border-border text-xs"
                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              >
                +
              </button>
            </div>
            <span className="text-muted-foreground w-20 text-right font-mono text-xs">
              {item.product.price > 0
                ? `${((item.product.price * item.quantity) / 100).toFixed(2)}${item.product.recurring ? "/mo" : ""}`
                : "Pay what you can"}
            </span>
          </div>
        ))}
      </div>
      <Separator className="bg-border" />
      <div className="flex justify-between text-sm font-semibold">
        <span className="font-mono uppercase tracking-wider">Total</span>
        <span
          className="text-primary font-mono"
          style={{ textShadow: "0 0 16px var(--px-40)" }}
        >
          ${(totalPrice / 100).toFixed(2)}
          {items.some((i) => i.product.price === 0) && " + donation"}
          {items.some((i) => i.product.recurring) && " · renews monthly"}
        </span>
      </div>
      {error && <p className="text-destructive text-sm">{error}</p>}
      <Button
        className="hud-pulse w-full bg-primary text-primary-foreground hover:bg-primary/90"
        onClick={handleCheckout}
        disabled={loading}
      >
        {loading ? "Redirecting to Stripe…" : "Checkout with Stripe →"}
      </Button>
      <button
        className="text-xs text-muted-foreground hover:text-foreground text-center"
        onClick={clearCart}
      >
        Clear cart
      </button>
    </div>
  );
}

export default function BuySupportPage() {
  return (
    <div className="flex flex-col gap-8 px-6 py-10 max-w-4xl w-full mx-auto">
      <HudPageHeader
        code="SEC.02 // BUY_SUPPORT"
        title="Buy Support"
        chip="Stripe Secured"
        telemetry={["PAYMENT_GATEWAY: ARMED", { kind: "latency" }]}
      >
        Browse services, add what you need, and check out securely via Stripe.
      </HudPageHeader>

      <CartSummary />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </div>
  );
}
