'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './github.module.css';

gsap.registerPlugin(ScrollTrigger);

// Skeleton Loading Component
const GitHubActivitySkeleton = () => {
  const isDarkMode = typeof document !== 'undefined' ? !document.documentElement.classList.contains('light-mode') : true;
  const shimmerBg = isDarkMode ? '#2a2a2a' : '#d1d5db';

  return (
    <section style={{ padding: '4rem 2rem', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header Skeleton */}
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <div
            style={{
              width: '250px',
              height: '32px',
              borderRadius: '8px',
              background: shimmerBg,
              marginBottom: '16px',
              animation: 'shimmer 2s infinite',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          />
          <div
            style={{
              width: '100%',
              maxWidth: '400px',
              height: '20px',
              borderRadius: '4px',
              background: shimmerBg,
              animation: 'shimmer 2s infinite',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          />
        </div>

        {/* Graph Skeleton */}
        <div
          style={{
            width: '100%',
            height: '200px',
            borderRadius: '12px',
            background: shimmerBg,
            animation: 'shimmer 2s infinite',
            border: '1px solid rgba(6, 182, 212, 0.1)',
          }}
        />
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default function GitHubActivity() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading || !sectionRef.current) return;

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
        rotateX: -10,
        scale: 0.9,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [loading]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!graphRef.current || !glowRef.current) return;
    const rect = graphRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(glowRef.current, {
      x: x,
      y: y,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  if (loading) {
    return <GitHubActivitySkeleton />;
  }

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Gradient Orbs Background */}
      <div className={`${styles.orb} ${styles.orb1}`} />
      <div className={`${styles.orb} ${styles.orb2}`} />
      <div className={`${styles.orb} ${styles.orb3}`} />

      <div className={styles.container}>
        {/* Header */}
        <div ref={headerRef} className={styles.header}>
          <h2 className={styles.title}>GitHub <span className={styles.accentText}>Activity</span></h2>
        </div>

        {/* Contribution Graph */}
        <div 
          ref={graphRef} 
          className={styles.graphContainer}
          onMouseMove={handleMouseMove}
        >
          <div className={styles.graphWrapper}>
            <div ref={glowRef} className={styles.graphGlow} />
            <div className={styles.graphContent}>
              <img
                src="https://ghchart.rshah.org/22d3ee/mehedi-hasan1102"
                alt="GitHub contribution graph"
                className={styles.graph}
                loading="lazy"
              />
            </div>
            <div className={styles.graphBorder} />
          </div>
        </div>
      </div>
    </section>
  );
}
