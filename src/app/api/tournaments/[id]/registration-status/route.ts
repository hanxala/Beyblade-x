import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectDB from '@/lib/mongodb';
import Registration from '@/models/Registration';
import User from '@/models/User';

// GET /api/tournaments/[id]/registration-status - Check if user is registered
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ isRegistered: false });
        }

        const { id } = await params;
        await connectDB();

        // Get user from database
        const user = await User.findOne({ clerkId: userId });
        if (!user) {
            return NextResponse.json({ isRegistered: false });
        }

        // Check if registration exists
        const registration = await Registration.findOne({
            tournamentId: id,
            userId: user._id,
            status: { $ne: 'cancelled' },
        });

        return NextResponse.json({
            isRegistered: !!registration,
            registration: registration || null,
        });
    } catch (error: any) {
        console.error('Error checking registration status:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
