'use client';

import { useState } from 'react';
import AdminTopBar from '@/components/admin/AdminTopBar';
import { mockUsers, User } from '@/lib/mockData';
import Link from 'next/link';

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>(mockUsers);
    const [filter, setFilter] = useState<'all' | 'active' | 'banned'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredUsers = users.filter(user => {
        const matchesFilter = filter === 'all' || user.status === filter;
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.city.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const handleBanToggle = (userId: string) => {
        setUsers(users.map(user => {
            if (user.id === userId) {
                const newStatus = user.status === 'active' ? 'banned' : 'active';
                const action = newStatus === 'banned' ? 'ban' : 'unban';
                if (confirm(`Are you sure you want to ${action} ${user.name}?`)) {
                    return { ...user, status: newStatus };
                }
            }
            return user;
        }));
    };

    return (
        <>
            <AdminTopBar title="User Management" />

            <div className="admin-container">
                <div className="content-card">
                    <div className="content-card-header">
                        <h2 className="content-card-title">All Users</h2>
                    </div>

                    {/* Filters */}
                    <div style={{ marginBottom: 'var(--spacing-lg)', display: 'flex', gap: 'var(--spacing-md)', flexWrap: 'wrap' }}>
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="admin-form-input"
                            style={{ maxWidth: '300px' }}
                        />
                        <div style={{ display: 'flex', gap: 'var(--spacing-xs)' }}>
                            <button
                                onClick={() => setFilter('all')}
                                className={`btn-admin ${filter === 'all' ? 'btn-admin-primary' : 'btn-admin-secondary'}`}
                            >
                                All ({users.length})
                            </button>
                            <button
                                onClick={() => setFilter('active')}
                                className={`btn-admin ${filter === 'active' ? 'btn-admin-primary' : 'btn-admin-secondary'}`}
                            >
                                Active ({users.filter(u => u.status === 'active').length})
                            </button>
                            <button
                                onClick={() => setFilter('banned')}
                                className={`btn-admin ${filter === 'banned' ? 'btn-admin-primary' : 'btn-admin-secondary'}`}
                            >
                                Banned ({users.filter(u => u.status === 'banned').length})
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    {filteredUsers.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">👥</div>
                            <div className="empty-state-title">No users found</div>
                            <div className="empty-state-description">Try adjusting your search or filters</div>
                        </div>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Email</th>
                                        <th>City</th>
                                        <th>Stats</th>
                                        <th>Points</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((user) => (
                                        <tr key={user.id}>
                                            <td>
                                                <div style={{ fontWeight: 600 }}>{user.name}</div>
                                                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                                                    Joined {new Date(user.joinedDate).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td>{user.email}</td>
                                            <td>{user.city}</td>
                                            <td>
                                                <div style={{ fontSize: '0.875rem' }}>
                                                    <span style={{ color: '#4ade80' }}>{user.wins}W</span>
                                                    {' / '}
                                                    <span style={{ color: '#f87171' }}>{user.losses}L</span>
                                                </div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                                    {user.tournamentsPlayed} tournaments
                                                </div>
                                            </td>
                                            <td style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                                                {user.points.toLocaleString()}
                                            </td>
                                            <td>
                                                <span className={user.status === 'active' ? 'admin-badge admin-badge-success' : 'admin-badge admin-badge-danger'}>
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div style={{ display: 'flex', gap: 'var(--spacing-xs)' }}>
                                                    <Link
                                                        href={`/admin/users/${user.id}`}
                                                        className="btn-admin btn-admin-secondary"
                                                        style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem' }}
                                                    >
                                                        👁️ View
                                                    </Link>
                                                    <button
                                                        onClick={() => handleBanToggle(user.id)}
                                                        className={`btn-admin ${user.status === 'active' ? 'btn-admin-danger' : 'btn-admin-secondary'}`}
                                                        style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem' }}
                                                    >
                                                        {user.status === 'active' ? '🚫 Ban' : '✓ Unban'}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
