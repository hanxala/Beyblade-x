import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Activity from '@/models/Activity';
import { isAdmin } from '@/lib/admin-auth';

// POST /api/users/[id]/ban - Ban user (admin only)
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const admin = await isAdmin();
        if (!admin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();

        const user = await User.findByIdAndUpdate(
            id,
            { $set: { status: 'banned' } },
            { new: true }
        );

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Log activity
        await Activity.create({
            type: 'user_banned',
            description: `User ${user.name} was banned`,
            userId: user._id,
        });

        return NextResponse.json({ user, message: 'User banned successfully' });
    } catch (error: any) {
        console.error('Error banning user:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE /api/users/[id]/ban - Unban user (admin only)
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const admin = await isAdmin();
        if (!admin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();

        const user = await User.findByIdAndUpdate(
            id,
            { $set: { status: 'active' } },
            { new: true }
        );

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ user, message: 'User unbanned successfully' });
    } catch (error: any) {
        console.error('Error unbanning user:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
