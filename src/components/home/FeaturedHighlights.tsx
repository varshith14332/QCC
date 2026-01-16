import { Rocket, Calendar, BookOpen, TrendingUp, ArrowRight, Sparkles, Award } from 'lucide-react';
import { useState, useEffect, useRef, type MouseEvent } from 'react';

export default function FeaturedHighlights() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [visibleCards, setVisibleCards] = useState<number[]>([]);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        highlights.forEach((_, index) => {
                            setTimeout(() => {
                                setVisibleCards(prev => [...prev, index]);
                            }, index * 100);
                        });
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const highlights = [
        {
            icon: Rocket,
            title: 'Latest Project',
            subtitle: 'Quantum Error Correction Simulator',
            description: 'Real-time simulation of surface codes and quantum error correction techniques.',
            badge: 'New',
            badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
            cta: 'View Project',
            link: '/projects',
            gradient: 'from-blue-600 via-cyan-500 to-blue-400',
            glowColor: 'rgba(59, 130, 246, 0.3)',
            iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-500',
        },
        {
            icon: Calendar,
            title: 'Next Event',
            subtitle: 'Quantum ML Workshop',
            description: 'Hands-on workshop on quantum machine learning with Qiskit Machine Learning.',
            badge: 'This Week',
            badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
            cta: 'Register Now',
            link: '/events',
            gradient: 'from-purple-600 via-pink-500 to-purple-400',
            glowColor: 'rgba(168, 85, 247, 0.3)',
            iconBg: 'bg-gradient-to-br from-purple-500 to-pink-500',
        },
        {
            icon: BookOpen,
            title: 'Learning Path',
            subtitle: 'Beginner to Advanced',
            description: 'Structured curriculum covering quantum fundamentals, algorithms, and applications.',
            badge: 'Free',
            badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
            cta: 'Start Learning',
            link: '/learn',
            gradient: 'from-cyan-600 via-teal-500 to-cyan-400',
            glowColor: 'rgba(34, 211, 238, 0.3)',
            iconBg: 'bg-gradient-to-br from-cyan-500 to-teal-500',
        },
        {
            icon: TrendingUp,
            title: 'Recent Achievement',
            subtitle: 'IBM Quantum Challenge Winner',
            description: 'Our team secured 1st place in the IBM Quantum Challenge 2025!',
            badge: 'Achievement',
            badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
            cta: 'Learn More',
            link: '/about',
            gradient: 'from-amber-600 via-orange-500 to-amber-400',
            glowColor: 'rgba(251, 191, 36, 0.3)',
            iconBg: 'bg-gradient-to-br from-amber-500 to-orange-500',
        },
    ];

    return (
        <div className="bg-slate-950 py-20">
            <section ref={sectionRef} className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                </div>

                {/* Section Header */}
                <div className="text-center mb-16 relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-sm mb-6 animate-fadeInUp">
                        <Sparkles size={16} className="text-blue-400" />
                        <span className="text-sm text-white/80 font-medium">What's Happening</span>
                    </div>

                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Highlights
                        </span>
                    </h2>

                    <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                        Explore our latest projects, upcoming events, and club achievements
                    </p>
                </div>

                {/* Highlights Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                    {highlights.map((highlight, index) => {
                        const Icon = highlight.icon;
                        const isVisible = visibleCards.includes(index);
                        const isHovered = hoveredIndex === index;

                        return (
                            <div
                                key={highlight.title}
                                className={`transform transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                    }`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                onMouseMove={handleMouseMove}
                            >
                                <div className="relative h-full group cursor-pointer">
                                    {/* Glow Effect */}
                                    {isHovered && (
                                        <div
                                            className="absolute inset-0 rounded-2xl blur-xl transition-opacity duration-300 -z-10"
                                            style={{
                                                background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${highlight.glowColor}, transparent 60%)`,
                                            }}
                                        />
                                    )}

                                    {/* Card */}
                                    <div
                                        className="relative h-full bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 overflow-hidden transition-all duration-500 hover:border-white/20 hover:shadow-2xl"
                                        style={{
                                            transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                                        }}
                                    >
                                        {/* Spotlight Effect */}
                                        {isHovered && (
                                            <div
                                                className="absolute inset-0 opacity-30 pointer-events-none transition-opacity duration-300"
                                                style={{
                                                    background: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1), transparent)`,
                                                }}
                                            />
                                        )}

                                        {/* Animated Border Gradient */}
                                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${highlight.gradient} opacity-20 blur-sm`} />
                                        </div>

                                        {/* Badge */}
                                        <div className="absolute top-4 right-4 z-10">
                                            <div className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border backdrop-blur-sm ${highlight.badgeColor} transform transition-all duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}>
                                                {index === 3 && <Award size={12} />}
                                                {highlight.badge}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="relative z-10 h-full flex flex-col">
                                            {/* Icon */}
                                            <div
                                                className={`inline-flex p-3.5 rounded-xl ${highlight.iconBg} mb-4 self-start shadow-lg transition-all duration-500 ${isHovered ? 'scale-110 rotate-6 shadow-xl' : 'scale-100 rotate-0'}`}
                                            >
                                                <Icon className="w-6 h-6 text-white" />
                                            </div>

                                            {/* Text Content */}
                                            <div className="mb-4 flex-grow">
                                                <span className="text-xs text-white/50 uppercase tracking-wider font-semibold">
                                                    {highlight.title}
                                                </span>
                                                <h3 className={`text-xl font-bold text-white mt-2 mb-3 transition-all duration-300 ${isHovered ? 'text-transparent bg-gradient-to-r bg-clip-text ' + highlight.gradient : ''}`}>
                                                    {highlight.subtitle}
                                                </h3>
                                                <p className="text-white/60 text-sm leading-relaxed">
                                                    {highlight.description}
                                                </p>
                                            </div>

                                            {/* CTA */}
                                            <div className="pt-4 border-t border-white/5 group-hover:border-white/10 transition-colors">
                                                <button className="flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white transition-all group/btn">
                                                    <span>{highlight.cta}</span>
                                                    <ArrowRight
                                                        size={16}
                                                        className={`transition-all duration-300 ${isHovered ? 'translate-x-2' : 'translate-x-0'}`}
                                                    />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Particle Effect */}
                                        {isHovered && (
                                            <>
                                                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/40 rounded-full animate-ping" />
                                                <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-white/30 rounded-full animate-ping" style={{ animationDelay: '0.2s' }} />
                                                <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-white/20 rounded-full animate-ping" style={{ animationDelay: '0.4s' }} />
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Divider */}
                <div className="mt-20 relative">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-fadeInUp" style={{ animationDelay: '0.8s' }} />
                    <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent blur-sm animate-fadeInUp" style={{ animationDelay: '0.8s' }} />
                </div>

            </section>
        </div>
    );
}