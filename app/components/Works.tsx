'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
        y: isHovering ? -12 : 0,
        boxShadow: isHovering
          ? '0 20px 50px rgba(34, 211, 238, 0.3)'
          : '0 10px 30px rgba(0, 0, 0, 0.2)',
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ background: 'var(--surface)' }}
    >
      <div className="container">
        {/* Heading */}
        <div className="mb-16">
          <h2 style={{ color: 'var(--text)' }}>Selected Works</h2>
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
          {works.map((work) => (
            <div
              key={work.id}
              data-work-id={work.id}
              className="work-card group relative rounded-2xl overflow-hidden cursor-pointer"
              onMouseEnter={() => handleHover(work.id, true)}
              onMouseLeave={() => handleHover(work.id, false)}
              style={{
                background: 'var(--bg)',
                border: `1px solid var(--accent)`,
                transition: 'all 0.3s ease',
              }}
            >
              {/* Image Placeholder */}
              <div
                className={`bg-gradient-to-br ${work.image} h-48 w-full opacity-90 group-hover:opacity-100 transition-opacity`}
              />

              {/* Content */}
              <div className="p-6">
                <div
                  className="text-sm font-semibold mb-2"
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

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {work.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs rounded-full border"
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
