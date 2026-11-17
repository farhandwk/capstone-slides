import type { Metadata } from "next";
import { Inter, Space_Grotesk, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Capstone Design — Sistem Pelaporan Produksi IoT & HMI",
  description: "Presentasi Capstone Design Project, Teknik Industri UTY 2026",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={cn("dark", body.variable, display.variable, "font-sans", geist.variable)}>
      <body className="bg-[#050b14] font-[family-name:var(--font-body)] text-slate-100 antialiased">
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
