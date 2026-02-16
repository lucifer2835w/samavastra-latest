import React, { useState, useEffect } from 'react';
import { Card } from '../../components/common/Card';
import { apiClient } from '../../api/client';

export const StudentPerformance: React.FC = () => {
    const [performance, setPerformance] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPerformance = async () => {
            try {
                const response = await apiClient.get('/academics/performance');
                setPerformance(response.data);
            } catch (err) {
                console.error("Failed to fetch performance", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPerformance();
    }, []);

    if (loading) return <div>Loading performance data...</div>;
    if (!performance) return <div>No data available.</div>;

    const { examResults, attendance } = performance;

    return (
        <div className="container">
            <h1>My Academic Performance</h1>

            <div className="section">
                <h2>Attendance</h2>
                <Card>
                    <div className="stats">
                        <p><strong>Present:</strong> {attendance.present}/{attendance.total} days</p>
                        <p><strong>Percentage:</strong> {attendance.percentage}%</p>
                    </div>
                </Card>
            </div>

            <div className="section" style={{ marginTop: '2rem' }}>
                <h2>Exam Results</h2>
                <div className="grid">
                    {examResults.map((result: any, index: number) => (
                        <Card key={index}>
                            <h3>{result.subject}</h3>
                            <p className="exam-name">{result.exam}</p>
                            <div className="stats">
                                <p><strong>Marks:</strong> {result.marks}/{result.maxMarks}</p>
                                <p><strong>Grade:</strong> {result.grade || 'N/A'}</p>
                            </div>
                        </Card>
                    ))}
                    {examResults.length === 0 && <p>No exam results found.</p>}
                </div>
            </div>
        </div>
    );
};
