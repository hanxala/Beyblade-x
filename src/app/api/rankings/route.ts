import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

// GET /api/rankings - Get player rankings
export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '50');

        const skip = (page - 1) * limit;

        const [rankings, total] = await Promise.all([
            User.find({ status: 'active' })
                .select('name city stats createdAt')
                .sort({ 'stats.points': -1, 'stats.wins': -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            User.countDocuments({ status: 'active' }),
        ]);

        // Add rank to each user
        const rankedUsers = rankings.map((user, index) => ({
            ...user,
            rank: skip + index + 1,
            winRate:
                user.stats.tournamentsPlayed > 0
                    ? ((user.stats.wins / user.stats.tournamentsPlayed) * 100).toFixed(1)
                    : '0.0',
        }));

        return NextResponse.json({
            rankings: rankedUsers,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error: any) {
        console.error('Error fetching rankings:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
