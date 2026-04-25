"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const fiatMethods = [
  {
    icon: "🅿️",
    name: "PayPal",
    handle: "paypal.me/ChuckGrigsby",
    url: "https://paypal.me/ChuckGrigsby",
    color: "bg-[#003087]",
  },
  {
    icon: "💸",
    name: "Venmo",
    handle: "@Chuck-Grigsby",
    url: "https://venmo.com/Chuck-Grigsby",
    color: "bg-[#3d95ce]",
  },
  {
    icon: "💵",
    name: "Cash App",
    handle: "$ChuckGrigsby",
    url: "https://cash.me/$ChuckGrigsby",
    color: "bg-[#00d632]",
  },
];

const cryptoAddresses = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    address: "bc1qppe66rvem08hunaeka0tlvcw6fvuj8hr3vyy8p",
    icon: "₿",
    color: "bg-[#f7931a]",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    address: "0x00692d0ac5cf9690bb010141a3ea5d0cbbeade41",
    icon: "Ξ",
    color: "bg-[#627eea]",
  },
  {
    symbol: "LTC",
    name: "Litecoin",
    address: "LapbgFmtUUxw1No2fmuTNyo7HyNA6USfLv",
    icon: "Ł",
    color: "bg-[#bfbbbb]",
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <button
      onClick={handleCopy}
      className="shrink-0 text-xs px-2.5 py-1 rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

export default function SupportChuckPage() {
  const [tab, setTab] = useState<"fiat" | "crypto">("fiat");

  return (
    <div className="flex flex-col gap-8 px-6 py-10 max-w-2xl w-full mx-auto">
      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl font-bold text-foreground">Support Chuck</h1>
          <Badge className="bg-primary/20 text-primary border border-primary/30 text-xs">
            Donations
          </Badge>
        </div>
        <p className="text-muted-foreground text-base leading-relaxed">
          If Chuck has helped you out or you just want to show some love, any
          amount is appreciated. Choose your preferred platform below.
        </p>
      </section>

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg bg-muted p-1 w-fit">
        <button
          onClick={() => setTab("fiat")}
          className={[
            "px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
            tab === "fiat"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          ].join(" ")}
        >
          Fiat Currency
        </button>
        <button
          onClick={() => setTab("crypto")}
          className={[
            "px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
            tab === "crypto"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          ].join(" ")}
        >
          Cryptocurrency
        </button>
      </div>

      {/* Fiat tab */}
      {tab === "fiat" && (
        <div className="flex flex-col gap-4">
          {fiatMethods.map(({ icon, name, handle, url, color }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-4 hover:border-primary/40 transition-colors group"
            >
              <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center text-2xl shrink-0`}>
                {icon}
              </div>
              <div className="flex flex-col gap-0.5 flex-1">
                <span className="font-semibold text-card-foreground">{name}</span>
                <span className="text-sm text-muted-foreground font-mono">{handle}</span>
              </div>
              <span className="text-muted-foreground group-hover:text-primary transition-colors text-lg">→</span>
            </a>
          ))}
        </div>
      )}

      {/* Crypto tab */}
      {tab === "crypto" && (
        <div className="flex flex-col gap-4">
          {cryptoAddresses.map(({ symbol, name, address, icon, color }) => (
            <div
              key={symbol}
              className="flex flex-col gap-3 rounded-xl border border-border bg-card px-5 py-4"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center font-bold text-white text-lg shrink-0`}>
                  {icon}
                </div>
                <div>
                  <span className="font-semibold text-card-foreground">{name}</span>
                  <span className="ml-2 text-xs text-muted-foreground">{symbol}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2">
                <span className="text-xs font-mono text-muted-foreground break-all flex-1">
                  {address}
                </span>
                <CopyButton text={address} />
              </div>
            </div>
          ))}
        </div>
      )}

      <Separator className="bg-border" />

      <p className="text-sm text-muted-foreground leading-relaxed pb-6">
        Thank you. Every bit helps keep Chuck Support running.
        If you&apos;d rather pay for a specific service, head to the{" "}
        <a href="/buy-support" className="text-primary underline underline-offset-2">
          Buy Support
        </a>{" "}
        page.
      </p>
    </div>
  );
}
