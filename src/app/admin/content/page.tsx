'use client';

import { useState } from 'react';
import AdminTopBar from '@/components/admin/AdminTopBar';
import { mockAnnouncements, Announcement } from '@/lib/mockData';

export default function ContentPage() {
    const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        type: 'info' as Announcement['type'],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newAnnouncement: Announcement = {
            id: Date.now().toString(),
            ...formData,
            createdAt: new Date().toISOString(),
            active: true,
        };
        setAnnouncements([newAnnouncement, ...announcements]);
        setFormData({ title: '', content: '', type: 'info' });
        setShowForm(false);
    };

    const toggleActive = (id: string) => {
        setAnnouncements(announcements.map(a =>
            a.id === id ? { ...a, active: !a.active } : a
        ));
    };

    const deleteAnnouncement = (id: string) => {
        if (confirm('Are you sure you want to delete this announcement?')) {
            setAnnouncements(announcements.filter(a => a.id !== id));
        }
    };

    const getTypeBadge = (type: Announcement['type']) => {
        switch (type) {
            case 'success': return 'admin-badge admin-badge-success';
            case 'warning': return 'admin-badge admin-badge-warning';
            case 'info': return 'admin-badge admin-badge-info';
            default: return 'admin-badge';
        }
    };

    return (
        <>
            <AdminTopBar title="Content Management" />

            <div className="admin-container">
                <div className="content-card">
                    <div className="content-card-header">
                        <h2 className="content-card-title">Announcements</h2>
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="btn-admin btn-admin-primary"
                        >
                            {showForm ? '✕ Cancel' : '➕ New Announcement'}
                        </button>
                    </div>

                    {showForm && (
                        <form onSubmit={handleSubmit} style={{ marginBottom: 'var(--spacing-xl)', padding: 'var(--spacing-lg)', background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Title *</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="admin-form-input"
                                    required
                                    placeholder="Announcement title"
                                />
                            </div>

                            <div className="admin-form-group">
                                <label className="admin-form-label">Content *</label>
                                <textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="admin-form-textarea"
                                    required
                                    placeholder="Announcement content"
                                    rows={4}
                                />
                            </div>

                            <div className="admin-form-group">
                                <label className="admin-form-label">Type *</label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value as Announcement['type'] })}
                                    className="admin-form-select"
                                >
                                    <option value="info">Info</option>
                                    <option value="success">Success</option>
                                    <option value="warning">Warning</option>
                                </select>
                            </div>

                            <button type="submit" className="btn-admin btn-admin-primary">
                                Create Announcement
                            </button>
                        </form>
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                        {announcements.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-state-icon">📢</div>
                                <div className="empty-state-title">No announcements</div>
                                <div className="empty-state-description">Create your first announcement</div>
                            </div>
                        ) : (
                            announcements.map((announcement) => (
                                <div
                                    key={announcement.id}
                                    style={{
                                        padding: 'var(--spacing-lg)',
                                        background: 'var(--color-bg-tertiary)',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        opacity: announcement.active ? 1 : 0.5,
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-sm)' }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-xs)' }}>
                                                <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600 }}>{announcement.title}</h3>
                                                <span className={getTypeBadge(announcement.type)}>{announcement.type}</span>
                                                {announcement.active && <span className="admin-badge admin-badge-success">Active</span>}
                                            </div>
                                            <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                                                {announcement.content}
                                            </p>
                                            <div style={{ marginTop: 'var(--spacing-xs)', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                                Created {new Date(announcement.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: 'var(--spacing-xs)' }}>
                                            <button
                                                onClick={() => toggleActive(announcement.id)}
                                                className="btn-admin btn-admin-secondary"
                                                style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem' }}
                                            >
                                                {announcement.active ? '👁️ Hide' : '👁️ Show'}
                                            </button>
                                            <button
                                                onClick={() => deleteAnnouncement(announcement.id)}
                                                className="btn-admin btn-admin-danger"
                                                style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem' }}
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
