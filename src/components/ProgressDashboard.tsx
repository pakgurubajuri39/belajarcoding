import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  Trophy, Award, Flame, CheckCircle2, Lock, Sparkles, BookOpen, Star,
  ArrowUpRight, Zap, Target, HardDrive, Clock, Activity, Calendar,
  ShieldCheck, Check, Download, FileText, Loader2, Share2, LogOut, TrendingUp
} from 'lucide-react';
import { StudentProgress, UserSession } from '../types';
import { SYLLABUS_DATA, BADGES_DATA, AVATAR_OPTIONS } from '../data/syllabus';
import { getRankFromXp, getResumeLevelId, saveSession } from '../utils/storage';
import { generateStudentProgressPDF } from '../utils/pdfReport';
import { Leaderboard } from './Leaderboard';
import { XpProgressionChart } from './XpProgressionChart';
import { AvatarSelectorModal } from './AvatarSelectorModal';

interface ProgressDashboardProps {
  progress: StudentProgress;
  session: UserSession;
  onSelectLevel: (levelId: number) => void;
  onLogout?: () => void;
  onUpdateSession?: (newSession: UserSession) => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  progress,
  session,
  onSelectLevel,
  onLogout,
  onUpdateSession
}) => {
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [avatarSuccessToast, setAvatarSuccessToast] = useState<string | null>(null);

  const handleSelectAvatar = (newAvatarId: string) => {
    const selectedObj = AVATAR_OPTIONS.find(a => a.id === newAvatarId);
    const updatedSession: UserSession = {
      ...session,
      avatar: newAvatarId
    };
    saveSession(updatedSession);
    if (onUpdateSession) {
      onUpdateSession(updatedSession);
    }
    setAvatarSuccessToast(`Avatar karakter berhasil diubah menjadi ${selectedObj?.name || 'Karakter Baru'}! ✨`);
    setTimeout(() => setAvatarSuccessToast(null), 4000);
  };

  const resumeLevelId = getResumeLevelId(progress, session.role);
  const resumeLevelObj = SYLLABUS_DATA.find(l => l.id === resumeLevelId) || SYLLABUS_DATA[0];

  const rankInfo = getRankFromXp(progress.xp);
  const avatarObj = AVATAR_OPTIONS.find(a => a.id === session.avatar) || AVATAR_OPTIONS[0];

  const totalLevels = SYLLABUS_DATA.length; // 20
  const completedCount = progress.completedLevelIds.length;
  const completionPercentage = Math.round((completedCount / totalLevels) * 100);

  // Semester real calculation
  const sem1Completed = progress.completedLevelIds.filter(id => id <= 10).length;
  const sem2Completed = progress.completedLevelIds.filter(id => id > 10).length;

  // Real Chart 1: Semester Completion
  const semesterChartData = [
    { name: 'Semester Ganjil (Lvl 1-10)', selesai: sem1Completed, target: 10, total: 10 },
    { name: 'Semester Genap (Lvl 11-20)', selesai: sem2Completed, target: 10, total: 10 }
  ];

  // Real Level-by-Level XP Distribution Chart
  const realLevelXpData = SYLLABUS_DATA.map(lvl => {
    const isCompleted = progress.completedLevelIds.includes(lvl.id);
    const score = progress.levelScores[lvl.id] || (isCompleted ? 100 : 0);
    return {
      level: `Lvl ${lvl.id}`,
      name: lvl.title,
      xp: isCompleted ? lvl.xpReward : 0,
      targetXp: lvl.xpReward,
      score: score,
      status: isCompleted ? 'Selesai' : 'Belum Selesai'
    };
  });

  // Real Category Breakdown
  const categories = ['Foundation', 'Motion & Loop', 'Game Dev', 'Looks & Art', 'Input & Sensing', 'Math & Logic', 'Simulation', 'Creative Arts'];
  const categoryData = categories.map(cat => {
    const totalInCat = SYLLABUS_DATA.filter(l => l.category === cat).length;
    const completedInCat = SYLLABUS_DATA.filter(l => l.category === cat && progress.completedLevelIds.includes(l.id)).length;
    return {
      name: cat,
      selesai: completedInCat,
      total: totalInCat,
      percent: totalInCat > 0 ? Math.round((completedInCat / totalInCat) * 100) : 0
    };
  }).filter(c => c.total > 0);

  // Real Average Quiz Score
  const scoredLevels = Object.keys(progress.levelScores);
  const averageQuizScore = scoredLevels.length > 0
    ? Math.round(scoredLevels.reduce((sum, id) => sum + (progress.levelScores[Number(id)] || 0), 0) / scoredLevels.length)
    : (completedCount > 0 ? 100 : 0);

  const COLORS = ['#6366f1', '#3b82f6', '#06b6d4', '#f59e0b', '#ec4899', '#10b981', '#8b5cf6', '#14b8a6'];

  const handleDownloadReport = () => {
    setIsDownloadingPdf(true);
    try {
      generateStudentProgressPDF(progress, session);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Toast Notification when Avatar or Profile updates */}
      {avatarSuccessToast && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold shadow-2xl border-2 border-amber-400 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center text-base">
            ✨
          </div>
          <div>
            <div className="text-amber-300 font-extrabold text-[11px] uppercase tracking-wider">Pembaruan Avatar</div>
            <div>{avatarSuccessToast}</div>
          </div>
        </div>
      )}

      {/* Top Banner Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 rounded-3xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              Laporan Evaluasi & Progres Belajar Siswa
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Unduh lembar dokumen resmi berformat PDF berisi rekapitulasi XP, 20 level silabus, dan trofi lencana.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleDownloadReport}
          disabled={isDownloadingPdf}
          className={`w-full sm:w-auto px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all transform active:scale-95 flex-shrink-0 ${
            downloadSuccess
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
              : 'bg-gradient-to-r from-amber-400 via-orange-500 to-indigo-600 hover:from-amber-300 hover:to-indigo-500 text-slate-950 font-black shadow-amber-500/20'
          }`}
          id="btn-download-progress-pdf"
        >
          {isDownloadingPdf ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
              <span>Membuat Dokumen PDF...</span>
            </>
          ) : downloadSuccess ? (
            <>
              <Check className="w-4 h-4 text-white" />
              <span>Laporan Berhasil Diunduh! ✓</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4 text-slate-950" />
              <span>Unduh Laporan Progres (PDF)</span>
            </>
          )}
        </button>
      </div>

      {/* Top Bento Row: Profile Hero + Real Stats Bento + Storage Status Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Bento Box 1: Student Profile & Main Stats (7 Cols) */}
        <div className="lg:col-span-7 relative rounded-3xl bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 text-white backdrop-blur-md shadow-xl overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="flex items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Interactive Student Avatar with Change Trigger */}
                <div className="relative group">
                  <button
                    type="button"
                    onClick={() => setIsAvatarModalOpen(true)}
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr ${avatarObj.color || 'from-amber-400 to-indigo-600'} flex items-center justify-center text-3xl sm:text-4xl shadow-lg shadow-indigo-500/20 flex-shrink-0 border-2 border-white/30 hover:scale-105 active:scale-95 transition-all cursor-pointer relative group`}
                    title="Klik untuk memilih atau mengganti karakter avatar kodingmu"
                    id="btn-change-avatar-icon"
                  >
                    <span>{avatarObj.emoji}</span>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-md border-2 border-slate-900 group-hover:scale-110 group-hover:rotate-12 transition-all" title="Ganti Karakter">
                      <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                    </div>
                  </button>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-black tracking-tight">{session.studentName}</h1>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-amber-400/20 border border-amber-400/40 text-amber-300">
                      {rankInfo.title}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    Peringkat Level {rankInfo.level} • {session.role === 'admin' ? 'Akses Instruktur Penuh' : session.role === 'student' ? 'Siswa Aktif Sobat Koding' : 'Pengguna Uji Coba (Trial)'}
                  </p>

                  {/* Quick Badge & Change Avatar Button */}
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/10 border border-white/15 text-xs text-slate-200">
                      <span className="text-sm">{avatarObj.emoji}</span>
                      <span className="font-bold text-amber-300">{avatarObj.name}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsAvatarModalOpen(true)}
                      className="px-3 py-1 rounded-xl text-xs font-black bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-sm transition-all transform active:scale-95 flex items-center gap-1.5 cursor-pointer"
                      id="btn-open-avatar-selector"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Ganti Avatar</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Quick Scroll to XP Trend Chart */}
                <button
                  onClick={() => {
                    const el = document.getElementById('section-xp-trend-chart');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  title="Lihat Grafik Tren Perolehan XP Siswa"
                  className="p-2.5 rounded-2xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/30 transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                  id="btn-quick-jump-xptrend"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span className="hidden sm:inline">Tren XP</span>
                </button>

                {/* Quick Scroll to Leaderboard */}
                <button
                  onClick={() => {
                    const el = document.getElementById('section-global-leaderboard');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  title="Lihat Papan Peringkat / Leaderboard XP"
                  className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10 transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                  id="btn-quick-jump-leaderboard"
                >
                  <Trophy className="w-4 h-4" />
                  <span className="hidden sm:inline">Peringkat</span>
                </button>

                {/* PDF Quick Download Icon Button */}
                <button
                  onClick={handleDownloadReport}
                  title="Cetak/Unduh Laporan PDF"
                  className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-amber-300 border border-white/10 transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">PDF</span>
                </button>

                {/* Logout / Keluar Button */}
                {onLogout && (
                  <button
                    onClick={onLogout}
                    title="Keluar / Logout Akun (Kembali ke Halaman Masuk)"
                    className="p-2.5 rounded-2xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 transition-all flex items-center gap-1.5 text-xs font-bold"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Keluar</span>
                  </button>
                )}
              </div>
            </div>

            {/* Quick Metrics Bento 3-column with REAL Data */}
            <div className="grid grid-cols-3 gap-3">
              <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                <div className="flex items-center justify-center gap-1 text-amber-400 text-xs font-bold mb-0.5">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Total Real XP</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-white">{progress.xp.toLocaleString()}</div>
              </div>

              <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                <div className="flex items-center justify-center gap-1 text-indigo-400 text-xs font-bold mb-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Level Selesai</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-white">{completedCount}/20</div>
              </div>

              <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                <div className="flex items-center justify-center gap-1 text-emerald-400 text-xs font-bold mb-0.5">
                  <Award className="w-3.5 h-3.5" />
                  <span>Lencana</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-white">{progress.unlockedBadges.length}</div>
              </div>
            </div>

            {/* Level XP Progress Bar */}
            <div className="pt-2">
              <div className="flex justify-between items-center text-xs font-medium mb-2">
                <span className="text-slate-300">Kemajuan ke Pangkat Berikutnya</span>
                <span className="text-amber-300 font-bold">{progress.xp} / {rankInfo.nextLevelXp} XP</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden p-0.5 border border-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${rankInfo.progressPercent}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bento Box 2: Real Student Summary & Local Device Sync (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-5">
          
          {/* Real Learning Performance Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex-1 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-500" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  Data Belajar Siswa (Real-Time)
                </span>
              </div>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                {completionPercentage}% Selesai
              </span>
            </div>

            {/* Real Stats Breakdown List */}
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <span className="text-slate-600 dark:text-slate-400">Rata-Rata Nilai Kuis:</span>
                <span className="font-black text-slate-900 dark:text-white">{averageQuizScore}%</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <span className="text-slate-600 dark:text-slate-400">Modul Belum Selesai:</span>
                <span className="font-black text-amber-500">{totalLevels - completedCount} Modul</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <span className="text-slate-600 dark:text-slate-400">Status Kelulusan Ekstrakurikuler:</span>
                <span className={`font-black ${completedCount === 20 ? 'text-emerald-500' : 'text-indigo-500'}`}>
                  {completedCount === 20 ? 'Lulus Sempurna 🎉' : 'Dalam Pembelajaran'}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
              <span>Login Terakhir:</span>
              <span className="font-mono text-slate-700 dark:text-slate-300">
                {new Date(session.loginDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>
          </div>

          {/* Local Storage Device & Active Session Bento */}
          <div className="p-5 rounded-3xl bg-slate-900 border border-indigo-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-white shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-400 flex-shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-white">Sesi Belajar: Level #{resumeLevelId}</h4>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400 text-slate-950">
                    Aktif
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 line-clamp-1">{resumeLevelObj.title}</p>
              </div>
            </div>
            <button
              onClick={() => onSelectLevel(resumeLevelId)}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-md flex-shrink-0 cursor-pointer"
            >
              <span>Lanjut Belajar</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

      {/* Recharts XP Progression Trend Chart */}
      <XpProgressionChart
        progress={progress}
        session={session}
        onSelectLevel={onSelectLevel}
      />

      {/* Global & Classroom XP Leaderboard */}
      <Leaderboard
        currentProgress={progress}
        session={session}
        onSelectLevel={onSelectLevel}
      />

      {/* Real XP per Level Distribution Chart */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Grafik Perolehan Real XP per Level (1 - 20)</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Visualisasi XP yang sudah berhasil diklaim dari setiap modul</p>
          </div>
          <div className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold">
            Total {progress.xp} XP Dikumpulkan
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={realLevelXpData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <XAxis dataKey="level" stroke="#94a3b8" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={40} />
              <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                formatter={(value: any) => [`${value} XP`, 'XP Diraih']}
                labelFormatter={(label: any) => `${label}`}
              />
              <Bar dataKey="xp" fill="#f59e0b" radius={[6, 6, 0, 0]} name="XP Diperoleh" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Visual Analytics Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Graph 1: Semester Completion Bar Chart */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Progres Belajar per Semester</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Penyelesaian 10 modul Ganjil vs 10 modul Genap</p>
            </div>
            <div className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
              {completionPercentage}% Selesai
            </div>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={semesterChartData} layout="vertical" margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
                <XAxis type="number" domain={[0, 10]} stroke="#94a3b8" />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" width={150} tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                  formatter={(value: any) => [`${value} dari 10 Level`, 'Terselesaikan']}
                />
                <Bar dataKey="selesai" fill="#6366f1" radius={[0, 8, 8, 0]} name="Level Selesai" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Graph 2: Category Mastery */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Penguasaan Kategori Silabus</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Cakupan kompetensi algoritma, game, dan seni visual</p>
            </div>
            <div className="p-1.5 rounded-xl bg-amber-500/10 text-amber-500">
              <Target className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-3 pt-1">
            {categoryData.map((cat, idx) => (
              <div key={cat.name} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">{cat.name}</span>
                  <span className="text-slate-500 dark:text-slate-400 font-mono">
                    {cat.selesai}/{cat.total} ({cat.percent}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${cat.percent}%`,
                      backgroundColor: COLORS[idx % COLORS.length]
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Badges and Achievements Bento */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Lencana & Prestasi Siswa</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Koleksi trofi penghargaan yang berhasil diraih</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold">
            {progress.unlockedBadges.length} dari {BADGES_DATA.length} Diraih
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BADGES_DATA.map((badge) => {
            const isUnlocked = progress.unlockedBadges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isUnlocked
                    ? 'bg-gradient-to-b from-amber-500/10 to-indigo-500/5 border-amber-500/30 text-slate-900 dark:text-white shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800/80 text-slate-400 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                      isUnlocked
                        ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                    }`}
                  >
                    {isUnlocked ? '🏆' : <Lock className="w-4 h-4" />}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold">{badge.name}</h3>
                    <span className="text-[10px] text-amber-500 font-semibold">{badge.category}</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                  {badge.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* All 20 Levels Quick Status Matrix Bento */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Matriks 20 Level Silabus Scratch</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Klik pada level untuk langsung belajar atau mengulang materi</p>
          </div>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">20 MODUL</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {SYLLABUS_DATA.map((lvl) => {
            const isCompleted = progress.completedLevelIds.includes(lvl.id);
            const isUnlocked = progress.unlockedLevelIds.includes(lvl.id) || session.role === 'admin' || lvl.id === 1;

            return (
              <button
                key={lvl.id}
                onClick={() => isUnlocked && onSelectLevel(lvl.id)}
                disabled={!isUnlocked}
                className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                  isCompleted
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-300 hover:scale-105'
                    : isUnlocked
                    ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-900 dark:text-indigo-300 hover:scale-105 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400 cursor-not-allowed opacity-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider font-mono">
                    #{String(lvl.id).padStart(2, '0')}
                  </span>
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : isUnlocked ? (
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </div>
                <div className="text-xs font-bold truncate">{lvl.title}</div>
                <div className="mt-2 text-[10px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                  <span>+{lvl.xpReward} XP</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Avatar Selection Modal */}
      <AvatarSelectorModal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        currentAvatarId={session.avatar || 'bot_neon'}
        studentName={session.studentName}
        onSelectAvatar={handleSelectAvatar}
      />

    </div>
  );
};
