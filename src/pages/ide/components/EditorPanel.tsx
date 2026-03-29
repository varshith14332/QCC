import { useRef, useState } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';
import { useEditorStore } from '../store/editorStore';
import { TerminalPanel } from './TerminalPanel';
import { ResizeHandle } from './ResizeHandle';

interface EditorPanelProps {
  isRunning: boolean;
  onRun: () => void;
  terminalRef: React.RefObject<any>;
}

export const EditorPanel = ({ isRunning, onRun, terminalRef }: EditorPanelProps) => {
  const store = useEditorStore();
  const editorRef = useRef<any>(null);
  const [termHeight, setTermHeight] = useState(250);
  const monaco = useMonaco();

  const handleEditorMount = (editor: any) => {
    editorRef.current = editor;
  };

  const handleResize = (delta: number) => {
    setTermHeight((h) => {
      const newHeight = Math.max(80, Math.min(500, h - delta));
      // Schedule layout update
      requestAnimationFrame(() => {
        if (editorRef.current) {
          editorRef.current.layout();
        }
      });
      return newHeight;
    });
  };

  const code = store.activeFile ? store.files[store.activeFile] ?? '' : '';
  const lang = store.activeFile?.endsWith('.py') ? 'python' : 'plaintext';

  return (
    <div className="flex flex-col flex-1 min-w-[300px] h-full overflow-hidden bg-elevated relative">
      {/* TABS */}
      <div className="flex items-end h-[36px] bg-surface border-b border-border overflow-x-auto flex-shrink-0">
        {store.openTabs.map((f) => {
          const isActive = f === store.activeFile;
          return (
            <div
              key={f}
              onClick={() => store.openFile(f)}
              className={`flex items-center gap-1.5 px-3 h-[34px] text-xs font-mono cursor-pointer rounded-t-md transition-colors select-none ${isActive
                ? 'bg-elevated text-text1 border-t border-l border-r border-border border-b-0'
                : 'bg-transparent text-text2 hover:bg-hover hover:text-text1 border border-transparent'
                }`}
              style={{ marginBottom: isActive ? '-1px' : '0' }}
            >
              {f}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  store.closeTab(f);
                }}
                className="text-text3 hover:text-text1 hover:bg-hover px-1 rounded-sm text-sm ml-1 -mr-1"
              >
                ×
              </span>
            </div>
          );
        })}
      </div>

      {/* EDITOR */}
      <div className="flex-1 relative overflow-hidden">
        {store.activeFile ? (
          <Editor
            height="100%"
            language={lang}
            value={code}
            onChange={(v) => store.updateContent(store.activeFile!, v ?? '')}
            theme="vs-dark"
            onMount={handleEditorMount}
            options={{
              fontSize: 13,
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              minimap: { enabled: true, side: 'right', scale: 0.8 },
              lineHeight: 22,
              padding: { top: 16, bottom: 16 },
              scrollBeyondLastLine: false,
              tabSize: 4,
              insertSpaces: true,
              wordWrap: 'off',
              cursorBlinking: 'phase',
              cursorSmoothCaretAnimation: 'on',
              formatOnPaste: true,
              smoothScrolling: true,
              renderWhitespace: 'selection',
            }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-text3 text-sm gap-2">
            <span className="text-4xl opacity-50">⚛</span>
            <p>Select or create a file to start coding</p>
          </div>
        )}

        {/* LOADING OVERLAY */}
        {isRunning && (
          <div className="absolute inset-0 bg-[#0a0c10]/80 backdrop-blur-[4px] z-10 flex flex-col items-center justify-center gap-4">
            <div className="w-9 h-9 border-2 border-[#30363d] border-t-accent rounded-full animate-spin" />
            <div className="text-[13px] text-text2">Executing quantum circuit…</div>
          </div>
        )}
      </div>

      {/* RESIZE HANDLE */}
      <ResizeHandle direction="row" onResize={handleResize} />

      {/* TERMINAL */}
      <div style={{ height: termHeight }} className="flex-shrink-0 overflow-hidden flex flex-col">
        <TerminalPanel ref={terminalRef} onRun={onRun} />
      </div>
    </div>
  );
};
