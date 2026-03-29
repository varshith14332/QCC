import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useEditorStore } from '../store/editorStore';

export interface TerminalLine {
  text: string;
  type: 'prompt' | 'output' | 'error' | 'info' | 'dim';
}

interface TerminalPanelProps {
  onRun: () => void;
}

export interface TerminalRef {
  addLine: (text: string, type: TerminalLine['type']) => void;
  clear: () => void;
}

export const TerminalPanel = forwardRef<TerminalRef, TerminalPanelProps>(
  ({ onRun }, ref) => {
    const store = useEditorStore();
    const [lines, setLines] = useState<TerminalLine[]>([
      { text: 'QuantumForge Terminal — Quantum Computing Club', type: 'info' },
      { text: 'Type "help" for commands.', type: 'dim' },
    ]);
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<string[]>([]);
    const [historyIdx, setHistoryIdx] = useState(-1);
    const outputRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      addLine: (text, type) => setLines((prev) => [...prev, { text, type }]),
      clear: () => setLines([
        { text: 'QuantumForge Terminal — Quantum Computing Club', type: 'info' },
        { text: 'Type "help" for commands.', type: 'dim' },
      ]),
    }));

    useEffect(() => {
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight;
      }
    }, [lines]);

    useEffect(() => {
      const handleGlobalClear = () => setLines([]);
      window.addEventListener('quantum-clear-terminal', handleGlobalClear);
      return () => window.removeEventListener('quantum-clear-terminal', handleGlobalClear);
    }, []);

    const handleCommand = (cmd: string) => {
      if (!cmd.trim()) return;
      const args = cmd.trim().split(' ');
      const base = args[0];

      if (base === 'help') {
        setLines((prev) => [
          ...prev,
          { text: 'Available commands:', type: 'info' },
          { text: '  run           — Execute active file', type: 'output' },
          { text: '  clear         — Clear terminal', type: 'output' },
          { text: '  ls            — List files', type: 'output' },
          { text: '  cat <file>    — Show file contents', type: 'output' },
          { text: '  python <file> — Run a specific file', type: 'output' },
        ]);
      } else if (base === 'clear') {
        setLines([
          { text: 'QuantumForge Terminal — Quantum Computing Club', type: 'info' },
          { text: 'Type "help" for commands.', type: 'dim' },
        ]);
      } else if (base === 'ls') {
        setLines((prev) => [
          ...prev,
          { text: 'Files in workspace:', type: 'info' },
          ...Object.keys(store.files).map((f) => ({
            text: `  ${f.padEnd(30)} ${store.files[f].length} bytes`,
            type: 'output' as const,
          })),
        ]);
      } else if (base === 'cat') {
        const file = args[1];
        if (store.files[file]) {
          setLines((prev) => [
            ...prev,
            { text: `=== ${file} ===`, type: 'info' },
            ...store.files[file].split('\\n').map((l) => ({ text: l, type: 'output' as const })),
          ]);
        } else {
          setLines((prev) => [...prev, { text: `cat: ${file}: No such file`, type: 'error' }]);
        }
      } else if (base === 'python') {
        const file = args[1];
        if (store.files[file]) {
          store.openFile(file);
          onRun();
        } else {
          setLines((prev) => [...prev, { text: `python: can't open file '${file}': No such file`, type: 'error' }]);
        }
      } else if (base === 'run') {
        onRun();
      } else {
        setLines((prev) => [
          ...prev,
          { text: `command not found: ${base}`, type: 'error' },
          { text: 'Type "help" for commands.', type: 'dim' },
        ]);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        const cmd = input.trim();
        if (cmd) {
          setLines((prev) => [...prev, { text: `❯ ${cmd}`, type: 'prompt' }]);
          handleCommand(cmd);
          setHistory((prev) => [cmd, ...prev]);
          setHistoryIdx(-1);
          setInput('');
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIdx < history.length - 1) {
          const nextIdx = historyIdx + 1;
          setHistoryIdx(nextIdx);
          setInput(history[nextIdx]);
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIdx > 0) {
          const prevIdx = historyIdx - 1;
          setHistoryIdx(prevIdx);
          setInput(history[prevIdx]);
        } else if (historyIdx === 0) {
          setHistoryIdx(-1);
          setInput('');
        }
      }
    };

    const getTypeColor = (type: TerminalLine['type']) => {
      switch (type) {
        case 'prompt': return 'text-success';
        case 'output': return 'text-text1';
        case 'error': return 'text-error';
        case 'info': return 'text-[#79c0ff]';
        case 'dim': return 'text-text3';
        default: return 'text-text1';
      }
    };

    return (
      <div className="flex flex-col h-full bg-[#0d1117] border-t border-border w-full">
        {/* HEADER */}
        <div className="flex items-center px-3 h-8 border-b border-border flex-shrink-0">
          <span className="text-[11px] font-semibold tracking-wider uppercase text-accent border-b-2 border-accent px-2 h-full flex items-center">
            Terminal
          </span>
          <div className="flex-1" />
          <button
            onClick={() => {
              setLines([
                { text: 'QuantumForge Terminal — Quantum Computing Club', type: 'info' },
                { text: 'Type "help" for commands.', type: 'dim' },
              ]);
            }}
            className="w-5 h-5 flex items-center justify-center rounded text-text3 hover:bg-hover hover:text-text1 transition-colors text-sm"
            title="Clear"
          >
            ✕
          </button>
        </div>

        {/* OUTPUT */}
        <div
          ref={outputRef}
          className="flex-1 overflow-y-auto px-3 py-2 font-mono text-[12.5px] leading-relaxed break-all space-y-0.5"
          onClick={() => document.getElementById('terminal-input')?.focus()}
        >
          {lines.map((line, i) => (
            <div key={i} className={`${getTypeColor(line.type)} whitespace-pre-wrap`}>
              {line.text}
            </div>
          ))}
        </div>

        {/* INPUT */}
        <div className="flex items-center gap-2 px-3 py-1.5 border-t border-border flex-shrink-0">
          <span className="text-success font-mono text-xs">❯</span>
          <input
            id="terminal-input"
            className="flex-1 bg-transparent outline-none border-none font-mono text-xs text-text1 caret-accent"
            placeholder="Type a command..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
    );
  }
);
