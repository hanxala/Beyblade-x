import PageHero from '@/components/PageHero';
import styles from './page.module.css';

export default function AboutPage() {
    return (
        <div className={styles.page}>
            <PageHero
                title="About Beyblade-X"
                subtitle="India's premier platform for Beyblade tournaments and community"
                backgroundImage="/delhi-battle.png"
            />

            <section className="section">
                <div className="container">
                    <div className={styles.content}>
                        {/* Mission Section */}
                        <div className={`${styles.section} animate-fadeIn`}>
                            <div className={styles.sectionContent}>
                                <h2>Our Mission</h2>
                                <p>
                                    Beyblade-X is dedicated to creating the ultimate competitive platform for Beyblade enthusiasts
                                    across India. We bring together passionate bladers from all corners of the country to compete,
                                    connect, and celebrate the spirit of Beyblade battles.
                                </p>
                                <p>
                                    Our mission is to foster a vibrant community where skill, strategy, and sportsmanship come
                                    together. Whether you're a seasoned champion or just starting your journey, Beyblade-X provides
                                    the perfect arena to test your abilities and grow as a blader.
                                </p>
                            </div>
                            <div className={styles.sectionImage}>
                                <div className={styles.imageCard}>
                                    <div className={styles.imagePlaceholder}>🎯</div>
                                </div>
                            </div>
                        </div>

                        {/* What We Offer */}
                        <div className={`${styles.section} ${styles.reverse} animate-fadeIn`}>
                            <div className={styles.sectionImage}>
                                <div className={styles.imageCard}>
                                    <div className={styles.imagePlaceholder}>⚡</div>
                                </div>
                            </div>
                            <div className={styles.sectionContent}>
                                <h2>What We Offer</h2>
                                <ul className={styles.featureList}>
                                    <li>
                                        <span className={styles.featureIcon}>🏆</span>
                                        <div>
                                            <strong>Competitive Tournaments</strong>
                                            <p>Regular tournaments across major Indian cities with exciting prizes</p>
                                        </div>
                                    </li>
                                    <li>
                                        <span className={styles.featureIcon}>📊</span>
                                        <div>
                                            <strong>Player Rankings</strong>
                                            <p>Comprehensive ranking system tracking your progress and achievements</p>
                                        </div>
                                    </li>
                                    <li>
                                        <span className={styles.featureIcon}>👥</span>
                                        <div>
                                            <strong>Community Building</strong>
                                            <p>Connect with fellow bladers and build lasting friendships</p>
                                        </div>
                                    </li>
                                    <li>
                                        <span className={styles.featureIcon}>🎓</span>
                                        <div>
                                            <strong>Skill Development</strong>
                                            <p>Learn from the best and improve your battling techniques</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Values */}
                        <div className={styles.valuesSection}>
                            <h2 className="text-center">Our Values</h2>
                            <div className={styles.valuesGrid}>
                                <div className={`${styles.valueCard} card-glass`}>
                                    <div className={styles.valueIcon}>🤝</div>
                                    <h3>Fair Play</h3>
                                    <p>We uphold the highest standards of sportsmanship and integrity in all our tournaments.</p>
                                </div>
                                <div className={`${styles.valueCard} card-glass`}>
                                    <div className={styles.valueIcon}>🌟</div>
                                    <h3>Excellence</h3>
                                    <p>We strive for excellence in every aspect, from tournament organization to player experience.</p>
                                </div>
                                <div className={`${styles.valueCard} card-glass`}>
                                    <div className={styles.valueIcon}>💪</div>
                                    <h3>Inclusivity</h3>
                                    <p>Everyone is welcome, regardless of skill level. We believe in growing together as a community.</p>
                                </div>
                                <div className={`${styles.valueCard} card-glass`}>
                                    <div className={styles.valueIcon}>🚀</div>
                                    <h3>Innovation</h3>
                                    <p>We continuously improve our platform to provide the best possible experience for all bladers.</p>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className={styles.statsSection}>
                            <h2 className="text-center">Our Impact</h2>
                            <div className={styles.statsGrid}>
                                <div className={styles.statItem}>
                                    <div className={styles.statNumber}>500+</div>
                                    <div className={styles.statLabel}>Active Players</div>
                                </div>
                                <div className={styles.statItem}>
                                    <div className={styles.statNumber}>50+</div>
                                    <div className={styles.statLabel}>Tournaments</div>
                                </div>
                                <div className={styles.statItem}>
                                    <div className={styles.statNumber}>15+</div>
                                    <div className={styles.statLabel}>Cities</div>
                                </div>
                                <div className={styles.statItem}>
                                    <div className={styles.statNumber}>₹10L+</div>
                                    <div className={styles.statLabel}>Prize Money</div>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className={styles.ctaSection}>
                            <h2>Ready to Join?</h2>
                            <p>
                                Become part of India's fastest-growing Beyblade community and start your journey to becoming a champion!
                            </p>
                            <div className={styles.ctaButtons}>
                                <a href="/tournaments" className="btn btn-primary">
                                    Browse Tournaments
                                </a>
                                <a href="/contact" className="btn btn-outline">
                                    Contact Us
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
