import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MeetFlow — Free Video Meetings",
  description:
    "Start or join a free video meeting instantly. No downloads, no sign‑ups. Powered by Jitsi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
