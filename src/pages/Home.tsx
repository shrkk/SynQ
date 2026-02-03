import { Navbar } from '../components/Navbar';
import { Hero } from '../sections/Hero';
import { Mission } from '../sections/Mission';
import { Demo } from '../sections/Demo';
import { Features } from '../sections/Features';
import { Waitlist } from '../sections/Waitlist';
import { Footer } from '../components/Footer';
import { useAuth } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

export const Home = () => {
    const { isSignedIn } = useAuth();

    if (isSignedIn) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="min-h-screen bg-sous-bg text-sous-text-primary selection:bg-sous-accent-cyan/30">
            <Navbar />
            <main>
                <Hero />
                <Mission />
                <Demo />
                <div id="features">
                    <Features />
                </div>
                <Waitlist />
            </main>
            <Footer />
        </div>
    );
};
