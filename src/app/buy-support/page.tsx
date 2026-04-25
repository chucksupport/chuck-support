"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { products, type Product } from "@/lib/products";

function ProductCard({ product }: { product: Product }) {
  const { addItem, items, removeItem } = useCart();
  const cartItem = items.find((i) => i.product.id === product.id);

  return (
    <Card className="bg-card border-border flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-3xl">{product.emoji}</span>
            <div>
              <CardTitle className="text-base text-card-foreground leading-tight">
                {product.name}
              </CardTitle>
              <Badge className="mt-1 text-xs bg-muted text-muted-foreground border-0">
                {product.category}
              </Badge>
            </div>
          </div>
          <span className="text-lg font-bold text-primary whitespace-nowrap">
            {product.priceDisplay}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {product.description}
        </p>
        <div className="mt-auto">
          {cartItem ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                In cart: {cartItem.quantity}
              </span>
              <Button
                size="sm"
                variant="outline"
                className="ml-auto"
                onClick={() => addItem(product)}
              >
                + Add more
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => removeItem(product.id)}
              >
                Remove
              </Button>
            </div>
          ) : (
            <Button
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => addItem(product)}
            >
              Add to Cart
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function CartSummary() {
  const { items, totalItems, totalPrice, clearCart, updateQuantity } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
        Your cart is empty. Add something above!
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
            stripePriceId: i.product.stripePriceId,
            quantity: i.quantity,
          })),
        }),
      });
      if (!res.ok) throw new Error("Checkout failed");
      const { url } = await res.json() as { url: string };
      window.location.href = url;
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6 flex flex-col gap-4">
      <h2 className="font-semibold text-card-foreground">
        Cart ({totalItems} item{totalItems !== 1 ? "s" : ""})
      </h2>
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
              <span className="w-6 text-center">{item.quantity}</span>
              <button
                className="w-6 h-6 rounded text-muted-foreground hover:text-foreground border border-border text-xs"
                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              >
                +
              </button>
            </div>
            <span className="text-muted-foreground w-20 text-right">
              {item.product.price > 0
                ? `$${((item.product.price * item.quantity) / 100).toFixed(2)}`
                : "Pay what you can"}
            </span>
          </div>
        ))}
      </div>
      <Separator className="bg-border" />
      <div className="flex justify-between text-sm font-semibold">
        <span>Total</span>
        <span className="text-primary">
          ${(totalPrice / 100).toFixed(2)}
          {items.some((i) => i.product.price === 0) && " + donation"}
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
      <div>
        <h1 className="text-2xl font-bold text-foreground">Buy Support</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Browse services, add what you need, and check out securely via Stripe.
        </p>
      </div>

      <CartSummary />

      <Separator className="bg-border" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
