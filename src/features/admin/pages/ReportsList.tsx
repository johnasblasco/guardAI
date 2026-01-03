import { MapPin, User } from 'lucide-react';
import type { HealthReport } from '@/types/index';

interface ReportsListProps {
    reports: HealthReport[];
    onUpdateStatus: (id: string, status: HealthReport['status']) => void;
}

export function ReportsList({ reports, onUpdateStatus }: ReportsListProps) {

    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString(undefined, {
                month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
            });
        } catch (e) {
            return 'Date pending';
        }
    };

    const getSeverityColor = (severity: HealthReport['severity']) => {
        switch (severity) {
            case 'severe': return 'bg-red-100 text-red-700 border-red-200';
            case 'moderate': return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'mild': return 'bg-blue-100 text-blue-700 border-blue-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Recent Reports</h2>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                    {reports.length} Total
                </span>
            </div>

            <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                {reports.map((report) => (
                    <div key={report.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getSeverityColor(report.severity)}`}>
                                    {report.severity.toUpperCase()}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {formatDate(report.timestamp || report.dateOfOnset)}
                                </span>
                            </div>

                            <div className="flex gap-2">
                                {report.status === 'pending' && (
                                    <button
                                        onClick={() => onUpdateStatus(report.id, 'investigating')}
                                        className="text-xs text-blue-600 hover:underline"
                                    >
                                        Investigate
                                    </button>
                                )}
                                {report.status !== 'resolved' && (
                                    <button
                                        onClick={() => onUpdateStatus(report.id, 'resolved')}
                                        className="text-xs text-green-600 hover:underline"
                                    >
                                        Resolve
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-gray-100 rounded-full flex-shrink-0">
                                <User className="w-4 h-4 text-gray-500" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">
                                    Student {report.studentHashedId ? report.studentHashedId.substring(0, 8) : 'Unknown'}
                                </p>
                                <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-3 h-3" />
                                        {/* FIX: Check if location exists before accessing .building */}
                                        {report.location ? (
                                            <span>{report.location.building} - {report.location.room}</span>
                                        ) : (
                                            <span>Location N/A</span>
                                        )}
                                    </div>
                                    {report.symptoms && (
                                        <span>• {Array.isArray(report.symptoms) ? report.symptoms.join(', ') : 'Symptoms recorded'}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {reports.length === 0 && (
                    <div className="p-8 text-center text-gray-500 text-sm">
                        No recent health reports found.
                    </div>
                )}
            </div>
        </div>
    );
}