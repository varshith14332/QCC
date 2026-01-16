import type { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    gradient?: boolean;
}

export const Card = ({ children, className = '', hover = false, gradient = false }: CardProps) => {
    return (
        <div
            className={`
                bg-quantum-light/50 backdrop-blur-sm
                border border-border-card rounded-xl
                p-6
                ${hover ? 'transition-all duration-300 hover:border-accent-blue/50 hover:bg-quantum-light/70' : ''}
                ${gradient ? 'bg-gradient-to-br from-white/5 to-white/0 border-t-white/10' : ''}
                ${className}
            `}
        >
            {children}
        </div>
    );
};
