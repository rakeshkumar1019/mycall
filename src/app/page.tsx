"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Video,
  Users,
  Globe,
  Shield,
  ArrowRight,
  Sparkles,
  Copy,
  Check,
} from "lucide-react";

function generateRoomId(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  const seg = (len: number) =>
    Array.from({ length: len }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join("");
  return `${seg(3)}-${seg(4)}-${seg(3)}`;
}

const FEATURES = [
  {
    icon: <Globe size={24} />,
    title: "Works Everywhere",
    desc: "Connect with anyone across different networks seamlessly.",
  },
  {
    icon: <Shield size={24} />,
    title: "Encrypted Calls",
    desc: "End‑to‑end encryption keeps your meetings private.",
  },
  {
    icon: <Users size={24} />,
    title: "No Account Needed",
    desc: "Just share a link and start talking — zero sign‑ups.",
  },
  {
    icon: <Video size={24} />,
    title: "HD Video & Audio",
    desc: "Crystal‑clear quality powered by Jitsi infrastructure.",
  },
];

export default function Home() {
  const router = useRouter();
  const [roomInput, setRoomInput] = useState("");
  const [generatedRoom, setGeneratedRoom] = useState("");
  const [copied, setCopied] = useState(false);

  const handleNewMeeting = () => {
    const room = generateRoomId();
    setGeneratedRoom(room);
  };

  const handleJoinRoom = () => {
    const room = roomInput.trim();
    if (room) {
      router.push(`/meeting/${encodeURIComponent(room)}`);
    }
  };

  const handleStartGenerated = () => {
    if (generatedRoom) {
      router.push(`/meeting/${encodeURIComponent(generatedRoom)}`);
    }
  };

  const handleCopy = () => {
    if (!generatedRoom) return;
    const url = `${window.location.origin}/meeting/${generatedRoom}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Animated background */}
      <div className="gradient-bg" />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Navbar */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 40px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: "linear-gradient(135deg, #6c5ce7, #a29bfe)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Video size={22} color="white" />
            </div>
            <span style={{ fontSize: 22, fontWeight: 700 }}>MeetFlow</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div className="pulse-dot" />
            <span style={{ fontSize: 14, color: "var(--text-secondary)" }}>
              Free &amp; Open
            </span>
          </div>
        </nav>

        {/* Hero */}
        <main
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px 20px 60px",
            gap: 48,
          }}
        >
          {/* Heading */}
          <div
            style={{
              textAlign: "center",
              maxWidth: 640,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 16px",
                borderRadius: 999,
                background: "rgba(108,92,231,0.12)",
                border: "1px solid rgba(108,92,231,0.25)",
                fontSize: 13,
                fontWeight: 500,
                color: "var(--accent-secondary)",
                marginBottom: 24,
              }}
            >
              <Sparkles size={14} /> Powered by Jitsi — 100 % Free
            </div>
            <h1
              style={{
                fontSize: "clamp(36px, 5vw, 56px)",
                fontWeight: 800,
                lineHeight: 1.15,
                marginBottom: 16,
              }}
            >
              Video Meetings,{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent-primary), var(--success))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Simplified
              </span>
            </h1>
            <p
              style={{
                fontSize: 18,
                color: "var(--text-secondary)",
                lineHeight: 1.6,
              }}
            >
              Start or join a meeting in seconds — no downloads, no accounts, no
              cost. Works across any network.
            </p>
          </div>

          {/* Action Card */}
          <div
            className="glass-card"
            style={{
              width: "100%",
              maxWidth: 480,
              padding: 36,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Decorative orbs */}
            <div
              className="orb orb-1"
              style={{ width: 180, height: 180, top: -60, right: -60 }}
            />
            <div
              className="orb orb-2"
              style={{ width: 120, height: 120, bottom: -40, left: -40 }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
              {/* New meeting */}
              <button
                className="glow-btn glow-btn-primary"
                onClick={handleNewMeeting}
                style={{ width: "100%", marginBottom: 20 }}
              >
                <Video size={20} />
                New Meeting
              </button>

              {/* Generated room */}
              {generatedRoom && (
                <div
                  style={{
                    marginBottom: 20,
                    padding: 16,
                    borderRadius: 14,
                    background: "rgba(108,92,231,0.08)",
                    border: "1px solid var(--border-color)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: 18,
                        fontWeight: 600,
                        color: "var(--accent-secondary)",
                      }}
                    >
                      {generatedRoom}
                    </span>
                    <button
                      onClick={handleCopy}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "var(--text-secondary)",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        fontSize: 13,
                      }}
                    >
                      {copied ? (
                        <Check size={16} color="var(--success)" />
                      ) : (
                        <Copy size={16} />
                      )}
                      {copied ? "Copied!" : "Copy link"}
                    </button>
                  </div>
                  <button
                    className="glow-btn glow-btn-secondary"
                    onClick={handleStartGenerated}
                    style={{ width: "100%" }}
                  >
                    Start Meeting <ArrowRight size={18} />
                  </button>
                </div>
              )}

              <div className="divider" style={{ margin: "4px 0 20px" }}>
                OR
              </div>

              {/* Join existing */}
              <div style={{ display: "flex", gap: 10 }}>
                <input
                  className="modern-input"
                  type="text"
                  placeholder="Enter a room code"
                  value={roomInput}
                  onChange={(e) => setRoomInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleJoinRoom()}
                />
                <button
                  className="glow-btn glow-btn-secondary"
                  onClick={handleJoinRoom}
                  style={{ whiteSpace: "nowrap" }}
                  disabled={!roomInput.trim()}
                >
                  Join
                </button>
              </div>
            </div>
          </div>

          {/* Feature grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 20,
              width: "100%",
              maxWidth: 960,
            }}
          >
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="glass-card"
                style={{ padding: 24, display: "flex", gap: 16 }}
              >
                <div className="feature-icon">{f.icon}</div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>
                    {f.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      color: "var(--text-secondary)",
                      lineHeight: 1.5,
                    }}
                  >
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer
          style={{
            textAlign: "center",
            padding: "20px 0 24px",
            fontSize: 13,
            color: "var(--text-secondary)",
          }}
        >
          Built with Next.js &amp; Jitsi Meet — 100 % free, forever.
        </footer>
      </div>
    </>
  );
}
