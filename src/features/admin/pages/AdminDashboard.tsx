import { useState, useEffect } from 'react';
import { DashboardStats } from './DashboardStats';
import { HotspotMap } from './HotspotMap';
import { PredictionChart } from './PredictionChart';
import { BayesianAnalysis } from './BayesianAnalysis';
import { SuggestedActions } from './SuggestedActions';
import { ReportsList } from './ReportsList';
import { api } from '@/services/api';
import type {
    HealthReport,
    SuggestedAction,
    DashboardStats as DashboardStatsType,
    HotspotData,
    PredictionData,
    BayesianParameter
} from '@/types/index';

export default function AdminDashboard() {
    // 1. Consolidated State for Dashboard Data
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<DashboardStatsType | null>(null);
    const [hotspots, setHotspots] = useState<HotspotData[]>([]);
    const [predictions, setPredictions] = useState<PredictionData[]>([]);
    const [bayesian, setBayesian] = useState<BayesianParameter | null>(null);

    // 2. Mutable State (Items we can update/interact with)
    const [actions, setActions] = useState<SuggestedAction[]>([]);
    const [reports, setReports] = useState<HealthReport[]>([]);

    // 3. Fetch All Data on Mount
    useEffect(() => {
        const loadData = async () => {
            try {
                // Fetch Dashboard Analytics & Raw Reports in parallel
                const [dashboardData, reportsData] = await Promise.all([
                    api.dashboard.getAllData(),
                    api.reports.getAll()
                ]);

                // Update State
                setStats(dashboardData.stats);
                setHotspots(dashboardData.hotspots);
                setPredictions(dashboardData.predictions);
                setBayesian(dashboardData.bayesian);
                setActions(dashboardData.actions);
                setReports(reportsData);
            } catch (error) {
                console.error("Failed to load admin dashboard:", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // 4. Handle Report Status Updates (e.g., Mark as Resolved)
    const handleUpdateReportStatus = async (reportId: string, status: HealthReport['status']) => {
        // Optimistic Update (Update UI immediately)
        setReports(prev => prev.map(r => r.id === reportId ? { ...r, status } : r));

        try {
            await api.reports.updateStatus(reportId, status);
        } catch (error) {
            console.error("Failed to update report status", error);
            // Revert on failure (optional)
        }
    };

    // 5. Handle Action Updates (e.g., Start/Complete Action)
    const handleUpdateActionStatus = async (actionId: string, status: SuggestedAction['status']) => {
        // Optimistic Update
        setActions(prev => prev.map(a => a.id === actionId ? { ...a, status } : a));

        try {
            await api.dashboard.updateAction(actionId, status);
        } catch (error) {
            console.error("Failed to update action status", error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="text-gray-500">Loading live health data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
            <div className="max-w-7xl mx-auto p-6 space-y-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl text-gray-900 mb-2">Health Monitoring Dashboard</h1>
                    <p className="text-gray-600">
                        AI-powered outbreak prediction and risk assessment system
                    </p>
                </div>

                {/* Stats Overview */}
                {stats && <DashboardStats stats={stats} />}

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Prediction Chart */}
                    <div className="lg:col-span-2">
                        <PredictionChart data={predictions} />
                    </div>

                    {/* Bayesian Analysis */}
                    <div>
                        {bayesian && <BayesianAnalysis parameters={bayesian} />}
                    </div>

                    {/* Hotspot Map */}
                    <div>
                        <HotspotMap hotspots={hotspots} />
                    </div>

                    {/* Suggested Actions */}
                    <div className="lg:col-span-2">
                        <SuggestedActions
                            actions={actions}
                            onUpdateStatus={handleUpdateActionStatus}
                        />
                    </div>

                    {/* Reports List */}
                    <div className="lg:col-span-2">
                        <ReportsList
                            reports={reports}
                            onUpdateStatus={handleUpdateReportStatus}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}