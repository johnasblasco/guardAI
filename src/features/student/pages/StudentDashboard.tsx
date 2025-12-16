import { useState } from 'react';
import { ArrowLeft, Activity, TrendingDown, PlusCircle } from 'lucide-react';
import { StudentProfile } from './StudentProfile';
import { MyReports } from './MyReports';
import { HealthTips } from './HealthTips';
import { StudentReportForm } from './StudentReportForm';
import type { HealthReport } from '@/types/index';

export default function StudentDashboard() {
    const [showReportForm, setShowReportForm] = useState(false);
    const [studentReports, setStudentReports] = useState<HealthReport[]>([
        // Mock initial reports
        {
            id: '1',
            userId: 'user-123',
            userGradeLevel: 'Grade 10',
            symptoms: ['fever', 'cough'],
            severity: 'moderate',
            dateOfOnset: '2024-03-10T10:00:00Z',
            confirmedDisease: false,
            location: {
                building: 'Main Building',
                room: '201',
                seatNumber: 'A12',
            },
            timestamp: '2024-03-10T10:00:00Z',
            status: 'pending',
        },
        {
            id: '2',
            userId: 'user-123',
            userGradeLevel: 'Grade 10',
            symptoms: ['headache'],
            severity: 'mild',
            dateOfOnset: '2024-03-08T09:00:00Z',
            confirmedDisease: false,
            location: {
                building: 'Science Building',
                room: '105',
                seatNumber: 'B7',
            },
            timestamp: '2024-03-08T09:00:00Z',
            status: 'resolved',
        },
    ]);

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


    const handleSubmitReport = (reportData: Omit<HealthReport, 'id' | 'userId' | 'timestamp' | 'status'>) => {
        const newReport: HealthReport = {
            ...reportData,
            id: `report-${Date.now()}`,
            userId: 'user-123',
            timestamp: new Date().toISOString(),
            status: 'pending',
        };

        setStudentReports(prev => [...prev, newReport]);
        // No setShowReportForm here - let the form handle it
    };



    // Calculate stats
    const pendingReports = studentReports.filter(r => r.status === 'pending').length;
    const reviewedReports = studentReports.filter(r => r.status === 'reviewed').length;
    const resolvedReports = studentReports.filter(r => r.status === 'resolved').length;

    // If showing report form, display it as a separate "page"
    if (showReportForm) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
                <div className="max-w-4xl mx-auto p-6">
                    {/* Back Navigation Header */}
                    <div className="mb-8">
                        <button
                            onClick={() => setShowReportForm(false)}
                            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded-lg transition-all border-2 border-gray-200 mb-6"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Dashboard
                        </button>

                        {/* Page Header */}
                        <div>
                            <h1 className="text-3xl text-gray-900 mb-2">New Health Report</h1>
                            <p className="text-gray-600">
                                Fill out this form to report your symptoms. This helps us monitor health trends and keep everyone safe.
                            </p>
                        </div>
                    </div>

                    {/* Report Form */}
                    <StudentReportForm
                        onSubmitReport={handleSubmitReport}
                        onClose={() => setShowReportForm(false)} // Add this
                    />

                    {/* Additional Info */}
                    <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-600 rounded-lg flex-shrink-0">
                                <ArrowLeft className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-blue-900 mb-2">Important Information</h3>
                                <p className="text-sm text-blue-700">
                                    Your report will be reviewed by the school health office within 24 hours.
                                    If immediate attention is needed, please visit the health office directly.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Main Dashboard View
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
            <div className="max-w-7xl mx-auto p-6 space-y-6">
                {/* Welcome Header with New Report Button */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl text-gray-900 mb-2">Welcome back, {student.name.split(' ')[0]}! 👋</h1>
                        <p className="text-gray-600">Track your health and stay informed</p>
                    </div>
                    <button
                        onClick={() => setShowReportForm(true)}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md self-start md:self-auto"
                    >
                        <PlusCircle className="w-5 h-5" />
                        New Health Report
                    </button>
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

                {/* Quick Report Card */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-xl mb-2">Feeling unwell?</h3>
                            <p className="text-blue-100 mb-4 md:mb-0">
                                Report symptoms quickly to help prevent spread
                            </p>
                        </div>
                        <button
                            onClick={() => setShowReportForm(true)}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium whitespace-nowrap"
                        >
                            <PlusCircle className="w-5 h-5" />
                            Report Symptoms
                        </button>
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