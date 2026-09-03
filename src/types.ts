export type UserRole = 'guest' | 'student' | 'admin';

export type CategoryType = 
  | 'Foundation' 
  | 'Motion & Loop' 
  | 'Game Dev' 
  | 'Looks & Art' 
  | 'Input & Sensing' 
  | 'Math & Logic' 
  | 'Simulation'
  | 'Creative Arts';

export interface KeyBlock {
  name: string;
  category: 'Motion' | 'Looks' | 'Sound' | 'Events' | 'Control' | 'Sensing' | 'Operators' | 'Variables' | 'My Blocks' | 'Pen';
  description: string;
  codeSnippet?: string;
  color: string;
}

export interface MissionStep {
  stepNumber: number;
  title: string;
  instruction: string;
  hint?: string;
  blockGuide?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Challenge {
  title: string;
  description: string;
  bonusXp: number;
  tips: string[];
}

export interface BlockLine {
  text: string;
  category: 'Motion' | 'Looks' | 'Sound' | 'Events' | 'Control' | 'Sensing' | 'Operators' | 'Variables' | 'My Blocks' | 'Pen' | 'Custom';
  indent?: number; // 0, 1, 2 for nested blocks
}

export interface ScriptPseudocode {
  title: string;
  spriteName: string;
  codeBlocks: BlockLine[];
  explanation: string;
}

export interface TroubleshootingTip {
  problem: string;
  solution: string;
}

export interface LearningResource {
  id: number;
  title: string;
  url: string;
  type: 'drive' | 'youtube' | 'pdf' | 'worksheet' | 'video';
  category: string;
  description?: string;
  targetLevelId?: number;
}

export interface SyllabusLevel {
  id: number;
  semester: 1 | 2; // 1 = Ganjil, 2 = Genap
  semesterLevel: number; // 1 to 10
  title: string;
  topics: string[];
  indicator: string;
  allocation: string;
  xpReward: number;
  iconName: string;
  category: CategoryType;
  summary: string;
  conceptExplanation: string;
  learningGoals?: string[];
  scriptPseudocode?: ScriptPseudocode[];
  troubleshootingTips?: TroubleshootingTip[];
  summaryPoints?: string[];
  keyBlocks: KeyBlock[];
  missionSteps: MissionStep[];
  scratchTutorialUrl?: string;
  driveMaterialUrl?: string;
  resources?: LearningResource[];
  quizQuestions: QuizQuestion[];
  challenge: Challenge;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: string;
  unlockedAt?: string;
}

export interface XpHistoryItem {
  date: string;          // ISO string or YYYY-MM-DD
  label: string;         // Short formatted date e.g. "01 Sep"
  xpGain: number;        // XP gained in that event/day
  cumulativeXp: number;  // Running total XP
  activityTitle: string; // Description e.g. "Menyelesaikan Level #3"
}

export interface StudentProgress {
  unlockedLevelIds: number[];
  completedLevelIds: number[];
  levelScores: Record<number, number>; // levelId -> quiz score %
  xp: number;
  streakDays: number;
  lastActiveDate: string;
  completedQuizzes: Record<number, number[]>; // levelId -> selected option indices
  notes: Record<number, string>; // student personal notes for each level
  unlockedBadges: string[];
  lastStudiedLevelId?: number; // Level yang terakhir dibuka / dipelajari siswa (1-20)
  lastStudiedDate?: string;    // Waktu timestamp sesi belajar terakhir
  xpHistory?: XpHistoryItem[]; // Rekam jejak kronologis perolehan XP
}

export type RegistrationStatus = 'pending' | 'approved' | 'rejected';

export interface StudentRegistration {
  id: string;
  fullName: string;
  email: string;
  schoolOrClass: string;
  phone?: string;
  password?: string;
  avatar: string;
  motivation?: string;
  status: RegistrationStatus;
  rejectionReason?: string;
  approvedAt?: string;
  approvedBy?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface UserSession {
  isAuthenticated: boolean;
  role: UserRole;
  studentName: string;
  avatar: string;
  loginDate: string;
  email?: string;
  registrationId?: string;
  schoolOrClass?: string;
}

export interface LeaderboardEntry {
  id?: string;
  studentId: string;
  fullName: string;
  schoolOrClass?: string;
  avatar: string;
  xp: number;
  completedLevelIds: number[];
  unlockedBadgesCount?: number;
  lastUpdated?: string;
  rank?: number;
  isCurrentUser?: boolean;
}
