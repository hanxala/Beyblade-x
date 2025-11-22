'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className={styles.page}>
            <div className={styles.pageHeader}>
                <div className="container">
                    <h1 className="animate-fadeIn">Contact Us</h1>
                    <p className="animate-fadeIn">
                        Have questions? We'd love to hear from you!
                    </p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <div className={styles.content}>
                        {/* Contact Form */}
                        <div className={styles.formSection}>
                            <div className={`${styles.formCard} card-glass`}>
                                <h2>Send us a Message</h2>
                                <form onSubmit={handleSubmit} className={styles.form}>
                                    <div className="form-group">
                                        <label htmlFor="name" className="form-label">Name *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="form-input"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email" className="form-label">Email *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="form-input"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="subject" className="form-label">Subject *</label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="form-select"
                                            required
                                        >
                                            <option value="">Select a subject</option>
                                            <option value="tournament">Tournament Inquiry</option>
                                            <option value="registration">Registration Help</option>
                                            <option value="technical">Technical Support</option>
                                            <option value="partnership">Partnership Opportunity</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="message" className="form-label">Message *</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="form-textarea"
                                            required
                                        ></textarea>
                                    </div>

                                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className={styles.infoSection}>
                            <div className={`${styles.infoCard} card-glass`}>
                                <h2>Get in Touch</h2>
                                <p className={styles.infoText}>
                                    Have questions about tournaments, registrations, or partnerships?
                                    We're here to help!
                                </p>

                                <div className={styles.contactMethods}>
                                    <div className={styles.contactItem}>
                                        <div className={styles.contactIcon}>📧</div>
                                        <div>
                                            <h4>Email</h4>
                                            <a href="mailto:info@beyblade-x.in">info@beyblade-x.in</a>
                                        </div>
                                    </div>

                                    <div className={styles.contactItem}>
                                        <div className={styles.contactIcon}>📱</div>
                                        <div>
                                            <h4>Phone</h4>
                                            <a href="tel:+911234567890">+91 123 456 7890</a>
                                        </div>
                                    </div>

                                    <div className={styles.contactItem}>
                                        <div className={styles.contactIcon}>📍</div>
                                        <div>
                                            <h4>Office</h4>
                                            <p>Mumbai, Maharashtra, India</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`${styles.infoCard} card-glass`}>
                                <h2>Follow Us</h2>
                                <p className={styles.infoText}>
                                    Stay updated with the latest tournaments and news on social media.
                                </p>
                                <div className={styles.socialLinks}>
                                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialButton}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                        </svg>
                                        Twitter
                                    </a>
                                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialButton}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="var(--color-bg-primary)" />
                                        </svg>
                                        Instagram
                                    </a>
                                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={styles.socialButton}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z" />
                                            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="var(--color-bg-primary)" />
                                        </svg>
                                        YouTube
                                    </a>
                                    <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className={styles.socialButton}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                                        </svg>
                                        Discord
                                    </a>
                                </div>
                            </div>

                            <div className={`${styles.infoCard} card-glass`}>
                                <h2>FAQ</h2>
                                <div className={styles.faqList}>
                                    <div className={styles.faqItem}>
                                        <h4>How do I register for a tournament?</h4>
                                        <p>Browse our tournaments page and click "Register Now" on your preferred event.</p>
                                    </div>
                                    <div className={styles.faqItem}>
                                        <h4>What are the tournament rules?</h4>
                                        <p>Each tournament has specific rules listed on its detail page. General rules follow official Beyblade standards.</p>
                                    </div>
                                    <div className={styles.faqItem}>
                                        <h4>How are rankings calculated?</h4>
                                        <p>Rankings are based on tournament performance, wins, and overall points accumulated.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
