import { Sparkles } from 'lucide-react';
import React from 'react';
import { api } from '../services/api';


export const Demo = () => {
    const [messages, setMessages] = React.useState<{ role: 'user' | 'assistant', content: string }[]>([
        { role: 'user', content: "How is our cash flow looking for the next 7 days?" },
        { role: 'assistant', content: "Based on recent sales from Square and Clover, plus upcoming bills, you're projected to have positive cash flow. However, a large inventory payment is due on Friday." }
    ]);
    const [inputValue, setInputValue] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSendMessage = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMsg = inputValue;
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setInputValue('');
        setIsLoading(true);

        try {
            const res = await api.chat(userMsg);
            setMessages(prev => [...prev, { role: 'assistant', content: res.response }]);
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting to the server. Please ensure the backend is running." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="product" className="py-24 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sous-accent-cyan/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Meet your new BI Copilot.</h2>
                    <p className="text-sous-text-secondary text-lg max-w-2xl mx-auto">
                        sous speaks your language, connects to your tools, and gives you answers instantly.
                    </p>
                </div>

                {/* Demo Interface Mockup */}
                <div className="relative max-w-5xl mx-auto">
                    <div className="glass-panel rounded-2xl p-1 border border-sous-border shadow-2xl overflow-hidden bg-[#0F0F12]">
                        {/* Window Controls */}
                        <div className="h-10 border-b border-sous-border bg-white/5 flex items-center px-4 gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        </div>

                        {/* Main Content Area */}
                        <div className="flex flex-col md:flex-row h-[600px]">

                            {/* Sidebar / Sources */}
                            <div className="w-64 border-r border-sous-border bg-white/5 p-4 hidden md:flex flex-col gap-4">
                                <div className="text-xs font-semibold text-sous-text-muted uppercase tracking-wider mb-2">Connected Apps</div>

                                <div className="flex items-center gap-3 text-sous-text-secondary text-sm px-2 py-2 rounded hover:bg-white/5 cursor-default group">
                                    <img src="/logos/clover.png" alt="Clover" className="w-6 h-6 shrink-0 object-contain rounded-md" />
                                    <span className="font-medium">Clover</span>
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-green-500/50 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                </div>

                                <div className="flex items-center gap-3 text-sous-text-secondary text-sm px-2 py-2 rounded hover:bg-white/5 cursor-default group">
                                    <img src="/logos/stripe.png" alt="Stripe" className="w-6 h-6 shrink-0 object-contain rounded-md" />
                                    <span className="font-medium">Stripe</span>
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-green-500/50 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                </div>

                                <div className="flex items-center gap-3 text-sous-text-secondary text-sm px-2 py-2 rounded hover:bg-white/5 cursor-default group">
                                    <img src="/logos/square.jpg" alt="Square" className="w-6 h-6 shrink-0 object-contain rounded-md" />
                                    <span className="font-medium">Square</span>
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-green-500/50 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                </div>

                                <div className="flex items-center gap-3 text-sous-text-secondary text-sm px-2 py-2 rounded hover:bg-white/5 cursor-default group">
                                    <img src="/logos/paypal.png" alt="PayPal" className="w-6 h-6 shrink-0 object-contain rounded-md" />
                                    <span className="font-medium">PayPal</span>
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-green-500/50 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                </div>
                            </div>

                            {/* Chat / Visualization Area */}
                            <div className="flex-1 p-6 relative flex flex-col overflow-y-auto">
                                <div className="flex-1 space-y-6">
                                    {messages.map((msg, i) => (
                                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            {msg.role === 'user' ? (
                                                <div className="bg-sous-accent-violet/20 text-sous-accent-violet border border-sous-accent-violet/20 px-4 py-2 rounded-2xl rounded-tr-sm max-w-md text-sm md:text-base">
                                                    {msg.content}
                                                </div>
                                            ) : (
                                                <div className="flex gap-4 max-w-lg">
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sous-accent-cyan to-sous-accent-violet flex items-center justify-center flex-shrink-0">
                                                        <Sparkles className="w-4 h-4 text-white" />
                                                    </div>
                                                    <div className="text-sous-text-primary text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                                                        {msg.content}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div className="flex gap-4">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sous-accent-cyan to-sous-accent-violet flex items-center justify-center flex-shrink-0 animate-pulse">
                                                <Sparkles className="w-4 h-4 text-white" />
                                            </div>
                                            <div className="text-sous-text-primary text-sm italic opacity-50">Thinking...</div>
                                        </div>
                                    )}
                                </div>

                                {/* Input Area */}
                                <div className="mt-8 sticky bottom-0 bg-[#0F0F12] pt-4">
                                    <div className="glass-panel p-2 rounded-xl flex items-center gap-3 relative">
                                        <input
                                            type="text"
                                            placeholder="Ask a follow-up question..."
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                            className="bg-transparent border-none outline-none text-sous-text-primary px-3 py-2 w-full text-sm placeholder-sous-text-muted"
                                            disabled={isLoading}
                                        />
                                        <button
                                            onClick={handleSendMessage}
                                            disabled={isLoading}
                                            className="p-2 bg-sous-text-primary text-black rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                                        >
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
