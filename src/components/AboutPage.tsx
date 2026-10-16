import React, { useEffect } from 'react';
import { ArrowLeft, Mail, ExternalLink } from 'lucide-react';

interface AboutPageProps {
  onBack: () => void;
  onContactClick: () => void;
}

interface SocialItem {
  id: string;
  url: string;
  imageSrc: string;
  alt: string;
}

const SOCIAL_ITEMS: SocialItem[] = [
  {
    id: 'ig-rome',
    url: 'https://www.instagram.com/p/Ddml4WinIn1/',
    imageSrc: '/social/ig_rome.jpg',
    alt: 'rome 35mm film',
  },
  {
    id: 'tiktok-35mm',
    url: 'https://www.tiktok.com/@gabisalesm/video/7688054218120400149',
    imageSrc: '/social/tiktok_35mm.jpg',
    alt: '35mm film capture',
  },
  {
    id: 'ig-may2024',
    url: 'https://www.instagram.com/p/DFakqhzuvkd/',
    imageSrc: '/social/ig_may2024.jpg',
    alt: 'may 2024 travel memories',
  },
  {
    id: 'ig-buenosaires',
    url: 'https://www.instagram.com/p/DUj1NYYDM0Q/',
    imageSrc: '/social/ig_buenosaires.jpg',
    alt: 'buenos aires analog frames',
  },
  {
    id: 'tiktok-photo',
    url: 'https://www.tiktok.com/@gabisalesm/photo/7613788623661436167',
    imageSrc: '/social/tiktok_photo.jpg',
    alt: 'analog photo diary',
  },
  {
    id: 'ig-street',
    url: 'https://www.instagram.com/gabianalogica/p/DajoEGQHKUo/',
    imageSrc: '/social/ig_analog_street.jpg',
    alt: 'analog light and street moments',
  },
  {
    id: 'tiktok-travel2',
    url: 'https://www.tiktok.com/@gabisalesm/photo/7617936995469298965',
    imageSrc: '/social/tiktok_travel2.jpg',
    alt: 'travel postcards and analog film',
  },
];

export const AboutPage: React.FC<AboutPageProps> = ({ onBack, onContactClick }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  return (
    <article className="min-h-screen bg-[#e5e0d6] text-[#2e3137] pb-24 pt-20 animate-in fade-in duration-300">
      {/* Top Bar Navigation */}
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#6c1e17] underline underline-offset-4 decoration-1 hover:text-[#2e3137] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>back to all projects</span>
        </button>

        <div className="flex items-center gap-5 text-xs sm:text-sm">
          <a
            href="https://www.instagram.com/gabianalogica"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2e3137]/80 hover:text-[#6c1e17] underline underline-offset-4 decoration-1 font-medium transition-colors"
          >
            @gabianalogica
          </a>
          <a
            href="https://www.tiktok.com/@gabisalesm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2e3137]/80 hover:text-[#244287] underline underline-offset-4 decoration-1 font-medium transition-colors"
          >
            @gabisalesm
          </a>
        </div>
      </div>

      {/* Hero Header for About / Analog Photography */}
      <header className="max-w-6xl mx-auto px-6 pt-5 pb-8 text-left">
        <div className="flex items-center gap-2 text-xs sm:text-[13px] font-mono tracking-wider text-[#6c1e17] mb-2 font-normal lowercase">
          <span>more about me</span>
        </div>

        {/* Section Title */}
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-[#6c1e17] lowercase mb-2.5">
          analog photography and travel content
        </h1>

        {/* Section Description */}
        <p className="text-xs sm:text-[13px] md:text-sm text-[#2e3137]/75 font-normal leading-relaxed max-w-xl">
          beyond infographics and visual journalism, i document the world through 35mm film cameras and short-form travel diaries.
        </p>
      </header>

      {/* Pure Image Grid: Only cover images linking to their posts */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4 md:gap-5">
          {SOCIAL_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square bg-[#ded8cd]/60 overflow-hidden transition-all duration-300 hover:opacity-90 cursor-pointer"
            >
              <img
                src={item.imageSrc}
                alt={item.alt}
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </section>

      {/* Bottom Action Footer */}
      <footer className="max-w-6xl mx-auto px-6 mt-14 pt-8 border-t border-[#2e3137]/15 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#6c1e17] underline underline-offset-4 decoration-1 hover:text-[#2e3137] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>all projects</span>
        </button>

        <div className="flex items-center gap-5">
          <button
            onClick={onContactClick}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#6c1e17] underline underline-offset-4 decoration-1 hover:text-[#2e3137] transition-colors cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>get in touch</span>
          </button>

          <a
            href="https://www.instagram.com/gabianalogica"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#244287] underline underline-offset-4 decoration-1 hover:text-[#172c5b] transition-colors"
          >
            <span>instagram</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <a
            href="https://www.tiktok.com/@gabisalesm"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#2e3137] underline underline-offset-4 decoration-1 hover:text-[#6c1e17] transition-colors"
          >
            <span>tiktok</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </footer>
    </article>
  );
};
