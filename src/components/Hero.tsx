'use client';

import { useEffect, useState } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
    const [currentImage, setCurrentImage] = useState(0);
    const images = [
        '/beyblade-hero.png',
        '/tournament-arena.png',
        '/beyblade-action.png'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <section className={styles.hero}>
            {/* Background Image Carousel */}
            <div className={styles.heroBackground}>
                {images.map((img, index) => (
                    <div
                        key={img}
                        className={`${styles.backgroundImage} ${index === currentImage ? styles.active : ''
                            }`}
                        style={{ backgroundImage: `url(${img})` }}
                    />
                ))}
                <div className={styles.overlay}></div>
            </div>

            {/* Animated Elements */}
            <div className={styles.animatedElements}>
                <div className={styles.gradientOrb1}></div>
                <div className={styles.gradientOrb2}></div>
                <div className={styles.gradientOrb3}></div>

                {/* Particles */}
                <div className={styles.particlesContainer}>
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className={styles.particle}
                            style={{
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${5 + Math.random() * 10}s`
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="container">
                <div className={styles.heroContent}>
                    <h1 className={`${styles.heroTitle} animate-fadeIn`}>
                        Unleash Your <span className="text-gradient">Beyblade</span> Power
                    </h1>

                    <p className={`${styles.heroSubtitle} animate-fadeIn`}>
                        Join India's most thrilling Beyblade tournament platform. Compete with the best,
                        climb the ranks, and become a legendary blader!
                    </p>

                    <div className={`${styles.heroButtons} animate-fadeIn`}>
                        <a href="/tournaments" className="btn btn-primary">
                            <span>🎯</span>
                            Browse Tournaments
                        </a>
                        <a href="/rankings" className="btn btn-outline">
                            <span>⚡</span>
                            View Rankings
                        </a>
                    </div>

                    <div className={styles.heroStats}>
                        <div className={styles.stat}>
                            <div className={styles.statNumber}>500+</div>
                            <div className={styles.statLabel}>Active Players</div>
                        </div>
                        <div className={styles.stat}>
                            <div className={styles.statNumber}>50+</div>
                            <div className={styles.statLabel}>Tournaments</div>
                        </div>
                        <div className={styles.stat}>
                            <div className={styles.statNumber}>15+</div>
                            <div className={styles.statLabel}>Cities</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Spinning Beyblade Decoration */}
            <div className={styles.beybladeDecoration}>
                <div className={styles.spinnerRing}></div>
                <div className={styles.spinnerRing2}></div>
                <div className={styles.spinnerCore}>⚡</div>
            </div>

            {/* Image Indicators */}
            <div className={styles.imageIndicators}>
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.indicator} ${index === currentImage ? styles.activeIndicator : ''
                            }`}
                        onClick={() => setCurrentImage(index)}
                        aria-label={`View image ${index + 1}`}
                    />
                ))}
            </div>

            {/* Scroll Indicator */}
            <div className={styles.scrollIndicator}>
                <div className={styles.mouse}>
                    <div className={styles.wheel}></div>
                </div>
                <div className={styles.scrollText}>Scroll to explore</div>
            </div>
        </section>
    );
}
