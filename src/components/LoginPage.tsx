import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  KeyRound, ShieldCheck, Sparkles, Eye, EyeOff, CheckCircle2,
  AlertCircle, ArrowRight, Lock, Laptop, Trophy, Target, Award,
  BookOpen, Star, Zap, Code2, Sun, Moon, Check, User, HeartHandshake,
  Gamepad2, Lightbulb, Play, Layers, Compass, BrainCircuit,
  ChevronDown, ChevronUp, FileText, Rocket, HelpCircle, Clock,
  Shield, Flame, MousePointerClick, Download, CheckSquare, Sparkle,
  GraduationCap, ExternalLink, ChevronRight, X
} from 'lucide-react';
import { STUDENT_PASSCODE, ADMIN_PASSCODE } from '../utils/storage';
import { UserSession, SyllabusLevel } from '../types';
import { AVATAR_OPTIONS, SYLLABUS_DATA, BADGES_DATA } from '../data/syllabus';
import { BrandLogo } from './BrandLogo';

interface LoginPageProps {
  onLoginSuccess: (session: UserSession) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  theme,
  onToggleTheme
}) => {
  // Login Form States
  const [loginTab, setLoginTab] = useState<'passcode' | 'trial'>('passcode');
  const [studentName, setStudentName] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0].id);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Curriculum Stage Filter State
  const [selectedStage, setSelectedStage] = useState<number | 'all'>('all');
  const [previewLevelModal, setPreviewLevelModal] = useState<SyllabusLevel | null>(null);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedCode = accessCode.trim();
    const finalName = studentName.trim() || 'Siswa Juara Coding';

    if (trimmedCode === ADMIN_PASSCODE) {
      onLoginSuccess({
        isAuthenticated: true,
        role: 'admin',
        studentName: studentName.trim() || 'Pak Guru Bajuri (Admin)',
        avatar: selectedAvatar,
        loginDate: new Date().toISOString()
      });
    } else if (trimmedCode === STUDENT_PASSCODE) {
      onLoginSuccess({
        isAuthenticated: true,
        role: 'student',
        studentName: finalName,
        avatar: selectedAvatar,
        loginDate: new Date().toISOString()
      });
    } else {
      setErrorMessage('Kode akses tidak valid. Silakan periksa kembali atau gunakan tombol pintasan cepat di bawah.');
    }
  };

  const handleQuickFillStudent = () => {
    setAccessCode(STUDENT_PASSCODE);
    if (!studentName) setStudentName('Budi Siswa Hebat');
    setErrorMessage('');
  };

  const handleQuickFillAdmin = () => {
    setAccessCode(ADMIN_PASSCODE);
    if (!studentName) setStudentName('Pak Guru Bajuri');
    setErrorMessage('');
  };

  const handleTrialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess({
      isAuthenticated: true,
      role: 'guest',
      studentName: studentName.trim() || 'Siswa Tamu (Trial)',
      avatar: selectedAvatar,
      loginDate: new Date().toISOString()
    });
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Learning Stages Data
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
      textAccent: 'text-blue-500 dark:text-blue-400',
      description: 'Mengenal panggung Scratch, koordinat bidang kartesius X/Y, loop perulangan (repeat/forever), animasi kostum, dan pemicu aksi (event triggers).'
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
      textAccent: 'text-amber-500 dark:text-amber-400',
      description: 'Pemrograman efek suara & synthesizer, efek grafis Looks, komunikasi antar-sprite dengan broadcast sinyal, percakapan dinamis, dan kuis cerdas.'
    },
    {
      stage: 3,
      title: 'Tahap 3: Logika Matematika, Variabel & Game Labirin',
      levelRange: 'Level 11 - 15',
      levels: [11, 12, 13, 14, 15],
      badge: 'Logika & Variabel',
      color: 'from-emerald-500 to-teal-600',
      borderColor: 'border-emerald-500/30',
      bgLight: 'bg-emerald-500/10',
      textAccent: 'text-emerald-500 dark:text-emerald-400',
      description: 'Kontrol keyboard/mouse presisi, variabel skor dinamis, timer hitung mundur, percabangan IF-ELSE kompleks, dan perancangan game labirin (Maze).'
    },
    {
      stage: 4,
      title: 'Tahap 4: Fisika Game, Kloning Partikel & Dasar AI',
      levelRange: 'Level 16 - 20',
      levels: [16, 17, 18, 19, 20],
      badge: 'Game Dev & AI',
      color: 'from-purple-500 to-pink-600',
      borderColor: 'border-purple-500/30',
      bgLight: 'bg-purple-500/10',
      textAccent: 'text-purple-500 dark:text-purple-400',
      description: 'Fisika pantulan & sudut acak, kloning sprite masal (hujan meteor/musuh), sistem gravitasi melompat (platformer), dan proyek akhir game cerdas AI.'
    }
  ];

  const filteredLevels = selectedStage === 'all'
    ? SYLLABUS_DATA
    : SYLLABUS_DATA.filter(lvl => {
        const stageObj = learningStages.find(s => s.stage === selectedStage);
        return stageObj ? stageObj.levels.includes(lvl.id) : true;
      });

  const faqs = [
    {
      q: 'Apa itu platform pembelajaran DJuragan Coding?',
      a: 'DJuragan Coding adalah platform edukasi interaktif berbasis Scratch 3.0 dan Computational Thinking yang dirancang khusus untuk memfasilitasi anak-anak dan pemula dalam menguasai logika pemrograman secara bertahap, mendalam, dan menyenangkan.'
    },
    {
      q: 'Bagaimana kurikulum 20 modul ini dirancang?',
      a: 'Kurikulum disusun secara pedagogis dalam 4 fase terstruktur (masing-masing 5 level) mencakup 2 semester belajar. Dimulai dari pengenalan antarmuka dasar, logika sekuensial, percabangan bersyarat, manajemen variabel & timer, hingga fisika game platformer dan kecerdasan buatan sederhana.'
    },
    {
      q: 'Bagaimana cara memperoleh Kode Akses Siswa resmi?',
      a: 'Kode akses diberikan oleh guru pembina kelas atau instruktur sekolah mitra. Anda juga dapat menggunakan tombol pintasan cepat di halaman ini (contoh kode siswa: "djuragan39", guru: "bajuri39") atau mencoba Modul 1 secara instan melalui tab Trial Gratis.'
    },
    {
      q: 'Apakah anak perlu menginstal software khusus di komputer?',
      a: 'Tidak perlu! Seluruh ekosistem belajar, materi instruksional, blok kode Scratch, kuis interaktif, dan studio Scratch 3.0 berjalan langsung di dalam peramban web (browser) tanpa instalasi tambahan dan aman untuk anak.'
    },
    {
      q: 'Apakah progres dan sertifikat kelulusan dapat disimpan dan dicetak?',
      a: 'Ya. Seluruh progres belajar, akumulasi Real XP, dan lencana tersimpan secara aman di peramban lokal. Setelah menyelesaikan seluruh kurikulum, siswa dapat mengklaim Sertifikat Kelulusan Resmi berseri dan mengunduh ringkasan transkrip nilai dalam format PDF.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between selection:bg-amber-400 selection:text-slate-950 relative overflow-x-hidden">
      
      {/* Background ambient lighting */}
      <div className="fixed top-0 left-1/4 w-[35rem] h-[35rem] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-10 right-1/4 w-[35rem] h-[35rem] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed top-1/2 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* ========================================================================= */}
      {/* 1. TOP STICKY HEADER & MARKETING NAVIGATION BAR                          */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <BrandLogo size="md" />
            <span className="hidden xl:inline-block px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-[10px] font-black text-amber-400 uppercase tracking-wider">
              Scratch 3.0 Academy
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-slate-300">
            <button
              onClick={() => scrollToSection('sec-about')}
              className="px-3 py-2 rounded-xl hover:bg-slate-800 hover:text-white transition-colors"
            >
              Tentang Kami
            </button>
            <button
              onClick={() => scrollToSection('sec-pillars')}
              className="px-3 py-2 rounded-xl hover:bg-slate-800 hover:text-white transition-colors"
            >
              4 Pilar Logika
            </button>
            <button
              onClick={() => scrollToSection('sec-curriculum')}
              className="px-3 py-2 rounded-xl hover:bg-slate-800 hover:text-white transition-colors"
            >
              Kurikulum 20 Level
            </button>
            <button
              onClick={() => scrollToSection('sec-methodology')}
              className="px-3 py-2 rounded-xl hover:bg-slate-800 hover:text-white transition-colors"
            >
              Metodologi
            </button>
            <button
              onClick={() => scrollToSection('sec-faq')}
              className="px-3 py-2 rounded-xl hover:bg-slate-800 hover:text-white transition-colors"
            >
              FAQ
            </button>
          </nav>

          {/* Action CTAs & Theme Switcher */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => scrollToSection('sec-login-portal')}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md shadow-amber-400/20 transition-all flex items-center gap-1.5"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Portal Masuk</span>
            </button>

            <button
              onClick={onToggleTheme}
              aria-label="Toggle Dark/Light Theme"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-all text-xs"
              title="Ganti Mode Tema"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-400" />
              )}
            </button>
          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION: IMPACTFUL PROFESSIONAL MARKETING                         */}
      {/* ========================================================================= */}
      <section className="relative z-10 pt-10 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Compelling Marketing Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-extrabold uppercase tracking-wider shadow-sm">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>Akademi Koding & Computational Thinking Generasi Unggul</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
              Bentuk Logika Juara &amp; <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-indigo-400 bg-clip-text text-transparent">
                Wujudkan Karya Digital Masa Depan
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Selamat datang di <strong>DJuragan Coding</strong> — platform kurikulum koding visual Scratch 3.0 terlengkap, terstruktur, dan interaktif. Membekali anak-anak dengan daya nalar kritis, kreativitas tanpa batas, serta pemecahan masalah algoritma tingkat tinggi sejak usia dini.
            </p>

            {/* Value Checkpoints Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-200">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span><strong>20 Modul Terstruktur:</strong> Semester 1 &amp; 2</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/80">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span><strong>Live Scratch Studio:</strong> Terintegrasi Langsung</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/80">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span><strong>Gamifikasi Real XP:</strong> Trofi &amp; 8 Lencana</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/80">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span><strong>Sertifikat Digital:</strong> Transkrip PDF Resmi</span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <button
                onClick={() => scrollToSection('sec-login-portal')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-400/20 flex items-center justify-center gap-2 transition-all transform active:scale-95"
              >
                <KeyRound className="w-4 h-4" />
                <span>Masuk dengan Kode Akses Siswa</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setLoginTab('trial');
                  scrollToSection('sec-login-portal');
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all"
              >
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span>Coba Trial Gratis (Modul 1)</span>
              </button>
            </div>

          </div>

          {/* Right Column: Interactive Login Portal Widget (Direct Fast Entrance) */}
          <div className="lg:col-span-5" id="sec-login-portal">
            <div className="relative rounded-3xl bg-slate-850 bg-slate-900/95 border border-slate-700/80 shadow-2xl p-6 sm:p-8 backdrop-blur-xl space-y-5">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    <Lock className="w-4 h-4 text-amber-400" />
                    <span>Portal Akses Pembelajaran</span>
                  </h3>
                  <p className="text-xs text-slate-400">Masuk untuk membuka seluruh level &amp; studio</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                  Sistem Aktif
                </span>
              </div>

              {/* Login Tabs */}
              <div className="flex p-1 rounded-2xl bg-slate-800/90 border border-slate-700/80">
                <button
                  type="button"
                  id="portal-tab-passcode"
                  onClick={() => {
                    setLoginTab('passcode');
                    setErrorMessage('');
                  }}
                  className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                    loginTab === 'passcode'
                      ? 'bg-amber-400 text-slate-950 font-black shadow-md shadow-amber-400/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Kode Akses Penuh</span>
                </button>

                <button
                  type="button"
                  id="portal-tab-trial"
                  onClick={() => {
                    setLoginTab('trial');
                    setErrorMessage('');
                  }}
                  className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                    loginTab === 'trial'
                      ? 'bg-cyan-500 text-slate-950 font-black shadow-md shadow-cyan-500/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Trial Modul 1</span>
                </button>
              </div>

              {/* TAB 1: PASSCODE LOGIN */}
              {loginTab === 'passcode' && (
                <form onSubmit={handlePasscodeSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Nama Siswa / Pengguna
                    </label>
                    <input
                      type="text"
                      id="hero-input-student-name"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Contoh: Muhammad Budi / Alisha"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-xs transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Pilih Avatar Karakter
                    </label>
                    <div className="grid grid-cols-6 gap-1.5">
                      {AVATAR_OPTIONS.map((av) => (
                        <button
                          key={av.id}
                          type="button"
                          onClick={() => setSelectedAvatar(av.id)}
                          className={`p-2 rounded-xl border text-base flex flex-col items-center justify-center transition-all ${
                            selectedAvatar === av.id
                              ? 'border-amber-400 bg-amber-400/20 scale-105 shadow-sm'
                              : 'border-slate-800 bg-slate-800/60 hover:bg-slate-700/60 text-slate-300'
                          }`}
                          title={av.name}
                        >
                          <span>{av.emoji}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
                        <Lock className="w-3 h-3 text-amber-400" />
                        <span>Kode Akses Rahasia</span>
                      </label>
                      <span className="text-[10px] text-slate-400">Dari Guru / Instruktur</span>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="hero-input-passcode"
                        value={accessCode}
                        onChange={(e) => setAccessCode(e.target.value)}
                        placeholder="Ketik kode akses..."
                        required
                        className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-xs tracking-wider font-mono transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Fast Shortcuts */}
                  <div className="pt-0.5 flex flex-wrap items-center justify-between gap-1.5 text-[11px]">
                    <span className="text-slate-400">Pintasan Kode:</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={handleQuickFillStudent}
                        className="px-2 py-0.5 rounded-md bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 text-amber-300 font-mono font-bold transition-all text-[10px]"
                      >
                        Siswa: djuragan39
                      </button>
                      <button
                        type="button"
                        onClick={handleQuickFillAdmin}
                        className="px-2 py-0.5 rounded-md bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 font-mono font-bold transition-all text-[10px]"
                      >
                        Guru: bajuri39
                      </button>
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    id="hero-btn-submit-login"
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Masuk &amp; Buka Silabus 20 Modul</span>
                  </button>
                </form>
              )}

              {/* TAB 2: TRIAL */}
              {loginTab === 'trial' && (
                <form onSubmit={handleTrialSubmit} className="space-y-4">
                  <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-left">
                    <div className="flex items-center gap-1.5 text-cyan-400 font-bold text-xs mb-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Uji Coba Gratis Tanpa Syarat</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Langsung coba dan jelajahi <strong>Modul 1: Mengenal Bagian Menu Scratch 3.0</strong> beserta studio dan kuis interaktifnya.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Nama Siswa Tamu
                    </label>
                    <input
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Contoh: Siswa Tamu Penasaran"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-xs transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Pilih Avatar Karakter
                    </label>
                    <div className="grid grid-cols-6 gap-1.5">
                      {AVATAR_OPTIONS.map((av) => (
                        <button
                          key={av.id}
                          type="button"
                          onClick={() => setSelectedAvatar(av.id)}
                          className={`p-2 rounded-xl border text-base flex flex-col items-center justify-center transition-all ${
                            selectedAvatar === av.id
                              ? 'border-cyan-400 bg-cyan-400/20 scale-105 shadow-sm'
                              : 'border-slate-800 bg-slate-800/60 hover:bg-slate-700/60 text-slate-300'
                          }`}
                          title={av.name}
                        >
                          <span>{av.emoji}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]"
                  >
                    <span>Mulai Belajar Mode Trial (Level 1)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}

              <div className="pt-2 text-center text-[10px] text-slate-400 flex items-center justify-center gap-1.5 border-t border-slate-800">
                <Laptop className="w-3 h-3 text-cyan-400" />
                <span>Penyimpanan lokal di peramban — aman, privat &amp; ramah anak.</span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SECTION: TENTANG DJURAGAN CODING (PROFIL & VISI MISI)                 */}
      {/* ========================================================================= */}
      <section id="sec-about" className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-slate-800">
        <div className="space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Profil Lembaga &amp; Visi Edukasi</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Mengenal Lebih Dekat <span className="text-amber-400">DJuragan Coding</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              DJuragan Coding lahir dari komitmen mendalam untuk menghadirkan pendidikan teknologi yang bermakna, menyenangkan, dan berorientasi pada masa depan anak-anak Indonesia.
            </p>
          </div>

          {/* 3 Bento Cards: Vision, Mission, & Pedagogy */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Visi Utama */}
            <div className="rounded-3xl bg-slate-800/60 border border-slate-700/80 p-6 space-y-4 hover:border-amber-400/40 transition-all shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-black text-xl">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Visi Strategis</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Mencetak generasi muda Indonesia yang bukan hanya fasih sebagai konsumen teknologi (*digital consumers*), melainkan bertransformasi menjadi arsitek dan pencipta karya digital inovatif (*digital creators*) yang berkarakter.
              </p>
            </div>

            {/* Card 2: Misi Pendidikan */}
            <div className="rounded-3xl bg-slate-800/60 border border-slate-700/80 p-6 space-y-4 hover:border-cyan-400/40 transition-all shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-cyan-400/20 text-cyan-400 flex items-center justify-center font-black text-xl">
                <Rocket className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Misi Pembelajaran</h3>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>Menyajikan kurikulum komputasi yang ramah anak dan berstandar internasional.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>Mengintegrasikan pembelajaran logika pemecahan masalah dengan kreativitas seni &amp; sains.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>Memberikan apresiasi dan sertifikasi kompetensi digital yang terverifikasi.</span>
                </li>
              </ul>
            </div>

            {/* Card 3: Pembina & Kurator */}
            <div className="rounded-3xl bg-slate-800/60 border border-slate-700/80 p-6 space-y-4 hover:border-indigo-400/40 transition-all shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-indigo-400/20 text-indigo-400 flex items-center justify-center font-black text-xl">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Pembina &amp; Kurator</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Dikurasi langsung oleh <strong>Pak Guru Bajuri</strong> beserta tim pengembang teknologi edukasi berpengalaman dalam mendampingi ratusan siswa sekolah dasar dan menengah menguasai logika algoritma secara sistematis.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SECTION: 4 PILAR COMPUTATIONAL THINKING                                */}
      {/* ========================================================================= */}
      <section id="sec-pillars" className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-slate-800">
        <div className="space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>Kerangka Berpikir Komputasional</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              4 Pilar Utama Kompetensi Logika
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Kami tidak sekadar mengajarkan susunan balok kode, melainkan menanamkan 4 pilar nalar komputasi (*Computational Thinking*) yang dapat diterapkan dalam kehidupan nyata:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Pilar 1 */}
            <div className="rounded-3xl bg-slate-800/40 border border-slate-700/80 p-6 space-y-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h4 className="text-sm font-black text-white">Dekomposisi (Decomposition)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Kemampuan mengurai suatu masalah atau sistem game yang rumit menjadi beberapa bagian sub-masalah kecil yang lebih sederhana dan mudah dituntaskan.
              </p>
            </div>

            {/* Pilar 2 */}
            <div className="rounded-3xl bg-slate-800/40 border border-slate-700/80 p-6 space-y-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h4 className="text-sm font-black text-white">Pengenalan Pola (Pattern)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Mendeteksi keteraturan, kemiripan perulangan (*loops*), dan struktur data untuk memecahkan kendala logika secara konsisten dan efisien.
              </p>
            </div>

            {/* Pilar 3 */}
            <div className="rounded-3xl bg-slate-800/40 border border-slate-700/80 p-6 space-y-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h4 className="text-sm font-black text-white">Abstraksi (Abstraction)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Memfokuskan perhatian pada elemen variabel penting (skor, nyawa, koordinat arah) dan menyaring informasi yang tidak esensial.
              </p>
            </div>

            {/* Pilar 4 */}
            <div className="rounded-3xl bg-slate-800/40 border border-slate-700/80 p-6 space-y-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm">
                04
              </div>
              <h4 className="text-sm font-black text-white">Algoritma (Algorithm Design)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Merumuskan serangkaian instruksi logis yang runtut, terstruktur, dan presisi agar komputer/sprite dapat mengeksekusi tugas sesuai target.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SECTION: EKSPLORASI KURIKULUM 20 MODUL (LENGKAP & RINCI)               */}
      {/* ========================================================================= */}
      <section id="sec-curriculum" className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-slate-800">
        <div className="space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>Struktur Pembelajaran Berjenjang</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Kurikulum 20 Modul Scratch 3.0
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Disusun dalam 4 tahapan progresif yang mencakup seluruh spektrum dasar ilmu komputer. Klik pada salah satu tahapan atau modul di bawah untuk melihat rincian capaian pembelajarannya:
            </p>
          </div>

          {/* 4 Learning Stages Bento Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {learningStages.map((stg) => (
              <button
                key={stg.stage}
                onClick={() => setSelectedStage(selectedStage === stg.stage ? 'all' : stg.stage)}
                className={`text-left p-5 rounded-3xl border transition-all ${
                  selectedStage === stg.stage
                    ? 'bg-slate-800 border-amber-400 shadow-lg shadow-amber-400/10 ring-1 ring-amber-400'
                    : 'bg-slate-850 bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${stg.bgLight} ${stg.textAccent}`}>
                    {stg.badge}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">{stg.levelRange}</span>
                </div>
                <h4 className="text-sm font-bold text-white mb-2">{stg.title}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">{stg.description}</p>
                <div className="mt-3 text-[10px] font-bold text-amber-400 flex items-center gap-1">
                  <span>{selectedStage === stg.stage ? '✓ Menampilkan 5 Modul' : 'Klik untuk filter'}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Filter Reset Button */}
          {selectedStage !== 'all' && (
            <div className="flex items-center justify-between bg-slate-800/80 p-3 rounded-2xl border border-slate-700">
              <span className="text-xs text-slate-300">
                Menampilkan modul untuk <strong>Tahap {selectedStage}</strong>
              </span>
              <button
                onClick={() => setSelectedStage('all')}
                className="text-xs font-bold text-amber-400 hover:underline"
              >
                Lihat Semua 20 Modul
              </button>
            </div>
          )}

          {/* Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredLevels.map((lvl) => (
              <div
                key={lvl.id}
                onClick={() => setPreviewLevelModal(lvl)}
                className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700/80 hover:border-amber-400/50 transition-all cursor-pointer space-y-3 group shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shadow-sm">
                      {lvl.id < 10 ? `0${lvl.id}` : lvl.id}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                      {lvl.category}
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                    {lvl.title}
                  </h4>

                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {lvl.summary}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-[10px] text-slate-400">
                  <span>⏱️ {lvl.allocation}</span>
                  <span className="text-amber-400 font-bold">+{lvl.xpReward} XP</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-950/60 to-slate-900 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Ingin langsung mempraktikkan materi di atas?</span>
              </h4>
              <p className="text-xs text-slate-300">
                Gunakan kode akses siswa atau coba langsung Modul 1 secara gratis.
              </p>
            </div>

            <button
              onClick={() => scrollToSection('sec-login-portal')}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md transition-all flex-shrink-0"
            >
              Masuk ke Kelas Sekarang
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. SECTION: METODOLOGI PEMBELAJARAN (4D ACTIVE LEARNING)                 */}
      {/* ========================================================================= */}
      <section id="sec-methodology" className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-slate-800">
        <div className="space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              <span>Metodologi Pembelajaran Teruji</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Siklus Belajar Aktif 4 Langkah (*4D Cycle*)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Setiap modul dirancang menggunakan pendekatan pedagogis siklikal yang menjamin pemahaman konsep secara mendalam dan tahan lama:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <div className="p-6 rounded-3xl bg-slate-800/40 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-black text-base">
                1
              </div>
              <h4 className="text-sm font-bold text-white">Discover (Pahami Konsep)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Mempelajari konsep komputasi dan tujuan pembelajaran melalui analogi visual yang mudah dicerna anak.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-3xl bg-slate-800/40 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-400/20 text-cyan-400 flex items-center justify-center font-black text-base">
                2
              </div>
              <h4 className="text-sm font-bold text-white">Design &amp; Code (Praktik)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Menyusun blok kode di Scratch Studio dengan panduan langkah demi langkah yang terstruktur dan terverifikasi.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-3xl bg-slate-800/40 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-400/20 text-indigo-400 flex items-center justify-center font-black text-base">
                3
              </div>
              <h4 className="text-sm font-bold text-white">Debug &amp; Challenge (Eksplorasi)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Menemukan &amp; mengatasi kesalahan logika (*bug*) serta menaklukkan misi tantangan kreatif untuk bonus Real XP.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-3xl bg-slate-800/40 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/20 text-emerald-400 flex items-center justify-center font-black text-base">
                4
              </div>
              <h4 className="text-sm font-bold text-white">Deliver &amp; Certify (Kelulusan)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Menyelesaikan kuis evaluasi pemahaman, meraih lencana prestasi, dan mencetak Sertifikat Kelulusan resmi.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. SECTION: TABEL KOMPARASI PROFESIONAL                                   */}
      {/* ========================================================================= */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-slate-800">
        <div className="space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Standar Keunggulan Pembelajaran</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Mengapa Memilih DJuragan Coding?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Bandingkan fitur komprehensif kami dengan metode pembelajaran konvensional (video tutorial acak atau buku statis):
            </p>
          </div>

          <div className="rounded-3xl bg-slate-800/60 border border-slate-700/80 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-900/90 border-b border-slate-700 text-slate-300 font-bold uppercase tracking-wider">
                    <th className="p-4 sm:p-5">Fitur &amp; Indikator Kualitas</th>
                    <th className="p-4 sm:p-5 bg-amber-400/10 text-amber-300 text-center font-black">
                      ⭐ DJuragan Coding
                    </th>
                    <th className="p-4 sm:p-5 text-center text-slate-400">
                      Tutorial Video / Buku Pasif
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60 text-slate-200">
                  <tr className="hover:bg-slate-800/40">
                    <td className="p-4 sm:p-5 font-semibold">Kurikulum Berjenjang 20 Modul Standar Industri</td>
                    <td className="p-4 sm:p-5 text-center bg-amber-400/5 font-bold text-emerald-400">✓ Sangat Lengkap (Sem. 1 &amp; 2)</td>
                    <td className="p-4 sm:p-5 text-center text-slate-500">✗ Acak &amp; Tidak Terstruktur</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="p-4 sm:p-5 font-semibold">Studio Scratch 3.0 Live Langsung di Platform</td>
                    <td className="p-4 sm:p-5 text-center bg-amber-400/5 font-bold text-emerald-400">✓ Terintegrasi (Split Screen)</td>
                    <td className="p-4 sm:p-5 text-center text-slate-500">✗ Harus Buka Tab Terpisah</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="p-4 sm:p-5 font-semibold">Pojok Debugging &amp; Solusi Kendala Siswa</td>
                    <td className="p-4 sm:p-5 text-center bg-amber-400/5 font-bold text-emerald-400">✓ Ada di Setiap Modul</td>
                    <td className="p-4 sm:p-5 text-center text-slate-500">✗ Bingung Cari Solusi Mandiri</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="p-4 sm:p-5 font-semibold">Evaluasi Kuis Pemahaman Otomatis &amp; Real XP</td>
                    <td className="p-4 sm:p-5 text-center bg-amber-400/5 font-bold text-emerald-400">✓ Validasi Langsung &amp; Real-time</td>
                    <td className="p-4 sm:p-5 text-center text-slate-500">✗ Tanpa Pengukuran Pemahaman</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="p-4 sm:p-5 font-semibold">Sertifikat Kelulusan Resmi Digital &amp; Laporan PDF</td>
                    <td className="p-4 sm:p-5 text-center bg-amber-400/5 font-bold text-emerald-400">✓ Otomatis Berbasis Nomor Seri</td>
                    <td className="p-4 sm:p-5 text-center text-slate-500">✗ Tidak Tersedia</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="p-4 sm:p-5 font-semibold">Aman untuk Anak (Kid-Safe, Bebas Iklan Luar)</td>
                    <td className="p-4 sm:p-5 text-center bg-amber-400/5 font-bold text-emerald-400">✓ 100% Bersih &amp; Fokus Belajar</td>
                    <td className="p-4 sm:p-5 text-center text-slate-500">✗ Banyak Gangguan Iklan</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. SECTION: FAQ (TANYA JAWAB UMUM)                                        */}
      {/* ========================================================================= */}
      <section id="sec-faq" className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full border-t border-slate-800">
        <div className="space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Pusat Bantuan &amp; Informasi</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Pertanyaan yang Sering Diajukan (FAQ)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Temukan jawaban cepat atas pertanyaan umum seputar akses dan proses pembelajaran:
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-slate-800/50 border border-slate-700/80 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-white hover:text-amber-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-slate-700/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. BOTTOM CALL TO ACTION & FOOTER                                         */}
      {/* ========================================================================= */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-slate-800">
        <div className="rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-8 sm:p-12 text-slate-950 text-center space-y-6 shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              Siap Memulai Petualangan Koding Hebat?
            </h2>
            <p className="text-xs sm:text-sm font-semibold opacity-90 leading-relaxed">
              Bergabunglah bersama ribuan siswa cerdas lainnya. Buka potensi logika dan wujudkan game impianmu hari ini!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => scrollToSection('sec-login-portal')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-black text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 transition-all transform active:scale-95"
            >
              <KeyRound className="w-4 h-4 text-amber-400" />
              <span>Masuk Portal Belajar Sekarang</span>
            </button>

            <button
              onClick={() => {
                setLoginTab('trial');
                scrollToSection('sec-login-portal');
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white/90 hover:bg-white text-slate-950 font-bold text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 transition-all"
            >
              <Code2 className="w-4 h-4 text-blue-600" />
              <span>Coba Trial Modul 1 (Gratis)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer Official */}
      <footer className="relative z-10 py-8 px-4 sm:px-6 border-t border-slate-800/80 text-center text-xs text-slate-400 space-y-2">
        <div className="flex items-center justify-center gap-2">
          <BrandLogo size="sm" />
        </div>
        <p>© {new Date().getFullYear()} DJuragan Coding • Dibina oleh Pak Guru Bajuri • Platform Edukasi Koding &amp; Computational Thinking Berbasis Scratch 3.0</p>
        <p className="text-[11px] text-slate-500">Mencetak Generasi Cipta Digital Unggul Indonesia</p>
      </footer>

      {/* ========================================================================= */}
      {/* PREVIEW LEVEL MODAL (QUICK POPUP FOR CURRICULUM EXPLORER)                 */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {previewLevelModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border border-slate-700 p-6 text-white space-y-5 shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center">
                      {previewLevelModal.id < 10 ? `0${previewLevelModal.id}` : previewLevelModal.id}
                    </span>
                    <span className="text-xs font-bold text-amber-400 uppercase">
                      Semester {previewLevelModal.semester === 1 ? 'Ganjil' : 'Genap'} • {previewLevelModal.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-white">{previewLevelModal.title}</h3>
                </div>

                <button
                  onClick={() => setPreviewLevelModal(null)}
                  className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase">Ringkasan Materi:</span>
                  <p className="text-slate-300 leading-relaxed">{previewLevelModal.summary}</p>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase">Indikator Capaian Belajar:</span>
                  <p className="text-slate-300 italic bg-emerald-950/20 p-3 rounded-xl border border-emerald-500/30 leading-relaxed">
                    "{previewLevelModal.indicator}"
                  </p>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-amber-400 uppercase">Topik Pembahasan:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {previewLevelModal.topics.map((t, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 text-[11px] font-medium border border-slate-700">
                        • {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase">Tantangan Kreatif:</span>
                  <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-slate-300">
                    <p className="font-bold text-white mb-1">{previewLevelModal.challenge.title} (+{previewLevelModal.challenge.bonusXp} XP)</p>
                    <p className="text-[11px] text-slate-300">{previewLevelModal.challenge.description}</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
                <span className="text-xs text-slate-400">⏱️ Alokasi: {previewLevelModal.allocation}</span>
                <button
                  onClick={() => {
                    setPreviewLevelModal(null);
                    scrollToSection('sec-login-portal');
                  }}
                  className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Masuk untuk Mulai Level Ini</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
