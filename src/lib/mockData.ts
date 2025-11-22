// Mock data for admin panel - Replace with real database later

export interface Tournament {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    participants: number;
    maxParticipants: number;
    status: 'upcoming' | 'live' | 'completed';
    prize: string;
    imageUrl?: string;
    registrationDeadline: string;
    createdAt: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    status: 'active' | 'banned';
    joinedDate: string;
    tournamentsPlayed: number;
    wins: number;
    losses: number;
    points: number;
    city: string;
    imageUrl?: string;
}

export interface Ranking {
    rank: number;
    userId: string;
    name: string;
    points: number;
    wins: number;
    losses: number;
    winRate: number;
    city: string;
    trend: 'up' | 'down' | 'same';
}

export interface Announcement {
    id: string;
    title: string;
    content: string;
    type: 'info' | 'warning' | 'success';
    createdAt: string;
    active: boolean;
}

export interface Activity {
    id: string;
    type: 'user_registered' | 'tournament_created' | 'tournament_completed' | 'user_banned';
    description: string;
    timestamp: string;
    userId?: string;
    tournamentId?: string;
}

// Mock Tournaments
export const mockTournaments: Tournament[] = [
    {
        id: '1',
        title: 'Mumbai Championship 2025',
        description: 'The biggest Beyblade tournament in Mumbai featuring top players from across Maharashtra.',
        date: '2025-01-25',
        location: 'Mumbai, Maharashtra',
        participants: 45,
        maxParticipants: 64,
        status: 'upcoming',
        prize: '₹50,000',
        registrationDeadline: '2025-01-20',
        createdAt: '2024-12-01',
    },
    {
        id: '2',
        title: 'Delhi Battle Royale',
        description: 'Intense battles in the capital city. Join the best bladers in Delhi NCR.',
        date: '2025-01-20',
        location: 'Delhi, NCR',
        participants: 32,
        maxParticipants: 32,
        status: 'live',
        prize: '₹35,000',
        registrationDeadline: '2025-01-15',
        createdAt: '2024-11-28',
    },
    {
        id: '3',
        title: 'Bangalore Bladers Cup',
        description: 'Tech city meets Beyblade! Show your skills in Bangalore.',
        date: '2025-02-05',
        location: 'Bangalore, Karnataka',
        participants: 28,
        maxParticipants: 48,
        status: 'upcoming',
        prize: '₹40,000',
        registrationDeadline: '2025-02-01',
        createdAt: '2024-12-05',
    },
    {
        id: '4',
        title: 'Hyderabad Masters',
        description: 'Elite tournament for experienced bladers only.',
        date: '2024-12-15',
        location: 'Hyderabad, Telangana',
        participants: 24,
        maxParticipants: 24,
        status: 'completed',
        prize: '₹30,000',
        registrationDeadline: '2024-12-10',
        createdAt: '2024-11-20',
    },
    {
        id: '5',
        title: 'Pune Championship',
        description: 'Regional championship with exciting prizes.',
        date: '2025-02-15',
        location: 'Pune, Maharashtra',
        participants: 15,
        maxParticipants: 40,
        status: 'upcoming',
        prize: '₹25,000',
        registrationDeadline: '2025-02-10',
        createdAt: '2024-12-10',
    },
];

// Mock Users
export const mockUsers: User[] = [
    {
        id: '1',
        name: 'Arjun Sharma',
        email: 'arjun.sharma@example.com',
        role: 'user',
        status: 'active',
        joinedDate: '2024-06-15',
        tournamentsPlayed: 60,
        wins: 48,
        losses: 12,
        points: 2450,
        city: 'Mumbai',
    },
    {
        id: '2',
        name: 'Priya Patel',
        email: 'priya.patel@example.com',
        role: 'user',
        status: 'active',
        joinedDate: '2024-07-20',
        tournamentsPlayed: 60,
        wins: 45,
        losses: 15,
        points: 2380,
        city: 'Delhi',
    },
    {
        id: '3',
        name: 'Rohan Kumar',
        email: 'rohan.kumar@example.com',
        role: 'user',
        status: 'active',
        joinedDate: '2024-05-10',
        tournamentsPlayed: 60,
        wins: 42,
        losses: 18,
        points: 2290,
        city: 'Bangalore',
    },
    {
        id: '4',
        name: 'Sneha Reddy',
        email: 'sneha.reddy@example.com',
        role: 'user',
        status: 'active',
        joinedDate: '2024-08-05',
        tournamentsPlayed: 60,
        wins: 38,
        losses: 22,
        points: 2150,
        city: 'Hyderabad',
    },
    {
        id: '5',
        name: 'Vikram Singh',
        email: 'vikram.singh@example.com',
        role: 'user',
        status: 'banned',
        joinedDate: '2024-04-12',
        tournamentsPlayed: 60,
        wins: 36,
        losses: 24,
        points: 2080,
        city: 'Pune',
    },
];

// Mock Rankings
export const mockRankings: Ranking[] = [
    { rank: 1, userId: '1', name: 'Arjun Sharma', points: 2450, wins: 48, losses: 12, winRate: 80, city: 'Mumbai', trend: 'up' },
    { rank: 2, userId: '2', name: 'Priya Patel', points: 2380, wins: 45, losses: 15, winRate: 75, city: 'Delhi', trend: 'same' },
    { rank: 3, userId: '3', name: 'Rohan Kumar', points: 2290, wins: 42, losses: 18, winRate: 70, city: 'Bangalore', trend: 'down' },
    { rank: 4, userId: '4', name: 'Sneha Reddy', points: 2150, wins: 38, losses: 22, winRate: 63, city: 'Hyderabad', trend: 'up' },
    { rank: 5, userId: '5', name: 'Vikram Singh', points: 2080, wins: 36, losses: 24, winRate: 60, city: 'Pune', trend: 'same' },
];

// Mock Announcements
export const mockAnnouncements: Announcement[] = [
    {
        id: '1',
        title: 'New Tournament Season Starting!',
        content: 'Get ready for the 2025 tournament season with bigger prizes and more locations.',
        type: 'success',
        createdAt: '2024-12-01',
        active: true,
    },
    {
        id: '2',
        title: 'Maintenance Scheduled',
        content: 'Platform maintenance scheduled for Dec 25th, 2AM-4AM IST.',
        type: 'warning',
        createdAt: '2024-12-10',
        active: true,
    },
];

// Mock Activity
export const mockActivities: Activity[] = [
    {
        id: '1',
        type: 'tournament_created',
        description: 'New tournament "Mumbai Championship 2025" created',
        timestamp: '2024-12-15T10:30:00',
        tournamentId: '1',
    },
    {
        id: '2',
        type: 'user_registered',
        description: 'New user "Arjun Sharma" registered',
        timestamp: '2024-12-15T09:15:00',
        userId: '1',
    },
    {
        id: '3',
        type: 'tournament_completed',
        description: 'Tournament "Hyderabad Masters" completed',
        timestamp: '2024-12-15T08:00:00',
        tournamentId: '4',
    },
    {
        id: '4',
        type: 'user_banned',
        description: 'User "Vikram Singh" was banned',
        timestamp: '2024-12-14T16:45:00',
        userId: '5',
    },
];

// Stats for dashboard
export const mockStats = {
    totalUsers: 1247,
    activeUsers: 892,
    totalTournaments: 45,
    activeTournaments: 12,
    totalRegistrations: 3456,
    monthlyRevenue: 125000,
    userGrowth: 12.5, // percentage
    tournamentGrowth: 8.3, // percentage
};
