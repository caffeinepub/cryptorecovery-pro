import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitRequest } from "@/hooks/useQueries";
import {
  AlertTriangle,
  ArrowRight,
  Bitcoin,
  CheckCheck,
  CheckCircle,
  Clock,
  Copy,
  Loader2,
  Lock,
  Shield,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const ISSUE_TYPES = [
  { value: "Lost Access", label: "Lost Access" },
  { value: "Exchange Hack", label: "Exchange Hack" },
  { value: "Scam", label: "Scam / Fraud" },
  { value: "Hardware Failure", label: "Hardware Failure" },
  { value: "Forgotten Password", label: "Forgotten Password" },
  { value: "Other", label: "Other" },
];

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
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all font-body"
      style={{
        background: copied
          ? "oklch(0.75 0.16 65 / 0.2)"
          : "oklch(0.18 0.022 250)",
        color: copied ? "oklch(0.82 0.18 62)" : "oklch(0.72 0.015 240)",
        border: "1px solid oklch(0.75 0.16 65 / 0.25)",
      }}
    >
      {copied ? (
        <CheckCheck className="w-3 h-3" />
      ) : (
        <Copy className="w-3 h-3" />
      )}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

function CountdownTimer({
  seconds,
  onExpire,
}: { seconds: number; onExpire: () => void }) {
  const [remaining, setRemaining] = useState(seconds);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          onExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [onExpire]);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const isUrgent = remaining < 180;

  return (
    <div
      className="flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-lg font-bold"
      style={{
        background: isUrgent
          ? "oklch(0.58 0.22 25 / 0.15)"
          : "oklch(0.13 0.018 250)",
        border: `1px solid ${isUrgent ? "oklch(0.65 0.2 25 / 0.4)" : "oklch(0.22 0.02 250)"}`,
        color: isUrgent ? "oklch(0.75 0.2 30)" : "oklch(0.82 0.18 62)",
      }}
    >
      <Clock className="w-4 h-4" />
      {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
    </div>
  );
}

type Step = "form" | "payment" | "confirmed";

export function ContactSection() {
  const { mutateAsync, isPending } = useSubmitRequest();
  const [step, setStep] = useState<Step>("form");
  const [caseId, setCaseId] = useState<bigint>(0n);
  const [payTab, setPayTab] = useState<"btc" | "usdt">("btc");
  const [form, setForm] = useState({
    name: "",
    email: "",
    walletAddress: "",
    amountLost: "",
    issueType: "",
    description: "",
    plan: "basic",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email))
      e.email = "Invalid email";
    if (!form.issueType) e.issueType = "Required";
    if (!form.description.trim()) e.description = "Required";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    try {
      const id = await mutateAsync({
        name: form.name,
        email: form.email,
        walletType: form.issueType,
        serviceTier: form.plan,
        message: `${form.description}${
          form.walletAddress ? ` | Wallet: ${form.walletAddress}` : ""
        }${form.amountLost ? ` | Amount: $${form.amountLost}` : ""}`,
      });
      setCaseId(id);
      setStep("payment");
      window.scrollTo({
        top: document.getElementById("contact")?.offsetTop ?? 0,
        behavior: "smooth",
      });
    } catch {
      toast.error("Submission failed. Please try again.");
    }
  };

  const inputClass =
    "bg-[oklch(0.1_0.014_255)] border-[oklch(0.22_0.02_250)] focus:border-[oklch(0.75_0.16_65_/_0.5)] text-foreground placeholder:text-muted-foreground/50 font-body";

  const planLabel = form.plan === "advanced" ? "Advanced" : "Basic";
  const planPrice = form.plan === "advanced" ? "$2,500" : "$450";
  const btcAmount = form.plan === "advanced" ? "0.0374 BTC" : "0.0067 BTC";
  const usdtAmount = form.plan === "advanced" ? "2,500 USDT" : "450 USDT";

  return (
    <section id="contact" className="relative z-10 py-24 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 text-gold font-body">
            Start Your Case
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
            {step === "form"
              ? "Start Your Recovery"
              : step === "payment"
                ? "Complete Payment"
                : "Payment Submitted"}
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto font-body">
            {step === "form"
              ? "Fill out the form and our specialists will review your case within 2 hours."
              : step === "payment"
                ? "Send your payment to start the recovery process immediately."
                : "Our team will verify your transaction shortly."}
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {step === "form" && (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
                className="rounded-2xl p-8 space-y-5"
                style={{
                  background: "oklch(0.13 0.018 250 / 0.8)",
                  border: "1px solid oklch(0.22 0.02 250)",
                  backdropFilter: "blur(20px)",
                }}
                noValidate
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label className="text-foreground font-medium text-sm font-body">
                      Full Name
                    </Label>
                    <Input
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      className={inputClass}
                    />
                    {errors.name && (
                      <p className="text-destructive text-xs font-body">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground font-medium text-sm font-body">
                      Email Address
                    </Label>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                      className={inputClass}
                    />
                    {errors.email && (
                      <p className="text-destructive text-xs font-body">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label className="text-foreground font-medium text-sm font-body">
                      Wallet Address (optional)
                    </Label>
                    <Input
                      placeholder="0x... or bc1..."
                      value={form.walletAddress}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          walletAddress: e.target.value,
                        }))
                      }
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground font-medium text-sm font-body">
                      Amount Lost (USD)
                    </Label>
                    <Input
                      type="number"
                      placeholder="e.g. 5000"
                      value={form.amountLost}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, amountLost: e.target.value }))
                      }
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label className="text-foreground font-medium text-sm font-body">
                      Type of Issue
                    </Label>
                    <Select
                      onValueChange={(v) =>
                        setForm((p) => ({ ...p, issueType: v }))
                      }
                      value={form.issueType}
                    >
                      <SelectTrigger className={inputClass}>
                        <SelectValue placeholder="Select issue type" />
                      </SelectTrigger>
                      <SelectContent>
                        {ISSUE_TYPES.map((t) => (
                          <SelectItem key={t.value} value={t.value}>
                            {t.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.issueType && (
                      <p className="text-destructive text-xs font-body">
                        {errors.issueType}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground font-medium text-sm font-body">
                      Recovery Plan
                    </Label>
                    <Select
                      onValueChange={(v) => setForm((p) => ({ ...p, plan: v }))}
                      value={form.plan}
                    >
                      <SelectTrigger className={inputClass}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic — $450</SelectItem>
                        <SelectItem value="advanced">
                          Advanced — $2,500
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground font-medium text-sm font-body">
                    Describe Your Situation
                  </Label>
                  <Textarea
                    placeholder="Tell us about your wallet, when you lost access, and any details that might help recovery..."
                    rows={5}
                    value={form.description}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, description: e.target.value }))
                    }
                    className={`${inputClass} resize-none`}
                  />
                  {errors.description && (
                    <p className="text-destructive text-xs font-body">
                      {errors.description}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-12 btn-gold text-sm"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Recovery Request{" "}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </motion.form>
            )}

            {step === "payment" && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                {/* Header card */}
                <div
                  className="rounded-2xl p-6"
                  style={{
                    background: "oklch(0.13 0.018 250 / 0.8)",
                    border: "1px solid oklch(0.75 0.16 65 / 0.25)",
                    backdropFilter: "blur(20px)",
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Lock className="w-4 h-4 text-gold" />
                        <span className="text-xs font-semibold uppercase tracking-widest text-gold font-body">
                          Secure Crypto Payment
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm font-body text-muted-foreground">
                          <span>Plan:</span>
                          <span className="text-foreground font-semibold">
                            {planLabel} Recovery
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-body text-muted-foreground">
                          <span>Amount:</span>
                          <span className="font-display text-lg font-bold text-gradient-gold">
                            {planPrice}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-body text-muted-foreground">
                          <span>Case ID:</span>
                          <span
                            className="text-xs font-mono px-2 py-0.5 rounded"
                            style={{
                              background: "oklch(0.18 0.022 250)",
                              color: "oklch(0.72 0.015 240)",
                            }}
                          >
                            #{String(caseId).padStart(5, "0")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <CountdownTimer
                      seconds={900}
                      onExpire={() =>
                        toast.warning(
                          "Payment window expired. Please resubmit.",
                        )
                      }
                    />
                  </div>
                </div>

                {/* Payment tabs */}
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: "oklch(0.11 0.016 255)",
                    border: "1px solid oklch(0.22 0.02 250)",
                  }}
                >
                  {/* Tab headers */}
                  <div
                    className="flex"
                    style={{ borderBottom: "1px solid oklch(0.22 0.02 250)" }}
                  >
                    {(["btc", "usdt"] as const).map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setPayTab(tab)}
                        className="flex-1 py-4 text-sm font-semibold font-body transition-all"
                        style={{
                          background:
                            payTab === tab
                              ? "oklch(0.75 0.16 65 / 0.1)"
                              : "transparent",
                          color:
                            payTab === tab
                              ? "oklch(0.82 0.18 62)"
                              : "oklch(0.55 0.015 240)",
                          borderBottom:
                            payTab === tab
                              ? "2px solid oklch(0.75 0.16 65)"
                              : "2px solid transparent",
                        }}
                      >
                        {tab === "btc" ? (
                          <span className="flex items-center justify-center gap-2">
                            <Bitcoin className="w-4 h-4" /> Bitcoin (BTC)
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            <span className="font-bold text-green-400">
                              &#8366;
                            </span>{" "}
                            Tether (USDT)
                          </span>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Tab content */}
                  <div className="p-6 space-y-5">
                    <div
                      className="rounded-xl p-4 text-center"
                      style={{
                        background: "oklch(0.75 0.16 65 / 0.06)",
                        border: "1px solid oklch(0.75 0.16 65 / 0.2)",
                      }}
                    >
                      <p className="text-xs text-muted-foreground font-body mb-1">
                        Send Exactly
                      </p>
                      <p className="font-display text-3xl font-bold text-gradient-gold">
                        {payTab === "btc" ? btcAmount : usdtAmount}
                      </p>
                      {payTab === "usdt" && (
                        <p className="text-xs text-muted-foreground font-body mt-1">
                          Network: TRC20 (Tron)
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground font-body">
                        {payTab === "btc"
                          ? "Bitcoin Address"
                          : "USDT TRC20 Address"}
                      </p>
                      <div
                        className="rounded-xl p-4"
                        style={{
                          background: "oklch(0.09 0.014 255)",
                          border: "1px solid oklch(0.22 0.02 250)",
                        }}
                      >
                        <p
                          className="font-mono text-sm break-all mb-3"
                          style={{ color: "oklch(0.82 0.01 220)" }}
                        >
                          {payTab === "btc" ? BTC_ADDRESS : USDT_ADDRESS}
                        </p>
                        <CopyButton
                          text={payTab === "btc" ? BTC_ADDRESS : USDT_ADDRESS}
                          label={payTab === "btc" ? "BTC" : "USDT"}
                        />
                      </div>
                    </div>

                    <div
                      className="flex items-start gap-3 rounded-xl p-4"
                      style={{
                        background: "oklch(0.58 0.22 25 / 0.08)",
                        border: "1px solid oklch(0.65 0.2 25 / 0.2)",
                      }}
                    >
                      <AlertTriangle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                      <p
                        className="text-xs font-body"
                        style={{ color: "oklch(0.78 0.12 55)" }}
                      >
                        Send <strong>exactly</strong> the amount shown above.
                        Incorrect amounts cannot be processed and may result in
                        permanent loss of funds.
                      </p>
                    </div>

                    <Button
                      type="button"
                      className="w-full h-12 btn-gold text-sm"
                      onClick={() => setStep("confirmed")}
                    >
                      <Shield className="w-4 h-4 mr-2" /> I've Sent the Payment
                    </Button>

                    <p className="text-center text-xs text-muted-foreground font-body">
                      Payments are non-refundable. Recovery is not guaranteed
                      for the Basic plan.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {step === "confirmed" && (
              <motion.div
                key="confirmed"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl p-12 text-center"
                style={{
                  background: "oklch(0.13 0.018 250 / 0.8)",
                  border: "1px solid oklch(0.75 0.16 65 / 0.3)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ background: "oklch(0.75 0.16 65 / 0.15)" }}
                >
                  <CheckCircle className="w-8 h-8 text-gold" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                  Payment Verification in Progress
                </h3>
                <p className="text-muted-foreground font-body mb-4 leading-relaxed">
                  Our team will verify your transaction within{" "}
                  <span className="text-gold">2 hours</span> and begin your
                  recovery process immediately. A confirmation will be sent to{" "}
                  <span className="text-gold">{form.email}</span>.
                </p>
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-body font-semibold mb-8"
                  style={{
                    background: "oklch(0.75 0.16 65 / 0.1)",
                    border: "1px solid oklch(0.75 0.16 65 / 0.25)",
                    color: "oklch(0.82 0.18 62)",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                  Case #{String(caseId).padStart(5, "0")} — Recovery Started
                </div>
                <Button
                  className="btn-outline-gold"
                  onClick={() => {
                    setStep("form");
                    setForm({
                      name: "",
                      email: "",
                      walletAddress: "",
                      amountLost: "",
                      issueType: "",
                      description: "",
                      plan: "basic",
                    });
                  }}
                >
                  Submit Another Request
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
