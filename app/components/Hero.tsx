'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const orbitsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate hero on mount
    const ctx = gsap.context(() => {
      // Split text
      if (!titleRef.current || !descRef.current) return;
      
      const titleText = SplitType.create(titleRef.current, { types: 'chars' });
      const descText = SplitType.create(descRef.current, { types: 'words' });

      // Create timeline
      const tl = gsap.timeline();

      // Stagger animate chars with wave effect
      if (titleText.chars) {
        tl.from(titleText.chars, {
          opacity: 0,
          y: 100,
          rotationX: -90,
          rotationZ: -45,
          duration: 0.9,
          stagger: { amount: 0.6, ease: 'sine.inOut' },
          ease: 'cubic.out',
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

      // Animate CTA with bounce
      if (ctaRef.current) {
        tl.from(
          ctaRef.current,
          {
            opacity: 0,
            y: 40,
            scale: 0.8,
            duration: 0.7,
            ease: 'elastic.out(1, 0.5)',
          },
          0.9
        );
      }

      // Animate orbits
      if (orbitsRef.current) {
        const orbits = orbitsRef.current.querySelectorAll('[data-orbit]');
        orbits.forEach((orbit, i) => {
          gsap.to(orbit, {
            rotation: 360,
            duration: 15 + i * 3,
            repeat: -1,
            ease: 'none',
          });
        });
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
      {/* Animated orbital background */}
      <div
        ref={orbitsRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        {/* Outer orbit */}
        <div
          data-orbit
          className="absolute w-96 h-96 border border-opacity-20 rounded-full"
          style={{ borderColor: 'var(--accent)' }}
        >
          <div
            className="absolute top-0 left-1/2 w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{ background: 'var(--accent)' }}
          />
        </div>

        {/* Mid orbit */}
        <div
          data-orbit
          className="absolute w-64 h-64 border border-opacity-20 rounded-full"
          style={{ borderColor: 'var(--accent)', animationDirection: 'reverse' }}
        >
          <div
            className="absolute bottom-0 right-0 w-2 h-2 rounded-full translate-x-1/2 translate-y-1/2"
            style={{ background: 'var(--accent)', opacity: 0.6 }}
          />
        </div>

        {/* Inner orbit */}
        <div
          data-orbit
          className="absolute w-32 h-32 border border-opacity-30 rounded-full"
          style={{ borderColor: 'var(--accent)' }}
        >
          <div
            className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full translate-x-1/2 -translate-y-1/2"
            style={{ background: 'var(--accent)' }}
          />
        </div>
      </div>

      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-20 animate-pulse"
          style={{
            background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
            filter: 'blur(80px)',
            animation: 'float 8s ease-in-out infinite',
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
            <h1 className="text-5xl md:text-7xl font-bold mb-2 tracking-tighter">Creative Developer</h1>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter" style={{ 
              color: 'var(--accent)',
              background: 'linear-gradient(135deg, var(--accent), #06b6d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>& Motion Designer</h1>
          </div>

          <div
            ref={descRef}
            className="text-lg md:text-xl mb-12 leading-relaxed max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            <p>
              Crafting digital experiences with intentional motion, performance-focused design, and storytelling. Award-nominated for creative work at Awwwards and GSAP Showcase.
            </p>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <button
              ref={ctaRef}
              className="group px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-110 active:scale-95 relative overflow-hidden"
              style={{
                background: 'var(--accent)',
                color: 'var(--bg)',
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  boxShadow: '0 20px 40px rgba(34, 211, 238, 0.4)',
                  duration: 0.3,
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  boxShadow: '0 0px 0px rgba(34, 211, 238, 0)',
                  duration: 0.3,
                });
              }}
            >
              <span className="relative z-10">View My Work</span>
            </button>
            <button
              className="px-8 py-4 rounded-lg font-semibold border-2 transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                borderColor: 'var(--accent)',
                color: 'var(--accent)',
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  background: 'rgba(34, 211, 238, 0.1)',
                  duration: 0.3,
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  background: 'transparent',
                  duration: 0.3,
                });
              }}
            >
              Get in Touch
            </button>
          </div>

          {/* Scroll indicator with animation */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer group" onClick={() => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}>
            <div
              className="w-6 h-10 border-2 rounded-full flex justify-center group-hover:scale-110 transition-transform duration-300"
              style={{ borderColor: 'var(--accent)' }}
            >
              <div
                className="w-1 h-2 rounded-full mt-2"
                style={{ 
                  background: 'var(--accent)',
                  animation: 'bounce 2s infinite',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(20px); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
      `}</style>
    </section>
  );
}
