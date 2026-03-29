import { useState, useRef, useEffect } from 'react';
import { useEditorStore } from './store/editorStore';
import { runCodeMock } from './services/quantumApi';
import type { RunResult } from './services/quantumApi';
import type { TerminalRef } from './components/TerminalPanel';

import { IDENavbar } from './components/IDENavbar';
import { FileExplorer } from './components/FileExplorer';
import { EditorPanel } from './components/EditorPanel';
import { VisualizationPanel } from './components/VisualizationPanel';
import { ResizeHandle } from './components/ResizeHandle';

export const QuantumIDE = () => {
  const store = useEditorStore();
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<RunResult | null>(null);
  
  const terminalRef = useRef<TerminalRef>(null);
  
  const [sidebarWidth, setSidebarWidth] = useState(220);
  const [rightWidth, setRightWidth] = useState(300);

  const handleRun = async () => {
    const code = store.activeFile ? store.files[store.activeFile] : null;
    if (!code || !store.activeFile?.endsWith('.py')) return;
    
    setIsRunning(true);
    terminalRef.current?.addLine(`❯ python ${store.activeFile}`, 'prompt');
    
    try {
      const result = await runCodeMock(code);
      setResults(result);
      result.output.split('\\n').forEach(line => 
        terminalRef.current?.addLine(line, 'output')
      );
      terminalRef.current?.addLine(`✓ Done in ${result.runtime_ms}ms`, 'dim');
    } catch (e: any) {
      terminalRef.current?.addLine(`Error: ${e.message}`, 'error');
    } finally {
      setIsRunning(false);
    }
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRun();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        store.saveFile();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [store.activeFile, store]);

  return (
    <div className="h-screen w-full flex flex-col bg-bg text-text1 overflow-hidden font-sans">
      <IDENavbar 
        isRunning={isRunning} 
        onRun={handleRun} 
        onSave={store.saveFile} 
      />
      
      <div className="flex-1 flex overflow-hidden">
        {/* SIDEBAR */}
        <div style={{ width: sidebarWidth }} className="flex-shrink-0 flex flex-col overflow-hidden">
          <FileExplorer />
        </div>
        
        <ResizeHandle 
          direction="col" 
          onResize={(d) => setSidebarWidth(w => Math.max(140, Math.min(360, w + d)))} 
        />
        
        {/* EDITOR & TERMINAL */}
        <EditorPanel 
          isRunning={isRunning} 
          onRun={handleRun} 
          terminalRef={terminalRef} 
        />
        
        <ResizeHandle 
          direction="col" 
          onResize={(d) => setRightWidth(w => Math.max(200, Math.min(480, w - d)))} 
        />
        
        {/* VISUALIZATION */}
        <div style={{ width: rightWidth }} className="flex-shrink-0 flex flex-col overflow-hidden">
          <VisualizationPanel results={results} />
        </div>
      </div>
    </div>
  );
};

export default QuantumIDE;
