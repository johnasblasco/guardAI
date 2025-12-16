import { useState } from 'react';
import { Send, Calendar, AlertCircle, CheckCircle2, X } from 'lucide-react';
import { SymptomSelector } from './SymptomSelector';
import { LocationSelector } from './LocationSelector';
import type { SeverityLevel, HealthReport } from '@/types/index';

interface StudentReportFormProps {
    onSubmitReport: (report: Omit<HealthReport, 'id' | 'userId' | 'timestamp' | 'status'>) => void;
    onClose?: () => void; // Optional: if parent wants to close the form
}

export function StudentReportForm({ onSubmitReport, onClose }: StudentReportFormProps) {
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        symptoms: [] as string[],
        severity: 'mild' as SeverityLevel,
        dateOfOnset: new Date().toISOString().split('T')[0],
        confirmedDisease: false,
        diseaseName: '',
        gradeLevel: '',
        location: {
            building: '',
            room: '',
            seatNumber: '',
        },
    });

    const handleSymptomToggle = (symptomId: string) => {
        setFormData(prev => ({
            ...prev,
            symptoms: prev.symptoms.includes(symptomId)
                ? prev.symptoms.filter(s => s !== symptomId)
                : [...prev.symptoms, symptomId],
        }));
    };

    const handleSubmit = () => {
        const report: Omit<HealthReport, 'id' | 'userId' | 'timestamp' | 'status'> = {
            userGradeLevel: formData.gradeLevel,
            symptoms: formData.symptoms,
            severity: formData.severity,
            dateOfOnset: new Date(formData.dateOfOnset).toISOString(),
            confirmedDisease: formData.confirmedDisease,
            diseaseName: formData.confirmedDisease ? formData.diseaseName : undefined,
            location: formData.location,
        };

        onSubmitReport(report);
        setSubmitted(true);

        // Auto-reset form after 3 seconds (optional)
        setTimeout(() => {
            resetForm();
            if (onClose) {
                onClose(); // Close the form if parent provided onClose
            }
        }, 3000);
    };

    const resetForm = () => {
        setSubmitted(false);
        setStep(1);
        setFormData({
            symptoms: [],
            severity: 'mild',
            dateOfOnset: new Date().toISOString().split('T')[0],
            confirmedDisease: false,
            diseaseName: '',
            gradeLevel: '',
            location: { building: '', room: '', seatNumber: '' },
        });
    };

    const canProceedToStep2 = formData.symptoms.length > 0;
    const canProceedToStep3 = formData.gradeLevel && formData.dateOfOnset;
    const canProceedToStep4 = formData.location.building && formData.location.room && formData.location.seatNumber;

    if (submitted) {
        return (
            <div className="max-w-2xl mx-auto p-8">
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-2xl text-gray-900">Report Submitted Successfully</h2>
                    <p className="text-gray-600">
                        Thank you for reporting your symptoms. The health office has been notified and will review your report shortly.
                    </p>
                    <div className="flex gap-3 justify-center mt-6">
                        <button
                            onClick={resetForm}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Submit Another Report
                        </button>
                        {onClose && (
                            <button
                                onClick={onClose}
                                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Back to Dashboard
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Close button at top */}
            {onClose && (
                <div className="flex justify-end mb-4">
                    <button
                        onClick={onClose}
                        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                    >
                        <X className="w-4 h-4" />
                        Close
                    </button>
                </div>
            )}

            {/* Progress Steps */}
            <div className="mb-8">
                <div className="flex items-center justify-between max-w-2xl mx-auto">
                    {[1, 2, 3, 4].map((s, idx) => (
                        <div key={s} className="flex items-center flex-1">
                            <div className="flex flex-col items-center flex-1">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                                    }`}>
                                    {s}
                                </div>
                                <span className="text-xs mt-2 text-gray-600">
                                    {s === 1 ? 'Symptoms' : s === 2 ? 'Details' : s === 3 ? 'Location' : 'Review'}
                                </span>
                            </div>
                            {idx < 3 && (
                                <div className={`h-0.5 flex-1 -mt-6 ${step > s ? 'bg-blue-600' : 'bg-gray-200'}`} />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
                {/* Step 1: Symptoms */}
                {step === 1 && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl text-gray-900 mb-2">Select Your Symptoms</h2>
                            <p className="text-gray-600">Choose all symptoms you're experiencing</p>
                        </div>
                        <SymptomSelector
                            selectedSymptoms={formData.symptoms}
                            onSymptomToggle={handleSymptomToggle}
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={() => setStep(2)}
                                disabled={!canProceedToStep2}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                            >
                                Next: Add Details
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: Details */}
                {step === 2 && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl text-gray-900 mb-2">Additional Details</h2>
                            <p className="text-gray-600">Help us understand your condition better</p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-700 mb-2">Grade Level</label>
                                <select
                                    value={formData.gradeLevel}
                                    onChange={(e) => setFormData(prev => ({ ...prev, gradeLevel: e.target.value }))}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none"
                                >
                                    <option value="">Select grade level</option>
                                    {Array.from({ length: 6 }, (_, i) => i + 7).map(grade => (
                                        <option key={grade} value={`Grade ${grade}`}>Grade {grade}</option>
                                    ))}
                                    <option value="Grade 12">Grade 12</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-700 mb-2">
                                    <Calendar className="inline w-4 h-4 mr-1" />
                                    When did symptoms start?
                                </label>
                                <input
                                    type="date"
                                    value={formData.dateOfOnset}
                                    max={new Date().toISOString().split('T')[0]}
                                    onChange={(e) => setFormData(prev => ({ ...prev, dateOfOnset: e.target.value }))}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-700 mb-2">Severity Level</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {(['mild', 'moderate', 'severe'] as SeverityLevel[]).map(level => (
                                        <button
                                            key={level}
                                            onClick={() => setFormData(prev => ({ ...prev, severity: level }))}
                                            className={`p-4 rounded-lg border-2 transition-all ${formData.severity === level
                                                ? 'border-blue-600 bg-blue-50 text-blue-900'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <div className="text-center">
                                                <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${level === 'mild' ? 'bg-yellow-400' :
                                                    level === 'moderate' ? 'bg-orange-400' : 'bg-red-500'
                                                    }`} />
                                                <span className="capitalize">{level}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.confirmedDisease}
                                        onChange={(e) => setFormData(prev => ({ ...prev, confirmedDisease: e.target.checked }))}
                                        className="w-5 h-5 text-blue-600 rounded"
                                    />
                                    <span className="text-gray-700">I have a confirmed diagnosis</span>
                                </label>
                                {formData.confirmedDisease && (
                                    <input
                                        type="text"
                                        value={formData.diseaseName}
                                        onChange={(e) => setFormData(prev => ({ ...prev, diseaseName: e.target.value }))}
                                        placeholder="Enter disease name (e.g., Influenza)"
                                        className="mt-3 w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none"
                                    />
                                )}
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <button
                                onClick={() => setStep(1)}
                                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Back
                            </button>
                            <button
                                onClick={() => setStep(3)}
                                disabled={!canProceedToStep3}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                            >
                                Next: Location
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: Location */}
                {step === 3 && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl text-gray-900 mb-2">Your Location</h2>
                            <p className="text-gray-600">Help us identify potential exposure areas</p>
                        </div>

                        <LocationSelector
                            selectedLocation={formData.location}
                            onLocationChange={(location) => setFormData(prev => ({ ...prev, location }))}
                        />

                        <div className="flex justify-between">
                            <button
                                onClick={() => setStep(2)}
                                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Back
                            </button>
                            <button
                                onClick={() => setStep(4)}
                                disabled={!canProceedToStep4}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                            >
                                Review & Submit
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 4: Review */}
                {step === 4 && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl text-gray-900 mb-2">Review Your Report</h2>
                            <p className="text-gray-600">Please confirm the information is correct</p>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 bg-blue-50 rounded-lg">
                                <h3 className="text-sm text-blue-900 mb-2">Symptoms ({formData.symptoms.length})</h3>
                                <div className="flex flex-wrap gap-2">
                                    {formData.symptoms.map(s => (
                                        <span key={s} className="px-3 py-1 bg-white rounded-full text-sm text-gray-700">
                                            {s.replace('-', ' ')}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 border-2 border-gray-200 rounded-lg">
                                    <div className="text-sm text-gray-500">Grade Level</div>
                                    <div className="text-gray-900 mt-1">{formData.gradeLevel}</div>
                                </div>
                                <div className="p-4 border-2 border-gray-200 rounded-lg">
                                    <div className="text-sm text-gray-500">Severity</div>
                                    <div className="text-gray-900 mt-1 capitalize">{formData.severity}</div>
                                </div>
                                <div className="p-4 border-2 border-gray-200 rounded-lg">
                                    <div className="text-sm text-gray-500">Date of Onset</div>
                                    <div className="text-gray-900 mt-1">
                                        {new Date(formData.dateOfOnset).toLocaleDateString()}
                                    </div>
                                </div>
                                <div className="p-4 border-2 border-gray-200 rounded-lg">
                                    <div className="text-sm text-gray-500">Confirmed Diagnosis</div>
                                    <div className="text-gray-900 mt-1">
                                        {formData.confirmedDisease ? formData.diseaseName || 'Yes' : 'No'}
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h3 className="text-sm text-gray-700 mb-2">Location</h3>
                                <div className="text-gray-900">
                                    {formData.location.building} - Room {formData.location.room} - Seat {formData.location.seatNumber}
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
                                <AlertCircle className="w-5 h-5 text-yellow-700 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-yellow-800">
                                    <strong>Privacy Notice:</strong> Your report will be shared with the school health office for monitoring purposes. Personal information is kept confidential.
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <button
                                onClick={() => setStep(3)}
                                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                            >
                                <Send className="w-4 h-4" />
                                Submit Report
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}