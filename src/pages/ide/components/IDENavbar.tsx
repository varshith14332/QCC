import { Link } from 'react-router-dom';

interface IDENavbarProps {
  isRunning: boolean;
  onRun: () => void;
  onSave: () => void;
}

export const IDENavbar = ({ isRunning, onRun, onSave }: IDENavbarProps) => {
  return (
    <nav className="flex items-center px-3 gap-2 h-[44px] bg-surface border-b border-border flex-shrink-0 relative z-[100]">
      {/* Home link to go back */}
      <Link to="/" className="mr-2 text-text2 hover:text-white transition-colors" title="Back to main site">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </Link>

      <div className="flex items-center gap-2 mr-4">
        <div className="w-[26px] h-[26px] rounded-md bg-gradient-to-br from-accent to-purple flex items-center justify-center text-[13px] font-bold text-white tracking-tight flex-shrink-0">
          Q
        </div>
        <span className="text-[13px] font-bold tracking-wider text-text1 uppercase">
          QuantumForge
        </span>
      </div>

      <div className="w-px h-5 bg-[#30363d] mx-1" />

      <button
        onClick={onRun}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
          isRunning
            ? 'bg-gradient-to-br from-[#4a1f1f] to-[#7a2d2d] text-error border border-[#7a2d2d] animate-pulse'
            : 'bg-gradient-to-br from-[#1a4f2a] to-[#2d7a47] text-success border border-[#2d7a47] hover:from-[#2d7a47] hover:to-success hover:text-white'
        }`}
      >
        {isRunning ? '◼ Stop' : '▶ Run'}
        {!isRunning && <span className="text-[10px] text-inherit opacity-60 ml-1"><kbd>⌃↵</kbd></span>}
      </button>

      <button
        onClick={onSave}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap bg-transparent text-accent border border-accent/40 hover:bg-accent/15"
      >
        Save
        <span className="text-[10px] text-inherit opacity-60 ml-1"><kbd>⌃S</kbd></span>
      </button>

      <button
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap bg-transparent text-text2 hover:bg-hover hover:text-text1"
        onClick={() => {
          // Expose global clear if needed later, handle in terminal for now
          const ev = new CustomEvent('quantum-clear-terminal');
          window.dispatchEvent(ev);
        }}
      >
        Clear
      </button>

      <div className="flex-1" />

      <div className="flex items-center gap-1.5 text-[11px] text-text2 font-mono">
        <div
          className={`w-1.5 h-1.5 rounded-full ${
            isRunning ? 'bg-[#e3b341] animate-pulse' : 'bg-success'
          }`}
        />
        <span>{isRunning ? 'Running…' : 'Ready'}</span>
      </div>

      <div className="w-px h-5 bg-[#30363d] mx-1" />

      <span className="text-[11px] text-text3 font-mono">
        Python 3.11 · Qiskit 1.0
      </span>
    </nav>
  );
};
