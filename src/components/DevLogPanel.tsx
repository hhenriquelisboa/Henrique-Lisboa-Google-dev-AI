import React, { useState } from 'react';
import { DevLogEntry } from '../types';
import { 
  FileText, 
  Plus, 
  Calendar, 
  Clock, 
  Share2, 
  Check, 
  BookMarked,
  Sparkles 
} from 'lucide-react';
import { soundFX } from '../utils/audio';

interface DevLogPanelProps {
  logs: DevLogEntry[];
  onAddLog: (entry: Omit<DevLogEntry, 'id'>) => void;
}

export const DevLogPanel: React.FC<DevLogPanelProps> = ({ logs, onAddLog }) => {
  const [whatILearned, setWhatILearned] = useState('');
  const [hoursSpent, setHoursSpent] = useState<number>(4);
  const [milestoneTitle, setMilestoneTitle] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatILearned.trim()) {
      setError('Por favor, descreva o que você aprendeu ou construiu hoje.');
      return;
    }

    onAddLog({
      date: new Date().toISOString().split('T')[0],
      whatILearned: whatILearned.trim(),
      hoursSpent: Number(hoursSpent) || 1,
      milestoneTitle: milestoneTitle.trim() || 'Estudos Diários',
    });

    soundFX.playQuestComplete();
    setWhatILearned('');
    setMilestoneTitle('');
    setError('');
  };

  const handleCopyMarkdown = (log: DevLogEntry) => {
    const text = `🚀 **DevLog de Estudos | Henrique Lisboa**
📅 Data: ${log.date}
⏱️ Tempo de Dedicação: ${log.hoursSpent}h
🎯 Marco: ${log.milestoneTitle}

💡 **O que aprendi e construí hoje:**
${log.whatILearned}

#TransicaoDeCarreira #EstudosDev #Alura #FullStack #Python #Tecnologia`;

    navigator.clipboard.writeText(text);
    setCopiedId(log.id);
    soundFX.playRupee();
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Intro Box */}
      <div className="bg-slate-900/90 border border-purple-500/30 rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-pixel text-xs text-purple-300">
              DIÁRIO DE BORDO (DEVLOG)
            </span>
            <span className="text-[10px] bg-purple-950 text-purple-300 border border-purple-800 px-2 py-0.5 rounded font-mono">
              30 min diários de reflexão
            </span>
          </div>
          <p className="text-xs text-slate-300">
            Orientação da Alura: <em>“Não meça sua evolução pela quantidade de certificados, mas por aquilo que consegue compreender, construir e explicar.”</em>
          </p>
        </div>
        <div className="text-right">
          <span className="text-[11px] text-slate-400 block">Registros salvos</span>
          <span className="font-pixel text-lg text-purple-300 tabular-nums">
            {logs.length}
          </span>
        </div>
      </div>

      {/* Form: New Daily Log */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 mb-4">
          <Plus className="w-4 h-4 text-purple-400" />
          <span>Registrar Revisão do Dia (+30 XP)</span>
        </h3>

        {error && (
          <p className="text-xs text-rose-400 bg-rose-950/40 border border-rose-800 p-2.5 rounded-lg mb-3">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Marco / Tópico Principal Estudado
              </label>
              <input
                type="text"
                value={milestoneTitle}
                onChange={(e) => setMilestoneTitle(e.target.value)}
                placeholder="Ex: Coleções em Python, Rotas FastAPI, Componentes React..."
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-purple-400" />
                Horas Dedicadas Hoje
              </label>
              <input
                type="number"
                min="0.5"
                max="12"
                step="0.5"
                value={hoursSpent}
                onChange={(e) => setHoursSpent(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              O que você compreendeu e conseguiu construir hoje?
            </label>
            <textarea
              rows={3}
              value={whatILearned}
              onChange={(e) => {
                setWhatILearned(e.target.value);
                if (error) setError('');
              }}
              placeholder="Explique com suas próprias palavras: qual problema resolveu, o que errou e como consertou..."
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-400 resize-none leading-relaxed"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs rounded-lg shadow-md transition-all active:scale-95 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Salvar no Diário de Bordo (+30 XP)</span>
            </button>
          </div>
        </form>
      </div>

      {/* Logs History */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
          <BookMarked className="w-4 h-4 text-purple-400" />
          <span>Histórico de Aprendizados</span>
        </h3>

        {logs.length === 0 ? (
          <div className="p-8 text-center bg-slate-900/40 rounded-xl border border-slate-800 text-slate-400 text-xs">
            Nenhum registro ainda. Salve sua primeira revisão ao fim do dia!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {logs.map((log) => (
              <div
                key={log.id}
                className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="flex items-center gap-1 font-mono text-[11px] text-slate-400">
                      <Calendar className="w-3 h-3 text-purple-400" />
                      {log.date}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[11px] text-amber-300">
                      <Clock className="w-3 h-3 text-amber-400" />
                      {log.hoursSpent}h estudadas
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-100 mb-2">
                    {log.milestoneTitle}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {log.whatILearned}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    Pronto para compartilhar
                  </span>
                  <button
                    onClick={() => handleCopyMarkdown(log)}
                    type="button"
                    className="flex items-center gap-1.5 px-2.5 py-1.5 bg-purple-950/60 hover:bg-purple-900/60 border border-purple-800/60 text-purple-300 rounded-lg text-xs font-medium transition-colors"
                    title="Copiar texto formatado para postar no LinkedIn ou GitHub"
                  >
                    {copiedId === log.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300">Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Copiar p/ LinkedIn</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
