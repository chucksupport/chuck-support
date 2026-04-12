# Chuck Support

**chuck.support** — Full-Service Digital Agency

A modern Next.js website replacing the previous WordPress installation. Built with Next.js App Router, shadcn/ui, Tailwind CSS, TypeScript, and Stripe for payments.

---

## Stack

| Layer | Tech |
|-------|------|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| UI Components | [shadcn/ui](https://ui.shadcn.com) |
| Styling | Tailwind CSS v4 |
| Language | TypeScript |
| Payments | [Stripe](https://stripe.com) |
| Deployment | [Render](https://render.com) |

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — services overview, YouTube embed, hero |
| `/buy-support` | Product catalog with Stripe checkout |
| `/karaoke-dj` | Karaoke and DJ events page |
| `/chuckurrito` | The legendary Chuckurrito |
| `/support-chuck` | Ways to support Chuck |
| `/help` | FAQ and contact |

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your real Stripe keys and price IDs.

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Stripe Setup

1. Go to your [Stripe Dashboard](https://dashboard.stripe.com)
2. Create a product for each item in `src/lib/products.ts`
3. Copy each **Price ID** (starts with `price_`) into `.env.local`
4. For testing, use `sk_test_` and `pk_test_` keys
5. For production, swap to live keys in Render environment settings

---

## Deployment on Render

1. Push to GitHub
2. In [Render](https://render.com), create a new **Web Service** from the repo
3. Render will detect `render.yaml` automatically
4. Set the Stripe env vars in **Environment** in the Render dashboard
5. Deploy

---

## Customization Checklist

- [ ] Replace YouTube embed URL in `src/app/page.tsx` (search for `dQw4w9WgXcQ`)
- [ ] Add a real profile photo — update `src/components/Sidebar.tsx` (look for the emoji placeholder)
- [ ] Set real Stripe price IDs in `.env.local` / Render env vars
- [ ] Update contact email in `src/app/help/page.tsx` if needed
- [ ] Add `public/` assets (profile photo, favicon, OG image)

---

## Project Structure

```
src/
├── app/
│   ├── api/checkout/route.ts   # Stripe checkout session endpoint
│   ├── buy-support/page.tsx    # Shop page
│   ├── chuckurrito/page.tsx
│   ├── help/page.tsx
│   ├── karaoke-dj/page.tsx
│   ├── support-chuck/page.tsx
│   ├── globals.css             # Dark steel-blue theme
│   ├── layout.tsx              # Root layout with sidebar
│   └── page.tsx                # Homepage
├── components/
│   ├── Sidebar.tsx             # Left sidebar nav
│   └── ui/                     # shadcn/ui components
├── contexts/
│   └── CartContext.tsx         # Cart state (client-side)
└── lib/
    ├── products.ts             # Product catalog
    └── utils.ts
```
