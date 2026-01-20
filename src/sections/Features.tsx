import { MessageSquare, BarChart3, Zap, Layers, Lock, Search } from 'lucide-react';
import MagicBento from '../components/MagicBento';

const features = [
    {
        icon: MessageSquare,
        title: "Just Ask Questions",
        description: "No complex dashboards. Just ask 'How much cash do we have?' or 'Can I afford more inventory?'"
    },
    {
        icon: BarChart3,
        title: "Instant Reports",
        description: "See your daily sales, expenses, and net profit in one view. No manual data entry required."
    },
    {
        icon: Zap,
        title: "Smart Alerts",
        description: "Get notified when cash is low or when a top-selling item needs restocking."
    },
    {
        icon: Layers,
        title: "Connect Everything",
        description: "Works with Clover, Stripe, Square, PayPal, and your bank. See your whole business in one place."
    },
    {
        icon: Search,
        title: "We Learn Your Business",
        description: "Synq learns your busy seasons and your specific costs, giving you advice that actually makes sense."
    },
    {
        icon: Lock,
        title: "Bank-Grade Security",
        description: "Your financial data is encrypted and private. We treat your business information with the same care as a bank."
    },
];

export const Features = () => {
    return (
        <section id="features" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Complexity, simplified.
                    </h2>
                    <p className="text-synq-text-secondary max-w-2xl mx-auto">
                        Powerful tools to manage your money and resources, built for business owners, not data scientists.
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
