import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generatePlugins } from '../../services/mockData';
import type { PluginIntegration } from '../../services/mockData';
import { Search, Filter, Plug, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function PluginsView() {
    const [plugins, setPlugins] = useState<PluginIntegration[]>(generatePlugins());
    const [activeTab, setActiveTab] = useState<'All' | 'POS' | 'Supply Chain' | 'Delivery' | 'Other'>('All');
    const [searchTerm, setSearchTerm] = useState('');

    const togglePlugin = (id: string) => {
        setPlugins(prev => prev.map(p =>
            p.id === id ? { ...p, enabled: !p.enabled } : p
        ));
    };

    const categories = ['All', 'POS', 'Supply Chain', 'Delivery', 'Staffing', 'Accounting'];

    // Derived state for filtering
    const filteredPlugins = plugins.filter(plugin => {
        const matchesTab = activeTab === 'All' || plugin.category === activeTab || (activeTab === 'Other' && !['POS', 'Supply Chain', 'Delivery'].includes(plugin.category));
        const matchesSearch = plugin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            plugin.description.toLowerCase().includes(searchTerm.toLowerCase());

        // Handle "Other" tab logic if needed, but for now simple matching
        if (activeTab === 'All') return matchesSearch;
        return plugin.category === activeTab && matchesSearch;
    });

    return (
        <div className="space-y-6 h-full flex flex-col">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Plug className="text-sous-accent-purple" />
                        Integrations
                    </h2>
                    <p className="text-sous-text-secondary">Manage your API connections and data sources</p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-sous-text-muted" size={16} />
                        <input
                            type="text"
                            placeholder="Search plugins..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-sous-card border border-sous-border rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-sous-accent-purple transition-colors"
                        />
                    </div>
                    <button className="p-2 bg-sous-card border border-sous-border rounded-lg text-sous-text-muted hover:text-white transition-colors">
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveTab(cat as any)}
                        className={`
                            px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all
                            ${activeTab === cat
                                ? 'bg-sous-accent-purple/20 text-sous-accent-purple border border-sous-accent-purple/50'
                                : 'bg-sous-card border border-transparent text-sous-text-muted hover:bg-white/5 hover:text-white'}
                        `}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 flex-1 overflow-y-auto pb-6 px-1">
                <AnimatePresence mode='popLayout'>
                    {filteredPlugins.map((plugin) => (
                        <motion.div
                            key={plugin.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            whileHover={{ scale: 1.02 }}
                            className={`
                                relative p-6 rounded-2xl border backdrop-blur-md transition-all duration-300 group
                                ${plugin.enabled
                                    ? 'bg-[#18181b]/90 border-sous-border hover:border-sous-accent-purple/50 shadow-lg hover:shadow-sous-accent-purple/10'
                                    : 'bg-[#18181b]/50 border-white/5 opacity-60 hover:opacity-100 hover:bg-[#18181b]/70'}
                            `}
                        >
                            {/* Glass Reflection Gradient */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                            <div className="flex justify-between items-start mb-5 relative z-10">
                                <div className="w-14 h-14 bg-white/5 rounded-xl p-2.5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors backdrop-blur-sm">
                                    <img
                                        src={plugin.logo}
                                        alt={`${plugin.name} logo`}
                                        className="w-full h-full object-contain filter transition-all duration-300"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40?text=' + plugin.name[0];
                                        }}
                                    />
                                </div>
                                <Switch
                                    checked={plugin.enabled}
                                    onChange={() => togglePlugin(plugin.id)}
                                />
                            </div>

                            <div className="mb-3 relative z-10">
                                <div className="flex items-center justify-between mb-1.5">
                                    <h3 className="font-bold text-lg text-white tracking-wide group-hover:text-sous-accent-purple transition-colors">{plugin.name}</h3>
                                    <StatusBadge status={plugin.status} />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-white/5 text-sous-text-muted border border-white/5">
                                    {plugin.category}
                                </span>
                            </div>

                            <p className="text-sm text-sous-text-secondary line-clamp-2 h-10 mb-4 relative z-10 leading-relaxed">
                                {plugin.description}
                            </p>

                            {/* Hover Action */}
                            <div className="pt-4 border-t border-white/5 flex items-center justify-between relative z-10">
                                <span className="text-xs text-sous-text-muted font-medium">
                                    {plugin.status === 'connected' ? 'Synced: 2m ago' : 'Not configured'}
                                </span>
                                <button className="text-xs font-semibold text-white group-hover:text-sous-accent-purple transition-colors flex items-center gap-1">
                                    Configure
                                    <span className="text-lg leading-none">›</span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}

const StatusBadge = ({ status }: { status: PluginIntegration['status'] }) => {
    const config = {
        connected: { icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
        disconnected: { icon: XCircle, color: 'text-sous-text-muted', bg: 'bg-white/5' },
        pending: { icon: AlertCircle, color: 'text-amber-400', bg: 'bg-amber-400/10' }
    };

    const { icon: Icon, color, bg } = config[status];

    return (
        <div className={`p-1 rounded-full ${bg}`} title={status}>
            <Icon size={14} className={color} />
        </div>
    );
};

const Switch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button
        onClick={onChange}
        className={`
            w-10 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out relative
            ${checked ? 'bg-sous-accent-purple' : 'bg-white/10'}
        `}
    >
        <div
            className={`
                w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out
                ${checked ? 'translate-x-4' : 'translate-x-0'}
            `}
        />
    </button>
);
