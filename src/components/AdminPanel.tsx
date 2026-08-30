import React, { useState } from 'react';
import { Shield, Unlock, Lock, RefreshCw, KeyRound, CheckCircle2, Download, Upload, Award, BookOpen, AlertTriangle, UserCheck, Sparkles, LogOut } from 'lucide-react';
import { StudentProgress, UserSession } from '../types';
import { SYLLABUS_DATA } from '../data/syllabus';
import { clearAllLocalData, saveProgress } from '../utils/storage';

interface AdminPanelProps {
  progress: StudentProgress;
  session: UserSession;
  onUpdateProgress: (newProgress: StudentProgress) => void;
  onUpdateSession: (newSession: UserSession) => void;
  onLogout?: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  progress,
  session,
  onUpdateProgress,
  onUpdateSession,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'control' | 'answers' | 'data'>('control');
  const [successMessage, setSuccessMessage] = useState('');

  const showNotification = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Unlock all 20 levels
  const handleUnlockAll = () => {
    const allIds = SYLLABUS_DATA.map(l => l.id);
    const updated: StudentProgress = {
      ...progress,
      unlockedLevelIds: allIds
    };
    onUpdateProgress(updated);
    showNotification('Berhasil membuka kunci seluruh 20 Level silabus!');
  };

  // Complete all 20 levels
  const handleCompleteAll = () => {
    const allIds = SYLLABUS_DATA.map(l => l.id);
    const updated: StudentProgress = {
      ...progress,
      unlockedLevelIds: allIds,
      completedLevelIds: allIds,
      xp: 5200,
      unlockedBadges: ['first_step', 'loop_master', 'game_creator', 'creative_artist', 'logic_champion', 'semester_1_complete', 'semester_2_complete', 'grandmaster']
    };
    onUpdateProgress(updated);
    showNotification('Seluruh 20 Level berhasil ditandai selesai dengan 5200 XP & semua lencana!');
  };

  // Reset Progress
  const handleResetProgress = () => {
    if (window.confirm('Apakah Anda yakin ingin mereset seluruh progres belajar siswa? Data XP dan penyelesaian level akan kembali ke awal.')) {
      clearAllLocalData();
      const resetProgress: StudentProgress = {
        unlockedLevelIds: [1],
        completedLevelIds: [],
        levelScores: {},
        xp: 0,
        streakDays: 1,
        lastActiveDate: new Date().toISOString().split('T')[0],
        completedQuizzes: {},
        notes: {},
        unlockedBadges: []
      };
      onUpdateProgress(resetProgress);
      showNotification('Progres belajar telah direset ke kondisi awal.');
    }
  };

