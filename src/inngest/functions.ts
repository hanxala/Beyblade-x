import { inngest } from './client';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Tournament from '@/models/Tournament';

// Welcome email function - triggered when a new user is created
export const sendWelcomeEmail = inngest.createFunction(
    { id: 'send-welcome-email', name: 'Send Welcome Email' },
    { event: 'user/created' },
    async ({ event, step }) => {
        const { email, name } = event.data;

        // Step 1: Log the welcome email send
        await step.run('log-welcome', async () => {
            console.log(`Sending welcome email to ${email}`);
            return { logged: true };
        });

        // Step 2: Send welcome email (placeholder - integrate with your email service)
        const emailSent = await step.run('send-email', async () => {
            // TODO: Integrate with email service (Resend, SendGrid, etc.)
            // For now, just log
            console.log(`Welcome email sent to ${name} (${email})`);

            return {
                to: email,
                subject: 'Welcome to Beyblade-X!',
                sent: true,
                timestamp: new Date().toISOString(),
            };
        });

        return { success: true, emailSent };
    }
);

// Tournament reminder function - sends reminder 24 hours before tournament
export const sendTournamentReminder = inngest.createFunction(
    { id: 'tournament-reminder', name: 'Send Tournament Reminder' },
    { event: 'tournament/created' },
    async ({ event, step }) => {
        const { tournamentId, title, date } = event.data;

        // Calculate when to send reminder (24 hours before tournament)
        const tournamentDate = new Date(date);
        const reminderTime = new Date(tournamentDate.getTime() - 24 * 60 * 60 * 1000);

        // Wait until reminder time
        await step.sleepUntil('wait-for-reminder-time', reminderTime);

        // Get all registered participants
        const participants = await step.run('get-participants', async () => {
            await connectDB();
            // TODO: Get actual registrations from Registration model
            console.log(`Getting participants for tournament: ${title}`);
            return [];
        });

        // Send reminder emails
        await step.run('send-reminders', async () => {
            console.log(`Sending reminders for tournament: ${title} to ${participants.length} participants`);
            // TODO: Send actual emails
            return { sent: participants.length };
        });

        return { success: true, remindersSent: participants.length };
    }
);

// Process tournament results - triggered when tournament is completed
export const processTournamentResults = inngest.createFunction(
    { id: 'process-tournament-results', name: 'Process Tournament Results' },
    { event: 'tournament/completed' },
    async ({ event, step }) => {
        const { tournamentId, title, participants } = event.data;

        // Step 1: Update player statistics
        await step.run('update-player-stats', async () => {
            await connectDB();
            console.log(`Updating stats for ${participants} participants in ${title}`);
            // TODO: Update actual player stats
            return { updated: participants };
        });

        // Step 2: Recalculate rankings
        await step.run('recalculate-rankings', async () => {
            await connectDB();
            console.log('Recalculating player rankings');
            // TODO: Implement ranking calculation
            return { recalculated: true };
        });

        // Step 3: Send results emails
        await step.run('send-results-emails', async () => {
            console.log(`Sending result emails for tournament: ${title}`);
            // TODO: Send actual emails
            return { sent: participants };
        });

        return { success: true, processed: participants };
    }
);

// Daily rankings update - scheduled task
export const updateDailyRankings = inngest.createFunction(
    { id: 'update-daily-rankings', name: 'Update Daily Rankings' },
    { cron: '0 0 * * *' }, // Every day at midnight
    async ({ step }) => {
        // Recalculate all player rankings
        const rankings = await step.run('calculate-rankings', async () => {
            await connectDB();

            // Get all active users sorted by points
            const users = await User.find({ status: 'active' })
                .sort({ 'stats.points': -1 })
                .lean();

            console.log(`Updated rankings for ${users.length} players`);

            return {
                totalPlayers: users.length,
                topPlayer: users[0]?.name || 'N/A',
                timestamp: new Date().toISOString(),
            };
        });

        return { success: true, rankings };
    }
);

// Weekly tournament digest - scheduled task
export const sendWeeklyDigest = inngest.createFunction(
    { id: 'send-weekly-digest', name: 'Send Weekly Tournament Digest' },
    { cron: '0 9 * * 1' }, // Every Monday at 9 AM
    async ({ step }) => {
        // Get upcoming tournaments for the week
        const tournaments = await step.run('get-upcoming-tournaments', async () => {
            await connectDB();

            const oneWeekFromNow = new Date();
            oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);

            const upcoming = await Tournament.find({
                status: 'upcoming',
                date: { $lte: oneWeekFromNow },
            })
                .sort({ date: 1 })
                .limit(5)
                .lean();

            console.log(`Found ${upcoming.length} upcoming tournaments for weekly digest`);

            return upcoming;
        });

        // Send digest emails to all active users
        await step.run('send-digest-emails', async () => {
            await connectDB();

            const activeUsers = await User.find({ status: 'active' }).lean();
            console.log(`Sending weekly digest to ${activeUsers.length} users`);

            // TODO: Send actual emails
            return { sent: activeUsers.length };
        });

        return { success: true, tournaments: tournaments.length };
    }
);

// Tournament registration confirmation
export const sendRegistrationConfirmation = inngest.createFunction(
    { id: 'send-registration-confirmation', name: 'Send Registration Confirmation' },
    { event: 'tournament/registration' },
    async ({ event, step }) => {
        const { userId, tournamentTitle, tournamentDate } = event.data;

        // Get user details
        const user = await step.run('get-user', async () => {
            await connectDB();
            const userData = await User.findById(userId).lean();
            return userData;
        });

        // Send confirmation email
        await step.run('send-confirmation', async () => {
            if (!user) {
                console.log('User not found');
                return { sent: false };
            }

            console.log(`Sending registration confirmation to ${user.email} for ${tournamentTitle}`);
            // TODO: Send actual email

            return {
                to: user.email,
                tournament: tournamentTitle,
                date: tournamentDate,
                sent: true,
            };
        });

        return { success: true };
    }
);

// Export all functions
export const functions = [
    sendWelcomeEmail,
    sendTournamentReminder,
    processTournamentResults,
    updateDailyRankings,
    sendWeeklyDigest,
    sendRegistrationConfirmation,
];
