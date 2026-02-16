import React, { useState, useEffect } from 'react';
import { apiClient } from '../../api/client';
import { Card } from '../../components/common/Card';

interface Student {
    id: number;
    user: {
        firstName: string;
        lastName: string;
    };
}

interface AttendanceRecord {
    studentId: number;
    status: string;
    remarks: string;
}

export const TeacherAttendance: React.FC = () => {
    const [classes, setClasses] = useState<any[]>([]);
    const [selectedClass, setSelectedClass] = useState<any | null>(null);
    const [students, setStudents] = useState<Student[]>([]);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [attendance, setAttendance] = useState<Map<number, AttendanceRecord>>(new Map());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchClasses();
    }, []);

    useEffect(() => {
        if (selectedClass) {
            setStudents(selectedClass.students || []);
            // Initialize attendance records
            const initialAttendance = new Map<number, AttendanceRecord>();
            (selectedClass.students || []).forEach((student: Student) => {
                initialAttendance.set(student.id, {
                    studentId: student.id,
                    status: 'PRESENT',
                    remarks: ''
                });
            });
            setAttendance(initialAttendance);
        }
    }, [selectedClass]);

    const fetchClasses = async () => {
        try {
            const response = await apiClient.get('/academics/classes');
            setClasses(response.data);
        } catch (err) {
            console.error('Failed to fetch classes', err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = (studentId: number, status: string) => {
        setAttendance(prev => {
            const newMap = new Map(prev);
            const record = newMap.get(studentId);
            if (record) {
                newMap.set(studentId, { ...record, status });
            }
            return newMap;
        });
    };

    const handleRemarksChange = (studentId: number, remarks: string) => {
        setAttendance(prev => {
            const newMap = new Map(prev);
            const record = newMap.get(studentId);
            if (record) {
                newMap.set(studentId, { ...record, remarks });
            }
            return newMap;
        });
    };

    const handleSubmit = async () => {
        try {
            const promises = Array.from(attendance.values()).map(record =>
                apiClient.post('/academics/attendance', {
                    studentId: record.studentId,
                    date,
                    status: record.status,
                    remarks: record.remarks || undefined,
                })
            );
            await Promise.all(promises);
            alert('Attendance recorded successfully!');
        } catch (err) {
            console.error('Failed to record attendance', err);
            alert('Failed to record attendance');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container">
            <h1>Record Attendance</h1>

            <div className="section">
                <h2>Select Class</h2>
                <div className="grid">
                    {classes.map(cls => (
                        <Card
                            key={cls.id}
                            onClick={() => setSelectedClass(cls)}
                            style={{
                                cursor: 'pointer',
                                border: selectedClass?.id === cls.id ? '2px solid #007bff' : undefined
                            }}
                        >
                            <h3>Grade {cls.grade} - {cls.section}</h3>
                            <p><strong>Students:</strong> {cls._count?.students || 0}</p>
                            <p><strong>Teacher:</strong> {cls.teacher ? `${cls.teacher.user.firstName} ${cls.teacher.user.lastName}` : 'Unassigned'}</p>
                        </Card>
                    ))}
                </div>
            </div>

            {selectedClass && (
                <div className="section" style={{ marginTop: '2rem' }}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label><strong>Date:</strong></label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            style={{ marginLeft: '1rem', padding: '0.5rem' }}
                        />
                    </div>

                    <h2>Students - Grade {selectedClass.grade} {selectedClass.section}</h2>

                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #ddd' }}>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Student Name</th>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Status</th>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map(student => {
                                    const record = attendance.get(student.id);
                                    return (
                                        <tr key={student.id} style={{ borderBottom: '1px solid #eee' }}>
                                            <td style={{ padding: '1rem' }}>
                                                {student.user.firstName} {student.user.lastName}
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <select
                                                    value={record?.status || 'PRESENT'}
                                                    onChange={(e) => handleStatusChange(student.id, e.target.value)}
                                                    style={{ padding: '0.5rem', width: '150px' }}
                                                >
                                                    <option value="PRESENT">Present</option>
                                                    <option value="ABSENT">Absent</option>
                                                    <option value="LATE">Late</option>
                                                    <option value="EXCUSED">Excused</option>
                                                </select>
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <input
                                                    type="text"
                                                    value={record?.remarks || ''}
                                                    onChange={(e) => handleRemarksChange(student.id, e.target.value)}
                                                    placeholder="Optional remarks"
                                                    style={{ padding: '0.5rem', width: '100%' }}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <button
                        onClick={handleSubmit}
                        style={{ marginTop: '1rem', padding: '0.75rem 2rem', fontSize: '1rem' }}
                    >
                        Submit Attendance
                    </button>
                </div>
            )}
        </div>
    );
};
