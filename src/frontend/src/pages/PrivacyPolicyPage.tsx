import { ArrowLeft, Shield } from "lucide-react";

interface PrivacyPolicyPageProps {
  onBack: () => void;
}

export function PrivacyPolicyPage({ onBack }: PrivacyPolicyPageProps) {
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
            Privacy Policy
          </h1>
          <p className="text-muted-foreground font-body">
            Last updated: April 2026
          </p>
        </div>

        <div className="space-y-10 text-sm text-muted-foreground font-body leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              1. Information We Collect
            </h2>
            <p className="mb-3">
              When you use CryptoRecovery Pro's services, we collect information
              you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-foreground">
                  Personal identification:
                </strong>{" "}
                Full name and email address provided when submitting a recovery
                request.
              </li>
              <li>
                <strong className="text-foreground">Wallet information:</strong>{" "}
                Blockchain wallet addresses, wallet types, and descriptions of
                the recovery situation you choose to share.
              </li>
              <li>
                <strong className="text-foreground">Financial details:</strong>{" "}
                Estimated value of assets lost, for the purpose of assessing
                your case.
              </li>
              <li>
                <strong className="text-foreground">Communication data:</strong>{" "}
                Messages and correspondence sent through our live chat and
                contact form.
              </li>
              <li>
                <strong className="text-foreground">Usage data:</strong> Browser
                type, IP address, pages visited, and time spent on our platform
                (collected automatically).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              2. How We Use Your Information
            </h2>
            <p className="mb-3">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Evaluate, process, and fulfill your recovery service request.
              </li>
              <li>
                Communicate with you regarding your case status and updates.
              </li>
              <li>Conduct blockchain forensics and technical recovery work.</li>
              <li>Improve and optimize our services and user experience.</li>
              <li>
                Prevent fraud, unauthorized access, or misuse of our platform.
              </li>
              <li>Comply with applicable laws and legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              3. Data Security
            </h2>
            <p>
              We implement industry-standard security measures including 256-bit
              SSL encryption, access controls, and secure data storage to
              protect your personal information. Your wallet addresses and
              recovery details are treated as strictly confidential and are
              never shared externally without your explicit consent. All case
              data is stored on the Internet Computer blockchain, which provides
              tamper-proof, decentralized data storage.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              4. Cookies and Tracking
            </h2>
            <p className="mb-3">
              Our platform uses minimal cookies and local storage for functional
              purposes only:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Session management for the live chat feature.</li>
              <li>Preserving your chat history between visits.</li>
              <li>No advertising or third-party tracking cookies are used.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              5. Third-Party Services
            </h2>
            <p>
              We do not sell, rent, or share your personal data with third
              parties for marketing purposes. We may engage trusted technical
              partners solely for the purpose of conducting blockchain forensics
              and recovery operations. Any such partner is contractually bound
              to handle your data with the same level of confidentiality.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              6. Data Retention
            </h2>
            <p>
              We retain your case information for a period of 3 years following
              case closure, for audit, legal compliance, and quality assurance
              purposes. After this period, personal identifiers are removed. You
              may request deletion of your data at any time, subject to legal
              retention obligations.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              7. Your Rights
            </h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate information.</li>
              <li>Request deletion of your data where legally permissible.</li>
              <li>Withdraw consent for data processing at any time.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              8. Contact Us
            </h2>
            <p>
              For any privacy-related inquiries or to exercise your data rights,
              please contact our Data Protection Officer at:{" "}
              <span className="text-gold">privacy@cryptorecoverypro.com</span>.
              We respond to all privacy requests within 72 hours.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
