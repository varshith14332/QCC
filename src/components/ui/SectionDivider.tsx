import { motion } from 'framer-motion';

interface SectionDividerProps {
    className?: string;
    variant?: 'gradient' | 'dots' | 'wave';
}

export const SectionDivider = ({ className = '', variant = 'gradient' }: SectionDividerProps) => {
    if (variant === 'dots') {
        return (
            <div className={`flex items-center justify-center gap-2 my-12 ${className}`}>
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple"
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.3 }}
                    />
                ))}
            </div>
        );
    }

    if (variant === 'wave') {
        return (
            <div className={`relative h-20 my-12 overflow-hidden ${className}`}>
                <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 1200 100"
                    preserveAspectRatio="none"
                >
                    <motion.path
                        d="M0,50 Q300,20 600,50 T1200,50"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 0.5 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: 'easeInOut' }}
                    />
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#00d4ff" />
                            <stop offset="50%" stopColor="#a855f7" />
                            <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        );
    }

    // Default: gradient line
    return (
        <motion.div
            className={`relative h-px my-12 ${className}`}
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-50" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-neon-blue shadow-lg shadow-neon-blue/50" />
        </motion.div>
    );
};
