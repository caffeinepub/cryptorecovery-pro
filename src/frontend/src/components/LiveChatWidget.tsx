import { useGetChatSession, useSendVisitorMessage } from "@/hooks/useQueries";
import { MessageCircle, MinusCircle, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

function generateSessionId() {
  return `chat_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string>(() => {
    return localStorage.getItem("chat_session_id") || "";
  });
  const [visitorName, setVisitorName] = useState<string>(
    () => localStorage.getItem("chat_visitor_name") || "",
  );
  const [visitorEmail, setVisitorEmail] = useState<string>(
    () => localStorage.getItem("chat_visitor_email") || "",
  );
  const [prechatName, setPrechatName] = useState("");
  const [prechatEmail, setPrechatEmail] = useState("");
  const [inputText, setInputText] = useState("");
  const [lastSeenCount, setLastSeenCount] = useState(() =>
    Number(localStorage.getItem("chat_last_seen") || "0"),
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { mutateAsync: sendMessage, isPending: sending } =
    useSendVisitorMessage();
  const chatReady = !!sessionId && !!visitorName;
  const { data: messages = [] } = useGetChatSession(sessionId, chatReady);

  const adminMessages = messages.filter((m) => m.isFromAdmin);
  const unread = adminMessages.length - lastSeenCount;

  useEffect(() => {
    if (isOpen && messages.length > 0) {
      const adminCount = messages.filter((m) => m.isFromAdmin).length;
      setLastSeenCount(adminCount);
      localStorage.setItem("chat_last_seen", String(adminCount));
    }
  }, [isOpen, messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [isOpen]);

  const startChat = () => {
    if (!prechatName.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!prechatEmail.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(prechatEmail)) {
      toast.error("Please enter a valid email");
      return;
    }
    const sid = generateSessionId();
    setSessionId(sid);
    setVisitorName(prechatName.trim());
    setVisitorEmail(prechatEmail.trim());
    localStorage.setItem("chat_session_id", sid);
    localStorage.setItem("chat_visitor_name", prechatName.trim());
    localStorage.setItem("chat_visitor_email", prechatEmail.trim());
  };

  const handleSend = async () => {
    const content = inputText.trim();
    if (!content || !sessionId) return;
    setInputText("");
    try {
      await sendMessage({
        sessionId,
        visitorName,
        visitorEmail,
        content,
      });
    } catch {
      toast.error("Failed to send message");
      setInputText(content);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (ts: bigint) =>
    new Date(Number(ts) / 1_000_000).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-80 sm:w-96 rounded-2xl overflow-hidden flex flex-col"
            style={{
              background: "oklch(0.1 0.016 255)",
              border: "1px solid oklch(0.22 0.02 250)",
              boxShadow:
                "0 20px 60px oklch(0 0 0 / 0.7), 0 0 30px oklch(0.75 0.16 65 / 0.08)",
              height: "480px",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4 flex-shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.15 0.02 252), oklch(0.12 0.018 255))",
                borderBottom: "1px solid oklch(0.22 0.02 250)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.78 0.18 62), oklch(0.65 0.14 68))",
                  }}
                >
                  <MessageCircle className="w-4 h-4 text-[#050510]" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground font-body">
                    Live Support
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs text-muted-foreground font-body">
                      We typically reply within minutes
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            {!chatReady ? (
              // Pre-chat form
              <div className="flex-1 flex flex-col justify-center p-6 space-y-4">
                <div className="text-center mb-2">
                  <p className="text-foreground font-semibold font-body text-sm">
                    Start a conversation
                  </p>
                  <p className="text-xs text-muted-foreground font-body mt-1">
                    We'll get back to you as soon as possible.
                  </p>
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={prechatName}
                    onChange={(e) => setPrechatName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm font-body text-foreground placeholder:text-muted-foreground/50"
                    style={{
                      background: "oklch(0.13 0.018 250)",
                      border: "1px solid oklch(0.22 0.02 250)",
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    value={prechatEmail}
                    onChange={(e) => setPrechatEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && startChat()}
                    className="w-full px-4 py-3 rounded-xl text-sm font-body text-foreground placeholder:text-muted-foreground/50"
                    style={{
                      background: "oklch(0.13 0.018 250)",
                      border: "1px solid oklch(0.22 0.02 250)",
                    }}
                  />
                  <button
                    type="button"
                    onClick={startChat}
                    className="w-full h-11 rounded-xl text-sm font-semibold font-body btn-gold"
                  >
                    Start Chat
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.length === 0 ? (
                    <div className="text-center py-8">
                      <MessageCircle className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                      <p className="text-xs text-muted-foreground font-body">
                        Hi {visitorName}! How can we help you today?
                      </p>
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <div
                        key={String(msg.id)}
                        className={`flex ${
                          msg.isFromAdmin ? "justify-start" : "justify-end"
                        }`}
                      >
                        <div
                          className="max-w-[78%] rounded-2xl px-4 py-3"
                          style={{
                            background: msg.isFromAdmin
                              ? "oklch(0.16 0.02 252)"
                              : "linear-gradient(135deg, oklch(0.78 0.18 62), oklch(0.68 0.15 68))",
                            color: msg.isFromAdmin
                              ? "oklch(0.9 0.005 220)"
                              : "oklch(0.1 0.01 250)",
                          }}
                        >
                          {msg.isFromAdmin && (
                            <p
                              className="text-xs font-semibold mb-1 font-body"
                              style={{ color: "oklch(0.82 0.18 62)" }}
                            >
                              {msg.senderName}
                            </p>
                          )}
                          <p className="text-sm font-body leading-relaxed">
                            {msg.content}
                          </p>
                          <p className="text-xs mt-1.5 text-right font-body opacity-60">
                            {formatTime(msg.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div
                  className="px-4 py-3 flex items-end gap-2 flex-shrink-0"
                  style={{ borderTop: "1px solid oklch(0.18 0.022 250)" }}
                >
                  <textarea
                    placeholder="Type your message..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    className="flex-1 resize-none px-3 py-2.5 rounded-xl text-sm font-body text-foreground placeholder:text-muted-foreground/50 max-h-24"
                    style={{
                      background: "oklch(0.13 0.018 250)",
                      border: "1px solid oklch(0.22 0.02 250)",
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleSend}
                    disabled={sending || !inputText.trim()}
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all disabled:opacity-40"
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
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat bubble button */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen((v) => !v)}
        className="w-14 h-14 rounded-full flex items-center justify-center relative shadow-2xl"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.78 0.18 62), oklch(0.65 0.14 68))",
          boxShadow: "0 8px 30px oklch(0.75 0.16 65 / 0.5)",
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MinusCircle className="w-6 h-6 text-[#050510]" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="w-6 h-6 text-[#050510]" />
            </motion.div>
          )}
        </AnimatePresence>
        {unread > 0 && !isOpen && (
          <span
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold font-body"
            style={{ background: "oklch(0.6 0.22 25)", color: "white" }}
          >
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </motion.button>
    </div>
  );
}
