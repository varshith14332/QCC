import type { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { GradientBackground } from '../ui/GradientBackground';
import { BackToTop } from '../ui/BackToTop';

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col relative">
            <GradientBackground />
            <Navbar />
            <main className="flex-grow pt-16 md:pt-20">
                {children}
            </main>
            <Footer />
            <BackToTop />
        </div>
    );
};
