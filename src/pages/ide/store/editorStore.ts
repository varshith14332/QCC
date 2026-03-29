import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface EditorState {
  files: Record<string, string>;
  activeFile: string | null;
  openTabs: string[];
  isDirty: boolean;
  openFile: (name: string) => void;
  updateContent: (name: string, code: string) => void;
  saveFile: () => void;
  createFile: (name: string) => void;
  deleteFile: (name: string) => void;
  closeTab: (name: string) => void;
}

const DEFAULT_BELL_STATE = `from qiskit import QuantumCircuit, transpile
from qiskit_aer import AerSimulator

qc = QuantumCircuit(2, 2)
qc.h(0)
qc.cx(0, 1)
qc.measure([0,1],[0,1])

sim = AerSimulator()
job = sim.run(transpile(qc, sim), shots=1024)
counts = job.result().get_counts()
print(counts)
`;

export const useEditorStore = create<EditorState>()(
  persist(
    (set) => ({
      files: {
        'bell_state.py': DEFAULT_BELL_STATE,
      },
      activeFile: 'bell_state.py',
      openTabs: ['bell_state.py'],
      isDirty: false,

      openFile: (name) =>
        set((state) => ({
          activeFile: name,
          openTabs: state.openTabs.includes(name)
            ? state.openTabs
            : [...state.openTabs, name],
        })),

      updateContent: (name, code) =>
        set((state) => ({
          files: { ...state.files, [name]: code },
          isDirty: true,
        })),

      saveFile: () =>
        set(() => ({
          isDirty: false,
        })),

      createFile: (name) =>
        set((state) => {
          if (state.files[name] !== undefined) return state;
          return {
            files: { ...state.files, [name]: '' },
            activeFile: name,
            openTabs: [...state.openTabs, name],
          };
        }),

      deleteFile: (name) =>
        set((state) => {
          const newFiles = { ...state.files };
          delete newFiles[name];
          const newTabs = state.openTabs.filter((t) => t !== name);
          let newActive = state.activeFile;
          if (state.activeFile === name) {
            newActive = newTabs.length > 0 ? newTabs[newTabs.length - 1] : null;
          }
          return {
            files: newFiles,
            openTabs: newTabs,
            activeFile: newActive,
          };
        }),

      closeTab: (name) =>
        set((state) => {
          const newTabs = state.openTabs.filter((t) => t !== name);
          let newActive = state.activeFile;
          if (state.activeFile === name) {
            newActive = newTabs.length > 0 ? newTabs[newTabs.length - 1] : null;
          }
          return {
            openTabs: newTabs,
            activeFile: newActive,
          };
        }),
    }),
    {
      name: 'qforge_files',
    }
  )
);
