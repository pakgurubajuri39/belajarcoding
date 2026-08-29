import React from 'react';
import { motion } from 'motion/react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
  variant?: 'full' | 'icon-only';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
  variant = 'full'
}) => {
  const iconSizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20'
  }[size];

  const titleSizeClasses = {
    sm: 'text-base font-bold',
    md: 'text-xl font-extrabold tracking-tight',
    lg: 'text-3xl font-extrabold tracking-tight',
    xl: 'text-4xl font-black tracking-tight'
  }[size];

  const subtitleSizeClasses = {
    sm: 'text-[10px]',
    md: 'text-xs',
    lg: 'text-sm',
    xl: 'text-base'
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Cool Cybernetic AI & Code Hexagon Icon */}
      <div className={`relative ${iconSizeClasses} flex items-center justify-center flex-shrink-0 group`}>
        {/* Glow ambient background */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-amber-400 blur-sm opacity-60 group-hover:opacity-100 transition-opacity" />
        
        {/* Outer badge */}
        <div className="relative w-full h-full rounded-2xl bg-slate-900 border border-cyan-400/40 shadow-inner flex items-center justify-center overflow-hidden">
          {/* Circuit / Neural Grid background lines */}
          <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100">
            <line x1="0" y1="50" x2="100" y2="50" stroke="#06b6d4" strokeWidth="1" strokeDasharray="3,3" />
            <line x1="50" y1="0" x2="50" y2="100" stroke="#06b6d4" strokeWidth="1" strokeDasharray="3,3" />
            <circle cx="50" cy="50" r="35" stroke="#f59e0b" strokeWidth="1" fill="none" strokeDasharray="4,4" />
          </svg>

          {/* AI Neural Brain + Scratch Code Block Glyph */}
          <div className="relative z-10 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-3/5 h-3/5 text-cyan-400"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Code Brackets */}
              <polyline points="7 8 3 12 7 16" stroke="#38bdf8" />
              <polyline points="17 8 21 12 17 16" stroke="#fbbf24" />
              {/* AI Brain / CPU Core */}
              <circle cx="12" cy="12" r="3" fill="#06b6d4" stroke="#e0f2fe" strokeWidth="1.5" />
              <path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="#a855f7" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Glowing spark corner */}
          <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
        </div>
      </div>

      {/* Brand Text */}
      {variant === 'full' && (
        <div className="flex flex-col">
          <div className={`leading-none flex items-center gap-1.5 ${titleSizeClasses}`}>
            <span className="text-amber-500 dark:text-amber-400 font-black tracking-tight">
              DJURAGAN
            </span>
            <span className="text-indigo-600 dark:text-indigo-400 font-black tracking-tight">
              CODING
            </span>
          </div>

          {showSubtitle && (
            <div className={`mt-1 font-medium tracking-wide flex items-center gap-1.5 ${subtitleSizeClasses}`}>
              <span className="text-cyan-600 dark:text-cyan-400 font-bold">Scratch & AI Academy</span>
              <span className="inline-block w-1 h-1 rounded-full bg-amber-400" />
              <span className="text-slate-600 dark:text-slate-400 font-mono text-[10px] font-bold uppercase">v2.5 Pro</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
