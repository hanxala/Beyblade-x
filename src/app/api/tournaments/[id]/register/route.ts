import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import connectDB from '@/lib/mongodb';
import Tournament from '@/models/Tournament';
import Registration from '@/models/Registration';
import User from '@/models/User';
import Activity from '@/models/Activity';

// POST /api/tournaments/[id]/register - Register for tournament
export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();

        // Get user from database
        const user = await User.findOne({ clerkId: userId });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Check if user is banned
        if (user.status === 'banned') {
            return NextResponse.json({ error: 'You are banned from registering' }, { status: 403 });
        }

        // Get tournament
        const tournament = await Tournament.findById(params.id);
        if (!tournament) {
            return NextResponse.json({ error: 'Tournament not found' }, { status: 404 });
        }

        // Check if registration is open
        if (tournament.status !== 'upcoming') {
            return NextResponse.json({ error: 'Registration is closed' }, { status: 400 });
        }

        if (new Date() > tournament.registrationDeadline) {
            return NextResponse.json({ error: 'Registration deadline has passed' }, { status: 400 });
        }

        // Check if tournament is full
        const currentRegistrations = await Registration.countDocuments({
            tournamentId: params.id,
            status: { $ne: 'cancelled' },
        });

        if (currentRegistrations >= tournament.maxParticipants) {
            return NextResponse.json({ error: 'Tournament is full' }, { status: 400 });
        }

        // Check if user is already registered
        const existingRegistration = await Registration.findOne({
            tournamentId: params.id,
            userId: user._id,
            status: { $ne: 'cancelled' },
        });

        if (existingRegistration) {
            return NextResponse.json({ error: 'Already registered' }, { status: 400 });
        }

        // Create registration
        const registration = await Registration.create({
            tournamentId: params.id,
            userId: user._id,
            status: 'registered',
        });

        // Update tournament participant count
        await Tournament.findByIdAndUpdate(params.id, {
            $set: { currentParticipants: currentRegistrations + 1 },
        });

        // Log activity
        await Activity.create({
            type: 'user_registered',
            description: `${user.name} registered for "${tournament.title}"`,
            userId: user._id,
            tournamentId: tournament._id,
        });

        return NextResponse.json({ registration, message: 'Registered successfully' }, { status: 201 });
    } catch (error: any) {
        console.error('Error registering for tournament:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE /api/tournaments/[id]/register - Cancel registration
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();

        // Get user from database
        const user = await User.findOne({ clerkId: userId });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Find registration
        const registration = await Registration.findOne({
            tournamentId: params.id,
            userId: user._id,
            status: { $ne: 'cancelled' },
        });

        if (!registration) {
            return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
        }

        // Update registration status
        registration.status = 'cancelled';
        await registration.save();

        // Update tournament participant count
        const currentRegistrations = await Registration.countDocuments({
            tournamentId: params.id,
            status: { $ne: 'cancelled' },
        });

        await Tournament.findByIdAndUpdate(params.id, {
            $set: { currentParticipants: currentRegistrations },
        });

        return NextResponse.json({ message: 'Registration cancelled successfully' });
    } catch (error: any) {
        console.error('Error cancelling registration:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
