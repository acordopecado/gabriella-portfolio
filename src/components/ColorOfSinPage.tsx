import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';

interface ColorOfSinPageProps {
  onBack: () => void;
  onContactClick: () => void;
  onSelectProject?: (slug: string) => void;
}

interface TextSectionProps {
  imageSrc: string;
  text: string;
  italicPhrase?: string;
  zIndex: number;
}

/**
 * Scrollytelling Section for "The color of sin"
 * DESKTOP:
 * 1. Image appears alone first without text.
 * 2. As scroll progresses, solid 95% opacity overlay appears in site background color (#e5e0d6).
 * 3. Text enters alone sliding up, left-aligned.
 * 4. Text exits alone sliding upward, then next slide smoothly enters with agility.
 *
 * MOBILE:
 * 1. Natural flow without sticky freeze. Image is fully contained (object-contain, max-h-[72vh]).
 * 2. Text appears in empty space below image.
 * 3. Scrolling naturally pushes previous image and background together and pulls the next section.
 */
const ColorOfSinTextSection: React.FC<TextSectionProps> = ({
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
          const el = containerRef.current;
          if (el) {
            const rect = el.getBoundingClientRect();
            const totalScrollable = rect.height - window.innerHeight;
            if (totalScrollable > 0) {
              const currentScroll = -rect.top;
              const rawProgress = currentScroll / totalScrollable;
              const clamped = Math.min(1, Math.max(0, rawProgress));
              setProgress(clamped);
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

  // 1. Overlay fades in between progress 0.14 and 0.32, reaching 95% opacity (0.95)
  const bgOpacity = Math.min(0.95, Math.max(0, (progress - 0.14) / 0.18) * 0.95);

  // 2. Text fades in between 0.20 and 0.38, stays solid, then exits alone between 0.58 and 0.78
  const textOpacity =
    progress < 0.20
      ? 0
      : progress <= 0.38
      ? (progress - 0.20) / 0.18
      : progress < 0.58
      ? 1
      : progress <= 0.78
      ? Math.max(0, 1 - (progress - 0.58) / 0.20)
      : 0;

  // 3. Text entrance slide-up (60px -> 0px) and exit slide-up (0px -> -90px)
  const textTranslateY =
    progress < 0.20
      ? 60
      : progress <= 0.38
      ? (1 - (progress - 0.20) / 0.18) * 60
      : progress < 0.58
      ? 0
      : progress <= 0.78
      ? -((progress - 0.58) / 0.20) * 90
      : -90;

  const renderFormattedText = (rawText: string) => {
    if (italicPhrase && rawText.includes(italicPhrase)) {
      const parts = rawText.split(italicPhrase);
      return (
        <>
          {parts[0]}
          <em className="italic font-bold text-[#6c1e17]">{italicPhrase}</em>
          {parts[1]}
        </>
      );
    }
    // Highlight specific key terms
    const parts = rawText.split(/(The color of sin|DNA do Brasil|University of São Paulo)/g);
    return parts.map((part, i) => {
      if (part === 'The color of sin' || part === 'DNA do Brasil') {
        return (
          <span key={i} className="font-bold italic text-[#2e3137]">
            {part}
          </span>
        );
      }
      if (part === 'University of São Paulo') {
        return (
          <strong key={i} className="font-bold text-[#2e3137]">
            {part}
          </strong>
        );
      }
      return <React.Fragment key={i}>{part}</React.Fragment>;
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[185vh]"
      style={{ zIndex }}
    >
      <div className="flex w-full sticky top-0 h-screen h-[100dvh] overflow-hidden bg-[#e5e0d6] items-center justify-center">
        {/* Background image */}
        <img
          src={imageSrc}
          alt=""
          className="select-none absolute inset-0 w-full h-full object-contain sm:object-cover object-center pointer-events-none"
          loading="eager"
        />

        {/* Solid site background color overlay at 95% opacity (#e5e0d6) */}
        <div
          className="absolute inset-0 bg-[#e5e0d6] pointer-events-none transition-opacity duration-75"
          style={{ opacity: bgOpacity }}
        />

        {/* Narrative text block - left aligned */}
        <div
          className="relative z-10 w-full max-w-2xl sm:max-w-3xl md:max-w-4xl mx-auto px-6 sm:px-10 md:px-20 lg:px-28 pointer-events-none text-left"
          style={{
            opacity: textOpacity,
            transform: `translate3d(0, ${textTranslateY}px, 0)`,
          }}
        >
          <div className="w-full text-left">
            <p className="text-[15px] sm:text-lg md:text-2xl lg:text-[27px] font-normal text-[#2e3137] leading-relaxed md:leading-[1.65] tracking-tight selection:bg-[#244287] selection:text-white">
              {renderFormattedText(text)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Pure image section with sticky scrollytelling height.
 */
interface ImageSectionProps {
  imageSrc: string;
  zIndex: number;
  isConsecutive?: boolean;
}

const ColorOfSinImageSection: React.FC<ImageSectionProps> = ({
  imageSrc,
  zIndex,
}) => {
  return (
    <section
      className="relative w-full h-[115vh]"
      style={{ zIndex }}
    >
      <div className="flex w-full overflow-hidden bg-[#e5e0d6] items-center justify-center sticky top-0 h-screen h-[100dvh]">
        <img
          src={imageSrc}
          alt=""
          className="select-none w-full h-full object-contain sm:object-cover object-center"
          loading="eager"
        />
      </div>
    </section>
  );
};

export const ColorOfSinPage: React.FC<ColorOfSinPageProps> = ({
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
    <article className="relative w-full bg-[#e5e0d6] text-[#2e3137] selection:bg-[#244287] selection:text-white">
      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: Cover Image + Project Introduction Text
         ───────────────────────────────────────────────────────────── */}
      <ColorOfSinTextSection
        imageSrc="/projects/color-of-sin/01_cover.png"
        text="The color of sin is a popular –yet problematic– Brazilian expression used to refer to mixed race people. This project investigates how genetic data, socioeconomic factors, and personal narratives intertwine in the construction the &quot;pardo&quot; (mixed-race) identity and the growing influence of genetic ancestry in this self-identification process."
        zIndex={10}
      />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: Animated Flow GIF + Methodology and Data Text
         ───────────────────────────────────────────────────────────── */}
      <ColorOfSinTextSection
        imageSrc="/projects/color-of-sin/02_animated_flow.gif"
        text="The work was based in a multidisciplinary approach, combining the genetic database from University of São Paulo's DNA do Brasil project and socioeconomic data from the IBGE (Brazilian Institute of Geography and Statistics). A visual narrative was created through graphics that explore the Brazilian racial reality. This data analysis was complemented by a theoretical foundation, grounded in academic concepts and interviews with experts in the field."
        zIndex={20}
      />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: Visual Graphic 1 (Charts)
         ───────────────────────────────────────────────────────────── */}
      <ColorOfSinImageSection
        imageSrc="/projects/color-of-sin/03_data_viz_1.png"
        isConsecutive={false}
        zIndex={30}
      />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: Visual Graphic 2 (Map & distribution) - consecutive
         ───────────────────────────────────────────────────────────── */}
      <ColorOfSinImageSection
        imageSrc="/projects/color-of-sin/04_data_viz_2.png"
        isConsecutive={true}
        zIndex={40}
      />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 5: Personal Stories Image + 5 Characters Narrative Text
         ───────────────────────────────────────────────────────────── */}
      <ColorOfSinTextSection
        imageSrc="/projects/color-of-sin/05_personal_stories.png"
        text="The main point of this project lies in the connection between data and human experience, by presenting the stories of five mixed-race Brazilians from three different regions. Each of them has taken a DNA ancestry test and shares how the discovery of their African, European, and Indigenous heritage impacted, reinforced, or challenged their own sense of identity, bringing a personal and sensitive dimension to the work."
        zIndex={50}
      />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 6: Interactive Link & Academic Thesis Note (ECA-USP)
         ───────────────────────────────────────────────────────────── */}
      <section
        className="relative w-full bg-[#e5e0d6] py-16 sm:py-20 md:py-24 px-6 border-t border-[#2e3137]/15 flex flex-col items-center justify-center"
        style={{ zIndex: 60 }}
      >
        <div className="w-full max-w-2xl mx-auto space-y-8 text-left">
          {/* Behance Link bit.ly/a-cor-do-pecado */}
          <div className="text-left">
            <a
              href="http://bit.ly/a-cor-do-pecado"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xl sm:text-2xl md:text-3xl font-bold text-[#6c1e17] hover:text-[#2e3137] underline underline-offset-8 decoration-2 transition-colors tracking-tight"
            >
              <span>bit.ly/a-cor-do-pecado</span>
              <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          </div>

          {/* Academic Thesis note - English only */}
          <div className="pt-2 text-left">
            <p className="text-base sm:text-lg text-[#2e3137]/90 font-normal leading-relaxed text-left">
              This work was approved as the final thesis for the Bachelor Degree in Journalism at the <strong className="font-bold text-[#2e3137]">University of São Paulo (ECA-USP)</strong>, in July 2023.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          RODAPÉ: Créditos com tipografia em bold e vinho, 'by' em font-mono
         ───────────────────────────────────────────────────────────── */}
      <section
        className="relative w-full min-h-[45vh] bg-[#e5e0d6] border-t border-[#2e3137]/15 py-20 sm:py-28 px-6 flex flex-col justify-center items-center"
        style={{ zIndex: 70 }}
      >
        <div className="w-full max-w-xl mx-auto space-y-8 text-left">
          {/* Créditos com nomes em bold e vinho (#6c1e17), e 'by' em font-mono */}
          <div className="space-y-2.5 text-sm sm:text-base md:text-lg text-[#2e3137] font-normal leading-relaxed lowercase tracking-tight text-left">
            <p>
              <span>visual reporting, research and design</span>{' '}
              <span className="font-mono text-[11px] sm:text-xs md:text-sm font-medium tracking-wider text-[#2e3137]/60">by</span>{' '}
              <strong className="font-bold text-[#6c1e17]">gabriella sales</strong>
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
              href="https://www.behance.net/gallery/228295113/A-cor-do-pecado"
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
