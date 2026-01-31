'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  level: number; // 1-10
  category: 'Frontend' | 'Animation' | 'Tools';
}

const skills: Skill[] = [
  // Frontend
  { name: 'React', level: 9, category: 'Frontend' },
  { name: 'Next.js', level: 9, category: 'Frontend' },
  { name: 'TypeScript', level: 8, category: 'Frontend' },
  { name: 'Tailwind CSS', level: 9, category: 'Frontend' },
  // Animation
  { name: 'GSAP', level: 10, category: 'Animation' },
  { name: 'ScrollTrigger', level: 10, category: 'Animation' },
  { name: 'Three.js', level: 7, category: 'Animation' },
  { name: 'WebGL', level: 6, category: 'Animation' },
  // Tools
  { name: 'Figma', level: 8, category: 'Tools' },
  { name: 'Git', level: 9, category: 'Tools' },
  { name: 'Performance', level: 8, category: 'Tools' },
  { name: 'Node.js', level: 7, category: 'Tools' },
];

const categories = ['Frontend', 'Animation', 'Tools'] as const;

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate skill items
      const items = gsap.utils.toArray('[data-skill]') as Element[];

      items.forEach((item, index) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            end: 'top 70%',
            scrub: 0.5,
          },
          opacity: 0,
          scale: 0.8,
          y: 30,
          stagger: 0.1,
        });

        // Animate inner bar on scroll
        const bar = item.querySelector('[data-skill-bar]');
        if (bar) {
          gsap.to(bar, {
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              end: 'top 60%',
              scrub: 1,
            },
            width: `${(skills[index].level / 10) * 100}%`,
            ease: 'power2.out',
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
        {/* Heading */}
        <div className="mb-16 max-w-2xl">
          <h2 style={{ color: 'var(--text)' }}>Technical Arsenal</h2>
          <p
            className="text-lg mt-4"
            style={{ color: 'var(--text-secondary)' }}
          >
            A comprehensive toolkit for building modern, performant, and
            beautifully animated web experiences.
          </p>
        </div>

        {/* Skills by Category */}
        <div ref={containerRef} className="space-y-12">
          {categories.map((category) => (
            <div key={category}>
              <h3
                className="text-lg font-semibold mb-6"
                style={{ color: 'var(--accent)' }}
              >
                {category}
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill, idx) => (
                    <div
                      key={skill.name}
                      data-skill
                      className="group"
                    >
                      {/* Skill Header */}
                      <div className="flex justify-between items-center mb-3">
                        <span
                          className="font-medium"
                          style={{ color: 'var(--text)' }}
                        >
                          {skill.name}
                        </span>
                        <span
                          className="text-sm font-semibold"
                          style={{ color: 'var(--accent)' }}
                        >
                          {skill.level}/10
                        </span>
                      </div>

                      {/* Skill Bar */}
                      <div
                        className="h-2 rounded-full overflow-hidden relative"
                        style={{ background: 'var(--surface)' }}
                      >
                        {/* Background animated gradient */}
                        <div
                          className="absolute inset-0 opacity-20"
                          style={{
                            background: `linear-gradient(90deg, var(--accent), var(--accent-secondary))`,
                            filter: 'blur(4px)',
                          }}
                        />

                        {/* Actual progress bar */}
                        <div
                          data-skill-bar
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            background: `linear-gradient(90deg, var(--accent), var(--accent-secondary))`,
                            width: '0%',
                            boxShadow:
                              '0 0 20px rgba(34, 211, 238, 0.5)',
                          }}
                        />
                      </div>

                      {/* Dot indicator */}
                      <div
                        className="mt-3 flex gap-1"
                        style={{
                          opacity: 0.6,
                        }}
                      >
                        {Array.from({ length: 10 }).map((_, i) => (
                          <div
                            key={i}
                            className="w-2 h-2 rounded-full transition-all"
                            style={{
                              background:
                                i < skill.level
                                  ? 'var(--accent)'
                                  : 'var(--surface)',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
