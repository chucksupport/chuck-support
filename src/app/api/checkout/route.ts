import Stripe from "stripe";
import { NextRequest } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_test_placeholder", {
  apiVersion: "2026-03-25.dahlia",
});

interface LineItem {
  stripePriceId: string;
  quantity: number;
}

export async function POST(request: NextRequest) {
  const { items } = (await request.json()) as { items: LineItem[] };

  if (!items || items.length === 0) {
    return Response.json({ error: "No items in cart" }, { status: 400 });
  }

  const origin = request.headers.get("origin") ?? "https://chuck.support";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: items.map((item) => ({
      price: item.stripePriceId,
      quantity: item.quantity,
    })),
    success_url: `${origin}/buy-support?success=1`,
    cancel_url: `${origin}/buy-support?canceled=1`,
    billing_address_collection: "required",
    metadata: {
      source: "chuck.support",
    },
  });

  return Response.json({ url: session.url });
}
