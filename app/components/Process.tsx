'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  duration: string;
}

const steps: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery & Strategy',
    description:
      'Understanding your vision, goals, and target audience through collaborative workshops and research.',
    duration: '1-2 weeks',
  },
  {
    number: '02',
    title: 'Design & Prototyping',
    description:
      'Creating high-fidelity designs with motion storyboards and interactive prototypes.',
    duration: '2-3 weeks',
  },
  {
    number: '03',
    title: 'Development & Animation',
    description:
      'Building performant, scalable code with smooth GSAP animations and optimal user experience.',
    duration: '3-4 weeks',
  },
  {
    number: '04',
    title: 'Testing & Launch',
    description:
      'Comprehensive testing across devices, performance optimization, and deployment to production.',
    duration: '1-2 weeks',
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      // Create a timeline that syncs with scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
          markers: false,
        },
      });

      // Animate each step
      stepsRef.current.forEach((step, index) => {
        const circle = step.querySelector('[data-circle]');
        const line = step.querySelector('[data-line]');

        // Animate circle
        tl.from(
          circle,
          {
            scale: 0,
            opacity: 0,
          },
          index * 0.5
        );

        // Animate line (except last)
        if (line && index < stepsRef.current.length - 1) {
          tl.from(
            line,
            {
              scaleY: 0,
              opacity: 0,
            },
            index * 0.5 + 0.2
          );
        }

        // Animate content
        tl.from(
          step.querySelector('[data-content]'),
          {
            opacity: 0,
            x: -40,
          },
          index * 0.5 + 0.1
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ background: 'var(--surface)' }}
    >
      <div className="container max-w-3xl">
        {/* Heading */}
        <div className="mb-16">
          <h2 style={{ color: 'var(--text)' }}>My Process</h2>
          <p
            className="text-lg mt-4"
            style={{ color: 'var(--text-secondary)' }}
          >
            A structured approach to delivering award-quality work with clear
            communication and creative excellence.
          </p>
        </div>

        {/* Process Steps */}
        <div ref={containerRef} className="relative">
          {/* Vertical Line */}
          <div
            className="absolute left-8 top-0 bottom-0 w-1"
            style={{
              background: `linear-gradient(180deg, var(--accent), transparent)`,
              opacity: 0.2,
            }}
          />

          {/* Steps */}
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div
                key={step.number}
                ref={(el) => {
                  if (el) stepsRef.current[index] = el;
                }}
                className="relative pl-24"
              >
                {/* Circle Indicator */}
                <div
                  data-circle
                  className="absolute left-0 w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg"
                  style={{
                    background: 'var(--bg)',
                    color: 'var(--accent)',
                    border: `2px solid var(--accent)`,
                    boxShadow: '0 0 20px rgba(34, 211, 238, 0.3)',
                  }}
                >
                  {step.number}
                </div>

                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div
                    data-line
                    className="absolute left-8 top-16 w-1 h-12"
                    style={{
                      background: `linear-gradient(180deg, var(--accent), transparent)`,
                    }}
                  />
                )}

                {/* Content */}
                <div data-content>
                  <h3
                    className="text-2xl font-bold mb-2"
                    style={{ color: 'var(--text)' }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="mb-3 leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {step.description}
                  </p>
                  <div
                    className="text-sm font-semibold"
                    style={{ color: 'var(--accent)' }}
                  >
                    Timeline: {step.duration}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
