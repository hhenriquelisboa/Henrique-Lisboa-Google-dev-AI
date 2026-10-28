import React, { useState } from 'react';
import { HeroStats } from '../types';
import { soundFX } from '../utils/audio';

interface PixelHeroProps {
  stats: HeroStats;
  onPoseChange?: () => void;
  actionState?: 'idle' | 'victory' | 'attack';
}

export const PixelHero: React.FC<PixelHeroProps> = ({ stats, actionState = 'idle' }) => {
  const [interactivePose, setInteractivePose] = useState<'idle' | 'celebrate'>('idle');
  const [speechIndex, setSpeechIndex] = useState(0);

  const tips = [
    "Pronto para a próxima missão de estudo?",
    "Consistência vence a inteligência desorganizada!",
    "Quebre objetivos difíceis em missões menores!",
    "Cada código rodado te deixa mais perto da vaga tech!",
    "Heróis descansam, mas nunca abandonam a jornada!",
    "Ganhe mais XP completando objetivos no prazo!"
  ];

  const handleHeroClick = () => {
    soundFX.playSword();
    setInteractivePose('celebrate');
    setSpeechIndex((prev) => (prev + 1) % tips.length);
    setTimeout(() => {
      setInteractivePose('idle');
    }, 1500);
  };

  const isTriumphant = actionState === 'victory' || interactivePose === 'celebrate';

  // Hero color scheme upgrades with level
  const tunicColor = stats.level >= 5 ? '#eab308' : stats.level >= 3 ? '#2563eb' : '#15803d'; // Gold / Blue / Green Tunic
  const capColor = stats.level >= 5 ? '#ca8a04' : stats.level >= 3 ? '#1d4ed8' : '#166534';
  const swordBladeColor = stats.level >= 3 ? '#93c5fd' : '#cbd5e1';

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      {/* Sprite Container */}
      <div 
        onClick={handleHeroClick}
        title="Clique no Herói para interagir!"
        className="relative group cursor-pointer p-2 bg-slate-900/80 rounded-xl border-2 border-slate-700 hover:border-amber-400 transition-all shadow-lg select-none"
      >
        {/* Glow behind character */}
        <div className={`absolute inset-0 rounded-xl blur-md transition-opacity ${stats.level >= 3 ? 'bg-amber-500/20 opacity-80' : 'bg-emerald-500/10 opacity-40'}`} />

        {/* Pixel Art SVG Canvas */}
        <div className={`relative w-24 h-28 flex items-center justify-center ${isTriumphant ? 'scale-110' : 'animate-pixel-float'}`}>
          <svg
            viewBox="0 0 24 28"
            className="w-full h-full pixelated drop-shadow-md"
            style={{ shapeRendering: 'crispEdges' }}
          >
            {/* Shadow beneath */}
            <ellipse cx="12" cy="26" rx="7" ry="2" fill="#020617" opacity="0.6" />

            {/* Boots (Brown) */}
            <rect x="7" y="22" width="3" height="4" fill="#78350f" />
            <rect x="6" y="24" width="4" height="2" fill="#451a03" />
            <rect x="14" y="22" width="3" height="4" fill="#78350f" />
            <rect x="14" y="24" width="4" height="2" fill="#451a03" />

            {/* Legs (White leggings) */}
            <rect x="8" y="20" width="2" height="3" fill="#f8fafc" />
            <rect x="14" y="20" width="2" height="3" fill="#f8fafc" />

            {/* Belt & Buckle */}
            <rect x="7" y="17" width="10" height="2" fill="#451a03" />
            <rect x="11" y="17" width="2" height="2" fill="#eab308" />

            {/* Tunic Torso */}
            <rect x="7" y="11" width="10" height="7" fill={tunicColor} />
            <rect x="9" y="11" width="6" height="5" fill={capColor} />
            {/* Collar/Shirt inner */}
            <polygon points="10,11 14,11 12,14" fill="#f8fafc" />

            {/* Head & Skin */}
            <rect x="8" y="5" width="8" height="6" fill="#fed7aa" />
            {/* Eyes */}
            <rect x="9" y="7" width="2" height="2" fill="#0f172a" />
            <rect x="13" y="7" width="2" height="2" fill="#0f172a" />
            {/* Cheeks */}
            <rect x="8" y="9" width="1" height="1" fill="#fca5a5" />
            <rect x="15" y="9" width="1" height="1" fill="#fca5a5" />
            {/* Mouth */}
            <rect x="11" y="9" width="2" height="1" fill={isTriumphant ? '#e11d48' : '#b45309'} />

            {/* Hair */}
            <rect x="7" y="4" width="10" height="2" fill="#d97706" />
            <rect x="6" y="5" width="2" height="4" fill="#b45309" />
            <rect x="16" y="5" width="2" height="4" fill="#b45309" />

            {/* Hat (Hero's Cap) */}
            <rect x="7" y="2" width="10" height="3" fill={capColor} />
            <rect x="6" y="3" width="2" height="2" fill={tunicColor} />
            {/* Floppy cap tip trailing back */}
            <rect x="17" y="3" width="2" height="3" fill={capColor} />
            <rect x="18" y="6" width="2" height="4" fill={tunicColor} />
            <rect x="19" y="9" width="2" height="2" fill={capColor} />

            {/* SHIELD (Study / Hylian Shield with Triforce motif) on left side */}
            <g transform="translate(2, 11)">
              <rect x="0" y="0" width="5" height="7" fill="#1e3a8a" />
              <rect x="1" y="0" width="3" height="1" fill="#cbd5e1" />
              <rect x="0" y="0" width="1" height="7" fill="#cbd5e1" />
              <rect x="4" y="0" width="1" height="7" fill="#cbd5e1" />
              <polygon points="0,7 5,7 2.5,9" fill="#1e3a8a" />
              {/* Triforce yellow triangle on shield */}
              <polygon points="2.5,2 1.5,4 3.5,4" fill="#fde047" />
              <rect x="2" y="5" width="1" height="1" fill="#dc2626" />
            </g>

            {/* SWORD on right hand */}
            {isTriumphant ? (
              /* Sword held high in triumph! */
              <g transform="translate(17, -2)">
                <rect x="1" y="0" width="2" height="10" fill={swordBladeColor} />
                <rect x="1" y="0" width="1" height="1" fill="#ffffff" />
                <rect x="0" y="10" width="4" height="2" fill="#2563eb" /> {/* Guard */}
                <rect x="1" y="12" width="2" height="3" fill="#78350f" /> {/* Hilt */}
                <rect x="1" y="15" width="2" height="1" fill="#eab308" /> {/* Pommel */}
                {/* Sparkle star */}
                <polygon points="2,-3 3,-1 5,-1 3.5,0.5 4,2.5 2,1.5 0,2.5 0.5,0.5 -1,-1 1,-1" fill="#fef08a" />
              </g>
            ) : (
              /* Sword held ready by side */
              <g transform="translate(17, 10)">
                <rect x="0" y="1" width="4" height="1" fill="#2563eb" />
                <rect x="1" y="2" width="2" height="2" fill="#78350f" />
                <rect x="1" y="0" width="2" height="9" fill={swordBladeColor} />
                <rect x="1" y="8" width="1" height="2" fill="#94a3b8" />
              </g>
            )}
          </svg>
        </div>

        {/* Level Tag under avatar */}
        <div className="mt-1 text-center">
          <span className="font-pixel text-[9px] text-amber-400 tracking-wider">
            NVL {stats.level}
          </span>
        </div>
      </div>

      {/* Hero Dialogue / Motivation Box */}
      <div className="flex-1 bg-slate-900/90 border-2 border-slate-700/80 rounded-xl p-3.5 relative shadow-inner">
        {/* Decorative corner rivets */}
        <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-amber-500/40 rounded-full" />
        <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-amber-500/40 rounded-full" />
        <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-amber-500/40 rounded-full" />
        <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-amber-500/40 rounded-full" />

        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[10px] text-emerald-400 uppercase tracking-wide">
              {stats.name}
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs font-medium text-amber-300">
              {stats.title}
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">
            {stats.questsCompleted} missões feitas
          </span>
        </div>

        <p className="text-sm text-slate-200 font-sans italic leading-relaxed">
          &ldquo;{tips[speechIndex]}&rdquo;
        </p>

        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
          <span className="text-slate-400">
            Dica: Concluir missões concede <strong className="text-emerald-400 font-semibold">+XP</strong> e <strong className="text-amber-400 font-semibold">+Gemas</strong>
          </span>
          <button
            onClick={handleHeroClick}
            type="button"
            className="text-amber-400 hover:text-amber-300 transition-colors text-xs font-medium underline underline-offset-2"
          >
            Falar com Herói
          </button>
        </div>
      </div>
    </div>
  );
};
