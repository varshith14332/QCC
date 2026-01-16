import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

interface ScrollRevealProps {
    children: ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    delay?: number;
    duration?: number;
    className?: string;
    stagger?: boolean;
    staggerDelay?: number;
}

export const ScrollReveal = ({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.5,
    className = '',
    stagger = false,
    staggerDelay = 0.1,
}: ScrollRevealProps) => {
    const directionOffset = {
        up: { y: 40 },
        down: { y: -40 },
        left: { x: 40 },
        right: { x: -40 },
        none: {},
    };

    const variants: Variants = {
        hidden: {
            opacity: 0,
            ...directionOffset[direction],
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration,
                delay,
                ease: [0.25, 0.4, 0.25, 1],
                ...(stagger && {
                    staggerChildren: staggerDelay,
                }),
            },
        },
    };

    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={variants}
        >
            {children}
        </motion.div>
    );
};

// Child variant for stagger animations
export const ScrollRevealItem = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.4, 0.25, 1],
            },
        },
    };

    return (
        <motion.div className={className} variants={itemVariants}>
            {children}
        </motion.div>
    );
};
