export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // in cents
  priceDisplay: string;
  stripePriceId: string; // set via env or real Stripe dashboard
  category: string;
  emoji?: string;
}

export const products: Product[] = [
  {
    id: "chuckurrito",
    name: "Chuckurrito",
    description:
      "A legendary hand-crafted burrito made with love and good vibes. Fuel for the soul.",
    price: 1000,
    priceDisplay: "$10.00",
    stripePriceId: process.env.STRIPE_PRICE_CHUCKURRITO ?? "price_chuckurrito",
    category: "Food",
    emoji: "🌯",
  },
  {
    id: "hosting-1mo",
    name: "Hosting – 1 Month",
    description:
      "One month of reliable web hosting managed by Chuck. Includes setup, monitoring, and basic support.",
    price: 5000,
    priceDisplay: "$50.00",
    stripePriceId: process.env.STRIPE_PRICE_HOSTING_1MO ?? "price_hosting_1mo",
    category: "Hosting",
    emoji: "🖥️",
  },
  {
    id: "moral-support-1hr",
    name: "Hour of Moral Support",
    description:
      "Sometimes you just need someone in your corner. Chuck will listen, encourage, and help you think through anything.",
    price: 0,
    priceDisplay: "Pay what you can",
    stripePriceId: process.env.STRIPE_PRICE_MORAL_SUPPORT ?? "price_moral_support",
    category: "Support",
    emoji: "💙",
  },
  {
    id: "website-build",
    name: "Website Build",
    description:
      "Full website construction from scratch. Design, development, and launch. Let's build something great.",
    price: 50000,
    priceDisplay: "$500.00",
    stripePriceId: process.env.STRIPE_PRICE_WEBSITE_BUILD ?? "price_website_build",
    category: "Services",
    emoji: "🏗️",
  },
  {
    id: "data-migration",
    name: "Data Migration",
    description:
      "Safe, clean migration of your data from old systems to new ones. Zero data left behind.",
    price: 15000,
    priceDisplay: "$150.00",
    stripePriceId: process.env.STRIPE_PRICE_DATA_MIGRATION ?? "price_data_migration",
    category: "Services",
    emoji: "📦",
  },
];
