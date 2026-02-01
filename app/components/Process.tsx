'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './process.module.css';

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
    description:
      'Building full-stack web applications with a focus on clean code, performance, and modern web technologies.',
    achievements: [
      'Developed full-stack applications using React, Next.js, Node.js, and MongoDB',
      'Implemented RESTful APIs and connected frontend with backend services',
      'Optimized application performance and maintained code quality',
    ],
    tech: ['React.js', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'REST APIs', 'Tailwind CSS'],
  },
  {
    id: 2,
    type: 'education',
    title: 'Complete Web Development Course',
    company: 'Programming Hero',
    location: 'Dhaka, Bangladesh',
    period: '6 months',
    description: 'Completed an intensive 6-month web development course, gaining practical skills in programming, front-end and back-end development.',
    achievements: [
      'Built multiple web projects during the course',
      'Learned programming languages such as HTML, CSS, JavaScript, and backend technologies',
      'Enhanced problem-solving and teamwork skills'
    ]
  },
  {
    id: 3,
    type: 'education',
    title: 'Bachelor in Physics',
    company: 'National University',
    location: 'Dhaka, Bangladesh',
    period: 'Expected 2026',
    description: 'Completed a Bachelor\'s degree in Physics, gaining strong analytical thinking, problem-solving, and research skills.',
    achievements: [
      'Graduated with honors',
      'Actively participated in university projects and research',
      'Developed strong teamwork and critical thinking skills',
    ],
  }
];

const TimelineItem = ({
  item,
  index,
}: {
  item: ExperienceItem;
  index: number;
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = itemRef.current;
    const line = lineRef.current;
    const dot = dotRef.current;
    const content = contentRef.current;
    const card = cardRef.current;

    if (!el || !line || !dot || !content) return;

    // Initial states
    gsap.set(line, { scaleY: 0 });
    gsap.set(dot, { scale: 0, opacity: 0 });
    gsap.set(content, { opacity: 0, x: index % 2 === 0 ? -80 : 80 });
    gsap.set(card, { y: 20, opacity: 0 });

    ScrollTrigger.create({
      trigger: el,
      start: 'top 70%',
      onEnter: () => {
        const tl = gsap.timeline();

        // Line animation with color fill
        tl.to(line, {
          scaleY: 1,
          duration: 0.8,
          ease: 'power2.inOut',
          onStart: () => {
            gsap.to(line, {
              backgroundImage: 'linear-gradient(180deg, rgba(6, 182, 212, 1) 0%, rgba(6, 182, 212, 0.5) 100%)',
              duration: 0.8,
              ease: 'power2.inOut',
            });
          },
        }, 0);

        // Dot animation with bounce
        tl.to(
          dot,
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: 'elastic.out(1, 0.5)',
          },
          0.2
        );

        // Content fade and slide
        tl.to(
          content,
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          0.3
        );

        // Card entrance with subtle scale
        tl.to(
          card,
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
          },
          0.35
        );
      },
    });
  }, [index]);

  return (
    <div
      ref={itemRef}
      className={`${styles.timelineItem} ${index % 2 === 0 ? styles.left : styles.right}`}
    >
      {/* Timeline Line & Dot */}
      <div className={styles.timelineMarker}>
        <div ref={lineRef} className={styles.timelineLine} />
        <div ref={dotRef} className={styles.timelineDot}>
          <span className={styles.dotInner} />
          <span className={styles.dotPulse} />
        </div>
      </div>

      {/* Content Card */}
      <div ref={contentRef} className={styles.timelineContent}>
        <div ref={cardRef} className={styles.timelineCard}>
          {/* Card Header */}
          <div className={styles.cardHeader}>
            <span className={`${styles.cardType} ${styles[item.type]}`}>
              {item.type === 'work' ? '💼 WORK' : '🎓 EDUCATION'}
            </span>
            <span className={styles.cardPeriod}>{item.period}</span>
          </div>

          {/* Card Body */}
          <h3 className={styles.cardTitle}>{item.title}</h3>
          <div className={styles.cardCompany}>
            <span className={styles.companyName}>{item.company}</span>
            <span className={styles.companyDivider}>•</span>
            <span className={styles.companyLocation}>{item.location}</span>
          </div>

          <p className={styles.cardDescription}>{item.description}</p>

          {/* Achievements */}
          <ul className={styles.cardAchievements}>
            {item.achievements.map((achievement, i) => (
              <li key={i} className={styles.achievementItem}>
                <span className={styles.achievementArrow}>→</span>
                {achievement}
              </li>
            ))}
          </ul>

          {/* Tech Stack */}
          {item.tech && (
            <div className={styles.cardTech}>
              {item.tech.map((tech) => (
                <span key={tech} className={styles.techBadge}>
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Card Number */}
          <span className={styles.cardNumber}>
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const timeline = timelineRef.current;
    const progress = progressRef.current;

    if (!header) return;

    // Header animation
    gsap.set(header.children, { y: 80, opacity: 0 });

    ScrollTrigger.create({
      trigger: header,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(header.children, {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
        });
      },
    });

    // Progress line animation
    if (progress && timeline) {
      gsap.set(progress, { scaleY: 0 });
      gsap.to(progress, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: timeline,
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: 1,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="work" className={styles.experienceSection}>
      {/* Background Elements */}
      <div className={styles.expBgGradient} />
      <div className={styles.expBgLines} />

      <div className={styles.experienceContainer}>
        {/* Section Header */}
        <div ref={headerRef} className={styles.experienceHeader}>
          <span className={styles.experienceLabel}>MY JOURNEY</span>
          <h2 className={styles.experienceTitle}>
            EXPERIENCE & <span style={{ color: 'var(--accent)' }}>EDUCATION</span>
          </h2>
          <p className={styles.experienceSubtitle}>
            A timeline of my professional growth and academic achievements
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className={styles.timeline}>
          {/* Center Progress Line */}
          <div className={styles.timelineProgressTrack}>
            <div ref={progressRef} className={styles.timelineProgressFill} />
          </div>

          {/* Timeline Items */}
          {experiences.map((item, index) => (
            <TimelineItem key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={styles.experienceCta}>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.downloadResumeBtn}
          >
            <span className={styles.btnIcon}>📄</span>
            <span className={styles.btnText}>DOWNLOAD CV</span>
            <span className={styles.btnArrow}>↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
