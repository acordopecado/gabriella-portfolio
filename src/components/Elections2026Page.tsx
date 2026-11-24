import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';

interface Elections2026PageProps {
  onBack: () => void;
  onContactClick: () => void;
  onSelectProject?: (slug: string) => void;
}

/**
 * Section with an image that appears completely alone first.
 * As the user scrolls:
 * 1. Image appears alone.
 * 2. Solid overlay (#e5e0d6) rises up to 95% opacity.
 * 3. Text enters via scroll.
 * 4. As user continues scrolling, the text exits alone via scroll (scrolling up and out).
 * 5. The next photo then enters swiftly with agility.
 */
interface TextSectionProps {
  imageSrc: string;
  label?: string;
  paragraphs: string[];
  italicPhrase?: string;
  compact?: boolean;
  zIndex: number;
}

const Elections2026TextSection: React.FC<TextSectionProps> = ({
  imageSrc,
  label,
  paragraphs,
  italicPhrase,
  compact = false,
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

  // Desktop solid overlay opacity (up to 95% matching Forum JOTA)
  let overlayOpacity = 0;
  if (progress > 0.14) {
    if (progress < 0.32) {
      overlayOpacity = ((progress - 0.14) / 0.18) * 0.95;
    } else {
      overlayOpacity = 0.95;
    }
  }

  // Text enters from below, stays, then exits UP alone
  let textOpacity = 0;
  let textTranslateY = 60;

  if (progress < 0.20) {
    textOpacity = 0;
    textTranslateY = 60;
  } else if (progress >= 0.20 && progress <= 0.38) {
    const r = (progress - 0.20) / 0.18;
    textOpacity = r;
    textTranslateY = (1 - r) * 60;
  } else if (progress > 0.38 && progress < 0.58) {
    textOpacity = 1;
    textTranslateY = 0;
  } else if (progress >= 0.58 && progress <= 0.78) {
    const r = (progress - 0.58) / 0.20;
    textOpacity = Math.max(0, 1 - r);
    textTranslateY = -r * 90;
  } else {
    textOpacity = 0;
    textTranslateY = -90;
  }

  const renderParagraph = (raw: string) => {
    if (italicPhrase && raw.includes(italicPhrase)) {
      const parts = raw.split(italicPhrase);
      return (
        <>
          {parts[0]}
          <em className="italic text-[#6c1e17] font-medium">{italicPhrase}</em>
          {parts.slice(1).join(italicPhrase)}
        </>
      );
    }
    return raw;
  };

  const desktopTextClass = compact
    ? 'text-base sm:text-lg md:text-xl lg:text-[22px] font-normal text-[#2e3137] leading-relaxed md:leading-[1.55] tracking-tight selection:bg-[#244287] selection:text-white'
    : 'text-base sm:text-xl md:text-2xl lg:text-[27px] font-normal text-[#2e3137] leading-relaxed md:leading-[1.65] tracking-tight selection:bg-[#244287] selection:text-white';

  return (
    <section
      ref={containerRef}
      className="relative w-full md:h-[185vh]"
      style={{ zIndex }}
    >
      {/* DESKTOP LAYOUT (md: and above) */}
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
            <div className="w-full max-w-2xl sm:max-w-3xl md:max-w-4xl text-left space-y-4">
              {label && (
                <span className="block text-xs sm:text-sm font-mono font-semibold uppercase tracking-wider text-[#6c1e17]">
                  {label}
                </span>
              )}
              {paragraphs.map((paragraph, idx) => (
                <p key={idx} className={desktopTextClass}>
                  {renderParagraph(paragraph)}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE LAYOUT (< md) */}
      <div className="md:hidden w-full bg-[#e5e0d6] flex flex-col py-6 sm:py-8">
        <div className="w-full px-4 sm:px-6 flex items-center justify-center">
          <img
            src={imageSrc}
            alt=""
            className="w-full h-auto max-h-[52vh] object-contain object-center select-none block"
            loading="eager"
          />
        </div>

        <div className="w-full px-6 sm:px-8 pt-5 pb-2 text-left space-y-3">
          {label && (
            <span className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-[#6c1e17]">
              {label}
            </span>
          )}
          {paragraphs.map((paragraph, idx) => (
            <p
              key={idx}
              className="text-[15px] sm:text-base font-normal text-[#2e3137] leading-relaxed tracking-tight selection:bg-[#244287] selection:text-white"
            >
              {renderParagraph(paragraph)}
            </p>
          ))}
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

const Elections2026ImageSection: React.FC<ImageSectionProps> = ({
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
      {/* DESKTOP LAYOUT (md: and above) */}
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

export const Elections2026Page: React.FC<Elections2026PageProps> = ({
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
      {/* Module 0, 1 & 2: Hero 2026 + Title & The Assignment */}
      <Elections2026TextSection
        imageSrc="/projects/elections-2026/01_slide.png"
        label="2026 brazilian general elections · the assignment"
        paragraphs={[
          'Cross-platform branding system and data visualization for JOTA.',
          'Design a comprehensive, end-to-end visual and data-journalism ecosystem for Brazil’s 2026 General Elections, spanning nearly a year of pre-election analysis, two high-stakes Election Sundays and bilingual executive reporting for domestic and international decision-makers.',
        ]}
        italicPhrase="2026 General Elections"
        compact
        zIndex={10}
      />

      {/* Module 3: Creative Process Slide (Alone, Full-Screen) */}
      <Elections2026ImageSection
        imageSrc="/projects/elections-2026/02_slide.png"
        zIndex={20}
      />

      {/* Module 4 & 5: Exploratory Logo Studies + Project Kick-off */}
      <Elections2026TextSection
        imageSrc="/projects/elections-2026/03_slide.png"
        paragraphs={[
          'Project kick-off in December 2025: developing a visual identity capable of evolving across a 10-month editorial cycle, from early political tracking to live vote-count coverage.',
          'Over 50 exploratory studies were tested across light and dark backgrounds. After discarding literal election tropes, such as ballot boxes and national flag motifs, the final mark uses typographic contrast within 2026 to subtly reflect Brazil’s polarized political landscape while remaining legible at micro-badge scale.',
        ]}
        italicPhrase="2026"
        compact
        zIndex={30}
      />

      {/* Module 6 & 7: Contrast Variations + Optical Contrast Testing */}
      <Elections2026TextSection
        imageSrc="/projects/elections-2026/04_slide.png"
        paragraphs={[
          'Optical contrast testing ensured JOTA’s signature orange remained distinctly orange rather than shifting toward politically charged red. The mark was engineered in two functional states: an outlined 20 seal for pre-election coverage, switching to a solid filled version once official ballot results went live.',
        ]}
        italicPhrase="20"
        zIndex={40}
      />

      {/* Module 8 & 9: 50+ Preview Reports + The Solution */}
      <Elections2026TextSection
        imageSrc="/projects/elections-2026/05_slide.png"
        label="the solution"
        paragraphs={[
          'A dual-layered visual architecture that separates brand neutrality from editorial data clarity. While the campaign identity relied on light, neutral tones, the infographic system introduced a dedicated ideological color spectrum—consolidating dozens of Brazilian parties into Left, Center, and Right so executives and global readers could grasp shifts in power at a glance. To achieve speed without sacrificing craft, bespoke design was paired with an internal AI-powered data tool that automated real-time chart production.',
        ]}
        compact
        zIndex={50}
      />

      {/* Module 10: Elections Day Title Slide (Alone, Full-Screen) */}
      <Elections2026ImageSection
        imageSrc="/projects/elections-2026/06_slide.png"
        zIndex={60}
      />

      {/* Module 11 & 12: 200+ Website, Social & MKT Assets + Election Day System */}
      <Elections2026TextSection
        imageSrc="/projects/elections-2026/07_slide.png"
        paragraphs={[
          'On Election Day, the visual system transitioned from intense pre-election orange to a lighter blue-and-gray gradient paired with the filled 2026 badge, signaling live results while preventing visual fatigue across hundreds of simultaneous homepage updates.',
          'Up to five outcome variations (elected, re-elected, runoff) were pre-built across every state race so designers could focus on unexpected upsets and legislative highlights once polls closed.',
        ]}
        italicPhrase="2026"
        compact
        zIndex={70}
      />

      {/* Module 13 & 14: Multi-channel Rollout + 6.3M Visitors */}
      <Elections2026TextSection
        imageSrc="/projects/elections-2026/08_slide.png"
        paragraphs={[
          'Multi-channel rollout across Instagram, YouTube live broadcasts and digital marketing for both. On 1st Round election day alone, JOTA’s website reached over 6.3 million visitors.',
        ]}
        italicPhrase="6.3 million"
        zIndex={80}
      />

      {/* Module 15 & 16: Infographics Title + Self-service TSE Tool */}
      <Elections2026TextSection
        imageSrc="/projects/elections-2026/09_slide.png"
        paragraphs={[
          'A custom self-service internal tool connected to Superior Electoral Court (TSE) data that generated 300+ customizable maps and charts, giving journalists direct autonomy to export publication-ready charts.',
          'A dedicated chromatic system tailored to Brazilian political perception. Mobile-first special reports in English and Portuguese, breaking down the Presidency, Governors, Congress, and Supreme Court (STF) retirement timelines.',
        ]}
        compact
        zIndex={90}
      />

      {/* Module 17 & 18: Left/Center/Right Color Scheme */}
      <Elections2026TextSection
        imageSrc="/projects/elections-2026/10_slide.png"
        paragraphs={[
          'Separating brand colors from information design: a high-clarity left, center, and right chromatic palette designed to standardize ideological analysis across all election graphics.',
        ]}
        zIndex={100}
      />

      {/* Module 19: Key Results from 1st Round Dashboard (Alone, Full-Screen) */}
      <Elections2026ImageSection
        imageSrc="/projects/elections-2026/11_slide.png"
        zIndex={110}
      />

      {/* Module 20 & 21: 1st & 2nd Round Mobile Reports + Runoff Granularity */}
      <Elections2026TextSection
        imageSrc="/projects/elections-2026/12_slide.png"
        paragraphs={[
          "For the Runoff, geographic visualization evolved from state-level to municipality-level granularity to accurately reflect popular vote distribution, alongside a Supreme Court (STF) succession timeline showing the incoming president's relations among branches of government.",
          'Mobile-first executive briefings were repurposed into custom C-level presentations.',
        ]}
        compact
        zIndex={120}
      />

      {/* Module 22 & 23: C-level Presentation + Business Impact */}
      <Elections2026TextSection
        imageSrc="/projects/elections-2026/13_slide.png"
        label="business impact"
        paragraphs={[
          '> 6.3+ million website visits, more than doubling JOTA’s 2024 election-day traffic.',
          '> 550+ visual and data assets delivered across the election cycle.',
          '> Zero production bottlenecks during live vote counts thanks to pre-built outcome variations and newsroom self-service tooling.',
          '> Same-night bilingual delivery of comprehensive political landscape reports for international and corporate subscribers.',
          '> Strengthened JOTA’s authority as a premium source of political intelligence for C-level executives and global companies.',
        ]}
        compact
        zIndex={130}
      />

      {/* ─────────────────────────────────────────────────────────────
          RODAPÉ: Apenas créditos exatos e botões (padrão Forum JOTA)
         ───────────────────────────────────────────────────────────── */}
      <section
        className="relative w-full min-h-[45vh] bg-[#e5e0d6] border-t border-[#2e3137]/15 py-20 sm:py-28 px-6 flex flex-col justify-center items-center"
        style={{ zIndex: 140 }}
      >
        <div className="w-full max-w-xl mx-auto space-y-8 text-left">
          {/* Créditos com nomes em bold e vinho (#6c1e17), e 'by' / 'and' em font-mono */}
          <div className="space-y-2.5 text-sm sm:text-base md:text-lg text-[#2e3137] font-normal leading-relaxed lowercase tracking-tight text-left">
            <p>
              <span>art direction, branding and infographics</span>{' '}
              <span className="font-mono text-[11px] sm:text-xs md:text-sm font-medium tracking-wider text-[#2e3137]/60">by</span>{' '}
              <strong className="font-bold text-[#6c1e17]">gabriella sales</strong>
            </p>
            <p>
              <span>design coordinator and data tooling</span>{' '}
              <span className="font-mono text-[11px] sm:text-xs md:text-sm font-medium tracking-wider text-[#2e3137]/60">by</span>{' '}
              <strong className="font-bold text-[#6c1e17]">guilherme gomes</strong>
            </p>
            <p>
              <span>junior designers and motion graphics</span>{' '}
              <span className="font-mono text-[11px] sm:text-xs md:text-sm font-medium tracking-wider text-[#2e3137]/60">by</span>{' '}
              <strong className="font-bold text-[#6c1e17]">ca aulucci</strong>{' '}
              <span className="font-mono text-[11px] sm:text-xs md:text-sm font-medium tracking-wider text-[#2e3137]/60">and</span>{' '}
              <strong className="font-bold text-[#6c1e17]">chris moreira</strong>
            </p>
            <p>
              <span>editorial and social media partners</span>{' '}
              <span className="font-mono text-[11px] sm:text-xs md:text-sm font-medium tracking-wider text-[#2e3137]/60">by</span>{' '}
              <strong className="font-bold text-[#6c1e17]">andré rossi</strong>,{' '}
              <strong className="font-bold text-[#6c1e17]">isabela giantomaso</strong>,{' '}
              <strong className="font-bold text-[#6c1e17]">juliana castro</strong>{' '}
              <span className="font-mono text-[11px] sm:text-xs md:text-sm font-medium tracking-wider text-[#2e3137]/60">and</span>{' '}
              <strong className="font-bold text-[#6c1e17]">kalleo coura</strong>
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
              href="https://www.behance.net/gallery/258759493/2026-Brazilian-General-Elections"
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
