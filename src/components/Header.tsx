'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import styles from './Header.module.css';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isSignedIn, isLoaded } = useUser();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className={styles.header}>
            <div className="container">
                <nav className={styles.nav}>
                    <Link href="/" className={styles.logo}>
                        <span className={styles.logoIcon}>⚡</span>
                        <span className={styles.logoText}>BEYBLADE-X</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <ul className={styles.navLinks}>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/tournaments">Tournaments</Link></li>
                        <li><Link href="/rankings">Rankings</Link></li>
                        <li><Link href="/about">About</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                    </ul>

                    {/* Auth Buttons */}
                    <div className={styles.authButtons}>
                        {isLoaded && (
                            <>
                                {isSignedIn ? (
                                    <div className={styles.userButtonWrapper}>
                                        <UserButton
                                            afterSignOutUrl="/"
                                            appearance={{
                                                elements: {
                                                    avatarBox: styles.avatar,
                                                    userButtonPopoverCard: styles.userPopover,
                                                }
                                            }}
                                        >
                                            <UserButton.MenuItems>
                                                <UserButton.Link
                                                    label="Admin Panel"
                                                    labelIcon={<span>⚡</span>}
                                                    href="/admin"
                                                />
                                            </UserButton.MenuItems>
                                        </UserButton>
                                    </div>
                                ) : (
                                    <>
                                        <SignInButton mode="modal">
                                            <button className={`${styles.authBtn} ${styles.signInBtn}`}>
                                                Sign In
                                            </button>
                                        </SignInButton>
                                        <SignUpButton mode="modal">
                                            <button className={`${styles.authBtn} ${styles.signUpBtn}`}>
                                                Sign Up
                                            </button>
                                        </SignUpButton>
                                    </>
                                )}
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className={styles.menuButton}
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <span className={`${styles.menuIcon} ${isMenuOpen ? styles.open : ''}`}></span>
                    </button>
                </nav>

                {/* Mobile Navigation */}
                <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}>
                    <ul className={styles.mobileNavLinks}>
                        <li><Link href="/" onClick={toggleMenu}>Home</Link></li>
                        <li><Link href="/tournaments" onClick={toggleMenu}>Tournaments</Link></li>
                        <li><Link href="/rankings" onClick={toggleMenu}>Rankings</Link></li>
                        <li><Link href="/about" onClick={toggleMenu}>About</Link></li>
                        <li><Link href="/contact" onClick={toggleMenu}>Contact</Link></li>
                    </ul>

                    {/* Mobile Auth Buttons */}
                    <div className={styles.mobileAuthButtons}>
                        {isLoaded && (
                            <>
                                {isSignedIn ? (
                                    <div className={styles.mobileUserButton}>
                                        <UserButton
                                            afterSignOutUrl="/"
                                            appearance={{
                                                elements: {
                                                    avatarBox: styles.avatar,
                                                }
                                            }}
                                        >
                                            <UserButton.MenuItems>
                                                <UserButton.Link
                                                    label="Admin Panel"
                                                    labelIcon={<span>⚡</span>}
                                                    href="/admin"
                                                />
                                            </UserButton.MenuItems>
                                        </UserButton>
                                    </div>
                                ) : (
                                    <>
                                        <SignInButton mode="modal">
                                            <button className={`${styles.authBtn} ${styles.signInBtn}`}>
                                                Sign In
                                            </button>
                                        </SignInButton>
                                        <SignUpButton mode="modal">
                                            <button className={`${styles.authBtn} ${styles.signUpBtn}`}>
                                                Sign Up
                                            </button>
                                        </SignUpButton>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

