import mongoose, { Schema, Model, Types } from 'mongoose';

export interface ITournament {
    _id: string;
    title: string;
    description: string;
    date: Date;
    location: string;
    maxParticipants: number;
    currentParticipants: number;
    status: 'upcoming' | 'live' | 'completed';
    prize?: string;
    registrationDeadline: Date;
    imageUrl?: string;
    imagePublicId?: string;
    createdBy: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const TournamentSchema = new Schema<ITournament>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
            index: true,
        },
        location: {
            type: String,
            required: true,
            trim: true,
        },
        maxParticipants: {
            type: Number,
            required: true,
            min: 1,
        },
        currentParticipants: {
            type: Number,
            default: 0,
            min: 0,
        },
        status: {
            type: String,
            enum: ['upcoming', 'live', 'completed'],
            default: 'upcoming',
            index: true,
        },
        prize: {
            type: String,
            trim: true,
        },
        registrationDeadline: {
            type: Date,
            required: true,
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

// Indexes for better query performance
TournamentSchema.index({ status: 1, date: 1 });
TournamentSchema.index({ createdAt: -1 });

// Virtual for checking if registration is open
TournamentSchema.virtual('isRegistrationOpen').get(function () {
    return (
        this.status === 'upcoming' &&
        this.currentParticipants < this.maxParticipants &&
        new Date() < this.registrationDeadline
    );
});

const Tournament: Model<ITournament> =
    mongoose.models.Tournament || mongoose.model<ITournament>('Tournament', TournamentSchema);

export default Tournament;
