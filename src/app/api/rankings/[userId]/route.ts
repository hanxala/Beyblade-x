import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { isAdmin } from '@/lib/admin-auth';

// PATCH /api/rankings/[userId] - Update user points (admin only)
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ userId: string }> }
) {
    try {
        const { userId } = await params;
        const admin = await isAdmin();
        if (!admin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();

        const body = await request.json();
        const { points, wins, losses, tournamentsPlayed } = body;

        const updateData: any = {};
        if (points !== undefined) updateData['stats.points'] = points;
        if (wins !== undefined) updateData['stats.wins'] = wins;
        if (losses !== undefined) updateData['stats.losses'] = losses;
        if (tournamentsPlayed !== undefined) updateData['stats.tournamentsPlayed'] = tournamentsPlayed;

        const user = await User.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { new: true }
        );

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ user, message: 'Rankings updated successfully' });
    } catch (error: any) {
        console.error('Error updating rankings:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
