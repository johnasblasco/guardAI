import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Activity, TrendingUp } from 'lucide-react';
import type { BayesianParameter } from '../../types';

interface BayesianAnalysisProps {
    parameters: BayesianParameter;
}

export function BayesianAnalysis({ parameters }: BayesianAnalysisProps) {
    const chartData = [
        {
            name: 'Prior',
            value: parameters.priorProbability * 100,
            color: '#94a3b8',
        },
        {
            name: 'Posterior',
            value: parameters.posteriorProbability * 100,
            color: '#3b82f6',
        },
    ];

    const getRiskLevel = (probability: number): { level: string; color: string; bg: string } => {
        if (probability >= 0.4) return { level: 'High Risk', color: 'text-red-700', bg: 'bg-red-50' };
        if (probability >= 0.25) return { level: 'Moderate Risk', color: 'text-orange-700', bg: 'bg-orange-50' };
        if (probability >= 0.15) return { level: 'Low Risk', color: 'text-yellow-700', bg: 'bg-yellow-50' };
        return { level: 'Minimal Risk', color: 'text-green-700', bg: 'bg-green-50' };
    };

    const risk = getRiskLevel(parameters.posteriorProbability);

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 rounded-lg shadow-lg border-2 border-gray-200">
                    <p className="text-sm text-gray-900">{payload[0].payload.name} Probability</p>
                    <p className="text-lg text-blue-600">{payload[0].value.toFixed(1)}%</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border-2 border-gray-100 p-6">
            <div className="flex items-start justify-between mb-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-5 h-5 text-blue-600" />
                        <h2 className="text-xl text-gray-900">Bayesian Analysis</h2>
                    </div>
                    <p className="text-sm text-gray-600">Statistical outbreak probability assessment</p>
                </div>
                <div className={`px-3 py-1 rounded-lg ${risk.bg}`}>
                    <span className={`text-sm ${risk.color}`}>{risk.level}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Chart */}
                <div>
                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="name" stroke="#6b7280" style={{ fontSize: '12px' }} />
                                <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Confidence Interval */}
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <div className="text-sm text-blue-900 mb-2">95% Confidence Interval</div>
                        <div className="flex items-center justify-between">
                            <span className="text-blue-700">
                                {(parameters.confidenceInterval[0] * 100).toFixed(1)}%
                            </span>
                            <div className="flex-1 mx-4 h-2 bg-blue-200 rounded-full relative">
                                <div
                                    className="absolute h-full bg-blue-600 rounded-full"
                                    style={{
                                        left: `${(parameters.confidenceInterval[0] / parameters.confidenceInterval[1]) * 100}%`,
                                        right: 0,
                                    }}
                                />
                            </div>
                            <span className="text-blue-700">
                                {(parameters.confidenceInterval[1] * 100).toFixed(1)}%
                            </span>
                        </div>
                    </div>
                </div>

                {/* Parameters */}
                <div className="space-y-3">
                    <div className="p-4 border-2 border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">Prior Probability</span>
                            <div className="w-2 h-2 bg-gray-400 rounded-full" />
                        </div>
                        <div className="text-2xl text-gray-900">
                            {(parameters.priorProbability * 100).toFixed(1)}%
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Historical outbreak rate</p>
                    </div>

                    <div className="p-4 border-2 border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">Likelihood Ratio</span>
                            <TrendingUp className="w-4 h-4 text-orange-600" />
                        </div>
                        <div className="text-2xl text-gray-900">
                            {parameters.likelihoodRatio.toFixed(2)}×
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Evidence strength multiplier</p>
                    </div>

                    <div className="p-4 bg-blue-600 text-white rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm">Posterior Probability</span>
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        </div>
                        <div className="text-2xl">
                            {(parameters.posteriorProbability * 100).toFixed(1)}%
                        </div>
                        <p className="text-xs text-blue-100 mt-1">Updated outbreak probability</p>
                    </div>
                </div>
            </div>

            {/* Interpretation */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-600">
                <h3 className="text-sm text-gray-900 mb-2">Interpretation</h3>
                <p className="text-sm text-gray-700">
                    Based on current evidence, the probability of an outbreak has{' '}
                    {parameters.posteriorProbability > parameters.priorProbability ? (
                        <span className="text-red-600">increased</span>
                    ) : (
                        <span className="text-green-600">decreased</span>
                    )}{' '}
                    from {(parameters.priorProbability * 100).toFixed(1)}% to{' '}
                    <strong>{(parameters.posteriorProbability * 100).toFixed(1)}%</strong>.
                    The likelihood ratio of {parameters.likelihoodRatio.toFixed(2)} indicates{' '}
                    {parameters.likelihoodRatio > 2 ? 'strong' : 'moderate'} evidence supporting this assessment.
                </p>
            </div>
        </div>
    );
}
