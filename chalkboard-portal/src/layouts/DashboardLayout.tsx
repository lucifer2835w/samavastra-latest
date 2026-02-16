import React from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
import { Outlet } from 'react-router-dom';
import './DashboardLayout.css';

export const DashboardLayout: React.FC = () => {
    return (
        <div className="dashboard-layout">
            <Sidebar />
            <div className="main-content">
                <Header /> {/* Reusing Header for now, but maybe it should be adjusted */}
                <main className="page-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
