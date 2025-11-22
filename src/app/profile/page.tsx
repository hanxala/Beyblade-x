import { UserProfile } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import PageHero from '@/components/PageHero';
import styles from './page.module.css';

export default async function ProfilePage() {
    const user = await currentUser();

    return (
        <div className={styles.page}>
            <PageHero
                title="Blader Profile"
                subtitle={`Welcome back, ${user?.firstName || 'Blader'}!`}
                backgroundImage="/beyblade-hero.png"
            />

            <div className={styles.profileContainer}>
                <div className={styles.profileWrapper}>
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
        </div>
    );
}
