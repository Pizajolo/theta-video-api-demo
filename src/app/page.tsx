"use client";
import Image from 'next/image'
import styles from './page.module.css'
import Video from "@/app/video";

export default function Home() {
    return (
        <main className={styles.main}>
            <nav className={styles.navbar}>
                <img
                    src="/images/logo.svg"
                    alt="theta-video-api-logo"
                    className={styles.logo}
                />
                <h2>Demo App</h2>
                <div/>
            </nav>
            <div style={{ borderTop: '1px solid var(--primary-color)', width: '100%' }}></div>
            <Video></Video>
        </main>
    );
}

