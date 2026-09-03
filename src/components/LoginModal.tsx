import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  KeyRound, ShieldCheck, UserCheck, Sparkles, Eye, EyeOff, CheckCircle2,
  AlertCircle, ArrowRight, Lock, Laptop, Trophy, Target, Award,
  BookOpen, Star, Flame, Check, HelpCircle, Code2, Zap, HeartHandshake, Play,
  LogOut, X, Clock, Loader2, Mail
} from 'lucide-react';
import { ADMIN_PASSCODE, loadProgress, loadSession, getResumeLevelId } from '../utils/storage';
import { UserRole, UserSession, StudentRegistration } from '../types';
import { AVATAR_OPTIONS, SYLLABUS_DATA } from '../data/syllabus';
import { BrandLogo } from './BrandLogo';
import { StudentRegistrationForm } from './StudentRegistrationForm';
import { CheckRegistrationStatus } from './CheckRegistrationStatus';
import { loginStudentWithFirebase } from '../lib/firebase';

interface LoginModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onLoginSuccess: (session: UserSession) => void;
  currentRole: UserRole;
  onLogout?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  currentRole,
  onLogout
}) => {
  const savedProgress = loadProgress();
  const savedSession = loadSession();
  const resumeLevelId = getResumeLevelId(savedProgress, 'student');
  const resumeLevelObj = SYLLABUS_DATA.find(l => l.id === resumeLevelId) || SYLLABUS_DATA[0];
  const hasPreviousActivity = savedProgress.completedLevelIds.length > 0 || (savedProgress.lastStudiedLevelId && savedProgress.lastStudiedLevelId > 1) || savedProgress.xp > 0;

  const [emailOrCode, setEmailOrCode] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [studentName, setStudentName] = useState(
    savedSession.studentName && savedSession.studentName !== 'Siswa Tamu' && savedSession.studentName !== 'Siswa Uji Coba (Trial)'
      ? savedSession.studentName
      : ''
  );
  const [selectedAvatar, setSelectedAvatar] = useState(savedSession.avatar || AVATAR_OPTIONS[0].id);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [pendingNotice, setPendingNotice] = useState<StudentRegistration | null>(null);
  const [activeTab, setActiveTab] = useState<'passcode' | 'register' | 'status' | 'trial' | 'about'>('passcode');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setPendingNotice(null);

    const trimmedInput = emailOrCode.trim();
    const trimmedPass = studentPassword.trim();

    if (!trimmedInput) {
      setErrorMessage('Mohon masukkan email atau kode akses.');
      return;
    }

    if (trimmedInput === ADMIN_PASSCODE || trimmedPass === ADMIN_PASSCODE) {
      // Admin Login
      onLoginSuccess({
        isAuthenticated: true,
        role: 'admin',
        studentName: studentName.trim() || 'Pak Guru (Admin Instruktur)',
        avatar: selectedAvatar,
        loginDate: new Date().toISOString()
      });
      return;
    }

    // Database Registered Student (Wajib terdaftar dan disetujui Admin)
    setIsLoggingIn(true);
    try {
      const res = await loginStudentWithFirebase(trimmedInput, trimmedPass);
      if (res.success && res.registration) {
        onLoginSuccess({
          isAuthenticated: true,
          role: 'student',
          studentName: res.registration.fullName,
          avatar: res.registration.avatar || selectedAvatar,
          loginDate: new Date().toISOString(),
          email: res.registration.email,
          registrationId: res.registration.id,
          schoolOrClass: res.registration.schoolOrClass
        });
      } else {
        if (res.status === 'pending' && res.registration) {
          setPendingNotice(res.registration);
        }
        setErrorMessage(res.message || 'Email atau kata sandi tidak valid.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Terjadi kesalahan sistem saat mencoba masuk.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleStartTrial = () => {
    onLoginSuccess({
      isAuthenticated: true,
      role: 'guest',
      studentName: studentName.trim() || 'Siswa Uji Coba (Trial)',
      avatar: selectedAvatar,
      loginDate: new Date().toISOString()
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl p-5 sm:p-8 text-white overflow-hidden my-6 max-h-[92vh] flex flex-col"
        >
          {/* Ambient decorative lighting */}
          <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-60 h-60 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />

          {/* Top-right actions (Close / Logout) */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                className="px-2.5 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-center gap-1 transition-all"
                title="Keluar / Logout Akun"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Keluar</span>
              </button>
            )}
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-white transition-all"
                title="Tutup Jendela"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Header & Brand */}
          <div className="flex flex-col items-center text-center mb-5 flex-shrink-0">
            <BrandLogo size="lg" className="mb-2" />
            <p className="text-xs sm:text-sm text-slate-300 max-w-md">
              Platform Pembelajaran Coding & Logika Scratch #1 untuk Generasi Kreatif Masa Depan
            </p>
          </div>

          {/* 5 Main Navigation Tabs */}
          <div className="grid grid-cols-5 p-1 mb-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 flex-shrink-0 text-center gap-1">
            <button
              type="button"
              onClick={() => {
                setActiveTab('passcode');
                setErrorMessage('');
              }}
              className={`py-2 text-[11px] sm:text-xs font-bold rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1 ${
                activeTab === 'passcode'
                  ? 'bg-amber-400 text-slate-950 font-black shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Masuk</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('register');
                setErrorMessage('');
              }}
              className={`py-2 text-[11px] sm:text-xs font-bold rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1 ${
                activeTab === 'register'
                  ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 font-black shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Daftar</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('status');
                setErrorMessage('');
              }}
              className={`py-2 text-[11px] sm:text-xs font-bold rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1 ${
                activeTab === 'status'
                  ? 'bg-indigo-600 text-white font-black shadow-md shadow-indigo-600/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Status</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('trial');
                setErrorMessage('');
              }}
              className={`py-2 text-[11px] sm:text-xs font-bold rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1 ${
                activeTab === 'trial'
                  ? 'bg-cyan-600 text-white font-black shadow-md shadow-cyan-600/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Trial</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('about');
                setErrorMessage('');
              }}
              className={`py-2 text-[11px] sm:text-xs font-bold rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1 ${
                activeTab === 'about'
                  ? 'bg-slate-700 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tentang</span>
            </button>
          </div>

          {/* Scrollable Content Container */}
          <div className="overflow-y-auto pr-1 flex-1 space-y-4">

            {/* TAB: REGISTER (PENDAFTARAN SISWA BARU KE FIREBASE) */}
            {activeTab === 'register' && (
              <StudentRegistrationForm
                onRegisteredSuccess={() => {}}
                onSwitchToLogin={() => setActiveTab('passcode')}
                onSwitchToStatusCheck={() => setActiveTab('status')}
              />
            )}

            {/* TAB: STATUS (CEK STATUS PENDAFTARAN SISWA) */}
            {activeTab === 'status' && (
              <CheckRegistrationStatus
                onSwitchToLogin={() => setActiveTab('passcode')}
                onSwitchToRegister={() => setActiveTab('register')}
              />
            )}

            {/* TAB: PASSCODE / EMAIL LOGIN FORM */}
            {activeTab === 'passcode' && (
              <form onSubmit={handleSubmit} className="space-y-4">
                {hasPreviousActivity && (
                  <div className="p-3 rounded-2xl bg-indigo-950/80 border border-indigo-500/40 flex items-start gap-2.5 text-xs text-indigo-200">
                    <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block">Sesi Belajar Tersimpan</span>
                      <span className="text-[11px] text-slate-300">
                        Kamu akan otomatis melanjutkan di <strong>Level #{resumeLevelId}: {resumeLevelObj.title}</strong> ({savedProgress.xp} XP).
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-left">
                  <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs mb-1">
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>Akses Penuh 20 Level Silabus</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Masuk dengan email pendaftaran siswa yang sudah disetujui Admin, atau passcode khusus guru/admin.
                  </p>
                </div>

                {/* Email / Access Code */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Email Siswa Terdaftar
                    </label>
                    <span className="text-[11px] text-emerald-400 font-semibold">Database Terverifikasi</span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={emailOrCode}
                      onChange={(e) => setEmailOrCode(e.target.value)}
                      placeholder="Masukkan email siswa terdaftar..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-sm font-mono transition-all"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* Secret Passcode / Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Kata Sandi / Verifikasi
                    </label>
                    <button
                      type="button"
                      onClick={() => setActiveTab('status')}
                      className="text-[11px] text-slate-400 hover:text-amber-400 transition-colors"
                    >
                      Cek status akun?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={studentPassword}
                      onChange={(e) => setStudentPassword(e.target.value)}
                      placeholder="Masukkan kata sandi akun..."
                      className="w-full pl-10 pr-11 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-sm tracking-wider font-mono transition-all"
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Pending Notice Banner */}
                {pendingNotice && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 font-bold">
                      <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
                      <span>Akun Menunggu Review Admin</span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      Halo <strong>{pendingNotice.fullName}</strong>, guru pembina perlu menyetujui akun Anda terlebih dahulu di Panel Admin.
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveTab('status')}
                      className="text-[11px] text-amber-400 font-bold hover:underline block pt-1"
                    >
                      Lihat status persetujuan akun →
                    </button>
                  </div>
                )}

                {/* Error Message */}
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] disabled:opacity-50"
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Memverifikasi Akun di Database...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Buka Kunci Aplikasi & Mulai Belajar</span>
                    </>
                  )}
                </button>

                <div className="text-center text-xs text-slate-400 pt-1">
                  Belum terdaftar?{' '}
                  <button
                    type="button"
                    onClick={() => setActiveTab('register')}
                    className="text-amber-400 hover:underline font-bold"
                  >
                    Daftar Siswa Baru Sekarang
                  </button>
                </div>
              </form>
            )}

            {/* TAB: MARKETING SHOWCASE "TENTANG DJURAGAN CODING" */}
            {activeTab === 'about' && (
              <div className="space-y-4">
                {/* Hero Marketing Value Proposition */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/80 via-slate-900 to-amber-950/40 border border-indigo-500/30 text-left relative overflow-hidden">
                  <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs uppercase tracking-widest mb-1.5">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>Akademi Koding Generasi Emas</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white leading-snug">
                    Ubah Waktu Layar Gadget Menjadi Karya Nyata yang Membanggakan!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                    <strong>DJuragan Coding</strong> dirancang khusus sebagai kurikulum komprehensif 20 modul visual Scratch 3.0. Kami membekali anak dengan kemampuan <em>Computational Thinking</em>, pemecahan masalah algoritma, logika matematika, pembuatan game interaktif, hingga konsep kecerdasan buatan (AI) sejak usia dini.
                  </p>
                </div>

                {/* 4 Pilar Keunggulan Utama Bento */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* Keunggulan 1 */}
                  <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-400 flex-shrink-0 mt-0.5">
                      <Target className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">20 Modul Terstruktur & Bertahap</h4>
                      <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                        Kurikulum berjenjang dari pengenalan blok dasar hingga pembuatan game gravitasi, variabel skor, dan simulasi fisika.
                      </p>
                    </div>
                  </div>

                  {/* Keunggulan 2 */}
                  <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 flex-shrink-0 mt-0.5">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">Gamifikasi XP & Trofi Lencana</h4>
                      <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                        Belajar seru serasa bermain game! Raih poin Real XP, naikkan level pangkat siswa, dan kumpulkan 8 lencana prestasi bergengsi.
                      </p>
                    </div>
                  </div>

                  {/* Keunggulan 3 */}
                  <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">Studio Scratch Live Terintegrasi</h4>
                      <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                        Menyusun blok kode warna-warni, efek suara synthesizer nyata, dan menjalankan animasi langsung di browser tanpa instalasi rumit.
                      </p>
                    </div>
                  </div>

                  {/* Keunggulan 4 */}
                  <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 flex-shrink-0 mt-0.5">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">Sertifikat & Laporan Evaluasi PDF</h4>
                      <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                        Sertifikat digital terverifikasi serta lembar laporan capaian belajar PDF siap unduh untuk portofolio akademik sekolah.
                      </p>
                    </div>
                  </div>

                </div>

                {/* Stat Badges Highlights */}
                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-sm sm:text-base font-black text-amber-400">100% Praktik</div>
                    <div className="text-[10px] text-slate-400">Berbasis Proyek Nyata</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-sm sm:text-base font-black text-emerald-400">Aman & Terarah</div>
                    <div className="text-[10px] text-slate-400">Bebas Iklan & Ramah Anak</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-sm sm:text-base font-black text-indigo-400">Lokal Offline</div>
                    <div className="text-[10px] text-slate-400">Tersimpan di Perangkat</div>
                  </div>
                </div>

                {/* Call to Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('passcode')}
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-95"
                  >
                    <KeyRound className="w-4 h-4" />
                    <span>Mulai Belajar (Masukkan Kode Akses)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('trial')}
                    className="sm:w-auto py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-700 flex items-center justify-center gap-2 transition-all"
                  >
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Coba Trial Level 1</span>
                  </button>
                </div>

              </div>
            )}

            {/* TAB 3: TRIAL MODE CARD */}
            {activeTab === 'trial' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-left">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm mb-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>Mode Uji Coba Gratis (Trial Level 1)</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Kamu bisa langsung mencoba belajar <strong>Level 1: Mengenal Bagian Menu Scratch</strong> tanpa kode akses untuk merasakan serunya belajar koding di DJuragan Coding!
                  </p>
                </div>

                {/* Student Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Nama Siswa / Pengguna Trial
                  </label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Contoh: Siswa Tamu Penasaran"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-sm transition-all"
                  />
                </div>

                {/* Avatar Picker */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Pilih Avatar Karakter
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {AVATAR_OPTIONS.map((av) => (
                      <button
                        key={av.id}
                        type="button"
                        onClick={() => setSelectedAvatar(av.id)}
                        className={`p-2 rounded-xl border text-xl flex flex-col items-center justify-center transition-all ${
                          selectedAvatar === av.id
                            ? 'border-cyan-400 bg-cyan-400/20 scale-105'
                            : 'border-slate-800 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300'
                        }`}
                        title={av.name}
                      >
                        <span>{av.emoji}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleStartTrial}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]"
                >
                  <span>Masuk Mode Trial (Level 1) Sekarang</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

          {/* Privacy & Storage note */}
          <div className="mt-4 pt-3 border-t border-slate-800 text-center flex items-center justify-center gap-2 text-[11px] text-slate-400 flex-shrink-0">
            <Laptop className="w-3.5 h-3.5 text-cyan-400" />
            <span>Semua progres & XP tersimpan aman di browser/perangkat Anda.</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
