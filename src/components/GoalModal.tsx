import React, { useState, useEffect } from 'react';
import { StudyGoal, GoalDifficulty, GoalStatus } from '../types';
import { X, Sparkles, Calendar, BookOpen, AlertCircle, ShieldAlert } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface GoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (goalData: Omit<StudyGoal, 'id' | 'createdAt' | 'updatedAt'>, id?: string) => void;
  goalToEdit?: StudyGoal | null;
}

const CATEGORIES = [
  'Lógica & Algoritmos',
  'Frontend (React/CSS)',
  'Backend & APIs',
  'Banco de Dados & SQL',
  'Git & Portfólio',
  'Inglês para Tech',
  'Outros Estudos'
];

export const GoalModal: React.FC<GoalModalProps> = ({
  isOpen,
  onClose,
  onSave,
  goalToEdit,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState<GoalStatus>('todo');
  const [difficulty, setDifficulty] = useState<GoalDifficulty>('medium');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (goalToEdit) {
      setTitle(goalToEdit.title);
      setDescription(goalToEdit.description);
      setDeadline(goalToEdit.deadline);
      setStatus(goalToEdit.status);
      setDifficulty(goalToEdit.difficulty);
      setCategory(goalToEdit.category || CATEGORIES[0]);
      setError('');
    } else {
      // Default new goal: deadline in 7 days
      const d = new Date();
      d.setDate(d.getDate() + 7);
      const defaultDate = d.toISOString().split('T')[0];

      setTitle('');
      setDescription('');
      setDeadline(defaultDate);
      setStatus('todo');
      setDifficulty('medium');
      setCategory(CATEGORIES[0]);
      setError('');
    }
  }, [goalToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Por favor, informe o título do seu objetivo de estudo.');
      return;
    }

    if (!deadline) {
      setError('Por favor, defina um prazo para sua missão.');
      return;
    }

    // Calculate XP and Gems based on difficulty
    const xpRewards: Record<GoalDifficulty, number> = {
      easy: 50,
      medium: 100,
      epic: 200,
    };

    const gemRewards: Record<GoalDifficulty, number> = {
      easy: 5,
      medium: 15,
      epic: 30,
    };

    onSave(
      {
        title: title.trim(),
        description: description.trim(),
        deadline,
        status,
        difficulty,
        category,
        xpReward: xpRewards[difficulty],
        gemReward: gemRewards[difficulty],
      },
      goalToEdit?.id
    );

    soundFX.playClick();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border-2 border-amber-500/80 rounded-2xl shadow-2xl p-6 overflow-hidden">
        {/* Retro Header Strip */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-emerald-400 to-amber-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              {goalToEdit ? 'Editar Missão de Estudo' : 'Cadastrar Novo Objetivo'}
            </h2>
            <p className="text-xs text-slate-400 font-sans">
              Defina sua meta com clareza para conquistar recompensas em XP!
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-rose-950/50 border border-rose-600/60 flex items-center gap-2 text-xs text-rose-300">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Título */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Título do Objetivo <span className="text-amber-400">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              placeholder="Ex: Aprender useState e useEffect no React"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
              autoFocus
            />
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Descrição ou Detalhes
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Ex: Ler a documentação oficial, construir um contador de estudos e anotar os conceitos de ciclo de vida."
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors resize-none"
            />
          </div>

          {/* Categoria e Prazo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Categoria / Área
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-amber-400"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                Prazo Estimado <span className="text-amber-400">*</span>
              </label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Dificuldade (XP Reward) e Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Dificuldade da Missão
              </label>
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800">
                <button
                  type="button"
                  onClick={() => setDifficulty('easy')}
                  className={`py-1.5 px-2 text-center text-[11px] font-medium rounded-md transition-colors ${
                    difficulty === 'easy'
                      ? 'bg-emerald-800 text-emerald-200 border border-emerald-500 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Fácil <span className="block text-[9px] text-emerald-300 font-mono">+50 XP</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDifficulty('medium')}
                  className={`py-1.5 px-2 text-center text-[11px] font-medium rounded-md transition-colors ${
                    difficulty === 'medium'
                      ? 'bg-amber-900/80 text-amber-200 border border-amber-500 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Média <span className="block text-[9px] text-amber-300 font-mono">+100 XP</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDifficulty('epic')}
                  className={`py-1.5 px-2 text-center text-[11px] font-medium rounded-md transition-colors ${
                    difficulty === 'epic'
                      ? 'bg-purple-900/80 text-purple-200 border border-purple-500 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Épica <span className="block text-[9px] text-purple-300 font-mono">+200 XP</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
                Status Atual
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as GoalStatus)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-amber-400"
              >
                <option value="todo">A Fazer (Pendente)</option>
                <option value="in_progress">Em Andamento (Em Jornada)</option>
                <option value="done">Concluído (Missão Cumprida)</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-800/80 hover:bg-slate-800 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 rounded-lg shadow-md border border-amber-300 active:scale-95 transition-all"
            >
              {goalToEdit ? 'Salvar Alterações' : 'Cadastrar Objetivo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
