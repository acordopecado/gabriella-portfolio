import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';

interface ForumJotaPageProps {
  onBack: () => void;
  onContactClick: () => void;
  onSelectProject?: (slug: string) => void;
}

/**
 * Section with an image that appears completely alone first.
 * As the user scrolls:
 * 1. Image appears alone.
 * 2. Solid overlay (#e5e0d6) rises up to 90% opacity.
 * 3. Text enters via scroll.
 * 4. As user continues scrolling, the text exits alone via scroll (scrolling up and out).
 * 5. The next photo then enters swiftly with agility.
 */
interface TextSectionProps {
  imageSrc: string;
  text: string;
  italicPhrase?: string;
  zIndex: number;
}

const ForumJotaTextSection: React.FC<TextSectionProps> = ({
  imageSrc,
  text,
  italicPhrase,
  zIndex,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const totalScroll = rect.height - window.innerHeight;
            if (totalScroll > 0) {
              const scrolled = -rect.top;
              const p = Math.max(0, Math.min(1, scrolled / totalScroll));
              setProgress(p);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Desktop solid overlay opacity (up to 95% as requested)
  let overlayOpacity = 0;
  if (progress > 0.14) {
    if (progress < 0.32) {
      overlayOpacity = ((progress - 0.14) / 0.18) * 0.95;
    } else {
      overlayOpacity = 0.95; // Solid 95%
    }
  }

  // Text enters from below, stays, then exits UP alone
  let textOpacity = 0;
  let textTranslateY = 60;

  if (progress < 0.20) {
    textOpacity = 0;
    textTranslateY = 60;
  } else if (progress >= 0.20 && progress <= 0.38) {
    // Entering from below
    const r = (progress - 0.20) / 0.18;
    textOpacity = r;
    textTranslateY = (1 - r) * 60;
  } else if (progress > 0.38 && progress < 0.58) {
    // In position for reading
    textOpacity = 1;
    textTranslateY = 0;
  } else if (progress >= 0.58 && progress <= 0.78) {
    // Text scrolls UP and exits ALONE
    const r = (progress - 0.58) / 0.20;
    textOpacity = Math.max(0, 1 - r);
    textTranslateY = -r * 90;
  } else {
    // Text completely exited
    textOpacity = 0;
    textTranslateY = -90;
  }

  const renderContent = () => {
    if (italicPhrase && text.includes(italicPhrase)) {
      const parts = text.split(italicPhrase);
      return (
        <>
          {parts[0]}
          <em className="italic text-[#6c1e17] font-medium">{italicPhrase}</em>
          {parts[1]}
        </>
      );
    }
    return text;
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full md:h-[185vh]"
      style={{ zIndex }}
    >
      {/* ========================================================= */}
      {/* DESKTOP LAYOUT (md: and above) - 100% UNCHANGED           */}
      {/* Full-bleed image + 95% solid overlay + centered text      */}
      {/* ========================================================= */}
      <div className="hidden md:block sticky top-0 h-screen h-[100dvh] w-full overflow-hidden bg-[#e5e0d6]">
        <div className="absolute inset-0 w-full h-full">
          <img
            src={imageSrc}
            alt=""
            className="w-full h-full object-cover object-center select-none"
            loading="eager"
          />

          {/* Solid overlay in site background color (#e5e0d6) at 95% opacity */}
          <div
            className="absolute inset-0 bg-[#e5e0d6] pointer-events-none transition-opacity duration-75"
            style={{ opacity: overlayOpacity }}
          />

          {/* Text entering and exiting alone via scroll — aligned to left */}
          <div
            className="absolute inset-0 flex items-center justify-center px-6 sm:px-12 md:px-20 lg:px-28 pointer-events-none"
            style={{
              opacity: textOpacity,
              transform: `translate3d(0, ${textTranslateY}px, 0)`,
            }}
          >
            <div className="w-full max-w-2xl sm:max-w-3xl md:max-w-4xl text-left">
              <p className="text-base sm:text-xl md:text-2xl lg:text-[27px] font-normal text-[#2e3137] leading-relaxed md:leading-[1.65] tracking-tight selection:bg-[#244287] selection:text-white">
                {renderContent()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MOBILE LAYOUT (< md)                                      */}
      {/* Image in top area whole; text in empty space below image. */}
      {/* Scrolls naturally: when text exits with scroll, it pushes  */}
      {/* the image and background up, pulling next image along!     */}
      {/* ========================================================= */}
      <div className="md:hidden w-full bg-[#e5e0d6] flex flex-col py-6 sm:py-8">
        {/* Top area: Image displayed whole, not cropped or covered by text */}
        <div className="w-full px-4 sm:px-6 flex items-center justify-center">
          <img
            src={imageSrc}
            alt=""
            className="w-full h-auto max-h-[52vh] object-contain object-center select-none block"
            loading="eager"
          />
        </div>

        {/* Bottom area: Empty space below image with text */}
        <div className="w-full px-6 sm:px-8 pt-5 pb-2 text-left">
          <p className="text-[15px] sm:text-base font-normal text-[#2e3137] leading-relaxed tracking-tight selection:bg-[#244287] selection:text-white">
            {renderContent()}
          </p>
        </div>
      </div>
    </section>
  );
};

/**
 * Pure image section with responsive height.
 * When consecutive (isConsecutive=true), mobile spacing is decreased.
 */
interface ImageSectionProps {
  imageSrc: string;
  zIndex: number;
  isConsecutive?: boolean;
}

const ForumJotaImageSection: React.FC<ImageSectionProps> = ({
  imageSrc,
  zIndex,
  isConsecutive = false,
}) => {
  return (
    <section
      className={`relative w-full ${
        isConsecutive
          ? 'py-2 sm:py-2.5 md:py-0 md:h-[115vh]'
          : 'py-4 sm:py-6 md:py-0 md:h-[115vh]'
      }`}
      style={{ zIndex }}
    >
      {/* DESKTOP LAYOUT (md: and above) - 100% UNCHANGED */}
      <div className="hidden md:flex w-full overflow-hidden bg-[#e5e0d6] items-center justify-center sticky top-0 h-screen h-[100dvh]">
        <img
          src={imageSrc}
          alt=""
          className="select-none w-full h-full object-cover object-center"
          loading="eager"
        />
      </div>

      {/* MOBILE LAYOUT (< md) */}
      <div className="md:hidden w-full flex items-center justify-center px-4 sm:px-6 bg-[#e5e0d6]">
        <img
          src={imageSrc}
          alt=""
          className="select-none w-full h-auto max-h-[72vh] object-contain object-center block"
          loading="eager"
        />
      </div>
    </section>
  );
};

export const ForumJotaPage: React.FC<ForumJotaPageProps> = ({
  onBack,
  onContactClick,
}) => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  // Keyboard escape key to return home
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onBack();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  return (
    <article className="relative w-full bg-[#e5e0d6] text-[#2e3137] selection:bg-[#244287] selection:text-white pt-16 md:pt-0">
      {/* Module 0 & 1: Hero GIF + Text 1 */}
      <ForumJotaTextSection
        imageSrc="/projects/forum-jota/01_hero.gif"
        text="Following the success of Forum JOTA: Brazil in 10 Years, we were challenged to transform the visual identity of a unique, commemorative event into a solid and scalable standard. Forum JOTA is an institutional event that brings together ministers and relevant political figures to discuss key issues in Brazil. In this project, I present the three events held in 2025 and 2026."
        italicPhrase="Forum JOTA: Brazil in 10 Years"
        zIndex={10}
      />

      {/* Module 2: Brand Grid Image (Alone, Full-Screen) */}
      <ForumJotaImageSection
        imageSrc="/projects/forum-jota/02_brand_grid.png"
        zIndex={20}
      />

      {/* Module 3 & 4: Posters JPG + Text 2 */}
      <ForumJotaTextSection
        imageSrc="/projects/forum-jota/03_posters.jpg"
        text="Each event has its own key visual, but they share a common pattern: transforming a concrete concept into a modern, geometric, and modular visual. The logo leverages the variations of the Literata typeface to introduce dynamism, while the choice of a dominant orange color aims to keep the brand's core identity present throughout the project."
        zIndex={30}
      />

      {/* Module 5 & 6: Motion Loop GIF + Text 3 */}
      <ForumJotaTextSection
        imageSrc="/projects/forum-jota/04_motion_loop.gif"
        text="In addition to the complete production of the event spaces—including backdrops, badges, posters, and other printed materials—we also created promotional posts, giveaways, motion graphics for screens, and live streaming assets."
        zIndex={40}
      />

      {/* Module 7: Stage Schedule Screens PNG (Consecutive image 1) */}
      <ForumJotaImageSection
        imageSrc="/projects/forum-jota/05_screens.png"
        zIndex={50}
        isConsecutive
      />

      {/* Module 8: Stationery & Badges JPG (Consecutive image 2) */}
      <ForumJotaImageSection
        imageSrc="/projects/forum-jota/06_stationery.jpg"
        zIndex={60}
        isConsecutive
      />

      {/* Module 9: Event Hall Auditorium JPG (Consecutive image 3) */}
      <ForumJotaImageSection
        imageSrc="/projects/forum-jota/07_event_hall.jpg"
        zIndex={70}
        isConsecutive
      />

      {/* Module 10: Live Stream Graphics GIF (Consecutive image 4) */}
      <ForumJotaImageSection
        imageSrc="/projects/forum-jota/08_livestream.gif"
        zIndex={80}
        isConsecutive
      />

      {/* ─────────────────────────────────────────────────────────────
          RODAPÉ: Apenas créditos exatos e botões
         ───────────────────────────────────────────────────────────── */}
      <section
        className="relative w-full min-h-[45vh] bg-[#e5e0d6] border-t border-[#2e3137]/15 py-20 sm:py-28 px-6 flex flex-col justify-center items-center"
        style={{ zIndex: 90 }}
      >
        <div className="w-full max-w-xl mx-auto space-y-8 text-left">
          {/* Créditos com nomes em bold e vinho (#6c1e17), e 'by' na tipografia dos anos (font-mono) */}
          <div className="space-y-2.5 text-sm sm:text-base md:text-lg text-[#2e3137] font-normal leading-relaxed lowercase tracking-tight text-left">
            <p>
              <span>art direction</span>{' '}
              <span className="font-mono text-[11px] sm:text-xs md:text-sm font-medium tracking-wider text-[#2e3137]/60">by</span>{' '}
              <strong className="font-bold text-[#6c1e17]">gabriella sales</strong>
            </p>
            <p>
              <span>design</span>{' '}
              <span className="font-mono text-[11px] sm:text-xs md:text-sm font-medium tracking-wider text-[#2e3137]/60">by</span>{' '}
              <strong className="font-bold text-[#6c1e17]">chris moreira</strong>{' '}
              <span className="font-mono text-[11px] sm:text-xs md:text-sm font-medium tracking-wider text-[#2e3137]/60">and</span>{' '}
              <strong className="font-bold text-[#6c1e17]">gabriella sales</strong>
            </p>
            <p>
              <span>motion design</span>{' '}
              <span className="font-mono text-[11px] sm:text-xs md:text-sm font-medium tracking-wider text-[#2e3137]/60">by</span>{' '}
              <strong className="font-bold text-[#6c1e17]">ca aulucci</strong>
            </p>
          </div>

          {/* Botões */}
          <div className="flex flex-wrap items-center justify-start gap-6 sm:gap-8 pt-2">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#6c1e17] underline underline-offset-4 decoration-1 hover:text-[#4d130e] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>all projects</span>
            </button>

            <button
              onClick={onContactClick}
              className="text-xs sm:text-sm font-semibold text-[#2e3137] underline underline-offset-4 decoration-1 hover:text-[#6c1e17] transition-colors cursor-pointer"
            >
              contact
            </button>

            <a
              href="https://www.behance.net/gallery/248368873/Forum-JOTA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#244287] underline underline-offset-4 decoration-1 hover:text-[#19326b] transition-colors"
            >
              <span>view on behance</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>
    </article>
  );
};
