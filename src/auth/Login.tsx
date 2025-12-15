import { useState } from 'react';
import { Heart, Shield, UserCircle, Activity } from 'lucide-react';
import { StudentReportForm } from './components/student/StudentReportForm';
import { AdminDashboard } from './components/admin/AdminDashboard';
import type { UserRole, HealthReport } from './types';
import { MOCK_REPORTS } from './utils/mockData';

function Login() {
    const [userRole, setUserRole] = useState<UserRole | null>(null);
    const [reports, setReports] = useState(MOCK_REPORTS);

    const handleSubmitReport = (report: Omit<HealthReport, 'id' | 'userId' | 'timestamp' | 'status'>) => {
        const newReport: HealthReport = {
            ...report,
            id: `rep-${Date.now()}`,
            userId: `student-${Date.now()}`,
            timestamp: new Date().toISOString(),
            status: 'pending',
        };

        setReports(prev => [newReport, ...prev]);
        console.log('New report submitted:', newReport);
    };

    // Landing page for role selection
    if (!userRole) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex items-center justify-center p-6">
                <div className="max-w-4xl w-full">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="p-3 bg-white rounded-xl">
                                <Heart className="w-10 h-10 text-blue-600" />
                            </div>
                            <h1 className="text-4xl text-white">HealthGuard AI</h1>
                        </div>
                        <p className="text-xl text-blue-100">
                            Intelligent Health Monitoring & Outbreak Prediction System
                        </p>
                        <p className="text-sm text-blue-200 mt-2">
                            Powered by TensorFlow.js • Educational Demo
                        </p>
                    </div>

                    {/* Role Selection Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <button
                            onClick={() => setUserRole('student')}
                            className="group bg-white rounded-2xl p-8 text-left hover:shadow-2xl transition-all transform hover:-translate-y-1"
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-4 bg-blue-50 rounded-xl group-hover:bg-blue-600 transition-colors">
                                    <UserCircle className="w-10 h-10 text-blue-600 group-hover:text-white transition-colors" />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl text-gray-900 mb-2">Student Portal</h2>
                                    <p className="text-gray-600 mb-4">
                                        Report symptoms and help us track health trends in your school
                                    </p>
                                    <ul className="space-y-2 text-sm text-gray-600">
                                        <li className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                                            Easy symptom reporting
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                                            Interactive location mapping
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                                            Privacy-focused design
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-end text-blue-600 group-hover:text-blue-700">
                                <span className="text-sm">Continue as Student</span>
                                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </button>

                        <button
                            onClick={() => setUserRole('admin')}
                            className="group bg-white rounded-2xl p-8 text-left hover:shadow-2xl transition-all transform hover:-translate-y-1"
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-4 bg-purple-50 rounded-xl group-hover:bg-purple-600 transition-colors">
                                    <Shield className="w-10 h-10 text-purple-600 group-hover:text-white transition-colors" />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl text-gray-900 mb-2">Admin Dashboard</h2>
                                    <p className="text-gray-600 mb-4">
                                        Monitor health trends and respond to predicted outbreak risks
                                    </p>
                                    <ul className="space-y-2 text-sm text-gray-600">
                                        <li className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                                            Real-time analytics
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                                            AI-powered predictions
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                                            Automated action suggestions
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-end text-purple-600 group-hover:text-purple-700">
                                <span className="text-sm">Continue as Admin</span>
                                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </button>
                    </div>

                    {/* Features */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                        <div className="flex items-center gap-2 mb-4">
                            <Activity className="w-5 h-5 text-white" />
                            <h3 className="text-white">System Features</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-100">
                            <div>
                                <strong className="text-white">Bayesian Analysis</strong>
                                <p className="mt-1">Statistical probability assessment for outbreak prediction</p>
                            </div>
                            <div>
                                <strong className="text-white">Time Series Forecasting</strong>
                                <p className="mt-1">LSTM-based prediction using TensorFlow.js</p>
                            </div>
                            <div>
                                <strong className="text-white">Hotspot Detection</strong>
                                <p className="mt-1">Real-time identification of high-risk areas</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation Bar */}
            <nav className="bg-white border-b-2 border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-600 rounded-lg">
                                <Heart className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl text-gray-900">HealthGuard AI</h1>
                                <p className="text-xs text-gray-500">
                                    {userRole === 'student' ? 'Student Portal' : 'Admin Dashboard'}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setUserRole(null)}
                            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Switch Role
                        </button>
                    </div>
                </div>
            </nav>

            {/* Content */}
            {userRole === 'student' ? (
                <div className="py-8">
                    <StudentReportForm onSubmitReport={handleSubmitReport} />
                </div>
            ) : (
                <AdminDashboard />
            )}
        </div>
    );
}

export default Login;
