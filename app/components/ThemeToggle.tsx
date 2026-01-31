'use client';

import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import gsap from 'gsap';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check if theme is stored in localStorage
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (stored === 'light') {
      setIsDark(false);
      document.documentElement.classList.add('light-mode');
    } else if (stored === 'dark') {
      setIsDark(true);
      document.documentElement.classList.remove('light-mode');
    } else {
      // Use system preference
      setIsDark(prefersDark);
      if (!prefersDark) {
        document.documentElement.classList.add('light-mode');
      }
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    // Animate the toggle
    const button = document.querySelector('[data-theme-toggle]');
    if (button) {
      gsap.to(button, {
        rotation: 360,
        duration: 0.6,
        ease: 'expo.out',
      });
    }

    // Toggle class on html element
    if (newIsDark) {
      document.documentElement.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      data-theme-toggle
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 p-3 rounded-full bg-[var(--surface)] border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-colors duration-300"
      aria-label="Toggle theme"
    >
      {isDark ? <FaSun size={20} /> : <FaMoon size={20} />}
    </button>
  );
}
