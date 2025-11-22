import AdminTopBar from '@/components/admin/AdminTopBar';

export default function AnalyticsPage() {
    // Mock analytics data
    const monthlyData = [
        { month: 'Jul', users: 120, tournaments: 8, registrations: 245 },
        { month: 'Aug', users: 185, tournaments: 12, registrations: 389 },
        { month: 'Sep', users: 240, tournaments: 15, registrations: 512 },
        { month: 'Oct', users: 310, tournaments: 18, registrations: 678 },
        { month: 'Nov', users: 425, tournaments: 22, registrations: 892 },
        { month: 'Dec', users: 520, tournaments: 25, registrations: 1045 },
    ];

    const maxUsers = Math.max(...monthlyData.map(d => d.users));
    const maxTournaments = Math.max(...monthlyData.map(d => d.tournaments));
    const maxRegistrations = Math.max(...monthlyData.map(d => d.registrations));

    return (
        <>
            <AdminTopBar title="Analytics & Reports" />

            <div className="admin-container">
                {/* User Growth Chart */}
                <div className="content-card" style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <div className="content-card-header">
                        <h2 className="content-card-title">User Growth</h2>
                        <button className="btn-admin btn-admin-secondary">📥 Export Data</button>
                    </div>

                    <div style={{ padding: 'var(--spacing-lg) 0' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--spacing-md)', height: '300px' }}>
                            {monthlyData.map((data, index) => (
                                <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-xs)' }}>
                                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-primary)' }}>
                                        {data.users}
                                    </div>
                                    <div
                                        style={{
                                            width: '100%',
                                            height: `${(data.users / maxUsers) * 100}%`,
                                            background: 'var(--gradient-primary)',
                                            borderRadius: 'var(--radius-sm)',
                                            transition: 'height 0.3s ease',
                                            minHeight: '20px',
                                        }}
                                    />
                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: 'var(--spacing-xs)' }}>
                                        {data.month}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tournament & Registration Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--spacing-lg)' }}>
                    <div className="content-card">
                        <div className="content-card-header">
                            <h2 className="content-card-title">Tournament Activity</h2>
                        </div>
                        <div style={{ padding: 'var(--spacing-lg) 0' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--spacing-sm)', height: '200px' }}>
                                {monthlyData.map((data, index) => (
                                    <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-xs)' }}>
                                        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-secondary)' }}>
                                            {data.tournaments}
                                        </div>
                                        <div
                                            style={{
                                                width: '100%',
                                                height: `${(data.tournaments / maxTournaments) * 100}%`,
                                                background: 'var(--gradient-secondary)',
                                                borderRadius: 'var(--radius-sm)',
                                                minHeight: '15px',
                                            }}
                                        />
                                        <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>
                                            {data.month}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="content-card">
                        <div className="content-card-header">
                            <h2 className="content-card-title">Registration Trends</h2>
                        </div>
                        <div style={{ padding: 'var(--spacing-lg) 0' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--spacing-sm)', height: '200px' }}>
                                {monthlyData.map((data, index) => (
                                    <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-xs)' }}>
                                        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-accent)' }}>
                                            {data.registrations}
                                        </div>
                                        <div
                                            style={{
                                                width: '100%',
                                                height: `${(data.registrations / maxRegistrations) * 100}%`,
                                                background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-primary) 100%)',
                                                borderRadius: 'var(--radius-sm)',
                                                minHeight: '15px',
                                            }}
                                        />
                                        <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>
                                            {data.month}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="content-card" style={{ marginTop: 'var(--spacing-lg)' }}>
                    <div className="content-card-header">
                        <h2 className="content-card-title">Key Metrics</h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--spacing-lg)' }}>
                        <div style={{ textAlign: 'center', padding: 'var(--spacing-lg)' }}>
                            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: 'var(--spacing-xs)' }}>
                                87%
                            </div>
                            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                                User Retention Rate
                            </div>
                        </div>
                        <div style={{ textAlign: 'center', padding: 'var(--spacing-lg)' }}>
                            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-secondary)', marginBottom: 'var(--spacing-xs)' }}>
                                4.8
                            </div>
                            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                                Avg. Rating
                            </div>
                        </div>
                        <div style={{ textAlign: 'center', padding: 'var(--spacing-lg)' }}>
                            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-accent)', marginBottom: 'var(--spacing-xs)' }}>
                                42
                            </div>
                            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                                Avg. Participants
                            </div>
                        </div>
                        <div style={{ textAlign: 'center', padding: 'var(--spacing-lg)' }}>
                            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#4ade80', marginBottom: 'var(--spacing-xs)' }}>
                                92%
                            </div>
                            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                                Tournament Fill Rate
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
