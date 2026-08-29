import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Clock, X, ArrowRight, BellRing, Code, Zap } from 'lucide-react';
import { InAppNotification } from '../utils/notifications';

interface InAppNotificationToastProps {
  notification: InAppNotification | null;
  onClose: () => void;
  onStart5MinSession: (targetLevelId?: number) => void;
}

export const InAppNotificationToast: React.FC<InAppNotificationToastProps> = ({
  notification,
  onClose,
  onStart5MinSession
}) => {
  if (!notification) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        className="fixed bottom-6 right-4 sm:right-6 z-50 max-w-md w-full sm:w-[420px]"
      >
        <div className="relative rounded-3xl bg-slate-900/95 dark:bg-slate-900/95 text-white p-5 sm:p-6 border border-amber-400/40 shadow-2xl backdrop-blur-xl overflow-hidden">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Tutup Notifikasi"
            className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="relative z-10 flex items-start gap-3.5">
            
            {/* Bento Icon Badge */}
            <div className="w-11 h-11 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-400/20 font-black">
              <Clock className="w-5 h-5 animate-pulse" />
            </div>

            {/* Content */}
            <div className="flex-1 space-y-1.5 pr-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400/20 border border-amber-400/40 text-amber-300">
                  {notification.badge || 'Sesi 5 Menit'}
                </span>
                <span className="text-[11px] font-medium text-slate-400">
                  Pengingat Ramah
                </span>
              </div>

              <h4 className="text-sm sm:text-base font-black text-white tracking-tight leading-snug">
                {notification.title}
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed">
                {notification.message}
              </p>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-2">
                <button
                  onClick={() => {
                    onStart5MinSession(notification.targetLevelId);
                    onClose();
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-all shadow-md shadow-amber-400/20"
                >
                  <Zap className="w-3.5 h-3.5 text-slate-950" />
                  <span>Mulai Sesi 5 Menit Coding</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={onClose}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
                >
                  Nanti Dulu
                </button>
              </div>
            </div>
          </div>

          {/* Quick Motivational Footer */}
          <div className="relative z-10 mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Cukup 5 menit untuk menjaga daya ingat logika!</span>
            </span>
            <span className="text-amber-400 font-bold">+50 Bonus XP</span>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
};
