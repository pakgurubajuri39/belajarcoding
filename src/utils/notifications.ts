export interface InAppNotification {
  id: string;
  type: 'inactivity_2days' | 'streak' | 'xp' | 'tip' | 'session_complete';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionType?: 'start_5min' | 'open_level' | 'open_scratch';
  targetLevelId?: number;
  badge?: string;
}

const LAST_VISIT_KEY = 'sobat_coding_last_visit_timestamp';
const FALLBACK_LAST_VISIT_KEY = 'sobat_koding_last_visit_timestamp';
const LEGACY_LAST_VISIT_KEY = 'djuragan_last_visit_timestamp';
const NOTIFICATIONS_KEY = 'sobat_coding_inapp_notifications_v1';
const FALLBACK_NOTIFICATIONS_KEY = 'sobat_koding_inapp_notifications_v1';
const LEGACY_NOTIFICATIONS_KEY = 'djuragan_inapp_notifications_v1';
const FIVE_MIN_SESSION_KEY = 'sobat_coding_5min_session_v1';

export function getLastVisitTime(): number | null {
  try {
    const raw = localStorage.getItem(LAST_VISIT_KEY) || localStorage.getItem(FALLBACK_LAST_VISIT_KEY) || localStorage.getItem(LEGACY_LAST_VISIT_KEY);
    return raw ? parseInt(raw, 10) : null;
  } catch {
    return null;
  }
}

export function updateLastVisitTime(customTime?: number): void {
  try {
    const time = customTime ?? Date.now();
    localStorage.setItem(LAST_VISIT_KEY, time.toString());
  } catch (err) {
    console.error('Failed to save last visit time', err);
  }
}

/**
 * Checks if user hasn't visited in 2 days (>= 48 hours).
 */
export function checkInactivityStatus(): { isInactive2Days: boolean; daysInactive: number } {
  const lastVisit = getLastVisitTime();
  const now = Date.now();

  if (!lastVisit) {
    // First time user, record visit time and return false
    updateLastVisitTime(now);
    return { isInactive2Days: false, daysInactive: 0 };
  }

  const diffMs = now - lastVisit;
  const diffHours = diffMs / (1000 * 60 * 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours >= 48) {
    return { isInactive2Days: true, daysInactive: diffDays || 2 };
  }

  return { isInactive2Days: false, daysInactive: diffDays };
}

export function simulateInactivity(daysAgo = 2.5): void {
  const pastTime = Date.now() - (daysAgo * 24 * 60 * 60 * 1000);
  updateLastVisitTime(pastTime);
}

export function getStoredNotifications(): InAppNotification[] {
  try {
    const raw = localStorage.getItem(NOTIFICATIONS_KEY) || localStorage.getItem(FALLBACK_NOTIFICATIONS_KEY) || localStorage.getItem(LEGACY_NOTIFICATIONS_KEY);
    if (!raw) {
      // Default welcoming notification
      return [
        {
          id: 'welcome_notif',
          type: 'tip',
          title: 'Selamat Datang di Sobat Coding! 🚀',
          message: 'Selesaikan 20 Level Scratch & AI untuk meraih Sertifikat Kelulusan dan XP tertinggi.',
          timestamp: new Date().toISOString(),
          isRead: false,
          badge: 'Tips'
        }
      ];
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveStoredNotifications(notifs: InAppNotification[]): void {
  try {
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifs));
  } catch (err) {
    console.error('Failed to save notifications', err);
  }
}

export function addNotification(notification: Omit<InAppNotification, 'id' | 'timestamp' | 'isRead'>): InAppNotification {
  const notifs = getStoredNotifications();
  const newNotif: InAppNotification = {
    ...notification,
    id: 'notif_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
    timestamp: new Date().toISOString(),
    isRead: false
  };

  const updated = [newNotif, ...notifs].slice(0, 20); // Keep last 20
  saveStoredNotifications(updated);
  return newNotif;
}

export function markAsRead(id: string): void {
  const notifs = getStoredNotifications();
  const updated = notifs.map(n => n.id === id ? { ...n, isRead: true } : n);
  saveStoredNotifications(updated);
}

export function markAllAsRead(): void {
  const notifs = getStoredNotifications();
  const updated = notifs.map(n => ({ ...n, isRead: true }));
  saveStoredNotifications(updated);
}

export function clearNotifications(): void {
  localStorage.removeItem(NOTIFICATIONS_KEY);
}
