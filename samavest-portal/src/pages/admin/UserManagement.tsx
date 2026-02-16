import React, { useState, useEffect } from 'react';
import { adminApi } from '../../api/client';
import './UserManagement.css';

interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    roles: Array<{ role: { name: string } }>;
    student?: any;
    teacher?: any;
    parent?: any;
}

export const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: '',
        roles: [] as string[]
    });

    const availableRoles = ['STUDENT', 'TEACHER', 'PARENT', 'ADMIN', 'SUPER_ADMIN'];

    useEffect(() => {
        fetchUsers();
    }, [roleFilter]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await adminApi.getAllUsers({
                role: roleFilter || undefined,
                search: searchTerm || undefined
            });
            setUsers(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Failed to fetch users:', error);
            alert('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        fetchUsers();
    };

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await adminApi.createUser(formData);
            setShowCreateModal(false);
            setFormData({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phone: '',
                roles: []
            });
            fetchUsers();
            alert('User created successfully!');
        } catch (error: any) {
            console.error('Failed to create user:', error);
            alert(error.response?.data?.message || 'Failed to create user');
        }
    };

    const handleUpdateUser = async (userId: number, data: any) => {
        try {
            await adminApi.updateUser(userId, data);
            fetchUsers();
            alert('User updated successfully!');
        } catch (error) {
            console.error('Failed to update user:', error);
            alert('Failed to update user');
        }
    };

    const handleAssignRoles = async (userId: number, roles: string[]) => {
        try {
            await adminApi.assignRoles(userId, roles);
            fetchUsers();
            alert('Roles updated successfully!');
        } catch (error) {
            console.error('Failed to assign roles:', error);
            alert('Failed to assign roles');
        }
    };

    const handleDeactivateUser = async (userId: number) => {
        if (!confirm('Are you sure you want to deactivate this user?')) return;

        try {
            await adminApi.deactivateUser(userId);
            fetchUsers();
            alert('User deactivated successfully!');
        } catch (error) {
            console.error('Failed to deactivate user:', error);
            alert('Failed to deactivate user');
        }
    };

    const handleResetPassword = async (userId: number) => {
        const newPassword = prompt('Enter new password:');
        if (!newPassword) return;

        try {
            await adminApi.resetPassword(userId, newPassword);
            alert('Password reset successfully!');
        } catch (error) {
            console.error('Failed to reset password:', error);
            alert('Failed to reset password');
        }
    };

    const toggleRole = (role: string) => {
        setFormData(prev => ({
            ...prev,
            roles: prev.roles.includes(role)
                ? prev.roles.filter(r => r !== role)
                : [...prev.roles, role]
        }));
    };

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="user-management">
            <div className="header">
                <h1>User Management</h1>
                <button onClick={() => setShowCreateModal(true)} className="btn-primary">
                    Create New User
                </button>
            </div>

            <div className="filters">
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                    <option value="">All Roles</option>
                    {availableRoles.map(role => (
                        <option key={role} value={role}>{role}</option>
                    ))}
                </select>
                <button onClick={handleSearch} className="btn-secondary">Search</button>
            </div>

            <table className="users-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Roles</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.phone || 'N/A'}</td>
                            <td>
                                {user.roles.map(r => r.role.name).join(', ')}
                            </td>
                            <td>
                                {user.student && 'Student'}
                                {user.teacher && 'Teacher'}
                                {user.parent && 'Parent'}
                                {!user.student && !user.teacher && !user.parent && 'Admin'}
                            </td>
                            <td className="actions">
                                <button onClick={() => setSelectedUser(user)} className="btn-sm">
                                    Edit
                                </button>
                                <button onClick={() => handleResetPassword(user.id)} className="btn-sm">
                                    Reset Password
                                </button>
                                <button onClick={() => handleDeactivateUser(user.id)} className="btn-sm btn-danger">
                                    Deactivate
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showCreateModal && (
                <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h2>Create New User</h2>
                        <form onSubmit={handleCreateUser}>
                            <div className="form-group">
                                <label>Email *</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Password *</label>
                                <input
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>First Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Last Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Roles *</label>
                                <div className="role-checkboxes">
                                    {availableRoles.map(role => (
                                        <label key={role} className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                checked={formData.roles.includes(role)}
                                                onChange={() => toggleRole(role)}
                                            />
                                            {role}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="modal-actions">
                                <button type="button" onClick={() => setShowCreateModal(false)} className="btn-secondary">
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary">
                                    Create User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
