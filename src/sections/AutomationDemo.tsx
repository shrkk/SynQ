import { useRef } from 'react';
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AlertCircle, CheckCircle2, RefreshCw, Terminal } from 'lucide-react';
import { api } from '../services/api';
import type { DashboardSummary } from '../services/api';

export const AutomationDemo = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const [stats, setStats] = React.useState<DashboardSummary | null>(null);

    React.useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await api.getDashboardSummary();
                setStats(data);
            } catch (e) {
                console.error("Failed to fetch dashboard stats", e);
            }
        };
        fetchStats();
    }, []);

    // Content is taller than 600px container, so we scroll it up as user scrolls down page
    // [0, 0.25, 1] means it stays at 0% for the first 25% of the scroll timeline (while entering view)
    const y = useTransform(scrollYProgress, [0, 0.25, 1], ["0%", "0%", "-25%"]);

    return (
        <section ref={sectionRef} className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Your store, optimized.</h2>
                    <p className="text-sous-text-secondary text-lg max-w-2xl mx-auto">
                        sous tracks your Square sales in real-time, alerting you to trends and stock issues instantly.
                    </p>
                </div>

                {/* App Window Mockup */}
                <div className="relative max-w-5xl mx-auto">
                    <div className="glass-panel rounded-2xl p-1 border border-sous-border shadow-2xl overflow-hidden bg-[#0F0F12]">
                        {/* Window Controls */}
                        <div className="h-10 border-b border-sous-border bg-white/5 flex items-center px-4 gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                            <div className="ml-4 text-xs text-sous-text-muted font-medium">sous Automation Center</div>
                        </div>

                        {/* Main Content Area */}
                        <div className="flex flex-col md:flex-row h-[600px] bg-[#0F0F12]">

                            {/* Dashboard Sidebar */}
                            <div className="w-56 border-r border-sous-border bg-white/5 p-4 hidden md:flex flex-col gap-1 z-10 relative">
                                <div className="text-xs font-semibold text-sous-text-muted uppercase tracking-wider mb-4 px-2">Store Operations</div>
                                <div className="flex items-center justify-between text-sm px-3 py-2 rounded-md bg-sous-accent-cyan/10 text-sous-accent-cyan font-medium cursor-pointer">
                                    <span>Sales Tracker</span>
                                    <div className="w-1.5 h-1.5 rounded-full bg-sous-accent-cyan shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                                </div>
                                <div className="flex items-center justify-between text-sm px-3 py-2 rounded-md text-sous-text-secondary hover:text-white hover:bg-white/5 cursor-pointer transition-colors">
                                    <span>Inventory</span>
                                    <span className="text-xs text-sous-text-muted">842</span>
                                </div>
                                <div className="flex items-center justify-between text-sm px-3 py-2 rounded-md text-sous-text-secondary hover:text-white hover:bg-white/5 cursor-pointer transition-colors">
                                    <span>Staffing</span>
                                    <span className="text-xs text-sous-text-muted">Active</span>
                                </div>

                                <div className="h-px bg-sous-border my-2" />

                                <div className="text-xs font-semibold text-sous-text-muted uppercase tracking-wider mb-2 mt-2 px-2">Alerts</div>
                                <div className="flex items-center justify-between text-sm px-3 py-2 rounded-md text-sous-text-secondary hover:text-white hover:bg-white/5 cursor-pointer transition-colors">
                                    <span>Stock Alerts</span>
                                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${stats && stats.low_stock_item_count > 0 ? 'bg-orange-500/20 text-orange-500' : 'bg-green-500/20 text-green-500'}`}>
                                        {stats ? stats.low_stock_item_count : '-'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm px-3 py-2 rounded-md text-sous-text-secondary hover:text-white hover:bg-white/5 cursor-pointer transition-colors">
                                    <span>Transactions</span>
                                    <span className="text-xs text-sous-text-muted">{stats ? stats.total_transactions : 0}</span>
                                </div>
                            </div>

                            {/* Main Dashboard View */}
                            <div className="flex-1 overflow-hidden relative">
                                <motion.div style={{ y }} className="p-8 pb-24">
                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center border border-white/20 p-1">
                                                <img src="/logos/square.jpg" className="w-full h-full object-contain rounded-md" alt="Square Logo" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-white">Square Terminal - Main Location</h3>
                                                <div className="flex items-center gap-2 text-xs text-sous-text-secondary">
                                                    <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-green-500" /> Live</span>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-1"><RefreshCw className="w-3 h-3" /> Sync frequency: Real-time</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => {
                                                    api.ingest().then(() => api.getDashboardSummary().then(setStats));
                                                }}
                                                className="px-3 py-1.5 text-xs font-medium bg-sous-accent-cyan text-black rounded-lg hover:opacity-90 active:scale-95 transition-all"
                                            >
                                                Simulate Sale
                                            </button>
                                        </div>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-3 gap-4 mb-8">
                                        <div className="p-4 rounded-xl border border-sous-border bg-white/5">
                                            <div className="text-xs text-sous-text-muted mb-1">New Collection Revenue</div>
                                            <div className="text-2xl font-semibold text-white">
                                                ${stats ? stats.total_sales.toLocaleString() : '...'}
                                            </div>
                                            <div className="text-[10px] text-green-500 mt-1">↑ Real-time</div>
                                        </div>
                                        <div className="p-4 rounded-xl border border-sous-border bg-white/5">
                                            <div className="text-xs text-sous-text-muted mb-1">Top Item</div>
                                            <div className="text-lg font-semibold text-white truncate" title={stats?.top_selling_item || ""}>
                                                {stats?.top_selling_item || "Calculating..."}
                                            </div>
                                            <div className="text-[10px] text-sous-text-muted mt-1">Best Seller</div>
                                        </div>
                                        <div className="p-4 rounded-xl border border-sous-border bg-white/5">
                                            <div className="text-xs text-sous-text-muted mb-1">Avg Order Value</div>
                                            <div className="text-2xl font-semibold text-white">
                                                ${stats && stats.total_transactions > 0 ? (stats.total_sales / stats.total_transactions).toFixed(2) : '0.00'}
                                            </div>
                                            <div className="text-[10px] text-sous-text-muted mt-1">Based on {stats?.total_transactions || 0} txns</div>
                                        </div>
                                    </div>

                                    {/* Sync History / Timeline */}
                                    <div className="mb-8">
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="text-sm font-medium text-white">Sales Velocity</h4>
                                            <span className="text-xs text-sous-text-muted">Last 4 Hours</span>
                                        </div>
                                        <div className="h-16 flex items-end gap-1 opacity-80">
                                            {[20, 30, 45, 60, 40, 80, 50, 60, 75, 40, 90, 85, 70, 60, 50, 55, 65, 80, 95].map((h, i) => (
                                                <div
                                                    key={i}
                                                    className={`w-full rounded-sm ${h > 80 ? 'bg-sous-accent-cyan' : 'bg-sous-accent-cyan/20'}`}
                                                    style={{ height: `${h}%` }}
                                                />
                                            ))}
                                        </div>
                                        <div className="mt-2 flex items-center gap-2 text-xs text-orange-400 bg-orange-500/10 border border-orange-500/20 p-2 rounded-lg">
                                            <AlertCircle className="w-3 h-3" />
                                            High demand detected for "{stats?.top_selling_item || 'Items'}"
                                        </div>
                                    </div>

                                    {/* Stacktrace Analysis Section */}
                                    <div className="border-t border-sous-border pt-8">
                                        <h4 className="text-sm font-medium text-white mb-4 flex items-center gap-2">
                                            <Terminal className="w-4 h-4 text-sous-text-secondary" />
                                            Live Insights
                                        </h4>

                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            {/* Left: Raw Log */}
                                            <div className="rounded-lg border border-sous-border bg-black/60 p-4 font-mono text-[10px] leading-relaxed relative overflow-hidden group">
                                                <div className="absolute top-0 right-0 p-2 bg-sous-border rounded-bl-lg text-[9px] text-sous-text-muted">TRANSACTION LOG</div>
                                                <div className="text-sous-text-muted mb-2 opacity-50">... previous sales ...</div>
                                                <div className="text-sous-text-primary">Order #SQ-{Math.floor(Math.random() * 10000)} - Completed</div>
                                                <div className="text-orange-400 mt-2 bg-orange-500/10 -mx-4 px-4 py-1 border-l-2 border-orange-500">
                                                    Analysis: {stats ? `${stats.new_transactions || 0} new transactions synced.` : "Waiting for shuffle..."}
                                                </div>
                                            </div>

                                            {/* Right: Insight */}
                                            <div className="flex flex-col justify-center">
                                                <div className="bg-sous-accent-cyan/10 border border-sous-accent-cyan/20 rounded-xl p-5 relative">
                                                    <div className="absolute -top-3 left-4 bg-[#0F0F12] px-2 text-sous-accent-cyan text-[10px] font-semibold border border-sous-accent-cyan/20 rounded-full flex items-center gap-1">
                                                        <SparklesIcon className="w-3 h-3" /> sous ACTION
                                                    </div>
                                                    <h5 className="text-sm font-medium text-white mb-2">Restock Recommended</h5>
                                                    <p className="text-xs text-sous-text-secondary mb-4 leading-relaxed">
                                                        "{stats?.top_selling_item || 'Item'}" is selling faster than projected.
                                                    </p>
                                                    <div className="flex items-center gap-3">
                                                        <button className="flex-1 py-2 px-3 bg-sous-accent-cyan text-black text-xs font-semibold rounded-lg hover:opacity-90 transition-opacity">
                                                            Order Transfer
                                                        </button>
                                                        <button className="py-2 px-3 border border-sous-border text-sous-text-secondary text-xs font-medium rounded-lg hover:bg-white/5 transition-colors">
                                                            Dismiss
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

// Small utility icon component
const SparklesIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L14.4 7.2L20 9.6L14.4 12L12 17.2L9.6 12L4 9.6L9.6 7.2L12 2Z" fill="currentColor" />
    </svg>
);
