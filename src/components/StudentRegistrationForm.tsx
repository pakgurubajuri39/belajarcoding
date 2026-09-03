import React, { useState } from 'react';
import {
  User, Mail, School, Phone, Lock, Eye, EyeOff, Sparkles,
  CheckCircle2, AlertCircle, ArrowRight, Loader2, Send, Clock,
  HelpCircle, Compass, Gamepad2, HeartHandshake, ShieldCheck
} from 'lucide-react';
import { registerStudentInFirebase } from '../lib/firebase';
import { AVATAR_OPTIONS } from '../data/syllabus';
import { StudentRegistration } from '../types';

interface StudentRegistrationFormProps {
  onRegisteredSuccess?: (registration: StudentRegistration) => void;
  onSwitchToLogin: () => void;
  onSwitchToStatusCheck?: () => void;
}

export const StudentRegistrationForm: React.FC<StudentRegistrationFormProps> = ({
  onRegisteredSuccess,
  onSwitchToLogin,
  onSwitchToStatusCheck
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [schoolOrClass, setSchoolOrClass] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState(AVATAR_OPTIONS[0].id);
  const [motivation, setMotivation] = useState('Ingin belajar membuat game dan animasi Scratch 🎮');
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedData, setSubmittedData] = useState<StudentRegistration | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Mohon masukkan nama lengkap siswa.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Mohon masukkan alamat email yang valid.');
      return;
    }
    if (!schoolOrClass.trim()) {
      setErrorMessage('Mohon cantumkan nama sekolah dan tingkatan kelas.');
      return;
    }
    if (!password || password.length < 3) {
      setErrorMessage('Kata sandi minimal 3 karakter untuk keamanan akun.');
      return;
    }

    setIsLoading(true);

    try {
      const result = await registerStudentInFirebase({
        fullName: fullName.trim(),
        email: email.trim(),
        schoolOrClass: schoolOrClass.trim(),
        phone: phone.trim(),
        password: password.trim(),
        avatar,
        motivation
      });

      if (result.success && result.data) {
        setSubmittedData(result.data);
        if (onRegisteredSuccess) {
          onRegisteredSuccess(result.data);
        }
      } else {
        setErrorMessage(result.message || 'Gagal mengirim pendaftaran.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Terjadi kesalahan sistem saat mendaftar.');
    } finally {
      setIsLoading(false);
    }
  };

  // Tampilan Sukses Setelah Kirim Pendaftaran
  if (submittedData) {
    return (
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/90 border border-amber-500/40 text-center space-y-4 animate-fadeIn">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-400/10">
          <Clock className="w-7 h-7 animate-pulse" />
        </div>

        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 border border-amber-400/40 text-amber-300 mb-2">
            <Clock className="w-3.5 h-3.5" />
            Status: Menunggu Persetujuan Admin (Pending)
          </span>
          <h3 className="text-lg font-black text-white">
            Pendaftaran Berhasil Dikirim! 🚀
          </h3>
          <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
            Terima kasih <strong className="text-amber-300">{submittedData.fullName}</strong>. Data pendaftaranmu telah masuk ke server Firebase dan sedang ditinjau oleh Admin / Guru Pembina.
          </p>
        </div>

        {/* Ringkasan Data Siswa */}
        <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-left text-xs space-y-2">
          <div className="flex justify-between items-center py-1 border-b border-slate-700/50">
            <span className="text-slate-400">Nama Siswa:</span>
            <span className="font-bold text-white">{submittedData.fullName}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-slate-700/50">
            <span className="text-slate-400">Email Login:</span>
            <span className="font-mono text-amber-300 font-semibold">{submittedData.email}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-slate-700/50">
            <span className="text-slate-400">Sekolah & Kelas:</span>
            <span className="text-slate-200">{submittedData.schoolOrClass}</span>
          </div>
          <div className="flex justify-between items-center pt-1">
            <span className="text-slate-400">Waktu Daftar:</span>
            <span className="text-slate-400 text-[11px]">{new Date(submittedData.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-left text-[11px] text-indigo-200 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="block text-white">Alur Verifikasi:</strong>
            Admin atau guru pembina akan memeriksa kelayakan akunmu di <strong>Panel Admin</strong>. Setelah disetujui (approve), kamu bisa langsung login menggunakan email & kata sandi yang telah didaftarkan!
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="flex-1 py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <span>Beralih ke Form Masuk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          {onSwitchToStatusCheck && (
            <button
              type="button"
              onClick={onSwitchToStatusCheck}
              className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition-all"
            >
              Cek Status Akun
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/20 text-xs text-amber-200/90 flex items-start gap-2">
        <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-amber-300 block">Daftar Akun Siswa Baru</span>
          <span className="text-[11px] text-slate-300">
            Isi formulir di bawah. Admin/Guru pembina akan mereview dan mengaktifkan akunmu agar dapat membuka seluruh 20 Level Scratch!
          </span>
        </div>
      </div>

      {/* Nama Lengkap */}
      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
          Nama Lengkap Siswa <span className="text-rose-400">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Contoh: Muhammad Alif Pratama"
            className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-xs transition-all"
          />
          <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Email & No WhatsApp */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
            Email Siswa / Wali <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-xs font-mono transition-all"
            />
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
            No. WhatsApp / HP
          </label>
          <div className="relative">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0812xxxxxxx"
              className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-xs font-mono transition-all"
            />
            <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Asal Sekolah & Tingkat Kelas */}
      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
          Asal Sekolah & Kelas <span className="text-rose-400">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            required
            value={schoolOrClass}
            onChange={(e) => setSchoolOrClass(e.target.value)}
            placeholder="Contoh: SDN Menteng 01 / Kelas 4B"
            className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-xs transition-all"
          />
          <School className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Buat Kata Sandi */}
      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
          Buat Kata Sandi Akun <span className="text-rose-400">*</span>
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimal 3 karakter..."
            className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-xs font-mono transition-all"
          />
          <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
          >
            {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          </button>
        </div>
        <p className="text-[10px] text-slate-400 mt-1">Kata sandi ini digunakan untuk masuk saat akun telah disetujui.</p>
      </div>

      {/* Pilihan Avatar Karakter */}
      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
          Pilih Avatar Karakter Favorit
        </label>
        <div className="grid grid-cols-6 gap-1.5">
          {AVATAR_OPTIONS.map((av) => (
            <button
              key={av.id}
              type="button"
              onClick={() => setAvatar(av.id)}
              className={`p-2 rounded-xl border text-base flex flex-col items-center justify-center transition-all ${
                avatar === av.id
                  ? 'border-amber-400 bg-amber-400/20 scale-105 shadow-sm text-amber-300'
                  : 'border-slate-800 bg-slate-800/60 hover:bg-slate-700/60 text-slate-300'
              }`}
              title={av.name}
            >
              <span>{av.emoji}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Minat / Alasan Belajar */}
      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
          Minat / Alasan Belajar Scratch
        </label>
        <select
          value={motivation}
          onChange={(e) => setMotivation(e.target.value)}
          className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
        >
          <option value="Ingin belajar membuat game dan animasi Scratch 🎮">Ingin belajar membuat game dan animasi Scratch 🎮</option>
          <option value="Mengikuti kegiatan ekstrakurikuler coding di sekolah 🏫">Mengikuti kegiatan ekstrakurikuler coding di sekolah 🏫</option>
          <option value="Melatih nalar logika, matematika, dan problem solving 🧠">Melatih nalar logika, matematika, dan problem solving 🧠</option>
          <option value="Tertarik dengan dunia AI dan robotika sejak dini 🤖">Tertarik dengan dunia AI dan robotika sejak dini 🤖</option>
          <option value="Mau ikut kompetisi karya koding anak tingkat nasional 🏆">Mau ikut kompetisi karya koding anak tingkat nasional 🏆</option>
        </select>
      </div>

      {errorMessage && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Mengirim ke Server Firebase...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Kirim Pendaftaran ke Admin / Guru</span>
          </>
        )}
      </button>

      {/* Switch to Login Link */}
      <div className="pt-1 text-center">
        <p className="text-xs text-slate-400">
          Sudah pernah mendaftar?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-amber-400 hover:underline font-bold"
          >
            Masuk ke Akun
          </button>
        </p>
      </div>
    </form>
  );
};
