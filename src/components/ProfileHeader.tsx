import React from 'react';
import { ExternalLink, Mail, MapPin } from 'lucide-react';

interface ProfileHeaderProps {
  onContactClick: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ onContactClick }) => {
  return (
    <header className="border-b border-[#2e3137]/15 py-8 sm:py-12 bg-[#dfd8cb]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10 text-center sm:text-left">
          {/* Instagram-style Profile Avatar with official logo.png */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-[#244287] via-[#efa642] to-[#6c1e17] shadow-sm">
              <div className="w-full h-full rounded-full bg-[#f4eee4] p-3 flex items-center justify-center overflow-hidden">
                <img
                  src="/logo.png"
                  alt="Gabriella Sales"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Profile Information & Actions */}
          <div className="flex-1 space-y-3">
            {/* Top Row: Handle / Name & Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 justify-center sm:justify-start">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#6c1e17] lowercase">
                gabriella sales
              </h1>

              <div className="flex items-center justify-center gap-2">
                <a
                  href="https://www.behance.net/gabriellasalesm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-[#244287] rounded-lg hover:bg-[#1a3470] transition-colors shadow-2xs"
                >
                  <span>Behance</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  onClick={onContactClick}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-[#2e3137] bg-[#ece5d8] border border-[#2e3137]/20 rounded-lg hover:bg-[#e4ddce] transition-colors cursor-pointer"
                >
                  <Mail className="w-3 h-3 text-[#6c1e17]" />
                  <span>Contact</span>
                </button>
              </div>
            </div>

            {/* Stats Row (Instagram style) */}
            <div className="flex items-center justify-center sm:justify-start gap-6 text-xs sm:text-sm text-[#2e3137]">
              <div>
                <span className="font-bold text-[#6c1e17]">6</span> projects
              </div>
              <div>
                <span className="font-bold text-[#244287]">Data Designer</span> @ JOTA
              </div>
              <div>
                <span className="font-bold text-[#efa642]">Journalism</span> @ ECA-USP
              </div>
            </div>

            {/* Tagline & Bio */}
            <div className="space-y-1 text-xs sm:text-sm text-[#2e3137]/85 leading-relaxed">
              <p className="font-semibold text-[#2e3137] tracking-tight">
                i make information look interesting.
              </p>
              <p className="text-[#2e3137]/75">
                Information design, visual journalism, and infographics. Formerly at Nexo Jornal.
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-1 text-[11px] text-[#2e3137]/65 pt-0.5">
                <MapPin className="w-3 h-3 text-[#6c1e17]" />
                <span>São Paulo, Brazil</span>
                <span aria-hidden="true" className="mx-1">·</span>
                <a
                  href="mailto:gabriellasalesm@gmail.com"
                  className="text-[#6c1e17] font-medium hover:underline"
                >
                  gabriellasalesm@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
