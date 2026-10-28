/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import { StudyGoal, HeroStats, GoalStatus, RoutineBlock, DevLogEntry } from './types';
import { 
  loadStoredGoals, 
  saveStoredGoals, 
  loadStoredHeroStats, 
  saveStoredHeroStats, 
  loadStoredRoutine,
  saveStoredRoutine,
  loadStoredDevLogs,
  saveStoredDevLogs,
  INITIAL_ALURA_GOALS, 
  INITIAL_ALURA_ROUTINE,
  INITIAL_HERO_STATS,
  HERO_TITLES_BY_LEVEL 
} from './utils/storage';
import { soundFX } from './utils/audio';
import { GameHud } from './components/GameHud';
import { PixelHero } from './components/PixelHero';
import { GoalCard } from './components/GoalCard';
import { GoalModal } from './components/GoalModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { LevelUpModal } from './components/LevelUpModal';
import { AluraRoutinePanel } from './components/AluraRoutinePanel';
import { DevLogPanel } from './components/DevLogPanel';
import { RetroLofiPlayer } from './components/RetroLofiPlayer';
import { 
  Plus, 
  Search, 
  Filter, 
  Trophy, 
  CheckCircle, 
  Clock, 
  Compass, 
  ExternalLink,
  Info,
  ChevronDown,
  Sparkles,
  CalendarCheck,
  BookOpen,
  Target
} from 'lucide-react';

