import type { LearningTopic } from '../types';

export const learningTopics: LearningTopic[] = [
    {
        id: 'qubits',
        title: 'Qubits',
        description: 'The fundamental unit of quantum information. Learn about quantum states, Bloch sphere representation, and how qubits differ from classical bits.',
        level: 'beginner',
    },
    {
        id: 'superposition',
        title: 'Superposition',
        description: 'Understanding how qubits exist in multiple states simultaneously until measured. The foundation of quantum parallelism.',
        level: 'beginner',
    },
    {
        id: 'entanglement',
        title: 'Quantum Entanglement',
        description: 'Explore the mysterious correlation between quantum particles that Einstein called "spooky action at a distance."',
        level: 'beginner',
    },
    {
        id: 'quantum-gates',
        title: 'Quantum Gates',
        description: 'Learn about single-qubit gates (X, Y, Z, H) and multi-qubit gates (CNOT, Toffoli) that manipulate quantum states.',
        level: 'intermediate',
    },
    {
        id: 'quantum-circuits',
        title: 'Quantum Circuits',
        description: 'Build and analyze quantum circuits. Understand circuit depth, parallelism, and how to implement quantum algorithms.',
        level: 'intermediate',
    },
    {
        id: 'quantum-algorithms',
        title: 'Quantum Algorithms',
        description: 'Study famous algorithms like Deutsch-Jozsa, Grover\'s search, and Shor\'s factoring that demonstrate quantum advantage.',
        level: 'intermediate',
    },
    {
        id: 'vqe-qaoa',
        title: 'VQE & QAOA',
        description: 'Variational quantum algorithms combining quantum and classical computation for optimization and chemistry problems.',
        level: 'advanced',
    },
    {
        id: 'error-correction',
        title: 'Quantum Error Correction',
        description: 'Advanced techniques to protect quantum information from decoherence using surface codes and logical qubits.',
        level: 'advanced',
    },
    {
        id: 'quantum-ml',
        title: 'Quantum Machine Learning',
        description: 'Cutting-edge intersection of quantum computing and AI. Quantum neural networks, quantum feature maps, and more.',
        level: 'advanced',
    },
];
