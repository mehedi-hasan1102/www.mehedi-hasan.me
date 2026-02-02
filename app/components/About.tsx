'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import styles from './about.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const paragraphsRef = useRef<HTMLDivElement[]>([]);
  const profileImageRef = useRef<HTMLDivElement>(null);
  const profileBorderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split heading
      if (headingRef.current) {
        const headingText = SplitType.create(headingRef.current, {
          types: 'words',
        });

        // Animate heading
        gsap.from(headingText.words, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 60%',
            scrub: 0.5,
          },
          opacity: 0.2,
          y: 40,
          stagger: 0.1,
        });
      }

      // Animate paragraphs with parallax
      paragraphsRef.current.forEach((para, index) => {
        if (para) {
          gsap.from(para, {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `top ${80 + index * 10}%`,
              end: `top ${60 + index * 10}%`,
              scrub: 1,
            },
            opacity: 0.3,
            x: -50,
          });
        }
      });

      // Profile image hover animation
      if (profileImageRef.current && profileBorderRef.current) {
        const profileImage = profileImageRef.current;
        const profileBorder = profileBorderRef.current;

        // Mouse enter animation
        const handleMouseEnter = () => {
          // Image scale
          gsap.to(profileImage, {
            scale: 1.08,
            duration: 0.5,
            ease: 'power2.out',
          });

          // Border animation with glow
          gsap.to(profileBorder, {
            top: '0.5rem',
            left: '0.5rem',
            right: '-0.5rem',
            bottom: '-0.5rem',
            borderWidth: '3px',
            duration: 0.5,
            ease: 'power2.out',
          });
        };

        // Mouse leave animation
        const handleMouseLeave = () => {
          // Reset image
          gsap.to(profileImage, {
            scale: 1,
            duration: 0.5,
            ease: 'power2.out',
          });

          // Reset border
          gsap.to(profileBorder, {
            top: '1.5rem',
            left: '1.5rem',
            right: '-1.5rem',
            bottom: '-1.5rem',
            borderWidth: '2px',
            duration: 0.5,
            ease: 'power2.out',
          });
        };

        profileImage.addEventListener('mouseenter', handleMouseEnter);
        profileImage.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          profileImage.removeEventListener('mouseenter', handleMouseEnter);
          profileImage.removeEventListener('mouseleave', handleMouseLeave);
        };
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Decorative elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-10" style={{
        background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }} />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-10" style={{
        background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }} />

      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left side - Profile Image */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-80 h-96">
              <div 
                ref={profileImageRef}
                className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
              >
                <Image
                  src="/profile/profile - blue.png"
                  alt="Profile"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Animated border element */}
              <div ref={profileBorderRef} className={styles.profileImageBorder} />
            </div>
          </div>

          {/* Right side - Content with enhanced typography */}
          <div className="space-y-6">
            <div
              ref={headingRef}
              style={{ color: 'var(--text)' }}
            >
              <h2 className={styles.aboutHeading}>About <span style={{ color: 'var(--accent)' }}>Me</span></h2>
            </div>
            <div
              ref={(el) => {
                if (el) paragraphsRef.current[0] = el;
              }}
              className="text-lg leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              <p>
                I am a{' '}
                <span 
                  style={{ 
                    background: 'var(--accent)',
                    color: 'var(--bg)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '0.25rem',
                    fontWeight: '600',
                  }}
                >
                  MERN Stack Developer
                </span>
                {' '}from{' '}
                <span 
                  style={{ 
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '0.25rem',
                    fontWeight: '600',
                  }}
                >
                  Bangladesh
                </span>
                {' '}with 2 years of programming experience, building personal and practice-based web applications using modern JavaScript technologies
              </p>
            </div>
            {[
              "I focus on clean code, performance, and modern web technologies across the full stack.",
              "I also write technical blogs and speak at developer meetups, continuously learning and growing as a developer.",
            ].map((text, index) => (
              <div
                key={index + 1}
                ref={(el) => {
                  if (el) paragraphsRef.current[index + 1] = el;
                }}
                className="text-lg leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
