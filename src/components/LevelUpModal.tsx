import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { HeroStats } from '../types';
import { Sparkles, Trophy, Heart } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface LevelUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: HeroStats;
  newLevel: number;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({
  isOpen,
  onClose,
  stats,
  newLevel,
}) => {
  useEffect(() => {
    if (isOpen) {
      soundFX.playLevelUp();
      // Confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#eab308', '#10b981', '#38bdf8', '#f43f5e'],
        });
      } catch {
        // Fallback if canvas-confetti issue
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-slate-900 border-4 border-amber-400 rounded-3xl shadow-2xl p-6 text-center overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 bg-radial from-amber-500/20 via-transparent to-transparent pointer-events-none" />

        {/* Triforce / Trophy Badge */}
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center animate-bounce">
          <Trophy className="w-8 h-8 text-amber-300 drop-shadow" />
        </div>

        <span className="font-pixel text-xs text-amber-400 tracking-widest block mb-1">
          ✦ LEVEL UP! ✦
        </span>

        <h2 className="text-2xl font-black text-white mb-1 tracking-tight">
          NÍVEL {newLevel} ALCANÇADO!
        </h2>

        <p className="text-xs font-semibold text-emerald-400 font-sans mb-4">
          Novo Título: <span className="text-amber-300">"{stats.title}"</span>
        </p>

        {/* Unlocked perks list */}
        <div className="bg-slate-950/80 rounded-xl p-3.5 border border-slate-800 text-left mb-5 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-slate-200">
            <Heart className="w-4 h-4 text-rose-400 fill-rose-500" />
            <span>Vida máxima aumentada (+1 Coração)</span>
          </div>
          <div className="flex items-center gap-2 text-slate-200">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Bônus de Level Up: <strong className="text-amber-300">+50 Gemas</strong></span>
          </div>
          <div className="flex items-center gap-2 text-slate-200">
            <div className="w-4 h-4 rounded bg-emerald-500/30 flex items-center justify-center text-[10px] text-emerald-400 font-bold">✓</div>
            <span>Estamina de Estudos 100% Recarregada!</span>
          </div>
        </div>

        <button
          onClick={() => {
            soundFX.playClick();
            onClose();
          }}
          type="button"
          className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg border border-amber-200 transition-transform active:scale-95"
        >
          Continuar Jornada
        </button>
      </div>
    </div>
  );
};
