import { Link } from 'react-router-dom';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: 'About', path: '/about' },
        { name: 'Learn', path: '/learn' },
        { name: 'Projects', path: '/projects' },
        { name: 'Events', path: '/events' },
        { name: 'Team', path: '/team' },
        { name: 'Join Club', path: '/join' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <footer className="relative z-10 bg-quantum-dark border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Left Column - Description */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue to-accent-cyan flex items-center justify-center">
                                <span className="text-white font-bold text-lg">Q</span>
                            </div>
                            <span className="text-white font-semibold text-lg">Quantum Computing Club</span>
                        </div>
                        <p className="text-white/60 mb-4 max-w-md leading-relaxed">
                            A student-led community focused on learning quantum fundamentals, building real projects,
                            and preparing for a future Quantum Workspace & web IDE.
                        </p>
                        <p className="text-white/40 text-sm">
                            Powered by Quantum Computing Club
                        </p>
                    </div>

                    {/* Right Column - Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {quickLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className="text-white/60 hover:text-white text-sm transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Copyright Bar */}
                <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-white/40 text-sm">
                        © {currentYear} All rights reserved.
                    </p>
                    <p className="text-white/40 text-sm">
                        College/University: [Your Campus Name]
                    </p>
                </div>
            </div>
        </footer>
    );
};
