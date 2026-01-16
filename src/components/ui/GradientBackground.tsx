import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const GradientBackground = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Animated Gradient Orbs */}
            <motion.div
                className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full opacity-30 blur-[120px]"
                style={{
                    background: 'radial-gradient(circle, rgba(0,212,255,0.4) 0%, transparent 70%)',
                }}
                animate={{
                    x: mousePosition.x * 100,
                    y: mousePosition.y * 100,
                }}
                transition={{ type: 'spring', damping: 50, stiffness: 100 }}
            />

            <motion.div
                className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full opacity-30 blur-[120px]"
                style={{
                    background: 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)',
                }}
                animate={{
                    x: -mousePosition.x * 80,
                    y: mousePosition.y * 80,
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    x: { type: 'spring', damping: 50, stiffness: 100 },
                    y: { type: 'spring', damping: 50, stiffness: 100 },
                    scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
                }}
            />

            <motion.div
                className="absolute bottom-0 left-1/3 w-[550px] h-[550px] rounded-full opacity-30 blur-[120px]"
                style={{
                    background: 'radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)',
                }}
                animate={{
                    x: mousePosition.x * 60,
                    y: -mousePosition.y * 60,
                    scale: [1, 1.15, 1],
                }}
                transition={{
                    x: { type: 'spring', damping: 50, stiffness: 100 },
                    y: { type: 'spring', damping: 50, stiffness: 100 },
                    scale: { duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 },
                }}
            />

            {/* Grid Pattern Overlay */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(0,212,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.1) 1px, transparent 1px)
          `,
                    backgroundSize: '50px 50px',
                }}
            />
        </div>
    );
};
