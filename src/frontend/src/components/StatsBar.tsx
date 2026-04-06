import { Clock, DollarSign, TrendingUp, Users } from "lucide-react";
import { motion } from "motion/react";

const stats = [
  { icon: DollarSign, value: "$47M+", label: "Total Recovered" },
  { icon: TrendingUp, value: "94%", label: "Success Rate" },
  { icon: Users, value: "2,800+", label: "Clients Served" },
  { icon: Clock, value: "24/7", label: "Support Available" },
];

export function StatsBar() {
  return (
    <section className="relative z-10 py-6 px-4">
      <div className="container mx-auto">
        <div className="section-divider mb-8" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center px-4 py-6 rounded-2xl glass-card"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ background: "oklch(0.75 0.16 65 / 0.1)" }}
              >
                <stat.icon className="w-5 h-5 text-gold" />
              </div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-gradient-gold">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground font-body mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="section-divider mt-8" />
      </div>
    </section>
  );
}
