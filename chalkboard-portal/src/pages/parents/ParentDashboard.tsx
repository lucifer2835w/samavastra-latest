import React, { useState, useEffect } from 'react';
import { parentApi } from '../../api';
import { useAuth } from '../../context/AuthContext';

interface Child {
    id: number;
    studentNumber: string;
    user: {
        firstName: string;
        lastName: string;
    };
    class: {
        grade: string;
        section: string;
    };
}

export const ParentDashboard: React.FC = () => {
    const { user } = useAuth();
    const [children, setChildren] = useState<Child[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchChildren();
        }
    }, [user]);

    const fetchChildren = async () => {
        try {
            // Assuming user.id is the parent's user ID. 
            // The backend likely expects the Parent ID, not User ID.
            // If the user object contains 'parent' profile info, use that.
            // For now, I'll try using user.id and if it fails I might need to fetch profile first.
            // IMPORTANT: In a real app, I'd check if user.role === 'PARENT' and get the linked profile.
            const response = await parentApi.getChildren(user!.id);
            setChildren(response.data);
        } catch (error) {
            console.error('Failed to fetch children:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="page-container">
            <h1>Parent Dashboard</h1>
            <div className="children-grid">
                {children.map(child => (
                    <div key={child.id} className="card">
                        <h3>{child.user.firstName} {child.user.lastName}</h3>
                        <p>Student ID: {child.studentNumber}</p>
                        <p>Class: {child.class.grade}-{child.class.section}</p>
                        <div className="card-actions">
                            <button className="btn btn-primary">View Report Card</button>
                            <button className="btn btn-outline">Check Attendance</button>
                            <button className="btn btn-outline">View Homework</button>
                        </div>
                    </div>
                ))}
                {children.length === 0 && (
                    <p>No children linked to this account.</p>
                )}
            </div>
        </div>
    );
};
