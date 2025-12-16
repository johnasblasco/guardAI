import { TrendingUp, TrendingDown, AlertTriangle, Users, CheckCircle, MapPin } from 'lucide-react';
import type { DashboardStats as StatsType } from '@/types/index';

interface DashboardStatsProps {
    stats: StatsType;
}

export function DashboardStats({ stats }: DashboardStatsProps) {
    const statCards = [
        {
            title: 'Reports Today',
            value: stats.totalReportsToday,
            icon: Users,
            color: 'blue',
            suffix: 'reports',
        },
        {
            title: 'Confirmed Cases',
            value: stats.confirmedCases,
            icon: CheckCircle,
            color: 'red',
            suffix: 'cases',
        },
        {
            title: 'Suspected Cases',
            value: stats.suspectedCases,
            icon: AlertTriangle,
            color: 'yellow',
            suffix: 'cases',
        },
        {
            title: 'Active Hotspots',
            value: stats.activeHotspots,
            icon: MapPin,
            color: 'orange',
            suffix: 'locations',
        },
    ];

    const getColorClasses = (color: string) => {
        const colors: Record<string, { bg: string; icon: string; text: string }> = {
            blue: { bg: 'bg-blue-50', icon: 'bg-blue-600', text: 'text-blue-900' },
            red: { bg: 'bg-red-50', icon: 'bg-red-600', text: 'text-red-900' },
            yellow: { bg: 'bg-yellow-50', icon: 'bg-yellow-600', text: 'text-yellow-900' },
            orange: { bg: 'bg-orange-50', icon: 'bg-orange-600', text: 'text-orange-900' },
            green: { bg: 'bg-green-50', icon: 'bg-green-600', text: 'text-green-900' },
        };
        return colors[color] || colors.blue;
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat) => {
                    const Icon = stat.icon;
                    const colors = getColorClasses(stat.color);

                    return (
                        <div
                            key={stat.title}
                            className="bg-white rounded-xl p-6 shadow-sm border-2 border-gray-100 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                                    <div className="flex items-baseline gap-2">
                                        <p className="text-3xl text-gray-900">{stat.value}</p>
                                        <span className="text-sm text-gray-500">{stat.suffix}</span>
                                    </div>
                                </div>
                                <div className={`${colors.icon} p-3 rounded-lg`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Weekly Growth Rate */}
            <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-gray-100">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600">Weekly Growth Rate</p>
                        <div className="flex items-center gap-2 mt-1">
                            <p className="text-2xl text-gray-900">
                                {stats.weeklyGrowthRate > 0 ? '+' : ''}{stats.weeklyGrowthRate.toFixed(1)}%
                            </p>
                            {stats.weeklyGrowthRate > 0 ? (
                                <TrendingUp className="w-5 h-5 text-red-600" />
                            ) : (
                                <TrendingDown className="w-5 h-5 text-green-600" />
                            )}
                        </div>
                    </div>
                    <div className={`px-4 py-2 rounded-full ${stats.weeklyGrowthRate > 10 ? 'bg-red-100 text-red-700' :
                            stats.weeklyGrowthRate > 0 ? 'bg-yellow-100 text-yellow-700' :
                                'bg-green-100 text-green-700'
                        }`}>
                        {stats.weeklyGrowthRate > 10 ? 'High Risk' :
                            stats.weeklyGrowthRate > 0 ? 'Moderate' : 'Stable'}
                    </div>
                </div>
            </div>
        </div>
    );
}
