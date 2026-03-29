const BASE = import.meta.env.VITE_QUANTUM_URL ?? 'http://localhost:8000';

export interface RunResult {
  success: boolean;
  output: string;
  counts: Record<string, number>;
  statevector: number[];
  num_qubits: number;
  circuit_depth: number;
  runtime_ms: number;
  error?: string;
}

export async function runCode(code: string, shots = 1024): Promise<RunResult> {
  const res = await fetch(`${BASE}/run`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, shots }),
  });
  if (!res.ok) throw new Error(`Server error ${res.status}`);
  return res.json();
}

// MOCK for dev (no backend yet):
export async function runCodeMock(
  code: string,
  shots = 1024
): Promise<RunResult> {
  await new Promise((r) => setTimeout(r, 800));
  const nQ = (code.match(/QuantumCircuit\((\d+)/)?.[1] ?? 2) as number;
  const hasH = /qc\.h/.test(code);
  const hasCX = /qc\.cx/.test(code);
  const dim = 1 << +nQ;
  const counts: Record<string, number> = {};
  
  // Simple mock: if bell circuit, return |00> and |11> only
  if (hasH && hasCX && +nQ === 2) {
    counts['00'] = Math.round(shots * (0.48 + Math.random() * 0.04));
    counts['11'] = shots - counts['00'];
  } else {
    // Random distribution
    for (let i = 0; i < dim; i++) {
      const key = i.toString(2).padStart(+nQ, '0');
      counts[key] = Math.floor((Math.random() * shots) / dim * 2);
    }
  }
  
  const statevector = Array.from({ length: dim }, () => Math.random());
  const total = statevector.reduce((a, b) => a + b, 0);
  
  return {
    success: true,
    output: `Simulated ${shots} shots\n${Object.entries(counts)
      .map(([s, c]) => `|${s}>: ${c}`)
      .join('\n')}`,
    counts,
    statevector: statevector.map((v) => v / total),
    num_qubits: +nQ,
    circuit_depth: 3,
    runtime_ms: 820,
  };
}
