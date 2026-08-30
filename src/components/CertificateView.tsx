import React, { useRef } from 'react';
import { Award, CheckCircle2, Download, Printer, Share2, Sparkles, Star, Trophy, ShieldCheck } from 'lucide-react';
import { StudentProgress, UserSession } from '../types';
import { getRankFromXp } from '../utils/storage';
import { BrandLogo } from './BrandLogo';

interface CertificateViewProps {
  progress: StudentProgress;
  session: UserSession;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  progress,
  session
}) => {
  const rankInfo = getRankFromXp(progress.xp);
  const printRef = useRef<HTMLDivElement>(null);

  const completedCount = progress.completedLevelIds.length;
  const isAllCompleted = completedCount === 20;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {/* Header and Print action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Sertifikat Kelulusan & Prestasi</h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Bukti resmi pencapaian belajar pemrograman Scratch & Kecerdasan Buatan di DJuragan Coding.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-bold text-xs shadow-md flex items-center gap-2 transition-all self-stretch sm:self-auto justify-center"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak / Simpan PDF Sertifikat</span>
        </button>
      </div>

      {/* Printable Certificate Frame */}
      <div
        ref={printRef}
        id="printable-certificate"
        className="relative rounded-3xl bg-slate-950 text-white p-8 sm:p-12 border-4 border-amber-400/80 shadow-2xl overflow-hidden"
      >
        {/* Ornate Gold Border & Background Gradients */}
        <div className="absolute inset-2 border-2 border-amber-400/30 rounded-2xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Certificate Content */}
        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
          
          {/* Top Logo and Organization */}
          <div className="flex flex-col items-center gap-2">
            <BrandLogo size="lg" />
            <span className="text-[11px] uppercase tracking-widest text-amber-400 font-bold mt-2">
              AKADEMI PEMROGRAMAN & KECERDASAN BUATAN
            </span>
          </div>

          {/* Certificate Title */}
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-4xl font-serif tracking-wide text-white uppercase font-bold">
              SERTIFIKAT PENCAPAIAN
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 mx-auto rounded-full" />
            <p className="text-xs text-slate-300 italic pt-1">
              Certificate of Achievement in Scratch Coding & AI Logic
            </p>
          </div>

          {/* Awarded to Name */}
          <div className="space-y-2 py-2">
            <p className="text-xs text-slate-400 uppercase tracking-wider">Diberikan dengan bangga kepada:</p>
            <div className="text-3xl sm:text-5xl font-black text-amber-300 tracking-tight font-serif">
              {session.studentName}
            </div>
            <div className="w-64 h-0.5 bg-slate-700 mx-auto" />
          </div>

          {/* Body Text */}
          <p className="max-w-2xl text-xs sm:text-sm text-slate-300 leading-relaxed">
            Atas dedikasi dan keberhasilannya dalam menempuh dan mempraktikkan silabus pembelajaran 
            <strong> Ekstrakurikuler Coding Scratch & Kecerdasan Buatan</strong> pada platform <strong>DJuragan Coding</strong>, 
            dengan menyelesaikan modul algoritma, logika perulangan, sensing, game development, dan fisika komputasi.
          </p>

          {/* Score & XP Highlights */}
          <div className="grid grid-cols-3 gap-4 w-full max-w-lg pt-2 pb-4">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[10px] text-amber-300 block font-semibold">Total Level Selesai</span>
              <span className="text-lg font-bold text-white">{completedCount} / 20 Level</span>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[10px] text-cyan-300 block font-semibold">Total Poin XP</span>
              <span className="text-lg font-bold text-white">{progress.xp} XP</span>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[10px] text-emerald-300 block font-semibold">Pangkat Kelulusan</span>
              <span className="text-lg font-bold text-white">{rankInfo.title}</span>
            </div>
          </div>

          {/* Signatures & Seal */}
          <div className="w-full max-w-2xl flex items-end justify-between pt-6 border-t border-white/10 text-xs">
            {/* Left: Instructor */}
            <div className="flex flex-col items-center space-y-1">
              <span className="font-serif italic text-base text-amber-300">Pak GuruAI</span>
              <div className="w-36 h-0.5 bg-slate-600" />
              <span className="text-[11px] font-bold text-slate-300">Instruktur Utama Coding & AI</span>
              <span className="text-[9px] text-slate-500">DJuragan Coding Academy</span>
            </div>

            {/* Center: Official Seal Badge */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-amber-400 bg-amber-500/10 flex items-center justify-center text-amber-400 shadow-inner flex-shrink-0">
              <div className="text-center">
                <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 mx-auto" />
                <span className="text-[8px] font-extrabold tracking-tighter uppercase block">VERIFIED</span>
              </div>
            </div>

            {/* Right: Date */}
            <div className="flex flex-col items-center space-y-1">
              <span className="font-medium text-slate-200">
                {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <div className="w-36 h-0.5 bg-slate-600" />
              <span className="text-[11px] font-bold text-slate-300">Tanggal Penerbitan</span>
              <span className="text-[9px] text-slate-500">Valid & Tersimpan di Perangkat</span>
            </div>
          </div>

        </div>
      </div>

      {/* Completion status hint */}
      {!isAllCompleted && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs flex items-center gap-3">
          <Star className="w-5 h-5 flex-shrink-0 text-amber-500" />
          <span>
            Sertifikat ini terus diperbarui secara otomatis. Selesaikan seluruh 20 Level silabus untuk meraih gelar tertinggi <strong>DJuragan Coding Grandmaster 👑</strong>!
          </span>
        </div>
      )}

    </div>
  );
};
