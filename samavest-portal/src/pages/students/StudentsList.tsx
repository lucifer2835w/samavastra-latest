import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { studentsApi } from '../../api';
import type { Student } from '../../types';
import './Students.css';

export const StudentsList: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const output = await studentsApi.getAll();
            // Handle both array response and paginated response format
            const studentData = (output && Array.isArray(output)) ? output : (output?.students || []);
            setStudents(studentData);
        } catch (err) {
            setError('Failed to fetch students');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchTerm.trim()) {
            fetchStudents();
            return;
        }

        try {
            setLoading(true);
            const results = await studentsApi.search(searchTerm);
            setStudents(results || []);
        } catch (err) {
            setError('Search failed');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Student Management</h1>
                <button className="btn btn-primary" onClick={() => navigate('/students/new')}>
                    + Add New Student
                </button>
            </div>

            <div className="filters-section">
                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        placeholder="Search by name, email, or student ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="btn btn-secondary">Search</button>
                </form>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="card table-container">
                {loading ? (
                    <div className="loading-state">Loading students...</div>
                ) : students.length === 0 ? (
                    <div className="empty-state">No students found.</div>
                ) : (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Student Number</th>
                                <th>Grade</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.id}>
                                    <td>#{student.id}</td>
                                    <td>{student.user?.firstName} {student.user?.lastName}</td>
                                    <td>{student.user?.email}</td>
                                    <td>{student.studentNumber}</td>
                                    <td>{student.grade || '-'}</td>
                                    <td>
                                        <span className={`badge ${student.status === 'ACTIVE' ? 'badge-success' : 'badge-danger'}`}>
                                            {student.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="btn-icon" onClick={() => navigate(`/students/${student.id}/edit`)}>✏️</button>
                                            <button className="btn-icon">👁️</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};
