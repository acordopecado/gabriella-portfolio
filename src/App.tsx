import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProjectSections } from './components/ProjectSections';
import { ProjectDetailPage } from './components/ProjectDetailPage';
import { ContactModal } from './components/ContactModal';
import { SimpleFooter } from './components/SimpleFooter';

import { getProjectBySlug } from './data/projects';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string | null>(() => {
    const hash = window.location.hash;
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

  const handleSelectProject = (slug: string) => {
    const project = getProjectBySlug(slug);
    if (project?.externalUrl) {
      window.location.href = project.externalUrl;
      return;
    }
    window.location.hash = `#/project/${slug}`;
    setSelectedProjectSlug(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setSelectedProjectSlug(null);
    window.history.pushState(null, '', window.location.pathname);
  };

  const scrollToProjects = () => {
    if (selectedProjectSlug) {
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
      />

      <main className="flex-1">
        {selectedProjectSlug ? (
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
            />

            {/* 2 Project Sections with internal navigation */}
            <ProjectSections onSelectProject={handleSelectProject} />
          </>
        )}
      </main>

      {/* Simple Minimalist Footer */}
      {selectedProjectSlug !== 'forum-jota' &&
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
