"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { slides } from "./slides";
import { Fog } from "@/components/ui/fog";

const variants = {
  enter: (d: number) => ({ opacity: 0, x: d * 70, filter: "blur(8px)" }),
  center: { opacity: 1, x: 0, filter: "blur(0px)" },
  exit: (d: number) => ({ opacity: 0, x: d * -70, filter: "blur(8px)" }),
};

export function Deck() {
  const [[i, dir], set] = useState<[number, number]>([0, 0]);
  const last = slides.length - 1;
  const to = (n: number) => set(([c]) => (n === c ? [c, 0] : [n, n > c ? 1 : -1]));
  const step = (d: number) => set(([c]) => { const n = Math.min(last, Math.max(0, c + d)); return n === c ? [c, 0] : [n, d]; });

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (["ArrowRight", "PageDown", " "].includes(e.key)) { e.preventDefault(); step(1); }
      else if (["ArrowLeft", "PageUp"].includes(e.key)) { e.preventDefault(); step(-1); }
      else if (e.key === "Home") to(0);
      else if (e.key === "End") to(last);
      else if (e.key === "f") document.documentElement.requestFullscreen?.();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const Cur = slides[i].C;
  return (
    <Fog className="h-dvh flex min-h-[32rem] flex-col items-center pt-20 min-h-[32rem]"
  density={0.6}
  detail={1}
  drift={2}
  height={0.61}
  holes={0.4}
  layers={3}
  light={1}
  opacity={0.2}
  scale={2}
  speed={3}>
      <header className="flex items-center justify-between px-5 py-3 text-xs text-slate-400 md:px-10">
        <span>Capstone Design · Teknik Industri UTY 2026</span>
        <span className="tabular-nums text-cyan-300">{String(i + 1).padStart(2, "0")} / {slides.length}</span>
      </header>

      <div className="relative min-h-0 flex-1 overflow-y-auto px-5 pb-4 md:px-10 [scrollbar-width:thin]">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={i}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="mx-auto flex min-h-full max-w-6xl flex-col justify-center py-2"
          >
            <Cur />
          </motion.div>
        </AnimatePresence>
      </div>

      <footer className="px-5 pb-4 md:px-10">
        <div className="mx-auto mb-3 h-px max-w-6xl overflow-hidden bg-white/10">
          <motion.div className="h-full bg-cyan-400" animate={{ width: `${((i + 1) / slides.length) * 100}%` }} />
        </div>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {slides.map((s, n) => (
              <button
                key={s.label}
                onClick={() => to(n)}
                title={`${n + 1}. ${s.label}`}
                aria-label={`Slide ${n + 1}: ${s.label}`}
                className={`h-2 rounded-full transition-all ${n === i ? "w-6 bg-cyan-400" : "w-2 bg-white/25 hover:bg-white/50"}`}
              />
            ))}
          </div>
          <span className="hidden text-sm text-slate-300 md:block">{slides[i].label}</span>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => step(-1)} disabled={i === 0} aria-label="Sebelumnya"><ChevronLeft /></Button>
            <Button variant="outline" size="icon" onClick={() => step(1)} disabled={i === last} aria-label="Berikutnya"><ChevronRight /></Button>
            <Button variant="ghost" size="icon" className="hidden md:inline-flex" onClick={() => document.documentElement.requestFullscreen?.()} aria-label="Layar penuh"><Maximize2 /></Button>
          </div>
        </div>
      </footer>
    </Fog>
  );
}
