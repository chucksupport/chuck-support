import Stripe from "stripe";
import { NextRequest } from "next/server";
import { products } from "@/lib/products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_test_placeholder", {
  apiVersion: "2026-03-25.dahlia",
});

// Price IDs live server-side only. Client code never sees these env vars
// (they are not NEXT_PUBLIC_), so the client sends product ids and we map
// them here.
const PRICE_IDS: Record<string, string | undefined> = {
  chuckurrito: process.env.STRIPE_PRICE_CHUCKURRITO,
  "hosting-1mo": process.env.STRIPE_PRICE_HOSTING_1MO,
  "support-1hr": process.env.STRIPE_PRICE_SUPPORT_1HR,
  "moral-support-1hr": process.env.STRIPE_PRICE_MORAL_SUPPORT,
  // $1/month price; quantity = dollars per month (see Product.payWhatYouWant).
  "chuck-in-your-corner": process.env.STRIPE_PRICE_CORNER,
};

const MAX_PWYW_DOLLARS = 999;

interface LineItem {
  productId: string;
  quantity: number;
}

export async function POST(request: NextRequest) {
  const { items } = (await request.json()) as { items: LineItem[] };

  if (!items || items.length === 0) {
    return Response.json({ error: "No items in cart" }, { status: 400 });
  }

  const lineItems: {
    price: string;
    quantity: number;
    adjustable_quantity?: { enabled: boolean; minimum?: number; maximum?: number };
  }[] = [];
  let hasRecurring = false;
  let hasPayWhatYouCan = false;
  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);
    const price = PRICE_IDS[item.productId];
    if (!product || !price) {
      console.error(`checkout: no Stripe price configured for product "${item.productId}"`);
      return Response.json(
        { error: `Product "${item.productId}" is not available for checkout` },
        { status: 400 },
      );
    }
    let quantity = Math.max(1, Math.floor(Number(item.quantity) || 1));
    if (product.recurring) hasRecurring = true;
    if (product.price === 0) hasPayWhatYouCan = true;
    if (product.payWhatYouWant) {
      quantity = Math.min(quantity, MAX_PWYW_DOLLARS);
      // Let the customer change their monthly amount on the Stripe page too.
      lineItems.push({
        price,
        quantity,
        adjustable_quantity: { enabled: true, minimum: 1, maximum: MAX_PWYW_DOLLARS },
      });
    } else {
      lineItems.push({ price, quantity });
    }
  }

  // Stripe only allows customer-chosen amounts in one-time payment mode.
  if (hasRecurring && hasPayWhatYouCan) {
    return Response.json(
      {
        error:
          "Monthly subscriptions can't be combined with the pay-what-you-can hour in one checkout. Please check them out separately.",
      },
      { status: 400 },
    );
  }

  const origin = request.headers.get("origin") ?? "https://chuck.support";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: hasRecurring ? "subscription" : "payment",
      line_items: lineItems,
      success_url: `${origin}/buy-support?success=1`,
      cancel_url: `${origin}/buy-support?canceled=1`,
      billing_address_collection: "required",
      metadata: {
        source: "chuck.support",
      },
    });
    return Response.json({ url: session.url });
  } catch (err) {
    console.error("checkout: Stripe session creation failed", err);
    return Response.json({ error: "Unable to start checkout" }, { status: 502 });
  }
}
