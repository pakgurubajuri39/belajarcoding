import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SyllabusListView } from './components/SyllabusListView';
import { LevelDetailView } from './components/LevelDetailView';
import { ProgressDashboard } from './components/ProgressDashboard';
import { ScratchEmbed } from './components/ScratchEmbed';
import { CertificateView } from './components/CertificateView';
import { AdminPanel } from './components/AdminPanel';
import { LoginModal } from './components/LoginModal';
import { LoginPage } from './components/LoginPage';
import { AboutLandingView } from './components/AboutLandingView';
import { MaterialsView } from './components/MaterialsView';
import { Footer } from './components/Footer';
import { InAppNotificationToast } from './components/InAppNotificationToast';
import { NotificationCenterModal } from './components/NotificationCenterModal';
import { QuickTimerWidget } from './components/QuickTimerWidget';

import { SyllabusLevel, StudentProgress, UserSession } from './types';
import { SYLLABUS_DATA } from './data/syllabus';
import {
  loadProgress,
  saveProgress,
  loadSession,
  saveSession,
  loadSavedTheme,
  saveSavedTheme,
  checkAndAwardBadges,
  getResumeLevelId,
  recordXpGain
} from './utils/storage';
import {
  InAppNotification,
  getStoredNotifications,
  checkInactivityStatus,
  updateLastVisitTime,
  addNotification,
  simulateInactivity
} from './utils/notifications';
import { syncStudentProgressToFirebase } from './lib/firebase';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(loadSavedTheme());
  const [session, setSession] = useState<UserSession>(loadSession());
  const [progress, setProgress] = useState<StudentProgress>(loadProgress());

  // Notifications State
  const [notifications, setNotifications] = useState<InAppNotification[]>(getStoredNotifications());
  const [activeToastNotification, setActiveToastNotification] = useState<InAppNotification | null>(null);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);
  const [isQuickTimerOpen, setIsQuickTimerOpen] = useState(false);

  // Active navigation tab
  const [currentTab, setCurrentTab] = useState<'about' | 'syllabus' | 'materials' | 'scratch' | 'progress' | 'certificate' | 'admin'>(
    session.isAuthenticated ? 'syllabus' : 'about'
  );
  const [selectedLevelId, setSelectedLevelId] = useState<number | null>(null);
  
  // Login modal
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Sync theme with document element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    saveSavedTheme(theme);
  }, [theme]);

  // Persist session
  useEffect(() => {
    saveSession(session);
  }, [session]);

  // Persist progress and sync to cloud Firestore
  useEffect(() => {
    saveProgress(progress);
    if (session.isAuthenticated) {
      const studentId = session.registrationId || session.email || `student_${session.studentName.replace(/\s+/g, '_').toLowerCase()}`;
      syncStudentProgressToFirebase(studentId, {
        fullName: session.studentName,
        email: session.email,
        schoolOrClass: session.schoolOrClass,
        avatar: session.avatar || 'bot_neon',
        xp: progress.xp,
        unlockedLevelIds: progress.unlockedLevelIds,
        completedLevelIds: progress.completedLevelIds,
        unlockedBadgesCount: progress.unlockedBadges.length
      }).catch(err => {
        console.warn('Silent sync error:', err);
      });
    }
  }, [progress, session]);

  // Check 2-day inactivity on initial mount
  useEffect(() => {
    const { isInactive2Days, daysInactive } = checkInactivityStatus();
    if (isInactive2Days) {
      // Find next level to recommend
      const nextLevel = SYLLABUS_DATA.find(l => !progress.completedLevelIds.includes(l.id)) || SYLLABUS_DATA[0];
      
      const notifObj = addNotification({
        type: 'inactivity_2days',
        title: `Halo ${session.studentName}! Rindu Belajar Koding? 🚀`,
        message: `Sudah ${daysInactive} hari kamu belum mengasah logika koding nih. Yuk luangkan 5 menit santai untuk melanjutkan materi atau latihan Scratch hari ini agar logikamu semakin tajam!`,
        actionType: 'start_5min',
        targetLevelId: nextLevel.id,
        badge: 'Pengingat 2 Hari'
      });

      setNotifications(getStoredNotifications());
      setActiveToastNotification(notifObj);
    }
    // Update visit timestamp to current session
    updateLastVisitTime();
  }, []);

  const handleToggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleStart5MinSession = (targetLevelId?: number) => {
    setIsQuickTimerOpen(true);
    if (targetLevelId) {
      setSelectedLevelId(targetLevelId);
    } else {
      // If currently on syllabus or level, stay or navigate to first unfinished level
      const unfinished = SYLLABUS_DATA.find(l => !progress.completedLevelIds.includes(l.id));
      if (unfinished && session.role !== 'guest') {
        setSelectedLevelId(unfinished.id);
      } else if (currentTab !== 'scratch' && !selectedLevelId) {
        setCurrentTab('scratch');
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSessionTimerComplete = () => {
    // Award +50 XP
    const newXp = progress.xp + 50;
    const updatedRaw: StudentProgress = {
      ...progress,
      xp: newXp
    };
    const { updatedProgress } = checkAndAwardBadges(updatedRaw);
    setProgress(updatedProgress);

    // Add notification
    const completeNotif = addNotification({
      type: 'session_complete',
      title: '🎉 Target Sesi 5 Menit Coding Berhasil!',
      message: 'Luar biasa! Kamu telah menyelesaikan 5 menit latihan koding fokus dan mendapatkan bonus +50 XP.',
      badge: 'Bonus +50 XP'
    });
    setNotifications(getStoredNotifications());
  };

  const handleTriggerSimulate2Days = () => {
    simulateInactivity(2.5);
    const { isInactive2Days, daysInactive } = checkInactivityStatus();
    const nextLevel = SYLLABUS_DATA.find(l => !progress.completedLevelIds.includes(l.id)) || SYLLABUS_DATA[0];

    const notifObj = addNotification({
      type: 'inactivity_2days',
      title: `Halo ${session.studentName}! Rindu Belajar Koding? 🚀`,
      message: `Sudah ${daysInactive || 2} hari kamu belum mengasah logika koding nih. Yuk luangkan 5 menit santai untuk latihan Scratch hari ini agar logikamu semakin tajam!`,
      actionType: 'start_5min',
      targetLevelId: nextLevel.id,
      badge: 'Pengingat 2 Hari'
    });

    setNotifications(getStoredNotifications());
    setActiveToastNotification(notifObj);
  };

  const handleLoginSuccess = (newSession: UserSession) => {
    setSession(newSession);
    setIsLoginModalOpen(false);
    if (currentTab === 'about') {
      setCurrentTab('syllabus');
    }

    // Determine the exact level to resume from previous session
    let updatedProgressState = { ...progress };

    if (newSession.role === 'student') {
      // Ensure at least level 1 is unlocked
      if (!updatedProgressState.unlockedLevelIds.includes(1)) {
        updatedProgressState.unlockedLevelIds = [1];
      }
    } else if (newSession.role === 'admin') {
      // Admin gets all 20 levels unlocked
      const allIds = SYLLABUS_DATA.map(l => l.id);
      updatedProgressState.unlockedLevelIds = allIds;
    } else if (newSession.role === 'guest') {
      if (!updatedProgressState.unlockedLevelIds.includes(1)) {
        updatedProgressState.unlockedLevelIds = [1];
      }
    }

    const resumeLevelId = getResumeLevelId(updatedProgressState, newSession.role);
    updatedProgressState.lastStudiedLevelId = resumeLevelId;
    updatedProgressState.lastStudiedDate = new Date().toISOString();

    setProgress(updatedProgressState);
    setSelectedLevelId(resumeLevelId);

    // Friendly Welcome Notification Toast
    const resumedLevelObj = SYLLABUS_DATA.find(l => l.id === resumeLevelId) || SYLLABUS_DATA[0];
    const isCompleted = updatedProgressState.completedLevelIds.includes(resumeLevelId);
    
    const welcomeNotif = addNotification({
      type: 'tip',
      title: `Selamat Datang Kembali, ${newSession.studentName}! 🚀`,
      message: isCompleted
        ? `Kamu melanjutkan sesi di Level #${resumeLevelId}: "${resumedLevelObj.title}". Semua progres & XP tersimpan rapi!`
        : `Melanjutkan sesi belajar terakhirmu di Level #${resumeLevelId}: "${resumedLevelObj.title}". Semangat!`,
      targetLevelId: resumeLevelId,
      badge: `Lanjut Level #${resumeLevelId}`
    });

    setNotifications(getStoredNotifications());
    setActiveToastNotification(welcomeNotif);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartTrial = () => {
    const trialSession: UserSession = {
      isAuthenticated: true,
      role: 'guest',
      studentName: 'Siswa Uji Coba (Trial)',
      avatar: 'bot_neon',
      loginDate: new Date().toISOString()
    };
    setSession(trialSession);
    if (!progress.unlockedLevelIds.includes(1)) {
      setProgress(prev => ({
        ...prev,
        unlockedLevelIds: [1],
        lastStudiedLevelId: 1,
        lastStudiedDate: new Date().toISOString()
      }));
    }
    setSelectedLevelId(1);
    setCurrentTab('syllabus');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    const defaultSess: UserSession = {
      isAuthenticated: false,
      role: 'guest',
      studentName: 'Siswa Tamu',
      avatar: 'bot_neon',
      loginDate: new Date().toISOString()
    };
    saveSession(defaultSess);
    setSession(defaultSess);
    setCurrentTab('about');
    setSelectedLevelId(null);
    setIsLoginModalOpen(false);
    setIsNotificationCenterOpen(false);
    setIsQuickTimerOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleSelectLevel = (levelId: number) => {
    // Check if guest trying to access locked level
    if (session.role === 'guest' && levelId > 1) {
      setIsLoginModalOpen(true);
      return;
    }
    setSelectedLevelId(levelId);
    setProgress(prev => ({
      ...prev,
      lastStudiedLevelId: levelId,
      lastStudiedDate: new Date().toISOString()
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteLevel = (levelId: number, scorePercentage: number) => {
    const currentLevel = SYLLABUS_DATA.find(l => l.id === levelId);
    if (!currentLevel) return;

    const isAlreadyCompleted = progress.completedLevelIds.includes(levelId);
    const xpToAdd = isAlreadyCompleted ? Math.round(currentLevel.xpReward * 0.2) : currentLevel.xpReward;

    const newCompletedList = isAlreadyCompleted
      ? progress.completedLevelIds
      : [...progress.completedLevelIds, levelId];

    // Unlock next level automatically if not already unlocked
    const nextLevelId = levelId + 1;
    const newUnlockedList = progress.unlockedLevelIds.includes(nextLevelId) || nextLevelId > 20
      ? progress.unlockedLevelIds
      : [...progress.unlockedLevelIds, nextLevelId];

    // Point last studied to next level if valid, else keep current
    const updatedLastStudied = nextLevelId <= 20 ? nextLevelId : levelId;

    // Record XP gain with historical timeline
    const activityDesc = `Selesai Level #${currentLevel.id}: ${currentLevel.title}`;
    const withHistory = recordXpGain(progress, xpToAdd, activityDesc);

    const updatedRaw: StudentProgress = {
      ...withHistory,
      completedLevelIds: newCompletedList,
      unlockedLevelIds: newUnlockedList,
      levelScores: {
        ...progress.levelScores,
        [levelId]: Math.max(progress.levelScores[levelId] || 0, scorePercentage)
      },
      lastStudiedLevelId: updatedLastStudied,
      lastStudiedDate: new Date().toISOString()
    };

    // Check badges
    const { updatedProgress } = checkAndAwardBadges(updatedRaw);
    setProgress(updatedProgress);
  };

  const handleSaveNote = (levelId: number, note: string) => {
    setProgress(prev => ({
      ...prev,
      notes: {
        ...prev.notes,
        [levelId]: note
      }
    }));
  };

  const handleNextLevel = () => {
    if (!selectedLevelId) return;
    const nextId = selectedLevelId + 1;
    if (nextId <= 20) {
      if (session.role === 'guest' && nextId > 1) {
        setIsLoginModalOpen(true);
        return;
      }
      setSelectedLevelId(nextId);
      setProgress(prev => ({
        ...prev,
        lastStudiedLevelId: nextId,
        lastStudiedDate: new Date().toISOString()
      }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevLevel = () => {
    if (!selectedLevelId) return;
    const prevId = selectedLevelId - 1;
    if (prevId >= 1) {
      setSelectedLevelId(prevId);
      setProgress(prev => ({
        ...prev,
        lastStudiedLevelId: prevId,
        lastStudiedDate: new Date().toISOString()
      }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentLevelObj = selectedLevelId ? SYLLABUS_DATA.find(l => l.id === selectedLevelId) : null;
  const unreadCount = notifications.filter(n => !n.isRead).length;

  // When not authenticated (first opening or after logout), show the dedicated Login Page
  if (!session.isAuthenticated) {
    return (
      <LoginPage
        onLoginSuccess={handleLoginSuccess}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          setSelectedLevelId(null);
        }}
        session={session}
        progress={progress}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
        unreadNotificationsCount={unreadCount}
        onOpenNotifications={() => setIsNotificationCenterOpen(true)}
      />

      {/* Main App Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        
        {/* Render Specific Level Detail View if active */}
        {selectedLevelId && currentLevelObj ? (
          <LevelDetailView
            level={currentLevelObj}
            progress={progress}
            session={session}
            onCompleteLevel={handleCompleteLevel}
            onNextLevel={handleNextLevel}
            onPrevLevel={handlePrevLevel}
            onBackToSyllabus={() => setSelectedLevelId(null)}
            onSaveNote={handleSaveNote}
          />
        ) : (
          /* Render Main Tab Views */
          <>
            {currentTab === 'about' && (
              <AboutLandingView
                session={session}
                progress={progress}
                onOpenLoginModal={() => setIsLoginModalOpen(true)}
                onStartTrial={handleStartTrial}
                onSelectLevel={handleSelectLevel}
                onNavigateTab={(tab) => {
                  setCurrentTab(tab);
                  setSelectedLevelId(null);
                }}
              />
            )}

            {currentTab === 'syllabus' && (
              <SyllabusListView
                progress={progress}
                session={session}
                onSelectLevel={handleSelectLevel}
                onOpenLoginModal={() => setIsLoginModalOpen(true)}
                onOpenMaterials={() => {
                  setCurrentTab('materials');
                  setSelectedLevelId(null);
                }}
              />
            )}

            {currentTab === 'materials' && (
              <MaterialsView
                session={session}
                progress={progress}
                onUpdateProgress={(newProgress) => setProgress(newProgress)}
                onSelectLevel={(levelId) => {
                  setSelectedLevelId(levelId);
                }}
              />
            )}

            {currentTab === 'scratch' && (
              <div className="space-y-4 pb-12">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2">
                  <div>
                    <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                      Scratch 3.0 Live Studio
                    </h1>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Editor coding visual terintegrasi. Buat game, animasi, dan simulasimu di sini!
                    </p>
                  </div>
                </div>
                <ScratchEmbed
                  currentLevelTitle="DJuragan Scratch Live Workspace"
                  tutorialUrl="https://turbowarp.org/editor?fps=60"
                  onLogout={handleLogout}
                  studentName={session.studentName}
                />
              </div>
            )}

            {currentTab === 'progress' && (
              <ProgressDashboard
                progress={progress}
                session={session}
                onSelectLevel={handleSelectLevel}
                onLogout={handleLogout}
                onUpdateSession={setSession}
              />
            )}

            {currentTab === 'certificate' && (
              <CertificateView
                progress={progress}
                session={session}
              />
            )}

            {currentTab === 'admin' && session.role === 'admin' && (
              <AdminPanel
                progress={progress}
                session={session}
                onUpdateProgress={setProgress}
                onUpdateSession={setSession}
                onLogout={handleLogout}
              />
            )}
          </>
        )}

      </main>

      {/* Mandatory Footer with @copyright by Pak GuruAI */}
      <Footer />

      {/* Access Code & Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => session.isAuthenticated && setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        currentRole={session.role}
        onLogout={handleLogout}
      />

      {/* Polite 2-Day Inactivity Toast Notification */}
      <InAppNotificationToast
        notification={activeToastNotification}
        onClose={() => setActiveToastNotification(null)}
        onStart5MinSession={handleStart5MinSession}
      />

      {/* Notification Center Modal / Drawer */}
      <NotificationCenterModal
        isOpen={isNotificationCenterOpen}
        onClose={() => setIsNotificationCenterOpen(false)}
        notifications={notifications}
        onRefreshNotifications={() => setNotifications(getStoredNotifications())}
        onStart5MinSession={handleStart5MinSession}
        onTriggerSimulate2Days={handleTriggerSimulate2Days}
      />

      {/* Floating 5-Minute Quick Coding Timer Widget */}
      <QuickTimerWidget
        isOpen={isQuickTimerOpen}
        onClose={() => setIsQuickTimerOpen(false)}
        onSessionComplete={handleSessionTimerComplete}
      />

    </div>
  );
}

