import { generateMenuMatrix } from '../../../services/mockData';
import { motion } from 'framer-motion';
import { GitMerge, Plus } from 'lucide-react';
import { useState } from 'react';

const COLORS_AGE = ['#0ea5e9', '#22d3ee', '#60a5fa', '#818cf8']; // Blue/Teal/Indigo
const COLORS_GENDER = ['#f472b6', '#c084fc', '#a78bfa']; // Pink/Purple

import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const PieChart = ({ data, colors }: { data: { label: string; value: number }[], colors: string[] }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <div className="flex items-start gap-4">
            <div className="relative w-32 h-20 -mt-4 flex-shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                        <Pie
                            data={data}
                            cy="70%"
                            innerRadius={25}
                            outerRadius={35}
                            startAngle={180}
                            endAngle={0}
                            paddingAngle={5}
                            dataKey="value"
                            onMouseEnter={(_, index) => setActiveIndex(index)}
                            cornerRadius={4}
                        >
                            {data.map((_, index) => (
                                <Cell
                                    key={index}
                                    fill={colors[index % colors.length]}
                                    stroke="none"
                                    className="transition-all duration-300 ease-out outline-none"
                                    style={{
                                        filter: activeIndex === index ? `drop-shadow(0 0 4px ${colors[index % colors.length]}80)` : 'none',
                                        transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)',
                                        transformOrigin: 'center center',
                                    }}
                                />
                            ))}
                        </Pie>
                        <Tooltip cursor={false} content={<></>} />
                    </RechartsPieChart>
                </ResponsiveContainer>

                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center top-6 pointer-events-none">
                    <motion.div
                        key={activeIndex !== null ? activeIndex : 'total'}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className="text-center"
                    >
                        <span className="text-sm font-bold text-white block">
                            {activeIndex !== null ? `${data[activeIndex].value}%` : ''}
                        </span>
                    </motion.div>
                </div>
            </div>

            <div className="flex flex-col justify-center gap-1.5 flex-1 pt-1">
                {data.map((slice, i) => (
                    <div
                        key={i}
                        className={`flex items-center justify-between text-xs transition-opacity duration-200 ${activeIndex !== null && activeIndex !== i ? 'opacity-30' : 'opacity-100'}`}
                        onMouseEnter={() => setActiveIndex(i)}
                    >
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
