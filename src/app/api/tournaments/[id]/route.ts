import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Tournament from '@/models/Tournament';
import Registration from '@/models/Registration';
import Activity from '@/models/Activity';
import { isAdmin } from '@/lib/admin-auth';
import { deleteImage } from '@/lib/cloudinary';

// GET /api/tournaments/[id] - Get tournament details
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await connectDB();

        const tournament = await Tournament.findById(id)
            .populate('createdBy', 'name email')
            .lean();

        if (!tournament) {
            return NextResponse.json({ error: 'Tournament not found' }, { status: 404 });
        }

        // Get registrations count
        const registrationsCount = await Registration.countDocuments({
            tournamentId: id,
            status: { $ne: 'cancelled' },
        });

        return NextResponse.json({
            tournament: {
                ...tournament,
                currentParticipants: registrationsCount,
            },
        });
    } catch (error: any) {
        console.error('Error fetching tournament:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PATCH /api/tournaments/[id] - Update tournament (admin only)
export async function PATCH(
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

        const body = await request.json();
        const {
            title,
            description,
            date,
            location,
            maxParticipants,
            status,
            prize,
            registrationDeadline,
            imageUrl,
            imagePublicId,
        } = body;

        // Get existing tournament to check for image changes
        const existingTournament = await Tournament.findById(id);
        if (!existingTournament) {
            return NextResponse.json({ error: 'Tournament not found' }, { status: 404 });
        }

        // If new image is uploaded and old image exists, delete old image from Cloudinary
        if (imagePublicId && existingTournament.imagePublicId && imagePublicId !== existingTournament.imagePublicId) {
            try {
                await deleteImage(existingTournament.imagePublicId);
            } catch (error) {
                console.error('Failed to delete old image:', error);
                // Continue with update even if deletion fails
            }
        }

        const updateData: any = {};
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (date) updateData.date = new Date(date);
        if (location) updateData.location = location;
        if (maxParticipants) updateData.maxParticipants = maxParticipants;
        if (status) updateData.status = status;
        if (prize !== undefined) updateData.prize = prize;
        if (registrationDeadline) updateData.registrationDeadline = new Date(registrationDeadline);
        if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
        if (imagePublicId !== undefined) updateData.imagePublicId = imagePublicId;

        const tournament = await Tournament.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        ).populate('createdBy', 'name email');

        if (!tournament) {
            return NextResponse.json({ error: 'Tournament not found' }, { status: 404 });
        }

        // Log activity if status changed to completed
        if (status === 'completed') {
            await Activity.create({
                type: 'tournament_completed',
                description: `Tournament "${tournament.title}" completed`,
                tournamentId: tournament._id,
            });
        }

        return NextResponse.json({ tournament });
    } catch (error: any) {
        console.error('Error updating tournament:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE /api/tournaments/[id] - Delete tournament (admin only)
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

        // Check if tournament has registrations
        const registrationsCount = await Registration.countDocuments({
            tournamentId: id,
            status: { $ne: 'cancelled' },
        });

        if (registrationsCount > 0) {
            return NextResponse.json(
                { error: 'Cannot delete tournament with active registrations' },
                { status: 400 }
            );
        }

        const tournament = await Tournament.findById(id);

        if (!tournament) {
            return NextResponse.json({ error: 'Tournament not found' }, { status: 404 });
        }

        // Delete image from Cloudinary if exists
        if (tournament.imagePublicId) {
            try {
                await deleteImage(tournament.imagePublicId);
            } catch (error) {
                console.error('Failed to delete tournament image:', error);
                // Continue with deletion even if Cloudinary deletion fails
            }
        }

        await Tournament.findByIdAndDelete(id);

        // Delete all cancelled registrations
        await Registration.deleteMany({ tournamentId: id });

        return NextResponse.json({ message: 'Tournament deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting tournament:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
