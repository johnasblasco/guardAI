import { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { SYMPTOMS } from '@/utils/MockData';

interface SymptomSelectorProps {
    selectedSymptoms: string[];
    onSymptomToggle: (symptomId: string) => void;
}

export function SymptomSelector({ selectedSymptoms, onSymptomToggle }: SymptomSelectorProps) {
    const [filter, setFilter] = useState<string>('all');

    const categories = ['all', 'respiratory', 'digestive', 'general', 'other'];

    const filteredSymptoms = filter === 'all'
        ? SYMPTOMS
        : SYMPTOMS.filter(s => s.category === filter);

    const getIcon = (iconName: string) => {
        const Icon = (LucideIcons as any)[iconName] || LucideIcons.Circle;
        return Icon;
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-2 flex-wrap">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-4 py-2 rounded-full transition-all ${filter === cat
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {filteredSymptoms.map(symptom => {
                    const Icon = getIcon(symptom.icon);
                    const isSelected = selectedSymptoms.includes(symptom.id);

                    return (
                        <button
                            key={symptom.id}
                            onClick={() => onSymptomToggle(symptom.id)}
                            className={`p-4 rounded-xl border-2 transition-all ${isSelected
                                ? 'border-blue-600 bg-blue-50 shadow-md scale-105'
                                : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
                                }`}
                        >
                            <div className="flex flex-col items-center gap-2">
                                <div className={`p-3 rounded-full ${isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                                    }`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <span className={`text-sm ${isSelected ? 'text-blue-900' : 'text-gray-700'}`}>
                                    {symptom.name}
                                </span>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
