'use client';

import { useState, useEffect } from 'react';
import TournamentCard from '@/components/TournamentCard';
import styles from './page.module.css';

interface Tournament {
    _id: string;
    title: string;
    date: string;
    location: string;
    currentParticipants: number;
    maxParticipants: number;
    status: 'upcoming' | 'live' | 'completed';
    prize?: string;
    imageUrl?: string;
}

export default function TournamentsPage() {
    const [tournaments, setTournaments] = useState<Tournament[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'upcoming' | 'live' | 'completed'>('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchTournaments();
    }, []);

    const fetchTournaments = async () => {
        try {
            const response = await fetch('/api/tournaments');
            if (response.ok) {
                const data = await response.json();
                setTournaments(data.tournaments || []);
            }
        } catch (error) {
            console.error('Error fetching tournaments:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const filteredTournaments = tournaments.filter(tournament => {
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
                    {loading ? (
                        <div className={styles.loading}>
                            <div className={styles.spinner}></div>
                            <p>Loading tournaments...</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-3">
                                {filteredTournaments.map((tournament, index) => (
                                    <div key={tournament._id} className="animate-fadeIn" style={{ animationDelay: `${index * 0.05}s` }}>
                                        <TournamentCard
                                            id={tournament._id}
                                            title={tournament.title}
                                            date={formatDate(tournament.date)}
                                            location={tournament.location}
                                            participants={tournament.currentParticipants}
                                            maxParticipants={tournament.maxParticipants}
                                            status={tournament.status}
                                            prize={tournament.prize}
                                            image={tournament.imageUrl}
                                        />
                                    </div>
                                ))}
                            </div>

                            {filteredTournaments.length === 0 && (
                                <div className={styles.noResults}>
                                    <p>No tournaments found matching your criteria.</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </div>
    );
}
