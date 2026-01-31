'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaMoon, FaSun } from 'react-icons/fa';

// Navigation links
const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Blog', href: '/blog' },
];

// Dropdown menu items
const MORE_ITEMS = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Spotify', href: '/spotify' },
  { label: 'Feedback', href: '/feedback' },
  { label: 'Snippets', href: '/snippets' },
  { label: 'Social corner', href: '/social-corner' },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const themeInitRef = useRef(false);
  
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownLocked, setIsDropdownLocked] = useState(false);

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
  // NAVBAR ALWAYS VISIBLE (FIXED)
  // ============================================
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrolling = currentScrollY > 50;

      // Set background style only
      setScrolled(isScrolling);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
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

  const openDropdown = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setIsDropdownOpen(true);
  };

  const closeDropdownWithDelay = () => {
    // Only auto-close if not locked by click
    if (isDropdownLocked) return;
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 3000);
  };

  const toggleDropdownLock = () => {
    setIsDropdownLocked((prev) => {
      const newLocked = !prev;
      setIsDropdownOpen(newLocked ? true : false);
      return newLocked;
    });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
        setIsDropdownLocked(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isDropdownOpen]);








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
          {/* Logo - Left Side with Pill Background */}
          <Link
            href="/"
            onClick={scrollToTop}
            className="text-lg md:text-xl font-bold hover:scale-110 active:scale-95 flex-shrink-0 px-4 py-2 rounded-full transition-all"
            style={{
              background: 'rgba(34, 211, 238, 0.1)',
              color: 'var(--accent)',
              letterSpacing: '0.05em',
              transition: 'transform 0.3s ease, background 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(34, 211, 238, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(34, 211, 238, 0.1)';
            }}
          >
            MEHEDI<span style={{ fontSize: '0.75em', verticalAlign: 'super' }}>®</span>
          </Link>

          {/* Desktop Navigation Links - Center (absolute center) with pill background */}
          <div className="hidden lg:flex items-center gap-6 absolute left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full" style={{
            background: 'rgba(34, 211, 238, 0.08)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(34, 211, 238, 0.15)',
          }}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={handleLinkHover}
                onMouseLeave={handleLinkHoverEnd}
                className="relative font-medium text-sm cursor-pointer whitespace-nowrap transition-colors"
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
              </Link>
            ))}

            {/* More Dropdown */}
<div
  ref={dropdownRef}
  className="relative"
  onMouseEnter={openDropdown}
  onMouseLeave={closeDropdownWithDelay}
