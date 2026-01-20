import { Sparkles, BarChart3 } from 'lucide-react';


export const Demo = () => {
    return (
        <section id="product" className="py-24 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-synq-accent-cyan/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Meet your new BI Copilot.</h2>
                    <p className="text-synq-text-secondary text-lg max-w-2xl mx-auto">
                        Synq speaks your language, connects to your tools, and gives you answers instantly.
                    </p>
                </div>

                {/* Demo Interface Mockup */}
                <div className="relative max-w-5xl mx-auto">
                    <div className="glass-panel rounded-2xl p-1 border border-synq-border shadow-2xl overflow-hidden bg-[#0F0F12]">
                        {/* Window Controls */}
                        <div className="h-10 border-b border-synq-border bg-white/5 flex items-center px-4 gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        </div>

                        {/* Main Content Area */}
                        <div className="flex flex-col md:flex-row h-[600px]">

                            {/* Sidebar / Sources */}
                            <div className="w-64 border-r border-synq-border bg-white/5 p-4 hidden md:flex flex-col gap-4">
                                <div className="text-xs font-semibold text-synq-text-muted uppercase tracking-wider mb-2">Connected Apps</div>

                                <div className="flex items-center gap-3 text-synq-text-secondary text-sm px-2 py-2 rounded hover:bg-white/5 cursor-default group">
                                    <img src="/logos/clover.png" alt="Clover" className="w-6 h-6 shrink-0 object-contain rounded-md" />
                                    <span className="font-medium">Clover</span>
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-green-500/50 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                </div>

                                <div className="flex items-center gap-3 text-synq-text-secondary text-sm px-2 py-2 rounded hover:bg-white/5 cursor-default group">
                                    <img src="/logos/stripe.png" alt="Stripe" className="w-6 h-6 shrink-0 object-contain rounded-md" />
                                    <span className="font-medium">Stripe</span>
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-green-500/50 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                </div>

                                <div className="flex items-center gap-3 text-synq-text-secondary text-sm px-2 py-2 rounded hover:bg-white/5 cursor-default group">
                                    <img src="/logos/square.jpg" alt="Square" className="w-6 h-6 shrink-0 object-contain rounded-md" />
                                    <span className="font-medium">Square</span>
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-green-500/50 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                </div>

                                <div className="flex items-center gap-3 text-synq-text-secondary text-sm px-2 py-2 rounded hover:bg-white/5 cursor-default group">
                                    <img src="/logos/paypal.png" alt="PayPal" className="w-6 h-6 shrink-0 object-contain rounded-md" />
                                    <span className="font-medium">PayPal</span>
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-green-500/50 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                </div>
                            </div>

                            {/* Chat / Visualization Area */}
                            <div className="flex-1 p-6 relative flex flex-col">

                                {/* User Message */}
                                <div className="mb-8 flex justify-end">
                                    <div className="bg-synq-accent-violet/20 text-synq-accent-violet border border-synq-accent-violet/20 px-4 py-2 rounded-2xl rounded-tr-sm max-w-md text-sm md:text-base">
                                        How is our cash flow looking for the next 7 days?
                                    </div>
                                </div>

                                {/* Synq Response */}
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-synq-accent-cyan to-synq-accent-violet flex items-center justify-center flex-shrink-0">
                                        <Sparkles className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <p className="text-synq-text-primary text-sm md:text-base leading-relaxed">
                                            Based on recent sales from <strong>Square</strong> and <strong>Clover</strong>, plus upcoming bills, you're projected to have <strong>positive cash flow</strong>. However, a large inventory payment is due on Friday.
                                        </p>

                                        {/* Generated Chart Placeholder */}
                                        <div className="glass-card p-4 rounded-xl border border-synq-border w-full max-w-lg">
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-xs font-medium text-synq-text-secondary">Projected Balance (Next 7 Days)</span>
                                                <BarChart3 className="w-4 h-4 text-synq-text-muted" />
                                            </div>
                                            <div className="h-40 flex items-end justify-between gap-2 px-2">
                                                {[60, 65, 70, 75, 40, 50, 55].map((h, i) => (
                                                    <div key={i} className={`w-full rounded-t-sm relative group ${i === 4 ? 'bg-gradient-to-t from-red-500/20 to-red-500/60' : 'bg-gradient-to-t from-synq-accent-cyan/20 to-synq-accent-cyan/60'}`} style={{ height: `${h}%` }}>
                                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-synq-border">
                                                            Balance: ${h * 100}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="flex justify-between mt-2 text-[10px] text-synq-text-muted">
                                                <span>Mon</span>
                                                <span>Tue</span>
                                                <span>Wed</span>
                                                <span>Thu</span>
                                                <span>Fri</span>
                                                <span>Sat</span>
                                                <span>Sun</span>
                                            </div>
                                        </div>

                                        <div className="text-sm text-synq-text-secondary">
                                            <span className="text-synq-accent-cyan hover:underline cursor-pointer">View upcoming bills</span> or <span className="text-synq-accent-cyan hover:underline cursor-pointer">Adjust inventory budget</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Input Area */}
                                <div className="mt-auto pt-8">
                                    <div className="glass-panel p-2 rounded-xl flex items-center gap-3 relative">
                                        <input
                                            type="text"
                                            placeholder="Ask a follow-up question..."
                                            className="bg-transparent border-none outline-none text-synq-text-primary px-3 py-2 w-full text-sm placeholder-synq-text-muted"
                                            disabled
                                        />
                                        <button className="p-2 bg-synq-text-primary text-black rounded-lg hover:opacity-90 transition-opacity">
                                            <ArrowUpIcon />
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ArrowUpIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="19" x2="12" y2="5"></line>
        <polyline points="5 12 12 5 19 12"></polyline>
    </svg>
)
