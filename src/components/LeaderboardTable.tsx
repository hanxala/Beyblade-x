import styles from './LeaderboardTable.module.css';

interface Player {
    rank: number;
    name: string;
    points: number;
    wins: number;
    losses: number;
    winRate: number;
    city: string;
}

interface LeaderboardTableProps {
    players: Player[];
}

export default function LeaderboardTable({ players }: LeaderboardTableProps) {
    const getRankBadge = (rank: number) => {
        if (rank === 1) return '🥇';
        if (rank === 2) return '🥈';
        if (rank === 3) return '🥉';
        return rank;
    };

    const getRankClass = (rank: number) => {
        if (rank === 1) return styles.rank1;
        if (rank === 2) return styles.rank2;
        if (rank === 3) return styles.rank3;
        return '';
    };

    return (
        <div className={styles.tableContainer}>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Player</th>
                            <th>City</th>
                            <th>Points</th>
                            <th>Wins</th>
                            <th>Losses</th>
                            <th>Win Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player) => (
                            <tr key={player.rank} className={getRankClass(player.rank)}>
                                <td className={styles.rankCell}>
                                    <span className={styles.rankBadge}>
                                        {getRankBadge(player.rank)}
                                    </span>
                                </td>
                                <td className={styles.playerCell}>
                                    <div className={styles.playerAvatar}>
                                        {player.name.charAt(0)}
                                    </div>
                                    <span className={styles.playerName}>{player.name}</span>
                                </td>
                                <td>{player.city}</td>
                                <td className={styles.pointsCell}>{player.points}</td>
                                <td className={styles.winsCell}>{player.wins}</td>
                                <td className={styles.lossesCell}>{player.losses}</td>
                                <td>
                                    <div className={styles.winRateContainer}>
                                        <span className={styles.winRateText}>{player.winRate}%</span>
                                        <div className={styles.winRateBar}>
                                            <div
                                                className={styles.winRateFill}
                                                style={{ width: `${player.winRate}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
