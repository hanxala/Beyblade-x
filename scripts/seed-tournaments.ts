import connectDB from '../src/lib/mongodb';
import Tournament from '../src/models/Tournament';
import User from '../src/models/User';

const tournaments = [
    {
        title: 'Mumbai Championship 2025',
        description: 'Join us for the biggest Beyblade tournament in Mumbai! Compete against the best bladers in Maharashtra for glory and amazing prizes. This championship features multiple rounds, expert judges, and an electrifying atmosphere.',
        date: new Date('2025-12-25'),
        location: 'Mumbai, Maharashtra',
        maxParticipants: 64,
        currentParticipants: 45,
        prize: '₹50,000',
        registrationDeadline: new Date('2025-12-20'),
        imageUrl: '/mumbai-championship.png',
        status: 'upcoming',
    },
    {
        title: 'Delhi Battle Royale',
        description: 'The ultimate Beyblade showdown in the capital! Watch as Delhi\'s finest bladers clash in an epic battle for supremacy. Live streaming available!',
        date: new Date('2025-11-28'),
        location: 'Delhi, NCR',
        maxParticipants: 32,
        currentParticipants: 30,
        prize: '₹35,000',
        registrationDeadline: new Date('2025-11-27'),
        imageUrl: '/delhi-battle.png',
        status: 'upcoming',
    },
    {
        title: 'Bangalore Bladers Cup',
        description: 'Tech city meets Beyblade! Bangalore\'s premier tournament featuring cutting-edge arena technology and the best bladers from Karnataka.',
        date: new Date('2026-01-05'),
        location: 'Bangalore, Karnataka',
        maxParticipants: 48,
        currentParticipants: 28,
        prize: '₹40,000',
        registrationDeadline: new Date('2026-01-01'),
        imageUrl: '/bangalore-cup.png',
        status: 'upcoming',
    },
    {
        title: 'Hyderabad Masters',
        description: 'Experience the fusion of tradition and technology at Hyderabad\'s premier Beyblade tournament! Compete in our state-of-the-art arena with the best bladers from Telangana and beyond. Amazing prizes await!',
        date: new Date('2026-01-12'),
        location: 'Hyderabad, Telangana',
        maxParticipants: 40,
        currentParticipants: 20,
        prize: '₹30,000',
        registrationDeadline: new Date('2026-01-08'),
        imageUrl: '/hyderabad-masters.png',
        status: 'upcoming',
    },
    {
        title: 'Pune Championship',
        description: 'The Pune Championship has concluded! Thank you to all participants for making this an unforgettable tournament. Check out the highlights and results from this amazing event.',
        date: new Date('2025-10-15'),
        location: 'Pune, Maharashtra',
        maxParticipants: 32,
        currentParticipants: 32,
        prize: '₹25,000',
        registrationDeadline: new Date('2025-10-10'),
        imageUrl: '/pune-championship.png',
        status: 'completed',
    },
    {
        title: 'Chennai Showdown',
        description: 'Get ready for the Chennai Showdown! Experience the perfect blend of traditional Tamil culture and modern Beyblade action. Join bladers from across Tamil Nadu in this epic tournament.',
        date: new Date('2026-01-18'),
        location: 'Chennai, Tamil Nadu',
        maxParticipants: 48,
        currentParticipants: 15,
        prize: '₹35,000',
        registrationDeadline: new Date('2026-01-14'),
        imageUrl: '/chennai-showdown.png',
        status: 'upcoming',
    },
    {
        title: 'Kolkata Battle Arena',
        description: 'The Kolkata Battle Arena has wrapped up! Witness the incredible battles that took place in the City of Joy. Congratulations to all winners and participants!',
        date: new Date('2025-10-10'),
        location: 'Kolkata, West Bengal',
        maxParticipants: 24,
        currentParticipants: 24,
        prize: '₹20,000',
        registrationDeadline: new Date('2025-10-05'),
        imageUrl: '/kolkata-battle.png',
        status: 'completed',
    },
    {
        title: 'Ahmedabad Clash',
        description: 'The vibrant city of Ahmedabad hosts an electrifying Beyblade tournament! Join Gujarat\'s finest bladers in intense battles. Modern facilities, expert referees, and incredible prizes await!',
        date: new Date('2026-01-22'),
        location: 'Ahmedabad, Gujarat',
        maxParticipants: 40,
        currentParticipants: 18,
        prize: '₹28,000',
        registrationDeadline: new Date('2026-01-18'),
        imageUrl: '/ahmedabad-clash.png',
        status: 'upcoming',
    },
    {
        title: 'Jaipur Royale',
        description: 'Experience royal treatment at the Jaipur Royale! Battle in the Pink City\'s most prestigious Beyblade tournament. Majestic venue, top-tier competition, and regal prizes for the champions!',
        date: new Date('2026-02-01'),
        location: 'Jaipur, Rajasthan',
        maxParticipants: 32,
        currentParticipants: 12,
        prize: '₹22,000',
        registrationDeadline: new Date('2026-01-25'),
        imageUrl: '/jaipur-royale.png',
        status: 'upcoming',
    },
];

