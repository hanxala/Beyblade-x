import mongoose, { Schema, Model, Types } from 'mongoose';

export interface IActivity {
    _id: string;
    type: 'user_registered' | 'tournament_created' | 'tournament_completed' | 'user_banned' | 'announcement_created';
    description: string;
    userId?: Types.ObjectId;
    tournamentId?: Types.ObjectId;
    metadata?: Record<string, any>;
    createdAt: Date;
}

const ActivitySchema = new Schema<IActivity>(
    {
        type: {
            type: String,
            enum: ['user_registered', 'tournament_created', 'tournament_completed', 'user_banned', 'announcement_created'],
            required: true,
            index: true,
        },
        description: {
            type: String,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        tournamentId: {
            type: Schema.Types.ObjectId,
            ref: 'Tournament',
        },
        metadata: {
            type: Schema.Types.Mixed,
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
    }
);

// Index for fetching recent activities
ActivitySchema.index({ createdAt: -1 });
ActivitySchema.index({ type: 1, createdAt: -1 });

const Activity: Model<IActivity> =
    mongoose.models.Activity || mongoose.model<IActivity>('Activity', ActivitySchema);

export default Activity;