>
  {/* Trigger Button */}
  <button
    type="button"
    aria-haspopup="true"
    aria-expanded={isDropdownOpen}
    className="relative font-medium text-sm flex items-center gap-1 hover:scale-105 transition-transform whitespace-nowrap"
    style={{
      color: isDropdownOpen ? 'var(--accent)' : 'var(--text)',
      letterSpacing: '0.025em',
      textTransform: 'uppercase',
      transition: 'color 0.3s ease, transform 0.2s ease',
    }}
    onClick={toggleDropdownLock}
    onFocus={openDropdown}
    onBlur={closeDropdownWithDelay}
    onMouseEnter={(e) =>
      gsap.to(e.currentTarget, { color: 'var(--accent)', duration: 0.3 })
    }
    onMouseLeave={(e) => {
      if (!isDropdownOpen) {
        gsap.to(e.currentTarget, { color: 'var(--text)', duration: 0.3 });
      }
    }}
  >
    More
    <span
      aria-hidden
      style={{
        display: 'inline-block',
        transition: 'transform 0.3s ease',
        transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      }}
    >
      ▼
    </span>
  </button>

  {/* Menu */}
  <div
    role="menu"
    onMouseEnter={openDropdown}
    onMouseLeave={closeDropdownWithDelay}
    className="absolute top-full left-0 mt-2 w-48 rounded-lg border"
    style={{
      background: 'var(--bg)',
      borderColor: 'rgba(34, 211, 238, 0.2)',
      opacity: isDropdownOpen ? 1 : 0,
      pointerEvents: isDropdownOpen ? 'auto' : 'none',
      transition: 'opacity 0.3s ease',
      boxShadow: '0 10px 30px rgba(34, 211, 238, 0.15)',
    }}
  >
    {MORE_ITEMS.map((item, idx) => (
      <Link
        key={item.href}
        href={item.href}
        role="menuitem"
        tabIndex={isDropdownOpen ? 0 : -1}
        className="block px-4 py-3 text-sm transition-all duration-300 hover:pl-5 cursor-pointer"
        style={{
          color: 'var(--text)',
          borderBottom:
            idx < MORE_ITEMS.length - 1
              ? '1px solid rgba(34, 211, 238, 0.1)'
              : 'none',
        }}
        onClick={() => {
          // Close dropdown and unlock when clicking a menu item
          setIsDropdownOpen(false);
          setIsDropdownLocked(false);
        }}
        onMouseEnter={(e) =>
          gsap.to(e.currentTarget, {
            background: 'rgba(34, 211, 238, 0.1)',
            color: 'var(--accent)',
            duration: 0.2,
          })
        }
        onMouseLeave={(e) =>
          gsap.to(e.currentTarget, {
            background: 'transparent',
            color: 'var(--text)',
            duration: 0.2,
          })
        }
      >
        {item.label}
      </Link>
    ))}
  </div>
</div>

            {/* Divider */}
            <div style={{ width: '1px', height: '24px', background: 'rgba(34, 211, 238, 0.2)' }} />
            
            {/* Book a Call CTA Button - Inside Pill */}
            <button
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-5 py-1.5 rounded-full font-semibold transition-all duration-300 hover:scale-105 active:scale-95 text-sm whitespace-nowrap"
              style={{
                background: 'var(--accent)',
                color: 'var(--bg)',
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  boxShadow: '0 8px 20px rgba(34, 211, 238, 0.4)',
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
          </div>

          {/* Right Side - Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-3 md:gap-6 flex-shrink-0">

            <button
              data-theme-toggle-btn
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:scale-110 active:scale-95 hidden md:block"
              style={{
                background: 'rgba(34, 211, 238, 0.1)',
                color: 'var(--accent)',
                transition: 'transform 0.3s ease, background 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(34, 211, 238, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(34, 211, 238, 0.1)';
              }}
              aria-label="Toggle theme"
            >
              {isDark ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>

            {/* Theme Toggle on Mobile */}
            <button
              data-theme-toggle-mobile
              onClick={toggleTheme}
              className="p-2 rounded-lg md:hidden"
              style={{
                background: 'rgba(34, 211, 238, 0.1)',
                color: 'var(--accent)',
                transition: 'transform 0.3s ease, background 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(34, 211, 238, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(34, 211, 238, 0.1)';
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
              <Link
                key={link.href}
                href={link.href}
                className="text-2xl font-bold cursor-pointer hover:text-cyan-400 transition-colors"
                style={{
                  color: 'var(--accent)',
                  textTransform: 'uppercase',
                }}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* More Dropdown in Mobile */}
            <div className="space-y-2">
              <button
                className="text-2xl font-bold w-full text-left"
                style={{
                  color: 'var(--accent)',
                  textTransform: 'uppercase',
                  transition: 'color 0.3s ease',
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setIsDropdownOpen(!isDropdownOpen);
                }}
              >
                More
              </button>
              {isDropdownOpen && (
                <div className="pl-4 space-y-2 border-l border-opacity-30" style={{ borderColor: 'var(--accent)' }}>
                  {MORE_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-lg font-semibold block hover:text-cyan-400 cursor-pointer transition-colors duration-300"
                      style={{
                        color: 'var(--text-secondary)',
                      }}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Padding for fixed navbar */}
      <div className="h-16" />
    </>
  );
}
