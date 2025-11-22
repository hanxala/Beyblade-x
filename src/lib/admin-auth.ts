import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

/**
 * Check if the current user is an admin
 * Admins are identified by having role: 'admin' in their public metadata
 */
export async function isAdmin(): Promise<boolean> {
    const user = await currentUser();

    if (!user) {
        return false;
    }

    // Check if user has admin role in public metadata
    const role = user.publicMetadata?.role;
    return role === 'admin';
}

/**
 * Require admin access - redirects to home if not admin
 */
export async function requireAdmin() {
    const admin = await isAdmin();

    if (!admin) {
        redirect('/');
    }
}

/**
 * Get admin user info
 */
export async function getAdminUser() {
    const user = await currentUser();
    const admin = await isAdmin();

    if (!admin) {
        return null;
    }

    return {
        id: user?.id,
        email: user?.emailAddresses[0]?.emailAddress,
        name: user?.firstName + ' ' + user?.lastName,
        imageUrl: user?.imageUrl,
    };
}
