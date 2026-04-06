import { Star } from "lucide-react";
import { motion } from "motion/react";

const testimonials = [
  {
    name: "Michael T.",
    flag: "\u{1F1FA}\u{1F1F8}",
    title: "Business Owner",
    message:
      "Recovered $38,000 in Bitcoin within 3 days. Absolutely professional team \u2014 they communicated every step and delivered exactly what they promised.",
    rating: 5,
  },
  {
    name: "Sarah K.",
    flag: "\u{1F1EC}\u{1F1E7}",
    title: "Crypto Investor",
    message:
      "Lost access to my Ethereum wallet after a hardware failure. They recovered everything in 48 hours. Outstanding service I'd recommend to anyone.",
    rating: 5,
  },
  {
    name: "Ahmed R.",
    flag: "\u{1F1E6}\u{1F1EA}",
    title: "Private Client",
    message:
      "After being scammed of $12,000, I had no hope. CryptoRecovery Pro investigated the case and got my funds back. Truly world-class work.",
    rating: 5,
  },
];

const STAR_KEYS = ["s1", "s2", "s3", "s4", "s5"];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative z-10 py-24 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 text-gold font-body">
            Client Stories
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative glass-card rounded-2xl p-7 flex flex-col"
            >
              <div
                className="absolute top-6 right-7 font-display text-6xl leading-none font-bold opacity-10"
                style={{ color: "oklch(0.75 0.16 65)" }}
              >
                &ldquo;
              </div>

              <div className="flex gap-0.5 mb-5">
                {STAR_KEYS.slice(0, t.rating).map((key) => (
                  <Star key={key} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1 font-body">
                &ldquo;{t.message}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.78 0.18 62), oklch(0.65 0.14 68))",
                    color: "#050510",
                  }}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground font-body">
                    {t.name} <span className="ml-1">{t.flag}</span>
                  </p>
                  <p className="text-xs text-muted-foreground font-body">
                    {t.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
