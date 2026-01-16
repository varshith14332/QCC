import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Target, Eye, Rocket, Users } from 'lucide-react';

export const About = () => {
    return (
        <div className="section-padding">
            <div className="container-custom">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 font-display">
                        About <span className="gradient-text">Our Club</span>
                    </h1>
                    <p className="text-xl text-white/70 max-w-3xl mx-auto">
                        Empowering students to explore the quantum frontier through education, research, and community
                    </p>
                </motion.div>

                {/* Mission & Vision */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Card className="h-full" gradient>
                            <div className="inline-flex p-3 rounded-lg bg-gradient-to-br from-neon-blue to-neon-cyan mb-4">
                                <Target className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4 font-display">Our Mission</h2>
                            <p className="text-white/80 text-lg leading-relaxed">
                                To democratize quantum computing education and create a thriving community where students
                                can learn, experiment, and innovate in this transformative field. We believe quantum computing
                                is the future, and everyone should have the opportunity to be part of it.
                            </p>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Card className="h-full" gradient>
                            <div className="inline-flex p-3 rounded-lg bg-gradient-to-br from-neon-purple to-neon-pink mb-4">
                                <Eye className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4 font-display">Our Vision</h2>
                            <p className="text-white/80 text-lg leading-relaxed">
                                To become a leading student-driven quantum computing community that bridges the gap between
                                theory and practice. We envision a future where our members contribute to groundbreaking
                                quantum research, develop innovative applications, and lead the quantum revolution.
                            </p>
                        </Card>
                    </motion.div>
                </div>

                {/* What is Quantum Computing */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <Card gradient>
                        <h2 className="text-3xl font-bold text-white mb-6 font-display">
                            Understanding Quantum Computing
                        </h2>
                        <div className="space-y-4 text-white/80 text-lg leading-relaxed">
                            <p>
                                Quantum computing represents a paradigm shift in how we process information. Unlike classical computers
                                that use bits (0s and 1s), quantum computers use quantum bits or <strong className="text-neon-blue">qubits</strong>,
                                which can exist in multiple states simultaneously through a phenomenon called <strong className="text-neon-purple">superposition</strong>.
                            </p>
                            <p>
                                This, combined with <strong className="text-neon-cyan">quantum entanglement</strong>—a mysterious connection
                                between qubits—enables quantum computers to solve certain problems exponentially faster than classical computers.
                                From drug discovery and materials science to cryptography and optimization, quantum computing promises to
                                revolutionize countless fields.
                            </p>
                            <p>
                                Major tech companies like IBM, Google, and Microsoft are investing billions in quantum research, and
                                the race to achieve quantum advantage is accelerating. Now is the perfect time to get involved and
                                shape this exciting future.
                            </p>
                        </div>
                    </Card>
                </motion.div>

                {/* Club Goals */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <h2 className="text-3xl font-bold text-white mb-8 text-center font-display">
                        Our <span className="gradient-text">Future Goals</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Rocket,
                                title: 'Research Excellence',
                                description: 'Publish papers in quantum computing conferences and contribute to open-source quantum frameworks.',
                            },
                            {
                                icon: Users,
                                title: 'Community Growth',
                                description: 'Expand to include collaborations with other universities and industry partnerships worldwide.',
                            },
                            {
                                icon: Target,
                                title: 'Quantum IDE',
                                description: 'Develop a comprehensive web-based quantum programming environment for education and research.',
                            },
                        ].map((goal, index) => (
                            <motion.div
                                key={goal.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="h-full text-center">
                                    <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple mb-4">
                                        <goal.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3 font-display">{goal.title}</h3>
                                    <p className="text-white/70">{goal.description}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
