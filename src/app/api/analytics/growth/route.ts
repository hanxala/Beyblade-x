import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Tournament from '@/models/Tournament';
import Registration from '@/models/Registration';
import { isAdmin } from '@/lib/admin-auth';

// GET /api/analytics/growth - Get growth data (admin only)
export async function GET(request: NextRequest) {
    try {
        const admin = await isAdmin();
        if (!admin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();

        // Get data for the last 6 months
        const months = 6;
        const userGrowth = [];
        const tournamentActivity = [];
        const registrationTrends = [];

        for (let i = months - 1; i >= 0; i--) {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
            const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

            const monthName = startOfMonth.toLocaleString('default', { month: 'short' });

            // User growth
            const userCount = await User.countDocuments({
                createdAt: { $lte: endOfMonth },
            });
            userGrowth.push({ month: monthName, count: userCount });

            // Tournament activity
            const tournamentCount = await Tournament.countDocuments({
                date: { $gte: startOfMonth, $lte: endOfMonth },
            });
            tournamentActivity.push({ month: monthName, count: tournamentCount });

            // Registration trends
            const registrationCount = await Registration.countDocuments({
                registeredAt: { $gte: startOfMonth, $lte: endOfMonth },
                status: { $ne: 'cancelled' },
            });
            registrationTrends.push({ month: monthName, count: registrationCount });
        }

        return NextResponse.json({
            userGrowth,
            tournamentActivity,
            registrationTrends,
        });
    } catch (error: any) {
        console.error('Error fetching growth data:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
