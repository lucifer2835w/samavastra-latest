import React from 'react';
import { Card } from '../../components/common/Card';

export const Departments: React.FC = () => {
    return (
        <div className="container">
            <h1>Departments</h1>
            <p>Manage school departments.</p>
            <div className="grid">
                <Card>
                    <h3>Department List</h3>
                    <p>View administrative and academic departments.</p>
                </Card>
            </div>
        </div>
    );
};
