import { MessageSquare, BarChart3, Zap, Layers, Lock, Search } from 'lucide-react';
import MagicBento from '../components/MagicBento';

const features = [
    {
        icon: MessageSquare,
        title: "Natural Language Queries",
        description: "Ask questions in plain English. Synq understands business context, not just keywords."
    },
    {
        icon: BarChart3,
        title: "Automatic Reports",
        description: "Instant visualization. Synq chooses the best chart for your data without manual configuration."
    },
    {
        icon: Zap,
        title: "Proactive Insights",
        description: "Don't just wait for answers. Synq surfaces trends and anomalies before you ask."
    },
    {
        icon: Layers,
        title: "Unified Data Layer",
        description: "Connect Stripe, HubSpot, and DBs in one click. Cross-reference data without complex ETL."
    },
    {
        icon: Search,
        title: "Semantic Understanding",
        description: "Synq learns your specific business metric definitions, so 'churn' always means 'churn'."
    },
    {
        icon: Lock,
        title: "Enterprise Grade",
        description: "SOC2 compliant security. Your data is processed privately and never used to train public models."
    },
];

export const Features = () => {
    return (
        <section id="features" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Understanding, automated.
                    </h2>
                    <p className="text-synq-text-secondary max-w-2xl mx-auto">
                        Powerful features that replace your data team, accessible to everyone.
                    </p>
                </div>

                <MagicBento
                    items={features}
                    enableStars={true}
                    enableSpotlight={true}
                    enableBorderGlow={true}
                    enableTilt={true}
                    enableMagnetism={true}
                    clickEffect={true}
                    spotlightRadius={75}
                    particleCount={8}
                    glowColor="167, 139, 250"
                />
            </div>
        </section>
    );
};
