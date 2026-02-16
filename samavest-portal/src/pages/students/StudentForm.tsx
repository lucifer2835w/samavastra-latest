import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { studentsApi } from '../../api';
import './StudentForm.css';

export const StudentForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        studentNumber: '',
        grade: '',
        status: 'ACTIVE',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEditMode) {
            fetchStudent();
        }
    }, [id]);

    const fetchStudent = async () => {
        try {
            setLoading(true);
            const student = await studentsApi.getById(Number(id));
            setFormData({
                firstName: student.user.firstName,
                lastName: student.user.lastName,
                email: student.user.email,
                password: '', // Don't populate password
                studentNumber: student.studentNumber,
                grade: student.grade || '',
                status: student.status,
            });
        } catch (err) {
            setError('Failed to fetch student details');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isEditMode) {
                // For update, we might need a different payload structure depending on API
                // For now, assuming the API handles it
                await studentsApi.update(Number(id), formData);
            } else {
                await studentsApi.create(formData);
            }
            navigate('/students');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to save student');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditMode && !formData.email) {
        return <div className="loading-state">Loading student details...</div>;
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>{isEditMode ? 'Edit Student' : 'Add New Student'}</h1>
                <button className="btn btn-secondary" onClick={() => navigate('/students')}>
                    Cancel
                </button>
            </div>

            <div className="card form-container">
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-section">
                        <h3>Personal Information</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    disabled={isEditMode} // Usually can't change email easily
                                />
                            </div>
                            {!isEditMode && (
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        minLength={6}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="form-section">
                        <h3>Academic Information</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="studentNumber">Student Number</label>
                                <input
                                    type="text"
                                    id="studentNumber"
                                    name="studentNumber"
                                    value={formData.studentNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="grade">Grade/Year</label>
                                <input
                                    type="text"
                                    id="grade"
                                    name="grade"
                                    value={formData.grade}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="status">Status</label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="ACTIVE">Active</option>
                                <option value="INACTIVE">Inactive</option>
                                <option value="SUSPENDED">Suspended</option>
                                <option value="GRADUATED">Graduated</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Saving...' : isEditMode ? 'Update Student' : 'Create Student'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
