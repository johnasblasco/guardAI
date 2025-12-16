import { Sparkles, CheckCircle, Clock, AlertTriangle, Droplets, Bell, Eye, XCircle } from 'lucide-react';
import type { SuggestedAction } from '@/types/index';

interface SuggestedActionsProps {
    actions: SuggestedAction[];
    onUpdateStatus?: (actionId: string, status: SuggestedAction['status']) => void;
}

export function SuggestedActions({ actions, onUpdateStatus }: SuggestedActionsProps) {
    const getIcon = (type: SuggestedAction['type']) => {
        switch (type) {
            case 'disinfection':
                return Droplets;
            case 'notification':
                return Bell;
            case 'monitoring':
                return Eye;
            case 'closure':
                return XCircle;
            default:
                return AlertTriangle;
        }
    };

    const getPriorityConfig = (priority: SuggestedAction['priority']) => {
        switch (priority) {
            case 'critical':
                return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', badge: 'bg-red-600' };
            case 'high':
                return { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', badge: 'bg-orange-600' };
            case 'medium':
                return { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', badge: 'bg-yellow-600' };
            case 'low':
                return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', badge: 'bg-blue-600' };
        }
    };

    const getStatusConfig = (status: SuggestedAction['status']) => {
        switch (status) {
            case 'completed':
                return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', label: 'Completed' };
            case 'in-progress':
                return { icon: Clock, color: 'text-blue-600', bg: 'bg-blue-100', label: 'In Progress' };
            case 'pending':
                return { icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-100', label: 'Pending' };
        }
    };

    const sortedActions = [...actions].sort((a, b) => {
        const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
        const statusOrder = { pending: 0, 'in-progress': 1, completed: 2 };

        if (a.status !== b.status) {
            return statusOrder[a.status] - statusOrder[b.status];
        }
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    return (
        <div className="bg-white rounded-xl shadow-sm border-2 border-gray-100 p-6">
            <div className="flex items-start justify-between mb-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-5 h-5 text-purple-600" />
                        <h2 className="text-xl text-gray-900">AI-Generated Action Plan</h2>
                    </div>
                    <p className="text-sm text-gray-600">Recommended interventions based on predictive analysis</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-purple-50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" />
                    <span className="text-sm text-purple-900">Auto-updated</span>
                </div>
            </div>

            <div className="space-y-3">
                {sortedActions.map((action) => {
                    const Icon = getIcon(action.type);
                    const priority = getPriorityConfig(action.priority);
                    const status = getStatusConfig(action.status);
                    const StatusIcon = status.icon;

                    return (
                        <div
                            key={action.id}
                            className={`p-4 border-2 rounded-lg transition-all ${priority.border} ${priority.bg} ${action.status === 'completed' ? 'opacity-60' : 'hover:shadow-md'
                                }`}
                        >
                            <div className="flex items-start gap-4">
                                {/* Icon */}
                                <div className={`p-2 ${priority.badge} rounded-lg flex-shrink-0`}>
                                    <Icon className="w-5 h-5 text-white" />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-4 mb-2">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="text-gray-900">{action.title}</h3>
                                                <span className={`px-2 py-0.5 rounded text-xs ${priority.text} ${priority.bg} border ${priority.border}`}>
                                                    {action.priority.toUpperCase()}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600">{action.description}</p>
                                        </div>

                                        {/* Status Badge */}
                                        <div className={`flex items-center gap-1 px-2 py-1 rounded ${status.bg} flex-shrink-0`}>
                                            <StatusIcon className={`w-3 h-3 ${status.color}`} />
                                            <span className={`text-xs ${status.color}`}>{status.label}</span>
                                        </div>
                                    </div>

                                    {/* Affected Locations */}
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {action.affectedLocations.map((location, idx) => (
                                            <span
                                                key={idx}
                                                className="px-2 py-1 bg-white rounded text-xs text-gray-700 border border-gray-200"
                                            >
                                                {location}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-500">
                                            {new Date(action.timestamp).toLocaleString()}
                                        </span>

                                        {/* Action Buttons */}
                                        {onUpdateStatus && action.status !== 'completed' && (
                                            <div className="flex gap-2">
                                                {action.status === 'pending' && (
                                                    <button
                                                        onClick={() => onUpdateStatus(action.id, 'in-progress')}
                                                        className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                                                    >
                                                        Start
                                                    </button>
                                                )}
                                                {action.status === 'in-progress' && (
                                                    <button
                                                        onClick={() => onUpdateStatus(action.id, 'completed')}
                                                        className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
                                                    >
                                                        Complete
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

            {actions.length === 0 && (
                <div className="text-center py-12">
                    <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No actions recommended at this time</p>
                    <p className="text-sm text-gray-400 mt-1">The system will suggest actions as needed</p>
                </div>
            )}

            {/* Summary */}
            <div className="mt-6 pt-6 border-t-2 border-gray-200">
                <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                        <div className="text-2xl text-orange-600">
                            {actions.filter(a => a.status === 'pending').length}
                        </div>
                        <div className="text-sm text-gray-600">Pending</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl text-blue-600">
                            {actions.filter(a => a.status === 'in-progress').length}
                        </div>
                        <div className="text-sm text-gray-600">In Progress</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl text-green-600">
                            {actions.filter(a => a.status === 'completed').length}
                        </div>
                        <div className="text-sm text-gray-600">Completed</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
