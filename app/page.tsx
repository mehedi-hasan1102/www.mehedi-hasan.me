'use client';

import SmoothScroll from './components/SmoothScroll';
import Hero from './components/Hero';
import About from './components/About';
import Works from './components/Works';
import Skills from './components/Skills';
import Process from './components/Process';
import Contact from './components/Contact';

export default function Home() {
  return (
    <SmoothScroll>
      <main>
        <Hero />
        <About />
        <Works />
        <Skills />
        <Process />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
