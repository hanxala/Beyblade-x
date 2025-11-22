import mongoose, { Schema, Model } from 'mongoose';

export interface IUser {
    _id: string;
    clerkId: string;
    email: string;
    name: string;
    city?: string;
    profileImage?: string;
    profileImagePublicId?: string;
    role: 'user' | 'admin';
    status: 'active' | 'banned';
    stats: {
        tournamentsPlayed: number;
        wins: number;
        losses: number;
        points: number;
    };
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        clerkId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        city: {
            type: String,
            trim: true,
        },
        profileImage: {
            type: String,
        },
        profileImagePublicId: {
            type: String,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        status: {
            type: String,
            enum: ['active', 'banned'],
            default: 'active',
        },
        stats: {
            tournamentsPlayed: {
                type: Number,
                default: 0,
            },
            wins: {
                type: Number,
                default: 0,
            },
            losses: {
                type: Number,
                default: 0,
            },
            points: {
                type: Number,
                default: 0,
                index: -1, // Descending index for rankings
            },
        },
    },
    {
        timestamps: true,
    }
);

// Indexes for better query performance
UserSchema.index({ 'stats.points': -1 }); // For rankings
UserSchema.index({ status: 1 });
UserSchema.index({ createdAt: -1 });

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
