import React from 'react';
import { EDITORIAL_PROJECTS, BRANDING_PROJECTS } from '../data/projects';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface ProjectSectionsProps {
  onSelectProject: (slug: string) => void;
}

export const ProjectSections: React.FC<ProjectSectionsProps> = ({ onSelectProject }) => {
  return (
    <div id="projects" className="pt-4 pb-12 sm:pt-4 sm:pb-16 md:pt-8 max-w-5xl mx-auto px-6 space-y-14 sm:space-y-16">
      {/* SECTION 1: editorial design and infographics */}
      <section>
        <div className="pb-1 mb-6">
          <h2 className="text-xs sm:text-sm font-bold tracking-wider text-[#6c1e17] lowercase">
            editorial design and infographics
          </h2>
        </div>

        {/* 2-Column Grid with rounded image corners (10px desktop, 5px mobile), year tag, title and description below */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-8 sm:gap-y-10">
          {EDITORIAL_PROJECTS.map((project) => (
            <a
              key={project.id}
              href={project.externalUrl || `#/project/${project.slug}`}
              target={project.externalUrl ? '_blank' : undefined}
              rel={project.externalUrl ? 'noopener noreferrer' : undefined}
              onClick={
                project.externalUrl
                  ? undefined
                  : (e) => {
                      e.preventDefault();
                      onSelectProject(project.slug);
                    }
              }
              className="group flex flex-col w-full cursor-pointer text-left"
              title={`View ${project.title} (${project.year})`}
            >
              {/* Rounded image: 5px on mobile, 10px on desktop */}
              <div className="relative aspect-16/10 w-full overflow-hidden rounded-[5px] md:rounded-[10px] border border-[#2e3137]/15 bg-[#e5e0d6]">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  onError={(e) => {
                    if (project.localImageUrl && e.currentTarget.src !== project.localImageUrl) {
                      e.currentTarget.src = project.localImageUrl;
                    }
                  }}
                  className="w-full h-full object-cover rounded-[5px] md:rounded-[10px] transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>

              {/* Information below image: Year (text only), Title (wine, hover gray), Description */}
              <div className="mt-3 sm:mt-3.5 flex flex-col">
                {/* Year - purely text, no border or background */}
                <span className="text-[11px] sm:text-xs font-mono font-medium tracking-wider text-[#2e3137]/60 mb-1">
                  {project.year}
                </span>

                {/* Title - wine (#6c1e17), hover gray (#2e3137) */}
                <h3 className="text-sm sm:text-[15px] font-bold text-[#6c1e17] group-hover:text-[#2e3137] transition-colors tracking-tight flex items-center justify-between gap-2">
                  <span>{project.title}</span>
                  {project.externalUrl ? (
                    <ExternalLink className="w-3.5 h-3.5 text-[#6c1e17]/50 group-hover:text-[#2e3137] transition-all shrink-0" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 text-[#6c1e17]/40 group-hover:text-[#2e3137] group-hover:translate-x-1 transition-all shrink-0" />
                  )}
                </h3>

                {/* Description paragraph */}
                <p className="mt-1 text-xs sm:text-[13px] text-[#2e3137]/75 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* SECTION 2: marketing and brand identity */}
      <section>
        <div className="pb-1 mb-6">
          <h2 className="text-xs sm:text-sm font-bold tracking-wider text-[#6c1e17] lowercase">
            marketing and brand identity
          </h2>
        </div>

        {/* 2-Column Grid with rounded image corners (10px desktop, 5px mobile), year tag, title and description below */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-8 sm:gap-y-10">
          {BRANDING_PROJECTS.map((project) => (
            <a
              key={project.id}
              href={project.externalUrl || `#/project/${project.slug}`}
              target={project.externalUrl ? '_blank' : undefined}
              rel={project.externalUrl ? 'noopener noreferrer' : undefined}
              onClick={
                project.externalUrl
                  ? undefined
                  : (e) => {
                      e.preventDefault();
                      onSelectProject(project.slug);
                    }
              }
              className="group flex flex-col w-full cursor-pointer text-left"
              title={`View ${project.title} (${project.year})`}
            >
              {/* Rounded image: 5px on mobile, 10px on desktop */}
              <div className="relative aspect-16/10 w-full overflow-hidden rounded-[5px] md:rounded-[10px] border border-[#2e3137]/15 bg-[#e5e0d6]">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  onError={(e) => {
                    if (project.localImageUrl && e.currentTarget.src !== project.localImageUrl) {
                      e.currentTarget.src = project.localImageUrl;
                    }
                  }}
                  className="w-full h-full object-cover rounded-[5px] md:rounded-[10px] transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>

              {/* Information below image: Year (text only), Title (wine, hover gray), Description */}
              <div className="mt-3 sm:mt-3.5 flex flex-col">
                {/* Year - purely text, no border or background */}
                <span className="text-[11px] sm:text-xs font-mono font-medium tracking-wider text-[#2e3137]/60 mb-1">
                  {project.year}
                </span>

                {/* Title - wine (#6c1e17), hover gray (#2e3137) */}
                <h3 className="text-sm sm:text-[15px] font-bold text-[#6c1e17] group-hover:text-[#2e3137] transition-colors tracking-tight flex items-center justify-between gap-2">
                  <span>{project.title}</span>
                  {project.externalUrl ? (
                    <ExternalLink className="w-3.5 h-3.5 text-[#6c1e17]/50 group-hover:text-[#2e3137] transition-all shrink-0" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 text-[#6c1e17]/40 group-hover:text-[#2e3137] group-hover:translate-x-1 transition-all shrink-0" />
                  )}
                </h3>

                {/* Description paragraph */}
                <p className="mt-1 text-xs sm:text-[13px] text-[#2e3137]/75 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

