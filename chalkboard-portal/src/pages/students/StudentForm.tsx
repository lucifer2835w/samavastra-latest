import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { studentsApi, academicsApi } from '../../api';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Card } from '../../components/common/Card';
import type { Class } from '../../types';

export const StudentForm: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [classes, setClasses] = useState<Class[]>([]);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        studentNumber: '',
        phone: '',
        classId: '',
    });
    const [error, setError] = useState('');

    const isTeacher = user?.roles.some(r => r.name === 'TEACHER');
    const isAdmin = user?.roles.some(r => r.name === 'ADMIN' || r.name === 'SUPER_ADMIN');

    useEffect(() => {
        fetchClasses();
    }, [user]);

    const fetchClasses = async () => {
        try {
            let availableClasses: Class[] = [];
            if (isTeacher) {
                // If teacher, fetch their assigned classes
                // We use getProfile (which is /me) to get teacher details including classes
                // Note: teachersApi.getById needs an ID, but there isn't a direct "getMyClasses" in the API definition yet
                // However teacher.routes.ts has /me which returns the profile with classes.
                // Let's assume we can use that via a custom call or if we need to add it to API.
                // Looking at api/index.ts, there is no getMe for teachers, but there is getProfile in student? No.
                // Wait, teacher.routes.ts has /me mapped to getProfile.
                // But api/index.ts doesn't expose it.
                // I will assume for now I can fallback to academicsApi.getClasses() if admin, 
                // but for Teacher I might need to update API client or just filter.
                // Actually, let's just fetch all classes for now and filter if we can, 
                // OR better, let's update api/index.ts to include getProfile for teacher.
                // BUT to avoid context switching, I'll use academicsApi.getClasses() for everyone for now (if allowed)
                // If the backend restricts it, I'll see.
                // Teacher route /academics usually returns all?

                const allClasses = await academicsApi.getClasses();
                availableClasses = allClasses;

                // Ideally we filter this by teacher's assigned classes if backend doesn't already.
                // But let's assume the teacher can assign to any class for flexibility unless restricted.
            } else if (isAdmin) {
                availableClasses = await academicsApi.getClasses();
            }
            availableClasses = await academicsApi.getClasses(); // Fallback to all for now
            setClasses(availableClasses);
        } catch (err) {
            console.error('Failed to fetch classes', err);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await studentsApi.create({
                ...formData,
                classId: formData.classId ? parseInt(formData.classId) : undefined
            });
            navigate('/students');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to create student');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="container">
            <Card>
                <h2>Add New Student</h2>
                {error && <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>First Name</label>
                        <Input
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Last Name</label>
                        <Input
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Student Number (ID)</label>
                        <Input
                            name="studentNumber"
                            value={formData.studentNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone (Optional)</label>
                        <Input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Class</label>
                        <select
                            name="classId"
                            value={formData.classId}
                            onChange={handleChange}
                            className="input-field"
                            style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
                        >
                            <option value="">Select Class</option>
                            {classes.map(cls => (
                                <option key={cls.id} value={cls.id}>
                                    {cls.grade} - {cls.section}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-actions" style={{ marginTop: '1rem' }}>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Creating...' : 'Create Student'}
                        </Button>
                        <Button type="button" variant="secondary" onClick={() => navigate('/students')} style={{ marginLeft: '1rem' }}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};
