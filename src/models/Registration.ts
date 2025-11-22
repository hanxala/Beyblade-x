import mongoose, { Schema, Model, Types } from 'mongoose';

export interface IRegistration {
    _id: string;
    tournamentId: Types.ObjectId;
    userId: Types.ObjectId;
    status: 'registered' | 'checked-in' | 'completed' | 'cancelled';
    registeredAt: Date;
    result?: {
        placement: number;
        points: number;
    };
    createdAt: Date;
    updatedAt: Date;
}

const RegistrationSchema = new Schema<IRegistration>(
    {
        tournamentId: {
            type: Schema.Types.ObjectId,
            ref: 'Tournament',
            required: true,
            index: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        status: {
            type: String,
            enum: ['registered', 'checked-in', 'completed', 'cancelled'],
            default: 'registered',
        },
        registeredAt: {
            type: Date,
            default: Date.now,
        },
        result: {
            placement: {
                type: Number,
                min: 1,
            },
            points: {
                type: Number,
                min: 0,
            },
        },
    },
    {
        timestamps: true,
    }
);

// Compound index to ensure a user can only register once per tournament
RegistrationSchema.index({ tournamentId: 1, userId: 1 }, { unique: true });

const Registration: Model<IRegistration> =
    mongoose.models.Registration || mongoose.model<IRegistration>('Registration', RegistrationSchema);

export default Registration;
