import { motion } from 'framer-motion';
import { DollarSign, Users, ShoppingCart, ArrowUpRight, Calendar, Filter, Download } from 'lucide-react';
import { generateRevenueData } from '../../services/mockData';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';

// Metric Card Component
const MetricCard = ({ title, value, trend, trendValue, icon: Icon, delay }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="bg-sous-card border border-sous-border rounded-xl p-5 flex flex-col justify-between h-32 hover:border-sous-accent-cyan/30 transition-all group relative overflow-hidden"
    >
        {/* Background Gradient Blob */}
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-sous-accent-cyan/5 rounded-full blur-2xl group-hover:bg-sous-accent-cyan/10 transition-colors" />

        <div className="flex justify-between items-start">
            <div className="flex items-center gap-2 text-sous-text-secondary text-sm font-medium">
                <Icon size={16} />
                {title}
            </div>
            <div className="p-1 rounded-full border border-sous-border text-sous-text-muted">
                <div className="w-1 h-1 bg-sous-accent-cyan rounded-full animate-pulse" />
            </div>
        </div>

        <div>
            <h3 className="text-3xl font-bold text-white mb-1 tracking-tight">{value}</h3>
            <div className={`flex items-center gap-1.5 text-xs font-medium ${trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                <span className={`px-1.5 py-0.5 rounded ${trend === 'up' ? 'bg-emerald-400/10' : 'bg-rose-400/10'}`}>
                    {trendValue}
                </span>
                <span className="text-sous-text-muted">+14 today</span>
            </div>
        </div>
    </motion.div>
);

export const Overview = () => {
    // Mock Data for Charts
    const salesData = generateRevenueData(7).map(d => ({ ...d, value: d.revenue }));
    const distributionData = [
        { name: 'Dinet In', value: 45, color: '#22d3ee' }, // Cyan
        { name: 'Takeout', value: 30, color: '#a78bfa' }, // Violet
        { name: 'Delivery', value: 25, color: '#f472b6' }, // Pink
    ];

    return (
        <div className="space-y-6">
            {/* Page Header (Nexus Style) */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-sous-card border border-sous-border rounded-lg text-sm text-sous-text-secondary hover:text-white transition-colors">
                        <Calendar size={14} />
                        Oct 18 - Nov 18
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-sous-card border border-sous-border rounded-lg text-sm text-sous-text-secondary hover:text-white transition-colors">
                        <Filter size={14} />
                        Filter
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-sous-card border border-sous-border rounded-lg text-sm text-sous-text-secondary hover:text-white transition-colors">
                        <Download size={14} />
                        Export
                    </button>
                </div>
            </div>

            {/* Metrics Row (3 Columns) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard
                    title="Total Revenue"
                    value="$9,257.51"
                    trend="up"
                    trendValue="15.8%"
                    icon={DollarSign}
                    delay={0.1}
                />
                <MetricCard
                    title="Total Orders"
                    value="12,450"
                    trend="up"
                    trendValue="4.2%"
                    icon={ShoppingCart}
                    delay={0.2}
                />
                <MetricCard
                    title="Avg Order Value"
                    value="$42.50"
                    trend="down"
                    trendValue="1.2%"
                    icon={Users}
                    delay={0.3}
                />
            </div>

            {/* Main Charts Row (2 Columns: 2/3 + 1/3) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sales Overview (2/3) */}
                <div className="lg:col-span-2 bg-sous-card border border-sous-border rounded-xl p-6 min-h-[350px]">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-white">Sales Overview</h3>
                            <p className="text-xs text-sous-text-muted flex items-center gap-1">
                                <span className="text-emerald-400 font-medium">+15.8%</span>
                                than last week
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-1 px-2 text-xs font-medium bg-white/5 text-white rounded border border-white/5">Daily</button>
                            <button className="p-1 px-2 text-xs font-medium text-sous-text-muted hover:text-white rounded border border-transparent">Weekly</button>
                        </div>
                    </div>

                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                <RechartsTooltip
                                    contentStyle={{ backgroundColor: '#0F0F12', border: '1px solid #333' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="value" stroke="#22d3ee" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Sales Distribution (1/3) */}
                <div className="bg-sous-card border border-sous-border rounded-xl p-6 min-h-[350px] flex flex-col">
                    <h3 className="text-lg font-bold text-white mb-6">Sales Distribution</h3>
                    <div className="flex-1 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={distributionData}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {distributionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <RechartsTooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        {/* Center Text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-2xl font-bold text-white">$9.2k</span>
                            <span className="text-xs text-sous-text-muted">Total</span>
                        </div>
                    </div>
                    <div className="mt-4 space-y-3">
                        {distributionData.map((item) => (
                            <div key={item.name} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                    <span className="text-sous-text-secondary">{item.name}</span>
                                </div>
                                <span className="font-medium text-white">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Transactions List (Full Width) */}
            <div className="bg-sous-card border border-sous-border rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-white">Recent Transactions</h3>
                    <a href="#" className="text-sm text-sous-accent-cyan hover:underline">See All</a>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-xs text-sous-text-muted uppercase tracking-wider border-b border-white/5">
                                <th className="pb-3 pl-2">Customer</th>
                                <th className="pb-3">Type</th>
                                <th className="pb-3">Date</th>
                                <th className="pb-3 text-right pr-2">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {[1, 2, 3].map((i) => (
                                <tr key={i} className="group border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                    <td className="py-4 pl-2 font-medium text-white flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sous-accent-violet to-purple-800 flex items-center justify-center text-xs">
                                            {String.fromCharCode(64 + i)}
                                        </div>
                                        Customer {i}
                                    </td>
                                    <td className="py-4 text-sous-text-secondary">Dine In</td>
                                    <td className="py-4 text-sous-text-muted">Oct 24, 2024</td>
                                    <td className="py-4 pr-2 text-right font-semibold text-white">$42.00</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
