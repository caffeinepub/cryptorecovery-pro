import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "motion/react";

const faqs = [
  {
    q: "How long does recovery take?",
    a: "Advanced plan: 24–48 hours. Basic plan: 3–7 business days. We provide an estimate after the initial case review.",
  },
  {
    q: "What cryptocurrencies do you support?",
    a: "Bitcoin (BTC), Ethereum (ETH), USDT, BNB, and 50+ other major cryptocurrencies and tokens.",
  },
  {
    q: "Is there a recovery guarantee?",
    a: "The Advanced plan comes with a no-recovery, no-fee policy for qualified cases. We never charge the full fee without results.",
  },
  {
    q: "How do I get started?",
    a: "Fill out the contact form below with your case details. Our team will review and respond within 2 hours.",
  },
  {
    q: "Is my information kept secure?",
    a: "All client data is encrypted with 256-bit encryption. We operate under strict confidentiality agreements and never share information with third parties.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept Bitcoin (BTC) and USDT (TRC20). Payment is typically split: a deposit upfront and the remainder on successful recovery.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="relative z-10 py-24 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 text-gold font-body">
            Got Questions?
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <AccordionItem
                  value={`faq-${i}`}
                  className="rounded-xl px-6 border-0 overflow-hidden"
                  style={{
                    background: "oklch(0.13 0.018 250 / 0.7)",
                    border: "1px solid oklch(0.22 0.02 250)",
                  }}
                >
                  <AccordionTrigger className="font-semibold text-foreground hover:text-gold hover:no-underline py-5 font-body text-left">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5 font-body">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
