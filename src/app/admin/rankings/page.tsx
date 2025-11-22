import AdminTopBar from '@/components/admin/AdminTopBar';
import { mockRankings } from '@/lib/mockData';

export default function RankingsPage() {
    return (
        <>
            <AdminTopBar title="Rankings Management" />

            <div className="admin-container">
                <div className="content-card">
                    <div className="content-card-header">
                        <h2 className="content-card-title">Player Rankings</h2>
                        <button className="btn-admin btn-admin-secondary">
                            🔄 Recalculate Rankings
                        </button>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Player</th>
                                    <th>City</th>
                                    <th>Points</th>
                                    <th>W/L</th>
                                    <th>Win Rate</th>
                                    <th>Trend</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockRankings.map((ranking) => (
                                    <tr key={ranking.userId}>
                                        <td>
                                            <div style={{
                                                fontWeight: 700,
                                                fontSize: '1.25rem',
                                                color: ranking.rank <= 3 ? 'var(--color-accent)' : 'var(--color-text-primary)'
                                            }}>
                                                #{ranking.rank}
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ fontWeight: 600 }}>{ranking.name}</div>
                                            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                                                ID: {ranking.userId}
                                            </div>
                                        </td>
                                        <td>{ranking.city}</td>
                                        <td style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                                            {ranking.points.toLocaleString()}
                                        </td>
                                        <td>
                                            <span style={{ color: '#4ade80' }}>{ranking.wins}</span>
                                            {' / '}
                                            <span style={{ color: '#f87171' }}>{ranking.losses}</span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}>
                                                <div style={{ flex: 1, maxWidth: '100px' }}>
                                                    <div style={{
                                                        width: '100%',
                                                        height: '6px',
                                                        background: 'rgba(255,255,255,0.1)',
                                                        borderRadius: '3px'
                                                    }}>
                                                        <div style={{
                                                            width: `${ranking.winRate}%`,
                                                            height: '100%',
                                                            background: 'var(--gradient-primary)',
                                                            borderRadius: '3px'
                                                        }} />
                                                    </div>
                                                </div>
                                                <span style={{ fontWeight: 600, minWidth: '40px' }}>{ranking.winRate}%</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span style={{
                                                fontSize: '1.25rem',
                                                color: ranking.trend === 'up' ? '#4ade80' : ranking.trend === 'down' ? '#f87171' : 'var(--color-text-muted)'
                                            }}>
                                                {ranking.trend === 'up' ? '↑' : ranking.trend === 'down' ? '↓' : '→'}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="btn-admin btn-admin-secondary" style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem' }}>
                                                ✏️ Adjust Points
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
