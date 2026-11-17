"use client";
import { ReactNode, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight, BookOpen, Check, Cpu, Database, FileText, Footprints, Hourglass, Keyboard,
  LayoutDashboard, Printer, Server, Wifi,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Bullets, Count, Glass, Ph, Pill, Rise, Stagger, Title, Waterfall } from "./slide-ui";

const D = "font-[family-name:var(--font-display)]";
const Swap = ({ k, children, className }: { k: string | number; children: ReactNode; className?: string }) => (
  <AnimatePresence mode="wait">
    <motion.div key={k} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className={className}>{children}</motion.div>
  </AnimatePresence>
);

/* 1 — Sampul */
function Cover() {
  const team = [["Muhamad Arifin", "5230611003"], ["Abdul Ghoni", "5230611025"], ["Farhan Dwiki Ardhani", "5230611118"], ["Hadrian Abel Alfarrel", "5230611121"], ["Rian Fajar Saputra", "5230611145"]];
  return (
    <Stagger className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
      <div>
        <Rise><Badge variant="outline" className="mb-4 border-cyan-400/40 text-cyan-300">Laporan Capstone Design Project · Teknik Industri · UTY 2026</Badge></Rise>
        <Rise><h1 className={`${D} text-3xl font-semibold leading-tight md:text-5xl`}>Rancang Bangun Sistem Pelaporan Produksi Berbasis IoT dan HMI Terintegrasi Web API untuk Pencetakan Part Card Otomatis</h1></Rise>
        <Rise className="mt-6 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
          <div><p className="text-xs text-slate-500">Dosen pembimbing</p>Ari Zaqi Al-Faritsy, S.T., M.T.</div>
          <div><p className="text-xs text-slate-500">Mitra industri</p>PT. Mitrametal Perkasa — Departemen Plating, Stasiun Final Check</div>
        </Rise>
      </div>
      <Rise>
        <Glass>
          <p className="mb-3 text-sm text-slate-400">Tim penyusun</p>
          <ul className="space-y-2.5">
            {team.map(([n, id]) => (
              <li key={id} className="flex items-baseline justify-between gap-3 border-b border-white/5 pb-2 text-sm last:border-0"><span>{n}</span><span className="tabular-nums text-xs text-cyan-300/80">{id}</span></li>
            ))}
          </ul>
        </Glass>
      </Rise>
    </Stagger>
  );
}

/* 2 — Latar belakang */
function Background() {
  const [a, setA] = useState(0);
  const stats: [ReactNode, string][] = [
    [<Count key="a" to={1150000} />, "pieces per bulan, semua tipe produk"],
    [<>3 × 7</>, "shift × jam kerja per hari"],
    [<Count key="b" to={45} suf=" dtk" />, "terbuang per lot (motion)"],
    [<Count key="c" to={37.5} dec={1} suf=" mnt" />, "non-value added per shift"],
  ];
  const probs = [
    { k: "Motion waste", i: <Footprints />, t: "Operator mondar-mandir meninggalkan stasiun untuk mengambil dan menulis part card manual setiap lot selesai. Rata-rata 45 detik per lot, terakumulasi hingga 37,5 menit per shift (7 jam) untuk aktivitas non-value added." },
    { k: "Paper waste", i: <FileText />, t: "Human error penulisan manual memicu pemborosan kertas, dibuktikan 4 bukti teguran tertulis manajemen (1 Sep – 31 Okt 2026): sisa kartu menumpuk di laci, kartu tanpa keterangan lengkap pada 3 kantong besar, dan lupa menyertakan part card pada FC L.comp K2SM.", ph: "Placeholder: gambar bukti chat teguran" },
    { k: "Information lead time", i: <Hourglass />, t: "Rekapitulasi dilakukan di akhir shift sehingga ada jeda informasi 7 jam. Staf pendataan menanggung redundant data entry (menyalin ulang dari kertas ke komputer) selama 20 menit per hari." },
  ];
  const p = probs[a];
  return (
    <Stagger>
      <Title tag="Latar belakang">Skala produksi besar, pencatatan masih manual</Title>
      <Rise className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map(([v, l], n) => (
          <Glass key={n} className="p-4"><p className={`${D} text-2xl font-semibold text-cyan-300 md:text-3xl`}>{v}</p><p className="mt-1 text-xs text-slate-400">{l}</p></Glass>
        ))}
      </Rise>
      <Rise className="mb-3 text-xs text-slate-400">Lini plating memakai Automatic Zinc Barrel and Rack Machines serta mesin Chromating Barrel (otomatis & manual) untuk Trivalent Black, Coloured, dan Glossy. Pilih satu dari tiga akar masalah di Final Check:</Rise>
      <Rise className="grid gap-4 md:grid-cols-[1fr_2fr]">
        <div className="flex gap-2 md:flex-col">
          {probs.map((x, n) => (
            <Pill key={x.k} on={a === n} onClick={() => setA(n)} className="flex flex-1 items-center gap-2 md:flex-none">{x.i}{x.k}</Pill>
          ))}
        </div>
        <Glass>
          <Swap k={a}>
            <p className="text-sm leading-relaxed text-slate-200">{p.t}</p>
            {p.ph && <Ph label={p.ph} className="mt-3" />}
          </Swap>
          <p className="mt-4 border-t border-white/10 pt-3 text-xs text-slate-400">Studi terdahulu: pemborosan gerak dan waktu tunggu termasuk penyumbang terbesar yang memperpanjang cycle time dan menurunkan efisiensi kapasitas (Kholil et al., 2022).</p>
        </Glass>
      </Rise>
    </Stagger>
  );
}

