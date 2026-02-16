import React, { useState, useEffect } from 'react';
import { teachersApi } from '../../api';
import type { Teacher } from '../../types';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

export const TeacherList: React.FC = () => {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTeachers = async () => {
        try {
            setLoading(true);
            const data = await teachersApi.getAll();
            setTeachers(data.teachers);
            setError(null);
        } catch (err) {
            setError('Failed to load teachers');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeachers();
    }, []);

    if (loading) return <div>Loading teachers...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="crm-list">
            <div className="list-header" style={{ marginBottom: '1rem' }}>
                <Button onClick={fetchTeachers}>Refresh</Button>
            </div>

            <div className="grid">
                {teachers.map(teacher => (
                    <Card key={teacher.id} className="teacher-card">
                        <h3>{teacher.user.firstName} {teacher.user.lastName}</h3>
                        <p><strong>Employee ID:</strong> {teacher.employeeId}</p>
                        <p><strong>Email:</strong> {teacher.user.email}</p>
                        <p><strong>Qualification:</strong> {teacher.qualification}</p>
                    </Card>
                ))}
            </div>
        </div>
    );
};
