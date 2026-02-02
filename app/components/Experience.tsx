'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './experience.module.css';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  id: number;
  type: 'work' | 'education';
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  tech?: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    type: 'work',
    title: 'Junior Web Developer (Self-Taught)',
    company: 'Independent Projects',
    location: 'Remote',
    period: '2024 - Present',
    description: 'Building full-stack web applications with modern technologies.',
    achievements: [
      'Developed full-stack applications using React, Next.js and TypeScript',
      'Implemented RESTful APIs and database integration',
      'Optimized application performance and user experience',
      'Deployed applications on Vercel and AWS'
    ],
    tech: ['React.js', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'REST APIs', 'Tailwind CSS', 'GSAP']
  },
  {
    id: 2,
    type: 'education',
    title: 'B.Sc in Computer Science',
    company: 'University/Institute Name',
    location: 'Bangladesh',
    period: '2022 - Present',
    description: 'Pursuing degree in Computer Science with focus on Web Development.',
    achievements: [
      'Completed coursework in Data Structures and Algorithms',
      'Developed projects in Web Development and Mobile Apps',
      'Active member of coding community'
    ],
    tech: ['JavaScript', 'Python', 'Data Structures', 'Web Development']
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const glowRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = e.currentTarget;
    const glow = glowRefs.current[index];
    if (!card || !glow) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(glow, {
      x: x,
      y: y,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  useEffect(() => {
    // Animate header
    if (headerRef.current) {
      const children = headerRef.current.children;
      gsap.from(children, {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
        },
      });
    }

    // Progress bar animation - fills on scroll
    if (progressFillRef.current && timelineRef.current) {
      gsap.to(progressFillRef.current, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 50%',
          end: 'bottom 50%',
          scrub: 1,
          markers: false, // Set to true for debugging
          invalidateOnRefresh: true,
        },
      });
    }

    // Animate each timeline item
    itemsRef.current.forEach((item) => {
      if (!item) return;

      const line = item.querySelector(`.${styles.timelineLine}`);
      const dot = item.querySelector(`.${styles.timelineDot}`);
      const content = item.querySelector(`.${styles.timelineContent}`);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 75%',
        },
      });

      if (line) {
        tl.to(line, {
          scaleY: 1,
          duration: 0.6,
          ease: 'power3.out',
        });
      }

      if (dot) {
        tl.to(
          dot,
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: 'back.out(2)',
          },
          '-=0.3'
        );
      }

      if (content) {
        const isLeft = item.classList.contains(styles.left);
        tl.to(
          content,
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.2'
        );
      }

      // Pulsing dot animation
      if (dot) {
        gsap.to(dot, {
          boxShadow: '0 0 0 15px rgba(6, 182, 212, 0)',
          duration: 2,
          repeat: -1,
          ease: 'ease-out',
        });
      }
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.experienceSection}>
      <div className={styles.container}>
        {/* Header */}
        <div ref={headerRef} className={styles.header}>
          <h2 className={styles.title}>
            EXPERIENCE & <span style={{ color: 'var(--accent)' }}>EDUCATION</span>
          </h2>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className={styles.timeline}>
          <div className={styles.timelineProgressTrack} />
          <div ref={progressFillRef} className={styles.timelineProgressFill} />

          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className={`${styles.timelineItem} ${index % 2 === 0 ? styles.left : styles.right}`}
            >
              {/* Timeline Marker */}
              <div className={styles.timelineMarker}>
                <div className={styles.timelineLine} />
                <div className={styles.timelineDot} />
              </div>

              {/* Timeline Content */}
              <div className={styles.timelineContent}>
                <div 
                  className={styles.timelineCard}
                  onMouseMove={(e) => handleMouseMove(e, index)}
                >
                  <div 
                    ref={(el) => {
                      glowRefs.current[index] = el;
                    }} 
                    className={styles.cardGlow} 
                  />
                  {/* Card Header */}
                  <div className={styles.cardHeader}>
                    <span className={`${styles.cardType} ${exp.type === 'education' ? styles.education : ''}`}>
                      {exp.type === 'work' ? '💼 WORK' : '🎓 EDUCATION'}
                    </span>
                    <span className={styles.period}>{exp.period}</span>
                  </div>

                  {/* Card Title */}
                  <h3 className={styles.cardTitle}>{exp.title}</h3>

                  {/* Company Info */}
                  <div className={styles.companyInfo}>
                    <p className={styles.company}>{exp.company}</p>
                    <p className={styles.location}>{exp.location}</p>
                  </div>

                  {/* Description */}
                  <p className={styles.description}>{exp.description}</p>

                  {/* Achievements */}
                  <ul className={styles.achievements}>
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>

                  {/* Tech Stack */}
                  {exp.tech && exp.tech.length > 0 && (
                    <div className={styles.techStack}>
                      {exp.tech.map((tech, idx) => (
                        <span key={idx} className={styles.techBadge}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Card Number */}
                  <div className={styles.cardNumber}>{String(exp.id).padStart(2, '0')}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
