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
      if (sections.length > 0) {
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
      }

      // Challenge items reveal
      const challengeItems = gsap.utils.toArray('[data-challenge-item]') as Element[];
      if (challengeItems.length > 0) {
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
      }

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
      {/* Hero Section with Title Overlay */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground} />
        
        <div className={styles.heroContent}>
          {/* Breadcrumb */}
          <div className={styles.breadcrumb} data-hero-animate>
            <button onClick={() => router.back()} className={styles.backButton}>
              ← BACK
            </button>
            <span style={{ color: 'var(--text-secondary)' }}>/</span>
            <span className={styles.categoryBadge}>{project.category}</span>
          </div>

          <div className={styles.heroTitleSection}>
            {/* Title with char animation */}
            <div className={styles.titleWrapper}>
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
            </div>

            {/* Project Meta Info - Right Side */}
            <div className={styles.projectMeta} data-hero-animate>
              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>Status</span>
                <span className={styles.metaValue}>COMPLETED</span>
              </div>
              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>Duration</span>
                <span className={styles.metaValue}>1 Month</span>
              </div>
              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>Live Website →</span>
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.metaLink}
                >
                  View Site
                </a>
              </div>
              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>Role</span>
                <span className={styles.metaValue}>FULL-STACK DEV</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Project Image */}
      <section className={styles.mainImageSection} data-reveal-section>
        <div className={styles.imageContainer}>
          <img
            src={project.image}
            alt={project.title}
            className={styles.projectImage}
            data-parallax-image
          />
        </div>
      </section>

      {/* Project Gallery Grid */}
      <section className={styles.gallerySection} data-reveal-section>
        <div className={styles.galleryGrid}>
          <div className={styles.galleryItem}>
            <img src={project.image} alt={`${project.title} desktop view`} />
          </div>
          <div className={styles.galleryItem}>
            <img src={project.image} alt={`${project.title} mobile view`} />
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className={styles.textSection} data-reveal-section>
        <div className={styles.textContent}>
          <h3 className={styles.textLabel}>Challenges.</h3>
          <div className={styles.textBody}>
            {project.challenges && project.challenges.length > 0 ? (
              <p>{project.challenges.join('. ')}</p>
            ) : (
              <p>
                This project presented unique challenges in terms of performance optimization,
                user experience design, and scalable architecture implementation.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className={styles.textSection} data-reveal-section>
        <div className={styles.textContent}>
          <h3 className={styles.textLabel}>Solutions.</h3>
          <div className={styles.textBody}>
            {project.futurePlans && project.futurePlans.length > 0 ? (
              <p>{project.futurePlans.join('. ')}</p>
            ) : (
              <p>
                Implemented modern development practices with focus on code quality,
                performance optimization, and seamless user experience across all devices.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Tech Stack / Tools Section */}
      <section className={styles.toolsSection} data-reveal-section>
        <div className={styles.textContent}>
          <h3 className={styles.textLabel}>Tools.</h3>
          <div className={styles.techStack}>
            {project.tech && project.tech.length > 0 && project.tech.map((tech) => (
              <div key={tech} className={styles.techBadge}>
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Project Image */}
      <section className={styles.additionalImageSection} data-reveal-section>
        <div className={styles.imageContainer}>
          <img
            src={project.image}
            alt={`${project.title} showcase`}
            className={styles.showcaseImage}
          />
        </div>
      </section>

      {/* CTA Buttons Section */}
      <section className={styles.ctaButtonsSection} data-reveal-section>
        <div className={styles.buttonGroup}>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButton}
          >
            VISIT LIVE SITE →
          </a>
          {project.frontendUrl && (
            <a
              href={project.frontendUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaButtonSecondary}
            >
              VIEW CODE
            </a>
          )}
        </div>
      </section>
    </div>
  );
}
