import Hero from '../components/home/Hero';
import FeaturedHighlights from '../components/home/FeaturedHighlights';
import WhatIsQuantum from '../components/home/WhatIsQuantum';
import ShaderBackground from '../components/ui/ShaderBackground';

export const Home = () => {
    return (
        <div className="relative">
            {/* Shared Shader Background */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <ShaderBackground className="w-full h-full" />
            </div>

            {/* Content Sections */}
            <div className="relative z-10">
                <Hero />
                <FeaturedHighlights />
                <WhatIsQuantum />
            </div>
        </div>
    );
};
