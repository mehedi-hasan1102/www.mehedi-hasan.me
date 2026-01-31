'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaMoon, FaSun } from 'react-icons/fa';

// Navigation links
const NAV_LINKS = [
  { label: 'Work', href: '#works' },
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const themeInitRef = useRef(false);
  
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // ============================================
  // THEME TOGGLE EFFECT
  // ============================================
  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    // Animate theme toggle button
    const button = document.querySelector('[data-theme-toggle-btn]');
    if (button) {
      gsap.to(button, {
        rotation: 360,
        duration: 0.6,
        ease: 'expo.out',
      });
    }

    // Update HTML class
    if (newIsDark) {
      document.documentElement.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    }
  };

  // ============================================
  // NAVBAR HIDE/SHOW ON SCROLL
  // ============================================
  useEffect(() => {
    let lastScrollY = 0;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrolling = currentScrollY > 50;

      // Set background style
      setScrolled(isScrolling);

      // Hide/Show nav on scroll direction
      if (navRef.current) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down - hide
          gsap.to(navRef.current, {
            y: -100,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.inOut',
          });
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up - show
          gsap.to(navRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.3,
            ease: 'power2.inOut',
          });
        }
      }

      lastScrollY = currentScrollY;

      // Clear timeout if scrolling
      clearTimeout(scrollTimeout);

      // Auto-show after user stops scrolling
      scrollTimeout = setTimeout(() => {
        if (navRef.current) {
          gsap.to(navRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.3,
            ease: 'power2.inOut',
          });
        }
      }, 1000);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // ============================================
  // INITIAL ANIMATION
  // ============================================
  useEffect(() => {
    // Animate navbar on mount
    if (navRef.current) {
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: 'expo.out',
      });
    }
  }, []);

  // ============================================
  // LOAD SAVED THEME (without setState)
  // ============================================
  useLayoutEffect(() => {
    if (themeInitRef.current) return;
    themeInitRef.current = true;

    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsDark(false);
      document.documentElement.classList.add('light-mode');
    } else if (saved === 'dark') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsDark(true);
      document.documentElement.classList.remove('light-mode');
    }
  }, []);

  // ============================================
  // MOBILE MENU ANIMATION
  // ============================================
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (isOpen) {
      // Show menu
      gsap.to(mobileMenuRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.3,
        ease: 'power2.out',
      });

      // Stagger animate menu links
      const links = mobileMenuRef.current.querySelectorAll('[data-menu-link]');
      gsap.from(links, {
        opacity: 0,
        y: 20,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power2.out',
        delay: 0.1,
      });
    } else {
      // Hide menu
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.2,
        ease: 'power2.inOut',
      });
    }
  }, [isOpen]);

  // ============================================
  // LINK HOVER EFFECT
  // ============================================
  const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const link = e.currentTarget;
    const underline = link.querySelector('[data-underline]');

    gsap.to(link, {
      y: -4,
      duration: 0.3,
      ease: 'power2.out',
    });

    if (underline) {
      gsap.to(underline, {
        scaleX: 1,
        duration: 0.4,
        ease: 'power2.out',
        transformOrigin: 'left',
      });
    }
  };

  const handleLinkHoverEnd = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const link = e.currentTarget;
    const underline = link.querySelector('[data-underline]');

    gsap.to(link, {
      y: 0,
      duration: 0.3,
      ease: 'power2.out',
    });

    if (underline) {
      gsap.to(underline, {
        scaleX: 0,
        duration: 0.3,
        ease: 'power2.out',
        transformOrigin: 'left',
      });
    }
  };

  // ============================================
  // HANDLE NAVIGATION CLICK
  // ============================================
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // ============================================
  // LOGO SCROLL TO TOP
  // ============================================
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Main Navbar */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-40 h-16"
        style={{
          transition: 'all 0.3s ease',
        }}
      >
        <div className="container h-full flex items-center justify-between px-4 md:px-6">
          {/* Logo - Left Side */}
          <Link
            href="/"
            onClick={scrollToTop}
            className="text-lg md:text-xl font-bold hover:scale-110 active:scale-95"
            style={{
              color: 'var(--accent)',
              letterSpacing: '0.05em',
              transition: 'transform 0.3s ease',
            }}
          >
            MEHEDI<span style={{ fontSize: '0.75em', verticalAlign: 'super' }}>®</span>
          </Link>

          {/* Desktop Navigation Links - Center */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                onMouseEnter={handleLinkHover}
                onMouseLeave={handleLinkHoverEnd}
                className="relative font-medium text-sm"
                style={{
                  color: 'var(--text)',
                  letterSpacing: '0.025em',
                  textTransform: 'uppercase',
                  transition: 'color 0.3s ease',
                }}
              >
                {link.label}
                {/* Underline that grows from left */}
                <span
                  data-underline
                  className="absolute bottom-0 left-0 w-full h-0.5 origin-left"
                  style={{
                    background: 'var(--accent)',
                    transform: 'scaleX(0)',
                    transition: 'transform 0.4s ease',
                  }}
                />
              </a>
            ))}
          </div>

          {/* Right Side - Book a Call, Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-3 md:gap-6">
            {/* Book a Call CTA Button */}
            <button
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-3 md:px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95 text-xs md:text-sm"
              style={{
                background: 'var(--accent)',
                color: 'var(--bg)',
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  boxShadow: '0 15px 35px rgba(34, 211, 238, 0.3)',
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
              Book a Call
            </button>

            {/* Theme Toggle Button */}
            <button
              data-theme-toggle-btn
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:scale-110 active:scale-95"
              style={{
                background: 'rgba(34, 211, 238, 0.1)',
                color: 'var(--accent)',
                transition: 'transform 0.3s ease',
              }}
              aria-label="Toggle theme"
            >
              {isDark ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg"
              style={{
                background: 'rgba(34, 211, 238, 0.1)',
                color: 'var(--accent)',
                transition: 'all 0.3s ease',
              }}
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {/* <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-30 lg:hidden"
        style={{
          background: 'rgba(11, 14, 15, 0.98)',
          backdropFilter: 'blur(10px)',
          paddingTop: '80px',
          opacity: 0,
          pointerEvents: 'none',
          transition: 'opacity 0.3s ease',
        }}
        onClick={() => setIsOpen(false)}
      > */}

      <div
  ref={mobileMenuRef}
  className="fixed inset-0 z-30 lg:hidden bg-black/5 backdrop-blur-3xl pt-[80px] opacity-0 pointer-events-none transition-opacity"
  onClick={() => setIsOpen(false)}
>

        {/* Menu Content */}
        <div className="container px-4 md:px-6" onClick={(e) => e.stopPropagation()}>
          <div className="flex flex-col gap-6">
            {/* Navigation Links */}
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                data-menu-link
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-2xl font-bold"
                style={{
                  color: 'var(--accent)',
                  textTransform: 'uppercase',
                  transition: 'color 0.3s ease',
                }}
              >
                {link.label}
              </a>
            ))}

            {/* Divider */}
            {/* <div
              className="my-6 h-px w-full"
              style={{ background: 'rgba(34, 211, 238, 0.2)' }}
            /> */}

            {/* Contact CTA */}
            {/* <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              data-menu-link
              className="px-6 py-3 rounded-lg font-semibold text-center hover:scale-105 active:scale-95"
              style={{
                background: 'var(--accent)',
                color: 'var(--bg)',
                transition: 'transform 0.3s ease',
              }}
            >
              Get in Touch
            </a> */}
          </div>
        </div>
      </div>

      {/* Padding for fixed navbar */}
      <div className="h-16" />
    </>
  );
}
