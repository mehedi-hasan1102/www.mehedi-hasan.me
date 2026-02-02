'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import '@/app/components/skills.module.css';
import styles from './projectDetails.module.css';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tech: string[];
  liveUrl: string;
  frontendUrl: string;
  backendUrl: string;
  year: string;
  challenges?: string[];
  futurePlans?: string[];
}

export default function ProjectDetails() {
  const params = useParams();
  const router = useRouter();
  const pageRef = useRef<HTMLDivElement>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch('/data/projects.json');
        const projects = await response.json();
        const foundProject = projects.find((p: Project) => p.slug === params.slug);
        
        if (foundProject) {
          setProject(foundProject);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Error loading project:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [params.slug]);

  // GSAP animations
  useEffect(() => {
    if (!project || !pageRef.current) return;

    const ctx = gsap.context(() => {
      // Hero title split animation
      const titleChars = gsap.utils.toArray('.hero-title-char') as Element[];
      gsap.from(titleChars, {
        opacity: 0,
        y: 100,
        rotateX: -90,
        stagger: 0.02,
        duration: 1,
        ease: 'power4.out',
      });

      // Hero content animations
      gsap.from('[data-hero-animate]', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.5,
        ease: 'power3.out',
      });

      // Parallax image effect
      gsap.to('[data-parallax-image]', {
        scrollTrigger: {
          trigger: '[data-parallax-image]',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        y: -100,
      });

      // Reveal sections with scale
      const sections = gsap.utils.toArray('[data-reveal-section]') as Element[];
      sections.forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top 60%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          y: 60,
          scale: 0.95,
          duration: 1,
          ease: 'power3.out',
        });
      });

      // Tech cards stagger animation
      const techCards = gsap.utils.toArray('[data-tech-card]') as Element[];
      gsap.from(techCards, {
        scrollTrigger: {
          trigger: techCards[0],
          start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        scale: 0.8,
        stagger: 0.05,
        duration: 0.6,
        ease: 'back.out(1.7)',
      });

      // Challenge items reveal
      const challengeItems = gsap.utils.toArray('[data-challenge-item]') as Element[];
      challengeItems.forEach((item) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
          },
          opacity: 0,
          x: -30,
          duration: 0.6,
          ease: 'power2.out',
        });
      });

    }, pageRef);

    return () => ctx.revert();
  }, [project]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <p style={{ color: 'var(--text)' }}>Loading project...</p>
      </div>
    );
  }

  if (notFound || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: 'var(--bg)' }}>
        <h1 style={{ color: 'var(--text)' }} className="text-4xl font-bold mb-4">
          Project Not Found
        </h1>
        <p style={{ color: 'var(--text-secondary)' }} className="mb-8">
          The project you&#39;re looking for doesn&#39;t exist.
        </p>
        <Link
          href="#works"
          className="px-6 py-3 rounded-lg font-semibold transition-all"
          style={{
            background: 'linear-gradient(135deg, var(--accent), #7c3aed)',
            color: 'white',
          }}
        >
          Back to Works
        </Link>
      </div>
    );
  }

  return (
    <div ref={pageRef} className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Project Image Showcase - Top Position */}
      <section className={styles.imageSection} data-reveal-section style={{ paddingTop: '0' }}>
        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            <img
              src={project.image}
              alt={project.title}
              className={styles.projectImage}
              data-parallax-image
            />
          </div>
        </div>
      </section>

      {/* Hero Section - Premium Design */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground} />
        <div className={styles.heroGrid} />
        
        <div className={styles.heroContent}>
          {/* Breadcrumb */}
          <div className={styles.breadcrumb} data-hero-animate>
            <button onClick={() => router.back()} className={styles.backButton}>
              ← BACK
            </button>
            <span style={{ color: 'var(--text-secondary)' }}>/</span>
            <span className={styles.categoryBadge}>{project.category}</span>
          </div>

          {/* Title with char animation */}
          <h1 className={styles.heroTitle}>
            {project.title.split('').map((char, i) => (
              <span key={i} className="hero-title-char" style={{ display: 'inline-block' }}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>

          <p className={styles.heroDescription} data-hero-animate>
            {project.description}
          </p>

          {/* Meta Information */}
          <div className={styles.heroMeta} data-hero-animate>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Year</span>
              <span className={styles.metaValue}>{project.year}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Category</span>
              <span className={styles.metaValue}>{project.category}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Technologies</span>
              <span className={styles.metaValue}>{project.tech.length}+</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className={styles.heroCTA} data-hero-animate>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.primaryButton}
            >
              VIEW LIVE PROJECT
              <span>→</span>
            </a>
            {project.frontendUrl && (
              <a
                href={project.frontendUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryButton}
              >
                FRONTEND CODE
              </a>
            )}
            {project.backendUrl && (
              <a
                href={project.backendUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryButton}
              >
                BACKEND CODE
              </a>
            )}
          </div>
        </div>
      </section>

      {/* About Project - Two Column Layout */}
      <section className={styles.contentSection} data-reveal-section>
        <h2 className={styles.sectionTitle}>
          ABOUT <span className={styles.sectionTitleAccent}>THE PROJECT</span>
        </h2>
        <div className={styles.contentGrid}>
          <div className={styles.contentBlock}>
            <p>{project.description}</p>
          </div>
          <div className={styles.contentBlock}>
            <p>
              This project showcases modern web development practices with a focus on
              user experience, performance optimization, and scalable architecture.
              Built with cutting-edge technologies to deliver exceptional results.
            </p>
          </div>
        </div>
      </section>

      {/* Technologies - Grid Cards */}
      <section className={styles.techSection} data-reveal-section>
        <div className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>
            TECH <span className={styles.sectionTitleAccent}>STACK</span>
          </h2>
          <div className={styles.techGrid}>
            {project.tech.map((tech, index) => (
              <div key={tech} className={styles.techCard} data-tech-card>
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges & Future Plans - Premium Cards */}
      <section className={styles.challengesSection} data-reveal-section>
        <h2 className={styles.sectionTitle}>
          CHALLENGES & <span className={styles.sectionTitleAccent}>FUTURE</span>
        </h2>
        <div className={styles.challengesGrid}>
          {/* Challenges Block */}
          <div className={styles.challengeBlock}>
            <h3 className={styles.challengeTitle}>
              <span className={styles.challengeIcon}>🔴</span>
              CHALLENGES
            </h3>
            <ul className={styles.challengeList}>
              {project.challenges?.map((challenge, idx) => (
                <li key={idx} className={styles.challengeItem} data-challenge-item>
                  <span className={styles.challengeBullet}>●</span>
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Future Plans Block */}
          <div className={styles.challengeBlock}>
            <h3 className={styles.challengeTitle}>
              <span className={styles.challengeIcon}>🟢</span>
              FUTURE PLANS
            </h3>
            <ul className={styles.challengeList}>
              {project.futurePlans?.map((plan, idx) => (
                <li key={idx} className={styles.challengeItem} data-challenge-item>
                  <span className={styles.challengeBullet}>✓</span>
                  <span>{plan}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section - Grand Finale */}
      <section className={styles.ctaSection} data-reveal-section>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>
            EXPLORE <span className={styles.heroTitleGradient}>THE PROJECT</span>
          </h2>
          <div className={styles.ctaButtons}>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.primaryButton}
            >
              VISIT LIVE SITE
              <span>🚀</span>
            </a>
            {project.frontendUrl && (
              <a
                href={project.frontendUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryButton}
              >
                VIEW FRONTEND
                <span>💻</span>
              </a>
            )}
            {project.backendUrl && (
              <a
                href={project.backendUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryButton}
              >
                VIEW BACKEND
                <span>🔧</span>
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
