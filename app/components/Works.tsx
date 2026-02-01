'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './works.module.css';

gsap.registerPlugin(ScrollTrigger);

interface Work {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
}

const works: Work[] = [
  {
    id: 1,
    title: 'Digital Canvas',
    category: 'Web Design',
    description: 'Interactive art gallery with GSAP animations and smooth scrolling',
    image: 'from-cyan-400 to-blue-500',
    tags: ['GSAP', 'ScrollTrigger', 'React'],
  },
  {
    id: 2,
    title: 'Motion Studio',
    category: 'Animation',
    description: 'Full-stack animation framework for modern web applications',
    image: 'from-purple-400 to-pink-500',
    tags: ['GSAP', 'TypeScript', 'Performance'],
  },
  {
    id: 3,
    title: 'Creative Agency',
    category: 'Development',
    description: 'Award-nominated agency portfolio with cinematic transitions',
    image: 'from-orange-400 to-red-500',
    tags: ['Next.js', 'Tailwind', 'GSAP'],
  },
];

export default function Works() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.work-card') as Element[];

      cards.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            end: 'top 70%',
            scrub: 0.5,
          },
          opacity: 0,
          y: 60,
          x: index % 2 === 0 ? -40 : 40,
          rotationY: index % 2 === 0 ? 10 : -10,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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

  return (
    <section
      id="works"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ background: 'var(--surface)' }}
    >
      <div className="container">
        {/* Animated heading */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ 
            color: 'var(--text)',
            background: 'linear-gradient(135deg, var(--text) 0%, var(--accent) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Selected Works
          </h2>
          <p
            className="text-lg mt-4 max-w-2xl"
            style={{ color: 'var(--text-secondary)' }}
          >
            Projects that showcase creative thinking, technical expertise, and
            attention to motion design details.
          </p>
        </div>

        {/* Works Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {works.map((work, idx) => (
            <div
              key={work.id}
              data-work-id={work.id}
              className="work-card group relative rounded-2xl overflow-hidden cursor-pointer perspective"
              onMouseEnter={() => handleHover(work.id, true)}
              onMouseLeave={() => handleHover(work.id, false)}
              style={{
                background: 'var(--bg)',
                border: `1px solid rgba(34, 211, 238, 0.3)`,
                transition: 'all 0.3s ease',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Animated border glow */}
              {hoveredId === work.id && (
                <div
                  className="absolute inset-0 rounded-2xl opacity-0"
                  style={{
                    background: `linear-gradient(135deg, transparent, rgba(34, 211, 238, 0.2), transparent)`,
                    animation: 'shimmer 1.5s infinite',
                  }}
                />
              )}

              {/* Image Placeholder with zoom effect */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-700 to-slate-900">
                <div
                  data-work-image
                  className={`bg-linear-to-br ${work.image} h-full w-full opacity-80 group-hover:opacity-100`}
                  style={{
                    background: `linear-gradient(135deg, var(--accent), #06b6d4)`,
                  }}
                />
                {/* Index badge */}
                <div
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs"
                  style={{
                    background: 'var(--accent)',
                    color: 'var(--bg)',
                  }}
                >
                  {(idx + 1).toString().padStart(2, '0')}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 relative z-10">
                <div
                  className="text-sm font-semibold mb-2 uppercase tracking-widest"
                  style={{ color: 'var(--accent)' }}
                >
                  {work.category}
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: 'var(--text)' }}
                >
                  {work.title}
                </h3>
                <p
                  className="text-sm mb-4 line-clamp-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {work.description}
                </p>

                {/* Tags with animation */}
                <div className="flex flex-wrap gap-2">
                  {work.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs rounded-full border transition-all duration-300"
                      style={{
                        borderColor: 'var(--accent)',
                        color:
                          hoveredId === work.id
                            ? 'var(--bg)'
                            : 'var(--accent)',
                        background:
                          hoveredId === work.id ? 'var(--accent)' : 'transparent',
                        transition: 'all 0.3s ease',
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
