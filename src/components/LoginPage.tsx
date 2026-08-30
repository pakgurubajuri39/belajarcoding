import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  KeyRound, ShieldCheck, Sparkles, Eye, EyeOff, CheckCircle2,
  AlertCircle, ArrowRight, Lock, Laptop, Trophy, Target, Award,
  BookOpen, Star, Zap, Code2, Sun, Moon, Check, User, HeartHandshake
} from 'lucide-react';
import { STUDENT_PASSCODE, ADMIN_PASSCODE } from '../utils/storage';
import { UserSession } from '../types';
import { AVATAR_OPTIONS, SYLLABUS_DATA } from '../data/syllabus';
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
  const [activeTab, setActiveTab] = useState<'passcode' | 'trial' | 'about'>('passcode');
  const [studentName, setStudentName] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0].id);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedCode = accessCode.trim();
    const finalName = studentName.trim() || 'Siswa Juara Coding';

    if (trimmedCode === ADMIN_PASSCODE) {
      onLoginSuccess({
        isAuthenticated: true,
        role: 'admin',
        studentName: studentName.trim() || 'Pak Guru (Admin Instruktur)',
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
      setErrorMessage('Kode akses tidak cocok. Pastikan kode dimasukkan dengan benar atau gunakan tombol bantuan.');
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
      studentName: studentName.trim() || 'Siswa Uji Coba (Trial)',
      avatar: selectedAvatar,
      loginDate: new Date().toISOString()
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between selection:bg-amber-400 selection:text-slate-950 relative overflow-hidden">
      
      {/* Background ambient glowing orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[30rem] h-[30rem] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <header className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <BrandLogo size="md" />

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle Dark/Light Mode"
            className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 hover:text-white transition-all shadow-sm flex items-center gap-2 text-xs font-semibold"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">Mode Terang</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-400" />
                <span className="hidden sm:inline">Mode Gelap</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Login Screen Hero Section */}
      <main className="relative z-10 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 flex-1 flex flex-col justify-center">
        
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-extrabold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Portal Masuk Pembelajaran Scratch 3.0</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Selamat Datang di <span className="text-amber-400">DJuragan Coding</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Silakan masukkan kode akses pembelajaran untuk membuka 20 level silabus interaktif, studio Scratch, dan klaim sertifikat kelulusan.
          </p>
        </div>

        {/* Center Bento Login Card */}
        <div className="max-w-xl w-full mx-auto rounded-3xl bg-slate-850 bg-slate-900/90 border border-slate-800/90 shadow-2xl p-6 sm:p-8 backdrop-blur-xl">
          
          {/* 3 Nav Tabs */}
          <div className="flex p-1 mb-6 rounded-2xl bg-slate-800/90 border border-slate-700/80">
            <button
              type="button"
              id="tab-login-passcode"
              onClick={() => {
                setActiveTab('passcode');
                setErrorMessage('');
              }}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                activeTab === 'passcode'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <KeyRound className="w-4 h-4" />
              <span>Kode Akses</span>
            </button>

            <button
              type="button"
              id="tab-login-trial"
              onClick={() => {
                setActiveTab('trial');
                setErrorMessage('');
              }}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                activeTab === 'trial'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>Trial Gratis</span>
            </button>

            <button
              type="button"
              id="tab-login-about"
              onClick={() => {
                setActiveTab('about');
                setErrorMessage('');
              }}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                activeTab === 'about'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Star className="w-4 h-4" />
              <span>Info Silabus</span>
            </button>
          </div>

          {/* TAB 1: PASSCODE LOGIN FORM */}
          {activeTab === 'passcode' && (
            <form onSubmit={handlePasscodeSubmit} className="space-y-4">
              
              {/* Student Name */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>Nama Siswa / Pengguna</span>
                  <span className="text-[10px] text-slate-400 font-normal">Ditampilkan di sertifikat</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="input-login-student-name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Contoh: Muhammad Budi / Alisha"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-sm transition-all"
                  />
                </div>
              </div>

              {/* Avatar Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Pilih Avatar Karakter
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {AVATAR_OPTIONS.map((av) => (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => setSelectedAvatar(av.id)}
                      className={`p-2.5 rounded-2xl border text-xl flex flex-col items-center justify-center transition-all ${
                        selectedAvatar === av.id
                          ? 'border-amber-400 bg-amber-400/20 scale-105 shadow-md shadow-amber-500/20'
                          : 'border-slate-800 bg-slate-800/60 hover:bg-slate-700/60 text-slate-300'
                      }`}
                      title={av.name}
                    >
                      <span>{av.emoji}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Secret Passcode */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Kode Akses Rahasia</span>
                  </label>
                  <span className="text-[11px] text-slate-400">Dari Guru / Instruktur</span>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="input-login-passcode"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    placeholder="Ketik kode akses..."
                    required
                    className="w-full pl-4 pr-11 py-3 rounded-2xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-sm tracking-wider font-mono transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1.5"
                    title={showPassword ? 'Sembunyikan sandi' : 'Tampilkan sandi'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Quick Fill Passcode Buttons for Easy Access */}
              <div className="pt-1 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                <span className="text-slate-400">Pintasan Kode Akses:</span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleQuickFillStudent}
                    id="btn-quick-fill-student"
                    className="px-2.5 py-1 rounded-lg bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 text-amber-300 font-mono font-bold transition-all"
                  >
                    Siswa: djuragan39
                  </button>
                  <button
                    type="button"
                    onClick={handleQuickFillAdmin}
                    id="btn-quick-fill-admin"
                    className="px-2.5 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 font-mono font-bold transition-all"
                  >
                    Admin: bajuri39
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-start gap-2.5 animate-shake">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                id="btn-submit-login"
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] mt-2"
              >
                <Lock className="w-4 h-4" />
                <span>Buka Silabus 20 Level & Masuk Belajar</span>
              </button>
            </form>
          )}

          {/* TAB 2: TRIAL ACCESS */}
          {activeTab === 'trial' && (
            <form onSubmit={handleTrialSubmit} className="space-y-4">
              <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-left">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm mb-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Mode Uji Coba Gratis (Trial Level 1)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Ingin mencoba terlebih dahulu? Kamu bisa langsung mempraktikkan <strong>Modul 1: Mengenal Bagian Menu Scratch</strong> tanpa memasukkan kode akses.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Nama Siswa / Pengguna Trial
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Contoh: Siswa Tamu Penasaran"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Pilih Avatar Karakter
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {AVATAR_OPTIONS.map((av) => (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => setSelectedAvatar(av.id)}
                      className={`p-2.5 rounded-2xl border text-xl flex flex-col items-center justify-center transition-all ${
                        selectedAvatar === av.id
                          ? 'border-cyan-400 bg-cyan-400/20 scale-105 shadow-md shadow-cyan-500/20'
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
                id="btn-submit-trial"
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] mt-2"
              >
                <span>Masuk Mode Trial (Mulai Level 1)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* TAB 3: CURRICULUM HIGHLIGHTS */}
          {activeTab === 'about' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-left space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>Kurikulum 20 Modul Scratch 3.0</span>
                </div>
                <h4 className="text-sm font-bold text-white">4 Tahapan Belajar Terstruktur:</h4>
                <div className="space-y-2 text-xs text-slate-300 pt-1">
                  <div className="flex items-start gap-2 p-2 rounded-xl bg-slate-800/60 border border-slate-700/50">
                    <span className="w-5 h-5 rounded-lg bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center flex-shrink-0 text-[10px]">1</span>
                    <span><strong>Level 1-5:</strong> Fondasi Logika, Gerakan Bidang X/Y, Kostum & Event</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 rounded-xl bg-slate-800/60 border border-slate-700/50">
                    <span className="w-5 h-5 rounded-lg bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center flex-shrink-0 text-[10px]">2</span>
                    <span><strong>Level 6-10:</strong> Audio Synth, Manipulasi Looks, Broadcast Cerita & Kuis</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 rounded-xl bg-slate-800/60 border border-slate-700/50">
                    <span className="w-5 h-5 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center flex-shrink-0 text-[10px]">3</span>
                    <span><strong>Level 11-15:</strong> Variabel Skor, Timer, Logika IF-ELSE & Game Labirin</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 rounded-xl bg-slate-800/60 border border-slate-700/50">
                    <span className="w-5 h-5 rounded-lg bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center flex-shrink-0 text-[10px]">4</span>
                    <span><strong>Level 16-20:</strong> Fisika Game, Kloning Hujan Bintang, Gravitasi & AI Game</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('passcode')}
                  className="flex-1 py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Masukkan Kode Akses Sekarang</span>
                </button>
              </div>
            </div>
          )}

          {/* Privacy and Local Persistence Note */}
          <div className="mt-5 pt-4 border-t border-slate-800/80 text-center flex items-center justify-center gap-2 text-[11px] text-slate-400">
            <Laptop className="w-3.5 h-3.5 text-cyan-400" />
            <span>Penyimpanan lokal di browser — aman, bebas iklan & ramah anak.</span>
          </div>

        </div>

        {/* Value Highlights Grid Below */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mt-8 text-center text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-1">
            <div className="text-amber-400 font-black text-base">20 Level</div>
            <div className="text-slate-400 text-[11px]">Silabus Terstruktur</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-1">
            <div className="text-cyan-400 font-black text-base">Live Studio</div>
            <div className="text-slate-400 text-[11px]">Scratch 3.0 Web</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-1">
            <div className="text-emerald-400 font-black text-base">Gamifikasi XP</div>
            <div className="text-slate-400 text-[11px]">Trofi & 8 Lencana</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-1">
            <div className="text-indigo-400 font-black text-base">Sertifikat</div>
            <div className="text-slate-400 text-[11px]">Kelulusan Resmi</div>
          </div>
        </div>

      </main>

      {/* Footer Branding */}
      <footer className="relative z-10 py-4 text-center text-xs text-slate-500 border-t border-slate-800/60">
        <p>© {new Date().getFullYear()} DJuragan Coding • Dibina oleh Guru Bajuri • Kurikulum Logika Scratch 3.0</p>
      </footer>

    </div>
  );
};
