import React, { useState } from 'react';
import { Mail, Search, Clock, CheckCircle2, AlertCircle, ArrowRight, Loader2, Sparkles, RefreshCw } from 'lucide-react';
import { checkStudentStatusByEmail } from '../lib/firebase';
import { StudentRegistration } from '../types';

interface CheckRegistrationStatusProps {
  onSwitchToLogin: () => void;
  onSwitchToRegister: () => void;
  onAutoLogin?: (registration: StudentRegistration) => void;
}

export const CheckRegistrationStatus: React.FC<CheckRegistrationStatusProps> = ({
  onSwitchToLogin,
  onSwitchToRegister,
  onAutoLogin
}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [registration, setRegistration] = useState<StudentRegistration | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [hasChecked, setHasChecked] = useState(false);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    setErrorMessage('');
    setHasChecked(true);

    try {
      const res = await checkStudentStatusByEmail(email.trim());
      if (res.found && res.registration) {
        setRegistration(res.registration);
      } else {
        setRegistration(null);
        setErrorMessage(res.message || 'Email tidak ditemukan dalam antrean pendaftaran.');
      }
    } catch (err: any) {
      setErrorMessage('Terjadi kendala saat memeriksa database.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
        <span className="font-bold text-white block mb-0.5">Cek Status Persetujuan Akun</span>
        Masukkan email yang Anda gunakan saat mendaftar untuk melihat apakah akun sudah disetujui oleh Guru/Admin.
      </div>

      <form onSubmit={handleCheck} className="space-y-3">
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
            Email Terdaftar
          </label>
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 text-xs font-mono"
            />
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Memeriksa Database...</span>
            </>
          ) : (
            <>
              <Search className="w-4 h-4" />
              <span>Periksa Status Saya</span>
            </>
          )}
        </button>
      </form>

      {/* Hasil Pengecekan */}
      {hasChecked && registration && (
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700 space-y-3 animate-fadeIn text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="font-bold text-white text-sm">{registration.fullName}</span>
            {registration.status === 'approved' && (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Disetujui (Approved)
              </span>
            )}
            {registration.status === 'pending' && (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 animate-pulse" />
                Menunggu Review Admin
              </span>
            )}
            {registration.status === 'rejected' && (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                Belum Disetujui
              </span>
            )}
          </div>

          <div className="space-y-1.5 text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">Sekolah & Kelas:</span>
              <span className="font-medium text-white">{registration.schoolOrClass}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Tanggal Daftar:</span>
              <span className="text-slate-400">{new Date(registration.createdAt).toLocaleDateString('id-ID', { dateStyle: 'medium' })}</span>
            </div>
          </div>

          {registration.status === 'approved' ? (
            <div className="pt-2">
              <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-[11px] mb-3">
                Selamat! Akunmu telah disetujui oleh <strong>{registration.approvedBy || 'Admin'}</strong>. Kamu dapat langsung masuk untuk mulai belajar.
              </div>
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <span>Masuk Sekarang & Mulai Belajar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : registration.status === 'pending' ? (
            <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-[11px]">
              Akunmu masih dalam antrean persetujuan guru/admin. Guru dapat menyetujui akunmu melalui <strong>Panel Admin</strong>. Silakan periksa kembali beberapa saat lagi.
            </div>
          ) : (
            <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-200 text-[11px]">
              Alasan: {registration.rejectionReason || 'Silakan konfirmasi ke guru pembina kelas.'}
            </div>
          )}
        </div>
      )}

      {errorMessage && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="pt-1 flex items-center justify-between text-xs text-slate-400">
        <button type="button" onClick={onSwitchToLogin} className="hover:text-white">
          ← Kembali ke Form Masuk
        </button>
        <button type="button" onClick={onSwitchToRegister} className="text-amber-400 hover:underline">
          Daftar Akun Baru
        </button>
      </div>
    </div>
  );
};
