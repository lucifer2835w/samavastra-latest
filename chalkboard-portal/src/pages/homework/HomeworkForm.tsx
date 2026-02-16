import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { homeworkApi } from '../../api';
import axios from 'axios';

interface Subject {
    id: number;
    name: string;
}

interface Class {
    id: number;
    grade: string;
    section: string;
}

export const HomeworkForm: React.FC = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [subjectId, setSubjectId] = useState('');
    const [classId, setClassId] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [loading, setLoading] = useState(false);

    // Dropdown data
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [classes, setClasses] = useState<Class[]>([]);

    useEffect(() => {
        fetchDropdownData();
    }, []);

    const fetchDropdownData = async () => {
        try {
            // Assuming these endpoints exist effectively or I reuse what I have
            // Checking client.ts, I might need to add getSubjects/getClasses if not present or reuse adminApi
            // client.ts has adminApi.getClassDistribution but not list, I'll assume they exist or use raw axios if needed for now
            // But better to use what's likely there. 
            // In ReportsDashboard previously, I saw:
            // fetch('http://localhost:3000/api/samavest/academics/classes')
            // I should adhere to that pattern via client if possible, or just raw for now to not block

            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };

            const [classesRes, subjectsRes] = await Promise.all([
                axios.get('http://localhost:3000/api/samavest/academics/classes', { headers }),
                axios.get('http://localhost:3000/api/samavest/academics/subjects', { headers })
            ]);

            setClasses(classesRes.data);
            setSubjects(subjectsRes.data);
        } catch (error) {
            console.error('Failed to load classes/subjects:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await homeworkApi.create({
                title,
                description,
                subjectId: Number(subjectId),
                classId: Number(classId),
                dueDate
            });
            navigate('/homework');
        } catch (error) {
            console.error('Failed to create homework:', error);
            alert('Failed to create assignment');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container">
            <div className="card">
                <h2>Create Assignment</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            className="form-control"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Class</label>
                        <select
                            className="form-control"
                            value={classId}
                            onChange={e => setClassId(e.target.value)}
                            required
                        >
                            <option value="">Select Class</option>
                            {classes.map(cls => (
                                <option key={cls.id} value={cls.id}>
                                    {cls.grade}-{cls.section}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Subject</label>
                        <select
                            className="form-control"
                            value={subjectId}
                            onChange={e => setSubjectId(e.target.value)}
                            required
                        >
                            <option value="">Select Subject</option>
                            {subjects.map(sub => (
                                <option key={sub.id} value={sub.id}>
                                    {sub.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Due Date</label>
                        <input
                            type="date"
                            className="form-control"
                            value={dueDate}
                            onChange={e => setDueDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            className="form-control"
                            rows={4}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={() => navigate('/homework')} className="btn btn-secondary">
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Creating...' : 'Create Assignment'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
