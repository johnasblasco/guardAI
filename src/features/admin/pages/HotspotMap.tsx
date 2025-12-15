import { MapPin, AlertTriangle, TrendingUp } from 'lucide-react';
import type { HotspotData } from '../../types';

interface HotspotMapProps {
    hotspots: HotspotData[];
}

export function HotspotMap({ hotspots }: HotspotMapProps) {
    const getRiskColor = (level: HotspotData['riskLevel']) => {
        switch (level) {
            case 'critical':
                return 'bg-red-500 border-red-600';
            case 'high':
                return 'bg-orange-500 border-orange-600';
            case 'medium':
                return 'bg-yellow-500 border-yellow-600';
            case 'low':
                return 'bg-green-500 border-green-600';
            default:
                return 'bg-gray-500 border-gray-600';
        }
    };

    const getRiskBadge = (level: HotspotData['riskLevel']) => {
        const configs = {
            critical: { bg: 'bg-red-100', text: 'text-red-700', label: 'Critical' },
            high: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'High Risk' },
            medium: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Medium Risk' },
            low: { bg: 'bg-green-100', text: 'text-green-700', label: 'Low Risk' },
        };
        return configs[level];
    };

    const groupedByBuilding = hotspots.reduce((acc, hotspot) => {
        if (!acc[hotspot.building]) {
            acc[hotspot.building] = [];
        }
        acc[hotspot.building].push(hotspot);
        return acc;
    }, {} as Record<string, HotspotData[]>);

    return (
        <div className="bg-white rounded-xl shadow-sm border-2 border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl text-gray-900">Hotspot Detection Map</h2>
                    <p className="text-sm text-gray-600 mt-1">Real-time risk assessment by location</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                    <span className="text-sm text-blue-900">Live</span>
                </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Risk Levels:</div>
                {(['low', 'medium', 'high', 'critical'] as const).map(level => {
                    const badge = getRiskBadge(level);
                    return (
                        <div key={level} className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${getRiskColor(level)}`} />
                            <span className="text-sm text-gray-700 capitalize">{badge.label}</span>
                        </div>
                    );
                })}
            </div>

            {/* Hotspot Grid */}
            <div className="space-y-6">
                {Object.entries(groupedByBuilding).map(([building, buildingHotspots]) => (
                    <div key={building} className="space-y-3">
                        <div className="flex items-center gap-2 pb-2 border-b-2 border-gray-200">
                            <MapPin className="w-5 h-5 text-blue-600" />
                            <h3 className="text-gray-900">{building}</h3>
                            <span className="text-sm text-gray-500">
                                ({buildingHotspots.length} {buildingHotspots.length === 1 ? 'room' : 'rooms'})
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {buildingHotspots.map((hotspot) => {
                                const badge = getRiskBadge(hotspot.riskLevel);
                                return (
                                    <div
                                        key={`${hotspot.building}-${hotspot.room}`}
                                        className="relative p-4 border-2 border-gray-200 rounded-lg hover:shadow-md transition-all group"
                                    >
                                        {/* Risk indicator dot */}
                                        <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${getRiskColor(hotspot.riskLevel)} animate-pulse`} />

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between pr-4">
                                                <span className="text-gray-900">Room {hotspot.room}</span>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <AlertTriangle className="w-4 h-4 text-orange-600" />
                                                <span className="text-sm text-gray-600">
                                                    {hotspot.reportCount} {hotspot.reportCount === 1 ? 'report' : 'reports'}
                                                </span>
                                            </div>

                                            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${badge.bg} ${badge.text}`}>
                                                <TrendingUp className="w-3 h-3" />
                                                {badge.label}
                                            </div>

                                            <div className="text-xs text-gray-500 mt-2">
                                                Updated: {new Date(hotspot.lastUpdated).toLocaleTimeString()}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {hotspots.length === 0 && (
                <div className="text-center py-12">
                    <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No active hotspots detected</p>
                    <p className="text-sm text-gray-400 mt-1">This is good news!</p>
                </div>
            )}
        </div>
    );
}
