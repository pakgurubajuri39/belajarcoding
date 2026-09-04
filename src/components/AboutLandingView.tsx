import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles, KeyRound, ArrowRight, CheckCircle2, Trophy, Award, Laptop,
  BookOpen, Star, Zap, Target, ShieldCheck, HeartHandshake, Code2,
  Gamepad2, Lightbulb, Play, Layers, Compass, BrainCircuit,
  ChevronDown, ChevronUp, FileText, Check, Rocket, HelpCircle,
  Clock, Shield, Eye, Flame, MousePointerClick, Download
} from 'lucide-react';
import { SYLLABUS_DATA, BADGES_DATA } from '../data/syllabus';
import { SyllabusLevel, UserSession, StudentProgress } from '../types';
import { BrandLogo } from './BrandLogo';

interface AboutLandingViewProps {
  session: UserSession;
  progress: StudentProgress;
  onOpenLoginModal: () => void;
  onStartTrial: () => void;
  onSelectLevel: (levelId: number) => void;
  onNavigateTab: (tab: 'syllabus' | 'scratch' | 'progress' | 'certificate') => void;
}

export const AboutLandingView: React.FC<AboutLandingViewProps> = ({
  session,
  progress,
  onOpenLoginModal,
  onStartTrial,
  onSelectLevel,
  onNavigateTab
}) => {
  const [selectedStage, setSelectedStage] = useState<number | 'all'>('all');
  const [previewLevelModal, setPreviewLevelModal] = useState<SyllabusLevel | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Define the 4 Progressive Learning Stages
  const learningStages = [
    {
      stage: 1,
      title: 'Tahap 1: Fondasi Logika & Algoritma Visual',
      levelRange: 'Level 01 - 05',
      levels: [1, 2, 3, 4, 5],
      badge: 'Dasar Komputasi',
      color: 'from-blue-500 to-indigo-600',
      borderColor: 'border-blue-500/30',
      bgLight: 'bg-blue-500/10',
      textAccent: 'text-blue-400',
      description: 'Mengenal panggung Scratch, sistem koordinat bidang X/Y, loop perulangan (repeat/forever), kostum animasi, dan pemicu aksi (event trigger).'
    },
    {
      stage: 2,
      title: 'Tahap 2: Seni Visual, Audio & Interaksi Cerita',
      levelRange: 'Level 06 - 10',
      levels: [6, 7, 8, 9, 10],
      badge: 'Kreativitas & Seni',
      color: 'from-amber-500 to-orange-600',
      borderColor: 'border-amber-500/30',
      bgLight: 'bg-amber-500/10',
      textAccent: 'text-amber-400',
      description: 'Pemrograman musik synthesizer, manipulasi warna/grafis Looks, komunikasi antar-sprite dengan broadcast pesan, dialog cerita, dan kuis cerdas.'
    },
    {
      stage: 3,
      title: 'Tahap 3: Logika Matematika, Variabel & Sensing',
      levelRange: 'Level 11 - 15',
      levels: [11, 12, 13, 14, 15],
      badge: 'Logika & Sains',
      color: 'from-emerald-500 to-teal-600',
      borderColor: 'border-emerald-500/30',
      bgLight: 'bg-emerald-500/10',
      textAccent: 'text-emerald-400',
      description: 'Kontrol presisi keyboard & mouse, variabel dinamis untuk pencatat skor, timer hitung mundur, percabangan IF-ELSE kompleks, dan game labirin (Maze).'
    },
    {
      stage: 4,
      title: 'Tahap 4: Fisika Game, Kloning Sprite & Dasar AI',
      levelRange: 'Level 16 - 20',
      levels: [16, 17, 18, 19, 20],
      badge: 'Game Dev & Mahakarya',
      color: 'from-purple-500 to-pink-600',
      borderColor: 'border-purple-500/30',
      bgLight: 'bg-purple-500/10',
      textAccent: 'text-purple-400',
      description: 'Fisika pantulan & sudut, kloning sprite masal (hujan bintang/musuh), sistem gravitasi melompat (platformer), alur sinematik, dan proyek akhir game cerdas AI.'
    }
  ];

  // Filtered levels based on active stage
  const filteredLevels = selectedStage === 'all'
    ? SYLLABUS_DATA
    : SYLLABUS_DATA.filter(lvl => {
        const stageObj = learningStages.find(s => s.stage === selectedStage);
        return stageObj ? stageObj.levels.includes(lvl.id) : true;
      });

  // FAQs
  const faqs = [
    {
      question: 'Apa itu Sobat Coding?',
      answer: 'Sobat Coding adalah platform pembelajaran coding visual berbasis Scratch 3.0 dan Computational Thinking yang dirancang khusus untuk anak-anak dan pemula. Dilengkapi dengan 20 modul kurikulum terstruktur, studio Scratch terintegrasi, sistem gamifikasi XP, laporan progres PDF resmi, dan sertifikat kelulusan digital.'
    },
    {
      question: 'Apakah anak perlu memiliki pengalaman coding sebelumnya?',
      answer: 'Sama sekali tidak perlu! Kurikulum Sobat Coding dimulai dari nol murni (Level 1: Mengenal Antarmuka Scratch) dengan penjelasan visual blok warna-warni seperti menyusun puzzle logika yang sangat mudah dipahami anak usia 7 tahun ke atas.'
    },
    {
      question: 'Apa manfaat belajar Computational Thinking sejak dini?',
      answer: 'Computational Thinking melatih anak berpikir runut, menganalisis masalah kompleks menjadi langkah-langkah terstruktur, meningkatkan penalaran matematika/logika, serta menumbuhkan daya cipta kreatif. Anak tidak hanya menjadi konsumen teknologi, tetapi pencipta aktif karya digital.'
    },
    {
      question: 'Bagaimana cara mendapatkan Kode Akses Siswa penuh?',
      answer: 'Kode akses resmi diberikan oleh guru pembina ekstrakurikuler, sekolah mitra, atau tim instruktur Sobat Coding. Pengguna baru juga dapat langsung mencoba Mode Trial Gratis (Level 1) tanpa kode akses kapan saja.'
    },
    {
      question: 'Apakah data kemajuan belajar dan XP tersimpan dengan aman?',
      answer: 'Ya! Seluruh kemajuan modul, Real XP, perolehan nilai kuis, dan lencana tersimpan secara otomatis dan aman di penyimpanan lokal (browser) perangkat Anda, sehingga dapat dilanjutkan kapan saja tanpa takut data hilang.'
    }
  ];

  return (
    <div className="space-y-12 pb-16">
      
      {/* 1. HERO BANNER: IMPACTFUL EDUCATIONAL MARKETING */}
      <section className="relative rounded-3xl bg-slate-900 border border-slate-700/80 p-6 sm:p-10 lg:p-14 text-white shadow-2xl overflow-hidden">
        {/* Glow ambient effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          
          {/* Top Pill Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-black tracking-wide shadow-sm">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>AKADEMI KODING & COMPUTATIONAL THINKING TERBAIK</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Ubah Waktu Layar Menjadi <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-indigo-400 bg-clip-text text-transparent">
              Karya Kreatif & Prestasi Juara Koding!
            </span>
          </h1>

          {/* Subtitle / Marketing Value Proposition */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Selamat datang di <strong>Sobat Coding</strong>. Panduan belajar koding visual Scratch 3.0 paling lengkap, terstruktur, dan bertahap. Melatih nalar logika, matematika, perancangan game, dan dasar kecerdasan buatan sejak usia dini.
          </p>

          {/* Key Feature Badges Grid */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-2">
            <span className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 20 Modul Terstruktur
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" /> Studio Scratch Live Terintegrasi
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" /> Laporan PDF & Sertifikat Resmi
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" /> 100% Ramah Anak & Tanpa Iklan
            </span>
          </div>

          {/* Primary Action Buttons (CTA) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <button
              onClick={onOpenLoginModal}
              id="hero-btn-login"
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2.5 transition-all transform active:scale-95 cursor-pointer"
            >
              <KeyRound className="w-5 h-5 text-slate-950" />
              <span>{session.isAuthenticated ? 'Lanjutkan Belajar Siswa' : 'Mulai Belajar (Kode Akses)'}</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>

            {!session.isAuthenticated && (
              <button
                onClick={onStartTrial}
                id="hero-btn-trial"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-800/90 hover:bg-slate-700/90 text-white font-bold text-sm border border-slate-600 flex items-center justify-center gap-2 transition-all transform active:scale-95 cursor-pointer shadow-lg"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Coba Trial Gratis (Level 1)</span>
              </button>
            )}

            <a
              href="#kurikulum-lengkap"
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-semibold text-sm border border-white/10 flex items-center justify-center gap-1.5 transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>Lihat Silabus Materi</span>
            </a>
          </div>

        </div>

        {/* Hero Quick Metrics Bento */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mt-10 pt-8 border-t border-slate-800">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="text-2xl sm:text-3xl font-black text-amber-400">20 Modul</div>
            <div className="text-xs text-slate-400 mt-1">Kurikulum Komprehensif</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="text-2xl sm:text-3xl font-black text-indigo-400">4 Tahap</div>
            <div className="text-xs text-slate-400 mt-1">Roadmap Belajar Bertahap</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">8 Lencana</div>
            <div className="text-xs text-slate-400 mt-1">Trofi Prestasi & Gamifikasi</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="text-2xl sm:text-3xl font-black text-cyan-400">100% Praktik</div>
            <div className="text-xs text-slate-400 mt-1">Langsung Buat Proyek Game</div>
          </div>
        </div>
      </section>

      {/* 2. WHY SOBAT CODING: EDUCATIONAL VALUE & COMPARISON */}
      <section className="space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Mengapa Memilih Sobat Coding?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Fondasi Emas Menghadapi Masa Depan Berbasis Teknologi
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Kami mengubah cara belajar koding menjadi pengalaman yang menyenangkan, interaktif, dan berdampak nyata bagi perkembangan intelektual anak.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-500 flex items-center justify-center">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Computational Thinking</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                Melatih kemampuan dekomposisi masalah, pengenalan pola, abstraksi, dan perancangan algoritma presisi.
              </p>
            </div>
            <div className="text-[11px] font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 pt-1">
              <span>Logika Terstruktur</span>
              <Check className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Kreativitas & Game Dev</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                Membuat game aksi, animasi cerita, simulasi gravitasi, labirin, dan kuis cerdas dengan visual Scratch 3.0.
              </p>
            </div>
            <div className="text-[11px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 pt-1">
              <span>Praktek Nyata 100%</span>
              <Check className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Matematika & Fisika Terapan</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                Memahami koordinat X/Y Kartesius, sudut derajat lingkaran, variabel angka, dan kecepatan secara intuitif.
              </p>
            </div>
            <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 pt-1">
              <span>Sains Interaktif</span>
              <Check className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Portofolio & Sertifikasi</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                Laporan evaluasi belajar PDF yang dapat diunduh kapan saja serta sertifikat kelulusan resmi berstandar industri.
              </p>
            </div>
            <div className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 pt-1">
              <span>Prestasi Terverifikasi</span>
              <Check className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>

        {/* Comparison Box: Pasif vs Aktif */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 text-white shadow-xl">
          <div className="text-center max-w-xl mx-auto mb-6">
            <h3 className="text-lg sm:text-xl font-bold">Transformasi Waktu Layar Gadget Anak</h3>
            <p className="text-xs text-slate-400 mt-1">Bandingkan aktivitas pasif dengan pengalaman belajar produktif di Sobat Coding</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Box 1: Pasif */}
            <div className="p-5 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <span>✕ Hanya Menonton Konten Pasif</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>Menghabiskan waktu berjam-jam tanpa hasil kreasi nyata.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>Kemampuan berpikir kritis dan daya konsentrasi cenderung menurun.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>Hanya menjadi konsumen teknologi buatan orang lain.</span>
                </li>
              </ul>
            </div>

            {/* Box 2: Sobat Coding */}
            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Belajar Kreatif di Sobat Coding</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Menciptakan game buatan sendiri yang dapat dimainkan teman & keluarga.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Melatih daya tahan pemecahan masalah (debugging) & rasa percaya diri.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Memiliki portofolio koding nyata dan sertifikat kelulusan resmi.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COMPLETE 20-MODULE CURRICULUM ROADMAP (LENGKAP, JELAS, RINCI, BERTAHAP) */}
      <section id="kurikulum-lengkap" className="space-y-6 scroll-mt-24">
        
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Silabus Resmi 20 Modul</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Kurikulum Lengkap, Rinci & Bertahap
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              20 Modul standar internasional yang dirancang secara bertahap dari pemula mutlak hingga mahir membuat game cerdas dan simulasi AI.
            </p>
          </div>

          {/* Quick CTA to start learning */}
          <button
            onClick={onOpenLoginModal}
            className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-all flex-shrink-0"
          >
            <KeyRound className="w-4 h-4" />
            <span>Mulai Akses 20 Level</span>
          </button>
        </div>

        {/* 4 STAGES ROADMAP OVERVIEW CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {learningStages.map((st) => (
            <div
              key={st.stage}
              onClick={() => setSelectedStage(st.stage)}
              className={`p-5 rounded-3xl border transition-all cursor-pointer text-left flex flex-col justify-between ${
                selectedStage === st.stage
                  ? 'bg-slate-900 text-white border-amber-400 ring-2 ring-amber-400/30 shadow-lg'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-400 text-slate-900 dark:text-white shadow-sm'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                    selectedStage === st.stage ? 'bg-amber-400 text-slate-950' : 'bg-indigo-500/10 text-indigo-500 dark:text-indigo-400'
                  }`}>
                    {st.levelRange}
                  </span>
                  <span className="text-xs font-mono opacity-60">Fase {st.stage}</span>
                </div>

                <h3 className="text-sm font-bold leading-snug">{st.title}</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                  {st.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold">
                <span className={selectedStage === st.stage ? 'text-amber-300' : 'text-indigo-600 dark:text-indigo-400'}>
                  5 Modul Praktik
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        {/* STAGE FILTER BUTTONS */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <button
            onClick={() => setSelectedStage('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedStage === 'all'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Semua Modul (1 - 20)
          </button>

          {learningStages.map(st => (
            <button
              key={st.stage}
              onClick={() => setSelectedStage(st.stage)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedStage === st.stage
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <span>Fase {st.stage}:</span>
              <span>{st.badge}</span>
            </button>
          ))}
        </div>

        {/* DETAILED MODULE CARDS GRID (LENGKAP & RINCI) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
          {filteredLevels.map((lvl) => {
            const isCompleted = progress.completedLevelIds.includes(lvl.id);
            const isUnlocked = progress.unlockedLevelIds.includes(lvl.id) || session.role === 'admin' || lvl.id === 1;

            return (
              <div
                key={lvl.id}
                className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative overflow-hidden group"
              >
                {/* Accent Top Border Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-indigo-500 to-purple-500 opacity-80" />

                <div className="space-y-3">
                  {/* Card Header: Level ID + Category + XP */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-mono font-black text-xs text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-700">
                        #{String(lvl.id).padStart(2, '0')}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                        {lvl.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-bold text-xs bg-amber-500/10 px-2.5 py-0.5 rounded-full">
                      <Zap className="w-3.5 h-3.5" />
                      <span>+{lvl.xpReward} XP</span>
                    </div>
                  </div>

                  {/* Title & Summary */}
                  <div>
                    <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {lvl.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {lvl.summary}
                    </p>
                  </div>

                  {/* Key Competency / Indicator */}
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1 text-xs">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Capaian Kompetensi:
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 line-clamp-2">
                      {lvl.indicator}
                    </p>
                  </div>

                  {/* Topics Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {lvl.topics.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-medium text-slate-600 dark:text-slate-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setPreviewLevelModal(lvl)}
                    className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white flex items-center gap-1 py-1.5 px-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Lihat Rincian</span>
                  </button>

                  <button
                    onClick={() => {
                      if (isUnlocked) {
                        onSelectLevel(lvl.id);
                      } else {
                        onOpenLoginModal();
                      }
                    }}
                    className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer ${
                      isCompleted
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                        : isUnlocked
                        ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Selesai (Ulangi)</span>
                      </>
                    ) : isUnlocked ? (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Mulai Belajar</span>
                      </>
                    ) : (
                      <>
                        <KeyRound className="w-3.5 h-3.5" />
                        <span>Buka Level</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* 4. PLATFORM FEATURES & ECOSYSTEM */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Laptop className="w-3.5 h-3.5" />
            <span>Ekosistem Pembelajaran Lengkap</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Fitur Lengkap Dirancang untuk Keberhasilan Siswa
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Segala hal yang dibutuhkan anak untuk belajar koding secara mandiri, aman, terarah, dan menyenangkan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Feature 1 */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 flex items-center justify-center">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Studio Scratch Live Terintegrasi</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Editor visual berbasis blok langsung di peramban (browser) dengan palet kode lengkap, kontrol panggung interaktif, synthesizer suara, dan aneka karakter sprite.
            </p>
            <div className="pt-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
              <span>Tanpa Perlu Instalasi Software Rumit</span>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Gamifikasi Real XP & Trofi Lencana</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Tiap modul memberikan poin Real XP, kenaikan peringkat gelar siswa, serta 8 lencana trofi pencapaian yang memacu motivasi belajar anak.
            </p>
            <div className="pt-2 text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
              <span>Belajar Serasa Main Game Petualangan</span>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center">
              <Download className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Laporan PDF & Sertifikat Digital</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Unduh lembar laporan capaian belajar berformat PDF lengkap dengan tabel 20 modul dan cetak sertifikat kelulusan resmi berstempel digital.
            </p>
            <div className="pt-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <span>Portofolio Prestasi Akademik Sekolah</span>
            </div>
          </div>

        </div>
      </section>

      {/* 5. 3 EASY STEPS TO GET STARTED */}
      <section className="p-6 sm:p-10 rounded-3xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Panduan Memulai
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            3 Langkah Mudah Menjadi Juara Koding
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Step 1 */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center mb-3">
              1
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              Dapatkan Kode Akses / Coba Trial
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Minta kode akses kepada guru pembina atau langsung klik 'Coba Trial Gratis' untuk mencoba Level 1.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center mb-3">
              2
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              Pelajari Materi & Praktik Koding
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Ikuti instruksi langkah demi langkah, susun blok kode di Studio Scratch Live, dan jalankan programmu.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white font-black text-sm flex items-center justify-center mb-3">
              3
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              Klaim XP, Lencana & Sertifikat
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Jawab kuis evaluasi, raih skor tinggi, kumpulkan 8 trofi lencana, dan unduh laporan PDF resmi.
            </p>
          </div>

        </div>
      </section>

      {/* 6. FAQ (TANYA JAWAB) ACCORDION */}
      <section className="space-y-4 max-w-3xl mx-auto">
        <div className="text-center space-y-1.5 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Pertanyaan yang Sering Diajukan</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Tanya Jawab Seputar Sobat Coding
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 font-bold text-xs sm:text-sm text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. GRAND BOTTOM CALL TO ACTION */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 border border-indigo-500/30 text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/25 text-2xl font-black">
            🚀
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black">
            Siap Mencetak Prestasi dan Menjadi Juara Coding?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Bergabunglah bersama ribuan siswa lainnya yang telah merasakan serunya belajar logika komputasional dan membuat game impian mereka di Sobat Coding!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onOpenLoginModal}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/30 flex items-center justify-center gap-2 transition-all transform active:scale-95 cursor-pointer"
            >
              <KeyRound className="w-4 h-4 text-slate-950" />
              <span>{session.isAuthenticated ? 'Buka Dashboard Silabus' : 'Masuk dengan Kode Akses'}</span>
            </button>

            {!session.isAuthenticated && (
              <button
                onClick={onStartTrial}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span>Coba Trial Gratis Sekarang</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* DETAILED MODULE PREVIEW MODAL */}
      <AnimatePresence>
        {previewLevelModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl p-6 sm:p-8 text-white overflow-hidden my-6 max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-400 text-slate-950">
                      LEVEL {previewLevelModal.id}
                    </span>
                    <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider">
                      {previewLevelModal.category} • Semester {previewLevelModal.semester}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white mt-1.5">
                    {previewLevelModal.title}
                  </h3>
                </div>

                <button
                  onClick={() => setPreviewLevelModal(null)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all text-xs font-bold"
                >
                  ✕ Tutup
                </button>
              </div>

              {/* Modal Body */}
              <div className="overflow-y-auto pr-1 flex-1 py-4 space-y-4 text-xs">
                
                {/* Concept */}
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-1.5">
                  <h4 className="font-bold text-amber-400 uppercase tracking-wider text-[11px]">
                    Penjelasan Konsep & Logika:
                  </h4>
                  <p className="text-slate-300 leading-relaxed">
                    {previewLevelModal.conceptExplanation}
                  </p>
                </div>

                {/* Indicator */}
                <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-1.5">
                  <h4 className="font-bold text-indigo-400 uppercase tracking-wider text-[11px]">
                    Target Capaian & Indikator Belajar:
                  </h4>
                  <p className="text-slate-200 leading-relaxed">
                    {previewLevelModal.indicator}
                  </p>
                </div>

                {/* Key Blocks Guide */}
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">
                    Blok Koding Utama yang Dipelajari:
                  </h4>
                  <div className="space-y-1.5">
                    {previewLevelModal.keyBlocks.map((kb, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
                        <span className="font-mono text-amber-300 font-bold">{kb.name}</span>
                        <span className="text-[10px] text-slate-400">{kb.description}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Challenge Preview */}
                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-1.5">
                  <h4 className="font-bold text-emerald-400 uppercase tracking-wider text-[11px]">
                    Tantangan Karya Mandiri (Output):
                  </h4>
                  <p className="font-bold text-white">{previewLevelModal.challenge.title}</p>
                  <p className="text-slate-300">{previewLevelModal.challenge.description}</p>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{previewLevelModal.allocation}</span>
                </div>

                <button
                  onClick={() => {
                    const id = previewLevelModal.id;
                    setPreviewLevelModal(null);
                    if (progress.unlockedLevelIds.includes(id) || session.role === 'admin' || id === 1) {
                      onSelectLevel(id);
                    } else {
                      onOpenLoginModal();
                    }
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-indigo-600 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 hover:scale-105 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current text-slate-950" />
                  <span>Buka Modul Ini Sekarang</span>
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
