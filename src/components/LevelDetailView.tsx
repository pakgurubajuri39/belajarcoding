import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  BookOpen, CheckCircle2, ChevronLeft, ChevronRight, Sparkles, HelpCircle,
  Play, Laptop, Award, ArrowRight, Lightbulb, Code2, AlertTriangle, MessageSquare,
  Check, X, Target, Wrench, FileText, CheckSquare, Square, Save, RotateCcw, Share2, Compass,
  ExternalLink, FolderDown, Lock
} from 'lucide-react';
import { SyllabusLevel, StudentProgress, UserSession, BlockLine } from '../types';
import { ScratchEmbed } from './ScratchEmbed';

interface LevelDetailViewProps {
  level: SyllabusLevel;
  progress: StudentProgress;
  session: UserSession;
  onCompleteLevel: (levelId: number, scorePercentage: number) => void;
  onNextLevel: () => void;
  onPrevLevel: () => void;
  onBackToSyllabus: () => void;
  onSaveNote?: (levelId: number, note: string) => void;
  onOpenLoginModal?: () => void;
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string; badge: string }> = {
  Events: { bg: 'bg-amber-500/10 dark:bg-amber-500/20', text: 'text-amber-600 dark:text-amber-400', border: 'border-amber-500/40', badge: 'bg-[#FFBF00] text-slate-950' },
  Control: { bg: 'bg-orange-500/10 dark:bg-orange-500/20', text: 'text-orange-600 dark:text-orange-400', border: 'border-orange-500/40', badge: 'bg-[#FFAB19] text-slate-950' },
  Motion: { bg: 'bg-blue-500/10 dark:bg-blue-500/20', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-500/40', badge: 'bg-[#4C97FF] text-white' },
  Looks: { bg: 'bg-purple-500/10 dark:bg-purple-500/20', text: 'text-purple-600 dark:text-purple-400', border: 'border-purple-500/40', badge: 'bg-[#9966FF] text-white' },
  Sound: { bg: 'bg-pink-500/10 dark:bg-pink-500/20', text: 'text-pink-600 dark:text-pink-400', border: 'border-pink-500/40', badge: 'bg-[#CF63CF] text-white' },
  Sensing: { bg: 'bg-cyan-500/10 dark:bg-cyan-500/20', text: 'text-cyan-600 dark:text-cyan-400', border: 'border-cyan-500/40', badge: 'bg-[#5CB1D6] text-slate-950' },
  Operators: { bg: 'bg-emerald-500/10 dark:bg-emerald-500/20', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-500/40', badge: 'bg-[#59C059] text-white' },
  Variables: { bg: 'bg-amber-600/10 dark:bg-amber-600/20', text: 'text-amber-700 dark:text-amber-300', border: 'border-amber-600/40', badge: 'bg-[#FF8C1A] text-white' },
  Pen: { bg: 'bg-teal-500/10 dark:bg-teal-500/20', text: 'text-teal-600 dark:text-teal-400', border: 'border-teal-500/40', badge: 'bg-[#0FBD8C] text-white' },
  'My Blocks': { bg: 'bg-rose-500/10 dark:bg-rose-500/20', text: 'text-rose-600 dark:text-rose-400', border: 'border-rose-500/40', badge: 'bg-[#FF6680] text-white' },
  Custom: { bg: 'bg-slate-500/10 dark:bg-slate-500/20', text: 'text-slate-600 dark:text-slate-400', border: 'border-slate-500/40', badge: 'bg-slate-700 text-white' }
};

export const LevelDetailView: React.FC<LevelDetailViewProps> = ({
  level,
  progress,
  session,
  onCompleteLevel,
  onNextLevel,
  onPrevLevel,
  onBackToSyllabus,
  onSaveNote,
  onOpenLoginModal
}) => {
  const isCompleted = progress.completedLevelIds.includes(level.id);
  const isTrial = session.role === 'guest' || session.role === 'trial';

  // Active sub-tab: 'mission' | 'scratch' | 'split' | 'quiz'
  const [activeTab, setActiveTab] = useState<'mission' | 'scratch' | 'split' | 'quiz'>('mission');

  // Interactive step completion checkboxes (local state per level)
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  // Active step index
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Student personal notes state
  const [noteText, setNoteText] = useState(progress.notes?.[level.id] || '');
  const [isNoteSaved, setIsNoteSaved] = useState(false);

  useEffect(() => {
    setNoteText(progress.notes?.[level.id] || '');
    setQuizSubmitted(false);
    setSelectedAnswers({});
    setCurrentStepIndex(0);
    setCompletedSteps({});
  }, [level.id, progress.notes]);

  // Jika akun trial mencoba membuka level selain Level 1, tampilkan layar terkunci khusus trial
  if (isTrial && level.id > 1) {
    return (
      <div className="py-16 px-4 max-w-xl mx-auto text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-amber-500/20 text-amber-500 flex items-center justify-center mx-auto shadow-xl border border-amber-500/30 animate-pulse">
          <Lock className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-400/20 text-amber-600 dark:text-amber-400 border border-amber-400/40 uppercase tracking-wider inline-block">
            Batas Akses Akun Trial
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Level {level.id} Terkunci
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-md mx-auto">
            Akun uji coba (trial) hanya dapat membuka <strong>Level 1: Mengenal Bagian Menu Scratch</strong>. Untuk melanjutkan ke Level {level.id} hingga Level 20 dan membuka materi resmi lainnya, silakan masukkan kode akses siswa atau daftar sekarang.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={onBackToSyllabus}
            className="px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 text-xs font-bold transition-all cursor-pointer"
          >
            ← Kembali ke Silabus
          </button>
          {onOpenLoginModal && (
            <button
              onClick={onOpenLoginModal}
              className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black shadow-lg shadow-amber-400/20 transition-all cursor-pointer flex items-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Buka Akses Siswa Resmi</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  const handleToggleStep = (stepNumber: number) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepNumber]: !prev[stepNumber]
    }));
  };

  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }));
  };

  const handleFinishQuiz = () => {
    setQuizSubmitted(true);
    let correctCount = 0;
    level.quizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswerIndex) {
        correctCount++;
      }
    });

    const scorePercentage = Math.round((correctCount / level.quizQuestions.length) * 100);

    // Confetti celebration
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    onCompleteLevel(level.id, scorePercentage);
  };

  const handleMarkLevelCompletedDirectly = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
    onCompleteLevel(level.id, 100);
  };

  const handleSaveStudentNote = () => {
    if (onSaveNote) {
      onSaveNote(level.id, noteText);
    }
    setIsNoteSaved(true);
    setTimeout(() => setIsNoteSaved(false), 2500);
  };

  const allStepsDone = level.missionSteps.every(s => completedSteps[s.stepNumber]);

  return (
    <div className="space-y-6 pb-20">
      
      {/* Top Header Navigation & Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <button
          onClick={onBackToSyllabus}
          id="btn-back-to-syllabus"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Kembali ke Silabus 20 Level</span>
        </button>

        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between sm:justify-end">
          <button
            onClick={onPrevLevel}
            disabled={level.id === 1}
            id="btn-prev-level"
            className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 disabled:opacity-30 text-xs font-bold flex items-center gap-1.5 hover:border-slate-400 transition-all shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Level {level.id - 1}</span>
          </button>

          <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-black text-slate-700 dark:text-slate-300">
            Modul {level.id} / 20
          </span>

          {isTrial ? (
            <button
              onClick={onOpenLoginModal}
              id="btn-next-level"
              className="px-3 py-2 rounded-xl bg-amber-400/20 hover:bg-amber-400 border border-amber-400/40 text-amber-700 hover:text-slate-950 dark:text-amber-300 dark:hover:text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              title="Level 2 terkunci untuk akun trial. Klik untuk memasukkan kode akses siswa resmi."
            >
              <Lock className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">Buka Level 2</span>
            </button>
          ) : (
            <button
              onClick={onNextLevel}
              disabled={level.id === 20}
              id="btn-next-level"
              className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 disabled:opacity-30 text-xs font-bold flex items-center gap-1.5 hover:border-slate-400 transition-all shadow-sm cursor-pointer"
            >
              <span className="hidden sm:inline">Level {level.id + 1}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Level Summary Bento Banner */}
      <div className="relative rounded-3xl bg-slate-900/95 dark:bg-slate-900/80 border border-slate-800 p-6 sm:p-8 text-white backdrop-blur-md shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-sm shadow-md">
                {level.id < 10 ? `0${level.id}` : level.id}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-500/20 border border-indigo-500/30 text-indigo-300">
                Semester {level.semester === 1 ? 'Ganjil' : 'Genap'} • Modul #{level.semesterLevel}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 border border-slate-700 text-slate-300">
                {level.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800/80 border border-slate-700 text-slate-300 flex items-center gap-1">
                ⏱️ {level.allocation}
              </span>
              {isCompleted && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Selesai Dikuasai</span>
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
              {level.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              {level.summary}
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-2.5">
              {level.driveMaterialUrl && (
                <a
                  href={level.driveMaterialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-md shadow-amber-500/20 transition-all transform active:scale-95"
                >
                  <FolderDown className="w-4 h-4" />
                  <span>Buka Modul di Google Drive</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {isCompleted ? (
                <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 font-bold text-xs shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Modul Selesai Dikerjakan ✓</span>
                </div>
              ) : (
                <button
                  onClick={handleMarkLevelCompletedDirectly}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-xs shadow-md shadow-emerald-500/25 transition-all transform active:scale-95 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Tandai Selesai Mengerjakan (+{level.xpReward} XP)</span>
                </button>
              )}
            </div>
          </div>

          <div className="flex-shrink-0 flex flex-col items-center justify-center p-5 rounded-2xl bg-white/5 border border-white/10 text-center min-w-[140px] shadow-inner">
            <span className="text-[11px] text-amber-300 font-bold uppercase tracking-wider">Hadiah Capaian</span>
            <span className="text-3xl sm:text-4xl font-black text-amber-400 mt-1">+{level.xpReward}</span>
            <span className="text-[10px] text-slate-400 font-mono">Real XP Points</span>
          </div>
        </div>

        {/* Competency & Topic Matrix */}
        <div className="relative z-10 mt-6 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1.5">
            <span className="text-indigo-400 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Topik Pembahasan Silabus:</span>
            </span>
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {level.topics.map((t, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-800/90 border border-slate-700 text-slate-200 font-semibold text-[11px]">
                  • {t}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5" />
              <span>Indikator Capaian Belajar:</span>
            </span>
            <p className="text-slate-300 italic pt-0.5 leading-relaxed bg-slate-800/40 p-2.5 rounded-xl border border-slate-800">
              "{level.indicator}"
            </p>
          </div>
        </div>
      </div>

      {/* Main View Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-1 overflow-x-auto p-0.5">
          <button
            onClick={() => setActiveTab('mission')}
            id="tab-materi-panduan"
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'mission'
                ? 'bg-amber-400 text-slate-950 font-black shadow-md shadow-amber-400/20'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Materi Lengkap & Panduan</span>
          </button>

          <button
            onClick={() => setActiveTab('scratch')}
            id="tab-scratch-studio"
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'scratch'
                ? 'bg-indigo-600 text-white font-black shadow-md shadow-indigo-600/20'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Laptop className="w-4 h-4" />
            <span>Studio Scratch</span>
          </button>

          <button
            onClick={() => setActiveTab('split')}
            id="tab-layar-berdampingan"
            className={`hidden lg:flex px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold items-center gap-2 transition-all ${
              activeTab === 'split'
                ? 'bg-indigo-600 text-white font-black shadow-md shadow-indigo-600/20'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Layar Berdampingan</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            id="tab-kuis-klaim"
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'quiz'
                ? 'bg-emerald-600 text-white font-black shadow-md shadow-emerald-600/20'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Kuis & Klaim XP</span>
          </button>
        </div>

        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 px-3 py-1">
          <span>Tersusun Rinci & Bersih</span>
        </div>
      </div>

      {/* ================================================================ */}
      {/* TAB 1: FULL LEARNING MATERIALS & GUIDANCE                       */}
      {/* ================================================================ */}
      {activeTab === 'mission' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* LEFT 2 COLUMNS: CORE TUTORIAL & STEP-BY-STEP MISSIONS */}
          <div className="lg:col-span-2 space-y-6">

            {/* 1. Learning Objectives (Tujuan Pembelajaran) */}
            {level.learningGoals && level.learningGoals.length > 0 && (
              <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-3">
                <div className="flex items-center gap-2.5 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                  <Target className="w-5 h-5" />
                  <span>Tujuan Pembelajaran Khusus</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {level.learningGoals.map((goal, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed font-medium">{goal}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Computational Thinking Concept Card */}
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-3">
              <div className="flex items-center gap-2.5 text-amber-600 dark:text-amber-400 font-bold text-sm">
                <Lightbulb className="w-5 h-5" />
                <span>Konsep Logika & Computational Thinking</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {level.conceptExplanation}
              </p>
            </div>

            {/* Official Google Drive Learning Material & Supplementary Resources */}
            {(level.driveMaterialUrl || (level.resources && level.resources.length > 0)) && (
              <div className="rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950 border border-indigo-500/40 p-6 shadow-lg text-white space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-500/30 pb-3">
                  <div className="flex items-center gap-2.5 text-amber-400 font-bold text-sm">
                    <FolderDown className="w-5 h-5 text-amber-400" />
                    <span>Modul Pembelajaran Resmi (Google Drive / Video)</span>
                  </div>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20 font-bold self-start sm:self-auto">
                    Materi Sesuai Silabus
                  </span>
                </div>

                {level.driveMaterialUrl && (
                  <div className="p-4 rounded-2xl bg-indigo-900/40 border border-indigo-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-mono font-black text-[10px]">
                          MODUL UTAMA LEVEL {level.id}
                        </span>
                        <h4 className="text-sm font-black text-white">
                          {level.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-300">
                        Buka dokumen panduan asli di Google Drive untuk dibaca bersama instruktur atau dipelajari mandiri.
                      </p>
                    </div>

                    <a
                      href={level.driveMaterialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-2 shadow-md shadow-amber-400/20 flex-shrink-0 transition-all transform active:scale-95"
                    >
                      <span>Buka Google Drive</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}

                {/* Supplementary resources list */}
                {level.resources && level.resources.length > 0 && (
                  <div className="space-y-2.5 pt-2">
                    <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
                      Modul Terkait & Bahan Pendukung Level Ini:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {level.resources.map((res) => (
                        <div
                          key={res.id}
                          className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between gap-3 hover:border-indigo-400/50 transition-colors"
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 mb-1">
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-300 font-mono font-bold">
                                #{res.id}
                              </span>
                              <span className={`text-[10px] font-bold ${
                                res.type === 'youtube' ? 'text-rose-400' : res.type === 'worksheet' ? 'text-emerald-400' : 'text-amber-400'
                              }`}>
                                {res.type === 'youtube' ? 'Video' : res.type === 'worksheet' ? 'Worksheet' : 'Dokumen'}
                              </span>
                            </div>
                            <h5 className="text-xs font-bold text-white truncate" title={res.title}>
                              {res.title}
                            </h5>
                          </div>

                          <a
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white flex-shrink-0 transition-colors"
                            title={`Buka ${res.title}`}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. Visual Scratch Pseudocode Block Preview */}
            {level.scriptPseudocode && level.scriptPseudocode.length > 0 && (
              <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-slate-900 dark:text-white font-bold text-sm">
                    <Code2 className="w-5 h-5 text-indigo-500" />
                    <span>Susunan Blok Kode Skrip Scratch</span>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold">
                    Scratch 3.0 Syntax
                  </span>
                </div>

                <div className="space-y-4">
                  {level.scriptPseudocode.map((pseudo, pIdx) => (
                    <div key={pIdx} className="rounded-2xl bg-slate-950 text-slate-100 p-4 sm:p-5 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                        <span className="text-xs font-bold text-amber-400">{pseudo.title}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                          Target: {pseudo.spriteName}
                        </span>
                      </div>

                      {/* Visual Scratch Blocks Display */}
                      <div className="space-y-1.5 font-mono text-xs pt-1">
                        {pseudo.codeBlocks.map((block, bIdx) => {
                          const catColor = CATEGORY_COLORS[block.category] || CATEGORY_COLORS.Custom;
                          const indentClass = block.indent === 1 ? 'ml-5 border-l-2 border-slate-700 pl-2' : block.indent === 2 ? 'ml-10 border-l-2 border-slate-700 pl-2' : '';
                          return (
                            <div key={bIdx} className={`${indentClass} flex items-center gap-2 py-0.5`}>
                              <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold shadow-sm inline-block ${catColor.badge}`}>
                                {block.text}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      <p className="text-[11px] text-slate-400 italic pt-2 border-t border-slate-800/80 leading-relaxed">
                        ℹ️ {pseudo.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Interactive Step-by-step Mission Guide */}
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Play className="w-4 h-4 text-cyan-500" />
                  <span>Tahapan Misi Praktik Terstruktur</span>
                </h3>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {Object.values(completedSteps).filter(Boolean).length} / {level.missionSteps.length} Selesai
                </span>
              </div>

              <div className="space-y-3.5">
                {level.missionSteps.map((step, idx) => {
                  const isStepDone = completedSteps[step.stepNumber];
                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border transition-all ${
                        isStepDone
                          ? 'bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/30'
                          : currentStepIndex === idx
                          ? 'bg-amber-500/5 dark:bg-amber-500/10 border-amber-500/40 shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
                      }`}
                      onClick={() => setCurrentStepIndex(idx)}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleStep(step.stepNumber);
                          }}
                          className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                            isStepDone
                              ? 'bg-emerald-500 text-white font-bold'
                              : 'bg-amber-400 text-slate-950 font-black text-xs'
                          }`}
                        >
                          {isStepDone ? <Check className="w-4 h-4" /> : step.stepNumber}
                        </button>

                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">{step.title}</h4>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleStep(step.stepNumber);
                              }}
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-md transition-colors ${
                                isStepDone
                                  ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950'
                                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
                              }`}
                            >
                              {isStepDone ? '✓ Dipraktikkan' : 'Tandai Selesai'}
                            </button>
                          </div>

                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{step.instruction}</p>

                          {step.blockGuide && (
                            <div className="inline-block mt-1 px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-950 font-mono text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold border border-slate-300 dark:border-slate-800">
                              🧩 {step.blockGuide}
                            </div>
                          )}

                          {step.hint && (
                            <div className="text-[11px] text-amber-600 dark:text-amber-400 font-medium flex items-center gap-1 mt-1">
                              <span>💡 Tips: {step.hint}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Trigger to Scratch Studio */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800/80">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {allStepsDone ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Semua langkah praktik telah ditandai!
                    </span>
                  ) : (
                    <span>Klik "Tandai Selesai" pada setiap langkah saat mencobanya di Scratch.</span>
                  )}
                </div>

                <button
                  onClick={() => setActiveTab('scratch')}
                  id="btn-open-scratch-from-mission"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-cyan-500/20 transition-all"
                >
                  <Laptop className="w-4 h-4" />
                  <span>Buka Studio Scratch & Uji Sekarang</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 5. Troubleshooting & Debugging Tips */}
            {level.troubleshootingTips && level.troubleshootingTips.length > 0 && (
              <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-3.5">
                <div className="flex items-center gap-2.5 text-rose-600 dark:text-rose-400 font-bold text-sm">
                  <Wrench className="w-5 h-5" />
                  <span>Pojok Debugging & Mengatasi Masalah Siswa</span>
                </div>
                <div className="space-y-2.5">
                  {level.troubleshootingTips.map((tip, tIdx) => (
                    <div key={tIdx} className="p-3.5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 text-xs space-y-1.5">
                      <div className="flex items-center gap-1.5 font-bold text-rose-700 dark:text-rose-300">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                        <span>Masalah: {tip.problem}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 pl-5 leading-relaxed">
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">Solusi: </span>
                        {tip.solution}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. Creative Challenge Card */}
            <div className="rounded-3xl bg-gradient-to-br from-indigo-950 to-slate-900 border border-indigo-500/30 p-6 text-white shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>{level.challenge.title}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-400 text-slate-950 shadow-sm">
                  Bonus +{level.challenge.bonusXp} XP
                </span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">{level.challenge.description}</p>
              <div className="space-y-1 pt-1 border-t border-indigo-900/80">
                <span className="text-[11px] text-indigo-300 font-semibold">Petunjuk Kreatif:</span>
                <ul className="text-xs text-slate-300 list-disc list-inside space-y-0.5">
                  {level.challenge.tips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* RIGHT 1 COLUMN: KEY BLOCKS PALETTE & SUMMARY & NOTES */}
          <div className="space-y-6">
            
            {/* Key Blocks Palette */}
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-amber-500" />
                  <span>Kamus Blok Kunci</span>
                </h3>
                <span className="text-[10px] text-slate-400 font-medium">Kategori Lengkap</span>
              </div>

              <div className="space-y-3">
                {level.keyBlocks.map((block, idx) => {
                  const catColor = CATEGORY_COLORS[block.category] || CATEGORY_COLORS.Custom;
                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span
                          className="px-2.5 py-0.5 rounded-md text-[10px] font-bold text-white shadow-sm font-mono max-w-[190px] truncate"
                          style={{ backgroundColor: block.color }}
                        >
                          {block.name}
                        </span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${catColor.bg} ${catColor.text}`}>
                          {block.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {block.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Summary Points Takeaway Card */}
            {level.summaryPoints && level.summaryPoints.length > 0 && (
              <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-emerald-500" />
                  <span>Rangkuman Inti Modul</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  {level.summaryPoints.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Student Personal Notes Scratchpad */}
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-indigo-500" />
                  <span>Catatan Belajar Siswa</span>
                </h4>
                {isNoteSaved && (
                  <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Tersimpan
                  </span>
                )}
              </div>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Tuliskan catatan, ide proyek, atau kendala yang kamu temukan di level ini..."
                rows={4}
                className="w-full text-xs p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none leading-relaxed"
              />
              <button
                onClick={handleSaveStudentNote}
                className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Simpan Catatan Level Ini</span>
              </button>
            </div>

            {/* Quick Practice & Quiz CTA */}
            <div className="rounded-3xl bg-amber-500/10 border border-amber-500/30 p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center mx-auto text-xl font-bold shadow-md shadow-amber-500/20">
                🎯
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Siap Menguji Pemahaman?</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Kerjakan kuis singkat untuk menyelesaikan modul ini dan klaim hadiah <strong>+{level.xpReward} Real XP</strong>!
              </p>
              <button
                onClick={() => setActiveTab('quiz')}
                id="btn-goto-quiz-cta"
                className="w-full py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-all"
              >
                Mulai Kuis Level Ini
              </button>
            </div>

          </div>

        </div>
      )}

      {/* ================================================================ */}
      {/* TAB 2: EMBEDDED SCRATCH EDITOR ONLY                              */}
      {/* ================================================================ */}
      {activeTab === 'scratch' && (
        <div className="space-y-4">
          <ScratchEmbed
            currentLevelTitle={`Level ${level.id}: ${level.title}`}
            tutorialUrl={level.scratchTutorialUrl || 'https://scratch.mit.edu/projects/editor/?tutorial=getStarted'}
          />
        </div>
      )}

      {/* ================================================================ */}
      {/* TAB 3: SIDE-BY-SIDE SPLIT VIEW                                   */}
      {/* ================================================================ */}
      {activeTab === 'split' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* Left 4 cols: Step by Step */}
          <div className="lg:col-span-4 space-y-4 max-h-[820px] overflow-y-auto pr-1">
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-500" />
                <span>Panduan Praktik Cepat</span>
              </h3>
              
              <div className="space-y-3">
                {level.missionSteps.map((s, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs space-y-1.5 border border-slate-200/80 dark:border-slate-700/60">
                    <span className="font-bold text-amber-500">Langkah {s.stepNumber}: {s.title}</span>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{s.instruction}</p>
                    {s.blockGuide && (
                      <span className="text-[10px] font-mono text-cyan-500 font-semibold block mt-1">
                        🧩 {s.blockGuide}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={() => setActiveTab('quiz')}
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs transition-all mt-2 shadow-sm"
              >
                Lanjut ke Kuis & Klaim XP
              </button>
            </div>
          </div>

          {/* Right 8 cols: Scratch editor */}
          <div className="lg:col-span-8">
            <ScratchEmbed
              currentLevelTitle={`Level ${level.id}: ${level.title}`}
              tutorialUrl={level.scratchTutorialUrl || 'https://scratch.mit.edu/projects/editor/?tutorial=getStarted'}
              isCompact={true}
              studentName={session.studentName}
            />
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* TAB 4: QUIZ & XP COMPLETION CLAIM                                */}
      {/* ================================================================ */}
      {activeTab === 'quiz' && (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">Kuis Evaluasi Pemahaman Modul {level.id}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Jawab pertanyaan berikut untuk memvalidasi pemahamanmu</p>
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs self-start sm:self-auto">
                Hadiah +{level.xpReward} XP
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-6">
              {level.quizQuestions.map((q, qIdx) => {
                const selectedOpt = selectedAnswers[qIdx];
                const isAnswered = selectedOpt !== undefined;
                const isCorrect = selectedOpt === q.correctAnswerIndex;

                return (
                  <div key={qIdx} className="space-y-3 p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        {qIdx + 1}
                      </span>
                      <p className="text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
                        {q.question}
                      </p>
                    </div>

                    <div className="space-y-2 pt-1 pl-8">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = selectedOpt === optIdx;
                        let optionStyle = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-400';

                        if (quizSubmitted) {
                          if (optIdx === q.correctAnswerIndex) {
                            optionStyle = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold';
                          } else if (isChosen && !isCorrect) {
                            optionStyle = 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-800 dark:text-rose-300';
                          }
                        } else if (isChosen) {
                          optionStyle = 'bg-indigo-500/10 border-indigo-500 text-indigo-600 dark:text-indigo-300 font-bold';
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={quizSubmitted}
                            onClick={() => handleSelectOption(qIdx, optIdx)}
                            className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between gap-3 ${optionStyle}`}
                          >
                            <span>{opt}</span>
                            {quizSubmitted && optIdx === q.correctAnswerIndex && (
                              <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                            )}
                            {quizSubmitted && isChosen && !isCorrect && (
                              <X className="w-4 h-4 text-rose-500 flex-shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation if submitted */}
                    {quizSubmitted && (
                      <div className="mt-3 p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 leading-relaxed ml-8">
                        <span className="font-bold text-indigo-600 dark:text-indigo-400">Pembahasan: </span>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quiz Submit Actions */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              {!quizSubmitted ? (
                <button
                  onClick={handleFinishQuiz}
                  disabled={Object.keys(selectedAnswers).length < level.quizQuestions.length}
                  id="btn-submit-quiz"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 disabled:opacity-40 text-slate-950 font-black text-xs shadow-md shadow-amber-400/20 transition-all flex items-center justify-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  <span>Kirim Jawaban & Klaim XP</span>
                </button>
              ) : (
                <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Kuis Selesai! Poin XP dan progres telah diperbarui otomatis.</span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => setQuizSubmitted(false)}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Ulangi Kuis</span>
                    </button>

                    {isTrial ? (
                      <button
                        onClick={onOpenLoginModal}
                        className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md shadow-amber-400/20 transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Lock className="w-4 h-4" />
                        <span>Buka Level 2-20 (Daftar / Masuk Siswa)</span>
                      </button>
                    ) : (
                      <button
                        onClick={onNextLevel}
                        disabled={level.id === 20}
                        className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Lanjut ke Level {level.id + 1}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
