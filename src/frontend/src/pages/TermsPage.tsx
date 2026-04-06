import { ArrowLeft, Shield } from "lucide-react";

interface TermsPageProps {
  onBack: () => void;
}

export function TermsPage({ onBack }: TermsPageProps) {
  return (
    <div className="min-h-screen" style={{ background: "#050510" }}>
      {/* Simple nav */}
      <div
        className="sticky top-0 z-50 px-6 py-4 flex items-center gap-3"
        style={{
          background: "oklch(0.08 0.015 255 / 0.95)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid oklch(0.75 0.16 65 / 0.1)",
        }}
      >
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
        <div className="flex items-center gap-2 ml-4">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.78 0.18 62), oklch(0.65 0.14 68))",
            }}
          >
            <Shield className="w-3.5 h-3.5 text-[#050510]" />
          </div>
          <span className="font-display font-bold text-foreground">
            CryptoRecovery <span className="text-gold">Pro</span>
          </span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold font-body mb-3">
            Legal
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Terms &amp; Conditions
          </h1>
          <p className="text-muted-foreground font-body">
            Last updated: April 2026
          </p>
        </div>

        <div className="space-y-10 text-sm text-muted-foreground font-body leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using CryptoRecovery Pro's services, website, or
              submitting a recovery request, you agree to be bound by these
              Terms and Conditions. If you do not agree to these terms, do not
              use our services. These terms may be updated from time to time;
              continued use constitutes acceptance of any changes.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              2. Service Description
            </h2>
            <p className="mb-3">
              CryptoRecovery Pro provides professional blockchain forensics and
              cryptocurrency wallet recovery services, including but not limited
              to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Private key recovery and reconstruction.</li>
              <li>Encrypted wallet password recovery.</li>
              <li>Corrupted wallet file repair and restoration.</li>
              <li>Blockchain transaction tracing and analysis.</li>
              <li>Exchange hack and scam investigation assistance.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              3. Payment Terms
            </h2>
            <p className="mb-3">
              All fees are payable in advance in Bitcoin (BTC) or Tether (USDT
              TRC20). The following payment terms apply:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-foreground">Basic Plan ($450):</strong>{" "}
                Payment is non-refundable. No guarantee of recovery is provided.
                You pay for our specialists' time, expertise, and forensic
                investigation.
              </li>
              <li>
                <strong className="text-foreground">
                  Advanced Plan ($2,500):
                </strong>{" "}
                Includes a money-back guarantee if recovery is unsuccessful
                after a full investigation. Refund eligibility is determined at
                our sole discretion based on technical feasibility.
              </li>
              <li>
                Payment must be sent in the exact cryptocurrency amount
                specified. We are not responsible for incorrect payments.
              </li>
              <li>
                Recovery process begins only after payment is confirmed on the
                blockchain (typically 1-3 confirmations).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              4. No Guarantee of Recovery
            </h2>
            <p>
              Cryptocurrency recovery is a technically complex process with no
              absolute guarantee of success. CryptoRecovery Pro makes no
              warranty, express or implied, that recovery will be successful.
              Our specialists will apply all available techniques within the
              scope of your selected plan, but the outcome depends on factors
              beyond our control, including the nature of the data loss,
              available information provided, and the state of the blockchain.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              5. Client Obligations
            </h2>
            <p className="mb-3">
              By submitting a recovery request, you confirm that:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                You are the rightful legal owner of the cryptocurrency wallet
                and assets you are seeking to recover.
              </li>
              <li>
                All information provided is accurate and truthful to the best of
                your knowledge.
              </li>
              <li>
                You will cooperate fully with our specialists throughout the
                recovery process.
              </li>
              <li>You will not use our services for any unlawful purpose.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              6. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by applicable law, CryptoRecovery
              Pro shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages, including loss of profits,
              data, or goodwill, arising from your use of or inability to use
              our services. Our total liability shall not exceed the fees paid
              by you for the specific service at issue.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              7. Confidentiality
            </h2>
            <p>
              All information shared with CryptoRecovery Pro in the context of a
              recovery case is treated as strictly confidential. We will not
              disclose your personal information, wallet addresses, or case
              details to any third party without your explicit consent, except
              as required by law.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              8. Prohibited Uses
            </h2>
            <p className="mb-3">You may not use our services to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Attempt to recover assets that belong to another party without
                their legal authorization.
              </li>
              <li>Launder money or circumvent financial regulations.</li>
              <li>Engage in any fraudulent, abusive, or illegal activity.</li>
              <li>Interfere with or disrupt the integrity of our platform.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              9. Governing Law
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with
              internationally applicable commercial law. Any disputes arising
              from these Terms shall be resolved through binding arbitration.
              Nothing in these Terms limits your rights under any applicable
              consumer protection laws.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              10. Contact
            </h2>
            <p>
              For questions about these Terms, please contact us at{" "}
              <span className="text-gold">legal@cryptorecoverypro.com</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
