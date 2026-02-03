import { generateMenuMatrix } from '../../../services/mockData';
import { motion } from 'framer-motion';
import { GitMerge, Plus } from 'lucide-react';
import { useState } from 'react';

const COLORS_AGE = ['#0ea5e9', '#22d3ee', '#60a5fa', '#818cf8']; // Blue/Teal/Indigo
const COLORS_GENDER = ['#f472b6', '#c084fc', '#a78bfa']; // Pink/Purple

const PieChart = ({ data, colors }: { data: { label: string; value: number }[], colors: string[] }) => {
    let cumulative = 0;
    const total = data.reduce((acc, curr) => acc + curr.value, 0);

    return (
        <div className="flex items-start gap-4">
            <div className="relative w-24 h-24 flex-shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    {data.map((slice, i) => {
                        const percent = slice.value / total;
                        const dashArray = percent * 314; // 2 * PI * 50
                        const offset = cumulative * 314; // 2 * PI * 50
                        cumulative += percent;

                        return (
                            <circle
                                key={i}
                                cx="50"
                                cy="50"
                                r="25"
                                fill="transparent"
                                stroke={colors[i % colors.length]}
                                strokeWidth="50"
                                strokeDasharray={`${dashArray} 314`}
                                strokeDashoffset={-offset}
                                className="transition-all duration-500 ease-out"
                            />
                        );
                    })}
                </svg>
            </div>

            <div className="flex flex-col justify-center gap-1.5 flex-1 pt-1">
                {data.map((slice, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                            <div
                                className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                                style={{ backgroundColor: colors[i % colors.length] }}
                            />
                            <span className="text-sous-text-muted whitespace-nowrap">{slice.label}</span>
                        </div>
                        <span className="font-medium text-white">{slice.value}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const MenuMatrix = () => {
    const [pairs] = useState(generateMenuMatrix());
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-sous-card border border-sous-border p-6 rounded-2xl h-full"
        >
            <div className="mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <GitMerge className="text-sous-accent-violet" size={20} />
                    Menu Matrix
                </h3>
                <p className="text-sm text-sous-text-muted">Top performing item combinations</p>
            </div>

            <div className="flex flex-col gap-3">
                {pairs.map((pair, i) => (
                    <motion.div
                        key={i}
                        layout
                        initial={{ borderRadius: 12 }}
                        onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                        className={`
                            border cursor-pointer overflow-hidden transition-colors relative
                            ${expandedIndex === i
                                ? 'bg-sous-accent-violet/5 border-sous-accent-violet/30'
                                : 'bg-white/5 border-white/5 hover:bg-white/10'}
                        `}
                    >
                        {/* Header Section */}
                        <motion.div layout className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-white">{pair.itemA}</span>
                                    <Plus size={14} className="text-sous-text-muted" />
                                    <span className="font-medium text-white">{pair.itemB}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <div className="text-xs text-sous-text-muted">Together</div>
                                    <div className="text-sm font-bold text-sous-accent-violet">{pair.frequency}%</div>
                                </div>
                                <motion.div
                                    animate={{ rotate: expandedIndex === i ? 180 : 0 }}
                                    className="text-sous-text-muted"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Expanded Content */}
                        {expandedIndex === i && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="border-t border-white/5 px-4 pb-4"
                            >
                                <div className="pt-3 pb-4 text-xs text-sous-accent-teal font-medium flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-sous-accent-teal" />
                                    {pair.insight}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {/* Age Demographics */}
                                    <div>
                                        <div className="text-xs text-sous-text-muted mb-3 uppercase tracking-wider font-semibold">Age</div>
                                        <PieChart
                                            data={Object.entries(pair.demographics.ageGroups).map(([label, value]) => ({ label, value }))}
                                            colors={COLORS_AGE}
                                        />
                                    </div>

                                    {/* Gender Demographics */}
                                    <div>
                                        <div className="text-xs text-sous-text-muted mb-3 uppercase tracking-wider font-semibold">Gender</div>
                                        <PieChart
                                            data={Object.entries(pair.demographics.gender).map(([label, value]) => ({ label, value }))}
                                            colors={COLORS_GENDER}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};
