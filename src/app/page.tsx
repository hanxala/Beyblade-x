import Hero from '@/components/Hero';
import TournamentCard from '@/components/TournamentCard';
import LeaderboardTable from '@/components/LeaderboardTable';
import styles from './page.module.css';

const featuredTournaments = [
  {
    id: 'mock-tournament-1',
    title: 'Mumbai Championship 2025',
    date: 'Dec 25, 2025',
    location: 'Mumbai, Maharashtra',
    participants: 45,
    maxParticipants: 64,
    status: 'upcoming' as const,
    prize: '₹50,000',
    image: '/mumbai-championship.png',
  },
  {
    id: 'mock-tournament-2',
    title: 'Delhi Battle Royale',
    date: 'Nov 28, 2025',
    location: 'Delhi, NCR',
    participants: 30,
    maxParticipants: 32,
    status: 'upcoming' as const,
    prize: '₹35,000',
    image: '/delhi-battle.png',
  },
  {
    id: 'mock-tournament-3',
    title: 'Bangalore Bladers Cup',
    date: 'Jan 5, 2026',
    location: 'Bangalore, Karnataka',
    participants: 28,
    maxParticipants: 48,
    status: 'upcoming' as const,
    prize: '₹40,000',
    image: '/bangalore-cup.png',
  },
];

const topPlayers = [
  { rank: 1, name: 'Arjun Sharma', points: 2450, wins: 48, losses: 12, winRate: 80, city: 'Mumbai' },
  { rank: 2, name: 'Priya Patel', points: 2380, wins: 45, losses: 15, winRate: 75, city: 'Delhi' },
  { rank: 3, name: 'Rohan Kumar', points: 2290, wins: 42, losses: 18, winRate: 70, city: 'Bangalore' },
  { rank: 4, name: 'Sneha Reddy', points: 2150, wins: 38, losses: 22, winRate: 63, city: 'Hyderabad' },
  { rank: 5, name: 'Vikram Singh', points: 2080, wins: 36, losses: 24, winRate: 60, city: 'Pune' },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <Hero />

      {/* Featured Tournaments Section */}
      <section className="section">
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className="animate-fadeIn">Featured Tournaments</h2>
            <p className="animate-fadeIn">
              Join the most exciting Beyblade battles across India
            </p>
          </div>

          <div className="grid grid-3">
            {featuredTournaments.map((tournament, index) => (
              <div key={index} className="animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                <TournamentCard {...tournament} />
              </div>
            ))}
          </div>

          <div className={styles.viewAllButton}>
            <a href="/tournaments" className="btn btn-primary">
              View All Tournaments
            </a>
          </div>
        </div>
      </section>

      {/* Top Players Section */}
      <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className="animate-fadeIn">Top Players</h2>
            <p className="animate-fadeIn">
              The best Beyblade bladers in India
            </p>
          </div>

          <div className="animate-fadeIn">
            <LeaderboardTable players={topPlayers} />
          </div>

          <div className={styles.viewAllButton}>
            <a href="/rankings" className="btn btn-secondary">
              View Full Rankings
            </a>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="section">
        <div className="container">
          <div className={styles.ctaSection}>
            <div className={styles.ctaContent}>
              <h2 className="animate-fadeIn">Ready to Compete?</h2>
              <p className="animate-fadeIn">
                Join thousands of bladers across India and prove your skills in epic Beyblade battles!
              </p>
              <div className={styles.ctaButtons}>
                <a href="/tournaments" className="btn btn-primary">
                  Find Tournaments
                </a>
                <a href="/contact" className="btn btn-outline">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
