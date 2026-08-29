import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { KeyRound, ShieldCheck, UserCheck, Sparkles, Eye, EyeOff, CheckCircle2, AlertCircle, ArrowRight, Lock, Laptop } from 'lucide-react';
import { STUDENT_PASSCODE, ADMIN_PASSCODE } from '../utils/storage';
import { UserRole, UserSession } from '../types';
import { AVATAR_OPTIONS } from '../data/syllabus';
import { BrandLogo } from './BrandLogo';

interface LoginModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onLoginSuccess: (session: UserSession) => void;
  currentRole: UserRole;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  currentRole
}) => {
  const [accessCode, setAccessCode] = useState('');
  const [studentName, setStudentName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0].id);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loginMode, setLoginMode] = useState<'passcode' | 'trial'>('passcode');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedCode = accessCode.trim();
    const finalName = studentName.trim() || 'Siswa Juara Coding';

    if (trimmedCode === ADMIN_PASSCODE) {
      // Admin Login
      onLoginSuccess({
        isAuthenticated: true,
        role: 'admin',
        studentName: studentName.trim() || 'Pak Guru (Admin Instruktur)',
        avatar: selectedAvatar,
        loginDate: new Date().toISOString()
      });
    } else if (trimmedCode === STUDENT_PASSCODE) {
      // Student Full Access
      onLoginSuccess({
        isAuthenticated: true,
        role: 'student',
        studentName: finalName,
        avatar: selectedAvatar,
        loginDate: new Date().toISOString()
      });
    } else {
      setErrorMessage('Kode akses tidak valid. Hubungi admin atau instruktur untuk mendapatkan kode akses.');
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl p-6 sm:p-8 text-white overflow-hidden my-8"
        >
          {/* Ambient decorative lighting */}
          <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />

          {/* Header & Brand */}
          <div className="flex flex-col items-center text-center mb-6">
            <BrandLogo size="lg" className="mb-3" />
            <p className="text-sm text-slate-300 max-w-sm mt-1">
              Gerbang Masuk Pembelajaran Mandiri Coding Scratch & Kecerdasan Buatan
            </p>
          </div>

          {/* Role Mode Bento Tabs */}
          <div className="flex p-1 mb-6 rounded-2xl bg-slate-800/80 border border-slate-700/80">
            <button
              type="button"
              onClick={() => {
                setLoginMode('passcode');
                setErrorMessage('');
              }}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                loginMode === 'passcode'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <KeyRound className="w-4 h-4" />
              <span>Kode Akses (Full 20 Level)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setLoginMode('trial');
                setErrorMessage('');
              }}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                loginMode === 'trial'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Akses Trial (Level 1)</span>
            </button>
          </div>

          {/* Form */}
          {loginMode === 'passcode' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Student Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Nama Siswa / Panggilan
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Contoh: Budi Juara, Siti Coder"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-sm transition-all"
                />
              </div>

              {/* Avatar Picker */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Pilih Avatar Coding
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {AVATAR_OPTIONS.map((av) => (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => setSelectedAvatar(av.id)}
                      className={`p-2 rounded-xl border text-xl flex flex-col items-center justify-center transition-all ${
                        selectedAvatar === av.id
                          ? 'border-amber-400 bg-amber-400/20 scale-105 shadow-md shadow-amber-500/20'
                          : 'border-slate-800 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300'
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
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Kode Akses Rahasia
                  </label>
                  <span className="text-[11px] text-slate-400">Dari Admin / Guru</span>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    placeholder="Masukkan kode akses..."
                    required
                    className="w-full pl-4 pr-11 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-sm tracking-wider transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

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
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]"
              >
                <Lock className="w-4 h-4" />
                <span>Buka Kunci Aplikasi & Mulai Belajar</span>
              </button>
            </form>
          ) : (
            /* Trial Mode Card */
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-left">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm mb-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Mode Percobaan Gratis (Trial 1 Level)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Kamu bisa langsung mencoba belajar <strong>Level 1: Mengenal Bagian Menu Scratch</strong> tanpa kode akses.
                  Untuk membuka seluruh 20 Level silabus, hubungi admin untuk mendapatkan kode akses penuh!
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
                  placeholder="Contoh: Siswa Tamu"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-sm transition-all"
                />
              </div>

              {/* Avatar Picker */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Pilih Avatar
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
                <span>Masuk Mode Trial (Level 1)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Privacy & Storage note */}
          <div className="mt-6 pt-4 border-t border-slate-800 text-center flex items-center justify-center gap-2 text-[11px] text-slate-400">
            <Laptop className="w-3.5 h-3.5 text-cyan-400" />
            <span>Semua progres & XP tersimpan aman di browser/perangkat Anda.</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
