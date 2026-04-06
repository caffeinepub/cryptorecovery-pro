import { RequestStatus } from "@/backend";
import { Badge } from "@/components/ui/badge";
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
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  useAdminReplyToChat,
  useGetAllChatSessions,
  useGetAllRequests,
  useGetChatSession,
  useMarkChatResolved,
  useUpdateRequestStatus,
} from "@/hooks/useQueries";
import {
  CheckCircle,
  Lock,
  LogOut,
  MessageCircle,
  RefreshCw,
  Send,
  Shield,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ─── Credentials (change here to update login) ─────────────────────────────────────────────
const ADMIN_USERNAME = "CryptoRecovery2025";
const ADMIN_PASSWORD = "Admin@2025";
// ──────────────────────────────────────────────────────────────────────────────────

const STATUS_STYLE: Record<
  RequestStatus,
  { bg: string; text: string; label: string }
> = {
  [RequestStatus.pending]: {
    bg: "oklch(0.65 0.18 85 / 0.15)",
    text: "oklch(0.82 0.18 80)",
    label: "Pending",
  },
  [RequestStatus.inProgress]: {
    bg: "oklch(0.65 0.2 230 / 0.15)",
    text: "oklch(0.72 0.18 230)",
    label: "In Progress",
  },
  [RequestStatus.completed]: {
    bg: "oklch(0.65 0.18 145 / 0.15)",
    text: "oklch(0.75 0.18 145)",
    label: "Completed",
  },
};

function formatDate(ts: bigint) {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatTime(ts: bigint) {
  return new Date(Number(ts) / 1_000_000).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface AdminPageProps {
  onBack: () => void;
}

function ChatPanel({
  sessionId,
  visitorName,
}: { sessionId: string; visitorName: string }) {
  const { data: messages = [], isLoading } = useGetChatSession(sessionId, true);
  const { mutateAsync: adminReply, isPending: sending } = useAdminReplyToChat();
  const { mutateAsync: markResolved } = useMarkChatResolved();
  const [replyText, setReplyText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleReply = async () => {
    const content = replyText.trim();
    if (!content) return;
    setReplyText("");
    try {
      await adminReply({ sessionId, content });
    } catch {
      toast.error("Failed to send reply");
      setReplyText(content);
    }
  };

  return (
    <div
      className="flex flex-col h-96 rounded-xl overflow-hidden"
      style={{
        background: "oklch(0.09 0.014 255)",
        border: "1px solid oklch(0.22 0.02 250)",
      }}
    >
      <div
        className="px-4 py-3 flex items-center justify-between"
        style={{ borderBottom: "1px solid oklch(0.18 0.022 250)" }}
      >
        <div>
          <p className="text-sm font-semibold text-foreground font-body">
            {visitorName}
          </p>
          <p className="text-xs text-muted-foreground font-body">
            Session: {sessionId.slice(-8)}
          </p>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="text-xs gap-1.5 border-border/40 font-body"
          onClick={() =>
            markResolved(sessionId).then(() =>
              toast.success("Marked as resolved"),
            )
          }
        >
          <CheckCircle className="w-3 h-3" /> Mark Resolved
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-10" />
            ))}
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
            <p className="text-xs text-muted-foreground font-body">
              No messages yet.
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={String(msg.id)}
              className={`flex ${msg.isFromAdmin ? "justify-end" : "justify-start"}`}
            >
              <div
                className="max-w-[75%] rounded-2xl px-4 py-2.5"
                style={{
                  background: msg.isFromAdmin
                    ? "linear-gradient(135deg, oklch(0.78 0.18 62), oklch(0.68 0.15 68))"
                    : "oklch(0.16 0.02 252)",
                  color: msg.isFromAdmin
                    ? "oklch(0.1 0.01 250)"
                    : "oklch(0.9 0.005 220)",
                }}
              >
                <p className="text-xs font-semibold mb-0.5 font-body opacity-70">
                  {msg.senderName} &middot; {formatTime(msg.timestamp)}
                </p>
                <p className="text-sm font-body">{msg.content}</p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div
        className="px-4 py-3 flex items-end gap-2"
        style={{ borderTop: "1px solid oklch(0.18 0.022 250)" }}
      >
        <textarea
          placeholder="Type a reply..."
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleReply();
            }
          }}
          rows={1}
          className="flex-1 resize-none px-3 py-2.5 rounded-xl text-sm font-body text-foreground placeholder:text-muted-foreground/50 max-h-20"
          style={{
            background: "oklch(0.13 0.018 250)",
            border: "1px solid oklch(0.22 0.02 250)",
          }}
        />
        <button
          type="button"
          onClick={handleReply}
          disabled={sending || !replyText.trim()}
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 disabled:opacity-40 transition-all"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.78 0.18 62), oklch(0.68 0.15 68))",
          }}
        >
          {sending ? (
            <div className="w-4 h-4 border-2 border-[#050510]/30 border-t-[#050510] rounded-full animate-spin" />
          ) : (
            <Send className="w-4 h-4 text-[#050510]" />
          )}
        </button>
      </div>
    </div>
  );
}

