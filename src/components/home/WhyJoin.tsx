import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Users, Lightbulb, Trophy, Briefcase, Award } from 'lucide-react';
import { ScrollReveal, ScrollRevealItem } from '../ui/ScrollReveal';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { SectionDivider } from '../ui/SectionDivider';

export const WhyJoin = () => {
    const reasons = [
        {
            icon: Users,
            title: 'Collaborative Community',
            description: 'Connect with passionate students, researchers, and industry professionals exploring quantum frontiers together.',
            stat: '150+',
            statLabel: 'Active Members',
        },
        {
            icon: Lightbulb,
            title: 'Hands-On Learning',
            description: 'Work on real quantum projects, from circuit simulators to quantum algorithms and machine learning applications.',
            stat: '25+',
            statLabel: 'Active Projects',
        },
        {
            icon: Trophy,
            title: 'Competitions & Hackathons',
            description: 'Participate in quantum computing challenges, including IBM Qiskit hackathons and research competitions.',
            stat: '10+',
            statLabel: 'Events per Year',
        },
        {
            icon: Briefcase,
            title: 'Career Opportunities',
            description: 'Network with quantum industry leaders and access exclusive internship and research opportunities.',
            stat: '95%',
            statLabel: 'Career Placement',
        },
    ];

    const testimonials = [
        {
            quote: "Joining the Quantum Club was the best decision of my academic career. The projects and mentorship opened doors I never imagined.",
            author: "Sarah Chen",
            role: "Former President, now at IBM Quantum",
        },
        {
            quote: "The hands-on experience with Qiskit and real quantum hardware gave me a competitive edge in interviews and research.",
            author: "Alex Kumar",
            role: "Graduate Student, MIT",
        },
    ];

    return (
        <section className="section-padding relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/4 right-0 w-96 h-96 bg-neon-purple/30 rounded-full filter blur-3xl" />
            </div>

            <div className="container-custom relative z-10">
                {/* Section Header */}
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
                            Why Join <span className="gradient-text-animated">Our Club</span>?
                        </h2>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                            Be part of a vibrant community shaping the future of quantum technology
                        </p>
                    </div>
                </ScrollReveal>

                {/* Benefits Grid */}
                <ScrollReveal stagger staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    {reasons.map((reason) => (
                        <ScrollRevealItem key={reason.title}>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Card className="h-full flex flex-col group" gradient>
                                    {/* Header with Icon and Stat */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-start gap-4 flex-1">
                                            <div className="flex-shrink-0 p-3 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple group-hover:shadow-lg group-hover:shadow-neon-blue/30 transition-all duration-300">
                                                <reason.icon className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-white mb-2 font-display group-hover:text-neon-blue transition-colors">
                                                    {reason.title}
                                                </h3>
                                                <p className="text-white/70 leading-relaxed">
                                                    {reason.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stat Display */}
                                    <div className="mt-auto pt-4 border-t border-white/10">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-white/60">{reason.statLabel}</span>
                                            <span className="text-2xl font-bold text-neon-blue">
                                                {reason.stat.includes('%') ? (
                                                    <AnimatedCounter to={parseInt(reason.stat)} suffix="%" duration={2} />
                                                ) : (
                                                    reason.stat
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        </ScrollRevealItem>
                    ))}
                </ScrollReveal>

                {/* Testimonials Section */}
                <ScrollReveal>
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-display flex items-center justify-center gap-2">
                                <Award className="text-neon-purple" size={28} />
                                What Our Members Say
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {testimonials.map((testimonial, index) => (
                                <motion.div
                                    key={testimonial.author}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                >
                                    <Card className="h-full flex flex-col">
                                        <div className="mb-4">
                                            <div className="text-neon-blue text-4xl mb-2">"</div>
                                            <p className="text-white/80 italic leading-relaxed">
                                                {testimonial.quote}
                                            </p>
                                        </div>
                                        <div className="mt-auto pt-4 border-t border-white/10">
                                            <p className="text-white font-semibold">{testimonial.author}</p>
                                            <p className="text-sm text-white/60">{testimonial.role}</p>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>

                {/* Divider */}
                <div className="mt-16">
                    <SectionDivider variant="dots" />
                </div>
            </div>
        </section>
    );
};
