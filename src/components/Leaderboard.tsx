import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Trophy, Medal, Crown, Flame, Sparkles, Search, Filter,
  Users, RefreshCw, Zap, ArrowUp, Target, Award, School, CheckCircle2
} from 'lucide-react';
import { LeaderboardEntry, StudentProgress, UserSession } from '../types';
import { AVATAR_OPTIONS } from '../data/syllabus';
import { getRankFromXp } from '../utils/storage';
import { subscribeToLeaderboard, syncStudentProgressToFirebase } from '../lib/firebase';

interface LeaderboardProps {
  currentProgress: StudentProgress;
  session: UserSession;
  onSelectLevel?: (levelId: number) => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({
  currentProgress,
  session,
  onSelectLevel
}) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'top10' | 'my_class'>('all');
  const [lastSyncTime, setLastSyncTime] = useState<string>(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }));

  // Helper avatar
  const getAvatarData = (avatarId: string) => {
    return AVATAR_OPTIONS.find(a => a.id === avatarId) || AVATAR_OPTIONS[0];
  };

  // Sync current user's progress to Firebase on mount or when XP changes
  useEffect(() => {
    if (session.isAuthenticated) {
      const studentId = session.registrationId || session.email || `guest_${session.studentName.replace(/\s+/g, '_').toLowerCase()}`;
      syncStudentProgressToFirebase(studentId, {
        fullName: session.studentName,
        email: session.email,
        schoolOrClass: session.schoolOrClass || (session.role === 'admin' ? 'Instruktur / Guru' : 'Siswa Sobat Koding'),
        avatar: session.avatar || 'bot_neon',
        xp: currentProgress.xp,
        unlockedLevelIds: currentProgress.unlockedLevelIds,
        completedLevelIds: currentProgress.completedLevelIds,
        unlockedBadgesCount: currentProgress.unlockedBadges.length
      }).catch(err => console.warn('Could not sync current user progress to cloud:', err));
    }
  }, [currentProgress.xp, currentProgress.completedLevelIds.length, session]);

  // Subscribe to real-time Leaderboard updates
  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = subscribeToLeaderboard((data) => {
      setEntries(data);
      setIsLoading(false);
      setLastSyncTime(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }));
    }, (err) => {
      console.warn('Leaderboard realtime subscription error:', err);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    if (session.isAuthenticated) {
      const studentId = session.registrationId || session.email || `guest_${session.studentName.replace(/\s+/g, '_').toLowerCase()}`;
      await syncStudentProgressToFirebase(studentId, {
        fullName: session.studentName,
        email: session.email,
        schoolOrClass: session.schoolOrClass || (session.role === 'admin' ? 'Instruktur / Guru' : 'Siswa Sobat Koding'),
        avatar: session.avatar || 'bot_neon',
        xp: currentProgress.xp,
        unlockedLevelIds: currentProgress.unlockedLevelIds,
        completedLevelIds: currentProgress.completedLevelIds,
        unlockedBadgesCount: currentProgress.unlockedBadges.length
      }).catch(() => {});
    }
    setTimeout(() => {
      setIsRefreshing(false);
      setLastSyncTime(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }));
    }, 600);
  };

  // Combine and sort entries, ensuring the current active user is represented with up-to-date XP
  const mergedEntries = useMemo(() => {
    const list = [...entries];
    const currentStudentId = session.registrationId || session.email || `guest_${session.studentName.replace(/\s+/g, '_').toLowerCase()}`;
    const userIndex = list.findIndex(e => e.studentId === currentStudentId || (session.email && e.studentId === session.email));

    if (userIndex >= 0) {
      // Update with freshest local values if local is higher
      list[userIndex] = {
        ...list[userIndex],
        fullName: session.studentName,
        avatar: session.avatar || list[userIndex].avatar,
        schoolOrClass: session.schoolOrClass || list[userIndex].schoolOrClass,
        xp: Math.max(list[userIndex].xp, currentProgress.xp),
        completedLevelIds: currentProgress.completedLevelIds.length >= list[userIndex].completedLevelIds.length ? currentProgress.completedLevelIds : list[userIndex].completedLevelIds,
        unlockedBadgesCount: Math.max(list[userIndex].unlockedBadgesCount || 0, currentProgress.unlockedBadges.length),
        isCurrentUser: true
      };
    } else {
      // Insert current user into list
      list.push({
        studentId: currentStudentId,
        fullName: session.studentName + (session.role === 'guest' ? ' (Tamu)' : ''),
        schoolOrClass: session.schoolOrClass || (session.role === 'admin' ? 'Instruktur' : 'Siswa Sobat Koding'),
        avatar: session.avatar || 'bot_neon',
        xp: currentProgress.xp,
        completedLevelIds: currentProgress.completedLevelIds,
        unlockedBadgesCount: currentProgress.unlockedBadges.length,
        lastUpdated: new Date().toISOString(),
        isCurrentUser: true
      });
    }

    // Sort descending by XP
    list.sort((a, b) => b.xp - a.xp);

    // Assign rank
    return list.map((item, idx) => ({
      ...item,
      rank: idx + 1,
      isCurrentUser: item.isCurrentUser || item.studentId === currentStudentId
    }));
  }, [entries, currentProgress.xp, currentProgress.completedLevelIds, session]);

  // Current user's rank info
  const currentUserEntry = useMemo(() => {
    return mergedEntries.find(e => e.isCurrentUser);
  }, [mergedEntries]);

  // Next target ahead of current user
  const studentAhead = useMemo(() => {
    if (!currentUserEntry || currentUserEntry.rank === 1) return null;
    return mergedEntries[currentUserEntry.rank! - 2];
  }, [currentUserEntry, mergedEntries]);

  // Filtered entries for the list table
  const filteredEntries = useMemo(() => {
    return mergedEntries.filter(item => {
      // Search query
      const matchesSearch = item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.schoolOrClass && item.schoolOrClass.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      // Filter category
      if (filterType === 'top10') {
        return (item.rank || 0) <= 10;
      }
      if (filterType === 'my_class') {
        if (!session.schoolOrClass) return true;
        const myClassKeyword = session.schoolOrClass.split('/')[0].trim().toLowerCase();
        return item.schoolOrClass?.toLowerCase().includes(myClassKeyword);
      }
      return true;
    });
  }, [mergedEntries, searchQuery, filterType, session.schoolOrClass]);

  // Top 3 Podium
  const top1 = mergedEntries[0];
  const top2 = mergedEntries[1];
  const top3 = mergedEntries[2];

  // Classroom stats
  const totalStudents = mergedEntries.length;
  const averageXp = Math.round(mergedEntries.reduce((acc, curr) => acc + curr.xp, 0) / (totalStudents || 1));
  const highestXp = top1?.xp || 0;

  return (
    <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-8" id="section-global-leaderboard">
      
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800/80 pb-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Leaderboard Global & Kelas
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Cloud
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Peringkat real-time perolehan XP dan misi koding Scratch sekelas & antarsekolah mitra
              </p>
            </div>
          </div>
        </div>

        {/* Quick Refresh & Status */}
        <div className="flex items-center gap-3 self-stretch sm:self-auto justify-between sm:justify-end">
          <div className="text-right text-[11px] text-slate-400 hidden sm:block">
            <div>Sinkronisasi Terakhir:</div>
            <div className="font-mono text-slate-600 dark:text-slate-300 font-bold">{lastSyncTime} WIB</div>
          </div>

          <button
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="px-4 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm disabled:opacity-50"
            title="Segarkan data leaderboard dari cloud Firestore"
            id="btn-refresh-leaderboard"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-amber-500' : ''}`} />
            <span>{isRefreshing ? 'Menyinkronkan...' : 'Segarkan XP'}</span>
          </button>
        </div>
      </div>

      {/* Classroom Highlight Metric Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center flex-shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Total Siswa</div>
            <div className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">{totalStudents} Coder</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center flex-shrink-0">
            <Crown className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">XP Tertinggi</div>
            <div className="text-lg sm:text-xl font-black text-amber-500">{highestXp.toLocaleString()} XP</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center flex-shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Rata-Rata Kelas</div>
            <div className="text-lg sm:text-xl font-black text-cyan-600 dark:text-cyan-400">{averageXp.toLocaleString()} XP</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center flex-shrink-0 shadow-sm">
            #{currentUserEntry?.rank || '-'}
          </div>
          <div>
            <div className="text-[11px] font-bold text-amber-600 dark:text-amber-400">Peringkat Kamu</div>
            <div className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              {currentUserEntry?.rank ? `Ke-${currentUserEntry.rank} dari ${totalStudents}` : 'Menunggu XP'}
            </div>
          </div>
        </div>
      </div>

      {/* Podium Top 3 Visual Display */}
      {top1 && (
        <div className="relative pt-4 pb-2">
          <div className="text-center mb-6">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 shadow-md">
              👑 Podium Juara Kelas 👑
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-6 items-end max-w-2xl mx-auto">
            
            {/* Rank 2 (Perak / Silver) */}
            {top2 && (
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-2">
                  <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-slate-300 via-slate-100 to-slate-400 text-slate-900 flex items-center justify-center text-2xl sm:text-3xl font-bold shadow-lg border-2 border-slate-300">
                    {getAvatarData(top2.avatar).emoji}
                  </div>
                  <div className="absolute -top-3 -right-2 w-7 h-7 rounded-full bg-slate-200 border-2 border-white dark:border-slate-800 text-slate-800 flex items-center justify-center font-black text-xs shadow">
                    🥈 2
                  </div>
                  {top2.isCurrentUser && (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[9px] shadow">
                      Kamu
                    </span>
                  )}
                </div>

                <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate max-w-full px-1">
                  {top2.fullName}
                </div>
                <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 truncate max-w-full">
                  {top2.schoolOrClass?.split('/')[0] || 'Kelas Coding'}
                </div>
                <div className="text-xs sm:text-sm font-black text-indigo-500 mt-1">
                  {top2.xp.toLocaleString()} XP
                </div>

                {/* Pedestal 2 */}
                <div className="w-full mt-3 h-20 sm:h-24 rounded-t-2xl bg-gradient-to-b from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 border-t-2 border-slate-300 dark:border-slate-600 flex items-center justify-center text-slate-600 dark:text-slate-300 font-black text-xl sm:text-2xl shadow-inner">
                  2
                </div>
              </div>
            )}

            {/* Rank 1 (Emas / Gold) */}
            <div className="flex flex-col items-center text-center -mt-4">
              <div className="relative mb-2">
                <Crown className="w-7 h-7 sm:w-9 sm:h-9 text-amber-400 absolute -top-7 sm:-top-8 left-1/2 -translate-x-1/2 drop-shadow-md animate-bounce" />
                <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-amber-300 via-yellow-400 to-amber-500 text-slate-950 flex items-center justify-center text-3xl sm:text-4xl font-black shadow-xl shadow-amber-500/20 border-4 border-amber-200">
                  {getAvatarData(top1.avatar).emoji}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-amber-400 border-2 border-white dark:border-slate-800 text-slate-950 flex items-center justify-center font-black text-xs shadow-md">
                  🥇 1
                </div>
                {top1.isCurrentUser && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] shadow-md">
                    Kamu
                  </span>
                )}
              </div>

              <div className="font-black text-xs sm:text-base text-slate-900 dark:text-white truncate max-w-full px-1">
                {top1.fullName}
              </div>
              <div className="text-[10px] sm:text-xs text-amber-600 dark:text-amber-400 font-semibold truncate max-w-full">
                {top1.schoolOrClass?.split('/')[0] || 'Juara Coding'}
              </div>
              <div className="text-sm sm:text-base font-black text-amber-500 mt-1">
                {top1.xp.toLocaleString()} XP
              </div>

              {/* Pedestal 1 */}
              <div className="w-full mt-3 h-28 sm:h-32 rounded-t-2xl bg-gradient-to-b from-amber-400/30 to-amber-500/20 dark:from-amber-400/20 dark:to-amber-500/10 border-t-4 border-amber-400 flex items-center justify-center text-amber-500 font-black text-2xl sm:text-3xl shadow-inner">
                1
              </div>
            </div>

            {/* Rank 3 (Perunggu / Bronze) */}
            {top3 && (
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-2">
                  <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-amber-700 via-amber-600 to-amber-800 text-white flex items-center justify-center text-2xl sm:text-3xl font-bold shadow-lg border-2 border-amber-600">
                    {getAvatarData(top3.avatar).emoji}
                  </div>
                  <div className="absolute -top-3 -right-2 w-7 h-7 rounded-full bg-amber-700 border-2 border-white dark:border-slate-800 text-white flex items-center justify-center font-black text-xs shadow">
                    🥉 3
                  </div>
                  {top3.isCurrentUser && (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[9px] shadow">
                      Kamu
                    </span>
                  )}
                </div>

                <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate max-w-full px-1">
                  {top3.fullName}
                </div>
                <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 truncate max-w-full">
                  {top3.schoolOrClass?.split('/')[0] || 'Kelas Coding'}
                </div>
                <div className="text-xs sm:text-sm font-black text-amber-600 dark:text-amber-500 mt-1">
                  {top3.xp.toLocaleString()} XP
                </div>

                {/* Pedestal 3 */}
                <div className="w-full mt-3 h-16 sm:h-20 rounded-t-2xl bg-gradient-to-b from-amber-800/30 to-amber-900/20 dark:from-amber-800/20 dark:to-amber-900/10 border-t-2 border-amber-600 flex items-center justify-center text-amber-700 dark:text-amber-500 font-black text-xl sm:text-2xl shadow-inner">
                  3
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Floating Callout: User's Standing & Target to Climb */}
      {currentUserEntry && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-amber-500/10 to-indigo-500/5 border-2 border-amber-400/40 dark:border-amber-400/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-indigo-600 flex items-center justify-center text-2xl shadow-md flex-shrink-0">
              {getAvatarData(currentUserEntry.avatar).emoji}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Posisi Belajar Kamu
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-slate-950">
                  Peringkat #{currentUserEntry.rank}
                </span>
              </div>
              <div className="text-sm sm:text-base font-black text-slate-900 dark:text-white mt-0.5">
                {currentUserEntry.fullName} • {currentUserEntry.xp.toLocaleString()} XP
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {currentUserEntry.completedLevelIds.length} dari 20 Level Selesai ({getRankFromXp(currentUserEntry.xp).title})
              </p>
            </div>
          </div>

          {/* Motivational gap to next rank */}
          <div className="w-full sm:w-auto text-left sm:text-right border-t sm:border-t-0 border-slate-200 dark:border-slate-800 pt-3 sm:pt-0">
            {studentAhead ? (
              <div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Target Menyalip (#{studentAhead.rank}: {studentAhead.fullName}):
                </div>
                <div className="text-xs sm:text-sm font-black text-amber-600 dark:text-amber-400 flex items-center sm:justify-end gap-1">
                  <ArrowUp className="w-3.5 h-3.5 text-emerald-500" />
                  <span>+{Math.max(10, studentAhead.xp - currentUserEntry.xp + 10)} XP Lagi</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Selesaikan 1 kuis atau tantangan Scratch!
                </div>
              </div>
            ) : (
              <div className="text-emerald-500 font-black text-xs sm:text-sm flex items-center gap-1.5">
                <Crown className="w-4 h-4 text-amber-400" />
                <span>Kamu Memimpin Puncak Papan Peringkat! 🎉</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-2">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari teman sekelas atau nama sekolah..."
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
            id="input-search-leaderboard"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex-shrink-0">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterType === 'all'
                ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Semua ({mergedEntries.length})
          </button>
          <button
            onClick={() => setFilterType('top10')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterType === 'top10'
                ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Top 10 🏆
          </button>
          <button
            onClick={() => setFilterType('my_class')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterType === 'my_class'
                ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Kelas Saya
          </button>
        </div>
      </div>

      {/* Leaderboard Table / Cards List */}
      <div className="space-y-2.5">
        {filteredEntries.length === 0 ? (
          <div className="py-12 text-center text-slate-400 space-y-2">
            <Search className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600" />
            <p className="text-sm font-semibold">Tidak ditemukan siswa dengan kata kunci "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-amber-500 font-bold hover:underline"
            >
              Reset Pencarian
            </button>
          </div>
        ) : (
          filteredEntries.map((student) => {
            const rank = student.rank || 1;
            const isTop3 = rank <= 3;
            const rankData = getRankFromXp(student.xp);
            const avatar = getAvatarData(student.avatar);

            return (
              <motion.div
                key={student.studentId}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  student.isCurrentUser
                    ? 'bg-amber-400/10 border-amber-400/50 shadow-md ring-2 ring-amber-400/20'
                    : isTop3
                    ? 'bg-slate-50 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                    : 'bg-white dark:bg-slate-900/50 border-slate-200/60 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                }`}
              >
                
                {/* Left: Rank & Avatar & Info */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {/* Rank Number / Medal */}
                  <div className="w-8 sm:w-10 text-center flex-shrink-0">
                    {rank === 1 ? (
                      <span className="text-xl sm:text-2xl" title="Juara 1 Emas">🥇</span>
                    ) : rank === 2 ? (
                      <span className="text-xl sm:text-2xl" title="Juara 2 Perak">🥈</span>
                    ) : rank === 3 ? (
                      <span className="text-xl sm:text-2xl" title="Juara 3 Perunggu">🥉</span>
                    ) : (
                      <span className="font-mono font-black text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                        #{rank}
                      </span>
                    )}
                  </div>

                  {/* Avatar Icon */}
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-xl sm:text-2xl flex-shrink-0 shadow-sm ${
                    student.isCurrentUser
                      ? 'bg-gradient-to-tr from-amber-400 to-indigo-600 border border-amber-300'
                      : 'bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700'
                  }`}>
                    {avatar.emoji}
                  </div>

                  {/* Name & School */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className={`text-xs sm:text-sm font-black truncate ${
                        student.isCurrentUser ? 'text-amber-600 dark:text-amber-400' : 'text-slate-900 dark:text-white'
                      }`}>
                        {student.fullName}
                      </span>
                      {student.isCurrentUser && (
                        <span className="px-1.5 py-0.2 rounded-md bg-amber-400 text-slate-950 font-black text-[10px] tracking-tight">
                          Kamu
                        </span>
                      )}
                      <span className="hidden md:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {rankData.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      <span className="truncate">{student.schoolOrClass || 'Siswa Coding'}</span>
                      <span className="text-slate-300 dark:text-slate-600">•</span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-semibold flex-shrink-0">
                        {student.completedLevelIds.length} Modul Selesai
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: XP Score */}
                <div className="text-right flex-shrink-0 pl-2">
                  <div className="flex items-center justify-end gap-1 font-black text-sm sm:text-base text-amber-500">
                    <Zap className="w-4 h-4 fill-amber-500" />
                    <span>{student.xp.toLocaleString()}</span>
                    <span className="text-xs text-amber-600/70 font-semibold">XP</span>
                  </div>
                  <div className="text-[10px] text-slate-400 hidden sm:block">
                    Pangkat Lvl {rankData.level}
                  </div>
                </div>

              </motion.div>
            );
          })
        )}
      </div>

      {/* Motivational Bottom Bar */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>
            <strong>Cara Menambah XP:</strong> Kerjakan misi koding Scratch di silabus (+150 s/d +250 XP), jawab kuis evaluasi materi, dan raih trofi lencana!
          </span>
        </div>
        {onSelectLevel && (
          <button
            onClick={() => onSelectLevel(1)}
            className="text-amber-500 hover:text-amber-400 font-bold whitespace-nowrap cursor-pointer hover:underline"
          >
            Buka Silabus Level &rarr;
          </button>
        )}
      </div>

    </div>
  );
};
