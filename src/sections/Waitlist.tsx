import { ArrowRight } from 'lucide-react';

export const Waitlist = () => {
    return (
        <section id="waitlist" className="py-32 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-sous-accent-violet/5 pointer-events-none" />

            <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                    Take control of your business.
                </h2>
                <p className="text-lg text-sous-text-secondary mb-10 max-w-xl mx-auto">
                    Join the waitlist for early access. No technical skills required.
                </p>

                <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="email"
                        placeholder="founder@startup.com"
                        className="flex-1 bg-white/5 border border-sous-border rounded-lg px-4 py-3 text-white placeholder-sous-text-muted focus:outline-none focus:border-sous-accent-cyan transition-colors"
                    />
                    <button className="bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                        Join Waitlist
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </form>
                <p className="mt-4 text-xs text-sous-text-muted">
                    Limited spots available for Q1 2026.
                </p>
            </div>
        </section>
    );
};
