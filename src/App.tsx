import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProjectSections } from './components/ProjectSections';
import { ProjectDetailPage } from './components/ProjectDetailPage';
import { AboutPage } from './components/AboutPage';
import { ContactModal } from './components/ContactModal';
import { SimpleFooter } from './components/SimpleFooter';

import { getProjectBySlug } from './data/projects';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAboutView, setIsAboutView] = useState<boolean>(() => {
    return /^#\/(about|more-about-me)/.test(window.location.hash);
  });
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string | null>(() => {
    const hash = window.location.hash;
    if (/^#\/(about|more-about-me)/.test(hash)) {
      return null;
    }
    const match = hash.match(/^#\/project\/([a-zA-Z0-9-_]+)/);
    if (match) {
      const project = getProjectBySlug(match[1]);
      if (project?.externalUrl) {
        window.location.href = project.externalUrl;
        return null;
      }
      return match[1];
    }
    return null;
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (/^#\/(about|more-about-me)/.test(hash)) {
        setIsAboutView(true);
        setSelectedProjectSlug(null);
        return;
      }

      setIsAboutView(false);
      const match = hash.match(/^#\/project\/([a-zA-Z0-9-_]+)/);
      if (match) {
        const slug = match[1];
        const project = getProjectBySlug(slug);
        if (project?.externalUrl) {
          window.location.href = project.externalUrl;
          return;
        }
        setSelectedProjectSlug(slug);
      } else {
        setSelectedProjectSlug(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenAbout = () => {
    window.location.hash = '#/about';
    setIsAboutView(true);
    setSelectedProjectSlug(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProject = (slug: string) => {
    const project = getProjectBySlug(slug);
    if (project?.externalUrl) {
      window.location.href = project.externalUrl;
      return;
    }
    setIsAboutView(false);
    window.location.hash = `#/project/${slug}`;
    setSelectedProjectSlug(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setIsAboutView(false);
    setSelectedProjectSlug(null);
    window.history.pushState(null, '', window.location.pathname);
  };

  const scrollToProjects = () => {
    if (isAboutView || selectedProjectSlug) {
      handleBackToHome();
      setTimeout(() => {
        const el = document.getElementById('projects');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById('projects');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#e5e0d6] text-[#2e3137] font-sans antialiased selection:bg-[#244287] selection:text-white flex flex-col justify-between">
      {/* Fixed Header across all pages */}
      <Header
        onContactClick={() => setIsContactOpen(true)}
        onProjectsClick={scrollToProjects}
        onHomeClick={handleBackToHome}
        onAboutClick={handleOpenAbout}
      />

      <main className="flex-1">
        {isAboutView ? (
          <AboutPage
            onBack={handleBackToHome}
            onContactClick={() => setIsContactOpen(true)}
          />
        ) : selectedProjectSlug ? (
          <ProjectDetailPage
            slug={selectedProjectSlug}
            onBack={handleBackToHome}
            onContactClick={() => setIsContactOpen(true)}
            onSelectProject={handleSelectProject}
          />
        ) : (
          <>
            {/* Concise Original Format Hero with full logo */}
            <Hero
              onProjectsClick={scrollToProjects}
              onContactClick={() => setIsContactOpen(true)}
              onAboutClick={handleOpenAbout}
            />

            {/* Project Sections with internal navigation */}
            <ProjectSections onSelectProject={handleSelectProject} />
          </>
        )}
      </main>

      {/* Simple Minimalist Footer (omitted on custom case studies which have dedicated credits and action buttons) */}
      {!isAboutView &&
        selectedProjectSlug !== 'forum-jota' &&
        selectedProjectSlug !== 'municipal-elections-2024' &&
        selectedProjectSlug !== 'the-color-of-sin' &&
        selectedProjectSlug !== 'a-cor-do-pecado' && <SimpleFooter />}

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}

