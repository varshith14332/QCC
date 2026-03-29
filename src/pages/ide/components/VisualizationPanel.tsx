import { useState } from 'react';
import type { RunResult } from '../services/quantumApi';

interface VisualizationPanelProps {
  results: RunResult | null;
}

export const VisualizationPanel = ({ results }: VisualizationPanelProps) => {
  const [activeTab, setActiveTab] = useState<'circuit' | 'probs' | 'hist' | 'info'>('circuit');

  const tabs = [
    { id: 'circuit', label: 'Circuit' },
    { id: 'probs', label: 'Probs' },
    { id: 'hist', label: 'Histogram' },
    { id: 'info', label: 'Info' },
  ] as const;

  // -- SVG CIRCUIT DRAWING MOCK (simplified for demo) --
  const renderCircuitSVG = () => {
    if (!results) return null;
    const { num_qubits } = results;
    // We would parse gates properly, but for demo:
    const W = 300, H = num_qubits * 40 + 30;
    
    return (
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={Math.max(H, 120)} className="bg-transparent text-text1">
        {Array.from({ length: num_qubits }).map((_, q) => (
          <g key={q}>
            <text x={10} y={20 + q * 40} className="font-mono text-[11px] fill-text2" dominantBaseline="middle">q{q}:</text>
            <line stroke="#30363d" strokeWidth={1} x1={36} y1={20 + q * 40} x2={W - 10} y2={20 + q * 40} />
            {/* Mock Measurements at the end */}
            <rect x={W - 40} y={20 + q * 40 - 12} width={24} height={24} rx={4} fill="#1a2a1a" stroke="#3fb950" />
            <text x={W - 28} y={20 + q * 40} fill="#3fb950" fontSize={11} dominantBaseline="middle" textAnchor="middle">M</text>
          </g>
        ))}
        {/* Mock Gate */}
        <rect x={80} y={20 - 12} width={32} height={24} rx={4} fill="#1a3a5f" stroke="#58a6ff" />
        <text x={96} y={20} className="font-mono text-[10px] fill-text1" dominantBaseline="middle" textAnchor="middle">H</text>
        
        {/* Mock CNOT */}
        {num_qubits > 1 && (
           <g>
             <line stroke="#58a6ff" strokeWidth={1} strokeDasharray="2,2" x1={150} y1={20} x2={150} y2={60} />
             <circle cx={150} cy={20} r={4} fill="#58a6ff" />
             <circle cx={150} cy={60} r={8} fill="#1a3a5f" stroke="#58a6ff" />
             <text x={150} y={60} className="font-mono text-[10px] fill-text1" dominantBaseline="middle" textAnchor="middle">⊕</text>
           </g>
        )}
      </svg>
    );
  };

  const PROB_COLORS = [
    'linear-gradient(90deg, #58a6ff, #bc8cff)',
    'linear-gradient(90deg, #3fb950, #79c0ff)',
    'linear-gradient(90deg, #ff7eb6, #ffa657)',
    'linear-gradient(90deg, #a5f3fc, #58a6ff)',
  ];

  return (
    <div className="flex flex-col w-[300px] h-full bg-surface border-l border-border flex-shrink-0 overflow-hidden">
      {/* TABS */}
      <div className="flex h-9 border-b border-border flex-shrink-0">
        {tabs.map((t) => (
          <div
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex-1 flex items-center justify-center text-[10px] font-bold tracking-widest uppercase cursor-pointer transition-colors border-b-2 ${
              activeTab === t.id
                ? 'text-accent border-accent'
                : 'text-text3 border-transparent hover:text-text1'
            }`}
          >
            {t.label}
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto p-3">
        {/* CIRCUIT TAB */}
        <div className={`${activeTab === 'circuit' ? 'block' : 'hidden'}`}>
          <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-text3 mb-3">
            Quantum Circuit
          </div>
          {!results ? (
            <div className="flex flex-col items-center justify-center p-6 text-text3 text-[13px] text-center gap-3">
              <span className="text-4xl">⚛</span>
              <p>Run a circuit to<br />visualize it here</p>
            </div>
          ) : (
            <div className="overflow-x-auto border border-border bg-[#0d1117] rounded-lg p-2">
              {renderCircuitSVG()}
            </div>
          )}
        </div>

        {/* PROBS TAB */}
        <div className={`${activeTab === 'probs' ? 'block' : 'hidden'}`}>
          <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-text3 mb-3">
            State Probabilities
          </div>
          {!results ? (
            <div className="flex flex-col items-center justify-center p-6 text-text3 text-[13px] text-center gap-3">
              <span className="text-4xl">📊</span>
              <p>No statevector data yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {results.statevector
                .map((p, i) => ({ i, p }))
                .sort((a, b) => b.p - a.p)
                .slice(0, 8) // show top 8
                .map(({ i, p }, idx) => {
                  const label = i.toString(2).padStart(results.num_qubits, '0');
                  const pct = (p * 100).toFixed(1);
                  const color = PROB_COLORS[idx % PROB_COLORS.length];
                  return (
                    <div key={label} className="flex items-center gap-2 font-mono text-[11px]">
                      <span className="w-10 text-right text-text2 flex-shrink-0">
                        |{label}⟩
                      </span>
                      <div className="flex-1 h-3.5 bg-elevated rounded overflow-hidden border border-border">
                        <div
                          className="h-full rounded transition-all duration-700 ease-out"
                          style={{ width: `${p * 100}%`, background: color }}
                        />
                      </div>
                      <span className="w-10 text-text1 text-[10px] flex-shrink-0">
                        {pct}%
                      </span>
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        {/* HISTOGRAM TAB */}
        <div className={`${activeTab === 'hist' ? 'block' : 'hidden'}`}>
          <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-text3 mb-3">
            Measurement Histogram
          </div>
          {!results ? (
            <div className="flex flex-col items-center justify-center p-6 text-text3 text-[13px] text-center gap-3">
              <span className="text-4xl">📈</span>
              <p>No measurements yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto pb-4">
              <div className="flex items-end gap-1.5 pt-2">
                {Object.entries(results.counts)
                  .sort((a, b) => b[1] - a[1])
                  .map(([state, count]) => {
                    const maxCount = Math.max(...Object.values(results.counts));
                    const maxH = 80;
                    const h = Math.max(4, Math.round((count / maxCount) * maxH));
                    return (
                      <div key={state} className="flex flex-col items-center gap-1.5 min-w-[32px]">
                        <span className="font-mono text-[10px] text-text2">{count}</span>
                        <div
                          className="w-8 flex items-end bg-elevated border border-border rounded-t overflow-hidden"
                          style={{ height: maxH }}
                        >
                          <div
                            className="w-full bg-gradient-to-b from-accent to-purple rounded-t transition-all duration-700"
                            style={{ height: h }}
                          />
                        </div>
                        <span className="font-mono text-[9px] text-text3">|{state}⟩</span>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>

        {/* INFO TAB */}
        <div className={`${activeTab === 'info' ? 'block' : 'hidden'}`}>
          <div className="space-y-0.5 border-b border-border pb-4 mb-4">
            <div className="flex justify-between items-center py-2 border-b border-border/50 text-xs">
              <span className="text-text2">Status</span>
              {results ? (
                 <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide bg-success/15 text-success">
                   SUCCESS
                 </span>
              ) : (
                 <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide bg-elevated text-text2">
                   IDLE
                 </span>
              )}
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-border/50 text-xs">
              <span className="text-text2">Qubits</span>
              <span className="text-text1 font-mono text-[11px]">{results?.num_qubits ?? '—'}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-border/50 text-xs">
              <span className="text-text2">Depth</span>
              <span className="text-text1 font-mono text-[11px]">{results?.circuit_depth ?? '—'}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-border/50 text-xs">
              <span className="text-text2">Shots</span>
              <span className="text-text1 font-mono text-[11px]">1024</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-border/50 text-xs">
              <span className="text-text2">Runtime</span>
              <span className="text-text1 font-mono text-[11px]">{results ? `${results.runtime_ms}ms` : '—'}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 text-xs">
              <span className="text-text2">Backend</span>
              <span className="text-text1 font-mono text-[11px]">Aer Simulator</span>
            </div>
          </div>

          <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-text3 mb-3">
            Keyboard Shortcuts
          </div>
          <div className="flex flex-col gap-2.5 text-[11px] text-text2">
            <div className="flex justify-between">
              <span>Run Code</span>
              <kbd className="px-1.5 py-0.5 bg-elevated border border-border rounded text-[10px] font-mono">Ctrl+Enter</kbd>
            </div>
            <div className="flex justify-between">
              <span>Save File</span>
              <kbd className="px-1.5 py-0.5 bg-elevated border border-border rounded text-[10px] font-mono">Ctrl+S</kbd>
            </div>
            <div className="flex justify-between">
              <span>New File</span>
              <kbd className="px-1.5 py-0.5 bg-elevated border border-border rounded text-[10px] font-mono">Ctrl+N</kbd>
            </div>
            <div className="flex justify-between">
              <span>Close Tab</span>
              <kbd className="px-1.5 py-0.5 bg-elevated border border-border rounded text-[10px] font-mono">Ctrl+W</kbd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
