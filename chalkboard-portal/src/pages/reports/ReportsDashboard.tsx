import React, { useState, useEffect } from 'react';
import './ReportsDashboard.css';
import { reportsApi, studentsApi, academicsApi } from '../../api';

interface Student {
    id: number;
    studentNumber: string;
    user: {
        firstName: string;
        lastName: string;
    };
}

interface Class {
    id: number;
    grade: string;
    section: string;
}

export const ReportsDashboard: React.FC = () => {
    const [reportType, setReportType] = useState<'student' | 'class' | 'attendance' | 'fees' | 'teacher'>('student');
    const [students, setStudents] = useState<Student[]>([]);
    const [classes, setClasses] = useState<Class[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
    const [selectedClass, setSelectedClass] = useState<number | null>(null);
    const [reportData, setReportData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [dateRange, setDateRange] = useState({
        startDate: '',
        endDate: '',
    });

    useEffect(() => {
        fetchStudents();
        fetchClasses();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await studentsApi.getAll();
            setStudents(response.students);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const fetchClasses = async () => {
        try {
            const response = await academicsApi.getClasses();
            setClasses(response);
        } catch (error) {
            console.error('Error fetching classes:', error);
        }
    };

    const generateReport = async () => {
        setLoading(true);
        try {
            let response;
            switch (reportType) {
                case 'student':
                    if (!selectedStudent) return;
                    response = await reportsApi.getStudentReport(selectedStudent);
                    break;
                case 'class':
                    if (!selectedClass) return;
                    response = await reportsApi.getClassReport(selectedClass);
                    break;
                case 'attendance':
                    response = await reportsApi.getAttendanceReport({
                        startDate: dateRange.startDate,
                        endDate: dateRange.endDate,
                        classId: selectedClass
                    });
                    break;
                case 'fees':
                    response = await reportsApi.getFeesReport({
                        startDate: dateRange.startDate,
                        endDate: dateRange.endDate
                    });
                    break;
                case 'teacher':
                    response = await reportsApi.getTeacherWorkload();
                    break;
            }

            if (response) {
                setReportData(response.data);
            }
        } catch (error) {
            console.error('Error generating report:', error);
            // alert('Failed to generate report'); // Optional: Add user feedback
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="reports-dashboard">
            <h1>Reports & Analytics</h1>

            <div className="report-selector">
                <div className="report-types">
                    <button
                        className={reportType === 'student' ? 'active' : ''}
                        onClick={() => setReportType('student')}
                    >
                        Student Report Card
                    </button>
                    <button
                        className={reportType === 'class' ? 'active' : ''}
                        onClick={() => setReportType('class')}
                    >
                        Class Performance
                    </button>
                    <button
                        className={reportType === 'attendance' ? 'active' : ''}
                        onClick={() => setReportType('attendance')}
                    >
                        Attendance Report
                    </button>
                    <button
                        className={reportType === 'fees' ? 'active' : ''}
                        onClick={() => setReportType('fees')}
                    >
                        Fee Collection
                    </button>
                    <button
                        className={reportType === 'teacher' ? 'active' : ''}
                        onClick={() => setReportType('teacher')}
                    >
                        Teacher Workload
                    </button>
                </div>

                <div className="report-filters">
                    {reportType === 'student' && (
                        <div className="filter-group">
                            <label>Select Student</label>
                            <select
                                value={selectedStudent || ''}
                                onChange={(e) => setSelectedStudent(Number(e.target.value))}
                            >
                                <option value="">Choose a student</option>
                                {students.map(student => (
                                    <option key={student.id} value={student.id}>
                                        {student.user.firstName} {student.user.lastName} ({student.studentNumber})
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {reportType === 'class' && (
                        <div className="filter-group">
                            <label>Select Class</label>
                            <select
                                value={selectedClass || ''}
                                onChange={(e) => setSelectedClass(Number(e.target.value))}
                            >
                                <option value="">Choose a class</option>
                                {classes.map(cls => (
                                    <option key={cls.id} value={cls.id}>
                                        {cls.grade}-{cls.section}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {(reportType === 'attendance' || reportType === 'fees') && (
                        <>
                            <div className="filter-group">
                                <label>Start Date</label>
                                <input
                                    type="date"
                                    value={dateRange.startDate}
                                    onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                                />
                            </div>
                            <div className="filter-group">
                                <label>End Date</label>
                                <input
                                    type="date"
                                    value={dateRange.endDate}
                                    onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                                />
                            </div>
                        </>
                    )}

                    {reportType === 'attendance' && (
                        <div className="filter-group">
                            <label>Class (Optional)</label>
                            <select
                                value={selectedClass || ''}
                                onChange={(e) => setSelectedClass(Number(e.target.value) || null)}
                            >
                                <option value="">All Classes</option>
                                {classes.map(cls => (
                                    <option key={cls.id} value={cls.id}>
                                        {cls.grade}-{cls.section}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <button className="btn-generate" onClick={generateReport} disabled={loading}>
                        {loading ? 'Generating...' : 'Generate Report'}
                    </button>
                </div>
            </div>

            {reportData && (
                <div className="report-content">
                    {reportType === 'student' && (
                        <div className="student-report">
                            <h2>Student Report Card</h2>
                            <div className="student-info">
                                <h3>{reportData.student.name}</h3>
                                <p>Student Number: {reportData.student.studentNumber}</p>
                                <p>Class: {reportData.student.class}</p>
                            </div>

                            <div className="report-sections">
                                <div className="section">
                                    <h4>Academic Performance</h4>
                                    <div className="stats-grid">
                                        <div className="stat">
                                            <span className="label">Average</span>
                                            <span className="value">{reportData.academics.gradeStats.average}%</span>
                                        </div>
                                        <div className="stat">
                                            <span className="label">Highest</span>
                                            <span className="value">{reportData.academics.gradeStats.highest}</span>
                                        </div>
                                        <div className="stat">
                                            <span className="label">Lowest</span>
                                            <span className="value">{reportData.academics.gradeStats.lowest}</span>
                                        </div>
                                        <div className="stat">
                                            <span className="label">Exams</span>
                                            <span className="value">{reportData.academics.gradeStats.count}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="section">
                                    <h4>Attendance</h4>
                                    <div className="stats-grid">
                                        <div className="stat">
                                            <span className="label">Attendance Rate</span>
                                            <span className="value">{reportData.attendance.stats.attendanceRate}%</span>
                                        </div>
                                        <div className="stat">
                                            <span className="label">Present</span>
                                            <span className="value">{reportData.attendance.stats.present}</span>
                                        </div>
                                        <div className="stat">
                                            <span className="label">Absent</span>
                                            <span className="value">{reportData.attendance.stats.absent}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="section">
                                    <h4>Fees</h4>
                                    <div className="stats-grid">
                                        <div className="stat">
                                            <span className="label">Total</span>
                                            <span className="value">₹{reportData.fees.stats.total}</span>
                                        </div>
                                        <div className="stat">
                                            <span className="label">Paid</span>
                                            <span className="value">₹{reportData.fees.stats.paid}</span>
                                        </div>
                                        <div className="stat">
                                            <span className="label">Pending</span>
                                            <span className="value">₹{reportData.fees.stats.pending}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {reportType === 'class' && (
                        <div className="class-report">
                            <h2>Class Performance Report</h2>
                            <h3>{reportData.class.name}</h3>
                            <p>Teacher: {reportData.class.teacher}</p>
                            <p>Total Students: {reportData.class.studentCount}</p>

                            <h4>Subject-wise Performance</h4>
                            <table className="report-table">
                                <thead>
                                    <tr>
                                        <th>Subject</th>
                                        <th>Average</th>
                                        <th>Highest</th>
                                        <th>Lowest</th>
                                        <th>Exams</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reportData.subjectPerformance.map((subject: any) => (
                                        <tr key={subject.subjectId}>
                                            <td>{subject.subjectName}</td>
                                            <td>{subject.stats.average}%</td>
                                            <td>{subject.stats.highest}</td>
                                            <td>{subject.stats.lowest}</td>
                                            <td>{subject.stats.count}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {reportType === 'attendance' && (
                        <div className="attendance-report">
                            <h2>Attendance Report</h2>
                            <div className="stats-summary">
                                <div className="stat">
                                    <span className="label">Attendance Rate</span>
                                    <span className="value">{reportData.stats.attendanceRate}%</span>
                                </div>
                                <div className="stat">
                                    <span className="label">Present</span>
                                    <span className="value">{reportData.stats.present}</span>
                                </div>
                                <div className="stat">
                                    <span className="label">Absent</span>
                                    <span className="value">{reportData.stats.absent}</span>
                                </div>
                                <div className="stat">
                                    <span className="label">Late</span>
                                    <span className="value">{reportData.stats.late}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {reportType === 'fees' && (
                        <div className="fees-report">
                            <h2>Fee Collection Report</h2>
                            <div className="stats-summary">
                                <div className="stat">
                                    <span className="label">Total</span>
                                    <span className="value">₹{reportData.stats.total}</span>
                                </div>
                                <div className="stat">
                                    <span className="label">Paid</span>
                                    <span className="value">₹{reportData.stats.paid}</span>
                                </div>
                                <div className="stat">
                                    <span className="label">Pending</span>
                                    <span className="value">₹{reportData.stats.pending}</span>
                                </div>
                                <div className="stat">
                                    <span className="label">Overdue</span>
                                    <span className="value">₹{reportData.stats.overdue}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {reportType === 'teacher' && (
                        <div className="teacher-report">
                            <h2>Teacher Workload Report</h2>
                            <div className="teacher-list">
                                {reportData.map((teacher: any) => (
                                    <div key={teacher.id} className="teacher-card">
                                        <h3>{teacher.name}</h3>
                                        <p>Employee ID: {teacher.employeeId}</p>
                                        <div className="teacher-stats">
                                            <div className="stat">
                                                <span className="label">Classes</span>
                                                <span className="value">{teacher.classCount}</span>
                                            </div>
                                            <div className="stat">
                                                <span className="label">Total Students</span>
                                                <span className="value">{teacher.totalStudents}</span>
                                            </div>
                                        </div>
                                        <div className="teacher-classes">
                                            <h5>Classes:</h5>
                                            {teacher.classes.map((cls: any) => (
                                                <span key={cls.id} className="class-badge">
                                                    {cls.name} ({cls.studentCount} students)
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
