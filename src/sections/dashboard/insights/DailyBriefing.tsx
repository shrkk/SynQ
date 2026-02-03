import { generateDailyBriefing } from '../../../services/mockData';
import { motion } from 'framer-motion';
import { Sparkles, AlertTriangle, ArrowRight, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export const DailyBriefing = () => {
    const [briefing] = useState(generateDailyBriefing());

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-sous-accent-cyan/10 to-transparent border border-sous-accent-cyan/20 p-6 rounded-2xl relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles size={100} />
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-sous-accent-cyan/20 rounded-lg text-sous-accent-cyan">
                        <Sparkles size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-white">Sous Daily Briefing</h2>
                </div>

                <div className="mb-6">
                    <h3 className="text-2xl font-light text-white mb-2">{briefing.greeting}</h3>
                    <p className="text-sous-text-primary text-lg leading-relaxed">
                        {briefing.kpiSummary}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {briefing.alerts.map((alert, i) => (
                        <div key={i} className="flex items-start gap-3 bg-black/20 p-3 rounded-xl border border-white/5">
                            <AlertTriangle size={16} className="text-yellow-500 mt-1 shrink-0" />
                            <p className="text-sm text-sous-text-secondary" dangerouslySetInnerHTML={{ __html: alert.replace(/\*\*(.*?)\*\*/g, '<span class="text-white font-medium">$1</span>') }} />
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-3 bg-sous-accent-cyan/10 p-4 rounded-xl border border-sous-accent-cyan/20">
                    <TrendingUp className="text-sous-accent-cyan" size={20} />
                    <p className="flex-1 text-sm text-white">
                        <span className="font-bold text-sous-accent-cyan">Action Item:</span> {briefing.actionItem}
                    </p>
                    <button className="px-4 py-2 bg-sous-accent-cyan text-black text-sm font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
                        Review <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};
