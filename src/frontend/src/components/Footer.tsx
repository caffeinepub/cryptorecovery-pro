import { Shield } from "lucide-react";
import { SiFacebook, SiTelegram, SiX } from "react-icons/si";

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer
      className="relative z-10 pt-16 pb-8 px-4"
      style={{
        background: "oklch(0.07 0.014 255)",
        borderTop: "1px solid oklch(0.75 0.16 65 / 0.1)",
      }}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.78 0.18 62), oklch(0.65 0.14 68))",
                }}
              >
                <Shield className="w-5 h-5 text-[#050510]" />
              </div>
              <span className="font-display font-bold text-lg text-foreground">
                CryptoRecovery <span className="text-gold">Pro</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground font-body leading-relaxed max-w-xs mb-6">
              Professional blockchain forensics and cryptographic recovery
              specialists. Trusted by 2,800+ clients worldwide.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: SiX, href: "https://x.com", label: "X" },
                { Icon: SiTelegram, href: "https://t.me", label: "Telegram" },
                {
                  Icon: SiFacebook,
                  href: "https://facebook.com",
                  label: "Facebook",
                },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-gold transition-colors"
                  style={{
                    background: "oklch(0.13 0.018 250)",
                    border: "1px solid oklch(0.22 0.02 250)",
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-body font-semibold text-foreground text-xs uppercase tracking-widest mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {[
                "Private Key Recovery",
                "Wallet Recovery",
                "Password Recovery",
                "Corrupted Wallet",
              ].map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-body font-semibold text-foreground text-xs uppercase tracking-widest mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {[
                { label: "How It Works", href: "#how-it-works" },
                { label: "Pricing", href: "#pricing" },
                { label: "FAQ", href: "#faq" },
                { label: "Contact", href: "#contact" },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{ borderTop: "1px solid oklch(0.75 0.16 65 / 0.08)" }}
        >
          <div className="flex gap-5 text-xs text-muted-foreground">
            <button
              type="button"
              onClick={() => onNavigate("privacy")}
              className="hover:text-foreground transition-colors font-body cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => onNavigate("terms")}
              className="hover:text-foreground transition-colors font-body cursor-pointer"
            >
              Terms &amp; Conditions
            </button>
            <span className="font-body">Disclaimer</span>
          </div>
          <p className="text-xs text-muted-foreground font-body">
            &copy; {year} CryptoRecovery Pro. &middot;{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Built with caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
