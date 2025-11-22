import { UserProfile } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import styles from './page.module.css';

export default async function ProfilePage() {
    const user = await currentUser();

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileWrapper}>
                <div className={styles.profileHeader}>
                    <h1>Blader Profile</h1>
                    <p>Welcome back, {user?.firstName || 'Blader'}!</p>
                </div>

                <div className={styles.profileContent}>
                    <UserProfile
                        appearance={{
                            elements: {
                                rootBox: styles.clerkRoot,
                                card: styles.clerkCard,
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
