import React, { useState, useEffect } from 'react';
import { adminApi } from '../../api/client';
import './SystemAnalytics.css';

interface AnalyticsData {
    users: {
        total: number;
        students: number;
        teachers: number;
        parents: number;
    };
    academics: {
        classes: number;
        subjects: number;
    };
    enrollment: {
        recentEnrollments: number;
    };
    fees: {
        total: number;
        collected: number;
        pending: number;
        overdue: number;
    };
    attendance: {
        present: number;
        absent: number;
        late: number;
        excused: number;
        total: number;
        attendanceRate: number;
    };
}

interface EnrollmentTrend {
    month: string;
    count: number;
}

interface ClassDistribution {
    name: string;
    studentCount: number;
}

export const SystemAnalytics: React.FC = () => {
    const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
    const [enrollmentTrends, setEnrollmentTrends] = useState<EnrollmentTrend[]>([]);
    const [classDistribution, setClassDistribution] = useState<ClassDistribution[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            setLoading(true);
            const [analyticsRes, trendsRes, distributionRes] = await Promise.all([
                adminApi.getSystemAnalytics(),
                adminApi.getEnrollmentTrends(6),
                adminApi.getClassDistribution()
            ]);
            setAnalytics(analyticsRes.data);
            setEnrollmentTrends(trendsRes.data);
            setClassDistribution(distributionRes.data);
        } catch (error) {
            console.error('Failed to fetch analytics:', error);
            alert('Failed to load analytics data');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="loading">Loading analytics...</div>;
    if (!analytics) return <div className="error">Failed to load analytics</div>;

    return (
        <div className="system-analytics">
            <h1>System Analytics</h1>

            <div className="analytics-grid">
                {/* User Statistics */}
                <div className="analytics-section">
                    <h2>User Statistics</h2>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-value">{analytics.users.total}</div>
                            <div className="stat-label">Total Users</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">{analytics.users.students}</div>
                            <div className="stat-label">Students</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">{analytics.users.teachers}</div>
                            <div className="stat-label">Teachers</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">{analytics.users.parents}</div>
                            <div className="stat-label">Parents</div>
                        </div>
                    </div>
                </div>

                {/* Academic Statistics */}
                <div className="analytics-section">
                    <h2>Academic Overview</h2>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-value">{analytics.academics.classes}</div>
                            <div className="stat-label">Total Classes</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">{analytics.academics.subjects}</div>
                            <div className="stat-label">Total Subjects</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">{analytics.enrollment.recentEnrollments}</div>
                            <div className="stat-label">Recent Enrollments</div>
                        </div>
                    </div>
                </div>

                {/* Fee Statistics */}
                <div className="analytics-section">
                    <h2>Fee Collection</h2>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-value">₹{analytics.fees.total.toLocaleString()}</div>
                            <div className="stat-label">Total Fees</div>
                        </div>
                        <div className="stat-card success">
                            <div className="stat-value">₹{analytics.fees.collected.toLocaleString()}</div>
                            <div className="stat-label">Collected</div>
                        </div>
                        <div className="stat-card warning">
                            <div className="stat-value">₹{analytics.fees.pending.toLocaleString()}</div>
                            <div className="stat-label">Pending</div>
                        </div>
                        <div className="stat-card danger">
                            <div className="stat-value">₹{analytics.fees.overdue.toLocaleString()}</div>
                            <div className="stat-label">Overdue</div>
                        </div>
                    </div>
                </div>

                {/* Attendance Statistics */}
                <div className="analytics-section">
                    <h2>Attendance (Last 30 Days)</h2>
                    <div className="attendance-summary">
                        <div className="attendance-rate">
                            <div className="rate-circle">
                                <div className="rate-value">{analytics.attendance.attendanceRate}%</div>
                            </div>
                            <div className="rate-label">Overall Attendance Rate</div>
                        </div>
                        <div className="attendance-breakdown">
                            <div className="breakdown-item">
                                <span className="label">Present:</span>
                                <span className="value">{analytics.attendance.present}</span>
                            </div>
                            <div className="breakdown-item">
                                <span className="label">Absent:</span>
                                <span className="value">{analytics.attendance.absent}</span>
                            </div>
                            <div className="breakdown-item">
                                <span className="label">Late:</span>
                                <span className="value">{analytics.attendance.late}</span>
                            </div>
                            <div className="breakdown-item">
                                <span className="label">Excused:</span>
                                <span className="value">{analytics.attendance.excused}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enrollment Trends */}
                <div className="analytics-section full-width">
                    <h2>Enrollment Trends (Last 6 Months)</h2>
                    <div className="chart-container">
                        {enrollmentTrends.length > 0 ? (
                            <div className="bar-chart">
                                {enrollmentTrends.map(trend => (
                                    <div key={trend.month} className="bar-item">
                                        <div
                                            className="bar"
                                            style={{
                                                height: `${(trend.count / Math.max(...enrollmentTrends.map(t => t.count))) * 100}%`
                                            }}
                                        >
                                            <span className="bar-value">{trend.count}</span>
                                        </div>
                                        <div className="bar-label">{trend.month}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No enrollment data available</p>
                        )}
                    </div>
                </div>

                {/* Class Distribution */}
                <div className="analytics-section full-width">
                    <h2>Class Distribution</h2>
                    <div className="class-distribution">
                        {classDistribution.map(cls => (
                            <div key={cls.name} className="class-item">
                                <div className="class-name">{cls.name}</div>
                                <div className="class-bar">
                                    <div
                                        className="class-bar-fill"
                                        style={{
                                            width: `${(cls.studentCount / Math.max(...classDistribution.map(c => c.studentCount))) * 100}%`
                                        }}
                                    ></div>
                                </div>
                                <div className="class-count">{cls.studentCount} students</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