export function AdminPage({ onBack }: AdminPageProps) {
  const [loggedIn, setLoggedIn] = useState(
    () => localStorage.getItem("adminSession") === "true",
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"requests" | "chat">("requests");
  const [selectedSession, setSelectedSession] = useState<string | null>(null);

  const {
    login: iiLogin,
    identity,
    isLoggingIn: iiLoggingIn,
  } = useInternetIdentity();
  const [backendReady, setBackendReady] = useState(!!identity);

  const { data: requests, isLoading, refetch } = useGetAllRequests();
  const { mutateAsync: updateStatus, isPending: updating } =
    useUpdateRequestStatus();
  const { data: chatSessions = [], isLoading: chatsLoading } =
    useGetAllChatSessions();

  useEffect(() => {
    if (loggedIn && !identity && !iiLoggingIn) {
      iiLogin();
    }
  }, [loggedIn, identity, iiLoggingIn, iiLogin]);

  useEffect(() => {
    if (identity) setBackendReady(true);
  }, [identity]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem("adminSession", "true");
      setLoggedIn(true);
    } else {
      setLoginError("Invalid username or password.");
    }
    setLoginLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminSession");
    setLoggedIn(false);
    setBackendReady(false);
    onBack();
  };

  const handleStatusChange = async (
    requestId: bigint,
    status: RequestStatus,
  ) => {
    try {
      await updateStatus({ requestId, status });
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
    }
  };

  // ── Login Screen ────────────────────────────────────────────────────────────
  if (!loggedIn) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "#050510" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-sm"
        >
          <div
            className="rounded-2xl p-8"
            style={{
              background: "oklch(0.12 0.018 255)",
              border: "1px solid oklch(0.75 0.16 65 / 0.2)",
              boxShadow: "0 0 60px oklch(0.75 0.16 65 / 0.08)",
            }}
          >
            <div className="text-center mb-8">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.78 0.18 62), oklch(0.65 0.14 68))",
                  boxShadow: "0 4px 20px oklch(0.75 0.16 65 / 0.4)",
                }}
              >
                <Shield className="w-7 h-7 text-[#050510]" />
              </div>
              <h1 className="font-display text-xl font-bold text-foreground">
                Admin Panel
              </h1>
              <p className="text-xs text-muted-foreground font-body mt-1">
                CryptoRecovery Pro
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground font-body">
                  Username
                </Label>
                <Input
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  className="bg-[oklch(0.09_0.014_255)] border-[oklch(0.22_0.02_250)] text-foreground placeholder:text-muted-foreground/50 font-body"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground font-body">
                  Password
                </Label>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="bg-[oklch(0.09_0.014_255)] border-[oklch(0.22_0.02_250)] text-foreground placeholder:text-muted-foreground/50 font-body"
                />
              </div>

              {loginError && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-destructive text-xs font-body flex items-center gap-1.5"
                >
                  <Lock className="w-3 h-3" />
                  {loginError}
                </motion.p>
              )}

              <Button
                type="submit"
                disabled={loginLoading}
                className="w-full h-11 btn-gold font-body text-sm mt-2"
              >
                {loginLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#050510]/30 border-t-[#050510] rounded-full animate-spin mr-2" />{" "}
                    Verifying...
                  </>
                ) : (
                  "Login to Admin Panel"
                )}
              </Button>
            </form>

            <button
              type="button"
              onClick={onBack}
              className="w-full mt-4 text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors font-body"
            >
              ← Back to site
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!backendReady || iiLoggingIn) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#050510" }}
      >
        <div className="text-center">
          <div
            className="w-10 h-10 rounded-full border-2 animate-spin mx-auto mb-4"
            style={{
              borderColor: "oklch(0.75 0.16 65 / 0.3)",
              borderTopColor: "oklch(0.75 0.16 65)",
            }}
          />
          <p className="text-sm text-muted-foreground font-body">
            Completing security verification...
          </p>
        </div>
      </div>
    );
  }

  // ── Dashboard ───────────────────────────────────────────────────────────────────
  const counts = {
    total: requests?.length ?? 0,
    pending:
      requests?.filter((r) => r.status === RequestStatus.pending).length ?? 0,
    inProgress:
      requests?.filter((r) => r.status === RequestStatus.inProgress).length ??
      0,
    completed:
      requests?.filter((r) => r.status === RequestStatus.completed).length ?? 0,
  };

  const openChats = chatSessions.filter((s) => !s.isResolved).length;

  const STAT_CARDS = [
    {
      label: "Total Requests",
      value: counts.total,
      color: "oklch(0.82 0.18 62)",
    },
    { label: "Pending", value: counts.pending, color: "oklch(0.82 0.18 80)" },
    {
      label: "In Progress",
      value: counts.inProgress,
      color: "oklch(0.72 0.18 230)",
    },
    {
      label: "Completed",
      value: counts.completed,
      color: "oklch(0.75 0.18 145)",
    },
  ];

  const selectedSessionData = chatSessions.find(
    (s) => s.sessionId === selectedSession,
  );

  return (
    <div className="min-h-screen" style={{ background: "#050510" }}>
      {/* Admin Navbar */}
      <div
        className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between"
        style={{
          background: "oklch(0.08 0.015 255 / 0.95)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid oklch(0.75 0.16 65 / 0.1)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.78 0.18 62), oklch(0.65 0.14 68))",
            }}
          >
            <Shield className="w-4 h-4 text-[#050510]" />
          </div>
          <div>
            <span className="font-display font-bold text-foreground">
              CryptoRecovery Pro
            </span>
            <span
              className="ml-2 text-xs px-2 py-0.5 rounded font-body"
              style={{
                background: "oklch(0.75 0.16 65 / 0.1)",
                color: "oklch(0.82 0.18 62)",
              }}
            >
              Admin Panel
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className="gap-1.5 text-xs border-border/40 font-body"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="gap-1.5 text-xs border-border/40 text-muted-foreground font-body"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </Button>
        </div>
      </div>

      <div className="px-6 py-8 max-w-7xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {STAT_CARDS.map((s) => (
            <div
              key={s.label}
              className="rounded-xl p-5"
              style={{
                background: "oklch(0.12 0.018 255)",
                border: "1px solid oklch(0.22 0.02 250)",
              }}
            >
              <div
                className="font-display text-3xl font-bold"
                style={{ color: s.color }}
              >
                {s.value}
              </div>
              <div className="text-xs text-muted-foreground font-body mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tab nav */}
        <div
          className="flex mb-6"
          style={{ borderBottom: "1px solid oklch(0.22 0.02 250)" }}
        >
          {[
            {
              key: "requests" as const,
              label: "Recovery Requests",
              icon: Shield,
              badge: undefined as number | undefined,
            },
            {
              key: "chat",
              label: "Live Chat",
              icon: MessageCircle,
              badge: openChats as number | undefined,
            },
          ].map(({ key, label, icon: Icon, badge }) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key as "requests" | "chat")}
              className="flex items-center gap-2 px-5 py-3 text-sm font-semibold font-body transition-all relative"
              style={{
                color:
                  activeTab === key
                    ? "oklch(0.82 0.18 62)"
                    : "oklch(0.55 0.015 240)",
                borderBottom:
                  activeTab === key
                    ? "2px solid oklch(0.75 0.16 65)"
                    : "2px solid transparent",
                marginBottom: "-1px",
              }}
            >
              <Icon className="w-4 h-4" /> {label}
              {badge !== undefined && badge > 0 && (
                <span
                  className="w-4 h-4 rounded-full text-xs flex items-center justify-center font-body font-bold"
                  style={{ background: "oklch(0.6 0.22 25)", color: "white" }}
                >
                  {badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Requests Tab */}
        {activeTab === "requests" && (
          <div>
            <div className="mb-6">
              <h1 className="font-display text-2xl font-bold text-foreground">
                Recovery Requests
              </h1>
              <p className="text-sm text-muted-foreground font-body mt-1">
                Manage and update all incoming recovery cases.
              </p>
            </div>
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "oklch(0.12 0.018 255)",
                border: "1px solid oklch(0.22 0.02 250)",
              }}
            >
              {isLoading ? (
                <div className="p-8 space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : !requests || requests.length === 0 ? (
                <div className="p-16 text-center">
                  <Shield className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground font-body">
                    No recovery requests yet.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border/30 hover:bg-transparent">
                        {[
                          "#",
                          "Name",
                          "Email",
                          "Issue",
                          "Plan",
                          "Description",
                          "Date",
                          "Status",
                        ].map((h) => (
                          <TableHead
                            key={h}
                            className="text-xs text-muted-foreground font-body uppercase tracking-wide"
                          >
                            {h}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {requests.map((req, idx) => (
                        <TableRow
                          key={`${req.email}-${String(req.timestamp)}`}
                          className="border-border/20"
                          style={{
                            background:
                              idx % 2 === 0
                                ? "transparent"
                                : "oklch(0.13 0.018 250 / 0.3)",
                          }}
                        >
                          <TableCell className="text-xs text-muted-foreground font-body">
                            {idx + 1}
                          </TableCell>
                          <TableCell className="font-semibold text-foreground text-sm font-body">
                            {req.name}
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground font-body">
                            {req.email}
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground font-body">
                            {req.walletType}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="text-xs font-body"
                              style={{
                                borderColor:
                                  req.serviceTier === "advanced"
                                    ? "oklch(0.75 0.16 65 / 0.4)"
                                    : "oklch(0.22 0.02 250)",
                                color:
                                  req.serviceTier === "advanced"
                                    ? "oklch(0.82 0.18 62)"
                                    : "oklch(0.6 0.015 240)",
                              }}
                            >
                              {req.serviceTier}
                            </Badge>
                          </TableCell>
                          <TableCell
                            className="text-xs text-muted-foreground font-body max-w-xs truncate"
                            title={req.message}
                          >
                            {req.message.length > 55
                              ? `${req.message.slice(0, 55)}…`
                              : req.message}
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground font-body">
                            {formatDate(req.timestamp)}
                          </TableCell>
                          <TableCell>
                            <Select
                              value={req.status}
                              onValueChange={(v) =>
                                handleStatusChange(
                                  req.timestamp,
                                  v as RequestStatus,
                                )
                              }
                              disabled={updating}
                            >
                              <SelectTrigger
                                className="h-8 w-36 text-xs font-body border-0"
                                style={{
                                  background: STATUS_STYLE[req.status].bg,
                                  color: STATUS_STYLE[req.status].text,
                                }}
                              >
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.values(RequestStatus).map((s) => (
                                  <SelectItem
                                    key={s}
                                    value={s}
                                    className="text-xs font-body"
                                  >
                                    {STATUS_STYLE[s].label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Chat Tab */}
        {activeTab === "chat" && (
          <div>
            <div className="mb-6">
              <h1 className="font-display text-2xl font-bold text-foreground">
                Live Chat
              </h1>
              <p className="text-sm text-muted-foreground font-body mt-1">
                {openChats > 0
                  ? `${openChats} open conversation${openChats > 1 ? "s" : ""}`
                  : "All conversations resolved."}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sessions list */}
              <div
                className="rounded-2xl overflow-hidden lg:col-span-1"
                style={{
                  background: "oklch(0.12 0.018 255)",
                  border: "1px solid oklch(0.22 0.02 250)",
                }}
              >
                <div
                  className="px-4 py-3"
                  style={{ borderBottom: "1px solid oklch(0.18 0.022 250)" }}
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground font-body">
                    Conversations ({chatSessions.length})
                  </p>
                </div>
                {chatsLoading ? (
                  <div className="p-4 space-y-2">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-16" />
                    ))}
                  </div>
                ) : chatSessions.length === 0 ? (
                  <div className="p-8 text-center">
                    <MessageCircle className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground font-body">
                      No chats yet.
                    </p>
                  </div>
                ) : (
                  <div
                    className="divide-y"
                    style={{ borderColor: "oklch(0.18 0.022 250)" }}
                  >
                    {chatSessions.map((session) => (
                      <button
                        key={session.sessionId}
                        type="button"
                        onClick={() => setSelectedSession(session.sessionId)}
                        className="w-full px-4 py-4 text-left transition-all"
                        style={{
                          background:
                            selectedSession === session.sessionId
                              ? "oklch(0.75 0.16 65 / 0.08)"
                              : "transparent",
                          borderLeft:
                            selectedSession === session.sessionId
                              ? "3px solid oklch(0.75 0.16 65)"
                              : "3px solid transparent",
                        }}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-foreground font-body truncate">
                              {session.visitorName}
                            </p>
                            <p className="text-xs text-muted-foreground font-body truncate">
                              {session.visitorEmail}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-1 flex-shrink-0">
                            <span
                              className="text-xs px-2 py-0.5 rounded-full font-body font-semibold"
                              style={{
                                background: session.isResolved
                                  ? "oklch(0.65 0.18 145 / 0.15)"
                                  : "oklch(0.65 0.18 85 / 0.15)",
                                color: session.isResolved
                                  ? "oklch(0.75 0.18 145)"
                                  : "oklch(0.82 0.18 80)",
                              }}
                            >
                              {session.isResolved ? "Resolved" : "Open"}
                            </span>
                            <span className="text-xs text-muted-foreground font-body">
                              {String(session.messageCount)} msg
                              {session.messageCount !== 1n ? "s" : ""}
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Chat panel */}
              <div className="lg:col-span-2">
                {selectedSession && selectedSessionData ? (
                  <ChatPanel
                    sessionId={selectedSession}
                    visitorName={selectedSessionData.visitorName}
                  />
                ) : (
                  <div
                    className="rounded-2xl p-12 text-center h-96 flex flex-col items-center justify-center"
                    style={{
                      background: "oklch(0.12 0.018 255)",
                      border: "1px solid oklch(0.22 0.02 250)",
                    }}
                  >
                    <MessageCircle className="w-10 h-10 text-muted-foreground/30 mb-3" />
                    <p className="text-muted-foreground font-body text-sm">
                      Select a conversation to view messages.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
