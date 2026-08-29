import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  BookOpen, CheckCircle2, ChevronLeft, ChevronRight, Sparkles, HelpCircle,
  Play, Laptop, Award, ArrowRight, Lightbulb, Code2, AlertTriangle, MessageSquare, Check, X
} from 'lucide-react';
import { SyllabusLevel, StudentProgress, UserSession } from '../types';
import { ScratchEmbed } from './ScratchEmbed';

interface LevelDetailViewProps {
  level: SyllabusLevel;
  progress: StudentProgress;
  session: UserSession;
  onCompleteLevel: (levelId: number, scorePercentage: number) => void;
  onNextLevel: () => void;
  onPrevLevel: () => void;
  onBackToSyllabus: () => void;
}

export const LevelDetailView: React.FC<LevelDetailViewProps> = ({
  level,
  progress,
  session,
  onCompleteLevel,
  onNextLevel,
  onPrevLevel,
  onBackToSyllabus
}) => {
  const isCompleted = progress.completedLevelIds.includes(level.id);

  // Active sub-tab: 'mission' | 'scratch' | 'quiz' | 'split'
  const [activeTab, setActiveTab] = useState<'mission' | 'scratch' | 'quiz' | 'split'>('mission');

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

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
    
    // Trigger confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    onCompleteLevel(level.id, scorePercentage);
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Top Header Navigation & Meta */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <button
          onClick={onBackToSyllabus}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-amber-500 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Kembali ke Silabus 20 Level</span>
        </button>

        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between sm:justify-end">
          <button
            onClick={onPrevLevel}
            disabled={level.id === 1}
            className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 disabled:opacity-30 text-xs font-semibold flex items-center gap-1 hover:border-slate-400 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Level Sebelumnya</span>
          </button>

          <button
            onClick={onNextLevel}
            disabled={level.id === 20 || (session.role === 'guest' && level.id >= 1)}
            className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 disabled:opacity-30 text-xs font-semibold flex items-center gap-1 hover:border-slate-400 transition-all"
          >
            <span className="hidden sm:inline">Level Selanjutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Level Summary Bento Banner */}
      <div className="relative rounded-3xl bg-slate-900/90 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 text-white backdrop-blur-md shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xs shadow-md">
                {level.id}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-500/20 border border-indigo-500/30 text-indigo-300">
                Semester {level.semester === 1 ? 'Ganjil' : 'Genap'} • Modul #{level.semesterLevel}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 border border-slate-700 text-slate-300">
                {level.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800/80 border border-slate-700 text-slate-300">
                ⏱️ {level.allocation}
              </span>
              {isCompleted && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Selesai</span>
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">{level.title}</h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{level.summary}</p>
          </div>

          <div className="flex-shrink-0 flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/10 text-center min-w-[130px]">
            <span className="text-[10px] text-amber-300 font-semibold uppercase tracking-wider">Hadiah XP</span>
            <span className="text-3xl font-black text-amber-400 mt-0.5">+{level.xpReward}</span>
            <span className="text-[10px] text-slate-400 font-mono">Bento XP Points</span>
          </div>
        </div>

        {/* Syllabus Competency Matrix Bento */}
        <div className="relative z-10 mt-6 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-indigo-400 font-bold uppercase tracking-wider text-[10px]">Materi Silabus:</span>
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {level.topics.map((t, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-800/90 border border-slate-700 text-slate-200 font-medium">
                  • {t}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px]">Indikator Keberhasilan:</span>
            <p className="text-slate-300 italic pt-0.5">
              "{level.indicator}"
            </p>
          </div>
        </div>
      </div>

      {/* Main View Mode Switcher Bento Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab('mission')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'mission'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Materi & Panduan</span>
          </button>

          <button
            onClick={() => setActiveTab('scratch')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'scratch'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Laptop className="w-4 h-4" />
            <span>Scratch Studio</span>
          </button>

          <button
            onClick={() => setActiveTab('split')}
            className={`hidden lg:flex px-4 py-2 rounded-xl text-xs sm:text-sm font-bold items-center gap-2 transition-all ${
              activeTab === 'split'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Layar Berdampingan</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'quiz'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Kuis & Klaim XP</span>
          </button>
        </div>

        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 px-2 py-1">
          <span>Modul #{level.id} dari 20</span>
        </div>
      </div>

      {/* Tab Content Display */}

      {/* TAB 1: Mission & Learning Guidance */}
      {activeTab === 'mission' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left 2 Cols: Step-by-Step Interactive Mission */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Concept Explanation Card */}
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <div className="flex items-center gap-2.5 mb-3 text-amber-600 dark:text-amber-400 font-bold text-sm">
                <Lightbulb className="w-5 h-5" />
                <span>Konsep Penting & Algoritma</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {level.conceptExplanation}
              </p>
            </div>

            {/* Interactive Step-by-step Mission Guide */}
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Play className="w-4 h-4 text-cyan-500" />
                  <span>Tahapan Misi Praktik Coding</span>
                </h3>
                <span className="text-xs font-semibold text-slate-500">
                  {level.missionSteps.length} Langkah
                </span>
              </div>

              <div className="space-y-4">
                {level.missionSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all ${
                      currentStepIndex === idx
                        ? 'bg-amber-500/5 dark:bg-amber-500/10 border-amber-500/40 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
                    }`}
                    onClick={() => setCurrentStepIndex(idx)}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-xl bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        {step.stepNumber}
                      </span>
                      <div className="space-y-1.5 flex-1">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{step.title}</h4>
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
                ))}
              </div>

              {/* Action trigger to Scratch Editor */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setActiveTab('scratch')}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-cyan-500/20"
                >
                  <Laptop className="w-4 h-4" />
                  <span>Buka Scratch Editor & Praktekkan Sekarang</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Creative Challenge Card */}
            <div className="rounded-3xl bg-gradient-to-br from-indigo-950 to-slate-900 border border-indigo-500/30 p-6 text-white shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>{level.challenge.title}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-amber-400 text-slate-950">
                  Bonus +{level.challenge.bonusXp} XP
                </span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">{level.challenge.description}</p>
              <div className="space-y-1 pt-1">
                <span className="text-[11px] text-indigo-300 font-semibold">Petunjuk Kreatif:</span>
                <ul className="text-xs text-slate-300 list-disc list-inside space-y-0.5">
                  {level.challenge.tips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* Right 1 Col: Key Blocks Reference Palette */}
          <div className="space-y-6">
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-amber-500" />
                  <span>Kamus Blok Kunci</span>
                </h3>
                <span className="text-[10px] text-slate-400 font-medium">Scratch 3.0</span>
              </div>

              <div className="space-y-3">
                {level.keyBlocks.map((block, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="px-2.5 py-0.5 rounded-md text-[10px] font-bold text-white shadow-sm font-mono"
                        style={{ backgroundColor: block.color }}
                      >
                        {block.name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold">{block.category}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {block.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Practice & Quiz CTA */}
            <div className="rounded-3xl bg-amber-500/10 border border-amber-500/30 p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center mx-auto text-xl font-bold shadow-md shadow-amber-500/20">
                🎯
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Siap Menguji Pemahaman?</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Kerjakan kuis singkat untuk menyelesaikan level ini dan klaim +{level.xpReward} XP!
              </p>
              <button
                onClick={() => setActiveTab('quiz')}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-all"
              >
                Mulai Kuis Level Ini
              </button>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: Embedded Scratch Editor Only */}
      {activeTab === 'scratch' && (
        <div className="space-y-4">
          <ScratchEmbed
            currentLevelTitle={`Level ${level.id}: ${level.title}`}
            tutorialUrl={level.scratchTutorialUrl || 'https://scratch.mit.edu/projects/editor/?tutorial=getStarted'}
          />
        </div>
      )}

      {/* TAB 3: Side-by-Side Split View */}
      {activeTab === 'split' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* Left 4 cols: instructions */}
          <div className="lg:col-span-4 space-y-4 max-h-[800px] overflow-y-auto pr-1">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-500" />
                <span>Panduan Praktik Cepat</span>
              </h3>
              
              <div className="space-y-3">
                {level.missionSteps.map((s, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs space-y-1">
                    <span className="font-bold text-amber-500">Langkah {s.stepNumber}: {s.title}</span>
                    <p className="text-slate-600 dark:text-slate-300">{s.instruction}</p>
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
                className="w-full py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs transition-all mt-2"
              >
                Lanjut ke Kuis Level
              </button>
            </div>
          </div>

          {/* Right 8 cols: Scratch editor */}
          <div className="lg:col-span-8">
            <ScratchEmbed
              currentLevelTitle={`Level ${level.id}: ${level.title}`}
              tutorialUrl={level.scratchTutorialUrl || 'https://scratch.mit.edu/projects/editor/?tutorial=getStarted'}
            />
          </div>
        </div>
      )}

      {/* TAB 4: Quiz & Completion Claim */}
      {activeTab === 'quiz' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">Kuis Evaluasi Pemahaman</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Jawab pertanyaan berikut untuk memvalidasi pemahamanmu</p>
              </div>
              <div className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs">
                +{level.xpReward} XP
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-6">
              {level.quizQuestions.map((q, qIdx) => (
                <div key={qIdx} className="space-y-3">
                  <div className="flex items-start gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {qIdx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">{q.question}</h4>
                  </div>

                  <div className="space-y-2 pl-8">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[qIdx] === optIdx;
                      const isCorrect = q.correctAnswerIndex === optIdx;
                      
                      let optionClasses = 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-700/60';
                      
                      if (quizSubmitted) {
                        if (isCorrect) {
                          optionClasses = 'bg-emerald-500/20 border-emerald-500 text-emerald-900 dark:text-emerald-300 font-bold';
                        } else if (isSelected && !isCorrect) {
                          optionClasses = 'bg-rose-500/20 border-rose-500 text-rose-900 dark:text-rose-300';
                        }
                      } else if (isSelected) {
                        optionClasses = 'bg-amber-500/20 border-amber-500 text-amber-900 dark:text-amber-300 font-bold';
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectOption(qIdx, optIdx)}
                          className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${optionClasses}`}
                        >
                          <span>{opt}</span>
                          {quizSubmitted && isCorrect && <Check className="w-4 h-4 text-emerald-500" />}
                          {quizSubmitted && isSelected && !isCorrect && <X className="w-4 h-4 text-rose-500" />}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300 pl-8">
                      💡 <strong>Penjelasan:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Submission Button */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              {!quizSubmitted ? (
                <button
                  type="button"
                  onClick={handleFinishQuiz}
                  disabled={Object.keys(selectedAnswers).length < level.quizQuestions.length}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 disabled:opacity-50 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  <span>Kirim Jawaban & Selesaikan Level Ini</span>
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-center space-y-1">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                    <h4 className="text-base font-bold">Level Berhasil Diselesaikan! 🎉</h4>
                    <p className="text-xs">Kamu telah memperoleh +{level.xpReward} XP dan kemajuan tersimpan di perangkatmu.</p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={onBackToSyllabus}
                      className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs"
                    >
                      Daftar Silabus
                    </button>
                    {level.id < 20 && (
                      <button
                        onClick={onNextLevel}
                        className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
                      >
                        <span>Level Berikutnya</span>
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