/* 3 — Rumusan masalah & tujuan */
function Goals() {
  const [m, setM] = useState<"rm" | "tj">("rm");
  const rm = [
    "Bagaimana merancang dan membangun purwarupa mesin part card otomatis berbasis mikrokontroler, keypad numerik, dan printer termal melalui tahapan metode Waterfall untuk mereduksi motion waste, paper waste, dan time waste?",
    "Bagaimana mengembangkan arsitektur komunikasi data menggunakan Web API untuk menghubungkan purwarupa dengan basis data Web App agar penyelesaian lot terpantau secara real-time?",
    "Bagaimana pengujian fungsionalitas purwarupa menggunakan Black-box Testing untuk memastikan respons tombol, isi part card, pencetakan, dan pengiriman data berjalan sesuai kebutuhan?",
  ];
  const tj = [
    "Merancang dan membangun purwarupa (prototype) mesin part card otomatis berbasis mikrokontroler, keypad numerik, dan printer thermal melalui tahapan metode Waterfall sebagai solusi untuk mengurangi motion waste, paper waste, dan time waste di stasiun final check Departemen Plating.",
    "Mengembangkan arsitektur komunikasi data menggunakan Web API untuk menghubungkan purwarupa (prototype) dengan basis data Web App, sehingga penyelesaian lot dapat dipantau secara real-time.",
    "Menguji fungsionalitas purwarupa (prototype) dengan Black-box Testing untuk memastikan respons tombol, isi part card, pencetakan, dan pengiriman data berjalan sesuai kebutuhan.",
  ];
  const list = m === "rm" ? rm : tj;
  return (
    <Stagger>
      <Title tag="Bab I">Tiga pertanyaan, tiga tujuan yang saling berpasangan</Title>
      <Rise className="mb-4 flex gap-2">
        <Pill on={m === "rm"} onClick={() => setM("rm")}>Rumusan masalah</Pill>
        <Pill on={m === "tj"} onClick={() => setM("tj")}>Tujuan penelitian</Pill>
      </Rise>
      <Swap k={m} className="grid gap-4 md:grid-cols-3">
        {list.map((t, n) => (
          <Glass key={n} className="relative">
            <span className={`${D} text-5xl font-semibold text-cyan-400/25`}>{m === "rm" ? "RM" : "T"}{n + 1}</span>
            <p className="mt-2 text-sm leading-relaxed text-slate-200">{t}</p>
          </Glass>
        ))}
      </Swap>
    </Stagger>
  );
}

