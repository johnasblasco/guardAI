import { useState } from 'react';
import { Heart, Shield, UserCircle, Activity, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import StudentDashboard from '@/features/student/pages/StudentDashboard';
import AdminDashboard from '@/features/admin/pages/AdminDashboard';
import type { UserRole } from '@/types/index';

type LoginStage = 'role-selection' | 'student-login' | 'admin-login';

function Login() {
    const [userRole, setUserRole] = useState<UserRole | null>(null);
    const [loginStage, setLoginStage] = useState<LoginStage>('role-selection');
    const [showPassword, setShowPassword] = useState(false);

    // Student login state
    const [studentEmail, setStudentEmail] = useState('');
    const [studentPassword, setStudentPassword] = useState('');
    const [studentError, setStudentError] = useState('');

    // Admin login state
    const [adminEmail, setAdminEmail] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [adminError, setAdminError] = useState('');

    const handleStudentLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Demo credentials - in real app, validate against backend
        if (studentEmail === 'student@example.com' && studentPassword === 'student123') {
            setUserRole('student');
            setLoginStage('role-selection'); // Reset login stage
        } else {
            setStudentError('Invalid credentials. Use student@example.com / student123 for demo');
        }
    };

    const handleAdminLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Demo credentials - in real app, validate against backend
        if (adminEmail === 'admin@example.com' && adminPassword === 'admin123') {
            setUserRole('admin');
            setLoginStage('role-selection'); // Reset login stage
        } else {
            setAdminError('Invalid credentials. Use admin@example.com / admin123 for demo');
        }
    };

    const goBackToRoleSelection = () => {
        setLoginStage('role-selection');
        setStudentEmail('');
        setStudentPassword('');
        setAdminEmail('');
        setAdminPassword('');
        setStudentError('');
        setAdminError('');
    };

    // If user is logged in, show dashboard
    if (userRole) {
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
                                onClick={() => {
                                    setUserRole(null);
                                    setLoginStage('role-selection');
                                }}
                                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Content */}
                {userRole === 'student' ? (
                    <div className="py-8">
                        <StudentDashboard />
                    </div>
                ) : (
                    <AdminDashboard />
                )}
            </div>
        );
    }

    // Show login pages based on loginStage
    switch (loginStage) {
        case 'student-login':
            return (
                <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6">
                    <div className="max-w-md w-full">
                        <button
                            onClick={goBackToRoleSelection}
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Back to role selection</span>
                        </button>

                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <div className="text-center mb-8">
                                <div className="inline-flex p-3 bg-blue-100 rounded-xl mb-4">
                                    <UserCircle className="w-12 h-12 text-blue-600" />
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Login</h1>
                                <p className="text-gray-600">Access your health monitoring portal</p>
                            </div>

                            <form onSubmit={handleStudentLogin} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Student Email
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            value={studentEmail}
                                            onChange={(e) => setStudentEmail(e.target.value)}
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            placeholder="student@example.com"
                                            required
                                            autoComplete="email"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={studentPassword}
                                            onChange={(e) => setStudentPassword(e.target.value)}
                                            className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            placeholder="Enter your password"
                                            required
                                            autoComplete="current-password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                            ) : (
                                                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {studentError && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                        {studentError}
                                    </div>
                                )}

                                <div className="flex items-center justify-between">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">Remember me</span>
                                    </label>
                                    <a href="#" className="text-sm  text-blue-600 hover:text-blue-800">
                                        create account!
                                    </a>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-100 transition-all duration-200 font-medium"
                                >
                                    Sign in to Student Portal
                                </button>

                                <div className="text-center text-sm text-gray-600">
                                    <p>Demo credentials:</p>
                                    <p className="font-mono text-xs bg-gray-100 p-2 rounded mt-1">
                                        student@example.com / student123
                                    </p>
                                </div>
                            </form>

                            <div className="mt-8 pt-8 border-t border-gray-200">
                                <p className="text-center text-sm text-gray-600">
                                    By signing in, you agree to our{' '}
                                    <a href="#" className="text-blue-600 hover:text-blue-800">
                                        Privacy Policy
                                    </a>
                                    {' '}and{' '}
                                    <a href="#" className="text-blue-600 hover:text-blue-800">
                                        Terms of Service
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            );

        case 'admin-login':
            return (
                <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center p-6">
                    <div className="max-w-md w-full">
                        <button
                            onClick={goBackToRoleSelection}
                            className="flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-8 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Back to role selection</span>
                        </button>

                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <div className="text-center mb-8">
                                <div className="inline-flex p-3 bg-purple-100 rounded-xl mb-4">
                                    <Shield className="w-12 h-12 text-purple-600" />
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Portal</h1>
                                <p className="text-gray-600">Secure access to health monitoring dashboard</p>
                                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm text-purple-700">Encrypted Connection</span>
                                </div>
                            </div>

                            <form onSubmit={handleAdminLogin} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Admin Email
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            value={adminEmail}
                                            onChange={(e) => setAdminEmail(e.target.value)}
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                                            placeholder="admin@example.com"
                                            required
                                            autoComplete="email"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={adminPassword}
                                            onChange={(e) => setAdminPassword(e.target.value)}
                                            className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                                            placeholder="Enter your password"
                                            required
                                            autoComplete="current-password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                            ) : (
                                                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {adminError && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                        {adminError}
                                    </div>
                                )}

                                <div className="flex items-center justify-between">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">Remember this device</span>
                                    </label>
                                    <a href="#" className="text-sm text-purple-600 hover:text-purple-800">
                                        Forgot password?
                                    </a>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-4 rounded-lg hover:from-purple-700 hover:to-purple-800 focus:ring-4 focus:ring-purple-100 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                                >
                                    Access Admin Dashboard
                                </button>

                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-700 mb-2">
                                        <strong>Security Note:</strong> Admin access is restricted to authorized personnel only.
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        Demo credentials: admin@example.com / admin123
                                    </p>
                                </div>
                            </form>

                            <div className="mt-8 pt-8 border-t border-gray-200">
                                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                                    <Shield className="w-4 h-4" />
                                    <span>Two-factor authentication recommended for production</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );

        default:
            // Role selection page
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
                                onClick={() => setLoginStage('student-login')}
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
                                onClick={() => setLoginStage('admin-login')}
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
}

export default Login;