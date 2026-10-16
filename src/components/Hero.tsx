import React from 'react';
import { ArrowDown, ExternalLink, Mail } from 'lucide-react';
import { DesignTypewriter } from './DesignTypewriter';

interface HeroProps {
  onProjectsClick: () => void;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onProjectsClick, onContactClick }) => {
  return (
    <section
      id="top"
      className="pt-28 pb-8 sm:pt-32 sm:pb-6 md:pt-[122px] md:pb-10 text-left sm:text-center"
    >
      <div className="max-w-2xl sm:mx-auto md:max-w-[650px] px-6 w-full">
        {/* Full Official Logo - Left aligned on mobile, centered on desktop (-15% on desktop: from 86px to 73px) */}
        <div className="mb-5 sm:mb-6 md:mb-6 flex justify-start sm:justify-center">
          <img
            src="/logo.png"
            alt="Gabriella Sales"
            className="h-12 sm:h-16 md:h-[73px] w-auto object-contain hover:scale-[1.02] transition-transform duration-300"
          />
        </div>

        {/* Wordmark: -15% on desktop (from 58px to 49px) */}
        <h1 className="text-[48px] xs:text-[54px] sm:text-4xl md:text-[49px] font-semibold tracking-tight text-[#6c1e17] lowercase leading-[0.92] sm:leading-tight mb-3 sm:mb-2 md:mb-2.5">
          <span className="block sm:inline">gabriella</span>
          <span className="hidden sm:inline"> </span>
          <span className="block sm:inline">sales</span>
        </h1>

        {/* Animated Subtitle */}
        <div className="mb-2 sm:mb-2 md:mb-2.5">
          <DesignTypewriter />
        </div>

        {/* Concise Description: -15% on desktop (from 15.5px to 13.2px) */}
        <p className="text-xs sm:text-[13px] md:text-[13.2px] text-[#2e3137]/80 leading-normal font-normal mb-5 sm:mb-6 md:mb-6 max-w-lg md:max-w-lg mx-0 sm:mx-auto">
          information designer at JOTA. master's in Design at USP
        </p>

        {/* Ultra-Minimalist Actions: -15% on desktop (from 16.8px to 14.3px, icons from 17px to 14.5px) */}
        <div className="flex flex-wrap items-center justify-start sm:justify-center gap-4 sm:gap-7 md:gap-7 text-xs sm:text-sm md:text-[14.3px] font-semibold">
          <button
            onClick={onProjectsClick}
            className="inline-flex items-center gap-1.5 md:gap-2 text-[#6c1e17] underline underline-offset-4 decoration-1 hover:text-[#244287] transition-colors cursor-pointer"
          >
            <span>view projects</span>
            <ArrowDown className="w-3.5 h-3.5 md:w-[14.5px] md:h-[14.5px]" />
          </button>

          {/* LinkedIn Link */}
          <a
            href="https://www.linkedin.com/in/gabriellasalesm"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 md:gap-2 text-[#244287] underline underline-offset-4 decoration-1 hover:text-[#172c5b] transition-colors"
          >
            <span>linkedin</span>
            <ExternalLink className="w-3.5 h-3.5 md:w-[14.5px] md:h-[14.5px]" />
          </a>

          <button
            onClick={onContactClick}
            className="inline-flex items-center gap-1.5 md:gap-2 text-[#6c1e17] underline underline-offset-4 decoration-1 hover:text-[#4d130e] transition-colors cursor-pointer"
          >
            <span>get in touch</span>
            <Mail className="w-3.5 h-3.5 md:w-[14.5px] md:h-[14.5px]" />
          </button>
        </div>
      </div>
    </section>
  );
};
