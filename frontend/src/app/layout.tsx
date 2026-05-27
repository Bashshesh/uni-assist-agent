import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UniPath Germany — AI поступление в немецкие вузы",
  description: "AI-агент для поступления в университеты Германии",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-slate-950">{children}</body>
    </html>
  );
}