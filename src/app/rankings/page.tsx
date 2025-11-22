'use client';

import { useState } from 'react';
import PageHero from '@/components/PageHero';
import LeaderboardTable from '@/components/LeaderboardTable';
import styles from './page.module.css';

const allPlayers = [
    { rank: 1, name: 'Arjun Sharma', points: 2450, wins: 48, losses: 12, winRate: 80, city: 'Mumbai' },
    { rank: 2, name: 'Priya Patel', points: 2380, wins: 45, losses: 15, winRate: 75, city: 'Delhi' },
    { rank: 3, name: 'Rohan Kumar', points: 2290, wins: 42, losses: 18, winRate: 70, city: 'Bangalore' },
    { rank: 4, name: 'Sneha Reddy', points: 2150, wins: 38, losses: 22, winRate: 63, city: 'Hyderabad' },
    { rank: 5, name: 'Vikram Singh', points: 2080, wins: 36, losses: 24, winRate: 60, city: 'Pune' },
    { rank: 6, name: 'Ananya Gupta', points: 2020, wins: 34, losses: 26, winRate: 57, city: 'Chennai' },
    { rank: 7, name: 'Karan Mehta', points: 1950, wins: 32, losses: 28, winRate: 53, city: 'Kolkata' },
    { rank: 8, name: 'Ishita Verma', points: 1880, wins: 30, losses: 30, winRate: 50, city: 'Ahmedabad' },
    { rank: 9, name: 'Aditya Joshi', points: 1820, wins: 28, losses: 32, winRate: 47, city: 'Jaipur' },
    { rank: 10, name: 'Riya Kapoor', points: 1750, wins: 26, losses: 34, winRate: 43, city: 'Lucknow' },
    { rank: 11, name: 'Siddharth Nair', points: 1690, wins: 24, losses: 36, winRate: 40, city: 'Kochi' },
    { rank: 12, name: 'Meera Shah', points: 1620, wins: 22, losses: 38, winRate: 37, city: 'Surat' },
    { rank: 13, name: 'Rahul Desai', points: 1560, wins: 20, losses: 40, winRate: 33, city: 'Nagpur' },
    { rank: 14, name: 'Kavya Iyer', points: 1500, wins: 18, losses: 42, winRate: 30, city: 'Indore' },
    { rank: 15, name: 'Aryan Malhotra', points: 1440, wins: 16, losses: 44, winRate: 27, city: 'Chandigarh' },
];

export default function RankingsPage() {
    const [filter, setFilter] = useState<'all' | string>('all');

    const cities = Array.from(new Set(allPlayers.map(p => p.city)));

    const filteredPlayers = filter === 'all'
        ? allPlayers
        : allPlayers.filter(p => p.city === filter);

    return (
        <div className={styles.page}>
            <PageHero
                title="Player Rankings"
                subtitle="Top Beyblade bladers competing across India"
                backgroundImage="/beyblade-action.png"
            />

            <section className="section">
                <div className="container">
                    {/* Stats Cards */}
                    <div className={styles.statsGrid}>
                        <div className={`${styles.statCard} card-glass`}>
                            <div className={styles.statIcon}>👥</div>
                            <div className={styles.statNumber}>500+</div>
                            <div className={styles.statLabel}>Active Players</div>
                        </div>
                        <div className={`${styles.statCard} card-glass`}>
                            <div className={styles.statIcon}>🏆</div>
                            <div className={styles.statNumber}>50+</div>
                            <div className={styles.statLabel}>Tournaments Held</div>
                        </div>
                        <div className={`${styles.statCard} card-glass`}>
                            <div className={styles.statIcon}>🎯</div>
                            <div className={styles.statNumber}>2,450</div>
                            <div className={styles.statLabel}>Highest Score</div>
                        </div>
                        <div className={`${styles.statCard} card-glass`}>
                            <div className={styles.statIcon}>⚡</div>
                            <div className={styles.statNumber}>15+</div>
                            <div className={styles.statLabel}>Cities</div>
                        </div>
                    </div>

                    {/* City Filter */}
                    <div className={styles.filterSection}>
                        <h3>Filter by City</h3>
                        <div className={styles.filters}>
                            <button
                                className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
                                onClick={() => setFilter('all')}
                            >
                                All Cities
                            </button>
                            {cities.map(city => (
                                <button
                                    key={city}
                                    className={`${styles.filterButton} ${filter === city ? styles.active : ''}`}
                                    onClick={() => setFilter(city)}
                                >
                                    {city}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Leaderboard */}
                    <div className="animate-fadeIn">
                        <LeaderboardTable players={filteredPlayers} />
                    </div>
                </div>
            </section>
        </div>
    );
}
