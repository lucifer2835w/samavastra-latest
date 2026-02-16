import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

export const Sidebar: React.FC = () => {
    const { user } = useAuth();
    const isAdmin = user?.roles.some(r => r.name === 'ADMIN');
    const isTeacher = user?.roles.some(r => r.name === 'TEACHER');
    const isStudent = user?.roles.some(r => r.name === 'STUDENT');

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h2 className="brand">Chalkboard</h2>
            </div>

            <nav className="sidebar-nav">
                <div className="nav-section">
                    <span className="nav-header">Main</span>
                    <NavLink to="/dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <span className="icon">📊</span> Dashboard
                    </NavLink>
                </div>

                <div className="nav-section">
                    <span className="nav-header">Academic</span>
                    {(isAdmin || isTeacher) && (
                        <>
                            <NavLink to="/students" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                                <span className="icon">👨‍🎓</span> Students
                            </NavLink>
                            <NavLink to="/teachers" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                                <span className="icon">👨‍🏫</span> Teachers
                            </NavLink>
                            <NavLink to="/academics" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                                <span className="icon">📚</span> Academics
                            </NavLink>
                            <NavLink to="/departments" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                                <span className="icon">🏢</span> Departments
                            </NavLink>
                        </>
                    )}
                    {isTeacher && (
                        <>
                            <NavLink to="/academics/grading" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                                <span className="icon">✍️</span> Grading
                            </NavLink>
                            <NavLink to="/academics/attendance" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                                <span className="icon">📋</span> Attendance
                            </NavLink>
                        </>
                    )}
                    {isStudent && (
                        <NavLink to="/academics" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                            <span className="icon">📚</span> My Classes
                        </NavLink>
                    )}
                </div>

                <div className="nav-section">
                    <span className="nav-header">CRM & Reports</span>
                    {(isAdmin || isTeacher) && (
                        <>
                            <NavLink to="/homework" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                                <span className="icon">📝</span> Homework
                            </NavLink>
                            <NavLink to="/reports" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                                <span className="icon">📈</span> Reports
                            </NavLink>
                            <NavLink to="/parents" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                                <span className="icon">👨‍👩‍👧</span> Parents
                            </NavLink>
                        </>
                    )}
                </div>

                <div className="nav-section">
                    <span className="nav-header">Marketplace</span>
                    <NavLink to="/marketplace" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <span className="icon">🛍️</span> Shop
                    </NavLink>
                    <NavLink to="/orders" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <span className="icon">📦</span> Orders
                    </NavLink>
                </div>
            </nav>

            <div className="sidebar-footer">
                <div className="user-info">
                    <div className="avatar">{user?.firstName?.charAt(0)}</div>
                    <div className="details">
                        <span className="name">{user?.firstName} {user?.lastName}</span>
                        <span className="role">{user?.roles.map(r => r.name).join(', ')}</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};
