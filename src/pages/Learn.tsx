import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { learningTopics } from '../data/learningTopics';
import { ArrowRight, BookOpen, Code, Rocket } from 'lucide-react';

export const Learn = () => {




    const beginnerTopics = learningTopics.filter(t => t.level === 'beginner');
    const intermediateTopics = learningTopics.filter(t => t.level === 'intermediate');
    const advancedTopics = learningTopics.filter(t => t.level === 'advanced');

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
                        Learning <span className="gradient-text">Roadmap</span>
                    </h1>
                    <p className="text-xl text-white/70 max-w-3xl mx-auto">
                        Your journey into quantum computing, from fundamentals to advanced research
                    </p>
                </motion.div>

                {/* Roadmap Sections */}
                {learningTopics.length > 0 ? (
                    <div className="space-y-12">
                        {/* Beginner */}
                        {beginnerTopics.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 rounded-xl bg-gradient-to-br from-neon-blue to-neon-cyan">
                                        <BookOpen className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-bold text-white font-display">Beginner Level</h2>
                                        <p className="text-white/60">Start your quantum journey here</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {beginnerTopics.map((topic, index) => (
                                        <motion.div
                                            key={topic.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                        >
                                            <Card className="h-full group cursor-pointer" gradient>
                                                <h3 className="text-xl font-bold text-white mb-3 font-display group-hover:text-neon-blue transition-colors">
                                                    {topic.title}
                                                </h3>
                                                <p className="text-white/70 mb-4">{topic.description}</p>
                                                <div className="flex items-center gap-2 text-neon-blue text-sm font-medium">
                                                    <span>Learn More</span>
                                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Intermediate */}
                        {intermediateTopics.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 rounded-xl bg-gradient-to-br from-neon-purple to-neon-pink">
                                        <Code className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-bold text-white font-display">Intermediate Level</h2>
                                        <p className="text-white/60">Dive deeper into quantum programming</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {intermediateTopics.map((topic, index) => (
                                        <motion.div
                                            key={topic.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                        >
                                            <Card className="h-full group cursor-pointer" gradient>
                                                <h3 className="text-xl font-bold text-white mb-3 font-display group-hover:text-neon-purple transition-colors">
                                                    {topic.title}
                                                </h3>
                                                <p className="text-white/70 mb-4">{topic.description}</p>
                                                <div className="flex items-center gap-2 text-neon-purple text-sm font-medium">
                                                    <span>Learn More</span>
                                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Advanced */}
                        {advancedTopics.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 rounded-xl bg-gradient-to-br from-neon-pink to-red-500">
                                        <Rocket className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-bold text-white font-display">Advanced Level</h2>
                                        <p className="text-white/60">Cutting-edge quantum research topics</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {advancedTopics.map((topic, index) => (
                                        <motion.div
                                            key={topic.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                        >
                                            <Card className="h-full group cursor-pointer" gradient>
                                                <h3 className="text-xl font-bold text-white mb-3 font-display group-hover:text-neon-pink transition-colors">
                                                    {topic.title}
                                                </h3>
                                                <p className="text-white/70 mb-4">{topic.description}</p>
                                                <div className="flex items-center gap-2 text-neon-pink text-sm font-medium">
                                                    <span>Learn More</span>
                                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="inline-block p-4 rounded-full bg-white/5 mb-4">
                            <BookOpen className="w-8 h-8 text-neon-blue" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2 font-display">Curriculum Under Construction</h2>
                        <p className="text-white/60 max-w-md mx-auto">
                            We are currently curating a world-class quantum computing curriculum. Check back soon for updates!
                        </p>
                    </motion.div>
                )}

                {/* CTA Section */}
                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <Card className="max-w-2xl mx-auto" gradient>
                        <h3 className="text-2xl font-bold text-white mb-4 font-display">
                            Ready to Start Coding?
                        </h3>
                        <p className="text-white/70 mb-6">
                            Access our interactive Quantum Workspace with built-in code editor, circuit visualizer,
                            and real quantum hardware simulators.
                        </p>
                        <Button size="lg" variant="secondary" disabled>
                            <span className="flex items-center gap-2">
                                Launch Quantum Workspace
                                <span className="text-xs px-2 py-0.5 rounded-full bg-neon-purple/30 text-neon-purple border border-neon-purple/50">
                                    Coming Soon
                                </span>
                            </span>
                        </Button>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};
