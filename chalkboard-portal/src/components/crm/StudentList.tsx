import React, { useState, useEffect } from 'react';
import { studentsApi } from '../../api';
import type { Student } from '../../types';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

export const StudentList: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState('');

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const data = await studentsApi.getAll();
            setStudents(data.students);
            setError(null);
        } catch (err) {
            setError('Failed to load students');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const filteredStudents = students.filter(student =>
        student.user.firstName.toLowerCase().includes(search.toLowerCase()) ||
        student.user.lastName.toLowerCase().includes(search.toLowerCase()) ||
        student.studentNumber.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <div>Loading students...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="crm-list">
            <div className="list-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <Input
                    type="text"
                    placeholder="Search students..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button onClick={fetchStudents}>Refresh</Button>
            </div>

            <div className="grid">
                {filteredStudents.map(student => (
                    <Card key={student.id} className="student-card">
                        <h3>{student.user.firstName} {student.user.lastName}</h3>
                        <p><strong>ID:</strong> {student.studentNumber}</p>
                        <p><strong>Email:</strong> {student.user.email}</p>
                        <p><strong>Status:</strong> {student.status}</p>
                    </Card>
                ))}
            </div>
        </div>
    );
};
