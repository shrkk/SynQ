import { generateInventory } from '../../services/mockData';
import type { InventoryItem } from '../../services/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X, History, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export const InventoryView = () => {
    const [inventory] = useState(generateInventory(12));
    const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

    return (
        <div className="space-y-6 relative">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Inventory Management</h1>
                    <p className="text-sous-text-secondary">Real-time stock levels & par tracking</p>
                </div>
                <div className="flex gap-2">
                    <div className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm font-medium flex items-center gap-2">
                        <AlertCircle size={16} />
                        {inventory.filter(i => i.status === 'critical').length} Critical
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {inventory.map((item, i) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => setSelectedItem(item)}
                        className="bg-sous-card border border-sous-border p-5 rounded-xl hover:border-sous-accent-cyan/30 transition-all cursor-pointer group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-semibold text-white group-hover:text-sous-accent-cyan transition-colors">{item.name}</h3>
                                <span className="text-xs text-sous-text-secondary px-2 py-0.5 bg-white/5 rounded-full">{item.category}</span>
                            </div>
                            <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider
                                ${item.status === 'ok' ? 'bg-green-500/10 text-green-500' :
                                    item.status === 'low' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'
                                }
                            `}>
                                {item.status}
                            </span>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-sous-text-muted">Stock Level</span>
                                    <span className="text-white font-medium">{item.in_stock} {item.unit}</span>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-500 ${itemNameColor(item.status)}`}
                                        style={{ width: `${Math.min((item.in_stock / item.par_level) * 100, 100)}%` }}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between items-center text-xs text-sous-text-muted pt-2 border-t border-sous-border/30">
                                <span>Par Level: {item.par_level} {item.unit}</span>
                                <span className="text-sous-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity">View History →</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Inventory Details Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedItem(null)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-[#0F0F12] border border-sous-border w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl z-10 p-6 relative"
                        >
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="absolute top-4 right-4 text-sous-text-secondary hover:text-white"
                            >
                                <X size={24} />
                            </button>

                            <div className="flex items-start gap-4 mb-8">
                                <div className={`p-4 rounded-xl ${selectedItem.status === 'ok' ? 'bg-green-500/10 text-green-500' :
                                    selectedItem.status === 'low' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'
                                    }`}>
                                    <PackageIcon size={32} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">{selectedItem.name}</h2>
                                    <div className="flex items-center gap-2 text-sous-text-secondary">
                                        <span>{selectedItem.category}</span>
                                        <span>•</span>
                                        <span>ID: {selectedItem.id.slice(0, 8)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-white/5 p-4 rounded-xl border border-sous-border">
                                    <div className="text-sm text-sous-text-muted mb-1">Current Stock</div>
                                    <div className="text-2xl font-bold text-white">{selectedItem.in_stock} <span className="text-base text-sous-text-secondary font-medium">{selectedItem.unit}</span></div>
                                </div>
                                <div className="bg-white/5 p-4 rounded-xl border border-sous-border">
                                    <div className="text-sm text-sous-text-muted mb-1">Par Level</div>
                                    <div className="text-2xl font-bold text-white">{selectedItem.par_level} <span className="text-base text-sous-text-secondary font-medium">{selectedItem.unit}</span></div>
                                </div>
                            </div>

                            {/* History Chart Section */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <TrendingUp size={20} className="text-sous-accent-cyan" />
                                    Pricing History
                                </h3>
                                <div className="h-48 flex items-end gap-2 p-4 bg-white/5 rounded-xl border border-sous-border">
                                    {selectedItem.history.map((record, i) => {
                                        const maxPrice = Math.max(...selectedItem.history.map(h => h.price));
                                        // Avoid Division by Zero
                                        const heightPercent = maxPrice > 0 ? (record.price / maxPrice) * 100 : 0;
                                        return (
                                            <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
                                                <div
                                                    className="w-full bg-sous-accent-cyan/20 rounded-t-sm group-hover:bg-sous-accent-cyan transition-colors relative"
                                                    style={{ height: `${heightPercent}%` }}
                                                >
                                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black text-white text-xs px-2 py-1 rounded border border-white/20 opacity-0 group-hover:opacity-100 whitespace-nowrap z-20 pointer-events-none">
                                                        ${record.price.toFixed(2)}
                                                    </div>
                                                </div>
                                                <div className="text-[10px] text-sous-text-muted rotate-0 md:rotate-0 truncate w-full text-center">
                                                    {record.date}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Order History Table */}
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <History size={20} className="text-sous-accent-violet" />
                                    Restock History
                                </h3>
                                <div className="overflow-hidden bg-sous-card border border-sous-border rounded-xl">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-white/5 text-sous-text-muted border-b border-sous-border">
                                            <tr>
                                                <th className="px-4 py-3 font-medium">Date</th>
                                                <th className="px-4 py-3 font-medium">Supplier</th>
                                                <th className="px-4 py-3 font-medium">Qty</th>
                                                <th className="px-4 py-3 font-medium">Unit Price</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-sous-border">
                                            {selectedItem.history.map((record, i) => (
                                                <tr key={i} className="hover:bg-white/5 transition-colors">
                                                    <td className="px-4 py-3 text-white">{record.date}</td>
                                                    <td className="px-4 py-3 text-sous-text-secondary">{record.supplier}</td>
                                                    <td className="px-4 py-3 text-white">{record.quantity}</td>
                                                    <td className="px-4 py-3 text-sous-text-secondary">${record.price.toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

const itemNameColor = (status: string) => {
    switch (status) {
        case 'ok': return 'bg-green-500';
        case 'low': return 'bg-yellow-500';
        case 'critical': return 'bg-red-500';
        default: return 'bg-gray-500';
    }
}

// Simple Icon Placeholders to avoid huge imports if unnecessary
const PackageIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16.5 9.4L7.5 4.21" />
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <path d="M3.27 6.96 12 12.01l8.73-5.05" />
        <path d="M12 22.08V12" />
    </svg>
);

