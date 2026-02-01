'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './works.module.css';

gsap.registerPlugin(ScrollTrigger);

interface Work {
  id: number;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  image: string;
  color: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
}

export default function Works() {
  const sectionRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const [works, setWorks] = useState<Work[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Load projects from JSON
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/data/projects.json');
        const data = await response.json();
        setWorks(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading projects:', error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // GSAP animations
  useEffect(() => {
    if (works.length === 0 || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.work-card') as Element[];

      cards.forEach((card, index) => {
        gsap.fromTo(card, 
          {
            opacity: 0,
            y: 60,
            x: index % 2 === 0 ? -40 : 40,
            rotationY: index % 2 === 0 ? 10 : -10,
          },
          {
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              end: 'top 70%',
              scrub: 0.5,
              onEnter: () => gsap.to(card, { opacity: 1, y: 0, x: 0, rotationY: 0, duration: 0.8 }),
            },
            opacity: 1,
            y: 0,
            x: 0,
            rotationY: 0,
            duration: 0.8,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [works]);

  const handleHover = (id: number, isHovering: boolean) => {
    setHoveredId(isHovering ? id : null);
    const card = document.querySelector(`[data-work-id="${id}"]`);
    if (card) {
      gsap.to(card, {
        y: isHovering ? -16 : 0,
        rotationZ: isHovering ? 2 : 0,
        scale: isHovering ? 1.02 : 1,
        boxShadow: isHovering
          ? '0 30px 60px rgba(34, 211, 238, 0.25)'
          : '0 10px 30px rgba(0, 0, 0, 0.2)',
        duration: 0.4,
        ease: 'power3.out',
      });

      // Animate image overlay
      const image = card.querySelector('[data-work-image]');
      if (image) {
        gsap.to(image, {
          scale: isHovering ? 1.1 : 1,
          duration: 0.6,
          ease: 'power2.out',
        });
      }
    }
  };

  const handleProjectClick = (slug: string) => {
    router.push(`/projects/${slug}`);
  };

  if (loading) {
    return (
      <section
        id="works"
        className={styles.works}
        style={{ background: 'var(--surface)' }}
      >
        <div className={`container ${styles.worksLoading}`} style={{ color: 'var(--text)' }}>
          <p>Loading projects...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="works"
      ref={sectionRef}
      className={styles.works}
      style={{ background: 'var(--surface)' }}
    >
      <div className="container">
        {/* Animated heading */}
        <div className={styles.worksHeader}>
          <h2 className={styles.worksTitle}
            style={{ 
              background: 'linear-gradient(135deg, var(--text) 0%, var(--accent) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
            Selected Works
          </h2>
          <p className={styles.worksDescription}
            style={{ color: 'var(--text-secondary)' }}
          >
            Projects that showcase creative thinking, technical expertise, and
            attention to motion design details.
          </p>
        </div>

        {/* Works Grid */}
        <div className={styles.worksGrid}>
          {works.map((work, idx) => (
            <div
              key={work.id}
              data-work-id={work.id}
              className={`${styles.workCard} work-card`}
              onMouseEnter={() => handleHover(work.id, true)}
              onMouseLeave={() => handleHover(work.id, false)}
              onClick={() => handleProjectClick(work.slug)}
              style={{
                border: `1px solid rgba(34, 211, 238, 0.3)`,
              }}
            >
              {/* Image Section */}
              <div className={styles.workImage}>
                <div
                  data-work-image
                  className={styles.workImageGradient}
                  style={{
                    background: `linear-gradient(135deg, ${work.color}, #06b6d4)`,
                  }}
                />
                {/* Index Badge */}
                <div
                  className={styles.workImageBadge}
                  style={{
                    background: work.color,
                  }}
                >
                  {(idx + 1).toString().padStart(2, '0')}
                </div>
              </div>

              {/* Content Section */}
              <div className={styles.workContent}>
                <div
                  className={styles.workCategory}
                  style={{ color: work.color }}
                >
                  {work.category}
                </div>
                <h3
                  className={styles.workTitle}
                  style={{ color: 'var(--text)' }}
                >
                  {work.title}
                </h3>
                <p
                  className={styles.workDescription}
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {work.shortDescription}
                </p>

                {/* Tags */}
                <div className={styles.workTags}>
                  {work.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className={styles.workTag}
                      style={{
                        borderColor: work.color,
                        color:
                          hoveredId === work.id
                            ? 'var(--bg)'
                            : work.color,
                        background:
                          hoveredId === work.id ? work.color : 'transparent',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
