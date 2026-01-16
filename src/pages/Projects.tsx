import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { ProjectCard } from '../components/shared/ProjectCard';

export const Projects = () => {
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
                        Our <span className="gradient-text">Projects</span>
                    </h1>
                    <p className="text-xl text-white/70 max-w-3xl mx-auto">
                        Explore innovative quantum computing projects built by our community members
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <ProjectCard project={project} />
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="glass-card max-w-2xl mx-auto p-8 gradient-border">
                        <h3 className="text-2xl font-bold text-white mb-4 font-display">
                            Have a Project Idea?
                        </h3>
                        <p className="text-white/70 mb-6">
                            Join our club and collaborate with fellow quantum enthusiasts to bring your ideas to life.
                            We provide mentorship, resources, and access to quantum hardware.
                        </p>
                        <a
                            href="/join"
                            className="inline-block px-8 py-3 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple text-white font-medium hover:shadow-lg hover:shadow-neon-blue/50 transition-all duration-300 hover:scale-105"
                        >
                            Join the Club
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
