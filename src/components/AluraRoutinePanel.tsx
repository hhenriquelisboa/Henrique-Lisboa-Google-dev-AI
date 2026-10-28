import React, { useState, useEffect } from 'react';
import { RoutineBlock } from '../types';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Code, 
  Rocket, 
  FileText, 
  Sparkles,
  Zap
} from 'lucide-react';
import { soundFX } from '../utils/audio';

interface AluraRoutinePanelProps {
  routine: RoutineBlock[];
  onToggleBlock: (blockId: string) => void;
  onResetDay: () => void;
  onSessionComplete: (minutes: number, xpGained: number) => void;
}

export const AluraRoutinePanel: React.FC<AluraRoutinePanelProps> = ({
  routine,
  onToggleBlock,
  onResetDay,
  onSessionComplete,
}) => {
  // Focus Timer state
  const [activeTimerBlockId, setActiveTimerBlockId] = useState<string | null>(null);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number>(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [selectedTimerPreset, setSelectedTimerPreset] = useState<25 | 45 | 90>(25);

  // Active block reference
  const activeBlock = routine.find((b) => b.id === activeTimerBlockId) || routine[0];

  // Calculate total minutes planned and completed
  const totalPlannedMinutes = routine.reduce((acc, b) => acc + b.durationMinutes, 0); // 300 min = 5 hours
  const completedMinutes = routine
    .filter((b) => b.completed)
    .reduce((acc, b) => acc + b.durationMinutes, 0);
  const completionPercentage = Math.round((completedMinutes / totalPlannedMinutes) * 100);

  // Timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSecondsLeft > 0) {
      interval = setInterval(() => {
        setTimerSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (isTimerRunning && timerSecondsLeft === 0) {
      // Completed timer!
      setIsTimerRunning(false);
      soundFX.playQuestComplete();
      soundFX.playRupee();
      const minutesFinished = selectedTimerPreset;
      const xpEarned = minutesFinished * 2; // e.g. 25 min = 50 XP
      onSessionComplete(minutesFinished, xpEarned);

      // Auto check block if not already completed
      if (activeBlock && !activeBlock.completed) {
        onToggleBlock(activeBlock.id);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSecondsLeft, selectedTimerPreset, activeBlock, onSessionComplete, onToggleBlock]);

  // Set timer preset
  const handleSelectPreset = (minutes: 25 | 45 | 90) => {
    setSelectedTimerPreset(minutes);
    setTimerSecondsLeft(minutes * 60);
    setIsTimerRunning(false);
    soundFX.playClick();
  };

  const handleStartTimer = (blockId: string) => {
    setActiveTimerBlockId(blockId);
    soundFX.playSword();
    setIsTimerRunning(true);
  };

  const handlePauseTimer = () => {
    setIsTimerRunning(false);
    soundFX.playClick();
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setTimerSecondsLeft(selectedTimerPreset * 60);
    soundFX.playClick();
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getCategoryIcon = (category: RoutineBlock['category']) => {
    switch (category) {
      case 'teorico':
        return <BookOpen className="w-4 h-4 text-sky-400" />;
      case 'pratica':
        return <Code className="w-4 h-4 text-emerald-400" />;
      case 'projeto':
        return <Rocket className="w-4 h-4 text-amber-400" />;
      case 'revisao':
        return <FileText className="w-4 h-4 text-purple-400" />;
      case 'opcional':
        return <Zap className="w-4 h-4 text-rose-400" />;
    }
  };

  const formatHours = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Alura Methodology Overview */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/60 border-2 border-indigo-500/40 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-pixel text-xs text-indigo-300">
                ROTINA DE SUCESSO ALURA
              </span>
              <span className="text-[10px] bg-indigo-950 text-indigo-300 border border-indigo-800 px-2 py-0.5 rounded font-mono">
                4h a 6h / dia
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Método sugerido pela gestão pedagógica: dividir o tempo em blocos estruturados e focar em <strong>1 entrega prática por semana</strong>.
            </p>
          </div>

          {/* Today's Hours Progress */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-right flex items-center justify-between md:justify-end gap-4">
            <div>
              <span className="text-[11px] text-slate-400 block">Horas Concluídas Hoje</span>
              <span className="font-pixel text-base text-emerald-400 tabular-nums">
                {formatHours(completedMinutes)} / {formatHours(totalPlannedMinutes)}
              </span>
            </div>
            <button
              onClick={onResetDay}
              type="button"
              className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1 border border-slate-800 px-2.5 py-1.5 rounded-lg hover:bg-slate-900 transition-colors"
              title="Zerar blocos para começar um novo dia de estudos"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Novo Dia</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-slate-950 rounded-full border border-slate-800 overflow-hidden p-[1px]">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-emerald-400 to-amber-400 rounded-full transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 5 Alura Routine Blocks (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold text-slate-200">
              Blocos Diários do Plano Alura
            </span>
            <span>Clique no bloco para marcar como feito ou iniciar o timer</span>
          </div>

          {routine.map((block) => (
            <div
              key={block.id}
              className={`p-3.5 rounded-xl border transition-all ${
                block.completed
                  ? 'bg-slate-900/50 border-emerald-900/40 opacity-75'
                  : activeTimerBlockId === block.id
                  ? 'bg-slate-900 border-amber-500/80 shadow-md ring-1 ring-amber-500/50'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <button
                    onClick={() => {
                      soundFX.playQuestComplete();
                      onToggleBlock(block.id);
                    }}
                    type="button"
                    className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                      block.completed
                        ? 'bg-emerald-600 border-emerald-500 text-white'
                        : 'border-slate-600 hover:border-emerald-400 text-transparent'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {getCategoryIcon(block.category)}
                      <h4
                        className={`text-sm font-bold ${
                          block.completed
                            ? 'line-through text-slate-400'
                            : 'text-slate-100'
                        }`}
                      >
                        {block.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed mb-2">
                      {block.notes}
                    </p>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1 text-slate-400 font-mono">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {formatHours(block.durationMinutes)}
                      </span>
                      <span className="text-slate-600">·</span>
                      <span className="text-amber-400 font-mono text-[11px]">
                        +{block.durationMinutes} XP
                      </span>
                    </div>
                  </div>
                </div>

                {/* Focus Button */}
                <button
                  onClick={() => handleStartTimer(block.id)}
                  type="button"
                  className="px-2.5 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-amber-300 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap"
                  title="Focar neste bloco com o cronômetro"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Focar</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Retro Focus Dojo Timer (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border-2 border-amber-500/60 rounded-2xl p-5 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-xs font-pixel text-amber-400">
                    DOJO DE FOCO
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    Treino de Autonomia e Concentração
                  </span>
                </div>
              </div>

              {/* Presets */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                <button
                  onClick={() => handleSelectPreset(25)}
                  type="button"
                  className={`px-2 py-1 text-[11px] font-mono rounded ${
                    selectedTimerPreset === 25
                      ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  25m
                </button>
                <button
                  onClick={() => handleSelectPreset(45)}
                  type="button"
                  className={`px-2 py-1 text-[11px] font-mono rounded ${
                    selectedTimerPreset === 45
                      ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  45m
                </button>
                <button
                  onClick={() => handleSelectPreset(90)}
                  type="button"
                  className={`px-2 py-1 text-[11px] font-mono rounded ${
                    selectedTimerPreset === 90
                      ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  90m
                </button>
              </div>
            </div>

            {/* Currently Focused Block */}
            <div className="bg-slate-950/70 rounded-xl p-3 border border-slate-800 mb-6 text-center">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1">
                Foco no Bloco
              </span>
              <p className="text-xs font-bold text-slate-200 truncate">
                {activeBlock.title}
              </p>
            </div>

            {/* Big Countdown Display */}
            <div className="text-center my-6">
              <div className="font-pixel text-4xl sm:text-5xl text-amber-300 tracking-wider drop-shadow-[0_0_12px_rgba(245,158,11,0.3)]">
                {formatTime(timerSecondsLeft)}
              </div>
              <span className="text-xs text-slate-500 mt-2 block">
                {isTimerRunning ? 'Sessão em andamento · Mantenha o foco!' : 'Pausado / Pronto para treinar'}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2">
              {isTimerRunning ? (
                <button
                  onClick={handlePauseTimer}
                  type="button"
                  className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-colors flex items-center justify-center gap-2"
                >
                  <Pause className="w-4 h-4 fill-current" />
                  <span>Pausar Treino</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    soundFX.playSword();
                    setIsTimerRunning(true);
                  }}
                  type="button"
                  className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg border border-emerald-400/50 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Iniciar Sessão (+{selectedTimerPreset * 2} XP)</span>
                </button>
              )}

              <button
                onClick={handleResetTimer}
                type="button"
                className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-slate-200 rounded-xl transition-colors"
                title="Reiniciar cronômetro"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] text-center text-slate-400">
              Completar o tempo concede <strong className="text-amber-400">XP</strong> e recarrega vigor do herói!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
