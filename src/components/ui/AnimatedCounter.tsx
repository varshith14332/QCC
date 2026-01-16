import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';

interface AnimatedCounterProps {
    from?: number;
    to: number;
    duration?: number;
    prefix?: string;
    suffix?: string;
    className?: string;
    decimals?: number;
}

export const AnimatedCounter = ({
    from = 0,
    to,
    duration = 2,
    prefix = '',
    suffix = '',
    className = '',
    decimals = 0,
}: AnimatedCounterProps) => {
    const ref = useRef<HTMLSpanElement>(null);
    const count = useMotionValue(from);
    const rounded = useTransform(count, (latest) => {
        return decimals > 0 ? latest.toFixed(decimals) : Math.round(latest).toString();
    });
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    useEffect(() => {
        if (isInView) {
            const controls = animate(count, to, {
                duration,
                ease: 'easeOut',
            });

            return controls.stop;
        }
    }, [isInView, count, to, duration]);

    return (
        <span ref={ref} className={className}>
            {prefix}
            <motion.span>{rounded}</motion.span>
            {suffix}
        </span>
    );
};
