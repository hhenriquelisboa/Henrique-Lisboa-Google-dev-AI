import { StudyGoal, HeroStats, RoutineBlock, DevLogEntry } from '../types';

const GOALS_STORAGE_KEY = 'studyflow_goals_v2';
const STATS_STORAGE_KEY = 'studyflow_hero_stats_v2';
const ROUTINE_STORAGE_KEY = 'studyflow_daily_routine_v2';
const DEVLOG_STORAGE_KEY = 'studyflow_devlog_v2';

export const INITIAL_ALURA_GOALS: StudyGoal[] = [
  {
    id: 'goal-alura-1',
    title: 'Carreira Dev Full Stack do Futuro: Do Zero com IA',
    description: 'Trilha principal da Alura: consolidar a lógica de frontend com React, TypeScript e boas práticas de arquitetura.',
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'in_progress',
    difficulty: 'epic',
    category: 'Full Stack & Frontend',
    xpReward: 200,
    gemReward: 30,
    aluraTrack: 'Full Stack Alura',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'goal-alura-2',
    title: 'Python Collections & Estruturação de Dados (Listas e Tuplas)',
    description: 'Dominar manipulação de listas, dicionários, tuplas e loops em Python para resolver problemas com autonomia.',
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'todo',
    difficulty: 'medium',
    category: 'Python & Lógica',
    xpReward: 100,
    gemReward: 15,
    aluraTrack: 'Python Alura',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'goal-alura-3',
    title: 'Construir APIs com FastAPI e Banco de Dados Relacional SQL',
    description: 'Sair de scripts isolados e criar serviços que recebem requisições HTTP, autenticam e persistem dados em PostgreSQL/SQLite.',
    deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'todo',
    difficulty: 'epic',
    category: 'Backend & Banco de Dados',
    xpReward: 200,
    gemReward: 30,
    aluraTrack: 'FastAPI & SQL',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'goal-alura-4',
    title: 'Documentar a Máquina Virtual na Oracle Cloud (Linux & Terminal)',
    description: 'Criar um artigo/post sobre como você subiu o servidor de RPG no Discord na nuvem Oracle, comandos Linux e arquitetura.',
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'todo',
    difficulty: 'medium',
    category: 'DevOps & Nuvem',
    xpReward: 100,
    gemReward: 15,
    aluraTrack: 'Infraestrutura',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'goal-alura-5',
    title: 'Publicar o StudyFlow no GitHub com README Profissional',
    description: 'Entrega prática da semana: subir código com TypeScript, explicar regras de negócio de RPG e compartilhar no LinkedIn.',
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'in_progress',
    difficulty: 'medium',
    category: 'Git & Portfólio',
    xpReward: 100,
    gemReward: 15,
    aluraTrack: 'Portfólio',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'goal-alura-6',
    title: 'Mapear Mercado Tech em Portugal & Networking Estratégico',
    description: 'Conectar com 5 desenvolvedores e tech recruiters em Lisboa/Porto no LinkedIn unindo bagagem de gestão à programação.',
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'todo',
    difficulty: 'easy',
    category: 'Carreira & Liderança',
    xpReward: 50,
    gemReward: 10,
    aluraTrack: 'Networking Portugal',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const INITIAL_ALURA_ROUTINE: RoutineBlock[] = [
  {
    id: 'block-1',
    title: 'Carreira Full Stack ou Conteúdo Técnico Principal',
    durationMinutes: 90,
    category: 'teorico',
    completed: false,
    notes: 'Aulas da trilha principal sem pular para outros cursos.',
  },
  {
    id: 'block-2',
    title: 'Exercícios e Prática Autônoma',
    durationMinutes: 90,
    category: 'pratica',
    completed: false,
    notes: 'Praticar sem olhar o código passo a passo do instrutor.',
  },
  {
    id: 'block-3',
    title: 'Desenvolvimento do Projeto Pessoal (StudyFlow)',
    durationMinutes: 60,
    category: 'projeto',
    completed: false,
    notes: 'Mão na massa em projetos autorais para o portfólio.',
  },
  {
    id: 'block-4',
    title: 'Revisão e Registro do Aprendizado (Diário DevLog)',
    durationMinutes: 30,
    category: 'revisao',
    completed: false,
    notes: 'Sintetizar o que aprendeu e registrar no diário.',
  },
  {
    id: 'block-5',
    title: 'Imersão, Carreira, Inglês Técnico ou Exploração de IA',
    durationMinutes: 30,
    category: 'opcional',
    completed: false,
    notes: 'Networking em Portugal, prompts ou leitura técnica.',
  },
];

export const INITIAL_HERO_STATS: HeroStats = {
  name: 'Henrique',
  title: 'Aprendiz de Hyrule Tech',
  level: 1,
  currentXp: 45,
  xpToNextLevel: 100,
  totalXp: 45,
  gems: 25,
  hearts: 3,
  maxHearts: 3,
  questsCompleted: 1,
  characterClass: 'link',
  soundEnabled: true,
  todayMinutesStudied: 0,
  weeklyDeliveriesCount: 1,
};

export const HERO_TITLES_BY_LEVEL: Record<number, string> = {
  1: 'Aprendiz de Hyrule Tech',
  2: 'Explorador do Terminal',
  3: 'Guerreiro de Python & React',
  4: 'Paladino dos Algoritmos',
  5: 'Mestre da Nuvem & APIs',
  6: 'Arquiteto de Sistemas',
  7: 'Líder Fullstack & Gestão',
  8: 'Arquimago Tech Internacional',
};

export function loadStoredGoals(): StudyGoal[] {
  try {
    const raw = localStorage.getItem(GOALS_STORAGE_KEY);
    if (!raw) return INITIAL_ALURA_GOALS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_ALURA_GOALS;
  } catch {
    return INITIAL_ALURA_GOALS;
  }
}

export function saveStoredGoals(goals: StudyGoal[]): void {
  try {
    localStorage.setItem(GOALS_STORAGE_KEY, JSON.stringify(goals));
  } catch (err) {
    console.error('Failed to save goals', err);
  }
}

export function loadStoredHeroStats(): HeroStats {
  try {
    const raw = localStorage.getItem(STATS_STORAGE_KEY);
    if (!raw) return INITIAL_HERO_STATS;
    const parsed = JSON.parse(raw);
    return { ...INITIAL_HERO_STATS, ...parsed };
  } catch {
    return INITIAL_HERO_STATS;
  }
}

export function saveStoredHeroStats(stats: HeroStats): void {
  try {
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
  } catch (err) {
    console.error('Failed to save stats', err);
  }
}

export function loadStoredRoutine(): RoutineBlock[] {
  try {
    const raw = localStorage.getItem(ROUTINE_STORAGE_KEY);
    if (!raw) return INITIAL_ALURA_ROUTINE;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_ALURA_ROUTINE;
  } catch {
    return INITIAL_ALURA_ROUTINE;
  }
}

export function saveStoredRoutine(routine: RoutineBlock[]): void {
  try {
    localStorage.setItem(ROUTINE_STORAGE_KEY, JSON.stringify(routine));
  } catch (err) {
    console.error('Failed to save routine', err);
  }
}

export function loadStoredDevLogs(): DevLogEntry[] {
  try {
    const raw = localStorage.getItem(DEVLOG_STORAGE_KEY);
    if (!raw) {
      return [
        {
          id: 'log-1',
          date: new Date().toISOString().split('T')[0],
          whatILearned: 'Entendi a estrutura de componentes no React e a importância de persistir estados no LocalStorage para não perder os dados no F5.',
          hoursSpent: 4.5,
          milestoneTitle: 'Concepção do StudyFlow RPG com Alura',
        }
      ];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveStoredDevLogs(logs: DevLogEntry[]): void {
  try {
    localStorage.setItem(DEVLOG_STORAGE_KEY, JSON.stringify(logs));
  } catch (err) {
    console.error('Failed to save logs', err);
  }
}

export function resetAllStorage(): void {
  localStorage.removeItem(GOALS_STORAGE_KEY);
  localStorage.removeItem(STATS_STORAGE_KEY);
  localStorage.removeItem(ROUTINE_STORAGE_KEY);
  localStorage.removeItem(DEVLOG_STORAGE_KEY);
}
