import React from 'react';
import { Sun, Moon, Sparkles, Trophy, BookOpen, BarChart3, Bot, KeyRound, Award, Shield, Laptop, LogOut, Settings, Bell, FolderDown } from 'lucide-react';
import { UserRole, UserSession, StudentProgress } from '../types';
import { BrandLogo } from './BrandLogo';
import { getRankFromXp } from '../utils/storage';
import { AVATAR_OPTIONS } from '../data/syllabus';

interface NavbarProps {
  currentTab: 'about' | 'syllabus' | 'materials' | 'scratch' | 'progress' | 'certificate' | 'admin';
  setCurrentTab: (tab: 'about' | 'syllabus' | 'materials' | 'scratch' | 'progress' | 'certificate' | 'admin') => void;
  session: UserSession;
  progress: StudentProgress;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenLoginModal: () => void;
  onLogout: () => void;
  unreadNotificationsCount?: number;
  onOpenNotifications: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  session,
  progress,
  theme,
  onToggleTheme,
  onOpenLoginModal,
  onLogout,
  unreadNotificationsCount = 0,
  onOpenNotifications
}) => {
  const rankInfo = getRankFromXp(progress.xp);
  const avatarObj = AVATAR_OPTIONS.find(a => a.id === session.avatar) || AVATAR_OPTIONS[0];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/90 dark:bg-slate-950/90 border-b border-slate-200 dark:border-slate-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-2 sm:gap-4">
          
          {/* Left: Brand Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer flex-shrink-0" 
            onClick={() => setCurrentTab(session.isAuthenticated ? 'syllabus' : 'about')}
            title="DJuragan Coding - Beranda"
          >
            <BrandLogo size="md" />
          </div>

          {/* Center: Main Navigation Tabs - Bento Style Responsive for Laptop, Tablet, PC */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-900/70 p-1 rounded-2xl border border-slate-200 dark:border-slate-800 flex-shrink-0">
            <button
              onClick={() => setCurrentTab('about')}
              className={`flex items-center gap-1.5 px-2.5 lg:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                currentTab === 'about'
                  ? 'bg-amber-400 text-slate-950 shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Tentang DJuragan</span>
              <span className="xl:hidden">Tentang</span>
            </button>

            <button
              onClick={() => setCurrentTab('syllabus')}
              className={`flex items-center gap-1.5 px-2.5 lg:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                currentTab === 'syllabus'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Silabus 20 Level</span>
              <span className="xl:hidden">Silabus</span>
            </button>

            <button
              onClick={() => setCurrentTab('materials')}
              className={`flex items-center gap-1.5 px-2.5 lg:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                currentTab === 'materials'
                  ? 'bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-sm border border-slate-200 dark:border-slate-700 font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FolderDown className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Modul & Materi</span>
              <span className="xl:hidden">Materi</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-400/20 text-amber-600 dark:text-amber-400 font-extrabold">54</span>
            </button>

            <button
              onClick={() => setCurrentTab('scratch')}
              className={`flex items-center gap-1.5 px-2.5 lg:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                currentTab === 'scratch'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Scratch Studio</span>
              <span className="xl:hidden">Scratch</span>
            </button>

            <button
              onClick={() => setCurrentTab('progress')}
              className={`flex items-center gap-1.5 px-2.5 lg:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                currentTab === 'progress'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Grafik Progres</span>
              <span className="xl:hidden">Grafik</span>
            </button>

            <button
              onClick={() => setCurrentTab('certificate')}
              className={`flex items-center gap-1.5 px-2.5 lg:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                currentTab === 'certificate'
                  ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm border border-slate-200 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Sertifikat</span>
            </button>

            {session.role === 'admin' && (
              <button
                onClick={() => setCurrentTab('admin')}
                className={`flex items-center gap-1.5 px-2.5 lg:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  currentTab === 'admin'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-indigo-400 hover:text-indigo-300'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            )}
          </nav>

          {/* Right Bento Status & XP Group */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Status Pill */}
            <div className="hidden lg:flex items-center gap-2 bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-full">
              <div className={`w-2 h-2 rounded-full ${session.role === 'guest' ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400 animate-pulse'}`} />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                {session.role === 'admin' ? 'Admin Active' : session.role === 'student' ? 'Siswa Aktif' : 'Trial Level Active'}
              </span>
            </div>

            {/* XP Pill Bento Container */}
            <div 
              onClick={() => setCurrentTab('progress')}
              className="cursor-pointer flex items-center gap-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 pr-3 rounded-full hover:border-indigo-500/50 transition-all"
              title={`${progress.xp} XP - Pangkat: ${rankInfo.title}`}
            >
              <div className="bg-amber-400 text-amber-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
                XP {progress.xp.toLocaleString()}
              </div>
              <span className="text-xs font-semibold text-slate-800 dark:text-white hidden sm:inline">
                Level {rankInfo.level}
              </span>
            </div>

            {/* Notification Bell Button */}
            <button
              onClick={onOpenNotifications}
              aria-label="Lihat Notifikasi"
              className="relative p-2 bg-slate-100 dark:bg-slate-900 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-all text-slate-700 dark:text-slate-300"
              title="Notifikasi & Pengingat Sesi Coding"
            >
              <Bell className="w-4 h-4 text-slate-700 dark:text-slate-300" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black flex items-center justify-center shadow-md animate-pulse">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* Quick Action Button - Theme Toggle */}
            <button
              onClick={onToggleTheme}
              aria-label="Toggle Dark/Light Mode"
              className="p-2 bg-slate-100 dark:bg-slate-900 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-all text-slate-700 dark:text-slate-300"
              title={theme === 'dark' ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </button>

            {/* Profile Menu Trigger Button */}
            <button
              onClick={onOpenLoginModal}
              className="p-2 bg-slate-100 dark:bg-slate-900 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-all text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
              title="Akses & Akun Siswa"
            >
              <span className="text-sm">{avatarObj.emoji}</span>
              <KeyRound className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Direct Logout / Keluar Button */}
            <button
              onClick={onLogout}
              className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-800/60 rounded-xl text-rose-600 dark:text-rose-400 font-semibold text-xs transition-all flex items-center gap-1.5 shadow-sm"
              title="Keluar / Logout Akun (Kembali ke Beranda)"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Keluar</span>
            </button>

          </div>
        </div>

        {/* Mobile Navigation bar - Responsive touch bar */}
        <div className="flex md:hidden items-center justify-start sm:justify-around py-2 border-t border-slate-200 dark:border-slate-800/80 overflow-x-auto gap-1.5 text-[11px] px-2 no-scrollbar">
          <button
            onClick={() => setCurrentTab('about')}
            className={`px-3 py-1.5 rounded-xl flex items-center gap-1 font-bold whitespace-nowrap flex-shrink-0 transition-all ${
              currentTab === 'about' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tentang</span>
          </button>
          <button
            onClick={() => setCurrentTab('syllabus')}
            className={`px-3 py-1.5 rounded-xl flex items-center gap-1 font-bold whitespace-nowrap flex-shrink-0 transition-all ${
              currentTab === 'syllabus' ? 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Silabus</span>
          </button>
          <button
            onClick={() => setCurrentTab('materials')}
            className={`px-3 py-1.5 rounded-xl flex items-center gap-1 font-bold whitespace-nowrap flex-shrink-0 transition-all ${
              currentTab === 'materials' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <FolderDown className="w-3.5 h-3.5" />
            <span>Materi (54)</span>
          </button>
          <button
            onClick={() => setCurrentTab('scratch')}
            className={`px-3 py-1.5 rounded-xl flex items-center gap-1 font-bold whitespace-nowrap flex-shrink-0 transition-all ${
              currentTab === 'scratch' ? 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>Scratch</span>
          </button>
          <button
            onClick={() => setCurrentTab('progress')}
            className={`px-3 py-1.5 rounded-xl flex items-center gap-1 font-bold whitespace-nowrap flex-shrink-0 transition-all ${
              currentTab === 'progress' ? 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Grafik</span>
          </button>
          <button
            onClick={() => setCurrentTab('certificate')}
            className={`px-3 py-1.5 rounded-xl flex items-center gap-1 font-bold whitespace-nowrap flex-shrink-0 transition-all ${
              currentTab === 'certificate' ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Sertifikat</span>
          </button>
          {session.role === 'admin' && (
            <button
              onClick={() => setCurrentTab('admin')}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1 font-bold whitespace-nowrap flex-shrink-0 transition-all ${
                currentTab === 'admin' ? 'bg-indigo-600 text-white shadow-sm' : 'text-indigo-400'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          )}
          <button
            onClick={onLogout}
            className="px-2.5 py-1.5 rounded-xl flex items-center gap-1 font-bold whitespace-nowrap flex-shrink-0 text-rose-500 dark:text-rose-400 hover:bg-rose-500/10 transition-colors"
            title="Keluar / Logout Akun"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar</span>
          </button>
        </div>
      </div>
    </header>
  );
};
