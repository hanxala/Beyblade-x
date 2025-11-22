import styles from './TournamentCard.module.css';

interface TournamentCardProps {
    title: string;
    date: string;
    location: string;
    participants: number;
    maxParticipants: number;
    status: 'upcoming' | 'live' | 'completed';
    prize?: string;
    image?: string;
}

export default function TournamentCard({
    title,
    date,
    location,
    participants,
    maxParticipants,
    status,
    prize,
    image
}: TournamentCardProps) {
    const getStatusBadge = () => {
        switch (status) {
            case 'upcoming':
                return <span className="badge badge-upcoming">Upcoming</span>;
            case 'live':
                return <span className="badge badge-live">Live Now</span>;
            case 'completed':
                return <span className="badge badge-completed">Completed</span>;
            default:
                return null;
        }
    };

    const participantPercentage = (participants / maxParticipants) * 100;

    return (
        <div className={`${styles.card} card-glass`}>
            <div className={styles.cardImage} style={{
                backgroundImage: image ? `url(${image})` : 'var(--gradient-card)'
            }}>
                <div className={styles.statusBadge}>
                    {getStatusBadge()}
                </div>
            </div>

            <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{title}</h3>

                <div className={styles.cardInfo}>
                    <div className={styles.infoItem}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        <span>{date}</span>
                    </div>

                    <div className={styles.infoItem}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span>{location}</span>
                    </div>
                </div>

                {prize && (
                    <div className={styles.prize}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                        </svg>
                        <span>Prize: {prize}</span>
                    </div>
                )}

                <div className={styles.participants}>
                    <div className={styles.participantInfo}>
                        <span className={styles.participantCount}>
                            {participants}/{maxParticipants} Participants
                        </span>
                        <span className={styles.participantPercent}>
                            {participantPercentage.toFixed(0)}%
                        </span>
                    </div>
                    <div className={styles.progressBar}>
                        <div
                            className={styles.progressFill}
                            style={{ width: `${participantPercentage}%` }}
                        ></div>
                    </div>
                </div>

                <button className={`btn ${status === 'completed' ? 'btn-outline' : 'btn-primary'} ${styles.registerButton}`}>
                    {status === 'completed' ? 'View Results' : status === 'live' ? 'Watch Live' : 'Register Now'}
                </button>
            </div>
        </div>
    );
}
