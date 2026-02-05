'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FiGithub, 
  FiTwitter, 
  FiLinkedin, 
  FiInstagram, 
  FiYoutube, 
  FiExternalLink 
} from 'react-icons/fi';
import { SiDribbble } from 'react-icons/si';
import styles from './social.module.css';

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_PROFILES = [
  {
    name: 'GitHub',
    username: '@mehedi-hasan1102',
    followers: '2.5K',
    url: 'https://github.com/mehedi-hasan1102',
    icon: FiGithub,
    color: '#ffffff',
  },
  {
    name: 'Twitter',
    username: '@mehedihasan1102',
    followers: '5.2K',
    url: 'https://x.com/mehedihasan1102',
    icon: FiTwitter,
    color: '#1DA1F2',
  },
  {
    name: 'LinkedIn',
    username: 'in/mehedi-hasan1102',
    followers: '3.1K',
    url: 'https://www.linkedin.com/in/mehedi-hasan1102',
    icon: FiLinkedin,
    color: '#0A66C2',
  },
  {
    name: 'Instagram',
    username: '@devfolio',
    followers: '8.4K',
    url: 'https://instagram.com/devfolio',
    icon: FiInstagram,
    color: '#E1306C',
  },
  {
    name: 'YouTube',
    username: '@devfolio',
    followers: '12K',
    url: 'https://youtube.com/@devfolio',
    icon: FiYoutube,
    color: '#FF0000',
  },
  {
    name: 'Dribble',
    username: '@devfolio',
    followers: '1.8K',
    url: 'https://dribbble.com/devfolio',
    icon: SiDribbble,
    color: '#EA4C89',
  },
];

export default function SocialCorner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Page entrance animation
    if (containerRef.current) {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: 'power2.out',
      });
    }

    // Card stagger animation
    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 50,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'power2.out',
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleCardMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const glow = card.querySelector('[data-glow]') as HTMLElement;
    if (!glow) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(glow, {
      left: x,
      top: y,
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleCardMouseLeave = (index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const glow = card.querySelector('[data-glow]') as HTMLElement;
    if (!glow) return;

    gsap.to(glow, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <main className={styles.main}>
      <div ref={containerRef} className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Social Corner</h1>
        </div>

        {/* Social Cards Grid */}
        <div className={styles.grid}>
          {SOCIAL_PROFILES.map((profile, index) => {
            const Icon = profile.icon;

            return (
              <div
                key={profile.name}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className={styles.card}
                onMouseMove={(e) => handleCardMouseMove(e, index)}
                onMouseLeave={() => handleCardMouseLeave(index)}
              >
                {/* Glow Effect */}
                <div
                  data-glow
                  className={styles.cardGlow}
                  style={{
                    background: `radial-gradient(circle, ${profile.color}40, transparent 60%)`,
                  }}
                />

                {/* Border Overlay */}
                <div className={styles.cardBorder} />

                {/* Content */}
                <div className={styles.cardContent}>
                  {/* Icon */}
                  <div className={styles.iconWrapper}>
                    <Icon size={32} />
                  </div>

                  {/* Info */}
                  <div className={styles.info}>
                    <h3 className={styles.name}>{profile.name}</h3>
                    <p className={styles.username}>{profile.username}</p>
                  </div>

                  {/* Followers Count */}
                  <div className={styles.followers}>
                    <span className={styles.count}>{profile.followers}</span>
                    <span className={styles.label}>followers</span>
                  </div>

                  {/* Link Button */}
                  <a
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkButton}
                    title={`Visit ${profile.name}`}
                  >
                    <FiExternalLink size={18} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </main>
  );
}
