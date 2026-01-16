import { BookOpen, Rocket, Calendar, ArrowRight, Zap, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Hero() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20,
            });
        };

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const highlights = [
        {
            icon: BookOpen,
            title: 'Learning Roadmap',
            description: 'Beginner to advanced progression with practical milestones.',
            gradient: 'from-blue-500/20 to-cyan-500/20',
            iconColor: 'text-blue-400',
        },
        {
            icon: Rocket,
            title: 'Projects & Experiments',
            description: 'Visualizations, simulators, and algorithm demos.',
            gradient: 'from-purple-500/20 to-pink-500/20',
            iconColor: 'text-purple-400',
        },
        {
            icon: Calendar,
            title: 'Events & Workshops',
            description: 'Workshops, talks, and team-driven research sprints.',
            gradient: 'from-emerald-500/20 to-teal-500/20',
            iconColor: 'text-emerald-400',
        },
    ];

    const parallaxY = scrollY * 0.5;

    return (
        <div className="relative min-h-screen bg-slate-950 overflow-hidden">
            <section
                className="relative min-h-screen flex items-center justify-center"
            >
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        transform: `translateY(${parallaxY}px)`,
                    }}
                >
                    {/* Animated Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 -z-10" />

                    {/* Animated Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e520_1px,transparent_1px),linear-gradient(to_bottom,#4f46e520_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10" />

                    {/* Floating Orbs */}
                    <div
                        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl -z-10 animate-pulse"
                        style={{
                            animation: 'float 8s ease-in-out infinite',
                        }}
                    />
                    <div
                        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl -z-10"
                        style={{
                            animation: 'float 10s ease-in-out infinite reverse',
                        }}
                    />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
                    <div className="text-center mb-16 animate-fadeInUp">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20 backdrop-blur-sm mb-8 group hover:border-blue-400/40 transition-all cursor-pointer hover:scale-105">
                            <Zap size={16} className="text-blue-400 group-hover:text-blue-300 transition-colors" />
                            <span className="text-sm text-white/90 font-medium">
                                A student-led foundation for a Quantum Workspace & IDE
                            </span>
                            <Sparkles size={16} className="text-purple-400 group-hover:text-purple-300 transition-colors" />
                        </div>

                        {/* Main Heading with Gradient */}
                        <h1
                            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight transition-transform duration-200"
                            style={{
                                transform: `perspective(1000px) rotateX(${mousePosition.y * 0.03}deg) rotateY(${mousePosition.x * 0.03}deg)`,
                            }}
                        >
                            Quantum Computing Club
                        </h1>

                        <p className="text-2xl sm:text-3xl font-semibold text-blue-300 mb-6">
                            Build the Future
                        </p>

                        <p className="text-lg sm:text-xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed">
                            Learn core quantum concepts, explore algorithms, and collaborate on projects that bridge theory to real-world quantum tooling. Designed to evolve into a full workspace and IDE.
                        </p>

                        {/* Enhanced CTAs */}
                        <div className="flex flex-wrap gap-4 justify-center items-center">
                            <button className="group relative bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-10 py-4 rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/50 hover:shadow-blue-400/60 hover:scale-105 hover:-translate-y-0.5 active:scale-100">
                                <span className="flex items-center gap-2">
                                    Join the Club
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>

                            <button className="group relative bg-white/5 hover:bg-white/10 text-white border-2 border-white/20 hover:border-white/40 px-10 py-4 rounded-xl font-semibold transition-all backdrop-blur-sm hover:scale-105 hover:-translate-y-0.5 active:scale-100">
                                <span className="flex items-center gap-2">
                                    Quantum Workspace
                                    <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-400/30">
                                        Coming Soon
                                    </span>
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Enhanced Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {highlights.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.title}
                                    className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer overflow-hidden hover:-translate-y-2 hover:scale-[1.02]"
                                    style={{
                                        animation: `fadeInUp 0.6s ease-out ${0.4 + index * 0.1}s both`
                                    }}
                                >
                                    {/* Card Gradient Background */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />

                                    {/* Shine Effect */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                    </div>

                                    <div className="relative z-10">
                                        <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${item.gradient} backdrop-blur-sm mb-4 border border-white/10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                            <Icon size={28} className={item.iconColor} />
                                        </div>

                                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors">
                                            {item.title}
                                        </h3>

                                        <p className="text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">
                                            {item.description}
                                        </p>

                                        {/* Arrow Indicator */}
                                        <div className="mt-4 flex items-center gap-2 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-sm font-medium">Learn more</span>
                                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>


                </div>
            </section>
        </div>
    );
}