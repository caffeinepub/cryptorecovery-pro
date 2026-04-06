import { Button } from "@/components/ui/button";
import { Menu, Shield, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface HeaderProps {
  onAdminClick: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ onAdminClick, currentPage, onNavigate }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Pricing", href: "#pricing" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
  ];

  const handleNavClick = (href: string) => {
    if (currentPage !== "home") {
      onNavigate("home");
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "oklch(0.08 0.015 255 / 0.92)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid oklch(0.75 0.16 65 / 0.1)",
      }}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="flex items-center gap-3 group"
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.78 0.18 62), oklch(0.65 0.14 68))",
              boxShadow: "0 4px 15px oklch(0.75 0.16 65 / 0.4)",
            }}
          >
            <Shield className="w-5 h-5 text-[#050510]" />
          </div>
          <div className="hidden sm:block">
            <span className="font-display font-bold text-lg text-foreground group-hover:text-gold transition-colors">
              CryptoRecovery <span className="text-gold">Pro</span>
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav
          className="hidden lg:flex items-center gap-8"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </nav>

        {/* CTA + Admin */}
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            className="btn-gold hidden sm:flex text-sm px-5"
            onClick={() => handleNavClick("#contact")}
          >
            Get Started
          </Button>
          {/* Secret admin — small unobtrusive link */}
          <button
            type="button"
            onClick={onAdminClick}
            className="hidden lg:flex items-center gap-1 text-xs text-muted-foreground/40 hover:text-muted-foreground transition-colors"
            title="Admin"
          >
            <Shield className="w-3 h-3" />
          </button>
          {/* Mobile toggle */}
          <button
            type="button"
            className="lg:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden"
            style={{
              borderTop: "1px solid oklch(0.75 0.16 65 / 0.08)",
              background: "oklch(0.1 0.018 255)",
            }}
          >
            <div className="container mx-auto px-6 py-5 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-1"
                >
                  {link.label}
                </button>
              ))}
              <Button
                size="sm"
                className="btn-gold w-full mt-2"
                onClick={() => {
                  handleNavClick("#contact");
                  setMobileOpen(false);
                }}
              >
                Start Recovery
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
