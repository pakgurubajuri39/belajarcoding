import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  ExternalLink, 
  Search, 
  BookOpen, 
  Video, 
  FolderDown, 
  Sparkles, 
  Layers, 
  Check, 
  Copy, 
  ArrowRight,
  Filter,
  GraduationCap,
  Lock,
  Unlock,
  CheckCircle2,
  ShieldCheck,
  Award,
  Zap,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ALL_LEARNING_MATERIALS } from '../data/learningMaterials';
import { LearningResource, StudentProgress, UserSession } from '../types';
import { toggleMaterialCompleted, recordXpGain, saveProgress } from '../utils/storage';

interface MaterialsViewProps {
  session: UserSession;
  progress: StudentProgress;
  onUpdateProgress: (newProgress: StudentProgress) => void;
  onSelectLevel?: (levelId: number) => void;
  onOpenLoginModal?: () => void;
}

const CATEGORIES = [
  'Semua',
  'Modul Inti Silabus',
  'Modul Pendukung Silabus',
  'Lembar Kerja & Worksheet',
  'Video & Tutorial Interaktif',
  'Video & Unplugged Coding',
  'AI & Inovasi Coding'
];

type StatusFilter = 'all' | 'unlocked' | 'completed' | 'locked';

export const MaterialsView: React.FC<MaterialsViewProps> = ({
  session,
  progress,
  onUpdateProgress,
  onSelectLevel,
  onOpenLoginModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  const isAdmin = session.role === 'admin';
  const isTrial = session.role === 'trial' || session.role === 'guest';
  const completedIds = progress.completedMaterialIds || [];
  const completedLevels = progress.completedLevelIds || [];

  // Helper to determine if a material is unlocked
  const checkIsUnlocked = (item: LearningResource, index: number): boolean => {
    // 1. Admin SELALU BEBAS AKSES ke seluruh materi tanpa terkunci
    if (isAdmin) return true;

    // 2. Akun TRIAL HANYA MEMBUKA materi "Mengenal Bagian Scratch" (ID 1)
    if (isTrial) {
      return item.id === 1;
    }

    // 3. Materi pertama selalu terbuka untuk siswa
    if (index === 0 || item.id === ALL_LEARNING_MATERIALS[0]?.id) return true;

    // 4. Jika materi sebelumnya dalam daftar sudah ditandai selesai
    const prevItem = ALL_LEARNING_MATERIALS[index - 1];
    if (prevItem && completedIds.includes(prevItem.id)) return true;

    // 5. Jika level terkait sudah diselesaikan siswa dalam silabus
    if (item.targetLevelId && completedLevels.includes(item.targetLevelId)) return true;

    return false;
  };

  // Pre-calculate unlock status for all materials sequentially
  const materialUnlockMap = useMemo(() => {
    const map = new Map<number, boolean>();
    let prevWasCompleted = true; // First item is always unlocked

    ALL_LEARNING_MATERIALS.forEach((item, index) => {
      if (isAdmin) {
        map.set(item.id, true);
        return;
      }

      // Akun trial hanya membuka materi "Mengenal Bagian Menu Scratch" (ID 1)
      if (isTrial) {
        map.set(item.id, item.id === 1);
        return;
      }

      if (index === 0) {
        map.set(item.id, true);
        prevWasCompleted = completedIds.includes(item.id);
      } else {
        const isLevelDone = item.targetLevelId ? completedLevels.includes(item.targetLevelId) : false;
        const unlocked = prevWasCompleted || isLevelDone;
        map.set(item.id, unlocked);
        // For next item in strict sequence
        prevWasCompleted = completedIds.includes(item.id);
      }
    });

    return map;
  }, [isAdmin, isTrial, completedIds, completedLevels]);

  const filteredMaterials = useMemo(() => {
    return ALL_LEARNING_MATERIALS.filter((item, index) => {
      const isUnlocked = materialUnlockMap.get(item.id) ?? false;
      const isCompleted = completedIds.includes(item.id);

      // Search filter
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.targetLevelId && `level ${item.targetLevelId}`.includes(searchQuery.toLowerCase()));
      
      // Category filter
      const matchesCategory = 
        selectedCategory === 'Semua' || item.category === selectedCategory;

      // Status filter
      let matchesStatus = true;
      if (statusFilter === 'unlocked') {
        matchesStatus = isUnlocked;
      } else if (statusFilter === 'completed') {
        matchesStatus = isCompleted;
      } else if (statusFilter === 'locked') {
        matchesStatus = !isUnlocked;
      }

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchQuery, selectedCategory, statusFilter, materialUnlockMap, completedIds]);

  const handleCopyLink = (url: string, id: number) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleToggleCompleted = (item: LearningResource, index: number) => {
    const isUnlocked = materialUnlockMap.get(item.id) ?? false;
    if (!isUnlocked && !isAdmin) {
      if (isTrial) {
        setNotificationMsg("Akun trial hanya dapat membuka materi 'Mengenal Bagian Menu Scratch'. Masukkan kode akses untuk membuka materi lainnya.");
        if (onOpenLoginModal) onOpenLoginModal();
      }
      return;
    }

    const { updatedProgress, isNowCompleted, xpGained } = toggleMaterialCompleted(
      item.id,
      progress,
      item.title
    );

    onUpdateProgress(updatedProgress);

    if (isNowCompleted) {
      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch {
        // ignore
      }

      setNotificationMsg(`Materi #${item.id} berhasil ditandai selesai! (+${xpGained} XP) Materi berikutnya terbuka.`);
    } else {
      setNotificationMsg(`Tanda selesai materi #${item.id} telah dibatalkan.`);
    }

    setTimeout(() => {
      setNotificationMsg(null);
    }, 4500);
  };

  const totalMaterials = ALL_LEARNING_MATERIALS.length;
  const completedCount = completedIds.length;
  const progressPercent = Math.round((completedCount / totalMaterials) * 100);

  return (
    <div className="space-y-6 pb-20 max-w-full overflow-hidden">
      
      {/* Toast Notification */}
      {notificationMsg && (
        <div className="fixed bottom-6 right-4 sm:right-8 z-50 max-w-md bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-3 rounded-2xl shadow-2xl border border-amber-400/50 flex items-center gap-3 animate-bounce">
          <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0" />
          <p className="text-xs sm:text-sm font-semibold">{notificationMsg}</p>
        </div>
      )}

      {/* Header Bento Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 p-5 sm:p-8 text-white shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20">
              <FolderDown className="w-3.5 h-3.5" />
              <span>REPOSITORI MATERI RESMI</span>
            </div>

            {isAdmin ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 border border-emerald-400/40 text-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Mode Instruktur: Bebas Akses Seluruh Materi (Tanpa Terkunci)</span>
              </div>
            ) : isTrial ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-400/20 border border-amber-400/40 text-amber-300">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Akun Trial: Khusus Modul #01 Mengenal Bagian Scratch</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 border border-indigo-500/40 text-indigo-300">
                <Lock className="w-3 h-3 text-amber-400" />
                <span>Akses Siswa Berjenjang (Materi Terbuka Bertahap)</span>
              </div>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
            Modul & Bahan Pembelajaran Scratch 3.0
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            {isAdmin 
              ? 'Selamat datang Pak GuruAI (Admin)! Anda memiliki akses penuh tanpa kunci ke seluruh 54 materi kurikulum, lembar kerja, dan video untuk meninjau dan membimbing siswa.' 
              : isTrial
              ? 'Anda menggunakan Akun Uji Coba (Trial). Akses materi dibatasi hanya untuk Modul #01: Mengenal Bagian Menu Scratch. Seluruh 53 modul lainnya terkunci untuk Siswa Resmi terdaftar.'
              : 'Materi pembelajaran dibuka secara berjenjang. Selesaikan dan tandai selesai setiap materi untuk membuka modul pembelajaran berikutnya serta raih +50 XP di setiap materi!'}
          </p>

          {/* Student Progress Bar (Sequential Unlock Progress) */}
          <div className="pt-2">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5 text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Progres Belajar Materi Mandiri: <strong>{completedCount}</strong> dari {totalMaterials} Materi Selesai</span>
              </span>
              <span className="text-amber-400 font-mono font-black">{progressPercent}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/80">
              <div 
                className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.max(4, progressPercent)}%` }}
              />
            </div>
          </div>

          {/* Quick Stats Grid - Fully Responsive */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-[10px] uppercase font-bold text-amber-300 block">Total Dokumen</span>
              <span className="text-lg sm:text-xl font-black text-white">54 Modul</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-[10px] uppercase font-bold text-emerald-300 block">Materi Selesai</span>
              <span className="text-lg sm:text-xl font-black text-emerald-400">{completedCount} Selesai</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-[10px] uppercase font-bold text-indigo-300 block">XP Diperoleh</span>
              <span className="text-lg sm:text-xl font-black text-amber-400">+{completedCount * 50} XP</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-[10px] uppercase font-bold text-cyan-300 block">Status Akses</span>
              <span className="text-xs sm:text-sm font-black text-cyan-200">
                {isAdmin ? 'Semua Terbuka' : isTrial ? '1 Terbuka (53 Trial Locked)' : `${totalMaterials - completedCount} Menanti`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Trial Alert Notification Banner in Materials */}
      {isTrial && (
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-amber-500/50 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Akses Terbatas Trial: Hanya Modul #01 'Mengenal Bagian Menu Scratch'</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
              Akun uji coba gratis hanya dapat membuka modul <strong>#01: Mengenal Bagian Menu Scratch</strong>. Untuk membuka 53 modul lainnya (Level 2-20, Worksheet, Video Tutorial & AI Studio), silakan masukkan kode akses atau daftar sebagai siswa resmi.
            </p>
          </div>
          {onOpenLoginModal && (
            <button
              onClick={onOpenLoginModal}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md shadow-amber-400/20 flex-shrink-0 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Buka Seluruh Materi (Kode Akses)</span>
            </button>
          )}
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="space-y-3 bg-slate-100 dark:bg-slate-900/50 p-3 sm:p-4 rounded-3xl border border-slate-200 dark:border-slate-800">
        
        {/* Search and Status Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari modul, topik, atau kata kunci (contoh: Bus Street, Paint, Variabel, Worksheet)..."
              className="w-full pl-11 pr-14 py-2.5 sm:py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-2 py-1 rounded"
              >
                Hapus
              </button>
            )}
          </div>

          {/* Status Quick Filter (Semua / Terbuka / Selesai / Terkunci) */}
          <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-x-auto text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                statusFilter === 'all'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Semua (54)
            </button>
            {!isAdmin && (
              <>
                <button
                  onClick={() => setStatusFilter('unlocked')}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                    statusFilter === 'unlocked'
                      ? 'bg-amber-400 text-slate-950 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Terbuka
                </button>
                <button
                  onClick={() => setStatusFilter('completed')}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                    statusFilter === 'completed'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Selesai ({completedCount})
                </button>
                <button
                  onClick={() => setStatusFilter('locked')}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                    statusFilter === 'locked'
                      ? 'bg-slate-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Terkunci
                </button>
              </>
            )}
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 px-2 py-1 font-semibold flex-shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Kategori:</span>
          </div>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Material Count and Helper Note */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 text-xs text-slate-500 dark:text-slate-400 gap-1">
        <span>Menampilkan <strong>{filteredMaterials.length}</strong> dari 54 materi kurikulum</span>
        <span className="italic">
          {isAdmin 
            ? 'Mode Admin: Semua link Google Drive dan Video terbuka tanpa syarat'
            : 'Tandai selesai untuk membuka materi berikutnya & raih XP'}
        </span>
      </div>

      {/* Materials Grid - Responsive 1 col (mobile) / 2 cols (tablet) / 3 cols (desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMaterials.map((item) => {
          const indexInAll = ALL_LEARNING_MATERIALS.findIndex(m => m.id === item.id);
          const isUnlocked = materialUnlockMap.get(item.id) ?? false;
          const isCompleted = completedIds.includes(item.id);

          const isDrive = item.type === 'drive' || item.type === 'pdf';
          const isVideo = item.type === 'youtube' || item.type === 'video';
          const isWorksheet = item.type === 'worksheet';

          // Previous material info for locked guidance
          const prevItem = indexInAll > 0 ? ALL_LEARNING_MATERIALS[indexInAll - 1] : null;

          return (
            <div
              key={item.id}
              className={`rounded-3xl border p-5 flex flex-col justify-between transition-all relative overflow-hidden ${
                !isUnlocked
                  ? 'bg-slate-100/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/60 opacity-75'
                  : isCompleted
                  ? 'bg-white dark:bg-slate-900 border-emerald-500/30 hover:border-emerald-500/60 shadow-sm'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 hover:shadow-lg'
              }`}
            >
              {/* Locked Watermark / Banner if not unlocked */}
              {!isUnlocked && (
                <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold">
                  <Lock className="w-3 h-3" />
                  <span>Terkunci</span>
                </div>
              )}

              <div className="space-y-3">
                
                {/* Card Top Meta */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono font-black text-xs border ${
                      !isUnlocked 
                        ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 border-slate-300 dark:border-slate-700'
                        : isCompleted
                        ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-black'
                        : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20'
                    }`}>
                      #{String(item.id).padStart(2, '0')}
                    </span>

                    <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${
                      isVideo
                        ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                        : isWorksheet
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                        : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20'
                    }`}>
                      {item.type === 'youtube' ? 'Video YouTube' : item.type === 'pdf' ? 'Dokumen PDF' : item.type === 'worksheet' ? 'Lembar Kerja' : 'Google Drive'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    {isAdmin && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-0.5">
                        <Unlock className="w-2.5 h-2.5" />
                        <span>Admin</span>
                      </span>
                    )}

                    {isCompleted && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-500 text-white shadow-xs flex items-center gap-1">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                        <span>Selesai</span>
                      </span>
                    )}

                    {item.targetLevelId && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-400/15 text-amber-600 dark:text-amber-400 border border-amber-400/30">
                        Level {item.targetLevelId}
                      </span>
                    )}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h3 className={`text-sm sm:text-base font-black leading-snug ${
                    !isUnlocked ? 'text-slate-500 dark:text-slate-400' : 'text-slate-900 dark:text-white'
                  }`}>
                    {item.title}
                  </h3>
                  <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5 block">
                    {item.category}
                  </span>
                </div>

                {/* Description */}
                {item.description && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                )}

                {/* Locked Guidance Note for Student */}
                {!isUnlocked && (
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-700 dark:text-amber-300 flex items-start gap-2">
                    <Lock className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-amber-500" />
                    <div className="space-y-1">
                      <span>
                        {isTrial
                          ? 'Terkunci (Akun Trial): Modul ini khusus Siswa Resmi. Akun trial hanya dapat membuka materi Mengenal Bagian Menu Scratch.'
                          : prevItem
                          ? `Terkunci: Selesaikan dan tandai selesai materi #${prevItem.id} (${prevItem.title}) untuk membuka modul ini.`
                          : 'Terkunci: Selesaikan materi sebelumnya terlebih dahulu.'}
                      </span>
                      {isTrial && onOpenLoginModal && (
                        <div>
                          <button
                            type="button"
                            onClick={onOpenLoginModal}
                            className="font-bold text-indigo-600 dark:text-amber-400 hover:underline cursor-pointer text-[10px]"
                          >
                            Masukkan kode akses siswa resmi &rarr;
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons & Sequential Toggle */}
              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
                
                {/* Student Mark Complete Button */}
                <button
                  onClick={() => handleToggleCompleted(item, indexInAll)}
                  disabled={!isUnlocked && !isAdmin}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    !isUnlocked && !isAdmin
                      ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed border border-transparent'
                      : isCompleted
                      ? 'bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700 shadow-xs'
                      : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-sm hover:shadow-md'
                  }`}
                  title={
                    !isUnlocked && !isAdmin
                      ? isTrial
                        ? 'Terkunci untuk akun trial. Akun trial hanya dapat membuka materi Mengenal Bagian Menu Scratch.'
                        : 'Materi terkunci. Selesaikan materi sebelumnya terlebih dahulu.'
                      : isCompleted
                      ? 'Klik untuk membatalkan tanda selesai jika diperlukan'
                      : 'Tandai selesai untuk membuka materi berikutnya dan dapatkan +50 XP'
                  }
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Sudah Selesai Dikerjakan ✓</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-slate-900" />
                      <span>Tandai Selesai Mengerjakan (+50 XP)</span>
                    </>
                  )}
                </button>

                {/* Open Links & Extra Actions Row */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopyLink(item.url, item.id)}
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                      title="Salin Tautan Materi"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {item.targetLevelId && onSelectLevel && (
                      <button
                        onClick={() => onSelectLevel(item.targetLevelId!)}
                        className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1 transition-colors"
                        title={`Buka Silabus Level ${item.targetLevelId}`}
                      >
                        <GraduationCap className="w-3 h-3 text-indigo-500" />
                        <span className="hidden sm:inline">Level {item.targetLevelId}</span>
                      </button>
                    )}
                  </div>

                  {/* Open File / Video Button */}
                  {isUnlocked || isAdmin ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm transition-all transform active:scale-95 ${
                        isVideo
                          ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/20'
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20'
                      }`}
                    >
                      <span>{isVideo ? 'Tonton Video' : 'Buka Materi'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : isTrial ? (
                    <button
                      onClick={onOpenLoginModal}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 bg-amber-400/20 hover:bg-amber-400 border border-amber-400/40 text-amber-700 hover:text-slate-950 dark:text-amber-300 dark:hover:text-slate-950 transition-all cursor-pointer shadow-xs"
                      title="Terkunci untuk akun trial. Masukkan kode akses siswa untuk membuka modul ini."
                    >
                      <Lock className="w-3 h-3" />
                      <span>Buka Kunci</span>
                    </button>
                  ) : (
                    <button
                      disabled
                      className="px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
                    >
                      <Lock className="w-3 h-3" />
                      <span>Terkunci</span>
                    </button>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="text-center py-16 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Tidak ada materi yang cocok</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Coba gunakan kata kunci pencarian yang lain atau pilih kategori "Semua" untuk melihat seluruh 54 materi.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Semua');
              setStatusFilter('all');
            }}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold"
          >
            Reset Pencarian
          </button>
        </div>
      )}

    </div>
  );
};
