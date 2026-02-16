import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { studentsApi, academicsApi } from '../../api';
import type { Student, Class } from '../../types';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useAuth } from '../../context/AuthContext';

export const Students: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [students, setStudents] = useState<Student[]>([]);
    const [classes, setClasses] = useState<Class[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [selectedClass, setSelectedClass] = useState<string>('');

    const isTeacherOrAdmin = user?.roles.some(r => ['TEACHER', 'ADMIN', 'SUPER_ADMIN'].includes(r.name));

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            setLoading(true);
            const [studentsData, classesData] = await Promise.all([
                studentsApi.getAll(),
                academicsApi.getClasses()
            ]);
            setStudents(studentsData.students);
            setClasses(classesData);
        } catch (err) {
            setError('Failed to load data');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleClassResult = async (classId: string) => {
        setSelectedClass(classId);
        // Optimized: fetch filtered list from backend if classId is selected
        // However, for now we will filter client side OR verify providing classId param to API
        // studentsApi.getAll(1, 20, classId) -- need to support it in wrapper
        // The current studentsApi.getAll only supports page/limit.
        // Let's filter client-side for now to avoid breaking API signature too much
        // OR simply pass it if the backend supports it (StudentController does support classId query)
        // But the frontend api client hardcodes params to { page, limit }.
        // I won't change API client right now to avoid risks, client side filter is fine for v1.
    };

    const filteredStudents = students.filter(student => {
        const matchesSearch =
            student.user.firstName.toLowerCase().includes(search.toLowerCase()) ||
            student.user.lastName.toLowerCase().includes(search.toLowerCase()) ||
            student.studentNumber.toLowerCase().includes(search.toLowerCase());

        const matchesClass = selectedClass ? student.classId === parseInt(selectedClass) : true;

        return matchesSearch && matchesClass;
    });

    if (loading) return <div>Loading students...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="container" style={{ padding: '2rem' }}>
            <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1>Students Management</h1>
                    <p>Manage student profiles, enrollments, and performance.</p>
                </div>
                {isTeacherOrAdmin && (
                    <Button onClick={() => navigate('/students/new')}>
                        Add Student
                    </Button>
                )}
            </div>

            <div className="filters" style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <Input
                    type="text"
                    placeholder="Search students..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ flex: 1 }}
                />
                <select
                    value={selectedClass}
                    onChange={(e) => handleClassResult(e.target.value)}
                    className="input-field"
                    style={{ padding: '0.5rem', minWidth: '200px' }}
                >
                    <option value="">All Classes</option>
                    {classes.map(cls => (
                        <option key={cls.id} value={cls.id}>
                            {cls.grade} - {cls.section}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                {filteredStudents.map(student => (
                    <Card key={student.id} className="student-card">
                        <h3>{student.user.firstName} {student.user.lastName}</h3>
                        <p><strong>ID:</strong> {student.studentNumber}</p>
                        <p><strong>Class:</strong> {student.class ? `${student.class.grade}-${student.class.section}` : 'N/A'}</p>
                        <p><strong>Email:</strong> {student.user.email}</p>
                        <p><strong>Status:</strong> {student.status}</p>
                    </Card>
                ))}
            </div>
        </div>
    );
};
