import { StudentProgress, UserSession, UserRole, XpHistoryItem } from '../types';
import { BADGES_DATA, SYLLABUS_DATA } from '../data/syllabus';

const PROGRESS_KEY = 'djuragan_coding_progress_v1';
const SESSION_KEY = 'djuragan_coding_session_v1';
const THEME_KEY = 'djuragan_coding_theme_v1';

export const ADMIN_PASSCODE = 'bajuri39';

export const DEFAULT_PROGRESS: StudentProgress = {
  unlockedLevelIds: [1],
  completedLevelIds: [],
  levelScores: {},
  xp: 0,
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedQuizzes: {},
  notes: {},
  unlockedBadges: [],
  lastStudiedLevelId: 1,
  lastStudiedDate: new Date().toISOString()
};

export const DEFAULT_SESSION: UserSession = {
  isAuthenticated: false,
  role: 'guest',
  studentName: 'Siswa Tamu',
  avatar: 'bot_neon',
  loginDate: new Date().toISOString()
};

export function loadProgress(): StudentProgress {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PROGRESS,
      ...parsed
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(progress: StudentProgress): void {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error('Failed to save progress to localStorage', err);
  }
}

export function loadSession(): UserSession {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return DEFAULT_SESSION;
    return JSON.parse(raw);
  } catch {
    return DEFAULT_SESSION;
  }
}

export function saveSession(session: UserSession): void {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch (err) {
    console.error('Failed to save session to localStorage', err);
  }
}

export function clearAllLocalData(): void {
  localStorage.removeItem(PROGRESS_KEY);
  localStorage.removeItem(SESSION_KEY);
}

export function loadSavedTheme(): 'dark' | 'light' {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  // default to dark mode for sleek coding vibe
  return 'dark';
}

export function saveSavedTheme(theme: 'dark' | 'light'): void {
  localStorage.setItem(THEME_KEY, theme);
}

export function checkAndAwardBadges(progress: StudentProgress): { updatedProgress: StudentProgress; newlyAwarded: string[] } {
  const currentBadges = new Set(progress.unlockedBadges);
  const newlyAwarded: string[] = [];

  // First step
  if (progress.completedLevelIds.length >= 1 && !currentBadges.has('first_step')) {
    currentBadges.add('first_step');
    newlyAwarded.push('first_step');
  }

  // Loop master (completed levels 2, 3, 4)
  if ([2, 3, 4].every(id => progress.completedLevelIds.includes(id)) && !currentBadges.has('loop_master')) {
    currentBadges.add('loop_master');
    newlyAwarded.push('loop_master');
  }

  // Game creator (completed level 5 or 9 or 12 or 20)
  if (progress.completedLevelIds.some(id => [5, 9, 12, 20].includes(id)) && !currentBadges.has('game_creator')) {
    currentBadges.add('game_creator');
    newlyAwarded.push('game_creator');
  }

  // Creative artist (completed level 8, 16, 17)
  if (progress.completedLevelIds.some(id => [8, 16, 17].includes(id)) && !currentBadges.has('creative_artist')) {
    currentBadges.add('creative_artist');
    newlyAwarded.push('creative_artist');
  }

  // Logic champion (completed level 10, 11)
  if (progress.completedLevelIds.includes(10) && progress.completedLevelIds.includes(11) && !currentBadges.has('logic_champion')) {
    currentBadges.add('logic_champion');
    newlyAwarded.push('logic_champion');
  }

  // Semester 1 complete (levels 1-10)
  const sem1All = Array.from({ length: 10 }, (_, i) => i + 1);
  if (sem1All.every(id => progress.completedLevelIds.includes(id)) && !currentBadges.has('semester_1_complete')) {
    currentBadges.add('semester_1_complete');
    newlyAwarded.push('semester_1_complete');
  }

  // Semester 2 complete (levels 11-20)
  const sem2All = Array.from({ length: 10 }, (_, i) => i + 11);
  if (sem2All.every(id => progress.completedLevelIds.includes(id)) && !currentBadges.has('semester_2_complete')) {
    currentBadges.add('semester_2_complete');
    newlyAwarded.push('semester_2_complete');
  }

  // Grandmaster (all 20 completed & 3000+ XP)
  if (progress.completedLevelIds.length === 20 && progress.xp >= 3000 && !currentBadges.has('grandmaster')) {
    currentBadges.add('grandmaster');
    newlyAwarded.push('grandmaster');
  }

  return {
    updatedProgress: {
      ...progress,
      unlockedBadges: Array.from(currentBadges)
    },
    newlyAwarded
  };
}

