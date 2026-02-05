'use client';

import SmoothScroll from './components/SmoothScroll';
import Hero from './components/Hero';
import WhatIDo from './components/WhatIDo';
import Projects from './components/Projects';
import Skills from './components/Skills';
import DiagonalMarquee from './components/DiagonalMarquee';

export default function Home() {
  return (
    <SmoothScroll>
      <main>
        <Hero />
        <DiagonalMarquee />
        <WhatIDo />
        <Projects />
        <Skills />
      </main>
    </SmoothScroll>
  );
}
