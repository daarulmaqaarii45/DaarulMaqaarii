import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daarul Maqaaril Litahfeedhil Qur'aan wa Ulumil Arabiyyah",
  description:
    "Islamic school management portal for Daarul Maqaaril — Qur'an memorisation, Arabic and Islamic studies, Lagos Island."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
