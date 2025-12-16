import { FileText, Clock, CheckCircle, AlertCircle, MapPin, Calendar } from 'lucide-react';
import type { HealthReport } from '@/types/index';

interface ReportsListProps {
    reports: HealthReport[];
    onUpdateStatus?: (reportId: string, status: HealthReport['status']) => void;
}

export function ReportsList({ reports, onUpdateStatus }: ReportsListProps) {
    const getSeverityColor = (severity: HealthReport['severity']) => {
        switch (severity) {
            case 'severe':
                return 'bg-red-100 text-red-700 border-red-200';
            case 'moderate':
                return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'mild':
                return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        }
    };

    const getStatusConfig = (status: HealthReport['status']) => {
        switch (status) {
            case 'resolved':
                return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', label: 'Resolved' };
            case 'reviewed':
                return { icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50', label: 'Reviewed' };
            case 'pending':
                return { icon: AlertCircle, color: 'text-orange-600', bg: 'bg-orange-50', label: 'Pending' };
        }
    };

    const sortedReports = [...reports].sort((a, b) => {
        const statusOrder = { pending: 0, reviewed: 1, resolved: 2 };
        if (a.status !== b.status) {
            return statusOrder[a.status] - statusOrder[b.status];
        }
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

    return (
        <div className="bg-white rounded-xl shadow-sm border-2 border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <h2 className="text-xl text-gray-900">Recent Health Reports</h2>
                    </div>
                    <p className="text-sm text-gray-600">Latest submissions from students</p>
                </div>
                <div className="text-sm text-gray-600">
                    Total: <span className="text-gray-900">{reports.length}</span>
                </div>
            </div>

            <div className="space-y-3">
                {sortedReports.map((report) => {
                    const status = getStatusConfig(report.status);
                    const StatusIcon = status.icon;

                    return (
                        <div
                            key={report.id}
                            className="p-4 border-2 border-gray-200 rounded-lg hover:shadow-md transition-all"
                        >
                            <div className="flex items-start gap-4">
                                {/* Status Indicator */}
                                <div className={`p-2 ${status.bg} rounded-lg`}>
                                    <StatusIcon className={`w-5 h-5 ${status.color}`} />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-4 mb-3">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-gray-900">{report.userGradeLevel}</span>
                                                {report.confirmedDisease && (
                                                    <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded border border-red-200">
                                                        Confirmed: {report.diseaseName}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(report.dateOfOnset).toLocaleDateString()}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" />
                                                    {report.location.building} - {report.location.room}
                                                </div>
                                            </div>
                                        </div>

                                        <div className={`px-2 py-1 rounded border capitalize text-xs ${getSeverityColor(report.severity)}`}>
                                            {report.severity}
                                        </div>
                                    </div>

                                    {/* Symptoms */}
                                    <div className="mb-3">
                                        <div className="text-xs text-gray-500 mb-1">Symptoms:</div>
                                        <div className="flex flex-wrap gap-1">
                                            {report.symptoms.map((symptom) => (
                                                <span
                                                    key={symptom}
                                                    className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded"
                                                >
                                                    {symptom.replace('-', ' ')}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                                        <span className="text-xs text-gray-500">
                                            Reported: {new Date(report.timestamp).toLocaleString()}
                                        </span>

                                        {/* Action Buttons */}
                                        {onUpdateStatus && report.status !== 'resolved' && (
                                            <div className="flex gap-2">
                                                {report.status === 'pending' && (
                                                    <button
                                                        onClick={() => onUpdateStatus(report.id, 'reviewed')}
                                                        className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                                                    >
                                                        Mark as Reviewed
                                                    </button>
                                                )}
                                                {report.status === 'reviewed' && (
                                                    <button
                                                        onClick={() => onUpdateStatus(report.id, 'resolved')}
                                                        className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
                                                    >
                                                        Resolve
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {reports.length === 0 && (
                <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No health reports submitted yet</p>
                </div>
            )}
        </div>
    );
}
