import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import mongoose from 'mongoose';
import User from '../src/models/User';
import Tournament from '../src/models/Tournament';
import Registration from '../src/models/Registration';
import Announcement from '../src/models/Announcement';
import Activity from '../src/models/Activity';

async function seed() {
    try {
        console.log('🌱 Starting database seeding...\n');

        const MONGODB_URI = process.env.MONGODB_URI;
        if (!MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in .env.local');
        }

        // Connect to database directly
        await mongoose.connect(MONGODB_URI);
        console.log('✅ MongoDB connected successfully');

        // Clear existing data
        console.log('🗑️  Clearing existing data...');
        await User.deleteMany({});
        await Tournament.deleteMany({});
        await Registration.deleteMany({});
        await Announcement.deleteMany({});
        await Activity.deleteMany({});
        console.log('✅ Existing data cleared\n');

        // Create Users
        console.log('👥 Creating users...');
        const users = await User.create([
            {
                clerkId: 'seed_admin_001',
                email: 'admin@beyblade-x.com',
                name: 'Admin User',
                city: 'Mumbai',
                role: 'admin',
                status: 'active',
                stats: {
                    tournamentsPlayed: 15,
                    wins: 12,
                    losses: 3,
                    points: 850,
                },
            },
            {
                clerkId: 'seed_user_001',
                email: 'rajesh.kumar@example.com',
                name: 'Rajesh Kumar',
                city: 'Mumbai',
                role: 'user',
                status: 'active',
                stats: {
                    tournamentsPlayed: 12,
                    wins: 9,
                    losses: 3,
                    points: 720,
                },
            },
            {
                clerkId: 'seed_user_002',
                email: 'priya.sharma@example.com',
                name: 'Priya Sharma',
                city: 'Delhi',
                role: 'user',
                status: 'active',
                stats: {
                    tournamentsPlayed: 10,
                    wins: 8,
                    losses: 2,
                    points: 650,
                },
            },
            {
                clerkId: 'seed_user_003',
                email: 'amit.patel@example.com',
                name: 'Amit Patel',
                city: 'Bangalore',
                role: 'user',
                status: 'active',
                stats: {
                    tournamentsPlayed: 8,
                    wins: 6,
                    losses: 2,
                    points: 580,
                },
            },
            {
                clerkId: 'seed_user_004',
                email: 'sneha.reddy@example.com',
                name: 'Sneha Reddy',
                city: 'Hyderabad',
                role: 'user',
                status: 'active',
                stats: {
                    tournamentsPlayed: 7,
                    wins: 5,
                    losses: 2,
                    points: 520,
                },
            },
            {
                clerkId: 'seed_user_005',
                email: 'vikram.singh@example.com',
                name: 'Vikram Singh',
                city: 'Pune',
                role: 'user',
                status: 'active',
                stats: {
                    tournamentsPlayed: 6,
                    wins: 4,
                    losses: 2,
                    points: 460,
                },
            },
            {
                clerkId: 'seed_user_006',
                email: 'ananya.gupta@example.com',
                name: 'Ananya Gupta',
                city: 'Chennai',
                role: 'user',
                status: 'active',
                stats: {
                    tournamentsPlayed: 5,
                    wins: 3,
                    losses: 2,
                    points: 400,
                },
            },
            {
                clerkId: 'seed_user_007',
                email: 'rohan.mehta@example.com',
                name: 'Rohan Mehta',
                city: 'Kolkata',
                role: 'user',
                status: 'active',
                stats: {
                    tournamentsPlayed: 4,
                    wins: 2,
                    losses: 2,
                    points: 340,
                },
            },
            {
                clerkId: 'seed_user_008',
                email: 'kavya.nair@example.com',
                name: 'Kavya Nair',
                city: 'Mumbai',
                role: 'user',
                status: 'active',
                stats: {
                    tournamentsPlayed: 3,
                    wins: 2,
                    losses: 1,
                    points: 280,
                },
            },
            {
                clerkId: 'seed_user_009',
                email: 'arjun.rao@example.com',
                name: 'Arjun Rao',
                city: 'Delhi',
                role: 'user',
                status: 'active',
                stats: {
                    tournamentsPlayed: 2,
                    wins: 1,
                    losses: 1,
                    points: 220,
                },
            },
            {
                clerkId: 'seed_user_010',
                email: 'ishita.joshi@example.com',
                name: 'Ishita Joshi',
                city: 'Bangalore',
                role: 'user',
                status: 'active',
                stats: {
                    tournamentsPlayed: 1,
                    wins: 0,
                    losses: 1,
                    points: 150,
                },
            },
            {
                clerkId: 'seed_user_011',
                email: 'banned.user@example.com',
                name: 'Banned User',
                city: 'Mumbai',
                role: 'user',
                status: 'banned',
                stats: {
                    tournamentsPlayed: 5,
                    wins: 0,
                    losses: 5,
                    points: 50,
                },
            },
        ]);
        console.log(`✅ Created ${users.length} users\n`);

        // Create Tournaments
        console.log('🏆 Creating tournaments...');
        const adminUser = users[0]; // Admin user

        const now = new Date();
        const tournaments = await Tournament.create([
            {
                title: 'Mumbai Championship 2024',
                description: 'The biggest Beyblade tournament in Mumbai! Join us for an epic battle featuring the best bladers from across the city. Prizes, glory, and unforgettable matches await!',
                date: new Date(now.getFullYear(), now.getMonth() + 1, 15, 10, 0),
                location: 'Mumbai Sports Arena, Andheri',
                maxParticipants: 32,
                currentParticipants: 0,
                status: 'upcoming',
                prize: '₹25,000',
                registrationDeadline: new Date(now.getFullYear(), now.getMonth() + 1, 10, 23, 59),
                imageUrl: 'https://images.unsplash.com/photo-1511882150382-421056c89033?w=800',
                createdBy: adminUser._id,
            },
            {
                title: 'Delhi Beyblade Masters',
                description: 'Calling all Delhi bladers! Show your skills and compete for the title of Delhi Beyblade Master. Open to all skill levels.',
                date: new Date(now.getFullYear(), now.getMonth() + 1, 22, 14, 0),
                location: 'Jawaharlal Nehru Stadium, Delhi',
                maxParticipants: 24,
                currentParticipants: 0,
                status: 'upcoming',
                prize: '₹20,000',
                registrationDeadline: new Date(now.getFullYear(), now.getMonth() + 1, 18, 23, 59),
                imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800',
                createdBy: adminUser._id,
            },
            {
                title: 'Bangalore Battle Royale',
                description: 'The ultimate Beyblade showdown in the tech capital! Fast-paced battles, amazing prizes, and the best bladers from Karnataka.',
                date: new Date(now.getFullYear(), now.getMonth() + 2, 5, 11, 0),
                location: 'Bangalore Indoor Stadium',
                maxParticipants: 40,
                currentParticipants: 0,
                status: 'upcoming',
                prize: '₹30,000',
                registrationDeadline: new Date(now.getFullYear(), now.getMonth() + 2, 1, 23, 59),
                imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800',
                createdBy: adminUser._id,
            },
            {
                title: 'Hyderabad Spin Masters',
                description: 'Join us for an exciting tournament featuring the best spinners in Hyderabad. Great prizes and fierce competition!',
                date: new Date(now.getFullYear(), now.getMonth() + 2, 12, 15, 0),
                location: 'GMC Balayogi Stadium, Hyderabad',
                maxParticipants: 28,
                currentParticipants: 0,
                status: 'upcoming',
                prize: '₹18,000',
                registrationDeadline: new Date(now.getFullYear(), now.getMonth() + 2, 8, 23, 59),
                imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',
                createdBy: adminUser._id,
            },
            {
                title: 'Pune Regional Championship',
                description: 'The Pune Regional Championship is here! Compete against the best and claim your spot as the regional champion.',
                date: new Date(now.getFullYear(), now.getMonth() + 2, 20, 10, 0),
                location: 'Shiv Chhatrapati Sports Complex, Pune',
                maxParticipants: 32,
                currentParticipants: 0,
                status: 'upcoming',
                prize: '₹22,000',
                registrationDeadline: new Date(now.getFullYear(), now.getMonth() + 2, 15, 23, 59),
                imageUrl: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800',
                createdBy: adminUser._id,
            },
            {
                title: 'National Beyblade Championship - LIVE',
                description: 'The biggest tournament of the year is happening NOW! Watch the best bladers compete for the national title.',
                date: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0),
                location: 'Indira Gandhi Indoor Stadium, Delhi',
                maxParticipants: 64,
                currentParticipants: 48,
                status: 'live',
                prize: '₹1,00,000',
                registrationDeadline: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5, 23, 59),
                imageUrl: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800',
                createdBy: adminUser._id,
            },
            {
                title: 'Summer Slam 2024 - Completed',
                description: 'The epic Summer Slam tournament has concluded! Congratulations to all participants and winners.',
                date: new Date(now.getFullYear(), now.getMonth() - 1, 15, 14, 0),
                location: 'Mumbai Sports Complex',
                maxParticipants: 32,
                currentParticipants: 32,
                status: 'completed',
                prize: '₹35,000',
                registrationDeadline: new Date(now.getFullYear(), now.getMonth() - 1, 10, 23, 59),
                imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800',
                createdBy: adminUser._id,
            },
            {
                title: 'Winter Warriors - Completed',
                description: 'The Winter Warriors tournament was a huge success! Thank you to all participants.',
                date: new Date(now.getFullYear(), now.getMonth() - 2, 20, 11, 0),
                location: 'Delhi Indoor Arena',
                maxParticipants: 24,
                currentParticipants: 24,
                status: 'completed',
                prize: '₹28,000',
                registrationDeadline: new Date(now.getFullYear(), now.getMonth() - 2, 15, 23, 59),
                imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800',
                createdBy: adminUser._id,
            },
        ]);
        console.log(`✅ Created ${tournaments.length} tournaments\n`);

        // Create Registrations for live and completed tournaments
        console.log('📝 Creating registrations...');
        const liveTournament = tournaments.find(t => t.status === 'live');
        const completedTournaments = tournaments.filter(t => t.status === 'completed');

        const registrations = [];

        // Register users for live tournament
        if (liveTournament) {
            for (let i = 1; i <= 8; i++) {
                if (users[i]) {
                    registrations.push({
                        tournamentId: liveTournament._id,
                        userId: users[i]._id,
                        status: 'checked-in',
                        registeredAt: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7),
                    });
                }
            }
        }

        // Register users for completed tournaments with results
        for (const tournament of completedTournaments) {
            for (let i = 1; i <= 8; i++) {
                if (users[i]) {
                    registrations.push({
                        tournamentId: tournament._id,
                        userId: users[i]._id,
                        status: 'completed',
                        registeredAt: new Date(tournament.date.getTime() - 10 * 24 * 60 * 60 * 1000),
                        result: {
                            placement: i,
                            points: Math.max(100 - (i - 1) * 10, 20),
                        },
                    });
                }
            }
        }

        if (registrations.length > 0) {
            await Registration.create(registrations);
            console.log(`✅ Created ${registrations.length} registrations\n`);
        }

        // Create Announcements
        console.log('📢 Creating announcements...');
        const announcements = await Announcement.create([
            {
                title: 'Welcome to Beyblade-X India!',
                content: 'Join India\'s premier Beyblade tournament platform. Register now and compete with the best bladers across the country!',
                type: 'success',
                active: true,
                createdBy: adminUser._id,
            },
            {
                title: 'New Tournament Alert: Mumbai Championship 2024',
                content: 'Registration is now open for the Mumbai Championship 2024! Don\'t miss this opportunity to showcase your skills. Limited slots available!',
                type: 'info',
                active: true,
                createdBy: adminUser._id,
            },
            {
                title: 'National Championship Registration Closing Soon',
                content: 'Only 2 days left to register for the National Beyblade Championship! Secure your spot now before it\'s too late.',
                type: 'warning',
                active: true,
                createdBy: adminUser._id,
            },
            {
                title: 'Platform Maintenance Scheduled',
                content: 'We will be performing scheduled maintenance on Sunday, 2 AM - 4 AM IST. The platform may be temporarily unavailable during this time.',
                type: 'info',
                active: false,
                createdBy: adminUser._id,
            },
        ]);
        console.log(`✅ Created ${announcements.length} announcements\n`);

        // Create Activities
        console.log('📊 Creating activities...');
        const activities = await Activity.create([
            {
                type: 'user_registered',
                description: `${users[1].name} joined the platform`,
                userId: users[1]._id,
                createdAt: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
            },
            {
                type: 'tournament_created',
                description: `New tournament "Mumbai Championship 2024" created`,
                tournamentId: tournaments[0]._id,
                userId: adminUser._id,
                createdAt: new Date(now.getTime() - 25 * 24 * 60 * 60 * 1000),
            },
            {
                type: 'user_registered',
                description: `${users[2].name} joined the platform`,
                userId: users[2]._id,
                createdAt: new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000),
            },
            {
                type: 'tournament_created',
                description: `New tournament "Delhi Beyblade Masters" created`,
                tournamentId: tournaments[1]._id,
                userId: adminUser._id,
                createdAt: new Date(now.getTime() - 18 * 24 * 60 * 60 * 1000),
            },
            {
                type: 'user_registered',
                description: `${users[3].name} joined the platform`,
                userId: users[3]._id,
                createdAt: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000),
            },
            {
                type: 'tournament_completed',
                description: `Tournament "Summer Slam 2024" completed`,
                tournamentId: tournaments[6]._id,
                createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
            },
            {
                type: 'user_banned',
                description: `User ${users[11].name} was banned`,
                userId: users[11]._id,
                createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
            },
            {
                type: 'announcement_created',
                description: `New announcement: "${announcements[0].title}"`,
                userId: adminUser._id,
                createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
            },
            {
                type: 'user_registered',
                description: `${users[4].name} joined the platform`,
                userId: users[4]._id,
                createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
            },
            {
                type: 'tournament_created',
                description: `New tournament "Bangalore Battle Royale" created`,
                tournamentId: tournaments[2]._id,
                userId: adminUser._id,
                createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
            },
            {
                type: 'user_registered',
                description: `${users[5].name} joined the platform`,
                userId: users[5]._id,
                createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
            },
            {
                type: 'announcement_created',
                description: `New announcement: "${announcements[1].title}"`,
                userId: adminUser._id,
                createdAt: new Date(now.getTime() - 12 * 60 * 60 * 1000),
            },
        ]);
        console.log(`✅ Created ${activities.length} activities\n`);

        // Summary
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🎉 Database seeding completed successfully!\n');
        console.log('📊 Summary:');
        console.log(`   👥 Users: ${users.length}`);
        console.log(`   🏆 Tournaments: ${tournaments.length}`);
        console.log(`   📝 Registrations: ${registrations.length}`);
        console.log(`   📢 Announcements: ${announcements.length}`);
        console.log(`   📊 Activities: ${activities.length}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        console.log('✨ You can now:');
        console.log('   1. Visit /admin to see the dashboard');
        console.log('   2. Visit /rankings to see player rankings');
        console.log('   3. Visit /tournaments to see all tournaments');
        console.log('   4. Visit / to see the home page with data\n');

        console.log('🔑 Admin User Credentials:');
        console.log('   Email: admin@beyblade-x.com');
        console.log('   Clerk ID: seed_admin_001');
        console.log('   (Add "role": "admin" to this user in Clerk Dashboard)\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

// Run the seed function
seed();
