'use client';

import { useState } from 'react';
import TournamentCard from '@/components/TournamentCard';
import styles from './page.module.css';

const allTournaments = [
    {
        id: 'mock-tournament-1',
        title: 'Mumbai Championship 2025',
        date: 'Jan 25, 2025',
        location: 'Mumbai, Maharashtra',
        participants: 45,
        maxParticipants: 64,
        status: 'upcoming' as const,
        prize: '₹50,000',
    },
    {
        id: 'mock-tournament-2',
        title: 'Delhi Battle Royale',
        date: 'Jan 20, 2025',
        location: 'Delhi, NCR',
        participants: 32,
        maxParticipants: 32,
        status: 'live' as const,
        prize: '₹35,000',
    },
    {
        id: 'mock-tournament-3',
        title: 'Bangalore Bladers Cup',
        date: 'Feb 5, 2025',
        location: 'Bangalore, Karnataka',
        participants: 28,
        maxParticipants: 48,
        status: 'upcoming' as const,
        prize: '₹40,000',
    },
    {
        id: 'mock-tournament-4',
        title: 'Hyderabad Masters',
        date: 'Feb 12, 2025',
        location: 'Hyderabad, Telangana',
        participants: 20,
        maxParticipants: 40,
        status: 'upcoming' as const,
        prize: '₹30,000',
    },
    {
        id: 'mock-tournament-5',
        title: 'Pune Championship',
        date: 'Jan 15, 2025',
        location: 'Pune, Maharashtra',
        participants: 32,
        maxParticipants: 32,
        status: 'completed' as const,
        prize: '₹25,000',
    },
    {
        id: 'mock-tournament-6',
        title: 'Chennai Showdown',
        date: 'Feb 18, 2025',
        location: 'Chennai, Tamil Nadu',
        participants: 15,
        maxParticipants: 48,
        status: 'upcoming' as const,
        prize: '₹35,000',
    },
    {
        id: 'mock-tournament-7',
        title: 'Kolkata Battle Arena',
        date: 'Jan 10, 2025',
        location: 'Kolkata, West Bengal',
        participants: 24,
        maxParticipants: 24,
        status: 'completed' as const,
        prize: '₹20,000',
    },
    {
        id: 'mock-tournament-8',
        title: 'Ahmedabad Clash',
        date: 'Feb 22, 2025',
        location: 'Ahmedabad, Gujarat',
        participants: 18,
        maxParticipants: 40,
        status: 'upcoming' as const,
        prize: '₹28,000',
    },
    {
        id: 'mock-tournament-9',
        title: 'Jaipur Royale',
        date: 'Mar 1, 2025',
        location: 'Jaipur, Rajasthan',
        participants: 12,
        maxParticipants: 32,
        status: 'upcoming' as const,
        prize: '₹22,000',
    },
];

export default function TournamentsPage() {
    const [filter, setFilter] = useState<'all' | 'upcoming' | 'live' | 'completed'>('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTournaments = allTournaments.filter(tournament => {
        const matchesFilter = filter === 'all' || tournament.status === filter;
        const matchesSearch = tournament.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tournament.location.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className={styles.page}>
            <div className={styles.pageHeader}>
                <div className="container">
                    <h1 className="animate-fadeIn">Tournaments</h1>
                    <p className="animate-fadeIn">
                        Discover and join Beyblade tournaments happening across India
                    </p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    {/* Filters and Search */}
                    <div className={styles.controls}>
                        <div className={styles.filters}>
                            <button
                                className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
                                onClick={() => setFilter('all')}
                            >
                                All Tournaments
                            </button>
                            <button
                                className={`${styles.filterButton} ${filter === 'upcoming' ? styles.active : ''}`}
                                onClick={() => setFilter('upcoming')}
                            >
                                Upcoming
                            </button>
                            <button
                                className={`${styles.filterButton} ${filter === 'live' ? styles.active : ''}`}
                                onClick={() => setFilter('live')}
                            >
                                Live Now
                            </button>
                            <button
                                className={`${styles.filterButton} ${filter === 'completed' ? styles.active : ''}`}
                                onClick={() => setFilter('completed')}
                            >
                                Completed
                            </button>
                        </div>

                        <div className={styles.searchBox}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.35-4.35" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search tournaments..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={styles.searchInput}
                            />
                        </div>
                    </div>

                    {/* Tournament Grid */}
                    <div className="grid grid-3">
                        {filteredTournaments.map((tournament, index) => (
                            <div key={index} className="animate-fadeIn" style={{ animationDelay: `${index * 0.05}s` }}>
                                <TournamentCard {...tournament} />
                            </div>
                        ))}
                    </div>

                    {filteredTournaments.length === 0 && (
                        <div className={styles.noResults}>
                            <p>No tournaments found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
