'use client';

import { UserButton } from '@clerk/nextjs';
import styles from './AdminTopBar.module.css';

interface AdminTopBarProps {
    title: string;
}

export default function AdminTopBar({ title }: AdminTopBarProps) {
    return (
        <div className={styles.topBar}>
            <div className={styles.topBarContent}>
                <h1 className={styles.title}>{title}</h1>

                <div className={styles.topBarActions}>
                    <button className={styles.notificationBtn} title="Notifications">
                        <span className={styles.notificationIcon}>🔔</span>
                        <span className={styles.badge}>3</span>
                    </button>

                    <div className={styles.userButton}>
                        <UserButton
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    avatarBox: styles.avatar,
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