export default function App() {
  // Navigation View
  const [activeTab, setActiveTab] = useState<'goals' | 'routine' | 'devlog'>('goals');

  // Goals & Stats State
  const [goals, setGoals] = useState<StudyGoal[]>([]);
  const [heroStats, setHeroStats] = useState<HeroStats>(INITIAL_HERO_STATS);
  const [routine, setRoutine] = useState<RoutineBlock[]>(INITIAL_ALURA_ROUTINE);
  const [devLogs, setDevLogs] = useState<DevLogEntry[]>([]);

  // Filtering & Search
  const [filterStatus, setFilterStatus] = useState<GoalStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'deadline' | 'recent' | 'difficulty'>('deadline');
  
  // Modals & Action
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<StudyGoal | null>(null);
  const [deletingGoal, setDeletingGoal] = useState<StudyGoal | null>(null);
  const [levelUpData, setLevelUpData] = useState<{ isOpen: boolean; newLevel: number }>({
    isOpen: false,
    newLevel: 1,
  });
  const [heroActionState, setHeroActionState] = useState<'idle' | 'victory' | 'attack'>('idle');
  const [showAluraRoadmap, setShowAluraRoadmap] = useState(false);

  // Initial load from localStorage
  useEffect(() => {
    setGoals(loadStoredGoals());
    const storedStats = loadStoredHeroStats();
    setHeroStats(storedStats);
    setRoutine(loadStoredRoutine());
    setDevLogs(loadStoredDevLogs());
    soundFX.enabled = storedStats.soundEnabled;
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (goals.length > 0) saveStoredGoals(goals);
  }, [goals]);

  useEffect(() => {
    saveStoredHeroStats(heroStats);
  }, [heroStats]);

  useEffect(() => {
    saveStoredRoutine(routine);
  }, [routine]);

  useEffect(() => {
    saveStoredDevLogs(devLogs);
  }, [devLogs]);

  // Sound preference toggle
  const handleToggleSound = () => {
    const updated = !heroStats.soundEnabled;
    soundFX.enabled = updated;
    setHeroStats((prev) => ({ ...prev, soundEnabled: updated }));
  };

  // Add XP and handle leveling logic
  const grantHeroRewards = (xpAmount: number, gemAmount: number) => {
    setHeroStats((prev) => {
      let newCurrentXp = prev.currentXp + xpAmount;
      let newLevel = prev.level;
      let newXpToNext = prev.xpToNextLevel;
      let leveledUp = false;
      let newHearts = prev.hearts;
      let newMaxHearts = prev.maxHearts;

      // Check level-up threshold: Level * 100 XP
      while (newCurrentXp >= newXpToNext) {
        newCurrentXp -= newXpToNext;
        newLevel += 1;
        newXpToNext = newLevel * 100;
        leveledUp = true;
        newMaxHearts = Math.min(8, newMaxHearts + 1);
        newHearts = newMaxHearts;
      }

      const updatedTitle = HERO_TITLES_BY_LEVEL[newLevel] || `Arquimago Tech Nvl ${newLevel}`;

      if (leveledUp) {
        setLevelUpData({ isOpen: true, newLevel });
        setHeroActionState('victory');
        setTimeout(() => setHeroActionState('idle'), 3000);
      }

      return {
        ...prev,
        level: newLevel,
        currentXp: newCurrentXp,
        xpToNextLevel: newXpToNext,
        totalXp: prev.totalXp + xpAmount,
        gems: prev.gems + gemAmount + (leveledUp ? 50 : 0),
        hearts: newHearts,
        maxHearts: newMaxHearts,
        title: updatedTitle,
        questsCompleted: prev.questsCompleted + 1,
      };
    });
  };

  // Create or Update Goal
  const handleSaveGoal = (
    goalData: Omit<StudyGoal, 'id' | 'createdAt' | 'updatedAt'>,
    id?: string
  ) => {
    const now = new Date().toISOString();

    if (id) {
      setGoals((prev) =>
        prev.map((g) =>
          g.id === id ? { ...g, ...goalData, updatedAt: now } : g
        )
      );
    } else {
      const newGoal: StudyGoal = {
        id: `goal-${Date.now()}`,
        ...goalData,
        createdAt: now,
        updatedAt: now,
      };
      setGoals((prev) => [newGoal, ...prev]);

      // Small XP boost for planning a quest (+15 XP)
      setHeroStats((prev) => ({
        ...prev,
        currentXp: prev.currentXp + 15,
        totalXp: prev.totalXp + 15,
      }));
    }
  };

  // Status Change (Todo -> In Progress -> Done)
  const handleStatusChange = (goal: StudyGoal, newStatus: GoalStatus) => {
    const now = new Date().toISOString();

    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === goal.id) {
          return {
            ...g,
            status: newStatus,
            updatedAt: now,
            completedAt: newStatus === 'done' ? now : g.completedAt,
          };
        }
        return g;
      })
    );

    if (newStatus === 'done' && goal.status !== 'done') {
      soundFX.playQuestComplete();
      soundFX.playRupee();
      setHeroActionState('victory');
      setTimeout(() => setHeroActionState('idle'), 2500);
      grantHeroRewards(goal.xpReward, goal.gemReward);
    } else if (newStatus === 'in_progress') {
      soundFX.playSword();
    }
  };

  // Delete Goal
  const handleConfirmDelete = () => {
    if (!deletingGoal) return;
    setGoals((prev) => prev.filter((g) => g.id !== deletingGoal.id));
    setDeletingGoal(null);
  };

  // Reset to default seed with Alura recommendations
  const handleResetDefaults = () => {
    if (window.confirm('Deseja recarregar o plano de estudos e a rotina recomendados pela consultoria Alura?')) {
      setGoals(INITIAL_ALURA_GOALS);
      setRoutine(INITIAL_ALURA_ROUTINE);
      setHeroStats(INITIAL_HERO_STATS);
      soundFX.playClick();
    }
  };

  // Routine block toggle
  const handleToggleRoutineBlock = (blockId: string) => {
    setRoutine((prev) =>
      prev.map((b) => {
        if (b.id === blockId) {
          const willComplete = !b.completed;
          if (willComplete) {
            grantHeroRewards(b.durationMinutes, Math.round(b.durationMinutes / 10));
          }
          return { ...b, completed: willComplete };
        }
        return b;
      })
    );
  };

  // Reset day's routine blocks
  const handleResetDayRoutine = () => {
    setRoutine((prev) => prev.map((b) => ({ ...b, completed: false })));
    soundFX.playClick();
  };

  // Focus session completed
  const handleSessionComplete = (minutes: number, xpGained: number) => {
    grantHeroRewards(xpGained, 10);
    setHeroStats((prev) => ({
      ...prev,
      todayMinutesStudied: prev.todayMinutesStudied + minutes,
      hearts: Math.min(prev.maxHearts, prev.hearts + 1),
    }));
  };

  // Add DevLog Entry
  const handleAddDevLog = (entry: Omit<DevLogEntry, 'id'>) => {
    const newEntry: DevLogEntry = {
      id: `log-${Date.now()}`,
      ...entry,
    };
    setDevLogs((prev) => [newEntry, ...prev]);
    grantHeroRewards(30, 5); // +30 XP for writing the daily devlog
  };

  // Extract unique categories for filter
  const categories = useMemo(() => {
    const set = new Set<string>();
    goals.forEach((g) => {
      if (g.category) set.add(g.category);
    });
    return Array.from(set);
  }, [goals]);

  // Filtered & Sorted Goals
  const filteredGoals = useMemo(() => {
    return goals
      .filter((goal) => {
        if (filterStatus !== 'all' && goal.status !== filterStatus) return false;
        if (categoryFilter !== 'all' && goal.category !== categoryFilter) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = goal.title.toLowerCase().includes(q);
          const matchDesc = goal.description.toLowerCase().includes(q);
          const matchCat = goal.category.toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchCat) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'deadline') return a.deadline.localeCompare(b.deadline);
        if (sortBy === 'difficulty') {
          const weight = { epic: 3, medium: 2, easy: 1 };
          return weight[b.difficulty] - weight[a.difficulty];
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [goals, filterStatus, categoryFilter, searchQuery, sortBy]);

  // Statistics counters
  const statsSummary = useMemo(() => {
    const total = goals.length;
    const completed = goals.filter((g) => g.status === 'done').length;
    const inProgress = goals.filter((g) => g.status === 'in_progress').length;
    const todo = goals.filter((g) => g.status === 'todo').length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, inProgress, todo, completionRate };
  }, [goals]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* 1. Zelda-Style Top Navigation HUD */}
      <GameHud
        stats={heroStats}
        onToggleSound={handleToggleSound}
        onResetProgress={handleResetDefaults}
        onOpenNewGoalModal={() => {
          setEditingGoal(null);
          setIsGoalModalOpen(true);
        }}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 space-y-6">
        {/* 2. Hero & Landscape Adventure Banner */}
        <section className="relative rounded-2xl overflow-hidden border-2 border-amber-500/50 shadow-2xl bg-slate-900">
          <div className="absolute inset-0 z-0">
            <img
              src="/src/assets/images/zelda_snes_study_landscape_1793211100473.jpg"
              alt="Cenário 16-bit Zelda SNES"
              className="w-full h-full object-cover object-bottom opacity-40 brightness-75 pixelated"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent" />
          </div>

          <div className="relative z-10 p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-300">
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Plano de Carreira Alura · Trilha Henrique Lisboa</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>Taxa de Vitória:</span>
                <strong className="text-emerald-400 font-bold tabular-nums">
                  {statsSummary.completionRate}%
                </strong>
              </div>
            </div>

            {/* Pixel Art Hero & Interactive Dialogue */}
            <PixelHero
              stats={heroStats}
              actionState={heroActionState}
            />

            {/* Quick Stats Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-800/80">
              <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3">
                <span className="text-[11px] text-slate-400 block mb-0.5">Missões Alura</span>
                <span className="text-xl font-bold font-pixel text-slate-100 tabular-nums">
                  {statsSummary.total}
                </span>
              </div>
              <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3">
                <span className="text-[11px] text-slate-400 block mb-0.5">Pendentes</span>
                <span className="text-xl font-bold font-pixel text-slate-300 tabular-nums">
                  {statsSummary.todo}
                </span>
              </div>
              <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3">
                <span className="text-[11px] text-slate-400 block mb-0.5">Em Andamento</span>
                <span className="text-xl font-bold font-pixel text-amber-400 tabular-nums">
                  {statsSummary.inProgress}
                </span>
              </div>
              <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3">
                <span className="text-[11px] text-slate-400 block mb-0.5">Concluídas</span>
                <span className="text-xl font-bold font-pixel text-emerald-400 tabular-nums">
                  {statsSummary.completed}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Alura Consulting Roadmap Drawer */}
        <div className="bg-slate-900/80 border border-indigo-500/30 rounded-xl overflow-hidden shadow-lg">
          <button
            type="button"
            onClick={() => setShowAluraRoadmap(!showAluraRoadmap)}
            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-800/50 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Info className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-semibold text-slate-200">
                Diretrizes da Gestão de Sucesso Alura (Rafa) para a transição do Henrique
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-indigo-300">
              <span>{showAluraRoadmap ? 'Ocultar Resumo' : 'Ver Diagnóstico Pedagógico'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showAluraRoadmap ? 'rotate-180' : ''}`} />
            </div>
          </button>

          {showAluraRoadmap && (
            <div className="p-4 sm:p-5 pt-0 border-t border-slate-800/60 bg-slate-950/50 text-xs text-slate-300 space-y-3.5">
              <p className="leading-relaxed">
                A consultoria da Alura identificou que você <strong>não está começando do zero</strong>: tem bagagem forte em Administração, liderança de 40 pessoas nos EUA, já configurou servidor na <strong>Oracle Cloud</strong> e tem experiência internacional agora em Portugal.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-slate-900/90 p-3.5 rounded-lg border border-slate-800">
                  <strong className="text-indigo-300 block mb-1">1. Não Estude Tudo ao Mesmo Tempo</strong>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Mantenha a <em>Carreira Dev Full Stack</em> como trilha principal e use Python/APIs como reforço. A prioridade é conectar conhecimentos, não acumular certificados soltos.
                  </p>
                </div>
                <div className="bg-slate-900/90 p-3.5 rounded-lg border border-slate-800">
                  <strong className="text-emerald-300 block mb-1">2. Uma Entrega Prática por Semana</strong>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Construir soluções reais (como o StudyFlow RPG e a documentação da VM na Oracle) para consolidar o portfólio no GitHub e demonstrar autonomia aos recrutadores.
                  </p>
                </div>
                <div className="bg-slate-900/90 p-3.5 rounded-lg border border-slate-800">
                  <strong className="text-amber-300 block mb-1">3. Sua Bagagem é Diferencial</strong>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Sua experiência anterior com gestão de equipes e negócios não deve ser descartada. Empresas buscam devs que entendem do negócio e se comunicam bem.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4. Main Navigation Mode Tabs (Missões vs Rotina Alura vs DevLog) */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => {
              soundFX.playClick();
              setActiveTab('goals');
            }}
            type="button"
            className={`px-4 py-2.5 rounded-xl font-medium text-xs flex items-center gap-2 transition-all ${
              activeTab === 'goals'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>Objetivos & Metas Alura ({goals.length})</span>
          </button>

          <button
            onClick={() => {
              soundFX.playClick();
              setActiveTab('routine');
            }}
            type="button"
            className={`px-4 py-2.5 rounded-xl font-medium text-xs flex items-center gap-2 transition-all ${
              activeTab === 'routine'
                ? 'bg-indigo-500 text-white font-bold shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Rotina Diária (4h a 6h) & Dojo de Foco</span>
          </button>

          <button
            onClick={() => {
              soundFX.playClick();
              setActiveTab('devlog');
            }}
            type="button"
            className={`px-4 py-2.5 rounded-xl font-medium text-xs flex items-center gap-2 transition-all ${
              activeTab === 'devlog'
                ? 'bg-purple-600 text-white font-bold shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Diário de Bordo ({devLogs.length})</span>
          </button>
        </div>

        {/* 5. Dynamic Content based on Active Tab */}
        {activeTab === 'routine' && (
          <AluraRoutinePanel
            routine={routine}
            onToggleBlock={handleToggleRoutineBlock}
            onResetDay={handleResetDayRoutine}
            onSessionComplete={handleSessionComplete}
          />
        )}

        {activeTab === 'devlog' && (
          <DevLogPanel
            logs={devLogs}
            onAddLog={handleAddDevLog}
          />
        )}

        {activeTab === 'goals' && (
          <section className="space-y-4">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2 tracking-tight">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  Quadro de Missões Pedagógicas
                </h2>
                <p className="text-xs text-slate-400">
                  Objetivos práticos alinhados às orientações de transição de carreira para tech.
                </p>
              </div>

              <button
                onClick={() => {
                  soundFX.playClick();
                  setEditingGoal(null);
                  setIsGoalModalOpen(true);
                }}
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold text-xs rounded-xl border border-emerald-400/50 shadow-md transition-all active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Cadastrar Novo Objetivo</span>
              </button>
            </div>

            {/* Filter Bar & Search */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
              <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg overflow-x-auto">
                <button
                  onClick={() => {
                    soundFX.playClick();
                    setFilterStatus('all');
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                    filterStatus === 'all'
                      ? 'bg-slate-800 text-amber-400 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Todas ({goals.length})
                </button>
                <button
                  onClick={() => {
                    soundFX.playClick();
                    setFilterStatus('todo');
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    filterStatus === 'todo'
                      ? 'bg-slate-800 text-amber-400 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>A Fazer</span>
                  <span className="text-[10px] opacity-75">({statsSummary.todo})</span>
                </button>
                <button
                  onClick={() => {
                    soundFX.playClick();
                    setFilterStatus('in_progress');
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    filterStatus === 'in_progress'
                      ? 'bg-slate-800 text-amber-400 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>Em Andamento</span>
                  <span className="text-[10px] opacity-75">({statsSummary.inProgress})</span>
                </button>
                <button
                  onClick={() => {
                    soundFX.playClick();
                    setFilterStatus('done');
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    filterStatus === 'done'
                      ? 'bg-slate-800 text-emerald-400 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  <span>Concluídas</span>
                  <span className="text-[10px] opacity-75">({statsSummary.completed})</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="relative flex-1 sm:w-56">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar missão..."
                    className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                {categories.length > 0 && (
                  <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1">
                    <Filter className="w-3 h-3 text-slate-400" />
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="bg-transparent text-xs text-slate-300 focus:outline-none cursor-pointer"
                    >
                      <option value="all">Todas as Áreas</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer"
                >
                  <option value="deadline">Ordenar por: Prazo</option>
                  <option value="recent">Ordenar por: Mais Recentes</option>
                  <option value="difficulty">Ordenar por: Maior XP</option>
                </select>
              </div>
            </div>

            {/* Goals Cards Grid */}
            {filteredGoals.length === 0 ? (
              <div className="rounded-2xl border-2 border-dashed border-slate-800 p-12 text-center bg-slate-900/40">
                <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-base font-bold text-slate-200 mb-1">
                  Nenhuma missão encontrada
                </h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
                  {searchQuery || categoryFilter !== 'all' || filterStatus !== 'all'
                    ? 'Nenhum objetivo corresponde aos filtros ativos.'
                    : 'Cadastre seu primeiro objetivo de estudos para começar a acumular XP!'}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setCategoryFilter('all');
                    setFilterStatus('all');
                    setIsGoalModalOpen(true);
                  }}
                  type="button"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow-md transition-colors"
                >
                  Criar Primeiro Objetivo
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredGoals.map((goal) => (
                  <GoalCard
                    key={goal.id}
                    goal={goal}
                    onEdit={(g) => {
                      setEditingGoal(g);
                      setIsGoalModalOpen(true);
                    }}
                    onDelete={(g) => {
                      soundFX.playClick();
                      setDeletingGoal(g);
                    }}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-5 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[10px] text-amber-400">STUDYFLOW RPG</span>
            <span>· Sistema Operacional de Estudos de Henrique Lisboa (Alura Ultra Lab)</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Armazenamento local ativo · Dados preservados ao recarregar a página
          </div>
        </div>
      </footer>

      {/* Modals */}
      <GoalModal
        isOpen={isGoalModalOpen}
        onClose={() => setIsGoalModalOpen(false)}
        onSave={handleSaveGoal}
        goalToEdit={editingGoal}
      />

      <DeleteConfirmModal
        isOpen={Boolean(deletingGoal)}
        goal={deletingGoal}
        onCancel={() => setDeletingGoal(null)}
        onConfirm={handleConfirmDelete}
      />

      <LevelUpModal
        isOpen={levelUpData.isOpen}
        onClose={() => setLevelUpData((prev) => ({ ...prev, isOpen: false }))}
        stats={heroStats}
        newLevel={levelUpData.newLevel}
      />

      {/* Floating 16-Bit Chrono Trigger / Zelda Lofi Radio */}
      <RetroLofiPlayer />
    </div>
  );
}
