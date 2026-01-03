import { motion } from 'framer-motion';
import { MessageSquare, BarChart3, Zap, Layers, Lock, Search } from 'lucide-react';

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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card p-8 rounded-2xl group"
                        >
                            <div className="w-12 h-12 bg-synq-card rounded-lg flex items-center justify-center mb-6 group-hover:bg-synq-accent-cyan/10 transition-colors border border-synq-border">
                                <feature.icon className="w-6 h-6 text-synq-text-primary group-hover:text-synq-accent-cyan transition-colors" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-synq-accent-cyan transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-synq-text-secondary leading-relaxed text-sm">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
