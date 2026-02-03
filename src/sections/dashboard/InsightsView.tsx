import { DailyBriefing } from './insights/DailyBriefing';
import { SmartParChart } from './insights/SmartParChart';
import { MenuMatrix } from './insights/MenuMatrix';
import { BrainCircuit } from 'lucide-react';

export const InsightsView = () => {
    return (
        <div className="space-y-8 pb-10">
            <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                    <BrainCircuit className="text-sous-accent-cyan" size={32} />
                    AI Analytics & Insights
                </h1>
                <p className="text-sous-text-secondary mt-1">Real-time intelligence for your inventory and menu performance.</p>
            </div>

            {/* Top Section: Daily Briefing directly from the 'Sous' Agent */}
            <DailyBriefing />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column: Smart Pars */}
                <div className="space-y-4">
                    <SmartParChart />
                </div>

                {/* Right Column: Menu Matrix & More */}
                <div className="space-y-4">
                    <MenuMatrix />
                </div>
            </div>
        </div>
    );
};
