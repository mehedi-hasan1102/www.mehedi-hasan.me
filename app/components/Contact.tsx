'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import { FiArrowRight } from 'react-icons/fi';
import styles from './contact.module.css';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split heading
      if (headingRef.current) {
        const headingText = SplitType.create(headingRef.current, {
          types: 'words',
        });

        // Animate heading on scroll into view
        if (headingText.words) {
          gsap.from(headingText.words, {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'top 60%',
              scrub: 0.5,
            },
            opacity: 0.2,
            y: 50,
            stagger: 0.1,
          });
        }
      }

      // Hover animation for CTA button
      const button = ctaRef.current;
      if (button) {
        const tl = gsap.timeline({ paused: true });

        const icon = button.querySelector('[data-icon]');
        if (icon) {
          tl.to(icon, {
            x: 5,
            duration: 0.3,
          });

          button.addEventListener('mouseenter', () => tl.play());
          button.addEventListener('mouseleave', () => tl.reverse());

          return () => {
            button.removeEventListener('mouseenter', () => tl.play());
            button.removeEventListener('mouseleave', () => tl.reverse());
          };
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-5"
          style={{
            background: 'var(--accent)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Heading */}
          <div
            ref={headingRef}
            className="mb-8"
            style={{ color: 'var(--text)' }}
          >
            <h2>Let&apos;s Create Something Amazing</h2>
          </div>

          {/* Subheading */}
          <p
            className="text-xl mb-12 leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            I&apos;m always interested in hearing about new projects and opportunities
            to create award-worthy experiences. Feel free to reach out if you
            have something in mind.
          </p>

          {/* Email Link */}
          <div className="mb-12">
            <a
              ref={emailRef}
              href="mailto:contact@example.com"
              className="text-3xl md:text-4xl font-bold hover:underline transition-all"
              style={{ color: 'var(--accent)' }}
            >
              hello@example.com
            </a>
          </div>

          {/* CTA Button */}
          <button
            ref={ctaRef}
            className="px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center gap-3"
            style={{
              background: 'var(--accent)',
              color: 'var(--bg)',
            }}
          >
            Send Me a Message
            <FiArrowRight
              data-icon
              className="transition-transform"
              size={20}
            />
          </button>

          {/* Social Links */}
          <div className="mt-16 pt-16 border-t border-[var(--surface)]">
            <p
              className="text-sm mb-6"
              style={{ color: 'var(--text-secondary)' }}
            >
              Also find me on
            </p>
            <div className="flex gap-6 justify-center">
              {['Twitter', 'LinkedIn', 'GitHub', 'CodePen'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="font-semibold transition-all hover:scale-110"
                  style={{ color: 'var(--accent)' }}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div
            className="mt-16 pt-8 border-t border-[var(--surface)] text-sm"
            style={{ color: 'var(--text-secondary)' }}
          >
            <p>
              © 2026 Mehedi Hasan. Crafted with creativity and GSAP. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
