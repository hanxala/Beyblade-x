interface StatsCardProps {
    title: string;
    value: string;
    icon: string;
    trend?: number;
    trendLabel?: string;
}

export default function StatsCard({ title, value, icon, trend, trendLabel }: StatsCardProps) {
    const isPositive = trend && trend > 0;
    const isNegative = trend && trend < 0;

    return (
        <div className="stat-card">
            <div className="stat-card-header">
                <div className="stat-card-title">{title}</div>
                <div className="stat-card-icon">{icon}</div>
            </div>
            <div className="stat-card-value">{value}</div>
            {trend !== undefined && (
                <div className={`stat-card-trend ${isPositive ? 'positive' : isNegative ? 'negative' : ''}`}>
                    <span>{isPositive ? '↑' : isNegative ? '↓' : '→'}</span>
                    <span>{Math.abs(trend).toFixed(1)}%</span>
                    {trendLabel && <span style={{ opacity: 0.7 }}>{trendLabel}</span>}
                </div>
            )}
        </div>
    );
}
