import { useState } from 'react';
import { useEditorStore } from '../store/editorStore';

export const FileExplorer = () => {
  const store = useEditorStore();
  const [showNewFile, setShowNewFile] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; file: string } | null>(null);

  const files = Object.keys(store.files).sort((a, b) => {
    const aPy = a.endsWith('.py');
    const bPy = b.endsWith('.py');
    if (aPy && !bPy) return -1;
    if (!aPy && bPy) return 1;
    return a.localeCompare(b);
  });

  const handleCreateFile = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const name = newFileName.trim();
      if (name) {
        store.createFile(name);
      }
      setShowNewFile(false);
      setNewFileName('');
    } else if (e.key === 'Escape') {
      setShowNewFile(false);
      setNewFileName('');
    }
  };

  const handleContextMenu = (e: React.MouseEvent, file: string) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, file });
  };

  const closeMenu = () => setContextMenu(null);

  const handleRename = () => {
    if (!contextMenu) return;
    const oldName = contextMenu.file;
    const newName = prompt(`Rename "${oldName}" to:`, oldName);
    closeMenu();
    if (!newName || newName === oldName) return;
    const content = store.files[oldName];
    store.createFile(newName);
    store.updateContent(newName, content);
    store.deleteFile(oldName);
  };

  return (
    <div className="flex flex-col w-full h-full bg-surface" onClick={closeMenu}>
      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
        <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-text3">
          Explorer
        </span>
        <button
          className="w-5 h-5 flex items-center justify-center rounded text-text3 hover:bg-hover hover:text-text1 transition-colors"
          onClick={() => setShowNewFile(true)}
          title="New File"
        >
          +
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-1">
        {files.map((f) => {
          const isActive = store.activeFile === f;
          const icon = f.endsWith('.py') ? '🐍' : f.endsWith('.md') ? '📄' : '📎';
          return (
            <div
              key={f}
              onClick={() => store.openFile(f)}
              onContextMenu={(e) => handleContextMenu(e, f)}
              className={`group flex items-center gap-1.5 px-3 py-1 cursor-pointer text-xs font-mono transition-colors border-l-2 ${
                isActive
                  ? 'bg-accent/15 text-accent border-accent'
                  : 'border-transparent text-text2 hover:bg-hover hover:text-text1'
              }`}
            >
              <span className="text-xs flex-shrink-0">{icon}</span>
              <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                {f}
              </span>
              <button
                className="hidden group-hover:flex w-4 h-4 items-center justify-center rounded text-text3 hover:text-text1 hover:bg-hover transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm(`Delete "${f}"?`)) store.deleteFile(f);
                }}
                title="Delete"
              >
                ×
              </button>
            </div>
          );
        })}

        {showNewFile && (
          <div className="px-2 py-1 border-t border-border mt-1">
            <input
              autoFocus
              className="w-full bg-elevated border border-accent rounded px-2 py-1 text-xs font-mono text-text1 outline-none"
              placeholder="filename.py"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              onKeyDown={handleCreateFile}
              onBlur={() => setShowNewFile(false)}
            />
          </div>
        )}
      </div>

      <div className="px-3 py-2 border-t border-border mt-auto">
        <div className="text-[10px] text-text3 font-mono">
          Quantum Club IDE v1.0
        </div>
      </div>

      {contextMenu && (
        <div
          className="fixed bg-elevated border border-[#30363d] rounded-lg p-1 z-[9999] min-w-[140px] shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="px-3 py-1.5 text-xs text-text2 cursor-pointer rounded hover:bg-hover hover:text-text1"
            onClick={() => {
              store.openFile(contextMenu.file);
              closeMenu();
            }}
          >
            📂 Open
          </div>
          <div
            className="px-3 py-1.5 text-xs text-text2 cursor-pointer rounded hover:bg-hover hover:text-text1"
            onClick={handleRename}
          >
            ✏️ Rename
          </div>
          <div className="h-px bg-border my-1" />
          <div
            className="px-3 py-1.5 text-xs text-text2 cursor-pointer rounded hover:bg-[#f851491a] hover:text-error"
            onClick={() => {
              if (confirm(`Delete "${contextMenu.file}"?`)) {
                store.deleteFile(contextMenu.file);
              }
              closeMenu();
            }}
          >
            🗑 Delete
          </div>
        </div>
      )}
    </div>
  );
};
