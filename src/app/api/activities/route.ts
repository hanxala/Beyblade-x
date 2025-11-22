import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Activity from '@/models/Activity';
import { isAdmin } from '@/lib/admin-auth';

// GET /api/activities - Get recent activities (admin only)
export async function GET(request: NextRequest) {
    try {
        const admin = await isAdmin();
        if (!admin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();

        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '20');
        const type = searchParams.get('type');

        const query: any = {};
        if (type) {
            query.type = type;
        }

        const activities = await Activity.find(query)
            .sort({ createdAt: -1 })
            .limit(limit)
            .populate('userId', 'name email')
            .populate('tournamentId', 'title')
            .lean();

        return NextResponse.json({ activities });
    } catch (error: any) {
        console.error('Error fetching activities:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
