import { CheckCircle2, FileText, MessageSquare, Wallet } from "lucide-react";
import { motion } from "motion/react";

const steps = [
  {
    num: "01",
    icon: MessageSquare,
    title: "Submit Request",
    description:
      "Fill out our secure form with details about your case. 100% confidential.",
  },
  {
    num: "02",
    icon: FileText,
    title: "Case Analysis",
    description:
      "Our experts perform deep blockchain forensics and determine recovery feasibility.",
  },
  {
    num: "03",
    icon: CheckCircle2,
    title: "Recovery Process",
    description:
      "We execute the recovery using advanced cryptographic techniques.",
  },
  {
    num: "04",
    icon: Wallet,
    title: "Funds Returned",
    description:
      "Full access restored to your wallet. Payment on successful recovery.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative z-10 py-24 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 text-gold font-body">
            Simple Process
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-body">
            Our streamlined 4-step process gets you from lost access to full
            recovery.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connector line (desktop) */}
          <div
            className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(0.75 0.16 65 / 0.3), oklch(0.75 0.16 65 / 0.3), transparent)",
            }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative text-center"
              >
                {/* Step number circle */}
                <div className="relative flex justify-center mb-6">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center z-10 relative"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.78 0.18 62), oklch(0.65 0.14 68))",
                      boxShadow: "0 4px 20px oklch(0.75 0.16 65 / 0.4)",
                    }}
                  >
                    <step.icon className="w-6 h-6 text-[#050510]" />
                  </div>
                  <div
                    className="absolute -top-2 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-body"
                    style={{
                      background: "oklch(0.13 0.018 250)",
                      border: "2px solid oklch(0.75 0.16 65 / 0.5)",
                      color: "oklch(0.82 0.18 62)",
                    }}
                  >
                    {step.num.slice(-1)}
                  </div>
                </div>

                <div
                  className="rounded-2xl p-6"
                  style={{
                    background: "oklch(0.13 0.018 250 / 0.6)",
                    border: "1px solid oklch(0.22 0.02 250)",
                  }}
                >
                  <h3 className="font-display font-bold text-foreground text-lg mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
