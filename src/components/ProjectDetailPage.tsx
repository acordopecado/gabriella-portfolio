import React, { useEffect } from 'react';
import { Project, getProjectBySlug } from '../data/projects';
import { ForumJotaPage } from './ForumJotaPage';
import { MunicipalElectionsPage } from './MunicipalElectionsPage';
import { ColorOfSinPage } from './ColorOfSinPage';
import { ArrowLeft, ExternalLink } from 'lucide-react';

interface ProjectDetailPageProps {
  slug: string;
  onBack: () => void;
  onContactClick: () => void;
  onSelectProject: (slug: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  slug,
  onBack,
  onContactClick,
  onSelectProject,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [slug]);

  // Dedicated scrollytelling clone pages for case studies
  if (slug === 'forum-jota') {
    return (
      <ForumJotaPage
        onBack={onBack}
        onContactClick={onContactClick}
        onSelectProject={onSelectProject}
      />
    );
  }

  if (slug === 'municipal-elections-2024') {
    return (
      <MunicipalElectionsPage
        onBack={onBack}
        onContactClick={onContactClick}
        onSelectProject={onSelectProject}
      />
    );
  }

  if (slug === 'the-color-of-sin' || slug === 'a-cor-do-pecado') {
    return (
      <ColorOfSinPage
        onBack={onBack}
        onContactClick={onContactClick}
        onSelectProject={onSelectProject}
      />
    );
  }

  const project = getProjectBySlug(slug);

  if (project?.externalUrl) {
    window.location.href = project.externalUrl;
    return null;
  }

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-[#6c1e17]">Project not found</h2>
        <button
          onClick={onBack}
          className="text-xs font-semibold text-[#6c1e17] underline underline-offset-4 decoration-1 cursor-pointer"
        >
          return to projects
        </button>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-[#e5e0d6] text-[#2e3137] pb-20 animate-in fade-in duration-300">
      {/* Top Navigation */}
      <div className="max-w-4xl mx-auto px-6 pt-6 sm:pt-8 pb-4 flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#6c1e17] underline underline-offset-4 decoration-1 hover:text-[#2e3137] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>back to all projects</span>
        </button>

        <a
          href={project.behanceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#244287] underline underline-offset-4 decoration-1 hover:text-[#19326b] transition-colors"
        >
          <span>view on behance</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Project Header */}
      <header className="max-w-4xl mx-auto px-6 pt-6 pb-8 text-left">
        <div className="flex items-center gap-3 text-xs sm:text-[13px] font-mono mb-2">
          <span className="text-[#2e3137]/65">{project.year}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#6c1e17] mb-4">
          {project.title}
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-[#2e3137]/80 font-normal leading-relaxed max-w-2xl">
          {project.description}
        </p>
      </header>

      {/* Featured High-Res Visual */}
      <div className="max-w-4xl mx-auto px-6 space-y-8">
        <div className="overflow-hidden rounded-[5px] md:rounded-[10px] border border-[#2e3137]/15 bg-[#e5e0d6] shadow-xs">
          <img
            src={project.imageUrl}
            alt={project.title}
            onError={(e) => {
              if (project.localImageUrl && e.currentTarget.src !== project.localImageUrl) {
                e.currentTarget.src = project.localImageUrl;
              }
            }}
            className="w-full h-auto object-cover rounded-[5px] md:rounded-[10px]"
            loading="eager"
          />
        </div>

        {/* Action Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#2e3137]/15">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#6c1e17] underline underline-offset-4 decoration-1 hover:text-[#2e3137] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>back to all projects</span>
          </button>

          <div className="flex items-center gap-6">
            <button
              onClick={onContactClick}
              className="text-xs sm:text-sm font-semibold text-[#2e3137] underline underline-offset-4 decoration-1 hover:text-[#6c1e17] transition-colors cursor-pointer"
            >
              get in touch
            </button>

            <a
              href={project.behanceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#244287] underline underline-offset-4 decoration-1 hover:text-[#172c5b] transition-colors"
            >
              <span>explore on behance</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};
