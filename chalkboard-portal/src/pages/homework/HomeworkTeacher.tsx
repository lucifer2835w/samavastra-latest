import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './HomeworkTeacher.css';

interface Subject {
    id: number;
    name: string;
    code: string;
}

interface Homework {
    id: number;
    title: string;
    description?: string;
    dueDate: string;
    subject: Subject;
    submissions?: any[];
}

export const HomeworkTeacher: React.FC = () => {
    const { user } = useAuth();
    const [homework, setHomework] = useState<Homework[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [selectedHomework, setSelectedHomework] = useState<Homework | null>(null);
    const [formData, setFormData] = useState({
        subjectId: '',
        title: '',
        description: '',
        dueDate: '',
    });

    useEffect(() => {
        fetchSubjects();
        fetchHomework();
    }, []);

    const fetchSubjects = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/chalkboard/academics/subjects', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            setSubjects(data);
        } catch (error) {
            console.error('Error fetching subjects:', error);
        }
    };

    const fetchHomework = async () => {
        try {
            setLoading(true);
            // Fetch all homework for teacher's subjects
            const response = await fetch('http://localhost:3000/api/chalkboard/academics/subjects', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const subjectsData = await response.json();

            // Fetch homework for each subject
            const allHomework: Homework[] = [];
            for (const subject of subjectsData) {
                const hwResponse = await fetch(`http://localhost:3000/api/chalkboard/homework/subject/${subject.id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const hwData = await hwResponse.json();
                allHomework.push(...hwData);
            }

            setHomework(allHomework);
        } catch (error) {
            console.error('Error fetching homework:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateHomework = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/chalkboard/homework', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setShowCreateForm(false);
                setFormData({ subjectId: '', title: '', description: '', dueDate: '' });
                fetchHomework();
            }
        } catch (error) {
            console.error('Error creating homework:', error);
        }
    };

    const viewSubmissions = async (homeworkId: number) => {
        try {
            const response = await fetch(`http://localhost:3000/api/chalkboard/homework/${homeworkId}/submissions`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const submissions = await response.json();

            const hwWithSubmissions = homework.find(h => h.id === homeworkId);
            if (hwWithSubmissions) {
                setSelectedHomework({ ...hwWithSubmissions, submissions });
            }
        } catch (error) {
            console.error('Error fetching submissions:', error);
        }
    };

    const gradeSubmission = async (submissionId: number, grade: string) => {
        try {
            await fetch(`http://localhost:3000/api/chalkboard/homework/submissions/${submissionId}/grade`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ grade }),
            });

            if (selectedHomework) {
                viewSubmissions(selectedHomework.id);
            }
        } catch (error) {
            console.error('Error grading submission:', error);
        }
    };

    if (loading) return <div className="loading">Loading homework...</div>;

    return (
        <div className="homework-teacher">
            <div className="header">
                <h1>Homework Management</h1>
                <button className="btn-primary" onClick={() => setShowCreateForm(true)}>
                    Create New Homework
                </button>
            </div>

            {showCreateForm && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Create Homework Assignment</h2>
                        <form onSubmit={handleCreateHomework}>
                            <div className="form-group">
                                <label>Subject</label>
                                <select
                                    value={formData.subjectId}
                                    onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
                                    required
                                >
                                    <option value="">Select Subject</option>
                                    {subjects.map(subject => (
                                        <option key={subject.id} value={subject.id}>
                                            {subject.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={4}
                                />
                            </div>
                            <div className="form-group">
                                <label>Due Date</label>
                                <input
                                    type="date"
                                    value={formData.dueDate}
                                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-actions">
                                <button type="button" onClick={() => setShowCreateForm(false)}>Cancel</button>
                                <button type="submit" className="btn-primary">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {selectedHomework && (
                <div className="modal">
                    <div className="modal-content large">
                        <h2>Submissions for: {selectedHomework.title}</h2>
                        <div className="submissions-list">
                            {selectedHomework.submissions && selectedHomework.submissions.length > 0 ? (
                                selectedHomework.submissions.map((submission: any) => (
                                    <div key={submission.id} className="submission-card">
                                        <div className="submission-header">
                                            <h4>Student ID: {submission.studentId}</h4>
                                            <span className={`status ${submission.status.toLowerCase()}`}>
                                                {submission.status}
                                            </span>
                                        </div>
                                        <p>{submission.content}</p>
                                        {submission.fileUrl && (
                                            <a href={submission.fileUrl} target="_blank" rel="noopener noreferrer">
                                                View Attachment
                                            </a>
                                        )}
                                        <div className="grade-section">
                                            <label>Grade:</label>
                                            <input
                                                type="text"
                                                defaultValue={submission.grade || ''}
                                                onBlur={(e) => {
                                                    if (e.target.value) {
                                                        gradeSubmission(submission.id, e.target.value);
                                                    }
                                                }}
                                                placeholder="Enter grade"
                                            />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No submissions yet</p>
                            )}
                        </div>
                        <button onClick={() => setSelectedHomework(null)}>Close</button>
                    </div>
                </div>
            )}

            <div className="homework-list">
                {homework.length > 0 ? (
                    homework.map(hw => (
                        <div key={hw.id} className="homework-card">
                            <div className="homework-header">
                                <h3>{hw.title}</h3>
                                <span className="subject-badge">{hw.subject.name}</span>
                            </div>
                            <p>{hw.description}</p>
                            <div className="homework-footer">
                                <span>Due: {new Date(hw.dueDate).toLocaleDateString()}</span>
                                <button onClick={() => viewSubmissions(hw.id)}>
                                    View Submissions
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No homework assignments yet</p>
                )}
            </div>
        </div>
    );
};
