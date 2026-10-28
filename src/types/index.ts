export type GoalStatus = 'todo' | 'in_progress' | 'done';

export type GoalDifficulty = 'easy' | 'medium' | 'epic';

export interface StudyGoal {
  id: string;
  title: string;
  description: string;
  deadline: string; // YYYY-MM-DD
  status: GoalStatus;
  difficulty: GoalDifficulty;
  category: string;
  xpReward: number;
  gemReward: number;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  aluraTrack?: string; // e.g. 'Full Stack', 'Python & APIs', 'DevOps & Linux', 'Projetos'
}

export interface RoutineBlock {
  id: string;
  title: string;
  durationMinutes: number;
  category: 'teorico' | 'pratica' | 'projeto' | 'revisao' | 'opcional';
  completed: boolean;
  notes?: string;
}

export interface DevLogEntry {
  id: string;
  date: string;
  whatILearned: string;
  hoursSpent: number;
  milestoneTitle: string;
}

export interface HeroStats {
  name: string;
  title: string;
  level: number;
  currentXp: number;
  xpToNextLevel: number;
  totalXp: number;
  gems: number;
  hearts: number;
  maxHearts: number;
  questsCompleted: number;
  characterClass: 'link' | 'mage' | 'knight';
  soundEnabled: boolean;
  todayMinutesStudied: number;
  weeklyDeliveriesCount: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}
