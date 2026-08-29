import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  BookOpen, CheckCircle2, Lock, Sparkles, ArrowRight, Play, Award,
  Clock, Shield, Star, Filter, Layers, Zap, HardDrive, Cpu, Terminal
} from 'lucide-react';
import { SyllabusLevel, StudentProgress, UserSession } from '../types';
import { SYLLABUS_DATA } from '../data/syllabus';

interface SyllabusListViewProps {
  progress: StudentProgress;
  session: UserSession;
  onSelectLevel: (levelId: number) => void;
  onOpenLoginModal: () => void;
}

export const SyllabusListView: React.FC<SyllabusListViewProps> = ({
  progress,
  session,
  onSelectLevel,
  onOpenLoginModal
}) => {
  const [selectedSemester, setSelectedSemester] = useState<0 | 1 | 2>(0); // 0 = Semua, 1 = Ganjil, 2 = Genap
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLevels = SYLLABUS_DATA.filter((lvl) => {
    if (selectedSemester !== 0 && lvl.semester !== selectedSemester) {
      return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = lvl.title.toLowerCase().includes(q);
      const matchTopic = lvl.topics.some(t => t.toLowerCase().includes(q));
      const matchCat = lvl.category.toLowerCase().includes(q);
      return matchTitle || matchTopic || matchCat;
    }
    return true;
  });

  const sem1Levels = filteredLevels.filter(l => l.semester === 1);
  const sem2Levels = filteredLevels.filter(l => l.semester === 2);

  const completedCount = progress.completedLevelIds.length;
  const progressPercent = Math.round((completedCount / 20) * 100);

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Bento Row: Hero Banner + Quick Stats Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Bento Hero Box (2 Cols) */}
        <div className="lg:col-span-2 relative rounded-3xl bg-slate-900/90 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 text-white backdrop-blur-md shadow-xl overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-indigo-500/20 border border-indigo-500/40 text-indigo-300">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Bento Learning Matrix</span>
              </span>
              <span className="text-[11px] font-mono text-slate-400">20 Level • Scratch 3.0 & AI</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
              Kurikulum Mandiri <br />
              <span className="text-amber-400 font-black">DJuragan </span>
              <span className="text-indigo-400 font-black">Coding</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              Eksplorasi 20 modul praktis coding visual Scratch: mulai dari algoritma dasar gerak, game interaktif, simulasi fisika partikel, hingga kecerdasan buatan dan game multiplayer.
            </p>
          </div>

          <div className="relative z-10 pt-6 mt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span><strong>{completedCount}</strong> dari 20 Level Selesai</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300">
              <Zap className="w-4 h-4 text-amber-400" />
              <span><strong>{progress.xp}</strong> XP Terkumpul</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300">
              <HardDrive className="w-4 h-4 text-indigo-400" />
              <span>Local Storage Device Saved</span>
            </div>
          </div>
        </div>

        {/* Bento Quick Status & Progress Box (1 Col) */}
        <div className="rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Ringkasan Belajar
              </span>
              <span className="text-xs font-black text-indigo-600 dark:text-indigo-400">
                {progressPercent}%
              </span>
            </div>

            {/* Linear Progress Bar */}
            <div className="space-y-1.5">
              <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-indigo-500"
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                <span>Start: Level 1</span>
                <span>Target: Level 20</span>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold block">Ganjil (1-10)</span>
                <span className="text-sm font-black text-slate-900 dark:text-white mt-0.5 block">
                  {progress.completedLevelIds.filter(id => id <= 10).length}/10
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold block">Genap (11-20)</span>
                <span className="text-sm font-black text-slate-900 dark:text-white mt-0.5 block">
                  {progress.completedLevelIds.filter(id => id > 10).length}/10
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 mt-4 flex items-center justify-between">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              <span>Offline Ready</span>
            </span>
            <button
              onClick={() => onSelectLevel(1)}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>Level 1 Mulai</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>

      {/* Trial Alert Card Bento (if user is in guest/trial mode) */}
      {session.role === 'guest' && (
        <div className="p-5 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/40 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Mode Akses Trial (Level 1 Terbuka)</span>
            </div>
            <p className="text-xs text-slate-300">
              Kamu dapat belajar Level 1 gratis. Masukkan kode akses dari admin (instruktur) untuk membuka seluruh 20 Level silabus!
            </p>
          </div>
          <button
            onClick={onOpenLoginModal}
            className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md flex-shrink-0 transition-all"
          >
            Masukkan Kode Akses Siswa
          </button>
        </div>
      )}

      {/* Filters and Controls Bento Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-100 dark:bg-slate-900/50 p-2 rounded-2xl border border-slate-200 dark:border-slate-800">
        
        {/* Semester Filter Tabs */}
        <div className="flex p-1 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setSelectedSemester(0)}
            className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedSemester === 0
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Semua (20 Level)
          </button>
          <button
            onClick={() => setSelectedSemester(1)}
            className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedSemester === 1
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Semester Ganjil (1-10)
          </button>
          <button
            onClick={() => setSelectedSemester(2)}
            className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedSemester === 2
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Semester Genap (11-20)
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari materi, blok, topik..."
            className="w-full sm:w-72 px-4 py-2 pl-9 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
          <Filter className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

      </div>

      {/* SEMESTER 1 (GANJIL) SECTION */}
      {(selectedSemester === 0 || selectedSemester === 1) && sem1Levels.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-5 rounded-full bg-amber-400" />
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">Semester Ganjil (Dasar & Game)</h2>
            </div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              10 Modul
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sem1Levels.map((lvl) => renderLevelCard(lvl))}
          </div>
        </div>
      )}

      {/* SEMESTER 2 (GENAP) SECTION */}
      {(selectedSemester === 0 || selectedSemester === 2) && sem2Levels.length > 0 && (
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-5 rounded-full bg-indigo-400" />
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">Semester Genap (Logika Lanjut & Simulasi)</h2>
            </div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              10 Modul
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sem2Levels.map((lvl) => renderLevelCard(lvl))}
          </div>
        </div>
      )}

    </div>
  );

  function renderLevelCard(lvl: SyllabusLevel) {
    const isCompleted = progress.completedLevelIds.includes(lvl.id);
    const isUnlocked = progress.unlockedLevelIds.includes(lvl.id) || session.role === 'admin' || lvl.id === 1;

    return (
      <motion.div
        key={lvl.id}
        whileHover={{ y: isUnlocked ? -2 : 0 }}
        className={`relative rounded-3xl border p-5 flex flex-col justify-between transition-all ${
          isCompleted
            ? 'bg-white dark:bg-slate-900/90 border-emerald-500/30 hover:border-emerald-500/50 shadow-sm'
            : isUnlocked
            ? 'bg-white dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 shadow-sm hover:shadow-md'
            : 'bg-slate-100/70 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/60 opacity-60'
        }`}
      >
        <div>
          {/* Card Header Bento */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <span className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black text-xs ${
                isCompleted
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                  : isUnlocked
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
              }`}>
                {String(lvl.id).padStart(2, '0')}
              </span>
              <div>
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                  {lvl.semester === 1 ? 'Ganjil' : 'Genap'} • Pertemuan {lvl.allocation.split(' ')[0]}
                </span>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">{lvl.category}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                +{lvl.xpReward} XP
              </span>
              {isCompleted ? (
                <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-500" title="Selesai">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              ) : !isUnlocked ? (
                <div className="p-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-400" title="Terkunci (Hubungi admin)">
                  <Lock className="w-4 h-4" />
                </div>
              ) : null}
            </div>
          </div>

          {/* Title and Summary */}
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-1.5 leading-snug">
            {lvl.title}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-3">
            {lvl.summary}
          </p>

          {/* Topics Chips */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {lvl.topics.map((t, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-medium text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 italic truncate max-w-[180px]">
            {lvl.indicator}
          </span>

          {isUnlocked ? (
            <button
              onClick={() => onSelectLevel(lvl.id)}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm ${
                isCompleted
                  ? 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/25'
              }`}
            >
              <span>{isCompleted ? 'Pelajari Ulang' : 'Mulai Belajar'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={onOpenLoginModal}
              className="px-3.5 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold text-xs flex items-center gap-1.5 hover:text-white"
            >
              <Lock className="w-3 h-3" />
              <span>Buka Kunci</span>
            </button>
          )}
        </div>
      </motion.div>
    );
  }
};
