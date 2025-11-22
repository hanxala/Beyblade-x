import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Announcement from '@/models/Announcement';
import { isAdmin } from '@/lib/admin-auth';

// PATCH /api/announcements/[id] - Update announcement (admin only)
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const admin = await isAdmin();
        if (!admin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        await connectDB();

        const body = await request.json();
        const { title, content, type, active } = body;

        const updateData: any = {};
        if (title) updateData.title = title;
        if (content) updateData.content = content;
        if (type) updateData.type = type;
        if (active !== undefined) updateData.active = active;

        const announcement = await Announcement.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        ).populate('createdBy', 'name email');

        if (!announcement) {
            return NextResponse.json({ error: 'Announcement not found' }, { status: 404 });
        }

        return NextResponse.json({ announcement });
    } catch (error: any) {
        console.error('Error updating announcement:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE /api/announcements/[id] - Delete announcement (admin only)
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const admin = await isAdmin();
        if (!admin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        await connectDB();

        const announcement = await Announcement.findByIdAndDelete(id);

        if (!announcement) {
            return NextResponse.json({ error: 'Announcement not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Announcement deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting announcement:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
