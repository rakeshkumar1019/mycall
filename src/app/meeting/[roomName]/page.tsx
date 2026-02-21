"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft, Video, User, Copy, Check, ExternalLink } from "lucide-react";

export default function MeetingPage() {
    const params = useParams();
    const router = useRouter();
    const roomName = decodeURIComponent(params.roomName as string);

    const [displayName, setDisplayName] = useState("");
    const [copied, setCopied] = useState(false);
    const [launched, setLaunched] = useState(false);

    const jitsiUrl = `https://meet.jit.si/${encodeURIComponent(roomName)}`;

    const handleJoin = () => {
        // Build the Jitsi URL with config params
        const configParams = new URLSearchParams();
        if (displayName.trim()) {
            configParams.set("userInfo.displayName", displayName.trim());
        }
        configParams.set("config.prejoinPageEnabled", "true");
        configParams.set("config.disableDeepLinking", "true");

        const fullUrl = `${jitsiUrl}#${configParams.toString()}`;
        window.open(fullUrl, "_blank", "noopener,noreferrer");
        setLaunched(true);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(jitsiUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            <div className="gradient-bg" />
            <div
                style={{
                    position: "relative",
                    zIndex: 1,
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 20,
                }}
            >
                <div
                    className="glass-card"
                    style={{
                        width: "100%",
                        maxWidth: 460,
                        padding: 40,
                        textAlign: "center",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    {/* Decorative orbs */}
                    <div className="orb orb-1" style={{ width: 150, height: 150, top: -50, right: -50 }} />
                    <div className="orb orb-2" style={{ width: 100, height: 100, bottom: -30, left: -30 }} />

                    <div style={{ position: "relative", zIndex: 1 }}>
                        {/* Back link */}
                        <button
                            onClick={() => router.push("/")}
                            style={{
                                background: "none",
                                border: "none",
                                color: "var(--text-secondary)",
                                cursor: "pointer",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 6,
                                fontSize: 14,
                                marginBottom: 28,
                            }}
                        >
                            <ArrowLeft size={16} /> Back to home
                        </button>

                        {/* Meeting icon */}
                        <div
                            style={{
                                width: 72,
                                height: 72,
                                borderRadius: 20,
                                background: "linear-gradient(135deg, #6c5ce7, #a29bfe)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "0 auto 20px",
                            }}
                        >
                            <Video size={32} color="white" />
                        </div>

                        {!launched ? (
                            <>
                                <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>
                                    Ready to join?
                                </h2>
                                <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 8 }}>
                                    Room
                                </p>
                                <p
                                    style={{
                                        fontFamily: "monospace",
                                        fontSize: 20,
                                        fontWeight: 600,
                                        color: "var(--accent-secondary)",
                                        marginBottom: 24,
                                        wordBreak: "break-all",
                                    }}
                                >
                                    {roomName}
                                </p>

                                {/* Display name input */}
                                <div style={{ marginBottom: 20, textAlign: "left" }}>
                                    <label
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 6,
                                            fontSize: 13,
                                            color: "var(--text-secondary)",
                                            marginBottom: 8,
                                        }}
                                    >
                                        <User size={14} /> Your name (optional)
                                    </label>
                                    <input
                                        className="modern-input"
                                        type="text"
                                        placeholder="Enter your name"
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleJoin()}
                                    />
                                </div>

                                <button
                                    className="glow-btn glow-btn-primary"
                                    onClick={handleJoin}
                                    style={{ width: "100%", marginBottom: 16 }}
                                >
                                    <ExternalLink size={20} />
                                    Join Meeting
                                </button>

                                <button
                                    onClick={handleCopy}
                                    style={{
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer",
                                        color: "var(--text-secondary)",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 6,
                                        fontSize: 13,
                                        margin: "0 auto",
                                    }}
                                >
                                    {copied ? <Check size={14} color="var(--success)" /> : <Copy size={14} />}
                                    {copied ? "Link copied!" : "Copy meeting link"}
                                </button>
                            </>
                        ) : (
                            /* Post-launch state */
                            <>
                                <div
                                    style={{
                                        width: 12,
                                        height: 12,
                                        borderRadius: "50%",
                                        background: "var(--success)",
                                        margin: "0 auto 16px",
                                        animation: "pulse 2s ease-in-out infinite",
                                    }}
                                />
                                <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
                                    Meeting Launched!
                                </h2>
                                <p
                                    style={{
                                        fontSize: 14,
                                        color: "var(--text-secondary)",
                                        lineHeight: 1.6,
                                        marginBottom: 24,
                                    }}
                                >
                                    Your meeting opened in a new tab. No time limits!
                                </p>

                                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                    <button
                                        className="glow-btn glow-btn-primary"
                                        onClick={handleJoin}
                                        style={{ width: "100%" }}
                                    >
                                        <ExternalLink size={18} />
                                        Reopen Meeting
                                    </button>

                                    <button
                                        onClick={handleCopy}
                                        className="glow-btn glow-btn-secondary"
                                        style={{ width: "100%" }}
                                    >
                                        {copied ? <Check size={16} color="var(--success)" /> : <Copy size={16} />}
                                        {copied ? "Link copied!" : "Copy meeting link to share"}
                                    </button>

                                    <button
                                        className="glow-btn glow-btn-secondary"
                                        onClick={() => router.push("/")}
                                        style={{ width: "100%" }}
                                    >
                                        <ArrowLeft size={18} />
                                        Back to Home
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Info notice */}
                <p
                    style={{
                        marginTop: 24,
                        fontSize: 13,
                        color: "var(--text-secondary)",
                        textAlign: "center",
                        maxWidth: 400,
                        lineHeight: 1.6,
                    }}
                >
                    Meetings open directly on Jitsi — unlimited duration, encrypted, and free.
                </p>
            </div>
        </>
    );
}
