import { CryptoBg } from "@/components/CryptoBg";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LiveChatWidget } from "@/components/LiveChatWidget";
import { Toaster } from "@/components/ui/sonner";
import { AdminPage } from "@/pages/AdminPage";
import { HomePage } from "@/pages/HomePage";
import { PrivacyPolicyPage } from "@/pages/PrivacyPolicyPage";
import { TermsPage } from "@/pages/TermsPage";
import { useState } from "react";

type Page = "home" | "admin" | "privacy" | "terms";

export default function App() {
  const [page, setPage] = useState<Page>("home");

  const navigate = (p: string) => {
    setPage(p as Page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen relative" style={{ background: "#050510" }}>
      {page === "home" && <CryptoBg />}
      {page !== "privacy" && page !== "terms" && (
        <Header
          onAdminClick={() => setPage("admin")}
          currentPage={page}
          onNavigate={navigate}
        />
      )}
      {page === "home" && <HomePage />}
      {page === "admin" && <AdminPage onBack={() => setPage("home")} />}
      {page === "privacy" && (
        <PrivacyPolicyPage onBack={() => setPage("home")} />
      )}
      {page === "terms" && <TermsPage onBack={() => setPage("home")} />}
      {page === "home" && <Footer onNavigate={navigate} />}
      {page === "home" && <LiveChatWidget />}
      <Toaster richColors position="top-right" />
    </div>
  );
}
