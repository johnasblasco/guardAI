import { useState } from 'react';
import { ArrowLeft, Activity, TrendingDown } from 'lucide-react';
import { StudentProfile } from './StudentProfile';
import { MyReports } from './MyReports';
import { HealthTips } from './HealthTips';
import { StudentReportForm } from './StudentReportForm';
import type { HealthReport } from '@/types/index';

interface StudentDashboardProps {
    studentReports: HealthReport[];
    onSubmitReport: (report: Omit<HealthReport, 'id' | 'userId' | 'timestamp' | 'status'>) => void;
}

export function StudentDashboard({ studentReports, onSubmitReport }: StudentDashboardProps) {
    const [showReportForm, setShowReportForm] = useState(false);

    // Mock student data
    const student = {
        name: 'Alex Johnson',
        email: 'alex.johnson@school.edu',
        gradeLevel: 'Grade 10',
        studentId: 'STU-2024-1234',
        defaultLocation: {
            building: 'Main Building',
            room: '201',
            seatNumber: 'A12',
        },
    };

    const handleSubmitReport = (report: Omit<HealthReport, 'id' | 'userId' | 'timestamp' | 'status'>) => {
        onSubmitReport(report);
        setShowReportForm(false);
    };

    // If showing report form, display it full screen
    if (showReportForm) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
                <div className="max-w-4xl mx-auto p-6">
                    <button
                        onClick={() => setShowReportForm(false)}
                        className="mb-6 flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded-lg transition-all border-2 border-gray-200"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </button>
                    <StudentReportForm onSubmitReport={handleSubmitReport} />
                </div>
            </div>
        );
    }

    // Calculate stats
    const pendingReports = studentReports.filter(r => r.status === 'pending').length;
    const reviewedReports = studentReports.filter(r => r.status === 'reviewed').length;
    const resolvedReports = studentReports.filter(r => r.status === 'resolved').length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
            <div className="max-w-7xl mx-auto p-6 space-y-6">
                {/* Welcome Header */}
                <div className="mb-8">
                    <h1 className="text-3xl text-gray-900 mb-2">Welcome back, {student.name.split(' ')[0]}! 👋</h1>
                    <p className="text-gray-600">Track your health and stay informed</p>
                </div>

                {/* Profile Section */}
                <StudentProfile student={student} />

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-gray-100">
                        <div className="flex items-start justify-between mb-2">
                            <div className="p-2 bg-orange-50 rounded-lg">
                                <Activity className="w-5 h-5 text-orange-600" />
                            </div>
                            <span className="text-2xl text-gray-900">{pendingReports}</span>
                        </div>
                        <h3 className="text-sm text-gray-600">Pending Review</h3>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-gray-100">
                        <div className="flex items-start justify-between mb-2">
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <Activity className="w-5 h-5 text-blue-600" />
                            </div>
                            <span className="text-2xl text-gray-900">{reviewedReports}</span>
                        </div>
                        <h3 className="text-sm text-gray-600">Under Review</h3>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-gray-100">
                        <div className="flex items-start justify-between mb-2">
                            <div className="p-2 bg-green-50 rounded-lg">
                                <TrendingDown className="w-5 h-5 text-green-600" />
                            </div>
                            <span className="text-2xl text-gray-900">{resolvedReports}</span>
                        </div>
                        <h3 className="text-sm text-gray-600">Resolved</h3>
                    </div>
                </div>


                {/* Health Status Alert */}
                {pendingReports === 0 && studentReports.length > 0 && (
                    <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-green-600 rounded-lg">
                                <TrendingDown className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-green-900 mb-1">All Clear!</h3>
                                <p className="text-sm text-green-700">
                                    No pending health reports. Keep maintaining good health practices.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* My Reports Section */}
                <div id="my-reports">
                    <MyReports reports={studentReports} />
                </div>

                {/* Health Tips */}
                <HealthTips />

                {/* Privacy Notice */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-600 rounded-lg flex-shrink-0">
                            <Activity className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-blue-900 mb-2">Your Privacy Matters</h3>
                            <p className="text-sm text-blue-700 mb-3">
                                Your health information is confidential and only shared with authorized school health personnel.
                                We use anonymized data for outbreak detection to keep everyone safe.
                            </p>
                            <ul className="space-y-1 text-xs text-blue-600">
                                <li>• Reports are encrypted and securely stored</li>
                                <li>• Only health office staff can view individual reports</li>
                                <li>• Predictive analytics use anonymized aggregate data</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
