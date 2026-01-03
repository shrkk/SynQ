

export const Footer = () => {
    return (
        <footer className="border-t border-synq-border bg-synq-bg/50 backdrop-blur-sm mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <span className="text-xl font-bold text-white tracking-tight">Synq</span>
                        <p className="text-synq-text-muted text-sm mt-2">
                            Business intelligence for the rest of us.
                        </p>
                    </div>

                    <div className="flex space-x-6 text-synq-text-secondary text-sm">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Twitter</a>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-synq-border/50 text-center text-synq-text-muted text-xs">
                    &copy; {new Date().getFullYear()} Synq. All rights reserved.
                </div>
            </div>
        </footer>
    );
};
