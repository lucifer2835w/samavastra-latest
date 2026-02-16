import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { homeworkApi } from '../../api';
import '../../index.css';

interface Homework {
    id: number;
    title: string;
    description: string;
    subject: {
        name: string;
    };
    class?: {
        grade: string;
        section: string;
    };
    dueDate: string;
    status: 'PENDING' | 'SUBMITTED' | 'GRADED';
}

export const HomeworkList: React.FC = () => {
    const [homework, setHomework] = useState<Homework[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHomework();
    }, []);

    const fetchHomework = async () => {
        try {
            const response = await homeworkApi.getAll();
            setHomework(response.data);
        } catch (error) {
            console.error('Failed to fetch homework:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading homework...</div>;

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Homework Assignments</h1>
                <Link to="/homework/new" className="btn btn-primary">
                    Create Assignment
                </Link>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Subject</th>
                            {/* <th>Class</th> - Removed as Homework doesn't have direct Class relation */}
                            <th>Due Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {homework.map((hw) => (
                            <tr key={hw.id}>
                                <td>{hw.title}</td>
                                <td>{hw.subject.name}</td>
                                {/* <td>{hw.class?.grade}-{hw.class?.section}</td> */}
                                <td>{new Date(hw.dueDate).toLocaleDateString()}</td>
                                <td>
                                    <Link to={`/homework/${hw.id}`} className="btn btn-sm btn-outline">
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        {homework.length === 0 && (
                            <tr>
                                <td colSpan={5} className="text-center">No homework assignments found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
