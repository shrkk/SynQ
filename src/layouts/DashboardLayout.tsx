import { useState } from 'react';
import { UserButton, useUser } from '@clerk/clerk-react';
import { LayoutDashboard, Package, TrendingUp, Settings, Menu, X, Truck, BrainCircuit, Plug } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const { user } = useUser();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    // Grouped Navigation for Nexus Style
    const generalNav = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Sales', href: '/dashboard/sales', icon: TrendingUp },
        { name: 'Inventory', href: '/dashboard/inventory', icon: Package },
    ];

    const toolsNav = [
        { name: 'Suppliers', href: '/dashboard/suppliers', icon: Truck },
        { name: 'Insights', href: '/dashboard/insights', icon: BrainCircuit },
        { name: 'Plugins', href: '/dashboard/plugins', icon: Plug },
    ];

    const NavGroup = ({ title, items }: { title: string, items: typeof generalNav }) => (
        <div className="mb-6">
            <h3 className="px-3 text-xs font-semibold text-sous-text-muted mb-2 uppercase tracking-wider">{title}</h3>
            <div className="space-y-1">
                {items.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            onClick={() => setIsSidebarOpen(false)}
                            className={`
                                flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all group
                                ${isActive
                                    ? 'bg-sous-accent-cyan/10 text-sous-accent-cyan'
                                    : 'text-sous-text-secondary hover:text-white hover:bg-white/5'
                                }
                            `}
                        >
                            <item.icon
                                className={`mr-3 h-4 w-4 ${isActive ? 'text-sous-accent-cyan' : 'text-sous-text-muted group-hover:text-white'}`}
                            />
                            {item.name}
                        </Link>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-sous-bg flex overflow-hidden font-sans">
            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar (Nexus Style) */}
            <motion.aside
                className={`
                    fixed md:static inset-y-0 left-0 z-50 w-64 bg-[#0F0F12] border-r border-sous-border flex flex-col transform transition-transform duration-300 ease-in-out md:translate-x-0
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                {/* Logo Area */}
                <div className="h-16 flex items-center px-6 mb-4">
                    <div className="flex items-center gap-2 mr-3">
                        <img src="/sous-logo.png" alt="sous logo" className="h-8 w-auto rounded-md" />
                        <span className="text-xl font-bold text-white tracking-tight">sous</span>
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="ml-auto md:hidden text-sous-text-secondary"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation Groups */}
                <nav className="flex-1 overflow-y-auto px-4">
                    <NavGroup title="General" items={generalNav} />
                    <NavGroup title="Tools" items={toolsNav} />
                </nav>

                {/* Upgrade Plan CTA */}
                <div className="p-4 mx-4 mb-4 bg-gradient-to-br from-sous-accent-cyan/10 to-sous-accent-violet/10 rounded-xl border border-white/5">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 bg-sous-accent-cyan/20 rounded-md">
                            <TrendingUp size={14} className="text-sous-accent-cyan" />
                        </div>
                        <span className="text-sm font-semibold text-white">Pro Plan</span>
                    </div>
                    <p className="text-xs text-sous-text-muted mb-3">Get advanced AI insights.</p>
                    <button className="w-full py-1.5 text-xs font-semibold text-black bg-white rounded-lg hover:bg-gray-200 transition-colors">
                        Upgrade
                    </button>
                </div>

                {/* Bottom Settings Link */}
                <div className="p-4 border-t border-sous-border">
                    <Link
                        to="/dashboard/settings"
                        className="flex items-center px-3 py-2 text-sm font-medium text-sous-text-secondary hover:text-white transition-colors"
                    >
                        <Settings className="mr-3 h-4 w-4 text-sous-text-muted" />
                        Settings
                    </Link>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-sous-bg">
                {/* Header (Nexus Style) */}
                <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-sous-border bg-sous-bg sticky top-0 z-30">
                    <div className="flex items-center gap-4 flex-1">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="md:hidden p-2 text-sous-text-secondary hover:text-white"
                        >
                            <Menu size={24} />
                        </button>

                        {/* Search Bar - Nexus Style */}
                        <div className="hidden md:flex items-center w-full max-w-md relative">
                            <div className="absolute left-3 text-sous-text-muted">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full bg-sous-card border border-sous-border text-sm text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-sous-accent-cyan/50 transition-all font-medium placeholder:text-gray-600"
                            />
                            <div className="absolute right-3">
                                <span className="text-xs text-sous-text-secondary border border-sous-border px-1.5 py-0.5 rounded">⌘K</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Header Actions */}
                        <div className="hidden md:flex items-center gap-2">
                            <button className="p-2 text-sous-text-secondary hover:text-white hover:bg-white/5 rounded-full transition-colors relative">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
                                <span className="absolute top-2 right-2 w-2 h-2 bg-sous-accent-violet rounded-full border border-[#0F0F12]"></span>
                            </button>
                        </div>

                        <div className="h-6 w-px bg-sous-border mx-2 hidden md:block"></div>

                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium text-white">{user?.fullName || 'Chef'}</p>
                                <p className="text-xs text-sous-text-muted">Admin</p>
                            </div>
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    </div>
                </header>

                {/* Content Scroll Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-[1600px] mx-auto">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
};