export function getRankFromXp(xp: number): { rank: string; title: string; level: number; nextLevelXp: number; progressPercent: number; icon: string } {
  if (xp < 250) {
    return { rank: 'Pemula', title: 'Novice Coder', level: 1, nextLevelXp: 250, progressPercent: Math.min(100, (xp / 250) * 100), icon: '🐣' };
  } else if (xp < 600) {
    return { rank: 'Pelajar', title: 'Apprentice Scripter', level: 2, nextLevelXp: 600, progressPercent: Math.min(100, ((xp - 250) / 350) * 100), icon: '💻' };
  } else if (xp < 1100) {
    return { rank: 'Kreator', title: 'Creative Animator', level: 3, nextLevelXp: 1100, progressPercent: Math.min(100, ((xp - 600) / 500) * 100), icon: '🎨' };
  } else if (xp < 1800) {
    return { rank: 'Pengembang', title: 'Junior Game Dev', level: 4, nextLevelXp: 1800, progressPercent: Math.min(100, ((xp - 1100) / 700) * 100), icon: '🎮' };
  } else if (xp < 2600) {
    return { rank: 'Spesialis', title: 'Logic Specialist', level: 5, nextLevelXp: 2600, progressPercent: Math.min(100, ((xp - 1800) / 800) * 100), icon: '⚡' };
  } else if (xp < 3600) {
    return { rank: 'Arsitek', title: 'Scratch Architect', level: 6, nextLevelXp: 3600, progressPercent: Math.min(100, ((xp - 2600) / 1000) * 100), icon: '🏗️' };
  } else if (xp < 5000) {
    return { rank: 'Pionir', title: 'AI & Code Pioneer', level: 7, nextLevelXp: 5000, progressPercent: Math.min(100, ((xp - 3600) / 1400) * 100), icon: '🚀' };
  } else {
    return { rank: 'Mahaguru', title: 'DJuragan Grandmaster', level: 8, nextLevelXp: 5000, progressPercent: 100, icon: '👑' };
  }
}

/**
 * Menghitung Level ID yang tepat untuk dilanjutkan (Resume) oleh siswa.
 * Memastikan siswa tidak kembali ke awal (Level 1) melainkan melanjutkan dari materi terakhir yang dipelajari.
 */
export function getResumeLevelId(progress: StudentProgress, role: UserRole): number {
  if (role === 'guest') return 1;

  // 1. Jika ada catatan level terakhir yang sedang dipelajari dan level tersebut valid & terbuka
  if (
    typeof progress.lastStudiedLevelId === 'number' &&
    progress.lastStudiedLevelId >= 1 &&
    progress.lastStudiedLevelId <= 20 &&
    (role === 'admin' || progress.unlockedLevelIds.includes(progress.lastStudiedLevelId) || progress.lastStudiedLevelId === 1)
  ) {
    return progress.lastStudiedLevelId;
  }

  // 2. Jika tidak ada lastStudiedLevelId, cari level pertama yang SUDAH TERBUKA tetapi BELUM SELESAI
  const firstIncompleteUnlocked = SYLLABUS_DATA.find(
    (lvl) =>
      (progress.unlockedLevelIds.includes(lvl.id) || role === 'admin' || lvl.id === 1) &&
      !progress.completedLevelIds.includes(lvl.id)
  );
  if (firstIncompleteUnlocked) {
    return firstIncompleteUnlocked.id;
  }

  // 3. Jika semua level yang terbuka sudah selesai, ambil level terbuka tertinggi berikutnya
  if (progress.unlockedLevelIds && progress.unlockedLevelIds.length > 0) {
    const highestUnlocked = Math.max(...progress.unlockedLevelIds);
    return Math.min(20, Math.max(1, highestUnlocked));
  }

  // 4. Default aman: level 1
  return 1;
}

