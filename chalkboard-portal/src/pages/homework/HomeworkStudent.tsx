import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './HomeworkStudent.css';

interface Homework {
    id: number;
    title: string;
    description?: string;
    dueDate: string;
    subject: {
        name: string;
    };
    submission?: {
        id: number;
        content: string;
        fileUrl?: string;
        status: string;
        grade?: string;
        submittedAt: string;
    };
}

export const HomeworkStudent: React.FC = () => {
    const { user } = useAuth();
    const [homework, setHomework] = useState<Homework[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedHomework, setSelectedHomework] = useState<Homework | null>(null);
    const [submissionData, setSubmissionData] = useState({
        content: '',
        fileUrl: '',
    });

    useEffect(() => {
        fetchHomework();
    }, []);

    const fetchHomework = async () => {
        try {
            setLoading(true);
            // Assuming user has studentId in their profile
            const studentId = user?.id; // You may need to fetch this from student profile
            const response = await fetch(`http://localhost:3000/api/chalkboard/homework/student/${studentId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            setHomework(data);
        } catch (error) {
            console.error('Error fetching homework:', error);
        } finally {
            setLoading(false);
        }
    };

    const submitHomework = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedHomework) return;

        try {
            const studentId = user?.id;
            const response = await fetch('http://localhost:3000/api/chalkboard/homework/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    homeworkId: selectedHomework.id,
                    studentId,
                    ...submissionData,
                }),
            });

            if (response.ok) {
                setSelectedHomework(null);
                setSubmissionData({ content: '', fileUrl: '' });
                fetchHomework();
            }
        } catch (error) {
            console.error('Error submitting homework:', error);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'SUBMITTED': return 'yellow';
            case 'GRADED': return 'green';
            default: return 'gray';
        }
    };

    if (loading) return <div className="loading">Loading homework...</div>;

    return (
        <div className="homework-student">
            <h1>My Homework</h1>

            {selectedHomework && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Submit: {selectedHomework.title}</h2>
                        <p className="homework-description">{selectedHomework.description}</p>
                        <p className="due-date">Due: {new Date(selectedHomework.dueDate).toLocaleDateString()}</p>

                        <form onSubmit={submitHomework}>
                            <div className="form-group">
                                <label>Your Answer</label>
                                <textarea
                                    value={submissionData.content}
                                    onChange={(e) => setSubmissionData({ ...submissionData, content: e.target.value })}
                                    rows={6}
                                    required
                                    placeholder="Type your answer here..."
                                />
                            </div>
                            <div className="form-group">
                                <label>File URL (Optional)</label>
                                <input
                                    type="url"
                                    value={submissionData.fileUrl}
                                    onChange={(e) => setSubmissionData({ ...submissionData, fileUrl: e.target.value })}
                                    placeholder="https://..."
                                />
                            </div>
                            <div className="form-actions">
                                <button type="button" onClick={() => setSelectedHomework(null)}>Cancel</button>
                                <button type="submit" className="btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="homework-grid">
                {homework.length > 0 ? (
                    homework.map(hw => (
                        <div key={hw.id} className="homework-card">
                            <div className="card-header">
                                <h3>{hw.title}</h3>
                                <span className="subject-badge">{hw.subject.name}</span>
                            </div>
                            <p className="description">{hw.description}</p>
                            <div className="card-footer">
                                <div className="due-info">
                                    <span className="label">Due:</span>
                                    <span className="date">{new Date(hw.dueDate).toLocaleDateString()}</span>
                                </div>
                                {hw.submission ? (
                                    <div className="submission-status">
                                        <span className={`status-badge ${getStatusColor(hw.submission.status)}`}>
                                            {hw.submission.status}
                                        </span>
                                        {hw.submission.grade && (
                                            <span className="grade">Grade: {hw.submission.grade}</span>
                                        )}
                                    </div>
                                ) : (
                                    <button
                                        className="btn-submit"
                                        onClick={() => setSelectedHomework(hw)}
                                    >
                                        Submit
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-homework">No homework assignments yet</p>
                )}
            </div>
        </div>
    );
};
