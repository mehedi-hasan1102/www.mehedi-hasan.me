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
      id="skills"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Animated background circles */}
      <div className="absolute -top-1/2 -right-1/4 w-96 h-96 rounded-full opacity-5" style={{
        background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
        filter: 'blur(80px)',
      }} />
      <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 rounded-full opacity-5" style={{
        background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
        filter: 'blur(80px)',
      }} />

      <div className="container relative z-10">
        {/* Animated heading */}
        <div className="mb-16 max-w-2xl">
          <h2 className="text-5xl font-bold mb-4" style={{ 
            color: 'var(--text)',
            background: 'linear-gradient(135deg, var(--text) 0%, var(--accent) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Technical Arsenal
          </h2>
          <p
            className="text-lg mt-4"
            style={{ color: 'var(--text-secondary)' }}
          >
            A comprehensive toolkit for building modern, performant, and
            beautifully animated web experiences.
          </p>
          <div className="w-24 h-1 rounded-full mt-4" style={{
            background: 'linear-gradient(90deg, var(--accent), transparent)',
          }} />
        </div>

        {/* Skills by Category */}
        <div ref={containerRef} className="space-y-16">
          {categories.map((category) => (
            <div key={category}>
              <h3
                className="text-lg font-semibold mb-6 uppercase tracking-widest"
                style={{ color: 'var(--accent)' }}
              >
                {category}
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill) => (
                    <div
                      key={skill.name}
                      data-skill
                      className="group p-5 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                      style={{
                        background: 'rgba(34, 211, 238, 0.05)',
                        border: '1px solid rgba(34, 211, 238, 0.1)',
                      }}
                      onMouseEnter={(e) => {
                        gsap.to(e.currentTarget, {
                          background: 'rgba(34, 211, 238, 0.1)',
                          borderColor: 'rgba(34, 211, 238, 0.3)',
                          duration: 0.3,
                        });
                      }}
                      onMouseLeave={(e) => {
                        gsap.to(e.currentTarget, {
                          background: 'rgba(34, 211, 238, 0.05)',
                          borderColor: 'rgba(34, 211, 238, 0.1)',
                          duration: 0.3,
                        });
                      }}
                    >
                      {/* Skill Header */}
                      <div className="flex justify-between items-center mb-3">
                        <span
                          className="font-semibold"
                          style={{ color: 'var(--text)' }}
                        >
                          {skill.name}
                        </span>
                        <span
                          className="text-sm font-bold px-3 py-1 rounded-full"
                          style={{ 
                            background: 'var(--accent)',
                            color: 'var(--bg)',
                          }}
                        >
                          {skill.level}/10
                        </span>
                      </div>

                      {/* Skill Bar with enhanced styling */}
                      <div
                        className="h-3 rounded-full overflow-hidden relative group"
                        style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                      >
                        {/* Background animated gradient */}
                        <div
                          className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity"
                          style={{
                            background: `linear-gradient(90deg, var(--accent), #06b6d4)`,
                            filter: 'blur(2px)',
                          }}
                        />

                        {/* Actual progress bar */}
                        <div
                          data-skill-bar
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            background: `linear-gradient(90deg, var(--accent), #06b6d4)`,
                            width: '0%',
                            boxShadow:
                              '0 0 15px rgba(34, 211, 238, 0.6), inset 0 0 10px rgba(255, 255, 255, 0.2)',
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
