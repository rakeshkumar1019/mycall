"use client";

import { useEffect, useRef, useState } from "react";

// JaaS (Jitsi as a Service) tenant configuration
const JAAS_TENANT_ID = "vpaas-magic-cookie-e7012e1d980d4841b0365b8e32b8abfc";
const JAAS_SCRIPT_URL = `https://8x8.vc/${JAAS_TENANT_ID}/external_api.js`;

interface JitsiMeetingProps {
    roomName: string;
    displayName?: string;
    onClose?: () => void;
}

declare global {
    interface Window {
        JitsiMeetExternalAPI: any;
    }
}

export default function JitsiMeeting({
    roomName,
    displayName = "Guest",
    onClose,
}: JitsiMeetingProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const apiRef = useRef<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let disposed = false;

        // Check if the script is already loaded
        if (window.JitsiMeetExternalAPI) {
            initJitsi();
            return;
        }

        // Load the Jitsi Meet External API script
        const script = document.createElement("script");
        script.src = JAAS_SCRIPT_URL;
        script.async = true;
        script.onload = () => {
            if (!disposed) initJitsi();
        };
        script.onerror = () => {
            console.error("Failed to load Jitsi External API");
            setLoading(false);
        };
        document.head.appendChild(script);

        function initJitsi() {
            if (!containerRef.current || !window.JitsiMeetExternalAPI) return;

            try {
                const api = new window.JitsiMeetExternalAPI("8x8.vc", {
                    roomName: `${JAAS_TENANT_ID}/${roomName}`,
                    parentNode: containerRef.current,
                    width: "100%",
                    height: "100%",
                    userInfo: {
                        displayName: displayName,
                    },
                    configOverwrite: {
                        prejoinPageEnabled: true,
                        disableDeepLinking: true,
                    },
                });

                apiRef.current = api;

                // Hide the loading overlay once the iframe is ready
                // so the user can interact with Jitsi's prejoin screen
                api.addEventListener("browserSupport", () => {
                    setLoading(false);
                });

                // Fallback: hide after a short delay in case the event doesn't fire
                setTimeout(() => {
                    if (!disposed) setLoading(false);
                }, 2000);

                api.addEventListener("readyToClose", () => {
                    if (onClose) onClose();
                });
            } catch (err) {
                console.error("Failed to initialize Jitsi:", err);
                setLoading(false);
            }
        }

        return () => {
            disposed = true;
            if (apiRef.current) {
                apiRef.current.dispose();
                apiRef.current = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomName, displayName]);

    return (
        <div className="jitsi-container">
            {loading && (
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 20,
                        background: "var(--bg-primary)",
                        zIndex: 10,
                        pointerEvents: "none",
                    }}
                >
                    <div className="spinner" />
                    <p
                        style={{
                            color: "var(--text-secondary)",
                            fontSize: 16,
                            fontWeight: 500,
                        }}
                    >
                        Connecting to your meeting…
                    </p>
                </div>
            )}
            <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
        </div>
    );
}
