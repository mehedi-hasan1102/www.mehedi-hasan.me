'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Animate hero on mount
    const ctx = gsap.context(() => {
      // Split text
      if (!titleRef.current || !descRef.current) return;
      
      const titleText = SplitType.create(titleRef.current, { types: 'chars' });
      const descText = SplitType.create(descRef.current, { types: 'words' });

      // Create timeline
      const tl = gsap.timeline();

      // Stagger animate chars
      if (titleText.chars) {
        tl.from(titleText.chars, {
          opacity: 0,
          y: 100,
          rotationX: -90,
          duration: 0.8,
          stagger: { amount: 0.5 },
          ease: 'expo.out',
        }, 0);
      }

      // Animate description words
      if (descText.words) {
        tl.from(
          descText.words,
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
            stagger: 0.05,
            ease: 'power2.out',
          },
          0.4
        );
      }

      // Animate CTA
      if (ctaRef.current) {
        tl.from(
          ctaRef.current,
          {
            opacity: 0,
            y: 30,
            scale: 0.9,
            duration: 0.6,
            ease: 'back.out',
          },
          0.8
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10"
          style={{
            background: 'var(--accent)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-10"
          style={{
            background: 'var(--accent-secondary)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div
            ref={titleRef}
            className="mb-8"
            style={{ color: 'var(--text)' }}
          >
            <h1>Creative Developer</h1>
            <h1 style={{ color: 'var(--accent)' }}>& Motion Designer</h1>
          </div>

          <div
            ref={descRef}
            className="text-lg md:text-xl mb-12 leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            <p>
              Crafting digital experiences with intentional motion, performance-focused design, and storytelling. Award-nominated for creative work at Awwwards and GSAP Showcase.
            </p>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <button
              ref={ctaRef}
              className="px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: 'var(--accent)',
                color: 'var(--bg)',
              }}
            >
              View My Work
            </button>
            <button
              className="px-8 py-3 rounded-lg font-semibold border-2 transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                borderColor: 'var(--accent)',
                color: 'var(--accent)',
              }}
            >
              Get in Touch
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
            <div
              className="w-6 h-10 border-2 rounded-full flex justify-center"
              style={{ borderColor: 'var(--accent)' }}
            >
              <div
                className="w-1 h-2 rounded-full mt-2 animate-pulse"
                style={{ background: 'var(--accent)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
