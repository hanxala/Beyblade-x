import { Inngest, EventSchemas } from 'inngest';

// Define event types for type safety
type Events = {
    'user/created': {
        data: {
            userId: string;
            email: string;
            name: string;
            clerkId: string;
        };
    };
    'tournament/created': {
        data: {
            tournamentId: string;
            title: string;
            date: string;
            location: string;
        };
    };
    'tournament/completed': {
        data: {
            tournamentId: string;
            title: string;
            participants: number;
        };
    };
    'tournament/registration': {
        data: {
            tournamentId: string;
            userId: string;
            tournamentTitle: string;
            tournamentDate: string;
        };
    };
    'rankings/update': {
        data: {
            trigger: 'manual' | 'scheduled';
        };
    };
};

// Create Inngest client
export const inngest = new Inngest({
    id: 'beyblade-x',
    name: 'Beyblade-X Platform',
    schemas: new EventSchemas().fromRecord<Events>(),
});
