'use client';

import styles from './PageHero.module.css';

interface PageHeroProps {
    title: string;
    subtitle?: string;
    backgroundImage: string;
}

export default function PageHero({ title, subtitle, backgroundImage }: PageHeroProps) {
    return (
        <section className={styles.hero}>
            <div
                className={styles.heroBackground}
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <div className={styles.overlay}></div>
            </div>

            <div className="container">
                <div className={styles.heroContent}>
                    <h1 className={`${styles.heroTitle} animate-fadeIn`}>{title}</h1>
                    {subtitle && (
                        <p className={`${styles.heroSubtitle} animate-fadeIn`}>
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>

            {/* Animated Elements */}
            <div className={styles.animatedElements}>
                <div className={styles.gradientOrb1}></div>
                <div className={styles.gradientOrb2}></div>
            </div>
        </section>
    );
}
