"use client";
import { ReactNode, useEffect, useState } from "react";
import { animate, motion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } };

export const Stagger = ({ children, className }: { children: ReactNode; className?: string }) => (
  <motion.div variants={container} initial="hidden" animate="show" className={className}>{children}</motion.div>
);
export const Rise = ({ children, className }: { children: ReactNode; className?: string }) => (
  <motion.div variants={item} className={className}>{children}</motion.div>
);

export const Glass = ({ children, className }: { children: ReactNode; className?: string }) => (
  <Card className={cn("gap-0 rounded-2xl border-cyan-400/15 bg-white/[0.04] p-5 py-5 shadow-none backdrop-blur-md", className)}>{children}</Card>
);

export const Title = ({ tag, children }: { tag: string; children: ReactNode }) => (
  <Rise className="mb-5">
    <Badge variant="outline" className="mb-2 border-cyan-400/40 text-cyan-300">{tag}</Badge>
    <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold leading-tight md:text-4xl">{children}</h2>
  </Rise>
);

export const Pill = ({ on, onClick, children, className }: { on: boolean; onClick: () => void; children: ReactNode; className?: string }) => (
  <button
    onClick={onClick}
    className={cn(
      "rounded-xl border px-4 py-2.5 text-left text-sm transition-all",
      on ? "border-cyan-400 bg-cyan-400/15 text-cyan-100 shadow-[0_0_24px_-6px_#22d3ee]" : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-cyan-400/40",
      className,
    )}
  >
    {children}
  </button>
);

export const Ph = ({ label, className }: { label: string; className?: string }) => (
  <div className={cn("flex min-h-28 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-cyan-400/40 bg-cyan-400/[0.04] p-4 text-center text-xs text-cyan-200/80", className)}>
    <ImageIcon className="size-6" />
    {label}
  </div>
);

export function Count({ to, dec = 0, suf = "" }: { to: number; dec?: number; suf?: string }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const c = animate(0, to, { duration: 1.4, onUpdate: setV });
    return () => c.stop();
  }, [to]);
  return <>{v.toLocaleString("id-ID", { minimumFractionDigits: dec, maximumFractionDigits: dec })}{suf}</>;
}

export const Bullets = ({ items, className }: { items: ReactNode[]; className?: string }) => (
  <ul className={cn("space-y-2 text-sm leading-relaxed text-slate-300", className)}>
    {items.map((t, n) => (
      <li key={n} className="flex gap-2"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan-400" /><span>{t}</span></li>
    ))}
  </ul>
);

export const Waterfall = () => {
  const s = ["Requirement", "Design", "Implementation", "Verification", "Maintenance"];
  return (
    <div>
      <div className="flex items-start gap-1.5 overflow-x-auto pb-1">
        {s.map((t, n) => (
          <div key={t} className="flex items-start gap-1.5" style={{ marginTop: n * 12 }}>
            <div className="rounded-lg border border-cyan-400/40 bg-cyan-400/10 px-3 py-2 text-xs font-medium text-cyan-100">{n + 1}. {t}</div>
            {n < 4 && <span className="mt-2 text-cyan-400">›</span>}
          </div>
        ))}
      </div>
      <p className="mt-6 text-xs text-amber-300/90">↺ Decision loop: jika belum sesuai spesifikasi, kembali ke Implementation atau Design.</p>
    </div>
  );
};