/* 4 — Ruang lingkup */
function Scope() {
  const [a, setA] = useState(0);
  const cols = [
    { t: "Fokus objek & luaran", i: <Check />, x: "Dibatasi pada proses pembuatan part card di stasiun final check Departemen Plating PT. Mitrametal Perkasa pada tahap purwarupa (prototype) — belum dipasang permanen, belum diterapkan massal, dan belum terintegrasi dengan sistem ERP eksisting." },
    { t: "Batasan perangkat keras", i: <Cpu />, x: "Mikrokontroler ESP32, keypad, layar LCD, dan printer thermal Bluetooth (tanpa pemindaian barcode/QR code). Dilengkapi casing khusus dengan sirkulasi udara dan kipas pendingin, tanpa pengujian standar industri formal (seperti standar IP atau uji getaran)." },
    { t: "Batasan sistem & pengujian", i: <Server />, x: "Satu kali penekanan tombol mengeksekusi dua fungsi: simpan data via Web API + cetak struk part card berisi data terprogram beserta tanggal dan waktu otomatis. Pengujian dibatasi pada Black-box Testing dalam kondisi terkontrol dan jaringan Wi-Fi stabil, tanpa analisis kelayakan finansial (ROI/payback period)." },
  ];
  return (
    <Stagger>
      <Title tag="Bab I">Ruang lingkup & batasan masalah</Title>
      <Rise className="flex flex-col gap-3 md:flex-row">
        {cols.map((c, n) => (
          <motion.button key={c.t} layout onClick={() => setA(n)} className={`rounded-2xl border p-5 text-left backdrop-blur-md transition-colors ${a === n ? "border-cyan-400 bg-cyan-400/10 md:flex-[2.4]" : "border-white/10 bg-white/[0.03] md:flex-1 hover:border-cyan-400/40"}`}>
            <div className="flex items-center gap-2 text-cyan-300 [&_svg]:size-5"><span>{c.i}</span><span className="font-medium text-slate-100">{c.t}</span></div>
            {a === n && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-sm leading-relaxed text-slate-300">{c.x}</motion.p>}
          </motion.button>
        ))}
      </Rise>
    </Stagger>
  );
}

/* 5 — Manfaat */
function Benefits() {
  return (
    <Stagger>
      <Title tag="Bab I">Manfaat penelitian</Title>
      <div className="grid gap-4 md:grid-cols-[1fr_1.4fr]">
        <Rise><Glass className="h-full"><p className={`${D} mb-3 flex items-center gap-2 text-lg text-cyan-300`}><BookOpen className="size-5" />Akademis</p>
          <Bullets items={["Mengontribusikan penerapan digitalisasi Lean Manufacturing dalam Teknik Industri.", "Menjadi referensi integrasi IoT–HMI–Web API.", "Mendemonstrasikan metode Waterfall pada rekayasa hardware dan software secara simultan."]} /></Glass></Rise>
        <div className="grid gap-4">
          <Rise><Glass><p className={`${D} mb-3 text-lg text-cyan-300`}>Praktis — PT. Mitrametal Perkasa</p>
            <Bullets items={["Mengeliminasi pergerakan operator meninggalkan stasiun kerja dan menekan limbah kertas akibat kesalahan tulis.", "Mempercepat aliran informasi produksi ke manajemen dan Production Control secara real-time sebagai dasar data-driven decision making."]} /></Glass></Rise>
          <Rise><Glass><p className={`${D} mb-3 text-lg text-cyan-300`}>Praktis — Operator & staf</p>
            <Bullets items={["Pembuatan part card cukup 1 kali tekan tombol bagi operator.", "Menghilangkan beban penyalinan ulang data manual bagi staf pendataan."]} /></Glass></Rise>
        </div>
      </div>
    </Stagger>
  );
}

/* 6 — Tinjauan pustaka */
function Literature() {
  const [a, setA] = useState(0);
  const c = [
    { t: "IoT & pemantauan real-time", m: ["1–2 detik deteksi anomali"], x: "Arsitektur IoT berbiaya rendah berbasis RESTful API, MQTT, maupun RF terbukti memangkas latensi deteksi anomali dan meningkatkan efisiensi produksi.", r: "Vo et al., 2026; Abdulmalek et al., 2026; Chai et al., 2024; Yeh et al., 2021" },
    { t: "Smart manufacturing & integrasi sistem", m: ["Downtime 1,32 → 0,13 jam", "Kesalahan informasi 41,5% → 16,2%"], x: "Penerapan IIoT, Digital Twin, CMMS, dan Information Hub terpusat menekan downtime harian, menurunkan kesalahan informasi, serta memangkas waktu pertukaran data.", r: "Wang et al., 2024; Robby Maududy et al., 2026; Yehorchenkova et al., 2024" },
    { t: "Metodologi & latensi", m: ["Waterfall + Black-box", "API stabil di beban tinggi"], x: "Waterfall dan Black-box Testing tervalidasi efektif pada pengembangan perangkat IoT terintegrasi web, sementara uji beban API menunjukkan kestabilan transmisi di bawah beban tinggi.", r: "M Mujiono et al., 2023; de Mendonça Moreira et al., 2026" },
  ][a];
  return (
    <Stagger>
      <Title tag="Bab II">Sintesis 20 literatur utama (2021–2026) dan posisi riset</Title>
      <Rise className="grid gap-4 md:grid-cols-[1fr_1.6fr]">
        <div className="flex flex-col gap-2">
          {["IoT & pemantauan real-time", "Smart manufacturing & integrasi sistem", "Metodologi & latensi"].map((t, n) => <Pill key={t} on={a === n} onClick={() => setA(n)}>{t}</Pill>)}
        </div>
        <Glass>
          <Swap k={a}>
            <div className="mb-3 flex flex-wrap gap-2">{c.m.map((x) => <Badge key={x} className="bg-cyan-400/15 text-cyan-200">{x}</Badge>)}</div>
            <p className="text-sm leading-relaxed text-slate-200">{c.x}</p>
            <p className="mt-3 text-xs text-slate-500">{c.r}</p>
          </Swap>
        </Glass>
      </Rise>
      <Rise className="mt-4 grid items-stretch gap-4 md:grid-cols-[1.6fr_1fr]">
        <Glass className="border-amber-300/30 bg-amber-300/[0.05]"><p className={`${D} mb-1 text-amber-300`}>Research gap</p>
          <p className="text-sm leading-relaxed text-slate-200">Mengisi celah penerapan IoT HMI berbiaya rendah (retrofit) yang menggabungkan output fisik instan (thermal part card) sekaligus pencatatan cloud real-time langsung dari stasiun inspeksi manual (final check).</p></Glass>
        <Ph label="Placeholder: foto meja final check" />
      </Rise>
    </Stagger>
  );
}

/* 7 — Landasan teori */
const logos = [["nextdotjs", "Next.js"], ["tailwindcss", "Tailwind CSS"], ["shadcnui", "shadcn/ui"], ["supabase", "Supabase"], ["postgresql", "PostgreSQL"], ["espressif", "ESP32"]];
function Theory() {
  const [a, setA] = useState(0);
  const tabs = [
    { t: "IoT & ESP32", x: "IoT bekerja dalam 3 lapisan: Fisik, Jaringan, Aplikasi. ESP32 dipilih karena prosesor dual-core, konektivitas Wi-Fi dan Bluetooth bawaan, serta dukungan antarmuka GPIO, I2C, dan UART untuk menghubungkan keypad, LCD, dan printer thermal secara bersamaan (Hercog et al., 2023)." },
    { t: "Lean manufacturing", x: "Berfokus pada eliminasi 8 jenis pemborosan (khususnya motion, waiting, over-processing, dan defects/limbah kertas) agar aliran nilai informasi dari lantai pabrik ke manajemen berjalan tanpa hambatan (Prawira et al., 2024)." },
    { t: "Traceability", x: "Mendukung fungsi tracking (hilir) dan tracing (hulu) melalui perekaman stempel waktu (timestamp) yang presisi hingga ke detik saat lot diselesaikan (Fortuna & Gaspar, 2022)." },
    { t: "Arsitektur sistem informasi", x: "Next.js (frontend & endpoint RESTful Web API via HTTP), PostgreSQL pada Supabase (DBMS relasional dengan API otomatis), pemodelan ERD & UML (Use-Case & Activity Diagram), serta Waterfall dan Black-box Testing (Equivalence Class Partitioning & Scenario-based Testing)." },
  ];
  return (
    <Stagger>
      <Title tag="Bab II">Landasan teori</Title>
      <Rise className="mb-4 flex flex-wrap gap-2">{tabs.map((t, n) => <Pill key={t.t} on={a === n} onClick={() => setA(n)}>{t.t}</Pill>)}</Rise>
      <Rise>
        <Glass>
          <Swap k={a}>
            <p className="max-w-4xl text-sm leading-relaxed text-slate-200">{tabs[a].x}</p>
            {a === 3 && (
              <div className="mt-5 grid gap-5 md:grid-cols-[1fr_1.5fr]">
                <div className="grid grid-cols-3 gap-3">
                  {logos.map(([s, n]) => (
                    <div key={s} className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs text-slate-300">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`https://cdn.simpleicons.org/${s}/ffffff`} alt={n} className="size-8" />{n}
                    </div>
                  ))}
                </div>
                <div><p className="mb-3 text-xs text-slate-400">Diagram alir metode Waterfall</p><Waterfall /></div>
              </div>
            )}
          </Swap>
        </Glass>
      </Rise>
    </Stagger>
  );
}

/* 8 — Metodologi */
function Method() {
  const [a, setA] = useState(0);
  const ph = [
    { t: "Studi literatur & observasi lapangan", x: "Mengkaji referensi ilmiah terkait IoT, HMI, Web API, dan Lean Manufacturing, sekaligus mengamati langsung alur pencatatan part card manual di stasiun Final Check Departemen Plating PT. Mitrametal Perkasa." },
    { t: "Identifikasi & perumusan masalah", x: "Memetakan tiga permasalahan utama — information lead time 7 jam, motion waste, dan paper waste — lalu merumuskannya ke dalam pertanyaan teknis perancangan hardware HMI dan antarmuka cloud." },
    { t: "Penentuan tujuan & batasan masalah", x: "Menetapkan target luaran purwarupa sebagai parameter keberhasilan serta membatasi ruang lingkup hingga pengujian fungsional tanpa implementasi permanen di lini massal maupun integrasi langsung ke ERP eksisting." },
  ];
  return (
    <Stagger>
      <Title tag="Bab III">Metodologi: tiga fase makro dengan kerangka Waterfall</Title>
      <div className="grid gap-4 md:grid-cols-[1fr_1.2fr]">
        <Rise><Ph label="Placeholder: diagram alir penelitian" className="h-full min-h-56" /></Rise>
        <Rise className="space-y-3">
          <Glass className="p-4"><p className="mb-2 text-sm font-medium text-cyan-300">1. Tahap pendahuluan <span className="font-normal text-slate-400">— pemetaan masalah & penetapan arah proyek</span></p>
            <div className="flex flex-wrap gap-2">{ph.map((p, n) => <Pill key={p.t} on={a === n} onClick={() => setA(n)} className="px-3 py-1.5 text-xs">{n + 1}. {p.t}</Pill>)}</div>
            <Swap k={a}><p className="mt-3 text-sm leading-relaxed text-slate-300">{ph[a].x}</p></Swap></Glass>
          <Glass className="p-4"><p className="text-sm font-medium text-cyan-300">2. Pengembangan sistem dengan metode Waterfall</p><p className="mt-1 text-sm text-slate-300">Requirement, Design, Implementation, Verification, Maintenance — sekuensial-linier: setiap fase tuntas dan dievaluasi sebelum ke fase berikutnya, untuk meminimalkan kesalahan arsitektur hardware maupun software sejak dini.</p></Glass>
          <Glass className="p-4"><p className="text-sm font-medium text-cyan-300">3. Tahap analisis & penutup</p><p className="mt-1 text-sm text-slate-300">Evaluasi dampak uji coba serta penarikan kesimpulan dan saran.</p></Glass>
        </Rise>
      </div>
    </Stagger>
  );
}

/* 9 — Requirement & Design */
function ReqDesign() {
  const col = (tag: string, h: string, groups: [string, string][]) => (
    <Rise className="flex-1"><Glass className="h-full"><Badge className="mb-2 bg-cyan-400/15 text-cyan-200">{tag}</Badge>
      <p className={`${D} mb-4 text-xl`}>{h}</p>
      <div className="space-y-4">{groups.map(([t, x]) => <div key={t}><p className="text-sm font-medium text-cyan-300">{t}</p><p className="mt-1 text-sm leading-relaxed text-slate-300">{x}</p></div>)}</div></Glass></Rise>
  );
  return (
    <Stagger>
      <Title tag="Waterfall tahap 1 & 2">Dari kebutuhan lapangan menuju rancangan</Title>
      <div className="flex flex-col items-stretch gap-3 md:flex-row">
        {col("Fase 1", "Requirement (analisis kebutuhan)", [
          ["Data primer", "Observasi dan wawancara terkait beban pencatatan manual, waktu gerak, dan limbah kertas."],
          ["Spesifikasi teknis", "Hardware: ESP32, keypad numerik, LCD, printer thermal Bluetooth, kipas pendingin. Software: Next.js & Cloud Database Supabase/PostgreSQL."],
        ])}
        <div className="hidden items-center text-cyan-400 md:flex"><ArrowRight /></div>
        {col("Fase 2", "Design (perancangan)", [
          ["Basis data & sistem", "ERD untuk skema log produksi serta UML (Use-Case & Activity Diagram) untuk memetakan hak akses aktor (operator & manajemen) dan desain UI dashboard."],
          ["Perangkat keras", "Skematik kelistrikan (wiring) ESP32, keypad, dan LCD, serta desain 3D casing HMI dengan jalur sirkulasi udara dan kipas pendingin untuk menjaga stabilitas suhu di lantai pabrik."],
        ])}
      </div>
    </Stagger>
  );
}

/* 10 — Implementation (simulasi satu tekan) */
function Implementation() {
  const [s, setS] = useState(0);
  const run = () => { setS(1); [1, 2, 3].forEach((n) => setTimeout(() => setS(n + 1), n * 900)); };
  const N = ({ on, icon, t, sub }: { on: boolean; icon: ReactNode; t: string; sub: string }) => (
    <div className={`flex min-w-28 flex-col items-center gap-1 rounded-xl border p-3 text-center transition-all duration-500 [&_svg]:size-6 ${on ? "border-cyan-400 bg-cyan-400/15 text-cyan-100 shadow-[0_0_28px_-6px_#22d3ee]" : "border-white/10 bg-white/[0.03] text-slate-400"}`}>{icon}<span className="text-sm font-medium">{t}</span><span className="text-[11px] opacity-70">{sub}</span></div>
  );
  const Ar = ({ t }: { t: string }) => <div className="flex flex-col items-center text-[10px] text-cyan-300/70"><ArrowRight className="size-4" />{t}</div>;
  const steps = [
    ["Inisiasi database & coding web app", "Skema tabel dari ERD ke Supabase (PostgreSQL), frontend, CRUD data master (operator, jenis barang, jumlah per lot), dan logika backend Web API di Next.js."],
    ["Perakitan hardware & 3D printing", "Merakit rangkaian elektronik sesuai skematik ke dalam casing hasil cetak 3D."],
    ["Integrasi end-to-end", "ESP32 diprogram agar konfigurasi tombol keypad sinkron dinamis dengan database. Satu penekanan tombol memicu dua proses serentak."],
  ];
  return (
    <Stagger>
      <Title tag="Waterfall tahap 3">Implementation: satu tekan, dua proses serentak</Title>
      <Rise className="mb-4 grid gap-3 md:grid-cols-3">
        {steps.map(([t, x], n) => <Glass key={t} className="p-4"><p className="text-sm font-medium text-cyan-300">{n + 1}. {t}</p><p className="mt-1 text-xs leading-relaxed text-slate-300">{x}</p></Glass>)}
      </Rise>
      <Rise>
        <Glass className="flex flex-col items-center gap-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <N on={s >= 1} icon={<Keyboard />} t="Keypad" sub="tekan tombol" />
            <Ar t="" />
            <N on={s >= 2} icon={<Cpu />} t="ESP32" sub="HMI" />
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3"><Ar t="HTTP · JSON" /><N on={s >= 3} icon={<Server />} t="Web API" sub="Next.js" /><Ar t="" /><N on={s >= 4} icon={<Database />} t="Supabase" sub="PostgreSQL" /></div>
              <div className="flex items-center gap-3"><Ar t="Bluetooth" /><N on={s >= 3} icon={<Printer />} t="Printer thermal" sub="cetak struk" /><Ar t="" /><N on={s >= 4} icon={<FileText />} t="Part card" sub="tanggal & waktu otomatis" /></div>
            </div>
          </div>
          <button onClick={run} className="rounded-full border border-cyan-400 bg-cyan-400/15 px-5 py-2 text-sm text-cyan-100 transition hover:bg-cyan-400/25">Simulasikan 1 kali tekan</button>
        </Glass>
      </Rise>
    </Stagger>
  );
}

/* 11 — Verification & Maintenance */
function Verification() {
  const items = ["Respons tombol keypad", "Keakuratan tampilan LCD", "Ketepatan isi dan keberhasilan cetak part card", "Keberhasilan pengiriman payload ke database", "Fungsionalitas dashboard"];
  const [ok, setOk] = useState<boolean[]>(items.map(() => false));
  const n = ok.filter(Boolean).length;
  return (
    <Stagger>
      <Title tag="Waterfall tahap 4 & 5">Verification & maintenance</Title>
      <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
        <Rise><Glass>
          <p className="mb-1 text-sm text-slate-400">Black-box testing berbasis input–output, dengan tabel spesifikasi kebutuhan (must-have) sebagai parameter uji. Klik untuk menandai lulus.</p>
          <div className="my-3 h-1.5 overflow-hidden rounded-full bg-white/10"><motion.div className="h-full bg-cyan-400" animate={{ width: `${(n / items.length) * 100}%` }} /></div>
          <div className="space-y-2">
            {items.map((t, i) => (
              <button key={t} onClick={() => setOk((o) => o.map((v, j) => (j === i ? !v : v)))} className={`flex w-full items-center gap-3 rounded-xl border px-4 py-2.5 text-left text-sm transition ${ok[i] ? "border-cyan-400/60 bg-cyan-400/10" : "border-white/10 bg-white/[0.03]"}`}>
                <span className={`grid size-5 place-items-center rounded-full border ${ok[i] ? "border-cyan-400 bg-cyan-400 text-slate-900" : "border-white/30"}`}>{ok[i] && <Check className="size-3.5" />}</span>{t}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-amber-300/90">{n === items.length ? "Semua uji lulus — lanjut ke Maintenance." : "Decision loop: jika hasil belum sesuai spesifikasi, kembali ke Implementation atau Design untuk perbaikan."}</p>
        </Glass></Rise>
        <Rise><Glass className="h-full"><Badge className="mb-2 bg-cyan-400/15 text-cyan-200">Fase 5</Badge>
          <p className={`${D} mb-2 text-xl`}>Maintenance (adaptasi purwarupa)</p>
          <p className="text-sm leading-relaxed text-slate-300">Karena penelitian dibatasi pada tahap purwarupa dan tidak dipasang permanen, fase maintenance diadaptasi menjadi penyusunan Standar Operasional Prosedur (SOP) penggunaan perangkat HMI bagi operator dan manajemen.</p></Glass></Rise>
      </div>
    </Stagger>
  );
}

/* 12 — Arsitektur */
function Architecture() {
  const [a, setA] = useState(0);
  const n = [
    { t: "HMI ESP32", i: <Keyboard />, x: "Antarmuka fisik ringkas (keypad numerik + LCD + casing berpendingin aktif) yang memetakan kombinasi identitas operator, jenis produk, dan kuantitas lot ke tombol cepat." },
    { t: "Cetak part card", i: <Printer />, x: "Pencetakan struk identitas lot secara instan melalui printer thermal lengkap dengan stempel tanggal dan waktu otomatis saat tombol ditekan." },
    { t: "Web API & database", i: <Wifi />, x: "Jembatan komunikasi nirkabel berlatensi rendah yang menyimpan seluruh riwayat pelaporan secara terpusat di PostgreSQL (Supabase)." },
    { t: "Dashboard real-time", i: <LayoutDashboard />, x: "Antarmuka web bagi manajemen dan Production Control untuk memantau progres penyelesaian lot secara langsung serta mengelola data master (CRUD) secara dinamis." },
  ];
  return (
    <Stagger>
      <Title tag="Rancangan sistem">Arsitektur & luaran sistem terintegrasi</Title>
      <Rise className="mb-4 flex flex-wrap items-center justify-center gap-2">
        {n.map((x, i) => (
          <div key={x.t} className="flex items-center gap-2">
            <Pill on={a === i} onClick={() => setA(i)} className="flex items-center gap-2 [&_svg]:size-5">{x.i}{x.t}</Pill>
            {i < 3 && <ArrowRight className="size-4 text-cyan-400/70" />}
          </div>
        ))}
      </Rise>
      <Rise><Glass><Swap k={a}><p className={`${D} mb-2 text-xl text-cyan-300`}>{n[a].t}</p><p className="max-w-3xl text-sm leading-relaxed text-slate-200">{n[a].x}</p></Swap></Glass></Rise>
    </Stagger>
  );
}

/* 13 — Kondisi saat ini */
function Current() {
  const flow = ["Selesai periksa 1 lot", "Tinggalkan stasiun, ambil part card", "Tulis manual: operator, barang, jumlah", "Serahkan untuk rekap akhir shift"];
  const imp = [
    ["Tidak tahu jumlah lot selesai diperiksa saat itu juga."], ["Tidak bisa memantau progres dan output final check selama shift berjalan."], ["Keputusan lebih sering berdasar perkiraan daripada data aktual (bukan data-driven)."],
  ];
  const sc = ["Analisis sistem pelaporan hasil produksi dan pencatatan manual eksisting di Lini Plating PT. Mitrametal Perkasa.", "Perancangan dan pengembangan perangkat keras HMI berbasis ESP32 serta integrasinya dengan printer thermal untuk cetak part card otomatis.", "Pembangunan sistem informasi berbasis web dengan arsitektur Web API dan database untuk pemantauan data pelaporan produksi secara real-time."];
  return (
    <Stagger>
      <Title tag="Bab III · 3.2 & 3.4">Kondisi saat ini dan ruang lingkup topik</Title>
      <div className="grid gap-4 md:grid-cols-[1.5fr_1fr]">
        <div className="space-y-4">
          <Rise><Glass><p className="mb-3 text-sm text-slate-400">Alur kerja manual</p>
            <div className="grid gap-2 sm:grid-cols-4">{flow.map((f, i) => <div key={f} className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs text-slate-200"><span className="text-cyan-300">{i + 1}</span> {f}</div>)}</div></Glass></Rise>
          <Rise><Glass><p className="mb-2 text-sm text-slate-400">Dampak pelaporan tidak real-time: jeda 7 jam + salin ulang 20 menit per hari (rentan salah input)</p>
            <Bullets items={imp.map((x) => x[0])} />
            <p className="mt-3 border-t border-white/10 pt-3 text-xs leading-relaxed text-slate-400">Motion waste 45 detik per lot memperpanjang cycle time; kesalahan tulis memaksa kartu dibuang dan ditulis ulang (paper waste).</p></Glass></Rise>
        </div>
        <Rise><Glass className="h-full"><p className={`${D} mb-3 text-lg text-cyan-300`}>Ruang lingkup capstone design</p>
          <ol className="space-y-3 text-sm leading-relaxed text-slate-300">{sc.map((x, i) => <li key={i} className="flex gap-3"><span className="text-cyan-300">{i + 1}.</span>{x}</li>)}</ol></Glass></Rise>
      </div>
    </Stagger>
  );
}

/* 14 — Luaran */
function Outputs() {
  const [a, setA] = useState(0);
  const o = [
    ["Dokumentasi analisis sistem", "Memuat alur pembuatan part card manual hingga rekap akhir shift beserta rincian masalah pelaporan tidak real-time, motion waste, paper waste, dan beban penyalinan ulang data."],
    ["Prototipe hardware HMI (ESP32)", "Tiap tombol keypad mewakili satu set data tetap (nama operator, nama barang, jumlah per lot); satu kali tekan langsung menyimpan data sekaligus mencetak struk part card lengkap dengan tanggal dan waktu."],
    ["Sistem informasi Web API & database", "Penghubung HMI di lantai produksi dengan aplikasi web untuk penerimaan data, penyimpanan terpusat, dan penelusuran riwayat pelaporan."],
    ["Pemantauan real-time (web)", "Menampilkan status dan hasil penyelesaian lot segera setelah dikirim dari HMI tanpa menunggu akhir shift, sebagai dasar pengambilan keputusan cepat oleh manajemen dan Production Control."],
    ["Dokumentasi perancangan & pengujian", "Arsitektur sistem, integrasi hardware–software, hasil Black-box Testing (tombol, LCD, isi kartu, pencetakan, database, dashboard), serta hasil uji coba terbatas dampak reduksi motion waste, paper waste, dan information lead time."],
  ];
  return (
    <Stagger>
      <Title tag="Bab III">Rincian luaran rancangan dan target capstone</Title>
      <div className="grid gap-4 md:grid-cols-[1fr_1.4fr]">
        <Rise className="space-y-3">
          <Glass><p className="mb-1 text-sm font-medium text-cyan-300">Perangkat keras & fisik</p><p className="text-xs leading-relaxed text-slate-300">HMI berbasis ESP32 dengan keypad numerik, layar LCD, printer thermal, serta casing khusus dengan jalur air flow dan kipas pendingin untuk menjaga stabilitas suhu operasi di lantai pabrik.</p></Glass>
          <Glass><p className="mb-2 text-sm font-medium text-cyan-300">Empat fitur utama</p>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">{["Input laporan langsung via HMI", "Cetak part card otomatis instan", "Riwayat pelaporan terpusat di database", "Dashboard real-time pada website"].map((f, i) => <div key={f} className="rounded-lg border border-white/10 bg-white/[0.03] p-2"><span className="text-cyan-300">({"abcd"[i]})</span> {f}</div>)}</div></Glass>
        </Rise>
        <Rise><Glass className="h-full"><p className="mb-3 text-sm text-slate-400">Lima target luaran dokumen & purwarupa</p>
          <div className="space-y-2">{o.map(([t, x], i) => (
            <button key={t} onClick={() => setA(i)} className={`w-full rounded-xl border px-4 py-2.5 text-left transition ${a === i ? "border-cyan-400 bg-cyan-400/10" : "border-white/10 bg-white/[0.03] hover:border-cyan-400/40"}`}>
              <span className="text-sm"><span className="text-cyan-300">{i + 1}.</span> {t}</span>
              {a === i && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1.5 text-xs leading-relaxed text-slate-300">{x}</motion.p>}
            </button>))}
          </div></Glass></Rise>
      </div>
    </Stagger>
  );
}

/* 15 — Penutup */
function Closing() {
  return (
    <Stagger className="text-center">
      <Rise><h2 className={`${D} text-4xl font-semibold md:text-6xl`}>Terima kasih</h2></Rise>
      <Rise><p className="mx-auto mt-4 max-w-xl text-slate-300">Atas perhatian, masukan, dan arahan yang diberikan.</p></Rise>
      <Rise className="mt-8"><Badge variant="outline" className="border-cyan-400/40 px-4 py-1.5 text-base text-cyan-300">Sesi diskusi & tanya jawab (Q&A)</Badge></Rise>
      <Rise className="mt-8 text-sm text-slate-500">Tim Penyusun Capstone Design Project (2026) — Teknik Industri UTY</Rise>
    </Stagger>
  );
}

export const slides = [
  { label: "Sampul", C: Cover },
  { label: "Latar belakang", C: Background },
  { label: "Rumusan & tujuan", C: Goals },
  { label: "Ruang lingkup", C: Scope },
  { label: "Manfaat", C: Benefits },
  { label: "Tinjauan pustaka", C: Literature },
  { label: "Landasan teori", C: Theory },
  { label: "Metodologi", C: Method },
  { label: "Requirement & Design", C: ReqDesign },
  { label: "Implementation", C: Implementation },
  { label: "Verification & Maintenance", C: Verification },
  { label: "Arsitektur sistem", C: Architecture },
  { label: "Kondisi saat ini", C: Current },
  { label: "Luaran", C: Outputs },
  { label: "Penutup", C: Closing },
];
