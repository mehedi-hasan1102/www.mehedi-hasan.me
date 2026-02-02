'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tech: string[];
  liveUrl: string;
  frontendUrl: string;
  backendUrl: string;
  year: string;
  challenges?: string[];
  futurePlans?: string[];
}

export default function ProjectDetails() {
  const params = useParams();
  const router = useRouter();
  const pageRef = useRef<HTMLDivElement>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch('/data/projects.json');
        const projects = await response.json();
        const foundProject = projects.find((p: Project) => p.slug === params.slug);
        
        if (foundProject) {
          setProject(foundProject);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Error loading project:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [params.slug]);

  // GSAP animations
  useEffect(() => {
    if (!project || !pageRef.current) return;

    const ctx = gsap.context(() => {
      // Animate hero section
      gsap.from('[data-animate-hero]', {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
      });

      // Animate sections on scroll
      const sections = gsap.utils.toArray('[data-section]') as Element[];
      sections.forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 60%',
            scrub: 0.5,
          },
          opacity: 0,
          y: 40,
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, [project]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <p style={{ color: 'var(--text)' }}>Loading project...</p>
      </div>
    );
  }

  if (notFound || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: 'var(--bg)' }}>
        <h1 style={{ color: 'var(--text)' }} className="text-4xl font-bold mb-4">
          Project Not Found
        </h1>
        <p style={{ color: 'var(--text-secondary)' }} className="mb-8">
          The project you&#39;re looking for doesn&#39;t exist.
        </p>
        <Link
          href="#works"
          className="px-6 py-3 rounded-lg font-semibold transition-all"
          style={{
            background: 'linear-gradient(135deg, var(--accent), #7c3aed)',
            color: 'white',
          }}
        >
          Back to Works
        </Link>
      </div>
    );
  }

  return (
    <div ref={pageRef} className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-20 md:py-32"
        style={{
          background: `linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(6, 182, 212, 0.05))`,
        }}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl">
            {/* Breadcrumb */}
            <div data-animate-hero className="flex items-center gap-2 mb-8">
              <button
                onClick={() => router.back()}
                className="text-sm font-semibold"
                style={{ color: 'var(--accent)' }}
              >
                ← Back
              </button>
              <span style={{ color: 'var(--text-secondary)' }}>/</span>
              <span style={{ color: 'var(--text-secondary)' }} className="text-sm">
                {project.category}
              </span>
            </div>

            {/* Title and Description */}
            <h1
              data-animate-hero
              className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
              style={{
                color: 'var(--text)',
              }}
            >
              {project.title}
            </h1>

            <p
              data-animate-hero
              className="text-lg md:text-xl mb-8 max-w-2xl"
              style={{ color: 'var(--text-secondary)' }}
            >
              {project.description}
            </p>

            {/* CTA Buttons */}
            <div data-animate-hero className="flex flex-wrap gap-4">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105"
                style={{
                  background: 'var(--accent)',
                  color: 'var(--bg)',
                }}
              >
                View Live Project 🚀
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg font-semibold transition-all border hover:scale-105"
                style={{
                  borderColor: 'var(--accent)',
                  color: 'var(--accent)',
                }}
              >
                View Source Code 💻
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Project Image Section */}
      <section className="py-16 md:py-24 border-b" style={{ borderColor: 'rgba(6, 182, 212, 0.1)' }}>
        <div className="container mx-auto px-4 md:px-6">
          <div 
            className="rounded-xl overflow-hidden border"
            style={{ borderColor: 'rgba(6, 182, 212, 0.2)' }}
          >
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-auto object-cover"
              style={{ maxHeight: '500px', objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* Full Description */}
      <section data-section className="py-16 md:py-24 border-b" style={{ borderColor: 'rgba(34, 211, 238, 0.1)' }}>
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--text)' }}>
            About This Project
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {project.description}
          </p>
        </div>
      </section>

      {/* Technologies */}
      <section data-section className="py-16 md:py-24 border-b" style={{ borderColor: 'rgba(34, 211, 238, 0.1)' }}>
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h2
            className="text-3xl md:text-4xl font-bold mb-12"
            style={{ color: 'var(--text)' }}
          >
            Technologies Used
          </h2>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-lg text-sm font-medium"
                style={{
                  background: 'rgba(6, 182, 212, 0.1)',
                  color: 'var(--accent)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges & Future Plans */}
      <section data-section className="py-16 md:py-24 border-b" style={{ borderColor: 'rgba(34, 211, 238, 0.1)' }}>
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12" style={{ color: 'var(--text)' }}>
            Challenges & Future Plans
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Challenges */}
            <div>
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2" style={{ color: 'var(--accent)' }}>
                <span>🔴</span> Challenges
              </h3>
              <ul className="space-y-3">
                {project.challenges && project.challenges.map((challenge, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span style={{ color: 'var(--accent)' }} className="flex-shrink-0 mt-1">
                      ●
                    </span>
                    <span style={{ color: 'var(--text-secondary)' }}>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Future Plans */}
            <div>
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2" style={{ color: 'var(--accent)' }}>
                <span>🟢</span> Future Plans
              </h3>
              <ul className="space-y-3">
                {project.futurePlans && project.futurePlans.map((plan, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span style={{ color: 'var(--accent)' }} className="flex-shrink-0 mt-1">
                      ✓
                    </span>
                    <span style={{ color: 'var(--text-secondary)' }}>{plan}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section data-section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--text)' }}>
            View This Project
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105"
              style={{
                background: 'var(--accent)',
                color: 'var(--bg)',
              }}
            >
              View Live Project 🚀
            </a>
            {project.frontendUrl && (
              <a
                href={project.frontendUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-lg font-semibold transition-all border"
                style={{
                  borderColor: 'var(--accent)',
                  color: 'var(--accent)',
                }}
              >
                Frontend Code 💻
              </a>
            )}
            {project.backendUrl && (
              <a
                href={project.backendUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-lg font-semibold transition-all border"
                style={{
                  borderColor: 'var(--accent)',
                  color: 'var(--accent)',
                }}
              >
                Backend Code 🔧
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
