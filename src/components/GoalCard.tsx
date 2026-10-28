import React from 'react';
import { StudyGoal } from '../types';
import { 
  Calendar, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Play, 
  RotateCcw,
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { soundFX } from '../utils/audio';

interface GoalCardProps {
  goal: StudyGoal;
  onEdit: (goal: StudyGoal) => void;
  onDelete: (goal: StudyGoal) => void;
  onStatusChange: (goal: StudyGoal, newStatus: StudyGoal['status']) => void;
}

export const GoalCard: React.FC<GoalCardProps> = ({
  goal,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  // Format Date (DD/MM/AAAA)
  const formatDeadline = (dateStr: string) => {
    if (!dateStr) return 'Sem prazo';
    try {
      const [year, month, day] = dateStr.split('-');
      return `${day}/${month}/${year}`;
    } catch {
      return dateStr;
    }
  };

  // Check if overdue
  const isOverdue = () => {
    if (goal.status === 'done') return false;
    const today = new Date().toISOString().split('T')[0];
    return goal.deadline < today;
  };

  const overdue = isOverdue();
  const isDone = goal.status === 'done';
  const isInProgress = goal.status === 'in_progress';

  return (
    <div
      className={`relative rounded-xl p-4 transition-all duration-200 border ${
        isDone
          ? 'bg-slate-900/60 border-emerald-900/40 opacity-80 hover:opacity-100'
          : isInProgress
          ? 'bg-slate-900/90 border-amber-600/50 shadow-md shadow-amber-950/20'
          : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
      }`}
    >
      {/* Top Meta Line: Category & Difficulty XP */}
      <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
        <div className="flex items-center gap-2">
          <span className="font-medium text-slate-300">{goal.category}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="flex items-center gap-1 font-mono text-[11px] text-amber-300">
            <Sparkles className="w-3 h-3 text-amber-400" />
            +{goal.xpReward} XP
          </span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="font-mono text-[11px] text-emerald-400">
            +{goal.gemReward} Gemas
          </span>
        </div>

        {/* Status Text Indicator */}
        <div className="flex items-center gap-1.5">
          {isDone ? (
            <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Concluído
            </span>
          ) : isInProgress ? (
            <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-400">
              <Clock className="w-3.5 h-3.5" />
              Em Andamento
            </span>
          ) : (
            <span className="text-[11px] font-medium text-slate-400">
              Pendente
            </span>
          )}
        </div>
      </div>

      {/* Goal Title */}
      <h3
        className={`text-base font-bold text-slate-100 mb-1.5 tracking-tight ${
          isDone ? 'line-through text-slate-400' : ''
        }`}
      >
        {goal.title}
      </h3>

      {/* Description */}
      {goal.description && (
        <p className="text-xs text-slate-300/90 leading-relaxed mb-3 line-clamp-2">
          {goal.description}
        </p>
      )}

      {/* Deadline Info */}
      <div className="flex items-center gap-2 text-xs mb-3.5">
        <div
          className={`flex items-center gap-1.5 font-medium ${
            overdue
              ? 'text-rose-400'
              : isDone
              ? 'text-slate-400'
              : 'text-slate-300'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Prazo: {formatDeadline(goal.deadline)}</span>
          {overdue && (
            <span className="flex items-center gap-1 text-[11px] text-rose-400 font-semibold ml-1">
              <AlertTriangle className="w-3 h-3" />
              (Vencido)
            </span>
          )}
        </div>
      </div>

      {/* Card Footer: Quick Status Switcher & Edit/Delete Controls */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
        {/* Quick Progression CTA */}
        <div>
          {goal.status === 'todo' && (
            <button
              onClick={() => {
                soundFX.playSword();
                onStatusChange(goal, 'in_progress');
              }}
              type="button"
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-medium transition-colors"
            >
              <Play className="w-3 h-3 fill-amber-300" />
              <span>Iniciar Missão</span>
            </button>
          )}

          {goal.status === 'in_progress' && (
            <button
              onClick={() => {
                onStatusChange(goal, 'done');
              }}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-all active:scale-95"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Concluir (+{goal.xpReward} XP)</span>
            </button>
          )}

          {goal.status === 'done' && (
            <button
              onClick={() => {
                soundFX.playClick();
                onStatusChange(goal, 'todo');
              }}
              type="button"
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reabrir objetivo</span>
            </button>
          )}
        </div>

        {/* Edit & Delete Action Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              soundFX.playClick();
              onEdit(goal);
            }}
            type="button"
            className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors"
            title="Editar Objetivo"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => {
              onDelete(goal);
            }}
            type="button"
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
            title="Excluir Objetivo"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
