import React from 'react';
import { ExternalLink, Mail } from 'lucide-react';

interface HeaderProps {
  onContactClick: () => void;
  onProjectsClick: () => void;
  onHomeClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onContactClick, onProjectsClick, onHomeClick }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-[200] bg-[#e5e0d6]/95 backdrop-blur-md h-16 transition-colors border-b border-[#2e3137]/10">
      <div className="max-w-5xl mx-auto px-6 h-full flex items-center justify-between gap-6">
        {/* Brand Lockup: Logo cropped horizontally in half + text "gabi" */}
        <a
          href="#top"
          onClick={(e) => {
            if (onHomeClick) {
              e.preventDefault();
              onHomeClick();
            }
          }}
          className="flex items-center gap-2.5 group whitespace-nowrap shrink-0 cursor-pointer"
        >
          {/* Logo image cropped in half horizontally (showing upper half with the sun and crests) */}
          <div className="h-4 sm:h-5 w-16 sm:w-20 overflow-hidden flex items-start">
            <img
              src="/logo.png"
              alt="gabi"
              className="w-full h-auto object-cover object-top -translate-y-0.5 group-hover:scale-105 transition-transform"
            />
          </div>

          {/* "gabi" text styling */}
          <span className="text-[16px] sm:text-[19.2px] font-bold tracking-tight text-[#6c1e17] lowercase">
            gabi
          </span>
        </a>

        {/* Minimalist Navigation Actions: NO background, NO border, ONLY text & icon underlined */}
        <nav className="flex items-center gap-6 sm:gap-8 text-xs sm:text-sm font-medium text-[#2e3137]">
          <button
            onClick={onProjectsClick}
            className="inline-flex items-center gap-1 text-[#2e3137] underline underline-offset-4 decoration-1 hover:text-[#6c1e17] transition-colors cursor-pointer"
          >
            <span>projects</span>
          </button>

          {/* Contact link in wine (#6c1e17) */}
          <button
            onClick={onContactClick}
            className="inline-flex items-center gap-1.5 text-[#6c1e17] underline underline-offset-4 decoration-1 hover:text-[#4d130e] transition-colors cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-[#6c1e17]" />
            <span>contact</span>
          </button>

          <a
            href="https://www.behance.net/gabriellasalesm"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#244287] underline underline-offset-4 decoration-1 hover:text-[#19326b] transition-colors whitespace-nowrap"
          >
            <span>behance</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </nav>
      </div>
    </header>
  );
};
