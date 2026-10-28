import React from 'react';
import { HeroStats } from '../types';
import { Volume2, VolumeX, Sparkles, RotateCcw } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface GameHudProps {
  stats: HeroStats;
  onToggleSound: () => void;
  onResetProgress: () => void;
  onOpenNewGoalModal: () => void;
}

export const GameHud: React.FC<GameHudProps> = ({
  stats,
  onToggleSound,
  onResetProgress,
  onOpenNewGoalModal,
}) => {
  const xpPercentage = Math.min(
    100,
    Math.round((stats.currentXp / stats.xpToNextLevel) * 100)
  );

  return (
    <header className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur-md border-b-2 border-slate-800 shadow-xl">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Theme Title */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-700/80 border-2 border-emerald-400/80 flex items-center justify-center shadow-inner">
            <span className="font-pixel text-[13px] text-amber-300">SF</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-pixel text-xs text-amber-400 tracking-wider">
                STUDYFLOW
              </span>
              <span className="text-[10px] font-pixel text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-1.5 py-0.5 rounded">
                16-BIT
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans hidden sm:block">
              Organizador de Estudos & RPG de Carreira
            </p>
          </div>
        </div>

        {/* Zelda Style HUD: Hearts + Gems + Level & XP */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 bg-slate-900/90 border border-slate-800 px-3.5 py-2 rounded-xl">
          {/* Hearts Container (SNES Zelda hearts) */}
          <div className="flex items-center gap-1" title={`Vida / Vigor de Estudos: ${stats.hearts}/${stats.maxHearts}`}>
            <span className="text-[10px] font-pixel text-rose-400 hidden md:inline mr-1">
              LIFE
            </span>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: stats.maxHearts }).map((_, i) => {
                const isFull = i < stats.hearts;
                return (
                  <svg
                    key={i}
                    viewBox="0 0 10 9"
                    className={`w-4 h-4 pixelated transition-transform ${isFull ? 'drop-shadow-[0_0_4px_rgba(239,68,68,0.5)]' : 'opacity-30'}`}
                  >
                    <path
                      d="M2,0 L3,0 L3,1 L4,1 L4,2 L6,2 L6,1 L7,1 L7,0 L8,0 L9,1 L9,3 L8,4 L8,5 L7,6 L6,7 L5,8 L4,7 L3,6 L2,5 L2,4 L1,3 L1,1 Z"
                      fill={isFull ? '#ef4444' : '#475569'}
                      stroke="#0f172a"
                      strokeWidth="0.5"
                    />
                    {isFull && (
                      <rect x="2" y="1" width="1" height="1" fill="#fca5a5" />
                    )}
                  </svg>
                );
              })}
            </div>
          </div>

          {/* Rupees / Gems */}
          <div
            className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-950/60 border border-amber-500/30 text-amber-300"
            title="Gemas ganhas cumprindo objetivos de estudo"
          >
            <svg viewBox="0 0 12 16" className="w-3.5 h-4 pixelated drop-shadow-[0_0_4px_rgba(245,158,11,0.6)]">
              <polygon points="6,0 12,5 12,11 6,16 0,11 0,5" fill="#10b981" />
              <polygon points="6,2 10,6 10,10 6,14 2,10 2,6" fill="#34d399" />
              <polygon points="4,4 6,2 8,4" fill="#a7f3d0" />
            </svg>
            <span className="font-pixel text-[11px] tabular-nums text-emerald-300">
              {stats.gems}
            </span>
          </div>

          {/* Level & XP Gauge */}
          <div className="flex items-center gap-2.5">
            <div className="bg-amber-950/60 border border-amber-600/60 px-2 py-0.5 rounded text-center">
              <span className="font-pixel text-[10px] text-amber-300">
                LVL {stats.level}
              </span>
            </div>

            <div className="w-28 sm:w-36">
              <div className="flex justify-between text-[10px] text-slate-400 font-pixel mb-1">
                <span>XP</span>
                <span className="tabular-nums">
                  {stats.currentXp}/{stats.xpToNextLevel}
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-950 rounded-full border border-slate-700 overflow-hidden p-[1px]">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 rounded-full transition-all duration-300"
                  style={{ width: `${xpPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Actions: Sound Toggle & New Goal CTA */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              soundFX.playClick();
            }}
            type="button"
            className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-amber-400 hover:border-amber-400/50 transition-colors"
            title={stats.soundEnabled ? 'Silenciar Efeitos Sonoros 16-bit' : 'Ativar Efeitos Sonoros 16-bit'}
          >
            {stats.soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {/* Reset sample data / progress */}
          <button
            onClick={onResetProgress}
            type="button"
            className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-rose-400 hover:border-rose-400/50 transition-colors hidden sm:flex"
            title="Restaurar dados de exemplo / Reiniciar"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Primary Action: New Goal */}
          <button
            onClick={() => {
              soundFX.playClick();
              onOpenNewGoalModal();
            }}
            type="button"
            className="flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-medium text-xs rounded-lg border-2 border-emerald-400/60 shadow-lg shadow-emerald-950/60 transition-transform active:scale-95 whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Nova Missão</span>
          </button>
        </div>
      </div>
    </header>
  );
};
