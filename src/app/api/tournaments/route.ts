import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectDB from '@/lib/mongodb';
import Tournament from '@/models/Tournament';
import User from '@/models/User';
import Activity from '@/models/Activity';
import { isAdmin } from '@/lib/admin-auth';
import { inngest } from '@/inngest/client';

// GET /api/tournaments - List tournaments
export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const search = searchParams.get('search');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '20');

        const sort = searchParams.get('sort') || 'desc';
        const sortOrder = sort === 'asc' ? 1 : -1;

        // Build query
        const query: any = {};
        if (status && status !== 'all') {
            query.status = status;
        }
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }

        const skip = (page - 1) * limit;

        const [tournaments, total] = await Promise.all([
            Tournament.find(query)
                .sort({ date: sortOrder as any })
                .skip(skip)
                .limit(limit)
                .populate('createdBy', 'name email')
                .lean(),
            Tournament.countDocuments(query),
        ]);

        return NextResponse.json({
            tournaments,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error: any) {
        console.error('Error fetching tournaments:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST /api/tournaments - Create tournament (admin only)
export async function POST(request: NextRequest) {
    try {
        const admin = await isAdmin();
        if (!admin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();

        // Get user from database
        const user = await User.findOne({ clerkId: userId });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const body = await request.json();
        const {
            title,
            description,
            date,
            location,
            maxParticipants,
            prize,
            registrationDeadline,
            imageUrl,
            imagePublicId,
        } = body;

        if (!title || !description || !date || !location || !maxParticipants || !registrationDeadline) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const tournament = await Tournament.create({
            title,
            description,
            date: new Date(date),
            location,
            maxParticipants,
            prize,
            registrationDeadline: new Date(registrationDeadline),
            imageUrl,
            imagePublicId,
            createdBy: user._id,
            status: 'upcoming',
            currentParticipants: 0,
        });

        // Log activity
        await Activity.create({
            type: 'tournament_created',
            description: `New tournament "${title}" created`,
            tournamentId: tournament._id,
            userId: user._id,
        });

        // Trigger Inngest event for tournament creation
        await inngest.send({
            name: 'tournament/created',
            data: {
                tournamentId: tournament._id.toString(),
                title: tournament.title,
                date: tournament.date.toISOString(),
                location: tournament.location,
            },
        });

        return NextResponse.json({ tournament }, { status: 201 });
    } catch (error: any) {
        console.error('Error creating tournament:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
