import { generateSmartPars } from '../../../services/mockData';
import { motion } from 'framer-motion';
import { TrendingDown, ArrowRight, BarChart3, Info } from 'lucide-react';
import { useState } from 'react';

export const SmartParChart = () => {
    const [pars] = useState(generateSmartPars());

    const maxVal = Math.max(...pars.map(p => Math.max(p.currentPar, p.recommendedPar)));

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-sous-card border border-sous-border p-6 rounded-2xl"
        >
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <BarChart3 className="text-sous-accent-violet" size={20} />
                        Smart Par Recommendations
                    </h3>
                    <p className="text-sm text-sous-text-muted">AI-optimized stock levels based on demand variance</p>
                </div>
                <button className="text-xs text-sous-accent-cyan flex items-center gap-1 hover:underline">
                    View Methodology <Info size={12} />
                </button>
            </div>

            <div className="space-y-6">
                {pars.map((item, i) => (
                    <div key={item.id} className="relative">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium text-white">{item.name}</span>
                            <div className="flex gap-4 text-xs">
                                <span className="text-sous-text-muted">Current: {item.currentPar}</span>
                                <span className="text-sous-accent-cyan font-bold">AI Rec: {item.recommendedPar}</span>
                            </div>
                        </div>

                        {/* Chart Bar */}
                        <div className="h-8 bg-white/5 rounded-lg relative overflow-hidden flex items-center px-2">
                            {/* Current Par Marker */}
                            <div
                                className="absolute top-0 bottom-0 w-1 bg-sous-text-muted/50 z-10 transition-all duration-1000"
                                style={{ left: `${(item.currentPar / (maxVal * 1.2)) * 100}%` }}
                            />

                            {/* Recommended Par Bar */}
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(item.recommendedPar / (maxVal * 1.2)) * 100}%` }}
                                transition={{ duration: 1, delay: i * 0.1 }}
                                className={`h-4 rounded-full ${item.recommendedPar < item.currentPar ? 'bg-sous-accent-cyan' : 'bg-sous-accent-violet'
                                    }`}
                            />
                        </div>

                        {/* Insight Text */}
                        <div className="flex items-center justify-between mt-2">
                            <p className="text-xs text-sous-text-secondary italic">"{item.reason}"</p>
                            {item.wasteSavings > 0 && (
                                <span className="text-xs text-green-400 flex items-center gap-1 bg-green-400/10 px-2 py-0.5 rounded">
                                    <TrendingDown size={12} />
                                    Save ${item.wasteSavings}/mo
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full mt-6 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-white hover:bg-white/10 transition-colors flex justify-center items-center gap-2">
                Apply All Recommendations
                <ArrowRight size={16} />
            </button>
        </motion.div>
    );
};
