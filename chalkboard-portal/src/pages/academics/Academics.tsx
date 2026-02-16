import React, { useState, useEffect } from 'react';
import { academicsApi } from '../../api';
import type { Class, Subject } from '../../types';
import { Card } from '../../components/common/Card';

export const Academics: React.FC = () => {
    const [classes, setClasses] = useState<Class[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [classesData, subjectsData] = await Promise.all([
                    academicsApi.getClasses(),
                    academicsApi.getSubjects()
                ]);
                setClasses(classesData);
                setSubjects(subjectsData);
            } catch (err) {
                console.error('Failed to load academics data', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container">
            <h1>Academics</h1>

            <div className="academics-section">
                <h2>Classes</h2>
                <div className="grid">
                    {classes.map(cls => (
                        <Card key={cls.id}>
                            <h3>Grade {cls.grade} - {cls.section}</h3>
                            <p><strong>Teacher:</strong> {cls.teacher ? `${cls.teacher.user.firstName} ${cls.teacher.user.lastName}` : 'Unassigned'}</p>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="academics-section" style={{ marginTop: '2rem' }}>
                <h2>Subjects</h2>
                <div className="grid">
                    {subjects.map(subj => (
                        <Card key={subj.id}>
                            <h3>{subj.name} ({subj.code})</h3>
                            <p>{subj.description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};
