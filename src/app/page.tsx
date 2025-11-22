'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import TournamentCard from '@/components/TournamentCard';
import LeaderboardTable from '@/components/LeaderboardTable';
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

const topPlayers = [
  { rank: 1, name: 'Arjun Sharma', points: 2450, wins: 48, losses: 12, winRate: 80, city: 'Mumbai' },
  { rank: 2, name: 'Priya Patel', points: 2380, wins: 45, losses: 15, winRate: 75, city: 'Delhi' },
  { rank: 3, name: 'Rohan Kumar', points: 2290, wins: 42, losses: 18, winRate: 70, city: 'Bangalore' },
  { rank: 4, name: 'Sneha Reddy', points: 2150, wins: 38, losses: 22, winRate: 63, city: 'Hyderabad' },
  { rank: 5, name: 'Vikram Singh', points: 2080, wins: 36, losses: 24, winRate: 60, city: 'Pune' },
];

export default function Home() {
  const [featuredTournaments, setFeaturedTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedTournaments();
  }, []);

  const fetchFeaturedTournaments = async () => {
    try {
      const response = await fetch('/api/tournaments?limit=3&status=upcoming');
      if (response.ok) {
        const data = await response.json();
        setFeaturedTournaments(data.tournaments || []);
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

  return (
    <main>
      <Hero />

      {/* Featured Tournaments */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Featured Tournaments</h2>
            <a href="/tournaments" className="btn btn-outline">
              View All Tournaments
            </a>
          </div>

          {loading ? (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Loading tournaments...</p>
            </div>
          ) : featuredTournaments.length > 0 ? (
            <div className={styles.tournamentGrid}>
              {featuredTournaments.map((tournament) => (
                <TournamentCard
                  key={tournament._id}
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
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>No upcoming tournaments at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Leaderboard */}
      <section className={`${styles.section} ${styles.leaderboardSection}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Top Players</h2>
            <a href="/rankings" className="btn btn-outline">
              View Full Rankings
            </a>
          </div>
          <LeaderboardTable players={topPlayers} />
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2>Ready to Compete?</h2>
            <p>Join thousands of bladers in epic tournaments across India</p>
            <div className={styles.ctaButtons}>
              <a href="/tournaments" className="btn btn-primary btn-lg">
                Browse Tournaments
              </a>
              <a href="/sign-up" className="btn btn-outline btn-lg">
                Create Account
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
