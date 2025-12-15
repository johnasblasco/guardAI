import { useState } from 'react';
import { DashboardStats } from './DashboardStats';
import { HotspotMap } from './HotspotMap';
import { PredictionChart } from './PredictionChart';
import { BayesianAnalysis } from './BayesianAnalysis';
import { SuggestedActions } from './SuggestedActions';
import { ReportsList } from './ReportsList';
import {
    MOCK_DASHBOARD_STATS,
    MOCK_HOTSPOTS,
    generatePredictionData,
    MOCK_BAYESIAN,
    MOCK_ACTIONS,
    MOCK_REPORTS,
} from '../../utils/mockData';
import type { HealthReport, SuggestedAction } from '../../types';

export function AdminDashboard() {
    const [reports, setReports] = useState(MOCK_REPORTS);
    const [actions, setActions] = useState(MOCK_ACTIONS);
    const predictionData = generatePredictionData();

    const handleUpdateReportStatus = (reportId: string, status: HealthReport['status']) => {
        setReports(prev =>
            prev.map(report =>
                report.id === reportId ? { ...report, status } : report
            )
        );
    };

    const handleUpdateActionStatus = (actionId: string, status: SuggestedAction['status']) => {
        setActions(prev =>
            prev.map(action =>
                action.id === actionId ? { ...action, status } : action
            )
        );
    };

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
                <DashboardStats stats={MOCK_DASHBOARD_STATS} />

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Prediction Chart */}
                    <div className="lg:col-span-2">
                        <PredictionChart data={predictionData} />
                    </div>

                    {/* Bayesian Analysis */}
                    <div>
                        <BayesianAnalysis parameters={MOCK_BAYESIAN} />
                    </div>

                    {/* Hotspot Map */}
                    <div>
                        <HotspotMap hotspots={MOCK_HOTSPOTS} />
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
