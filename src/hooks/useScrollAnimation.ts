import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

interface UseScrollAnimationOptions {
    threshold?: number;
    once?: boolean;
}

/**
 * Custom hook for scroll-triggered animations
 * Uses Framer Motion's useInView for intersection observer functionality
 */
export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
    const { threshold = 0.1, once = true } = options;
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: threshold, once });

    return { ref, isInView };
};

/**
 * Custom hook for stagger animation delay
 * Useful for lists or grids where items should animate in sequence
 */
export const useStaggerDelay = (index: number, baseDelay: number = 0.1) => {
    return baseDelay * index;
};

/**
 * Custom hook for parallax scroll effect
 */
export const useParallax = (speed: number = 0.5) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;

            const scrolled = window.scrollY;
            const element = ref.current;
            const elementTop = element.offsetTop;
            const elementHeight = element.offsetHeight;

            // Only apply parallax if element is in viewport
            if (scrolled + window.innerHeight > elementTop && scrolled < elementTop + elementHeight) {
                const offset = (scrolled - elementTop) * speed;
                element.style.transform = `translateY(${offset}px)`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed]);

    return ref;
};
