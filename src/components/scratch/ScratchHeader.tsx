import React, { useState } from 'react';
import {
  Globe, FolderOpen, Share2, Lightbulb, Check,
  ChevronDown, Download, Upload, Zap, User, Edit3, ExternalLink, LogOut
} from 'lucide-react';

interface ScratchHeaderProps {
  projectTitle: string;
  setProjectTitle: (val: string) => void;
  isTurboMode: boolean;
  setIsTurboMode: (val: boolean) => void;
  onSaveToComputer?: () => void;
  onLoadFromComputer?: () => void;
  onNewProject?: () => void;
  onOpenTutorials?: () => void;
  onShareProject?: () => void;
  onLogout?: () => void;
  studentName?: string;
  isCompact?: boolean;
}

export const ScratchHeader: React.FC<ScratchHeaderProps> = ({
  projectTitle,
  setProjectTitle,
  isTurboMode,
  setIsTurboMode,
  onSaveToComputer,
  onLoadFromComputer,
  onNewProject,
  onOpenTutorials,
  onShareProject,
  onLogout,
  studentName = 'Sobat Siswa',
  isCompact = false
}) => {
  const [activeMenu, setActiveMenu] = useState<'file' | 'edit' | 'lang' | 'profile' | null>(null);
  const [isShared, setIsShared] = useState(false);

  const handleToggleMenu = (menu: 'file' | 'edit' | 'lang' | 'profile') => {
    setActiveMenu(prev => prev === menu ? null : menu);
  };

  const closeMenu = () => setActiveMenu(null);

  const handleShareClick = () => {
    setIsShared(true);
    if (onShareProject) onShareProject();
    setTimeout(() => setIsShared(false), 3000);
  };

  return (
    <header
      id="scratch-main-header"
      className="bg-[#4C97FF] text-white px-2 sm:px-3 py-1 sm:py-1.5 flex items-center justify-between gap-1.5 select-none z-30 shadow-md relative overflow-x-auto custom-scrollbar flex-nowrap"
    >
      {/* LEFT SECTION: Scratch Logo + Dropdown Menus + Tutorials */}
      <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
        
        {/* Authentic Scratch 3.0 Logo */}
        <a
          href="https://scratch.mit.edu"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-black/10 transition-colors mr-0.5"
          title="Scratch MIT 3.0"
        >
          <div className="bg-[#FFAB19] text-white font-black text-[11px] sm:text-xs px-1.5 py-0.5 rounded shadow-sm flex items-center justify-center font-sans tracking-tight">
            scratch
          </div>
          {!isCompact && <span className="hidden xl:inline text-[11px] font-bold text-white/90">Sobat Koding</span>}
        </a>

        {/* Globe Language Selector */}
        <div className="relative">
          <button
            onClick={() => handleToggleMenu('lang')}
            className={`p-1 rounded hover:bg-black/15 transition-colors flex items-center gap-0.5 ${
              activeMenu === 'lang' ? 'bg-black/20' : ''
            }`}
            title="Pilih Bahasa"
          >
            <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <ChevronDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-80" />
          </button>

          {activeMenu === 'lang' && (
            <div
              className="absolute top-full left-0 mt-1 bg-white text-slate-800 rounded-lg shadow-xl border border-slate-200 py-1 w-44 z-50 text-xs font-semibold"
              onMouseLeave={closeMenu}
            >
              <button
                onClick={closeMenu}
                className="w-full text-left px-3 py-1.5 hover:bg-indigo-50 text-[#4C97FF] flex items-center justify-between font-bold"
              >
                <span>Bahasa Indonesia</span>
                <Check className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={closeMenu}
                className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-700"
              >
                <span>English</span>
              </button>
            </div>
          )}
        </div>

        {/* FILE (Berkas) Menu Dropdown */}
        <div className="relative">
          <button
            onClick={() => handleToggleMenu('file')}
            className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-bold hover:bg-black/15 transition-colors flex items-center gap-0.5 ${
              activeMenu === 'file' ? 'bg-black/20' : ''
            }`}
          >
            <span>Berkas</span>
            <ChevronDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-80" />
          </button>

          {activeMenu === 'file' && (
            <div
              className="absolute top-full left-0 mt-1 bg-white text-slate-800 rounded-lg shadow-xl border border-slate-200 py-1 w-52 z-50 text-xs font-medium"
              onMouseLeave={closeMenu}
            >
              <button
                onClick={() => { if (onNewProject) onNewProject(); closeMenu(); }}
                className="w-full text-left px-3 py-1.5 hover:bg-slate-100 flex items-center gap-2"
              >
                <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                <span>Baru (New Project)</span>
              </button>
              <div className="h-px bg-slate-100 my-1" />
              <button
                onClick={() => { if (onSaveToComputer) onSaveToComputer(); closeMenu(); }}
                className="w-full text-left px-3 py-1.5 hover:bg-slate-100 flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5 text-emerald-600" />
                <span>Simpan ke komputermu (.sb3)</span>
              </button>
              <button
                onClick={() => { if (onLoadFromComputer) onLoadFromComputer(); closeMenu(); }}
                className="w-full text-left px-3 py-1.5 hover:bg-slate-100 flex items-center gap-2"
              >
                <Upload className="w-3.5 h-3.5 text-blue-600" />
                <span>Muat dari komputermu</span>
              </button>
            </div>
          )}
        </div>

        {/* EDIT (Sunting) Menu Dropdown */}
        <div className="relative">
          <button
            onClick={() => handleToggleMenu('edit')}
            className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-bold hover:bg-black/15 transition-colors flex items-center gap-0.5 ${
              activeMenu === 'edit' ? 'bg-black/20' : ''
            }`}
          >
            <span>Sunting</span>
            <ChevronDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-80" />
          </button>

          {activeMenu === 'edit' && (
            <div
              className="absolute top-full left-0 mt-1 bg-white text-slate-800 rounded-lg shadow-xl border border-slate-200 py-1 w-52 z-50 text-xs font-medium"
              onMouseLeave={closeMenu}
            >
              <button
                onClick={() => { setIsTurboMode(!isTurboMode); closeMenu(); }}
                className="w-full text-left px-3 py-1.5 hover:bg-slate-100 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Mode Turbo (60 FPS)</span>
                </div>
                {isTurboMode && <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" />}
              </button>
            </div>
          )}
        </div>

        {/* TUTORIALS BUTTON */}
        {!isCompact && (
          <button
            onClick={onOpenTutorials}
            className="hidden md:flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-bold bg-black/10 hover:bg-black/20 transition-colors"
            title="Buka Koleksi Tutorial Scratch"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span>Tutorial</span>
          </button>
        )}

        {/* PROJECT TITLE INPUT */}
        <div className="flex items-center bg-[#3373CC] px-2 py-0.5 rounded-md border border-white/20 ml-0.5">
          <input
            type="text"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            className="bg-transparent text-white font-bold text-[11px] sm:text-xs focus:outline-none w-24 sm:w-36 md:w-48 placeholder-white/60 truncate"
            title="Ganti Judul Proyek"
          />
        </div>

        {/* ORANGE SHARE (BAGIKAN) BUTTON */}
        <button
          onClick={handleShareClick}
          className={`px-2.5 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all shadow-sm flex items-center gap-1 ${
            isShared
              ? 'bg-emerald-500 text-white'
              : 'bg-[#FF8C1A] hover:bg-[#E6770D] text-white active:scale-95'
          }`}
          title="Bagikan Proyek ke Galeri Siswa"
        >
          <Share2 className="w-3 h-3" />
          <span>{isShared ? 'Tersimpan ✓' : 'Bagikan'}</span>
        </button>

      </div>

      {/* RIGHT SECTION: My Stuff Folder + User Profile */}
      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
        {/* Turbo Mode Indicator Badge */}
        {isTurboMode && (
          <div className="hidden lg:flex items-center gap-1 bg-amber-400 text-slate-950 font-black text-[9px] px-1.5 py-0.5 rounded shadow-sm">
            <Zap className="w-2.5 h-2.5 fill-current" />
            <span>TURBO</span>
          </div>
        )}

        {/* My Stuff (Karyaku) */}
        <button
          onClick={closeMenu}
          className="p-1 sm:p-1.5 rounded hover:bg-black/15 transition-colors text-white"
          title="Karyaku (Proyek Tersimpan)"
        >
          <FolderOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>

        {/* Profile Avatar & Username */}
        <div className="relative">
          <button
            onClick={() => handleToggleMenu('profile')}
            className={`flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-black/15 transition-colors text-xs font-bold ${
              activeMenu === 'profile' ? 'bg-black/20' : ''
            }`}
          >
            <div className="w-4.5 h-4.5 rounded-full bg-white/20 flex items-center justify-center text-white text-[10px] font-bold">
              🐱
            </div>
            <span className="hidden xl:inline max-w-[80px] truncate">{studentName}</span>
            <ChevronDown className="w-2.5 h-2.5 opacity-80" />
          </button>

          {activeMenu === 'profile' && (
            <div
              className="absolute top-full right-0 mt-1 bg-white text-slate-800 rounded-lg shadow-xl border border-slate-200 py-1 w-44 z-50 text-xs font-medium"
              onMouseLeave={closeMenu}
            >
              <div className="px-3 py-1.5 border-b border-slate-100">
                <span className="font-bold text-slate-900 block truncate">{studentName}</span>
                <span className="text-[10px] text-slate-500">Siswa Scratch 3.0</span>
              </div>
              <button onClick={closeMenu} className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-700">
                Profil Saya
              </button>
              <button onClick={closeMenu} className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-700">
                Koleksi Karyaku
              </button>
              {onLogout && (
                <button
                  onClick={() => {
                    closeMenu();
                    onLogout();
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-rose-50 text-rose-600 border-t border-slate-100 flex items-center gap-1.5 font-semibold"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-500" />
                  <span>Keluar / Logout</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
