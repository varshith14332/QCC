import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import type { Project } from '../../types';
import { Github, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
    project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
    const statusColors = {
        completed: 'bg-green-500/20 text-green-400 border-green-500/30',
        ongoing: 'bg-neon-blue/20 text-neon-blue border-neon-blue/30',
        planned: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    };

    return (
        <motion.div
            className="h-full"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="h-full flex flex-col group cursor-pointer overflow-hidden" gradient>
                {/* Status Badge */}
                {project.status && (
                    <div className="mb-3">
                        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full capitalize ${statusColors[project.status as keyof typeof statusColors] || statusColors.ongoing}`}>
                            {project.status}
                        </span>
                    </div>
                )}

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 font-display group-hover:text-neon-blue transition-colors">
                    {project.title}
                </h3>

                {/* Description */}
                <p className="text-white/70 mb-4 flex-grow leading-relaxed">
                    {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                        <motion.span
                            key={tag}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-white border border-white/20"
                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(0,212,255,0.2)', borderColor: 'rgba(0,212,255,0.4)' }}
                        >
                            {tag}
                        </motion.span>
                    ))}
                </div>

                {/* Links */}
                {(project.github || project.demo) && (
                    <div className="flex gap-3 mt-auto pt-4 border-t border-white/10">
                        {project.github && (
                            <motion.a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-white/80 hover:text-neon-blue transition-colors"
                                whileHover={{ scale: 1.05 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Github size={16} />
                                <span>Code</span>
                            </motion.a>
                        )}
                        {project.demo && (
                            <motion.a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-white/80 hover:text-neon-purple transition-colors"
                                whileHover={{ scale: 1.05 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ExternalLink size={16} />
                                <span>Demo</span>
                            </motion.a>
                        )}
                    </div>
                )}

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/0 to-neon-purple/0 group-hover:from-neon-blue/5 group-hover:to-neon-purple/5 transition-all duration-300 rounded-xl pointer-events-none" />
            </Card>
        </motion.div>
    );
};
