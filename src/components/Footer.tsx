import React from 'react';
import { BrandLogo } from './BrandLogo';
import { Sparkles, Code2, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/80 transition-colors py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand info */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <BrandLogo size="sm" />
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Platform Belajar Mandiri Coding Scratch & Kecerdasan Buatan Siswa
          </div>
        </div>

        {/* Mandatory Copyright Notice as explicitly requested */}
        <div className="flex flex-col items-center sm:items-end text-xs text-slate-500 dark:text-slate-400 gap-1">
          <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <span>@copyright by Pak GuruAI</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-amber-500">DJuragan Coding</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Silabus Ekstrakurikuler 20 Level • Disimpan di Perangkat Masing-Masing
          </div>
        </div>

      </div>
    </footer>
  );
};
