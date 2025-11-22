import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Activity from '@/models/Activity';
import { inngest } from '@/inngest/client';

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

export async function POST(req: Request) {
    if (!webhookSecret) {
        throw new Error('Please add CLERK_WEBHOOK_SECRET to .env.local');
    }

    // Get the headers
    const headerPayload = await headers();
    const svix_id = headerPayload.get('svix-id');
    const svix_timestamp = headerPayload.get('svix-timestamp');
    const svix_signature = headerPayload.get('svix-signature');

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured -- no svix headers', {
            status: 400,
        });
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(webhookSecret);

    let evt: any;

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as any;
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occured', {
            status: 400,
        });
    }

    // Handle the webhook
    const eventType = evt.type;
    console.log(`Webhook received: ${eventType}`);

    await connectDB();

    try {
        if (eventType === 'user.created') {
            const { id, email_addresses, first_name, last_name, public_metadata } = evt.data;

            const email = email_addresses[0]?.email_address;
            const name = `${first_name || ''} ${last_name || ''}`.trim() || email;

            // Create user in database
            const user = await User.create({
                clerkId: id,
                email,
                name,
                role: public_metadata?.role || 'user',
                status: 'active',
                stats: {
                    tournamentsPlayed: 0,
                    wins: 0,
                    losses: 0,
                    points: 0,
                },
            });

            // Log activity
            await Activity.create({
                type: 'user_registered',
                description: `${name} joined the platform`,
                userId: user._id,
            });

            // Trigger Inngest welcome email event
            await inngest.send({
                name: 'user/created',
                data: {
                    userId: user._id.toString(),
                    email: user.email,
                    name: user.name,
                    clerkId: id,
                },
            });

            console.log(`User created: ${user.name}`);
        }

        if (eventType === 'user.updated') {
            const { id, email_addresses, first_name, last_name, public_metadata } = evt.data;

            const email = email_addresses[0]?.email_address;
            const name = `${first_name || ''} ${last_name || ''}`.trim() || email;

            // Update user in database
            await User.findOneAndUpdate(
                { clerkId: id },
                {
                    $set: {
                        email,
                        name,
                        role: public_metadata?.role || 'user',
                    },
                },
                { upsert: true }
            );

            console.log(`User updated: ${name}`);
        }

        if (eventType === 'user.deleted') {
            const { id } = evt.data;

            // Delete user from database
            await User.findOneAndDelete({ clerkId: id });

            console.log(`User deleted: ${id}`);
        }

        return NextResponse.json({ message: 'Webhook processed successfully' });
    } catch (error: any) {
        console.error('Error processing webhook:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
