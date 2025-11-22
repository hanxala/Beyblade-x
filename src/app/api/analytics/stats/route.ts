import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Tournament from '@/models/Tournament';
import Registration from '@/models/Registration';
import { isAdmin } from '@/lib/admin-auth';

// GET /api/analytics/stats - Get dashboard statistics (admin only)
export async function GET(request: NextRequest) {
    try {
        const admin = await isAdmin();
        if (!admin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();

        // Get current date ranges
        const now = new Date();
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

        // Parallel queries for better performance
        const [
            totalUsers,
            activeUsers,
            totalTournaments,
            upcomingTournaments,
            liveTournaments,
            completedTournaments,
            totalRegistrations,
            usersLastMonth,
            tournamentsLastMonth,
        ] = await Promise.all([
            User.countDocuments(),
            User.countDocuments({ status: 'active' }),
            Tournament.countDocuments(),
            Tournament.countDocuments({ status: 'upcoming' }),
            Tournament.countDocuments({ status: 'live' }),
            Tournament.countDocuments({ status: 'completed' }),
            Registration.countDocuments({ status: { $ne: 'cancelled' } }),
            User.countDocuments({ createdAt: { $lt: lastMonth } }),
            Tournament.countDocuments({ createdAt: { $lt: lastMonth } }),
        ]);

        // Calculate trends
        const userTrend = usersLastMonth > 0
            ? (((totalUsers - usersLastMonth) / usersLastMonth) * 100).toFixed(1)
            : '100.0';

        const tournamentTrend = tournamentsLastMonth > 0
            ? (((totalTournaments - tournamentsLastMonth) / tournamentsLastMonth) * 100).toFixed(1)
            : '100.0';

        const stats = {
            users: {
                total: totalUsers,
                active: activeUsers,
                trend: parseFloat(userTrend),
            },
            tournaments: {
                total: totalTournaments,
                upcoming: upcomingTournaments,
                live: liveTournaments,
                completed: completedTournaments,
                trend: parseFloat(tournamentTrend),
            },
            registrations: {
                total: totalRegistrations,
            },
        };

        return NextResponse.json({ stats });
    } catch (error: any) {
        console.error('Error fetching analytics stats:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
