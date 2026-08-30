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
}

export interface UserSession {
  isAuthenticated: boolean;
  role: UserRole;
  studentName: string;
  avatar: string;
  loginDate: string;
}
