import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './ParentDashboard.css';

interface Child {
    id: number;
    student: {
        id: number;
        studentNumber: string;
        user: {
            firstName: string;
            lastName: string;
        };
        class: {
            grade: string;
            section: string;
        };
    };
    canViewGrades: boolean;
    canViewAttendance: boolean;
    canViewFees: boolean;
    canViewHomework: boolean;
}

interface PerformanceData {
    results?: any[];
    attendance?: any[];
    fees?: any[];
    homeworkSubmissions?: any[];
}

export const ParentDashboard: React.FC = () => {
    const { user } = useAuth();
    const [children, setChildren] = useState<Child[]>([]);
    const [selectedChild, setSelectedChild] = useState<number | null>(null);
    const [performanceData, setPerformanceData] = useState<PerformanceData | null>(null);
    const [activeTab, setActiveTab] = useState<'overview' | 'grades' | 'attendance' | 'fees' | 'homework'>('overview');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchChildren();
    }, []);

    useEffect(() => {
        if (selectedChild) {
            fetchPerformanceData(selectedChild);
        }
    }, [selectedChild]);

    const fetchChildren = async () => {
        try {
            setLoading(true);
            const parentId = user?.id; // Assuming user has parent ID
            const response = await fetch(`http://localhost:3000/api/chalkboard/parents/${parentId}/children`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            setChildren(data);
            if (data.length > 0) {
                setSelectedChild(data[0].student.id);
            }
        } catch (error) {
            console.error('Error fetching children:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchPerformanceData = async (studentId: number) => {
        try {
            const parentId = user?.id;
            const response = await fetch(`http://localhost:3000/api/chalkboard/parents/${parentId}/children/${studentId}/performance`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            setPerformanceData(data);
        } catch (error) {
            console.error('Error fetching performance data:', error);
        }
    };

    const calculateAttendanceRate = () => {
        if (!performanceData?.attendance || performanceData.attendance.length === 0) return 0;
        const present = performanceData.attendance.filter((a: any) => a.status === 'PRESENT').length;
        return Math.round((present / performanceData.attendance.length) * 100);
    };

    const calculateAverageGrade = () => {
        if (!performanceData?.results || performanceData.results.length === 0) return 0;
        const total = performanceData.results.reduce((sum: number, r: any) => sum + r.marksObtained, 0);
        return Math.round(total / performanceData.results.length);
    };

    const getPendingFees = () => {
        if (!performanceData?.fees) return 0;
        return performanceData.fees
            .filter((f: any) => f.status === 'PENDING' || f.status === 'OVERDUE')
            .reduce((sum: number, f: any) => sum + f.amount, 0);
    };

    const getPendingHomework = () => {
        if (!performanceData?.homeworkSubmissions) return 0;
        return performanceData.homeworkSubmissions.filter((h: any) => h.status === 'PENDING').length;
    };

    const selectedChildData = children.find(c => c.student.id === selectedChild);

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="parent-dashboard">
            <h1>Parent Portal</h1>

            <div className="children-selector">
                {children.map(child => (
                    <button
                        key={child.student.id}
                        className={`child-btn ${selectedChild === child.student.id ? 'active' : ''}`}
                        onClick={() => setSelectedChild(child.student.id)}
                    >
                        <div className="child-name">
                            {child.student.user.firstName} {child.student.user.lastName}
                        </div>
                        <div className="child-class">
                            {child.student.class.grade}-{child.student.class.section}
                        </div>
                    </button>
                ))}
            </div>

            {selectedChildData && performanceData && (
                <>
                    <div className="overview-cards">
                        {selectedChildData.canViewGrades && (
                            <div className="stat-card">
                                <h3>Average Grade</h3>
                                <div className="stat-value">{calculateAverageGrade()}%</div>
                                <div className="stat-label">{performanceData.results?.length || 0} exams</div>
                            </div>
                        )}
                        {selectedChildData.canViewAttendance && (
                            <div className="stat-card">
                                <h3>Attendance</h3>
                                <div className="stat-value">{calculateAttendanceRate()}%</div>
                                <div className="stat-label">Last 30 days</div>
                            </div>
                        )}
                        {selectedChildData.canViewFees && (
                            <div className="stat-card">
                                <h3>Pending Fees</h3>
                                <div className="stat-value">₹{getPendingFees()}</div>
                                <div className="stat-label">{performanceData.fees?.length || 0} total fees</div>
                            </div>
                        )}
                        {selectedChildData.canViewHomework && (
                            <div className="stat-card">
                                <h3>Pending Homework</h3>
                                <div className="stat-value">{getPendingHomework()}</div>
                                <div className="stat-label">{performanceData.homeworkSubmissions?.length || 0} total</div>
                            </div>
                        )}
                    </div>

                    <div className="tabs">
                        <button
                            className={activeTab === 'overview' ? 'active' : ''}
                            onClick={() => setActiveTab('overview')}
                        >
                            Overview
                        </button>
                        {selectedChildData.canViewGrades && (
                            <button
                                className={activeTab === 'grades' ? 'active' : ''}
                                onClick={() => setActiveTab('grades')}
                            >
                                Grades
                            </button>
                        )}
                        {selectedChildData.canViewAttendance && (
                            <button
                                className={activeTab === 'attendance' ? 'active' : ''}
                                onClick={() => setActiveTab('attendance')}
                            >
                                Attendance
                            </button>
                        )}
                        {selectedChildData.canViewFees && (
                            <button
                                className={activeTab === 'fees' ? 'active' : ''}
                                onClick={() => setActiveTab('fees')}
                            >
                                Fees
                            </button>
                        )}
                        {selectedChildData.canViewHomework && (
                            <button
                                className={activeTab === 'homework' ? 'active' : ''}
                                onClick={() => setActiveTab('homework')}
                            >
                                Homework
                            </button>
                        )}
                    </div>

                    <div className="tab-content">
                        {activeTab === 'overview' && (
                            <div className="overview-section">
                                <h2>Student Information</h2>
                                <div className="info-grid">
                                    <div className="info-item">
                                        <span className="label">Student Number:</span>
                                        <span className="value">{selectedChildData.student.studentNumber}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="label">Class:</span>
                                        <span className="value">
                                            {selectedChildData.student.class.grade}-{selectedChildData.student.class.section}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'grades' && selectedChildData.canViewGrades && (
                            <div className="grades-section">
                                <h2>Recent Exam Results</h2>
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>Subject</th>
                                            <th>Exam Date</th>
                                            <th>Marks Obtained</th>
                                            <th>Total Marks</th>
                                            <th>Percentage</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {performanceData.results?.map((result: any) => (
                                            <tr key={result.id}>
                                                <td>{result.exam.subject.name}</td>
                                                <td>{new Date(result.exam.date).toLocaleDateString()}</td>
                                                <td>{result.marksObtained}</td>
                                                <td>{result.exam.totalMarks}</td>
                                                <td>{Math.round((result.marksObtained / result.exam.totalMarks) * 100)}%</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {activeTab === 'attendance' && selectedChildData.canViewAttendance && (
                            <div className="attendance-section">
                                <h2>Attendance Records</h2>
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {performanceData.attendance?.map((record: any) => (
                                            <tr key={record.id}>
                                                <td>{new Date(record.date).toLocaleDateString()}</td>
                                                <td>
                                                    <span className={`status-badge ${record.status.toLowerCase()}`}>
                                                        {record.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {activeTab === 'fees' && selectedChildData.canViewFees && (
                            <div className="fees-section">
                                <h2>Fee Records</h2>
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>Description</th>
                                            <th>Amount</th>
                                            <th>Due Date</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {performanceData.fees?.map((fee: any) => (
                                            <tr key={fee.id}>
                                                <td>{fee.description || 'School Fee'}</td>
                                                <td>₹{fee.amount}</td>
                                                <td>{new Date(fee.dueDate).toLocaleDateString()}</td>
                                                <td>
                                                    <span className={`status-badge ${fee.status.toLowerCase()}`}>
                                                        {fee.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {activeTab === 'homework' && selectedChildData.canViewHomework && (
                            <div className="homework-section">
                                <h2>Homework Submissions</h2>
                                <div className="homework-list">
                                    {performanceData.homeworkSubmissions?.map((submission: any) => (
                                        <div key={submission.id} className="homework-item">
                                            <h4>{submission.homework.subject.name}: {submission.homework.title}</h4>
                                            <p>Due: {new Date(submission.homework.dueDate).toLocaleDateString()}</p>
                                            <div className="homework-status">
                                                <span className={`status-badge ${submission.status.toLowerCase()}`}>
                                                    {submission.status}
                                                </span>
                                                {submission.grade && (
                                                    <span className="grade">Grade: {submission.grade}</span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
