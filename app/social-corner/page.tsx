'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FiGithub, 
  FiLinkedin, 
  FiInstagram, 
  FiYoutube, 
  FiExternalLink,
  FiMessageCircle
} from 'react-icons/fi';
import { SiDribbble, SiX, SiDevdotto, SiCodepen, SiTelegram, SiBluesky, SiMedium } from 'react-icons/si';
import { FaWhatsapp } from 'react-icons/fa';
import styles from './social.module.css';

gsap.registerPlugin(ScrollTrigger);

const SocialCard = ({
  profile,
  index,
}: {
  profile: any;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const Icon = profile.icon;

  useEffect(() => {
    const card = cardRef.current;
    const content = contentRef.current;

    if (!card || !content) return;

    gsap.set(card, { opacity: 0, y: 40, rotateX: -10, scale: 0.9 });
    gsap.set(content, { opacity: 0 });

    ScrollTrigger.create({
      trigger: card,
      start: "top 85%",
      onEnter: () => {
        const tl = gsap.timeline();

        tl.to(card, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        }, 0);

        tl.to(content, {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        }, 0.2);
      },
    });
  }, [index]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(glowRef.current, {
      x: x,
      y: y,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <Link href={profile.url} target="_blank" rel="noopener noreferrer">
      <div
        ref={cardRef}
        className={styles.socialCard}
        onMouseMove={handleMouseMove}
      >
        <div ref={glowRef} className={styles.socialGlow} />
        <span className={styles.socialLinkIcon} aria-hidden="true">
          <FiExternalLink size={18} />
        </span>
        
        {/* Social Icon Background */}
        <div className={styles.socialIconContainer}>
          <div className={styles.socialIconWrapper}>
            <Icon size={48} />
          </div>
        </div>
        
        <div ref={contentRef} className={styles.socialContent}>
          <div className={styles.socialHeader}>
            <span className={styles.socialNumber}>{String(index + 1).padStart(2, "0")}</span>
            <h3 className={styles.socialName}>{profile.name}</h3>
          </div>
          <p className={styles.socialUsername}>{profile.username}</p>
        </div>
        <div className={styles.socialBorder} />
      </div>
    </Link>
  );
};

const SOCIAL_PROFILES = [
  {
    name: 'GitHub',
    username: '@mehedi-hasan1102',
    followers: '2.5K',
    url: 'https://github.com/mehedi-hasan1102',
    icon: FiGithub,
    color: '#ffffff',
    description: 'Check out my open source projects and code repositories'
  },
  {
    name: 'X',
    username: '@mehedihasan1102',
    followers: '5.2K',
    url: 'https://x.com/mehedihasan1102',
    icon: SiX,
    color: '#1DA1F2',
    description: 'Follow me for web development insights and tech tips'
  },
  {
    name: 'LinkedIn',
    username: 'in/mehedi-hasan1102',
    followers: '3.1K',
    url: 'https://www.linkedin.com/in/mehedi-hasan1102',
    icon: FiLinkedin,
    color: '#0A66C2',
    description: 'Connect with me professionally'
  },
  {
    name: 'Instagram',
    username: '@mehedi.hasan1102',
    followers: '8.4K',
    url: 'https://instagram.com/mehedi.hasan1102',
    icon: FiInstagram,
    color: '#E1306C',
    description: 'Follow my design and development journey'
  },
  {
    name: 'YouTube',
    username: '@MehediHasan11023',
    followers: '12K',
    url: 'https://www.youtube.com/@MehediHasan11023',
    icon: FiYoutube,
    color: '#FF0000',
    description: 'Subscribe for programming tutorials and content'
  },
  {
    name: 'Dribble',
    username: '@mehedi-hasan1102',
    followers: '1.8K',
    url: 'https://dribbble.com/mehedi-hasan1102',
    icon: SiDribbble,
    color: '#EA4C89',
    description: 'Explore my design work and creative projects'
  },
  {
    name: 'Dev.to',
    username: 'mehedihasan1102',
    followers: '1.2K',
    url: 'https://dev.to/mehedihasan1102',
    icon: SiDevdotto,
    color: '#0A0A0A',
    description: 'Read my articles about web development'
  },
  {
    name: 'CodePen',
    username: 'mehedihasan1102',
    followers: '500',
    url: 'https://codepen.io/mehedihasan1102',
    icon: SiCodepen,
    color: '#000000',
    description: 'Check out my code pens and experiments'
  },
  {
    name: 'WhatsApp',
    username: '+880 1747 874773',
    followers: 'Chat',
    url: 'https://wa.me/8801747874773',
    icon: FaWhatsapp,
    color: '#25D366',
    description: 'Message me on WhatsApp'
  },
  {
    name: 'Telegram',
    username: '+880 1747 874773',
    followers: 'Chat',
    url: 'https://t.me/+8801747874773',
    icon: SiTelegram,
    color: '#0088cc',
    description: 'Connect with me on Telegram'
  },
  {
    name: 'Bluesky',
    username: 'mehedihasan1102',
    followers: '800',
    url: 'https://bsky.app/profile/mehedihasan1102.bsky.social',
    icon: SiBluesky,
    color: '#1185fe',
    description: 'Follow me on Bluesky'
  },
  {
    name: 'Medium',
    username: '@mehedihasan1102',
    followers: '500',
    url: 'https://medium.com/@mehedihasan1102',
    icon: SiMedium,
    color: '#000000',
    description: 'Read my technical articles and stories'
  },
];

export default function SocialCorner() {
  const containerRef = useRef<HTMLDivElement>(null);

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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className={styles.main}>
      <div ref={containerRef} className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>
            Social <span style={{ color: "var(--accent)" }}>CORNER</span>
          </h1>
        </div>

        {/* Social Cards Grid */}
        <div className={styles.grid}>
          {SOCIAL_PROFILES.map((profile, index) => (
            <SocialCard key={profile.name} profile={profile} index={index} />
          ))}
        </div>

      </div>
    </main>
  );
}
