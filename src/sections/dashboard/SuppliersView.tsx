import { generateSupplierOrders, generateSuppliers, generatePricingHistory, type Supplier } from '../../services/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, Package, Clock, TrendingUp, ShieldCheck, X } from 'lucide-react';
import { useState } from 'react';

export const SuppliersView = () => {
    const orders = generateSupplierOrders(10);
    const pricing = generatePricingHistory(3);
    const [suppliers] = useState(generateSuppliers(4));
    const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

    return (
        <div className="space-y-8 relative">
            <div>
                <h1 className="text-2xl font-bold text-white">Supply Chain & Pricing</h1>
                <p className="text-sous-text-secondary">Track orders, supplier reliability, and ingredient costs</p>
            </div>

            {/* Suppliers Quick View Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {suppliers.map((s, i) => (
                    <motion.div
                        key={s.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => setSelectedSupplier(s)}
                        className="bg-sous-card border border-sous-border p-4 rounded-xl hover:border-sous-accent-cyan/30 cursor-pointer group transition-all"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="p-2 bg-white/5 rounded-lg text-sous-accent-cyan group-hover:bg-sous-accent-cyan group-hover:text-black transition-colors">
                                <Truck size={20} />
                            </div>
                            <div className={`text-xs font-bold px-2 py-1 rounded flex items-center gap-1 ${s.reliabilityScore >= 90 ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                                <ShieldCheck size={12} />
                                {s.reliabilityScore}%
                            </div>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-sous-accent-cyan transition-colors">{s.name}</h3>
                        <p className="text-xs text-sous-text-muted">Avg. Delivery: {s.avgDeliveryTime}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Orders Column */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Package size={20} className="text-sous-accent-cyan" />
                        Purchase Orders
                    </h2>

                    <div className="bg-sous-card border border-sous-border rounded-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-[#0F0F12] border-b border-sous-border">
                                    <tr>
                                        <th className="px-6 py-3 text-xs font-semibold text-sous-text-muted uppercase">PO #</th>
                                        <th className="px-6 py-3 text-xs font-semibold text-sous-text-muted uppercase">Supplier</th>
                                        <th className="px-6 py-3 text-xs font-semibold text-sous-text-muted uppercase">Items</th>
                                        <th className="px-6 py-3 text-xs font-semibold text-sous-text-muted uppercase">Total</th>
                                        <th className="px-6 py-3 text-xs font-semibold text-sous-text-muted uppercase">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-sous-border">
                                    {orders.map((po, i) => (
                                        <motion.tr
                                            key={po.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="bg-white/5 hover:bg-white/10 transition-colors"
                                        >
                                            <td className="px-6 py-4 text-sm font-mono text-sous-text-secondary">{po.id}</td>
                                            <td className="px-6 py-4 text-sm font-medium text-white">{po.supplier_name}</td>
                                            <td className="px-6 py-4 text-sm text-sous-text-muted">{po.items}</td>
                                            <td className="px-6 py-4 text-sm text-white">${po.total.toFixed(2)}</td>
                                            <td className="px-6 py-4">
                                                <span className={`flex items-center gap-1.5 text-xs font-medium 
                                                    ${po.status === 'delivered' ? 'text-green-400' :
                                                        po.status === 'pending' ? 'text-yellow-400' : 'text-red-400'}
                                                `}>
                                                    {po.status === 'delivered' ? <Package size={14} /> :
                                                        po.status === 'pending' ? <Clock size={14} /> : null}
                                                    {po.status.charAt(0).toUpperCase() + po.status.slice(1)}
                                                </span>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Pricing Trends Column */}
                <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                        <TrendingUp size={20} className="text-sous-accent-violet" />
                        Price Watch
                    </h2>

                    <div className="space-y-4">
                        {pricing.map((item, i) => {
                            const currentPrice = item.history[item.history.length - 1].price;
                            const startPrice = item.history[0].price;
                            const change = ((currentPrice - startPrice) / startPrice) * 100;
                            const isIncrease = change > 0;

                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-sous-card border border-sous-border p-4 rounded-xl"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <div className="text-sm font-medium text-white">{item.name}</div>
                                            <div className="text-xs text-sous-text-muted">{item.supplier}</div>
                                        </div>
                                        <div className={`text-xs font-bold px-2 py-1 rounded ${isIncrease ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                                            {isIncrease ? '+' : ''}{change.toFixed(1)}%
                                        </div>
                                    </div>

                                    {/* Simple Sparkline Visualization */}
                                    <div className="h-16 flex items-end gap-1 mt-4">
                                        {item.history.map((pt, j) => (
                                            <div
                                                key={j}
                                                className="flex-1 bg-sous-accent-cyan/20 hover:bg-sous-accent-cyan transition-colors rounded-sm relative group"
                                                style={{ height: `${(pt.price / 20) * 100}%` }}
                                            >
                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-black text-white text-[10px] px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10">
                                                    ${pt.price.toFixed(2)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between mt-2 text-[10px] text-sous-text-muted">
                                        <span>6 Months Ago</span>
                                        <span>Today</span>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Supplier Details Modal */}
            <AnimatePresence>
                {selectedSupplier && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedSupplier(null)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-[#0F0F12] border border-sous-border w-full max-w-md rounded-2xl shadow-2xl z-10 p-6 relative overflow-hidden"
                        >
                            <button
                                onClick={() => setSelectedSupplier(null)}
                                className="absolute top-4 right-4 text-sous-text-secondary hover:text-white"
                            >
                                <X size={24} />
                            </button>

                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-sous-accent-cyan/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-sous-accent-cyan/20 text-sous-accent-cyan">
                                    <Truck size={32} />
                                </div>
                                <h2 className="text-2xl font-bold text-white">{selectedSupplier.name}</h2>
                                <p className="text-sous-text-secondary">{selectedSupplier.contact}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-white/5 p-4 rounded-xl border border-sous-border text-center">
                                    <div className="flex justify-center mb-2 text-sous-accent-cyan"><ShieldCheck /></div>
                                    <div className="text-2xl font-bold text-white mb-1">{selectedSupplier.reliabilityScore}%</div>
                                    <div className="text-xs text-sous-text-muted">Reliability Score</div>
                                </div>
                                <div className="bg-white/5 p-4 rounded-xl border border-sous-border text-center">
                                    <div className="flex justify-center mb-2 text-sous-accent-violet"><Clock /></div>
                                    <div className="text-xl font-bold text-white mb-1">{selectedSupplier.onTimeDeliveryRate}%</div>
                                    <div className="text-xs text-sous-text-muted">On-Time Rate</div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-white uppercase tracking-wider">Performance Metrics</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-sous-text-secondary">Expected vs Actual</span>
                                        <span className="text-white">+0.2 days var</span>
                                    </div>
                                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500 w-[95%] rounded-full" />
                                    </div>
                                </div>

                                <button className="w-full py-3 bg-sous-accent-cyan text-black font-semibold rounded-xl hover:opacity-90 transition-opacity mt-2">
                                    Contact Supplier
                                </button>
                            </div>

                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

