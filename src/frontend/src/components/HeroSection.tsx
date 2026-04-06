import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  Globe,
  Lock,
  Shield,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const TRUST_BADGES = [
  { icon: Lock, label: "256-bit Encryption" },
  { icon: Zap, label: "24-48hr Response" },
  { icon: CheckCircle, label: "94% Success Rate" },
  { icon: Globe, label: "50+ Countries" },
];

const FLOATING_STATS = [
  { value: "$47M+", label: "Recovered" },
  { value: "2,800+", label: "Clients" },
  { value: "8 Yrs", label: "Experience" },
];

export function HeroSection() {
  const scrollToContact = () =>
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  const scrollToProcess = () =>
    document
      .querySelector("#how-it-works")
      ?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative z-10 min-h-screen flex flex-col justify-center pt-20 pb-16 px-4"
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, oklch(0.75 0.16 65 / 0.06) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase"
            style={{
              background: "oklch(0.75 0.16 65 / 0.08)",
              border: "1px solid oklch(0.75 0.16 65 / 0.25)",
              color: "oklch(0.82 0.18 62)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            Industry-Leading Blockchain Forensics
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-6"
          >
            Recover Your <span className="text-gradient-gold">Lost Crypto</span>{" "}
            Assets
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto font-body"
          >
            Professional blockchain forensics and wallet recovery specialists
            trusted by thousands of clients worldwide. We recover what others
            cannot.
          </motion.p>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  background: "oklch(0.13 0.018 250 / 0.8)",
                  border: "1px solid oklch(0.22 0.02 250)",
                  color: "oklch(0.85 0.01 220)",
                }}
              >
                <Icon className="w-3.5 h-3.5 text-gold" />
                {label}
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
          >
            <Button
              size="lg"
              className="btn-gold px-8 py-4 text-base h-auto"
              onClick={scrollToContact}
            >
              Start Recovery Process
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="btn-outline-gold px-8 py-4 text-base h-auto"
              onClick={scrollToProcess}
            >
              View Our Process
            </Button>
          </motion.div>

          {/* Floating stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="inline-flex items-center gap-8 sm:gap-12 px-8 py-5 rounded-2xl"
            style={{
              background: "oklch(0.13 0.018 250 / 0.7)",
              border: "1px solid oklch(0.75 0.16 65 / 0.15)",
              backdropFilter: "blur(20px)",
            }}
          >
            {FLOATING_STATS.map((stat, i) => (
              <div key={stat.label} className="text-center">
                {i > 0 && (
                  <div
                    className="absolute w-px h-8 bg-border/40"
                    style={{
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  />
                )}
                <div className="font-display text-2xl sm:text-3xl font-bold text-gradient-gold">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground font-body mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
