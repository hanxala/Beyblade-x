'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminTopBar from '@/components/admin/AdminTopBar';
import ImageUpload from '@/components/ImageUpload';
import Link from 'next/link';

export default function CreateTournamentPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        maxParticipants: '',
        prize: '',
        registrationDeadline: '',
        imageUrl: '',
        imagePublicId: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/tournaments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to create tournament');
            }

            alert('Tournament created successfully!');
            router.push('/admin/tournaments');
        } catch (err: any) {
            setError(err.message);
            console.error('Error creating tournament:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            <AdminTopBar title="Create Tournament" />

            <div className="admin-container">
                <div className="content-card">
                    <div className="content-card-header">
                        <h2 className="content-card-title">New Tournament</h2>
                        <Link href="/admin/tournaments" className="btn-admin btn-admin-secondary">
                            ← Back to Tournaments
                        </Link>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--spacing-lg)' }}>
                            <div className="admin-form-group">
                                <label htmlFor="title" className="admin-form-label">
                                    Tournament Title *
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="admin-form-input"
                                    required
                                    placeholder="e.g., Mumbai Championship 2025"
                                />
                            </div>

                            <div className="admin-form-group">
                                <label htmlFor="location" className="admin-form-label">
                                    Location *
                                </label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="admin-form-input"
                                    required
                                    placeholder="e.g., Mumbai, Maharashtra"
                                />
                            </div>

                            <div className="admin-form-group">
                                <label htmlFor="date" className="admin-form-label">
                                    Tournament Date *
                                </label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="admin-form-input"
                                    required
                                />
                            </div>

                            <div className="admin-form-group">
                                <label htmlFor="registrationDeadline" className="admin-form-label">
                                    Registration Deadline *
                                </label>
                                <input
                                    type="date"
                                    id="registrationDeadline"
                                    name="registrationDeadline"
                                    value={formData.registrationDeadline}
                                    onChange={handleChange}
                                    className="admin-form-input"
                                    required
                                />
                            </div>

                            <div className="admin-form-group">
                                <label htmlFor="maxParticipants" className="admin-form-label">
                                    Max Participants *
                                </label>
                                <input
                                    type="number"
                                    id="maxParticipants"
                                    name="maxParticipants"
                                    value={formData.maxParticipants}
                                    onChange={handleChange}
                                    className="admin-form-input"
                                    required
                                    min="8"
                                    max="128"
                                    placeholder="e.g., 64"
                                />
                            </div>

                            <div className="admin-form-group">
                                <label htmlFor="prize" className="admin-form-label">
                                    Prize Pool *
                                </label>
                                <input
                                    type="text"
                                    id="prize"
                                    name="prize"
                                    value={formData.prize}
                                    onChange={handleChange}
                                    className="admin-form-input"
                                    required
                                    placeholder="e.g., ₹50,000"
                                />
                            </div>
                        </div>

                        <div className="admin-form-group">
                            <label className="admin-form-label">
                                Tournament Image
                            </label>
                            <ImageUpload
                                onUploadComplete={(url, publicId) => {
                                    setFormData({
                                        ...formData,
                                        imageUrl: url,
                                        imagePublicId: publicId,
                                    });
                                }}
                                folder="tournaments"
                                currentImage={formData.imageUrl}
                            />
                        </div>

                        <div className="admin-form-group">
                            <label htmlFor="description" className="admin-form-label">
                                Description *
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="admin-form-textarea"
                                required
                                placeholder="Describe the tournament, rules, and any special information..."
                                rows={5}
                            />
                        </div>

                        {error && (
                            <div style={{
                                padding: 'var(--spacing-md)',
                                background: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                borderRadius: 'var(--border-radius-md)',
                                color: '#ef4444',
                                marginTop: 'var(--spacing-md)',
                            }}>
                                {error}
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'flex-end', marginTop: 'var(--spacing-xl)' }}>
                            <Link href="/admin/tournaments" className="btn-admin btn-admin-secondary">
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                className="btn-admin btn-admin-primary"
                                disabled={loading}
                            >
                                <span>{loading ? '⏳' : '✓'}</span>
                                {loading ? 'Creating...' : 'Create Tournament'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