async function seedTournaments() {
    try {
        console.log('🔄 Connecting to MongoDB...');
        await connectDB();
        console.log('✅ Connected to MongoDB');

        // Find an admin user or create one
        console.log('\n🔍 Looking for admin user...');
        let admin = await User.findOne({ role: 'admin' });

        if (!admin) {
            console.log('⚠️  No admin user found. Looking for any user...');
            admin = await User.findOne();

            if (!admin) {
                console.log('❌ No users found in database!');
                console.log('💡 Please sign up on the website first, then run this script again.');
                process.exit(1);
            }

            console.log(`📝 Found user: ${admin.email}`);
            console.log('⬆️  Upgrading user to admin...');
            admin.role = 'admin';
            await admin.save();
            console.log('✅ User upgraded to admin');
        } else {
            console.log(`✅ Found admin user: ${admin.email}`);
        }

        // Clear existing tournaments (optional)
        console.log('\n🗑️  Clearing existing tournaments...');
        const deleteResult = await Tournament.deleteMany({});
        console.log(`✅ Deleted ${deleteResult.deletedCount} existing tournaments`);

        // Create tournaments
        console.log('\n🎯 Creating tournaments...\n');
        const createdTournaments = [];

        for (let i = 0; i < tournaments.length; i++) {
            const tournamentData = tournaments[i];
            console.log(`${i + 1}. Creating: ${tournamentData.title}`);

            const tournament = await Tournament.create({
                ...tournamentData,
                createdBy: admin._id,
            });

            createdTournaments.push(tournament);
            console.log(`   ✅ Created with ID: ${tournament._id}`);
        }

        console.log('\n🎉 SUCCESS! All tournaments created!\n');
        console.log('📊 Summary:');
        console.log(`   Total tournaments: ${createdTournaments.length}`);
        console.log(`   Upcoming: ${createdTournaments.filter(t => t.status === 'upcoming').length}`);
        console.log(`   Completed: ${createdTournaments.filter(t => t.status === 'completed').length}`);
        console.log(`   Total prize pool: ₹${tournaments.reduce((sum, t) => sum + parseInt(t.prize.replace(/[₹,]/g, '')), 0).toLocaleString()}`);

        console.log('\n📝 Tournament IDs:');
        createdTournaments.forEach((t, i) => {
            console.log(`   ${i + 1}. ${t.title}`);
            console.log(`      ID: ${t._id}`);
            console.log(`      URL: /tournaments/${t._id}\n`);
        });

        console.log('✨ You can now register for these tournaments!');
        console.log('🌐 Visit: http://localhost:3000/tournaments\n');

        process.exit(0);
    } catch (error) {
        console.error('\n❌ Error seeding tournaments:', error);
        process.exit(1);
    }
}

// Run the seed function
seedTournaments();
