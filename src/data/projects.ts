import type { Project } from '../types';

export const projects: Project[] = [
    {
        id: 'qc-simulator',
        title: 'Quantum Circuit Simulator',
        description: 'Interactive web-based quantum circuit simulator supporting up to 8 qubits. Visualize quantum gates, entanglement, and measurement outcomes in real-time.',
        tags: ['Qiskit', 'Python', 'Visualization', 'Education'],
    },
    {
        id: 'bell-state',
        title: 'Bell State Visualization',
        description: 'Educational tool demonstrating quantum entanglement through Bell states. Features 3D Bloch sphere visualization and probability amplitude graphs.',
        tags: ['WebGL', 'Three.js', 'Quantum Mechanics', 'Interactive'],
    },
    {
        id: 'quantum-algorithms',
        title: 'Quantum Algorithms Demo',
        description: 'Implementation and visualization of  key quantum algorithms including Grover\'s search, Shor\'s factoring, and Deutsch-Jozsa algorithm.',
        tags: ['Qiskit', 'Python', 'Algorithms', 'Research'],
    },
    {
        id: 'qkd-protocol',
        title: 'Quantum Key Distribution (BB84)',
        description: 'Demonstration of the BB84 quantum cryptography protocol. Shows how quantum mechanics enables provably secure communication.',
        tags: ['Cryptography', 'Security', 'Protocol', 'Educational'],
    },
    {
        id: 'vqe-chemistry',
        title: 'VQE for Molecular Chemistry',
        description: 'Variational Quantum Eigensolver implementation for calculating molecular ground states. Hybrid quantum-classical optimization approach.',
        tags: ['Chemistry', 'VQE', 'Optimization', 'Research'],
    },
    {
        id: 'quantum-ml',
        title: 'Quantum Machine Learning',
        description: 'Exploring quantum-enhanced machine learning with variational classifiers and quantum feature maps for pattern recognition tasks.',
        tags: ['Machine Learning', 'QML', 'Classification', 'Research'],
    },
    {
        id: 'error-correction',
        title: 'Quantum Error Correction',
        description: 'Implementation of surface codes and error correction techniques to protect quantum information from decoherence and noise.',
        tags: ['Error Correction', 'Fault Tolerance', 'Advanced'],
    },
    {
        id: 'quantum-game',
        title: 'Quantum Tic-Tac-Toe',
        description: 'Fun educational game applying quantum superposition principles to classic tic-tac-toe. Learn about measurement and collapse.',
        tags: ['Game', 'Education', 'Superposition', 'Fun'],
    },
    {
        id: 'qaoa-optimization',
        title: 'QAOA for Optimization',
        description: 'Quantum Approximate Optimization Algorithm for solving combinatorial optimization problems like MaxCut and graph coloring.',
        tags: ['QAOA', 'Optimization', 'Algorithms', 'Research'],
    },
];
