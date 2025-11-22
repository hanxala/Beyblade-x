'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import styles from './AdminSidebar.module.css';

interface NavItem {
    name: string;
    href: string;
    icon: string;
}

const navItems: NavItem[] = [
    { name: 'Dashboard', href: '/admin', icon: '📊' },
    { name: 'Tournaments', href: '/admin/tournaments', icon: '🏆' },
    { name: 'Users', href: '/admin/users', icon: '👥' },
    { name: 'Rankings', href: '/admin/rankings', icon: '📈' },
    { name: 'Content', href: '/admin/content', icon: '📝' },
    { name: 'Analytics', href: '/admin/analytics', icon: '📉' },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
            <div className={styles.sidebarHeader}>
                <Link href="/admin" className={styles.logo}>
                    <span className={styles.logoIcon}>⚡</span>
                    {!isCollapsed && <span className={styles.logoText}>Admin Panel</span>}
                </Link>
                <button
                    className={styles.collapseBtn}
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    aria-label="Toggle sidebar"
                >
                    {isCollapsed ? '→' : '←'}
                </button>
            </div>

            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    {navItems.map((item) => {
                        const isActive = pathname === item.href ||
                            (item.href !== '/admin' && pathname.startsWith(item.href));

                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                                    title={item.name}
                                >
                                    <span className={styles.navIcon}>{item.icon}</span>
                                    {!isCollapsed && <span className={styles.navText}>{item.name}</span>}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className={styles.sidebarFooter}>
                <Link href="/" className={styles.backLink} title="Back to Site">
                    <span className={styles.navIcon}>🏠</span>
                    {!isCollapsed && <span className={styles.navText}>Back to Site</span>}
                </Link>
            </div>
        </aside>
    );
}
