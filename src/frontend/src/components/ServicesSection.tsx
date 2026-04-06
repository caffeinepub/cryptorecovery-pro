import {
  AlertTriangle,
  HardDrive,
  Key,
  Lock,
  Search,
  Wallet,
} from "lucide-react";
import { motion } from "motion/react";

const services = [
  {
    icon: Key,
    title: "Private Key Recovery",
    description:
      "Advanced cryptographic analysis to reconstruct lost or corrupted private keys using cutting-edge algorithms.",
  },
  {
    icon: Wallet,
    title: "Wallet Access Recovery",
    description:
      "Full wallet restoration from backup seeds, partial keys, or corrupted wallet.dat files.",
  },
  {
    icon: Lock,
    title: "Password Recovery",
    description:
      "Specialized brute-force analysis for encrypted wallets with high-performance computing resources.",
  },
  {
    icon: HardDrive,
    title: "Corrupted Wallet Repair",
    description:
      "Data reconstruction and forensic analysis for damaged blockchain wallet files.",
  },
  {
    icon: Search,
    title: "Exchange Hack Recovery",
    description:
      "Blockchain forensics to trace and assist in the recovery of assets lost in exchange hacks.",
  },
  {
    icon: AlertTriangle,
    title: "Scam Recovery Assistance",
    description:
      "Professional investigation and tracing of funds lost to cryptocurrency scams and fraud.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="relative z-10 py-24 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 text-gold font-body">
            What We Offer
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Our Recovery Services
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-body">
            Industry-leading recovery techniques backed by years of blockchain
            forensics experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group glass-card glass-card-hover rounded-2xl p-7"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                style={{
                  background: "oklch(0.75 0.16 65 / 0.1)",
                  border: "1px solid oklch(0.75 0.16 65 / 0.2)",
                }}
              >
                <svc.icon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-display font-bold text-foreground text-xl mb-3">
                {svc.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-body">
                {svc.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
