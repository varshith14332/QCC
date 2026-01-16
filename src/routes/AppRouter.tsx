import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { Learn } from '../pages/Learn';
import { Projects } from '../pages/Projects';
import { Events } from '../pages/Events';
import { Team } from '../pages/Team';
import { JoinClub } from '../pages/JoinClub';
import { Contact } from '../pages/Contact';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/learn" element={<Learn />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/events" element={<Events />} />
                <Route path="/team" element={<Team />} />
                <Route path="/join" element={<JoinClub />} />
                <Route path="/contact" element={<Contact />} />

                {/* Future routes for scalability */}
                {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                {/* <Route path="/workspace" element={<QuantumWorkspace />} /> */}
                {/* <Route path="/ide" element={<QuantumIDE />} /> */}
                {/* <Route path="/login" element={<Login />} /> */}
                {/* <Route path="/signup" element={<Signup />} /> */}
            </Routes>
        </AnimatePresence>
    );
};

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Layout>
                <AnimatedRoutes />
            </Layout>
        </BrowserRouter>
    );
};
