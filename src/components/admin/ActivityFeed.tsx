import { Activity } from '@/lib/mockData';
import styles from './ActivityFeed.module.css';

interface ActivityFeedProps {
    activities: Activity[];
}

const activityIcons: Record<Activity['type'], string> = {
    user_registered: '👤',
    tournament_created: '🏆',
    tournament_completed: '✅',
    user_banned: '🚫',
};

const activityColors: Record<Activity['type'], string> = {
    user_registered: '#4ade80',
    tournament_created: '#60a5fa',
    tournament_completed: '#a78bfa',
    user_banned: '#f87171',
};

export default function ActivityFeed({ activities }: ActivityFeedProps) {
    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    };

    return (
        <div className={styles.activityFeed}>
            {activities.length === 0 ? (
                <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>📭</div>
                    <div className={styles.emptyText}>No recent activity</div>
                </div>
            ) : (
                <ul className={styles.activityList}>
                    {activities.map((activity) => (
                        <li key={activity.id} className={styles.activityItem}>
                            <div
                                className={styles.activityIcon}
                                style={{ backgroundColor: activityColors[activity.type] + '20', color: activityColors[activity.type] }}
                            >
                                {activityIcons[activity.type]}
                            </div>
                            <div className={styles.activityContent}>
                                <div className={styles.activityDescription}>{activity.description}</div>
                                <div className={styles.activityTime}>{formatTime(activity.timestamp)}</div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
