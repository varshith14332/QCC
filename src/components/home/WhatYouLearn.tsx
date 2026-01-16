import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { BookOpen, Code, Rocket, GraduationCap } from 'lucide-react';

export const WhatYouLearn = () => {
    const learningPaths = [
        {
            icon: BookOpen,
            title: 'Quantum Fundamentals',
            topics: ['Quantum States & Qubits', 'Superposition & Measurement', 'Quantum Gates', 'Entanglement'],
            level: 'Beginner',
            color: 'from-neon-blue to-neon-cyan',
        },
        {
            icon: Code,
            title: 'Programming & Tools',
            topics: ['Qiskit Framework', 'Quantum Circuits', 'IBM Quantum Experience', 'Circuit Optimization'],
            level: 'Intermediate',
            color: 'from-neon-purple to-neon-pink',
        },
        {
            icon: Rocket,
            title: 'Quantum Algorithms',
            topics: ["Grover's Search", "Shor's Factoring", 'VQE & QAOA', 'Quantum Fourier Transform'],
            level: 'Intermediate',
            color: 'from-neon-cyan to-neon-blue',
        },
        {
            icon: GraduationCap,
            title: 'Advanced Topics',
            topics: ['Quantum Machine Learning', 'Error Correction', 'Quantum Cryptography', 'Quantum Simulation'],
            level: 'Advanced',
            color: 'from-neon-pink to-neon-purple',
        },
    ];

    return (
        <section className="section-padding bg-quantum-darker/50">
            <div className="container-custom">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
                        What <span className="gradient-text">You'll Learn</span>
                    </h2>
                    <p className="text-xl text-white/70 max-w-3xl mx-auto">
                        Comprehensive quantum computing curriculum from basics to advanced research
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {learningPaths.map((path, index) => (
                        <motion.div
                            key={path.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full" gradient>
                                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${path.color} mb-4`}>
                                    <path.icon className="w-6 h-6 text-white" />
                                </div>

                                <div className="mb-3">
                                    <h3 className="text-xl font-bold text-white font-display mb-2">
                                        {path.title}
                                    </h3>
                                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-white/80">
                                        {path.level}
                                    </span>
                                </div>

                                <ul className="space-y-2">
                                    {path.topics.map((topic) => (
                                        <li key={topic} className="flex items-start gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-neon-blue mt-2 flex-shrink-0" />
                                            <span className="text-white/70 text-sm">{topic}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
