import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import connectDB from '@/lib/mongodb';
import Announcement from '@/models/Announcement';
import User from '@/models/User';
import Activity from '@/models/Activity';
import { isAdmin } from '@/lib/admin-auth';

// GET /api/announcements - List announcements
export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const activeOnly = searchParams.get('active') === 'true';
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '20');

        const query: any = {};
        if (activeOnly) {
            query.active = true;
        }

        const skip = (page - 1) * limit;

        const [announcements, total] = await Promise.all([
            Announcement.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .populate('createdBy', 'name email')
                .lean(),
            Announcement.countDocuments(query),
        ]);

        return NextResponse.json({
            announcements,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error: any) {
        console.error('Error fetching announcements:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST /api/announcements - Create announcement (admin only)
export async function POST(request: NextRequest) {
    try {
        const admin = await isAdmin();
        if (!admin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

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

        const body = await request.json();
        const { title, content, type } = body;

        if (!title || !content) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const announcement = await Announcement.create({
            title,
            content,
            type: type || 'info',
            active: true,
            createdBy: user._id,
        });

        // Log activity
        await Activity.create({
            type: 'announcement_created',
            description: `New announcement: "${title}"`,
            userId: user._id,
        });

        return NextResponse.json({ announcement }, { status: 201 });
    } catch (error: any) {
        console.error('Error creating announcement:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
