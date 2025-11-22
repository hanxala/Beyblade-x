import AdminTopBar from '@/components/admin/AdminTopBar';
import StatsCard from '@/components/admin/StatsCard';
import ActivityFeed from '@/components/admin/ActivityFeed';
import { mockStats, mockActivities } from '@/lib/mockData';
import Link from 'next/link';

export default function AdminDashboard() {
    return (
        <>
            <AdminTopBar title="Dashboard" />

            <div className="admin-container">
                {/* Stats Grid */}
                <div className="stats-grid">
                    <StatsCard
                        title="Total Users"
                        value={mockStats.totalUsers.toLocaleString()}
                        icon="👥"
                        trend={mockStats.userGrowth}
                        trendLabel="vs last month"
                    />
                    <StatsCard
                        title="Active Tournaments"
                        value={mockStats.activeTournaments.toString()}
                        icon="🏆"
                        trend={mockStats.tournamentGrowth}
                        trendLabel="vs last month"
                    />
                    <StatsCard
                        title="Total Registrations"
                        value={mockStats.totalRegistrations.toLocaleString()}
                        icon="📝"
                        trend={15.2}
                        trendLabel="vs last month"
                    />
                    <StatsCard
                        title="Monthly Revenue"
                        value={`₹${(mockStats.monthlyRevenue / 1000).toFixed(0)}K`}
                        icon="💰"
                        trend={8.7}
                        trendLabel="vs last month"
                    />
                </div>

                {/* Content Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xl)' }}>
                    {/* Quick Actions */}
                    <div className="content-card">
                        <div className="content-card-header">
                            <h2 className="content-card-title">Quick Actions</h2>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--spacing-md)' }}>
                            <Link href="/admin/tournaments/create" className="btn-admin btn-admin-primary" style={{ textDecoration: 'none', justifyContent: 'center' }}>
                                <span>➕</span>
                                Create Tournament
                            </Link>
                            <Link href="/admin/users" className="btn-admin btn-admin-secondary" style={{ textDecoration: 'none', justifyContent: 'center' }}>
                                <span>👥</span>
                                Manage Users
                            </Link>
                            <Link href="/admin/content" className="btn-admin btn-admin-secondary" style={{ textDecoration: 'none', justifyContent: 'center' }}>
                                <span>📝</span>
                                Create Announcement
                            </Link>
                            <Link href="/admin/analytics" className="btn-admin btn-admin-secondary" style={{ textDecoration: 'none', justifyContent: 'center' }}>
                                <span>📊</span>
                                View Analytics
                            </Link>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="content-card">
                        <div className="content-card-header">
                            <h2 className="content-card-title">Recent Activity</h2>
                        </div>
                        <ActivityFeed activities={mockActivities.slice(0, 5)} />
                    </div>
                </div>

                {/* Overview Stats */}
                <div className="content-card">
                    <div className="content-card-header">
                        <h2 className="content-card-title">Platform Overview</h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-lg)' }}>
                        <div>
                            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: 'var(--spacing-xs)' }}>
                                Active Users
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                                {mockStats.activeUsers.toLocaleString()}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: 'var(--spacing-xs)' }}>
                                {((mockStats.activeUsers / mockStats.totalUsers) * 100).toFixed(1)}% of total users
                            </div>
                        </div>
                        <div>
                            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: 'var(--spacing-xs)' }}>
                                Total Tournaments
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-secondary)' }}>
                                {mockStats.totalTournaments}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: 'var(--spacing-xs)' }}>
                                {mockStats.activeTournaments} currently active
                            </div>
                        </div>
                        <div>
                            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: 'var(--spacing-xs)' }}>
                                Avg. Registrations
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-accent)' }}>
                                {(mockStats.totalRegistrations / mockStats.totalTournaments).toFixed(0)}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: 'var(--spacing-xs)' }}>
                                per tournament
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
