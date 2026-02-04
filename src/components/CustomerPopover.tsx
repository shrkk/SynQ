import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { CustomerDetails } from '../services/mockData';
import { motion, AnimatePresence } from 'framer-motion';

interface CustomerPopoverProps {
    children: React.ReactNode;
    customerName: string;
    details: CustomerDetails;
}

export const CustomerPopover = ({ children, customerName, details }: CustomerPopoverProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [style, setStyle] = useState<React.CSSProperties>({ opacity: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && triggerRef.current) {
            const triggerRect = triggerRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Midpoint Heuristic:
            // If the element is in the bottom half of the screen, show the popover ABOVE.
            // If in the top half, show it BELOW.
            const isBottomHalf = triggerRect.top > (viewportHeight / 2);

            let top;
            let left = triggerRect.left + window.scrollX;
            let transform = 'none';
            const GAP = 14; // Increased gap slightly for aesthetics

            if (isBottomHalf) {
                // Show ABOVE: Position at trigger top minus gap, translate -100%
                top = triggerRect.top + window.scrollY - GAP;
                transform = 'translateY(-100%)';
            } else {
                // Show BELOW: Position at trigger bottom plus gap
                top = triggerRect.bottom + window.scrollY + GAP;
                transform = 'none';
            }

            setStyle({
                opacity: 1,
                position: 'absolute',
                left,
                top,
                transform,
                zIndex: 9999 // Ensure it sits on top of everything
            });
        }
    }, [isOpen]);

    return (
        <div
            ref={triggerRef}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => { setIsOpen(false); setStyle({ opacity: 0 }); }}
            className="inline-block relative cursor-help"
        >
            {children}
            {createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            style={style}
                            className="bg-[#1A1A1E] border border-sous-border rounded-xl shadow-2xl p-4 w-72 pointer-events-none"
                        >
                            <div className="flex items-start gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sous-accent-cyan to-blue-600 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-sous-accent-cyan/20">
                                    {customerName.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-base">{customerName}</h4>
                                    <div className="flex flex-wrap gap-2 text-xs text-sous-text-muted mt-1">
                                        <span className={`px-1.5 py-0.5 rounded border ${details.loyalty_tier === 'Platinum' ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' :
                                                details.loyalty_tier === 'Gold' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500' :
                                                    'bg-white/5 border-white/5'
                                            }`}>
                                            {details.loyalty_tier}
                                        </span>
                                        <span className="px-1.5 py-0.5 bg-white/5 rounded border border-white/5">
                                            {details.visit_count} visits
                                        </span>
                                        <span className="px-1.5 py-0.5 bg-white/5 rounded border border-white/5">
                                            LTV: ${details.total_spend.toFixed(0)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="text-xs font-semibold text-sous-text-muted uppercase tracking-wider">Recent Orders</div>
                                {details.recent_transactions.map((tx) => (
                                    <div key={tx.id} className="flex justify-between items-center text-xs border-b border-white/5 last:border-0 pb-2 last:pb-0">
                                        <div>
                                            <div className="text-white font-medium">{tx.items[0]}</div>
                                            <div className="text-sous-text-muted">{tx.date}</div>
                                        </div>
                                        <div className="font-semibold text-sous-accent-cyan">${tx.amount.toFixed(2)}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
};
