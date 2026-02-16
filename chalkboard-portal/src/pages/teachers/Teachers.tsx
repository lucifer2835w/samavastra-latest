import React from 'react';
import { TeacherList } from '../../components/crm/TeacherList';

export const Teachers: React.FC = () => {
    return (
        <div className="container">
            <h1>Teachers Management</h1>
            <p>Manage teacher profiles and assignments.</p>
            <TeacherList />
        </div>
    );
};
