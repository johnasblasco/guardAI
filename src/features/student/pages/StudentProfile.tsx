import { User, Mail, GraduationCap, MapPin, Calendar, Shield } from 'lucide-react';

interface StudentProfileProps {
    student: {
        name: string;
        email: string;
        gradeLevel: string;
        studentId: string;
        defaultLocation?: {
            building: string;
            room: string;
            seatNumber: string;
        };
    };
}

export function StudentProfile({ student }: StudentProfileProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border-2 border-gray-100 p-6">
            <div className="flex items-start gap-6">
                {/* Avatar */}
                <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
                        <User className="w-10 h-10 text-white" />
                    </div>
                </div>

                {/* Profile Info */}
                <div className="flex-1">
                    <h2 className="text-2xl text-gray-900 mb-1">{student.name}</h2>
                    <p className="text-gray-600 mb-4">Student Portal</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <Mail className="w-4 h-4 text-gray-600" />
                            <div>
                                <div className="text-xs text-gray-500">Email</div>
                                <div className="text-sm text-gray-900">{student.email}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <GraduationCap className="w-4 h-4 text-gray-600" />
                            <div>
                                <div className="text-xs text-gray-500">Grade Level</div>
                                <div className="text-sm text-gray-900">{student.gradeLevel}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <Shield className="w-4 h-4 text-gray-600" />
                            <div>
                                <div className="text-xs text-gray-500">Student ID</div>
                                <div className="text-sm text-gray-900">{student.studentId}</div>
                            </div>
                        </div>

                        {student.defaultLocation && (
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <MapPin className="w-4 h-4 text-gray-600" />
                                <div>
                                    <div className="text-xs text-gray-500">Primary Location</div>
                                    <div className="text-sm text-gray-900">
                                        {student.defaultLocation.building} - {student.defaultLocation.room}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
