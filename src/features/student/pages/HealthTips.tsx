import { Heart, Droplets, Wind, Sun, Apple, Shield } from 'lucide-react';

export function HealthTips() {
    const tips = [
        {
            icon: Droplets,
            title: 'Stay Hydrated',
            description: 'Drink at least 8 glasses of water daily to maintain good health.',
            color: 'blue',
        },
        {
            icon: Apple,
            title: 'Eat Nutritious Food',
            description: 'Include fruits, vegetables, and whole grains in your diet.',
            color: 'green',
        },
        {
            icon: Wind,
            title: 'Get Fresh Air',
            description: 'Spend time outdoors and ensure proper ventilation indoors.',
            color: 'cyan',
        },
        {
            icon: Sun,
            title: 'Rest & Sleep',
            description: 'Get 7-9 hours of quality sleep every night for recovery.',
            color: 'yellow',
        },
        {
            icon: Shield,
            title: 'Practice Hygiene',
            description: 'Wash hands frequently and maintain personal cleanliness.',
            color: 'purple',
        },
        {
            icon: Heart,
            title: 'Stay Active',
            description: 'Engage in at least 30 minutes of physical activity daily.',
            color: 'red',
        },
    ];

    const getColorClasses = (color: string) => {
        const colors: Record<string, { bg: string; icon: string; text: string }> = {
            blue: { bg: 'bg-blue-50', icon: 'text-blue-600', text: 'text-blue-900' },
            green: { bg: 'bg-green-50', icon: 'text-green-600', text: 'text-green-900' },
            cyan: { bg: 'bg-cyan-50', icon: 'text-cyan-600', text: 'text-cyan-900' },
            yellow: { bg: 'bg-yellow-50', icon: 'text-yellow-600', text: 'text-yellow-900' },
            purple: { bg: 'bg-purple-50', icon: 'text-purple-600', text: 'text-purple-900' },
            red: { bg: 'bg-red-50', icon: 'text-red-600', text: 'text-red-900' },
        };
        return colors[color] || colors.blue;
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border-2 border-gray-100 p-6">
            <div className="mb-6">
                <h2 className="text-xl text-gray-900 mb-1">Health Tips</h2>
                <p className="text-sm text-gray-600">Stay healthy and prevent illness</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tips.map((tip) => {
                    const Icon = tip.icon;
                    const colors = getColorClasses(tip.color);

                    return (
                        <div
                            key={tip.title}
                            className={`p-4 ${colors.bg} rounded-lg border-2 border-transparent hover:border-gray-300 transition-all`}
                        >
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0">
                                    <Icon className={`w-6 h-6 ${colors.icon}`} />
                                </div>
                                <div>
                                    <h3 className={`text-sm mb-1 ${colors.text}`}>{tip.title}</h3>
                                    <p className="text-xs text-gray-600">{tip.description}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
