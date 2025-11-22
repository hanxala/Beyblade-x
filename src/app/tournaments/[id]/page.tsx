'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import styles from './page.module.css';

interface Tournament {
    _id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    maxParticipants: number;
    currentParticipants: number;
    prize?: string;
    registrationDeadline: string;
    imageUrl?: string;
    status: 'upcoming' | 'live' | 'completed';
    createdBy: {
        name: string;
        email: string;
    };
}

export default function TournamentDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { user, isLoaded } = useUser();
    const [tournament, setTournament] = useState<Tournament | null>(null);
    const [loading, setLoading] = useState(true);
    const [registering, setRegistering] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [tournamentId, setTournamentId] = useState('');

    useEffect(() => {
        params.then(({ id }) => {
            setTournamentId(id);
            fetchTournament(id);
        });
    }, [params]);

    const fetchTournament = async (id: string) => {
        try {
            // Check if it's a mock tournament ID
            if (id.startsWith('mock-tournament-')) {
                // Use mock data for development
                const mockTournaments: Record<string, any> = {
                    'mock-tournament-1': {
                        _id: 'mock-tournament-1',
                        title: 'Mumbai Championship 2025',
                        description: 'Join us for the biggest Beyblade tournament in Mumbai! Compete against the best bladers in Maharashtra for glory and amazing prizes. This championship features multiple rounds, expert judges, and an electrifying atmosphere.',
                        date: '2025-01-25',
                        location: 'Mumbai, Maharashtra',
                        maxParticipants: 64,
                        currentParticipants: 45,
                        prize: '₹50,000',
                        registrationDeadline: '2025-01-20',
                        imageUrl: '/mumbai-championship.png',
                        status: 'upcoming' as const,
                        createdBy: { name: 'Tournament Admin', email: 'admin@beyblade-x.com' }
                    },
                    'mock-tournament-2': {
                        _id: 'mock-tournament-2',
                        title: 'Delhi Battle Royale',
                        description: 'The ultimate Beyblade showdown in the capital! Watch as Delhi\'s finest bladers clash in an epic battle for supremacy. Live streaming available!',
                        date: '2025-01-20',
                        location: 'Delhi, NCR',
                        maxParticipants: 32,
                        currentParticipants: 32,
                        prize: '₹35,000',
                        registrationDeadline: '2025-01-18',
                        imageUrl: '/delhi-battle.png',
                        status: 'live' as const,
                        createdBy: { name: 'Tournament Admin', email: 'admin@beyblade-x.com' }
                    },
                    'mock-tournament-3': {
                        _id: 'mock-tournament-3',
                        title: 'Bangalore Bladers Cup',
                        description: 'Tech city meets Beyblade! Bangalore\'s premier tournament featuring cutting-edge arena technology and the best bladers from Karnataka.',
                        date: '2025-02-05',
                        location: 'Bangalore, Karnataka',
                        maxParticipants: 48,
                        currentParticipants: 28,
                        prize: '₹40,000',
                        registrationDeadline: '2025-02-01',
                        imageUrl: '/bangalore-cup.png',
                        status: 'upcoming' as const,
                        createdBy: { name: 'Tournament Admin', email: 'admin@beyblade-x.com' }
                    },
                };

                const mockTournament = mockTournaments[id];
                if (mockTournament) {
                    setTournament(mockTournament);
                    if (user) {
                        checkRegistration(id);
                    }
                    setLoading(false);
                    return;
                }
            }

            // Try to fetch from API
            const response = await fetch(`/api/tournaments/${id}`);
            if (!response.ok) throw new Error('Tournament not found');

            const data = await response.json();
            setTournament(data.tournament);

            if (user) {
                checkRegistration(id);
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const checkRegistration = async (id: string) => {
        try {
            const response = await fetch(`/api/tournaments/${id}/registration-status`);
            if (response.ok) {
                const data = await response.json();
                setIsRegistered(data.isRegistered);
            }
        } catch (err) {
            console.error('Error checking registration:', err);
        }
    };

    const handleRegister = async () => {
        if (!user) {
            router.push('/sign-in');
            return;
        }

        setRegistering(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch(`/api/tournaments/${tournamentId}/register`, {
                method: 'POST',
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to register');
            }

            setSuccess('Successfully registered for tournament!');
            setIsRegistered(true);

            // Refresh tournament data
            fetchTournament(tournamentId);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setRegistering(false);
        }
    };

    const handleUnregister = async () => {
        if (!confirm('Are you sure you want to cancel your registration?')) {
            return;
        }

        setRegistering(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch(`/api/tournaments/${tournamentId}/register`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to unregister');
            }

            setSuccess('Successfully cancelled registration!');
            setIsRegistered(false);

            // Refresh tournament data
            fetchTournament(tournamentId);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setRegistering(false);
        }
    };

    if (loading) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Loading tournament...</p>
            </div>
        );
    }

    if (error && !tournament) {
        return (
            <div className={styles.error}>
                <h2>Error</h2>
                <p>{error}</p>
                <button onClick={() => router.push('/tournaments')} className="btn btn-primary">
                    Back to Tournaments
                </button>
            </div>
        );
    }

    if (!tournament) {
        return (
            <div className={styles.error}>
                <h2>Tournament Not Found</h2>
                <button onClick={() => router.push('/tournaments')} className="btn btn-primary">
                    Back to Tournaments
                </button>
            </div>
        );
    }

    const participantPercentage = (tournament.currentParticipants / tournament.maxParticipants) * 100;
    const isFull = tournament.currentParticipants >= tournament.maxParticipants;
    const deadlinePassed = new Date(tournament.registrationDeadline) < new Date();
    const canRegister = tournament.status === 'upcoming' && !isFull && !deadlinePassed && !isRegistered;

    return (
        <div className={styles.page}>
            {/* Hero Section with Tournament Image */}
            <div className={styles.hero}>
                {tournament.imageUrl ? (
                    <Image
                        src={tournament.imageUrl}
                        alt={tournament.title}
                        fill
                        className={styles.heroImage}
                        priority
                    />
                ) : (
                    <div className={styles.heroGradient}></div>
                )}
                <div className={styles.heroOverlay}>
                    <div className="container">
                        <div className={styles.heroContent}>
                            <span className={`badge badge-${tournament.status}`}>
                                {tournament.status === 'upcoming' ? 'Upcoming' :
                                    tournament.status === 'live' ? 'Live Now' : 'Completed'}
                            </span>
                            <h1>{tournament.title}</h1>
                            <div className={styles.heroMeta}>
                                <span>📅 {new Date(tournament.date).toLocaleDateString()}</span>
                                <span>📍 {tournament.location}</span>
                                {tournament.prize && <span>🏆 {tournament.prize}</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container">
                <div className={styles.content}>
                    {/* Messages */}
                    {error && (
                        <div className={styles.errorMessage}>
                            ❌ {error}
                        </div>
                    )}
                    {success && (
                        <div className={styles.successMessage}>
                            ✅ {success}
                        </div>
                    )}

                    <div className={styles.grid}>
                        {/* Left Column - Details */}
                        <div className={styles.details}>
                            <div className="card-glass">
                                <h2>About This Tournament</h2>
                                <p className={styles.description}>{tournament.description}</p>

                                <div className={styles.infoGrid}>
                                    <div className={styles.infoItem}>
                                        <span className={styles.infoLabel}>Tournament Date</span>
                                        <span className={styles.infoValue}>
                                            {new Date(tournament.date).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>

                                    <div className={styles.infoItem}>
                                        <span className={styles.infoLabel}>Registration Deadline</span>
                                        <span className={styles.infoValue}>
                                            {new Date(tournament.registrationDeadline).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>

                                    <div className={styles.infoItem}>
                                        <span className={styles.infoLabel}>Location</span>
                                        <span className={styles.infoValue}>{tournament.location}</span>
                                    </div>

                                    {tournament.prize && (
                                        <div className={styles.infoItem}>
                                            <span className={styles.infoLabel}>Prize Pool</span>
                                            <span className={styles.infoValue}>{tournament.prize}</span>
                                        </div>
                                    )}

                                    <div className={styles.infoItem}>
                                        <span className={styles.infoLabel}>Organizer</span>
                                        <span className={styles.infoValue}>{tournament.createdBy.name}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Registration */}
                        <div className={styles.sidebar}>
                            <div className="card-glass">
                                <h3>Registration</h3>

                                <div className={styles.participants}>
                                    <div className={styles.participantInfo}>
                                        <span className={styles.participantCount}>
                                            {tournament.currentParticipants}/{tournament.maxParticipants}
                                        </span>
                                        <span className={styles.participantLabel}>Participants</span>
                                    </div>
                                    <div className={styles.progressBar}>
                                        <div
                                            className={styles.progressFill}
                                            style={{ width: `${participantPercentage}%` }}
                                        ></div>
                                    </div>
                                    <span className={styles.participantPercent}>
                                        {participantPercentage.toFixed(0)}% Full
                                    </span>
                                </div>

                                {isRegistered ? (
                                    <div className={styles.registeredStatus}>
                                        <p className={styles.registeredText}>
                                            ✅ You're registered for this tournament!
                                        </p>
                                        <button
                                            onClick={handleUnregister}
                                            disabled={registering}
                                            className="btn btn-outline"
                                        >
                                            {registering ? 'Cancelling...' : 'Cancel Registration'}
                                        </button>
                                    </div>
                                ) : canRegister ? (
                                    <button
                                        onClick={handleRegister}
                                        disabled={registering}
                                        className="btn btn-primary"
                                    >
                                        {registering ? 'Registering...' : 'Register Now'}
                                    </button>
                                ) : (
                                    <div className={styles.unavailable}>
                                        {isFull && <p>❌ Tournament is full</p>}
                                        {deadlinePassed && <p>❌ Registration deadline has passed</p>}
                                        {tournament.status !== 'upcoming' && <p>❌ Registration closed</p>}
                                    </div>
                                )}

                                {!user && tournament.status === 'upcoming' && (
                                    <p className={styles.signInPrompt}>
                                        <a href="/sign-in">Sign in</a> to register for this tournament
                                    </p>
                                )}
                            </div>

                            <div className="card-glass">
                                <h3>Tournament Rules</h3>
                                <ul className={styles.rules}>
                                    <li>All participants must bring their own Beyblades</li>
                                    <li>Standard WBO tournament rules apply</li>
                                    <li>Check-in opens 30 minutes before start time</li>
                                    <li>Late arrivals may be disqualified</li>
                                    <li>Respect all players and officials</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
