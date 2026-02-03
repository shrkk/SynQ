
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Overview } from '../sections/dashboard/Overview';
import { SalesView } from '../sections/dashboard/SalesView';
import { InventoryView } from '../sections/dashboard/InventoryView';
import { SuppliersView } from '../sections/dashboard/SuppliersView';
import { InsightsView } from '../sections/dashboard/InsightsView';
import PluginsView from '../sections/dashboard/PluginsView';

export const Dashboard = () => {
    return (
        <DashboardLayout>
            <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/sales" element={<SalesView />} />
                <Route path="/inventory" element={<InventoryView />} />
                <Route path="/suppliers" element={<SuppliersView />} />
                <Route path="/insights" element={<InsightsView />} />
                <Route path="/plugins" element={<PluginsView />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
        </DashboardLayout>
    );
};