  // Export JSON Backup
  const handleExportData = () => {
    const exportObj = {
      progress,
      session,
      exportedAt: new Date().toISOString(),
      appName: 'DJuragan Coding'
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `djuragan_coding_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showNotification('Data backup berhasil diunduh ke komputer!');
  };

  // Import JSON Backup
  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed.progress) {
            onUpdateProgress(parsed.progress);
            if (parsed.session) onUpdateSession(parsed.session);
            showNotification('Data berhasil dipulihkan dari file backup!');
          }
        } catch {
          alert('File backup tidak valid.');
        }
      };
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      
      {/* Admin Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-purple-500/40 p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-purple-600/30">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black">Panel Admin & Instruktur DJuragan</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-slate-950">
                  Akses Penuh
                </span>
              </div>
              <p className="text-xs sm:text-sm text-purple-200 mt-0.5">
                Pengelolaan silabus, status kunci level siswa, kunci jawaban kuis, dan backup lokal.
              </p>
            </div>
          </div>

          {onLogout && (
            <button
              onClick={onLogout}
              className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 hover:text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-md"
              title="Keluar dari mode Admin dan kembali ke Halaman Masuk"
            >
              <LogOut className="w-4 h-4" />
              <span>Keluar dari Admin</span>
            </button>
          )}
        </div>

        {/* Notification Toast */}
        {successMessage && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{successMessage}</span>
          </div>
        )}
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('control')}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'control'
              ? 'bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Unlock className="w-4 h-4" />
          <span>Kontrol Akses & Kunci Level</span>
        </button>

        <button
          onClick={() => setActiveTab('answers')}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'answers'
              ? 'bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Kunci Jawaban & Panduan Guru</span>
        </button>

        <button
          onClick={() => setActiveTab('data')}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'data'
              ? 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Download className="w-4 h-4" />
          <span>Cadangkan & Pulihkan Data</span>
        </button>
      </div>

      {/* TAB 1: Level Controls */}
      {activeTab === 'control' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Unlock className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Buka Semua 20 Level</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Membuka kunci seluruh level agar siswa dapat langsung mengakses materi manapun.
              </p>
              <button
                onClick={handleUnlockAll}
                className="w-full py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-sm transition-all"
              >
                Buka Kunci Sekarang
              </button>
            </div>

            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Selesaikan Semua (+XP)</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tandai semua 20 level selesai, beri +5200 XP dan semua 8 lencana kelulusan.
              </p>
              <button
                onClick={handleCompleteAll}
                className="w-full py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-sm transition-all"
              >
                Selesaikan Semua Level
              </button>
            </div>

            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Reset Progres Siswa</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Mereset data lokal kembali ke kondisi awal (hanya level 1 terbuka, 0 XP).
              </p>
              <button
                onClick={handleResetProgress}
                className="w-full py-2 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-bold text-xs border border-rose-500/30 transition-all"
              >
                Reset Progres
              </button>
            </div>

          </div>

          {/* Access Code Reference Table */}
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-amber-500" />
              <span>Daftar Kode Akses Resmi</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
                <span className="font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider text-[10px]">
                  Kode Siswa (Full Access):
                </span>
                <div className="text-base font-mono font-bold text-slate-900 dark:text-white bg-slate-200 dark:bg-slate-950 p-2 rounded-xl border border-slate-300 dark:border-slate-800">
                  djuragan39
                </div>
                <p className="text-slate-500 dark:text-slate-400">
                  Berikan kode ini kepada siswa setelah terdaftar di kelas ekstrakurikuler.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
                <span className="font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider text-[10px]">
                  Password Admin (Instruktur):
                </span>
                <div className="text-base font-mono font-bold text-slate-900 dark:text-white bg-slate-200 dark:bg-slate-950 p-2 rounded-xl border border-slate-300 dark:border-slate-800">
                  bajuri39
                </div>
                <p className="text-slate-500 dark:text-slate-400">
                  Digunakan oleh instruktur untuk mengontrol materi, kuis, dan sertifikat.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Quiz Answer Keys for Instructor */}
      {activeTab === 'answers' && (
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Kunci Jawaban Kuis 20 Level Silabus</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Panduan instruktur untuk memeriksa pemahaman siswa</p>
          </div>

          <div className="space-y-4">
            {SYLLABUS_DATA.map((lvl) => (
              <div key={lvl.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-slate-900 dark:text-white">
                    Level {lvl.id}: {lvl.title} ({lvl.semester === 1 ? 'Ganjil' : 'Genap'} #{lvl.semesterLevel})
                  </span>
                  <span className="text-amber-500 font-semibold">{lvl.allocation}</span>
                </div>

                <div className="space-y-2 pt-1">
                  {lvl.quizQuestions.map((q, qIdx) => (
                    <div key={qIdx} className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60">
                      <p className="font-semibold text-slate-800 dark:text-slate-200 mb-1">
                        {qIdx + 1}. {q.question}
                      </p>
                      <p className="text-emerald-600 dark:text-emerald-400 font-bold">
                        ✓ Kunci Jawaban: {q.options[q.correctAnswerIndex]}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {q.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Data Backup & Restore */}
      {activeTab === 'data' && (
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Cadangkan & Pulihkan Progres Lokal</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Simpan berkas JSON progres siswa agar bisa dipindahkan ke perangkat laptop/tablet lain.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl border border-dashed border-cyan-500/50 bg-cyan-500/5 text-center space-y-3">
              <Download className="w-8 h-8 text-cyan-500 mx-auto" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Unduh Backup Data (JSON)</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ekspor seluruh data XP, level selesai, dan lencana ke berkas file.
              </p>
              <button
                onClick={handleExportData}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-xs transition-all shadow-md"
              >
                Unduh Berkas JSON
              </button>
            </div>

            <div className="p-6 rounded-2xl border border-dashed border-purple-500/50 bg-purple-500/5 text-center space-y-3">
              <Upload className="w-8 h-8 text-purple-500 mx-auto" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Pulihkan dari File Backup</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Unggah file JSON backup untuk memulihkan progres di perangkat ini.
              </p>
              <label className="inline-block px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all cursor-pointer shadow-md">
                Pilih Berkas JSON
                <input type="file" accept=".json" onChange={handleImportData} className="hidden" />
              </label>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
