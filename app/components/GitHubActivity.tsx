'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './github.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function GitHubActivity() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Graph animation
      gsap.from(graphRef.current, {
        scrollTrigger: {
          trigger: graphRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div ref={headerRef} className={styles.header}>
          <h2 className={styles.title}>GitHub Activity</h2>
          <p className={styles.description}>
            A snapshot of my open-source contributions.
          </p>
        </div>

        {/* Contribution Graph */}
        <div ref={graphRef} className={styles.graphContainer}>
          <div className={styles.graphWrapper}>
            <img
              src="https://ghchart.rshah.org/22d3ee/mehedi-hasan1102"
              alt="GitHub contribution graph"
              className={styles.graph}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
