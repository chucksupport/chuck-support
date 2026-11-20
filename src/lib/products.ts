export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // in cents
  priceDisplay: string;
  category: string;
  emoji?: string;
  /** Set for subscription products; Stripe Checkout runs in subscription mode. */
  recurring?: "month";
}

export const products: Product[] = [
  {
    id: "chuckurrito",
    name: "Chuckurrito",
    description:
      "A legendary hand-crafted burrito made with love and good vibes. Fuel for the soul.",
    price: 1000,
    priceDisplay: "$10.00",
    category: "Food",
    emoji: "🌯",
  },
  {
    id: "hosting-1mo",
    name: "Hosting – Monthly",
    description:
      "Reliable web hosting managed by Chuck, billed monthly. Includes setup, monitoring, and basic support. Cancel anytime.",
    price: 5000,
    priceDisplay: "$50.00/mo",
    recurring: "month",
    category: "Hosting",
    emoji: "🖥️",
  },
  {
    id: "support-1hr",
    name: "1 Hour of Support",
    description:
      "One hour of hands-on tech support from Chuck. Troubleshooting, setup, debugging, consulting — whatever you need.",
    price: 10000,
    priceDisplay: "$100.00",
    category: "Support",
    emoji: "🛠️",
  },
  {
    id: "moral-support-1hr",
    name: "Hour of Moral Support",
    description:
      "Sometimes you just need someone in your corner. Chuck will listen, encourage, and help you think through anything.",
    price: 0,
    priceDisplay: "Pay what you can",
    category: "Support",
    emoji: "💙",
  },
];
