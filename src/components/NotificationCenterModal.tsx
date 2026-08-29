import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, CheckCheck, Trash2, Clock, Sparkles, X, ArrowRight, Zap, RefreshCw, AlertCircle } from 'lucide-react';
import { InAppNotification, markAsRead, markAllAsRead, clearNotifications, simulateInactivity } from '../utils/notifications';

interface NotificationCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: InAppNotification[];
  onRefreshNotifications: () => void;
  onStart5MinSession: (targetLevelId?: number) => void;
  onTriggerSimulate2Days: () => void;
}

export const NotificationCenterModal: React.FC<NotificationCenterModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onRefreshNotifications,
  onStart5MinSession,
  onTriggerSimulate2Days
}) => {
  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkAllRead = () => {
    markAllAsRead();
    onRefreshNotifications();
  };

  const handleClearAll = () => {
    clearNotifications();
    onRefreshNotifications();
  };

  const handleItemClick = (n: InAppNotification) => {
    markAsRead(n.id);
    onRefreshNotifications();
    if (n.actionType === 'start_5min') {
      onStart5MinSession(n.targetLevelId);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6 bg-slate-950/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] mt-12 sm:mt-16 text-slate-900 dark:text-white"
      >
        {/* Header Bento */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-500 dark:text-amber-400 flex items-center justify-center font-bold">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>Notifikasi In-App</span>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-slate-950">
                    {unreadCount} Baru
                  </span>
                )}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Pengingat belajar & tantangan 5 menit
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Bar */}
        <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={handleMarkAllRead}
              className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Tandai Semua Dibaca</span>
            </button>
          </div>

          <button
            onClick={handleClearAll}
            className="text-[11px] text-slate-500 dark:text-slate-400 hover:text-rose-500 flex items-center gap-1 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Bersihkan</span>
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-slate-100 dark:divide-slate-800/60">
          {notifications.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mx-auto">
                <Bell className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Belum ada notifikasi baru</p>
              <p className="text-xs text-slate-400">Pengingat berkala akan muncul otomatis di sini.</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => handleItemClick(notif)}
                className={`pt-3 first:pt-0 p-3 rounded-2xl transition-all cursor-pointer ${
                  !notif.isRead
                    ? 'bg-amber-500/10 dark:bg-amber-500/5 border border-amber-500/20 hover:border-amber-500/40'
                    : 'bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/70 border border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                    notif.type === 'inactivity_2days'
                      ? 'bg-amber-400 text-slate-950'
                      : notif.type === 'session_complete'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-indigo-600 text-white'
                  }`}>
                    {notif.type === 'inactivity_2days' ? <Clock className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">
                        {notif.title}
                      </h4>
                      {!notif.isRead && (
                        <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {notif.message}
                    </p>

                    {notif.actionType === 'start_5min' && (
                      <div className="pt-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleItemClick(notif);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm"
                        >
                          <Zap className="w-3.5 h-3.5" />
                          <span>Mulai 5 Menit Coding Sekarang</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Quick Simulation & 5-min Button */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <button
            onClick={() => {
              onStart5MinSession();
              onClose();
            }}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <Clock className="w-4 h-4" />
            <span>Mulai Sesi Fokus 5 Menit (+50 XP)</span>
          </button>

          <button
            onClick={() => {
              onTriggerSimulate2Days();
              onClose();
            }}
            className="w-full py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-[11px] flex items-center justify-center gap-1.5 transition-all"
            title="Klik untuk mensimulasikan kondisi tidak berkunjung 2 hari dan memunculkan toast pengingat"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-500" />
            <span>⚡ Tes Notifikasi (Simulasi 2 Hari Belum Berkunjung)</span>
          </button>
        </div>

      </motion.div>
    </div>
  );
};
