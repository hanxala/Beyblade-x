'use client';

import { useState } from 'react';
import AdminTopBar from '@/components/admin/AdminTopBar';
import { mockTournaments, Tournament } from '@/lib/mockData';
import Link from 'next/link';

export default function TournamentsPage() {
    const [tournaments, setTournaments] = useState<Tournament[]>(mockTournaments);
    const [filter, setFilter] = useState<'all' | 'upcoming' | 'live' | 'completed'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTournaments = tournaments.filter(tournament => {
        const matchesFilter = filter === 'all' || tournament.status === filter;
        const matchesSearch = tournament.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tournament.location.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const getStatusBadgeClass = (status: Tournament['status']) => {
        switch (status) {
            case 'upcoming': return 'admin-badge admin-badge-info';
            case 'live': return 'admin-badge admin-badge-success';
            case 'completed': return 'admin-badge admin-badge-warning';
            default: return 'admin-badge';
        }
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this tournament?')) {
            setTournaments(tournaments.filter(t => t.id !== id));
        }
    };

    return (
        <>
            <AdminTopBar title="Tournament Management" />

            <div className="admin-container">
                <div className="content-card">
                    <div className="content-card-header">
                        <h2 className="content-card-title">All Tournaments</h2>
                        <div className="content-card-actions">
                            <Link href="/admin/tournaments/create" className="btn-admin btn-admin-primary">
                                <span>➕</span>
                                Create Tournament
                            </Link>
                        </div>
                    </div>

                    {/* Filters */}
                    <div style={{ marginBottom: 'var(--spacing-lg)', display: 'flex', gap: 'var(--spacing-md)', flexWrap: 'wrap' }}>
                        <input
                            type="text"
                            placeholder="Search tournaments..."
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
                                All ({tournaments.length})
                            </button>
                            <button
                                onClick={() => setFilter('upcoming')}
                                className={`btn-admin ${filter === 'upcoming' ? 'btn-admin-primary' : 'btn-admin-secondary'}`}
                            >
                                Upcoming ({tournaments.filter(t => t.status === 'upcoming').length})
                            </button>
                            <button
                                onClick={() => setFilter('live')}
                                className={`btn-admin ${filter === 'live' ? 'btn-admin-primary' : 'btn-admin-secondary'}`}
                            >
                                Live ({tournaments.filter(t => t.status === 'live').length})
                            </button>
                            <button
                                onClick={() => setFilter('completed')}
                                className={`btn-admin ${filter === 'completed' ? 'btn-admin-primary' : 'btn-admin-secondary'}`}
                            >
                                Completed ({tournaments.filter(t => t.status === 'completed').length})
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    {filteredTournaments.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">🏆</div>
                            <div className="empty-state-title">No tournaments found</div>
                            <div className="empty-state-description">
                                {searchQuery ? 'Try adjusting your search' : 'Create your first tournament to get started'}
                            </div>
                        </div>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Tournament</th>
                                        <th>Date</th>
                                        <th>Location</th>
                                        <th>Participants</th>
                                        <th>Prize</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTournaments.map((tournament) => (
                                        <tr key={tournament.id}>
                                            <td>
                                                <div style={{ fontWeight: 600 }}>{tournament.title}</div>
                                                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                                                    ID: {tournament.id}
                                                </div>
                                            </td>
                                            <td>{new Date(tournament.date).toLocaleDateString()}</td>
                                            <td>{tournament.location}</td>
                                            <td>
                                                {tournament.participants}/{tournament.maxParticipants}
                                                <div style={{
                                                    width: '100%',
                                                    height: '4px',
                                                    background: 'rgba(255,255,255,0.1)',
                                                    borderRadius: '2px',
                                                    marginTop: '4px'
                                                }}>
                                                    <div style={{
                                                        width: `${(tournament.participants / tournament.maxParticipants) * 100}%`,
                                                        height: '100%',
                                                        background: 'var(--gradient-primary)',
                                                        borderRadius: '2px'
                                                    }} />
                                                </div>
                                            </td>
                                            <td style={{ fontWeight: 600, color: 'var(--color-accent)' }}>{tournament.prize}</td>
                                            <td>
                                                <span className={getStatusBadgeClass(tournament.status)}>
                                                    {tournament.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div style={{ display: 'flex', gap: 'var(--spacing-xs)' }}>
                                                    <Link
                                                        href={`/admin/tournaments/${tournament.id}/edit`}
                                                        className="btn-admin btn-admin-secondary"
                                                        style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem' }}
                                                    >
                                                        ✏️ Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(tournament.id)}
                                                        className="btn-admin btn-admin-danger"
                                                        style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem' }}
                                                    >
                                                        🗑️ Delete
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
