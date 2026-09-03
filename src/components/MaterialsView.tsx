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
  GraduationCap
} from 'lucide-react';
import { ALL_LEARNING_MATERIALS } from '../data/learningMaterials';
import { LearningResource } from '../types';

interface MaterialsViewProps {
  onSelectLevel?: (levelId: number) => void;
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

export const MaterialsView: React.FC<MaterialsViewProps> = ({ onSelectLevel }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const filteredMaterials = useMemo(() => {
    return ALL_LEARNING_MATERIALS.filter((item) => {
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.targetLevelId && `level ${item.targetLevelId}`.includes(searchQuery.toLowerCase()));
      
      const matchesCategory = 
        selectedCategory === 'Semua' || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleCopyLink = (url: string, id: number) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header Bento Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 p-6 sm:p-8 text-white shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20">
            <FolderDown className="w-3.5 h-3.5" />
            <span>REPOSITORI MATERI LENGKAP</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
            Modul & Bahan Pembelajaran Resmi
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            Kumpulan seluruh 54 dokumen materi kurikulum Scratch 3.0, modul praktik bertahap, lembar kerja computational thinking (worksheet), dan video edukasi siap akses langsung via Google Drive & YouTube.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-[10px] uppercase font-bold text-amber-300 block">Total Dokumen</span>
              <span className="text-xl sm:text-2xl font-black text-white">54 Modul</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-[10px] uppercase font-bold text-indigo-300 block">Modul Inti Silabus</span>
              <span className="text-xl sm:text-2xl font-black text-white">20 Level</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-[10px] uppercase font-bold text-emerald-300 block">Lembar Kerja</span>
              <span className="text-xl sm:text-2xl font-black text-white">5 Lembar</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-[10px] uppercase font-bold text-cyan-300 block">Video & Tutorial</span>
              <span className="text-xl sm:text-2xl font-black text-white">10 Video</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3 bg-slate-100 dark:bg-slate-900/50 p-3 sm:p-4 rounded-3xl border border-slate-200 dark:border-slate-800">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul materi, topik, atau kata kunci (contoh: Bus Street, Paint, Variabel, Worksheet)..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
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

        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 px-2 py-1 font-semibold flex-shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Kategori:</span>
          </div>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
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
      <div className="flex items-center justify-between px-2 text-xs text-slate-500 dark:text-slate-400">
        <span>Menampilkan <strong>{filteredMaterials.length}</strong> dari 54 materi kurikulum</span>
        <span className="hidden sm:inline italic">Semua link terhubung ke Google Drive dan video resmi</span>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMaterials.map((item) => {
          const isDrive = item.type === 'drive' || item.type === 'pdf';
          const isVideo = item.type === 'youtube' || item.type === 'video';
          const isWorksheet = item.type === 'worksheet';

          return (
            <div
              key={item.id}
              className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between hover:border-indigo-500/50 hover:shadow-lg transition-all"
            >
              <div className="space-y-3">
                
                {/* Card Top Meta */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-mono font-black text-xs border border-slate-200 dark:border-slate-700">
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

                  {item.targetLevelId && (
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-400/15 text-amber-600 dark:text-amber-400 border border-amber-400/30">
                      Level {item.targetLevelId}
                    </span>
                  )}
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white leading-snug">
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
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
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
                      <span>Buka Level</span>
                    </button>
                  )}
                </div>

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
