import { SignIn } from '@clerk/nextjs';
import styles from './page.module.css';

export default function SignInPage() {
    return (
        <div className={styles.authContainer}>
            <div className={styles.authWrapper}>
                <div className={styles.authHeader}>
                    <h1>Welcome Back, Blader!</h1>
                    <p>Sign in to continue your Beyblade journey</p>
                </div>
                <SignIn
                    appearance={{
                        elements: {
                            rootBox: styles.clerkRoot,
                            card: styles.clerkCard,
                        }
                    }}
                />
            </div>
        </div>
    );
}
