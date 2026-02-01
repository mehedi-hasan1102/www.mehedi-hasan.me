'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import styles from './hero.module.css';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate hero on mount
    const ctx = gsap.context(() => {
      // Split text
      if (!titleRef.current || !descRef.current) return;
      
      const titleText = SplitType.create(titleRef.current, { types: 'chars' });
      const descText = SplitType.create(descRef.current, { types: 'words' });

      // Create timeline
      const tl = gsap.timeline();

      // Stagger animate chars with wave effect
      if (titleText.chars) {
        tl.from(titleText.chars, {
          opacity: 0,
          y: 100,
          rotationX: -90,
          rotationZ: -45,
          duration: 0.9,
          stagger: { amount: 0.6, ease: 'sine.inOut' },
          ease: 'cubic.out',
        }, 0);
      }

      // Animate description words
      if (descText.words) {
        tl.from(
          descText.words,
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
            stagger: 0.05,
            ease: 'power2.out',
          },
          0.4
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className={styles.hero}
    >
      {/* Animated gradient blobs */}
      <div className={styles.heroBackground}>
        <div className={styles.heroBlob1} />
        <div className={styles.heroBlob2} />
      </div>

      <div className="container relative z-10">
        <div className={styles.heroContainer}>
          <div
            ref={titleRef}
            className={styles.heroTitle}
          >
            <h1 className={styles.heroTitleMain}>
              FULL-STACK
            </h1>
            <h1 className={styles.heroTitleAccent}>
              DEVELOPER
            </h1>
          </div>

          <div
            ref={descRef}
            className={styles.heroDescription}
          >
            
          </div>

          {/* Scroll indicator with animation */}
          <div className={styles.heroScroll} onClick={() => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}>
            <div className={styles.heroScrollBox}>
              <div className={styles.heroScrollDot} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
