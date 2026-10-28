import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Radio, 
  ChevronUp, 
  ChevronDown, 
  SkipForward, 
  SkipBack, 
  ExternalLink,
  Tv,
  Music
} from 'lucide-react';
import { soundFX } from '../utils/audio';

export interface LofiTrack {
  id: string;
  title: string;
  game: string;
  youtubeId: string;
  duration?: string;
}

const DEFAULT_TRACKS: LofiTrack[] = [
  {
    id: 'ct-mix',
    title: 'Chrono Trigger — Lo-Fi Study Mix',
    game: 'Chrono Trigger (SNES)',
    youtubeId: 'f7MxBE_nmSI',
  },
  {
    id: 'ct-corridors',
    title: 'Corridors of Time (Lofi Remix)',
    game: 'Chrono Trigger (Reino de Zeal)',
    youtubeId: 'VjikKbvbU3M',
  },
  {
    id: 'zelda-chill',
    title: 'Zelda & Chill — 16-bit Relaxing Beats',
    game: 'Zelda A Link to the Past',
    youtubeId: '2DVpys50LVE',
  },
];

export const RetroLofiPlayer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [showVideoScreen, setShowVideoScreen] = useState(false);
  const [customUrl, setCustomUrl] = useState('');
  const [tracks, setTracks] = useState<LofiTrack[]>(DEFAULT_TRACKS);

  const currentTrack = tracks[currentTrackIndex] || tracks[0];

  const handleTogglePlay = () => {
    soundFX.playClick();
    setIsPlaying(!isPlaying);
  };

  const handleNextTrack = () => {
    soundFX.playClick();
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
  };

  const handlePrevTrack = () => {
    soundFX.playClick();
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  };

  const handleAddCustomTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrl.trim()) return;

    // Extract YouTube ID from URL or bare ID
    let ytId = customUrl.trim();
    if (ytId.includes('v=')) {
      ytId = ytId.split('v=')[1]?.split('&')[0] || ytId;
    } else if (ytId.includes('youtu.be/')) {
      ytId = ytId.split('youtu.be/')[1]?.split('?')[0] || ytId;
    } else if (ytId.includes('embed/')) {
      ytId = ytId.split('embed/')[1]?.split('?')[0] || ytId;
    }

    if (ytId) {
      const newTrack: LofiTrack = {
        id: `custom-${Date.now()}`,
        title: 'Faixa Personalizada',
        game: 'YouTube Lofi',
        youtubeId: ytId,
      };
      setTracks((prev) => [...prev, newTrack]);
      setCurrentTrackIndex(tracks.length);
      setIsPlaying(true);
      setCustomUrl('');
      soundFX.playRupee();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-sm w-[90vw] sm:w-96 select-none">
      {/* Floating Capsule / Trigger */}
      <div className="bg-slate-900 border-2 border-amber-500/80 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden">
        {/* Top Control Bar */}
        <div 
          onClick={() => {
            soundFX.playClick();
            setIsOpen(!isOpen);
          }}
          className="px-3.5 py-2.5 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 flex items-center justify-between cursor-pointer border-b border-slate-800"
        >
          <div className="flex items-center gap-2.5">
            {/* Spinning Cassette / Vinyl Graphic */}
            <div className={`w-6 h-6 rounded-full border border-amber-400/60 bg-amber-950/60 flex items-center justify-center ${isPlaying ? 'animate-spin' : ''}`}>
              <div className="w-2 h-2 rounded-full bg-amber-300" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-pixel text-[9px] text-amber-400">
                  RÁDIO 16-BIT
                </span>
                <span className="text-[10px] text-slate-500 font-mono">·</span>
                <span className="text-[11px] font-semibold text-slate-200 truncate max-w-[170px]">
                  {currentTrack.title}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleTogglePlay();
              }}
              type="button"
              className={`p-1.5 rounded-lg border transition-all ${
                isPlaying 
                  ? 'bg-amber-400 text-slate-950 border-amber-300' 
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-amber-300'
              }`}
              title={isPlaying ? 'Pausar Lofi' : 'Tocar Lofi 16-bit'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>

            <button
              type="button"
              className="p-1 text-slate-400 hover:text-slate-200"
            >
              {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Expanded Panel: Cassette Player, Track Selector & Video Toggle */}
        {isOpen && (
          <div className="p-4 bg-slate-950/95 space-y-4 animate-in fade-in duration-150">
            {/* Retro SNES Boombox Graphic & Track Info */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="font-pixel text-[9px] text-emerald-400">
                  {currentTrack.game}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setShowVideoScreen(!showVideoScreen)}
                    type="button"
                    className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono border ${
                      showVideoScreen 
                        ? 'bg-indigo-950 text-indigo-300 border-indigo-700' 
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                    title="Alternar entre modo apenas áudio e tela retrô"
                  >
                    <Tv className="w-3 h-3" />
                    <span>{showVideoScreen ? 'Ocultar Vídeo' : 'Ver Vídeo'}</span>
                  </button>
                </div>
              </div>

              <h4 className="text-xs font-bold text-slate-100 mb-2 truncate">
                {currentTrack.title}
              </h4>

              {/* Animated Cassette Wheels */}
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-2.5 flex items-center justify-around">
                <div className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-full border-2 border-dashed border-amber-400/70 bg-amber-950/40 flex items-center justify-center ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }}>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-amber-400" />
                  </div>
                  <div className="h-2 w-16 bg-slate-800 rounded flex items-center px-1">
                    <div className="h-1 w-full bg-amber-500/40 rounded" />
                  </div>
                  <div className={`w-7 h-7 rounded-full border-2 border-dashed border-amber-400/70 bg-amber-950/40 flex items-center justify-center ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }}>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-amber-400" />
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={handlePrevTrack}
                    type="button"
                    className="p-1.5 text-slate-400 hover:text-amber-400 transition-colors"
                    title="Faixa Anterior"
                  >
                    <SkipBack className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleTogglePlay}
                    type="button"
                    className="p-2 rounded-full bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 shadow transition-transform active:scale-95"
                    title={isPlaying ? 'Pausar' : 'Tocar'}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  </button>
                  <button
                    onClick={handleNextTrack}
                    type="button"
                    className="p-1.5 text-slate-400 hover:text-amber-400 transition-colors"
                    title="Próxima Faixa"
                  >
                    <SkipForward className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Optional Retro CRT Video Display */}
            {showVideoScreen && (
              <div className="rounded-xl overflow-hidden border-2 border-slate-700 bg-black aspect-video relative shadow-inner">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${currentTrack.youtubeId}?autoplay=${isPlaying ? 1 : 0}&enablejsapi=1&loop=1`}
                  title={currentTrack.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            )}

            {/* Hidden iframe for pure background audio mode */}
            {!showVideoScreen && isPlaying && (
              <div className="hidden">
                <iframe
                  width="200"
                  height="200"
                  src={`https://www.youtube.com/embed/${currentTrack.youtubeId}?autoplay=1&loop=1&playlist=${currentTrack.youtubeId}`}
                  title={currentTrack.title}
                  allow="autoplay"
                />
              </div>
            )}

            {/* Track Selector List */}
            <div>
              <span className="text-[10px] font-pixel text-slate-400 uppercase tracking-wider block mb-2">
                Trilhas 16-Bit Disponíveis:
              </span>
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {tracks.map((track, idx) => (
                  <button
                    key={track.id}
                    onClick={() => {
                      soundFX.playClick();
                      setCurrentTrackIndex(idx);
                      setIsPlaying(true);
                    }}
                    type="button"
                    className={`w-full px-2.5 py-1.5 rounded-lg text-left text-xs flex items-center justify-between transition-colors ${
                      idx === currentTrackIndex
                        ? 'bg-amber-500/15 text-amber-300 font-semibold border border-amber-500/40'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Music className="w-3 h-3 shrink-0 text-amber-400" />
                      <span className="truncate">{track.title}</span>
                    </div>
                    {idx === currentTrackIndex && isPlaying && (
                      <span className="font-pixel text-[8px] text-emerald-400 animate-pulse">
                        TOCANDO
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom YouTube URL Add */}
            <form onSubmit={handleAddCustomTrack} className="pt-2 border-t border-slate-800">
              <label className="block text-[10px] text-slate-400 mb-1">
                Adicionar outro vídeo/lofi do YouTube:
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  placeholder="Link ou ID do YouTube..."
                  className="flex-1 px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-colors whitespace-nowrap"
                >
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
