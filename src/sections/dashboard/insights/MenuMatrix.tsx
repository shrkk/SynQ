import { generateMenuMatrix } from '../../../services/mockData';
import { motion } from 'framer-motion';
import { GitMerge, Plus } from 'lucide-react';
import { useState } from 'react';

import { AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

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
                                <div className="col-span-2">
                                    <div className="text-xs text-sous-text-muted mb-2 uppercase tracking-wider font-semibold flex justify-between items-center">
                                        <span>Pairing Trend (Last 6 Weeks)</span>
                                        <span className="text-sous-accent-teal flex items-center gap-1.5">
                                            <div className="w-2 h-2 rounded-full bg-sous-accent-teal animate-pulse" />
                                            {pair.insight}
                                        </span>
                                    </div>
                                    <div className="h-32 w-full bg-white/5 rounded-lg p-2 border border-white/5">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={pair.trend}>
                                                <defs>
                                                    <linearGradient id={`gradientTrend-${i}`} x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <XAxis
                                                    dataKey="date"
                                                    hide={false}
                                                    axisLine={false}
                                                    tickLine={false}
                                                    tick={{ fill: '#71717a', fontSize: 10 }}
                                                    dy={10}
                                                />
                                                <YAxis hide domain={[0, 100]} />
                                                <RechartsTooltip
                                                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                                                    itemStyle={{ color: '#e4e4e7' }}
                                                    formatter={(value: any) => [`${value}%`, 'Frequency']}
                                                    cursor={{ stroke: 'rgba(255,255,255,0.1)' }}
                                                />
                                                <Area
                                                    type="monotone"
                                                    dataKey="frequency"
                                                    stroke="#8b5cf6"
                                                    strokeWidth={2}
                                                    fillOpacity={1}
                                                    fill={`url(#gradientTrend-${i})`}
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
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
