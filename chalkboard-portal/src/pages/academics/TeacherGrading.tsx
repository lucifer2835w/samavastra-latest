import React, { useState, useEffect } from 'react';
import { apiClient } from '../../api/client';
import { Card } from '../../components/common/Card';

interface Exam {
    id: number;
    name: string;
    date: string;
    maxMarks: number;
    subject: {
        id: number;
        name: string;
        code: string;
    };
    results?: Array<{
        id: number;
        marksObtained: number;
        grade: string | null;
        student: {
            id: number;
            user: {
                firstName: string;
                lastName: string;
            };
        };
    }>;
}

interface Subject {
    id: number;
    name: string;
    code: string;
}

export const TeacherGrading: React.FC = () => {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [selectedSubject, setSelectedSubject] = useState<number | null>(null);
    const [exams, setExams] = useState<Exam[]>([]);
    const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
    const [loading, setLoading] = useState(true);
    const [showCreateExam, setShowCreateExam] = useState(false);
    const [newExam, setNewExam] = useState({ name: '', date: '', maxMarks: '' });

    useEffect(() => {
        fetchSubjects();
    }, []);

    useEffect(() => {
        if (selectedSubject) {
            fetchExams(selectedSubject);
        }
    }, [selectedSubject]);

    const fetchSubjects = async () => {
        try {
            const response = await apiClient.get('/academics/subjects');
            setSubjects(response.data);
        } catch (err) {
            console.error('Failed to fetch subjects', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchExams = async (subjectId: number) => {
        try {
            const response = await apiClient.get(`/academics/exams/subject/${subjectId}`);
            setExams(response.data);
        } catch (err) {
            console.error('Failed to fetch exams', err);
        }
    };

    const handleCreateExam = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedSubject) return;

        try {
            await apiClient.post('/academics/exams', {
                subjectId: selectedSubject,
                name: newExam.name,
                date: newExam.date,
                maxMarks: parseInt(newExam.maxMarks),
            });
            setNewExam({ name: '', date: '', maxMarks: '' });
            setShowCreateExam(false);
            fetchExams(selectedSubject);
        } catch (err) {
            console.error('Failed to create exam', err);
            alert('Failed to create exam');
        }
    };

    const handleRecordResult = async (studentId: number, marksObtained: string, grade: string) => {
        if (!selectedExam) return;

        try {
            await apiClient.post('/academics/exams/results', {
                examId: selectedExam.id,
                studentId,
                marksObtained: parseFloat(marksObtained),
                grade: grade || undefined,
            });
            // Refresh exam data
            if (selectedSubject) fetchExams(selectedSubject);
        } catch (err) {
            console.error('Failed to record result', err);
            alert('Failed to record result');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container">
            <h1>Teacher Grading</h1>

            <div className="section">
                <h2>Select Subject</h2>
                <div className="grid">
                    {subjects.map(subject => (
                        <Card
                            key={subject.id}
                            onClick={() => setSelectedSubject(subject.id)}
                            style={{
                                cursor: 'pointer',
                                border: selectedSubject === subject.id ? '2px solid #007bff' : undefined
                            }}
                        >
                            <h3>{subject.name}</h3>
                            <p>{subject.code}</p>
                        </Card>
                    ))}
                </div>
            </div>

            {selectedSubject && (
                <div className="section" style={{ marginTop: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2>Exams</h2>
                        <button onClick={() => setShowCreateExam(!showCreateExam)}>
                            {showCreateExam ? 'Cancel' : 'Create New Exam'}
                        </button>
                    </div>

                    {showCreateExam && (
                        <Card style={{ marginTop: '1rem' }}>
                            <form onSubmit={handleCreateExam}>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label>Exam Name:</label>
                                    <input
                                        type="text"
                                        value={newExam.name}
                                        onChange={(e) => setNewExam({ ...newExam, name: e.target.value })}
                                        required
                                        style={{ width: '100%', padding: '0.5rem' }}
                                    />
                                </div>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label>Date:</label>
                                    <input
                                        type="date"
                                        value={newExam.date}
                                        onChange={(e) => setNewExam({ ...newExam, date: e.target.value })}
                                        required
                                        style={{ width: '100%', padding: '0.5rem' }}
                                    />
                                </div>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label>Max Marks:</label>
                                    <input
                                        type="number"
                                        value={newExam.maxMarks}
                                        onChange={(e) => setNewExam({ ...newExam, maxMarks: e.target.value })}
                                        required
                                        style={{ width: '100%', padding: '0.5rem' }}
                                    />
                                </div>
                                <button type="submit">Create Exam</button>
                            </form>
                        </Card>
                    )}

                    <div className="grid" style={{ marginTop: '1rem' }}>
                        {exams.map(exam => (
                            <Card
                                key={exam.id}
                                onClick={() => setSelectedExam(exam)}
                                style={{
                                    cursor: 'pointer',
                                    border: selectedExam?.id === exam.id ? '2px solid #28a745' : undefined
                                }}
                            >
                                <h3>{exam.name}</h3>
                                <p><strong>Date:</strong> {new Date(exam.date).toLocaleDateString()}</p>
                                <p><strong>Max Marks:</strong> {exam.maxMarks}</p>
                                <p><strong>Results Recorded:</strong> {exam.results?.length || 0}</p>
                            </Card>
                        ))}
                        {exams.length === 0 && <p>No exams found. Create one to get started.</p>}
                    </div>
                </div>
            )}

            {selectedExam && (
                <div className="section" style={{ marginTop: '2rem' }}>
                    <h2>Record Results for: {selectedExam.name}</h2>
                    <p>This feature requires student list integration. Coming soon...</p>
                </div>
            )}
        </div>
    );
};
