import { motion } from 'framer-motion';
import FaultyTerminal from '../components/FaultyTerminal';

export const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <FaultyTerminal
                    tint="#a3b2f0"
                    scanlineIntensity={0.2}
                    glitchAmount={1.1}
                    className="opacity-40"
                    flickerAmount={0.9}
                    timeScale={0.5}
                />
                {/* Gradient Fade to Black */}
                <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-synq-bg via-synq-bg/80 to-transparent pointer-events-none" />
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">


                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8 leading-tight"
                >
                    You have the data. <br />
                    <span className="text-synq-text-secondary">But you don't have the answers.</span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="max-w-2xl mx-auto space-y-6 text-lg md:text-xl text-synq-text-muted leading-relaxed"
                >
                    <p>
                        Your startup is generating millions of rows of data. Stripe, HubSpot, Postgres.
                        It’s all there. Yet, asking a simple question—"Why did churn drop last week?"—means
                        bugging an engineer or staring at a dashboard that only shows <em>what</em> happened, not <em>why</em>.
                    </p>
                    <p className="text-synq-text-primary font-medium">
                        Teams need understanding, not just infrastructure.
                    </p>
                </motion.div>
            </div>

            {/* Decorative gradient line at bottom - REMOVED */}
        </section>
    );
};