/**
 * Format tanggal ringkas (contoh: '28 Agu', '02 Sep')
 */
export function formatShortDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const day = String(d.getDate()).padStart(2, '0');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    return `${day} ${months[d.getMonth()]}`;
  } catch {
    return dateStr;
  }
}

/**
 * Mengambil histori perolehan XP siswa. Jika belum tercatat sebelumnya,
 * bangun histori kronologis yang realistis berdasarkan level yang sudah diselesaikan dan streak.
 */
export function getEffectiveXpHistory(progress: StudentProgress): XpHistoryItem[] {
  if (progress.xpHistory && progress.xpHistory.length > 0) {
    return [...progress.xpHistory].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  const now = new Date();
  const history: XpHistoryItem[] = [];

  if (progress.xp === 0) {
    // Siswa baru dengan 0 XP: Tampilkan 7 hari baseline terakhir
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const iso = d.toISOString();
      history.push({
        date: iso,
        label: formatShortDate(iso),
        xpGain: 0,
        cumulativeXp: 0,
        activityTitle: i === 0 ? 'Siap Memulai Misi Pertama' : 'Persiapan Belajar'
      });
    }
    return history;
  }

  // Jika siswa sudah memiliki XP (misal dari level selesai atau akun yang sudah ada):
  // Rangkum kronologis penyebaran XP secara bertahap
  const totalXp = progress.xp;
  const numSteps = Math.min(8, Math.max(4, progress.completedLevelIds.length + 1));
  let runningXp = 0;

  for (let i = numSteps - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - (i * 2));
    const iso = d.toISOString();
    
    let stepGain = 0;
    if (i === numSteps - 1) {
      stepGain = Math.round(totalXp * 0.25);
    } else if (i === 0) {
      stepGain = Math.max(0, totalXp - runningXp);
    } else {
      const fraction = (totalXp * 0.75) / (numSteps - 1);
      stepGain = Math.round(fraction);
    }

    runningXp += stepGain;
    if (runningXp > totalXp) runningXp = totalXp;

    const completedLevelId = progress.completedLevelIds[numSteps - 1 - i];
    const lvlObj = completedLevelId ? SYLLABUS_DATA.find(l => l.id === completedLevelId) : null;
    const title = lvlObj 
      ? `Selesai Level #${lvlObj.id}: ${lvlObj.title}`
      : (i === 0 ? 'Latihan & Kuis Terbaru' : 'Eksplorasi Modul Scratch');

    history.push({
      date: iso,
      label: formatShortDate(iso),
      xpGain: stepGain,
      cumulativeXp: runningXp,
      activityTitle: title
    });
  }

  // Pastikan titik terakhir sama persis dengan XP saat ini
  if (history.length > 0) {
    history[history.length - 1].cumulativeXp = totalXp;
  }

  return history;
}

/**
 * Mencatat perolehan XP baru ke histori progres siswa
 */
export function recordXpGain(
  progress: StudentProgress,
  xpGain: number,
  activityTitle: string
): StudentProgress {
  const now = new Date();
  const dateStr = now.toISOString();
  const label = formatShortDate(dateStr);
  const newTotalXp = progress.xp + xpGain;

  const existingHistory = getEffectiveXpHistory(progress);
  const newItem: XpHistoryItem = {
    date: dateStr,
    label,
    xpGain,
    cumulativeXp: newTotalXp,
    activityTitle
  };

  return {
    ...progress,
    xp: newTotalXp,
    xpHistory: [...existingHistory, newItem]
  };
}

