import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Brain } from 'lucide-react';
import type { PredictionData } from '@/types/index';

interface PredictionChartProps {
    data: PredictionData[];
}

export function PredictionChart({ data }: PredictionChartProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.getMonth() + 1}/${date.getDate()}`;
    };

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-gray-200">
                    <p className="text-sm text-gray-900 mb-2">{new Date(label).toLocaleDateString()}</p>
                    {payload.map((entry: any, index: number) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                            <span className="text-gray-600">{entry.name}:</span>
                            <span className="text-gray-900">{entry.value}</span>
                        </div>
                    ))}
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
                        <Brain className="w-5 h-5 text-blue-600" />
                        <h2 className="text-xl text-gray-900">AI-Powered Predictions</h2>
                    </div>
                    <p className="text-sm text-gray-600">Time series forecast using LSTM neural network</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-purple-50 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-purple-600" />
                    <span className="text-sm text-purple-900">TensorFlow.js</span>
                </div>
            </div>

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorConfirmed" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                            dataKey="date"
                            tickFormatter={formatDate}
                            stroke="#6b7280"
                            style={{ fontSize: '12px' }}
                        />
                        <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                            wrapperStyle={{ paddingTop: '20px' }}
                            iconType="circle"
                        />
                        <Area
                            type="monotone"
                            dataKey="confirmed"
                            stroke="#10b981"
                            strokeWidth={3}
                            fill="url(#colorConfirmed)"
                            name="Confirmed Cases"
                            connectNulls
                        />
                        <Area
                            type="monotone"
                            dataKey="predicted"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            fill="url(#colorPredicted)"
                            name="Predicted Cases"
                        />
                        <Area
                            type="monotone"
                            dataKey="lowerBound"
                            stroke="#93c5fd"
                            strokeWidth={1}
                            fill="none"
                            name="Lower Bound"
                            strokeDasharray="2 2"
                        />
                        <Area
                            type="monotone"
                            dataKey="upperBound"
                            stroke="#93c5fd"
                            strokeWidth={1}
                            fill="none"
                            name="Upper Bound"
                            strokeDasharray="2 2"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-sm text-blue-900 mb-1">Peak Prediction</div>
                    <div className="text-2xl text-blue-600">
                        {Math.max(...data.map(d => d.predicted))} cases
                    </div>
                    <div className="text-xs text-blue-700 mt-1">
                        Expected in {data.findIndex(d => d.predicted === Math.max(...data.map(d => d.predicted)))} days
                    </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-sm text-green-900 mb-1">Current Confirmed</div>
                    <div className="text-2xl text-green-600">
                        {data.find(d => new Date(d.date).toDateString() === new Date().toDateString())?.confirmed || 0} cases
                    </div>
                    <div className="text-xs text-green-700 mt-1">As of today</div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="text-sm text-purple-900 mb-1">Forecast Horizon</div>
                    <div className="text-2xl text-purple-600">14 days</div>
                    <div className="text-xs text-purple-700 mt-1">Updated hourly</div>
                </div>
            </div>
        </div>
    );
}
