import React from 'react';
import { StudyGoal } from '../types';
import { AlertTriangle } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  goal: StudyGoal | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  goal,
  onCancel,
  onConfirm,
}) => {
  if (!isOpen || !goal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-slate-900 border-2 border-rose-500/80 rounded-2xl shadow-2xl p-6 text-center">
        <div className="w-12 h-12 mx-auto mb-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 text-rose-400" />
        </div>

        <h3 className="text-base font-bold text-slate-100 mb-1.5">
          Excluir Missão de Estudo?
        </h3>

        <p className="text-xs text-slate-300 mb-2 leading-relaxed">
          Tem certeza de que deseja remover o objetivo:{' '}
          <span className="font-semibold text-rose-300">"{goal.title}"</span>?
        </p>

        <p className="text-[11px] text-slate-400 mb-5">
          Essa ação não poderá ser desfeita.
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => {
              soundFX.playClick();
              onCancel();
            }}
            type="button"
            className="px-4 py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Voltar / Cancelar
          </button>
          <button
            onClick={() => {
              soundFX.playDelete();
              onConfirm();
            }}
            type="button"
            className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-lg shadow transition-colors"
          >
            Sim, Excluir Objetivo
          </button>
        </div>
      </div>
    </div>
  );
};
