import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Play, Pause, RotateCcw, CheckCircle2, Zap, X, Minimize2, Maximize2, Sparkles } from 'lucide-react';

interface QuickTimerWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  onSessionComplete: () => void;
}

export const QuickTimerWidget: React.FC<QuickTimerWidgetProps> = ({
  isOpen,
  onClose,
  onSessionComplete
}) => {
  const TOTAL_SECONDS = 5 * 60; // 5 minutes (300 seconds)
  const [secondsRemaining, setSecondsRemaining] = useState(TOTAL_SECONDS);
  const [isRunning, setIsRunning] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining(prev => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0 && !isFinished) {
      setIsFinished(true);
      setIsRunning(false);
      onSessionComplete();
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsRemaining, isFinished, onSessionComplete]);

  if (!isOpen) return null;

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const progressPercent = ((TOTAL_SECONDS - secondsRemaining) / TOTAL_SECONDS) * 100;

  const handleReset = () => {
    setSecondsRemaining(TOTAL_SECONDS);
    setIsRunning(true);
    setIsFinished(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="fixed bottom-6 left-4 sm:left-6 z-50 select-none"
    >
      <div className="rounded-2xl bg-slate-900/95 border border-indigo-500/40 text-white shadow-2xl backdrop-blur-xl p-3.5 sm:p-4 max-w-xs w-72 overflow-hidden">
        
        {/* Top Header */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <span className="text-xs font-black tracking-tight text-white flex items-center gap-1">
              <span>⏱️ Sesi 5 Menit Coding</span>
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title={isMinimized ? "Perluas" : "Perkecil"}
            >
              {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Tutup Widget"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <div className="space-y-3">
            {/* Countdown Display */}
            <div className="flex items-center justify-between bg-slate-950/80 px-3.5 py-2.5 rounded-xl border border-slate-800">
              <div className="font-mono text-2xl font-black text-amber-400 tracking-wider">
                {formattedTime}
              </div>
              
              <div className="flex items-center gap-1.5">
                {!isFinished ? (
                  <>
                    <button
                      onClick={() => setIsRunning(!isRunning)}
                      className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-all"
                      title={isRunning ? "Jeda" : "Lanjutkan"}
                    >
                      {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={handleReset}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
                      title="Ulangi Timer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <div className="flex items-center gap-1 text-emerald-400 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Selesai!</span>
                  </div>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {isFinished ? (
              <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Hebat! Target 5 Menit Tercapai</span>
                </span>
                <span className="font-black text-amber-400">+50 XP</span>
              </div>
            ) : (
              <p className="text-[11px] text-slate-400 leading-snug">
                Fokus coba 1 logika blok Scratch atau selesaikan 1 misi latihan level.
              </p>
            )}
          </div>
        )}

      </div>
    </motion.div>
  );
};
