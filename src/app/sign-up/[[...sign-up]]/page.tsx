import { SignUp } from '@clerk/nextjs';
import styles from './page.module.css';

export default function SignUpPage() {
    return (
        <div className={styles.authContainer}>
            <div className={styles.authWrapper}>
                <div className={styles.authHeader}>
                    <h1>Join the Battle!</h1>
                    <p>Create your account and start your Beyblade journey</p>
                </div>
                <SignUp
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
