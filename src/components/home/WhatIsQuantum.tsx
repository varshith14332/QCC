import { Atom, Layers, Link2, Zap, Code, CheckCircle2, TrendingUp, Globe, Sparkles } from 'lucide-react';
import { useState, useEffect, useRef, type MouseEvent } from 'react';

export default function WhatIsQuantum() {
    const [visibleItems, setVisibleItems] = useState<number[]>([]);
    const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const sectionRef = useRef(null);
    const [stats, setStats] = useState({ market: 0, speedup: 0 });

    const features = [
        {
            icon: Atom,
            title: 'Qubits',
            description: 'The fundamental unit of quantum information, existing in superposition of states.',
            color: 'blue',
            gradient: 'from-blue-500 to-cyan-500',
            glow: 'rgba(59, 130, 246, 0.4)',
        },
        {
            icon: Layers,
            title: 'Superposition',
            description: 'Ability to process multiple possibilities simultaneously, unlike classical bits.',
            color: 'purple',
            gradient: 'from-purple-500 to-pink-500',
            glow: 'rgba(168, 85, 247, 0.4)',
        },
        {
            icon: Link2,
            title: 'Entanglement',
            description: 'Mysterious quantum correlation that Einstein called "spooky action at a distance".',
            color: 'cyan',
            gradient: 'from-cyan-500 to-teal-500',
            glow: 'rgba(34, 211, 238, 0.4)',
        },
        {
            icon: Zap,
            title: 'Quantum Advantage',
            description: 'Solving certain problems exponentially faster than classical computers.',
            color: 'pink',
            gradient: 'from-pink-500 to-rose-500',
            glow: 'rgba(236, 72, 153, 0.4)',
        },
    ];

    const applications = [
        { text: 'Drug Discovery & Molecular Simulation', icon: '💊' },
        { text: 'Cryptography & Cybersecurity', icon: '🔐' },
        { text: 'Financial Modeling & Optimization', icon: '💹' },
        { text: 'Machine Learning & AI', icon: '🤖' },
        { text: 'Climate & Weather Forecasting', icon: '🌍' },
        { text: 'Materials Science Research', icon: '⚗️' },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        features.forEach((_, index) => {
                            setTimeout(() => {
                                setVisibleItems(prev => [...prev, index]);
                            }, index * 150);
                        });

                        // Animate stats
                        let marketCount = 0;
                        let speedupCount = 0;
                        const marketInterval = setInterval(() => {
                            marketCount += 50;
                            if (marketCount >= 1000) {
                                marketCount = 1000;
                                clearInterval(marketInterval);
                            }
                            setStats(prev => ({ ...prev, market: marketCount }));
                        }, 30);

                        const speedupInterval = setInterval(() => {
                            speedupCount += 50;
                            if (speedupCount >= 1000) {
                                speedupCount = 1000;
                                clearInterval(speedupInterval);
                            }
                            setStats(prev => ({ ...prev, speedup: speedupCount }));
                        }, 20);
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const cardRef = e.currentTarget;
        const rect = cardRef.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <div className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-24 overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />

            <section ref={sectionRef} className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-20 animate-fadeInUp">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-sm mb-8">
                        <Sparkles size={16} className="text-blue-400" />
                        <span className="text-sm text-white/80 font-medium">The Future of Computing</span>
                    </div>

                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
                        What is{' '}
                        <span className="relative inline-block">
                            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-fast">
                                Quantum Computing
                            </span>
                            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full blur-sm" />
                        </span>
                        ?
                    </h2>

                    <p className="text-xl md:text-2xl text-white/60 max-w-4xl mx-auto leading-relaxed">
                        Quantum computing harnesses the principles of quantum mechanics to process information
                        in fundamentally new ways, promising revolutionary advances in computation.
                    </p>
                </div>

                {/* Two-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
                    {/* Left: Quantum Concepts */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-8 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
                                <Code className="text-blue-400" size={24} />
                            </div>
                            <h3 className="text-3xl font-bold text-white">Core Concepts</h3>
                        </div>

                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            const isVisible = visibleItems.includes(index);
                            const isHovered = hoveredFeature === index;

                            return (
                                <div
                                    key={feature.title}
                                    className={`transform transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                                        }`}
                                    style={{ transitionDelay: `${index * 150}ms` }}
                                    onMouseEnter={() => setHoveredFeature(index)}
                                    onMouseLeave={() => setHoveredFeature(null)}
                                    onMouseMove={handleMouseMove}
                                >
                                    <div className="relative group cursor-pointer">
                                        {/* Glow Effect */}
                                        {isHovered && (
                                            <div
                                                className="absolute -inset-1 rounded-2xl blur-xl transition-opacity duration-300"
                                                style={{
                                                    background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, ${feature.glow}, transparent 70%)`,
                                                }}
                                            />
                                        )}

                                        <div
                                            className="relative flex items-start gap-4 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:bg-white/10"
                                            style={{
                                                transform: isHovered ? 'translateX(8px) scale(1.02)' : 'translateX(0) scale(1)',
                                            }}
                                        >
                                            {/* Spotlight Effect */}
                                            {isHovered && (
                                                <div
                                                    className="absolute inset-0 opacity-20 pointer-events-none rounded-2xl"
                                                    style={{
                                                        background: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.15), transparent)`,
                                                    }}
                                                />
                                            )}

                                            <div
                                                className={`flex-shrink-0 p-3.5 rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg transition-all duration-500 ${isHovered ? 'scale-110 rotate-6' : 'scale-100 rotate-0'}`}
                                            >
                                                <Icon className="w-6 h-6 text-white" />
                                            </div>

                                            <div className="flex-1">
                                                <h4 className={`text-xl font-bold mb-2 transition-all duration-300 ${isHovered ? `text-${feature.color}-400` : 'text-white'}`}>
                                                    {feature.title}
                                                </h4>
                                                <p className="text-white/60 text-sm leading-relaxed group-hover:text-white/80 transition-colors">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right: Applications */}
                    <div className="lg:sticky lg:top-24 h-fit animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                        <div className="relative group">
                            {/* Card Glow */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl">
                                {/* Header */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                                        <Globe className="text-purple-400" size={24} />
                                    </div>
                                    <h3 className="text-3xl font-bold text-white">Real-World Applications</h3>
                                </div>

                                <p className="text-white/60 mb-8 leading-relaxed text-lg">
                                    Quantum computing is poised to revolutionize multiple industries by solving
                                    problems that are intractable for classical computers.
                                </p>

                                {/* Applications List */}
                                <ul className="space-y-4 mb-8">
                                    {applications.map((app, index) => (
                                        <li
                                            key={app.text}
                                            className="flex items-center gap-4 group/item cursor-pointer transition-all duration-300 hover:translate-x-2"
                                            style={{
                                                animation: `fadeInLeft 0.6s ease-out ${0.6 + index * 0.1}s both`
                                            }}
                                        >
                                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center border border-blue-500/20 group-hover/item:border-blue-400/40 group-hover/item:scale-110 transition-all">
                                                <CheckCircle2 size={20} className="text-blue-400 group-hover/item:text-blue-300 transition-colors" />
                                            </div>
                                            <span className="text-white/80 group-hover/item:text-white transition-colors flex items-center gap-2">
                                                <span className="text-xl">{app.icon}</span>
                                                <span className="font-medium">{app.text}</span>
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Stats */}
                                <div className="pt-8 border-t border-white/10">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 hover:border-blue-400/40 transition-all hover:scale-105 cursor-pointer group/stat">
                                            <div className="flex items-center justify-center gap-1 mb-2">
                                                <TrendingUp size={20} className="text-blue-400 group-hover/stat:scale-125 transition-transform" />
                                                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                                    ${stats.market >= 1000 ? '1T' : `${stats.market}B`}+
                                                </div>
                                            </div>
                                            <div className="text-xs text-white/50 uppercase tracking-wider font-semibold">
                                                Market Potential by 2035
                                            </div>
                                        </div>

                                        <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-400/40 transition-all hover:scale-105 cursor-pointer group/stat">
                                            <div className="flex items-center justify-center gap-1 mb-2">
                                                <Zap size={20} className="text-purple-400 group-hover/stat:scale-125 transition-transform" />
                                                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                                    {stats.speedup}x
                                                </div>
                                            </div>
                                            <div className="text-xs text-white/50 uppercase tracking-wider font-semibold">
                                                Speedup for Certain Problems
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="relative mt-20">
                    {/* Wave SVG */}
                    <svg className="w-full h-12 text-white/10" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor" opacity="0.3" />
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor" className="text-blue-500/10" style={{ transform: 'translateY(-20px)' }} />
                    </svg>
                </div>
            </section>
        </div>
    );
}