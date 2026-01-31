'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const paragraphsRef = useRef<HTMLDivElement[]>([]);

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

      // Animate paragraphs
      paragraphsRef.current.forEach((para, index) => {
        if (para) {
          gsap.from(para, {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `top ${80 + index * 10}%`,
              end: `top ${60 + index * 10}%`,
              scrub: 0.5,
            },
            opacity: 0.3,
            x: -50,
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      <div className="container">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left side - Heading */}
          <div>
            <div
              ref={headingRef}
              style={{ color: 'var(--text)' }}
            >
              <h2>About My Journey</h2>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-6">
            {[
              "I'm a creative developer obsessed with crafting beautiful digital experiences that merge motion design with purposeful interactivity. For the past 5 years, I've been pushing the boundaries of what's possible on the web.",
              "My work focuses on performance-first design, smooth animations, and creating moments of delight. I believe motion should tell stories, not distract from them.",
              "When I'm not designing or coding, I'm exploring new animation techniques, contributing to open-source projects, or writing about web performance and creative development.",
            ].map((text, index) => (
              <p
                key={index}
                ref={(el) => {
                  if (el) paragraphsRef.current[index] = el;
                }}
                className="text-lg leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                {text}
              </p>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-20 pt-20 border-t border-[var(--surface)]">
          {[
            { number: '50+', label: 'Projects Completed' },
            { number: '15+', label: 'Clients Worldwide' },
            { number: '8', label: 'Awards & Recognition' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div
                className="text-4xl font-bold mb-2"
                style={{ color: 'var(--accent)' }}
              >
                {stat.number}
              </div>
              <div style={{ color: 'var(--text-secondary)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
