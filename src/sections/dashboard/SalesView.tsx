import { generateTransactions } from '../../services/mockData';
import { motion } from 'framer-motion';
import { Search, Filter, Download } from 'lucide-react';

export const SalesView = () => {
    const transactions = generateTransactions(20);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Sales & Revenue</h1>
                    <p className="text-sous-text-secondary">Simulated Stripe Transaction Data</p>
                </div>
                <button className="flex items-center gap-2 px-3 py-2 bg-sous-accent-cyan text-black text-sm font-bold rounded-lg hover:opacity-90">
                    <Download size={16} />
                    Export CSV
                </button>
            </div>

            {/* Filter Bar */}
            <div className="flex gap-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-sous-text-muted" size={18} />
                    <input
                        type="text"
                        placeholder="Search transactions..."
                        className="w-full bg-white/5 border border-sous-border rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-sous-accent-cyan transition-colors"
                    />
                </div>
                <button className="px-3 py-2 bg-white/5 border border-sous-border rounded-lg text-sous-text-secondary hover:text-white flex items-center gap-2">
                    <Filter size={18} />
                    Filter
                </button>
            </div>

            {/* Transactions Table */}
            <div className="bg-sous-card border border-sous-border rounded-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5 border-b border-sous-border">
                        <tr>
                            <th className="px-6 py-3 text-xs font-semibold text-sous-text-muted uppercase tracking-wider">Transaction ID</th>
                            <th className="px-6 py-3 text-xs font-semibold text-sous-text-muted uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-3 text-xs font-semibold text-sous-text-muted uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-xs font-semibold text-sous-text-muted uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-3 text-xs font-semibold text-sous-text-muted uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-sous-border">
                        {transactions.map((tx, i) => (
                            <motion.tr
                                key={tx.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="hover:bg-white/5 transition-colors"
                            >
                                <td className="px-6 py-4 text-sm font-mono text-sous-text-secondary">{tx.id.slice(0, 8)}...</td>
                                <td className="px-6 py-4 text-sm text-white">
                                    <div className="font-medium">{tx.customer_name}</div>
                                    <div className="text-xs text-sous-text-muted">{tx.items[0]}</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-sous-text-secondary">{tx.date.toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-sm font-medium text-white">${tx.amount.toFixed(2)}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium 
                                        ${tx.status === 'succeeded' ? 'bg-green-500/20 text-green-400' :
                                            tx.status === 'processing' ? 'bg-blue-500/20 text-blue-400' : 'bg-red-500/20 text-red-400'
                                        }`}>
                                        {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                                    </span>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
