import mongoose, { Schema, Model, Types } from 'mongoose';

export interface IAnnouncement {
    _id: string;
    title: string;
    content: string;
    type: 'info' | 'warning' | 'success';
    active: boolean;
    imageUrl?: string;
    imagePublicId?: string;
    createdBy: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const AnnouncementSchema = new Schema<IAnnouncement>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ['info', 'warning', 'success'],
            default: 'info',
        },
        active: {
            type: Boolean,
            default: true,
            index: true,
        },
        imageUrl: {
            type: String,
        },
        imagePublicId: {
            type: String,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Index for fetching active announcements
AnnouncementSchema.index({ active: 1, createdAt: -1 });

const Announcement: Model<IAnnouncement> =
    mongoose.models.Announcement || mongoose.model<IAnnouncement>('Announcement', AnnouncementSchema);

export default Announcement;
