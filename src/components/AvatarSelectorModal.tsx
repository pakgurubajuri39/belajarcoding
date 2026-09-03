import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Check, 
  X, 
  User, 
  ShieldCheck, 
  Zap, 
  Search, 
  ArrowRight,
  Smile,
  Palette
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AVATAR_OPTIONS } from '../data/syllabus';
import { AvatarOption } from '../types';

interface AvatarSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAvatarId: string;
  studentName: string;
  onSelectAvatar: (avatarId: string) => void;
}

export const AvatarSelectorModal: React.FC<AvatarSelectorModalProps> = ({
  isOpen,
  onClose,
  currentAvatarId,
  studentName,
  onSelectAvatar
}) => {
  const [selectedId, setSelectedId] = useState<string>(currentAvatarId || 'bot_neon');
  const [searchQuery, setSearchQuery] = useState('');
  const [justSaved, setJustSaved] = useState(false);

  // Sync selectedId with currentAvatarId when opened
  useEffect(() => {
    if (isOpen) {
      setSelectedId(currentAvatarId || 'bot_neon');
      setJustSaved(false);
      setSearchQuery('');
    }
  }, [isOpen, currentAvatarId]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const activeAvatarObj = AVATAR_OPTIONS.find(a => a.id === selectedId) || AVATAR_OPTIONS[0];
  const currentAvatarObj = AVATAR_OPTIONS.find(a => a.id === currentAvatarId) || AVATAR_OPTIONS[0];

  const filteredAvatars = AVATAR_OPTIONS.filter(av => {
    const q = searchQuery.toLowerCase();
    return (
      av.name.toLowerCase().includes(q) ||
      (av.tag && av.tag.toLowerCase().includes(q)) ||
      (av.description && av.description.toLowerCase().includes(q))
    );
  });

  const handleApply = (avatarIdToApply?: string) => {
    const finalId = avatarIdToApply || selectedId;
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    setJustSaved(true);
    onSelectAvatar(finalId);

    setTimeout(() => {
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="relative px-6 py-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-b border-indigo-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/40 text-amber-400 flex items-center justify-center text-xl shadow-md">
              <Palette className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                <span>Pilih Avatar Karakter Koding</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400 text-slate-950">
                  {AVATAR_OPTIONS.length} Pilihan
                </span>
              </h2>
              <p className="text-xs text-slate-300">
                Pilih karakter representasi belajarmu. Avatar langsung tersimpan di profil & papan skor.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Tutup Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 custom-scrollbar flex-1">
          
          {/* Active Avatar Highlight Preview Card */}
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center sm:items-stretch gap-4">
            {/* Big Avatar Display */}
            <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr ${activeAvatarObj.color} flex items-center justify-center text-4xl sm:text-5xl shadow-lg border-2 border-white/40 flex-shrink-0 relative`}>
              <span>{activeAvatarObj.emoji}</span>
              {selectedId === currentAvatarId && (
                <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-black shadow-md border border-white flex items-center gap-0.5">
                  <Check className="w-3 h-3 stroke-[3]" />
                  <span>Aktif</span>
                </div>
              )}
            </div>

            {/* Avatar Details */}
            <div className="flex-1 text-center sm:text-left flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                    {activeAvatarObj.name}
                  </h3>
                  {activeAvatarObj.tag && (
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                      {activeAvatarObj.tag}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {activeAvatarObj.description}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-center sm:justify-start gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                <span>Representasi untuk profil siswa: <strong>{studentName}</strong></span>
              </div>
            </div>
          </div>

          {/* Search Filter Bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari karakter coding (contoh: Scratch, Bot, Dino, Ninja)..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Grid of Character Options */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filteredAvatars.map((av) => {
              const isSelected = selectedId === av.id;
              const isCurrent = currentAvatarId === av.id;

              return (
                <button
                  key={av.id}
                  type="button"
                  onClick={() => setSelectedId(av.id)}
                  onDoubleClick={() => handleApply(av.id)}
                  className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all transform active:scale-95 cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-500 ring-2 ring-indigo-500/30 shadow-md'
                      : isCurrent
                      ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-500/40 hover:border-emerald-500'
                      : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-sm'
                  }`}
                >
                  {/* Current Active Badge */}
                  {isCurrent && (
                    <div className="absolute top-2 right-2 flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-emerald-500 text-white text-[9px] font-black">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                      <span>Aktif</span>
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${av.color} flex items-center justify-center text-2xl shadow-sm border border-white/30`}>
                      {av.emoji}
                    </div>

                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                        {av.name}
                      </div>
                      {av.tag && (
                        <div className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold line-clamp-1 mt-0.5">
                          {av.tag}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">
                      {isSelected ? 'Terpilih' : 'Klik untuk pilih'}
                    </span>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                        ✓
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {filteredAvatars.length === 0 && (
            <div className="text-center py-8 text-slate-400">
              <Smile className="w-8 h-8 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
              <p className="text-xs">Tidak menemukan karakter dengan kata kunci tersebut.</p>
            </div>
          )}

        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 text-center sm:text-left">
            <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span>Karakter pilihan tersimpan di state profil secara instan.</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={() => handleApply()}
              className="flex-1 sm:flex-none px-5 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-amber-400 via-orange-500 to-indigo-600 hover:from-amber-300 hover:to-indigo-500 text-slate-950 shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-1.5 transform active:scale-95"
            >
              {justSaved ? (
                <>
                  <Check className="w-4 h-4 text-slate-950 stroke-[3]" />
                  <span>Berhasil Diterapkan!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Terapkan Avatar Karakter</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
