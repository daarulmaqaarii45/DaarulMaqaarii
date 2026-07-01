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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Aref+Ruqaa:wght@400;700&family=Lateef&family=Marcellus&family=Cinzel:wght@500;600;700;800;900&family=Playfair+Display:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
