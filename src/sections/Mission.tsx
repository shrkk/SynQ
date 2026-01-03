import { motion } from 'framer-motion';

export const Mission = () => {
    return (
        <section id="mission" className="py-32 relative bg-synq-bg">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1 }}
                    className="relative"
                >
                    <h2 className="text-3xl md:text-5xl font-semibold text-white leading-tight">
                        We built Synq to make data understanding accessible — so every team can make
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-synq-accent-cyan to-synq-accent-violet"> informed decisions </span>
                        without technical barriers.
                    </h2>
                </motion.div>
            </div>
        </section>
    );
};
