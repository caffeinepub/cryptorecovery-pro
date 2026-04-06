import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bitcoin, Check, CheckCheck, Copy } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const BTC_ADDRESS = "1A1zP1eP5QGefi2DMPTfTL5SLmv7Divf";
const USDT_ADDRESS = "TMuA6YqfCeX8EhbfYEg5y7S4DqzSJireXY";

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        toast.success(`${label} address copied!`);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="flex items-center gap-1.5 px-2 py-1 rounded text-xs transition-all"
      style={{
        background: copied
          ? "oklch(0.75 0.16 65 / 0.15)"
          : "oklch(0.18 0.022 250)",
        color: copied ? "oklch(0.82 0.18 62)" : "oklch(0.6 0.015 240)",
        border: "1px solid oklch(0.75 0.16 65 / 0.2)",
      }}
    >
      {copied ? (
        <CheckCheck className="w-3 h-3" />
      ) : (
        <Copy className="w-3 h-3" />
      )}
      Copy
    </button>
  );
}

const plans = [
  {
    name: "Basic",
    price: "$450",
    description: "For standard wallet and password recovery cases",
    features: [
      "Losses up to $10,000",
      "Standard investigation",
      "3–7 business days",
      "Email support",
      "Recovery report",
    ],
    featured: false,
  },
  {
    name: "Advanced",
    price: "$2,500",
    description: "For complex private key and high-value recovery cases",
    features: [
      "Unlimited loss amount",
      "Priority investigation",
      "24–48 hour turnaround",
      "24/7 VIP support",
      "Legal assistance",
      "Money-back guarantee",
    ],
    featured: true,
  },
];

export function PricingSection() {
  const scrollToContact = () =>
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="pricing" className="relative z-10 py-24 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 text-gold font-body">
            Transparent Pricing
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Recovery Plans
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto font-body">
            No hidden fees. Pay only in BTC or USDT.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative rounded-2xl p-8 flex flex-col"
              style={{
                background: plan.featured
                  ? "linear-gradient(145deg, oklch(0.16 0.02 252), oklch(0.13 0.018 250))"
                  : "oklch(0.13 0.018 250 / 0.8)",
                border: plan.featured
                  ? "1px solid oklch(0.75 0.16 65 / 0.4)"
                  : "1px solid oklch(0.22 0.02 250)",
                boxShadow: plan.featured
                  ? "0 0 40px oklch(0.75 0.16 65 / 0.1)"
                  : undefined,
              }}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-gold text-[#050510] font-bold text-xs px-4 py-1.5 font-body tracking-wide">
                    MOST POPULAR
                  </Badge>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-display text-xl font-bold text-foreground mb-1">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground font-body">
                  {plan.description}
                </p>
              </div>

              <div className="mb-7">
                <span className="font-display text-5xl font-bold text-gradient-gold">
                  {plan.price}
                </span>
                <span className="text-muted-foreground text-sm ml-2 font-body">
                  BTC or USDT
                </span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 text-sm font-body"
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "oklch(0.75 0.16 65 / 0.15)" }}
                    >
                      <Check className="w-3 h-3 text-gold" />
                    </div>
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              {/* Payment addresses */}
              <div
                className="mb-6 rounded-xl p-4 space-y-3"
                style={{
                  background: "oklch(0.09 0.014 255)",
                  border: "1px solid oklch(0.75 0.16 65 / 0.1)",
                }}
              >
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest font-body mb-3">
                  Payment Addresses
                </p>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Bitcoin className="w-4 h-4 text-gold flex-shrink-0" />
                    <span className="text-xs font-mono text-muted-foreground truncate">
                      {BTC_ADDRESS.slice(0, 18)}…
                    </span>
                  </div>
                  <CopyButton text={BTC_ADDRESS} label="BTC" />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-xs font-bold text-green-400 flex-shrink-0">
                      ₮
                    </span>
                    <span className="text-xs font-mono text-muted-foreground truncate">
                      USDT: {USDT_ADDRESS.slice(0, 16)}…
                    </span>
                  </div>
                  <CopyButton text={USDT_ADDRESS} label="USDT" />
                </div>
              </div>

              <Button
                className={`w-full h-12 text-sm font-semibold font-body ${
                  plan.featured ? "btn-gold" : "btn-outline-gold"
                }`}
                onClick={scrollToContact}
              >
                Get Started
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
