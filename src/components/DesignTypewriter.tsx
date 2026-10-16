import React, { useState, useEffect } from 'react';

const PREFIX_WORDS = ['graphic', 'editorial', 'brand', 'visual', 'info'];

export const DesignTypewriter: React.FC = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayedPrefix, setDisplayedPrefix] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFinalStage, setIsFinalStage] = useState(false);
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isFinalStage) {
      // Smoothly reveal tagline after "design" glides left
      timer = setTimeout(() => {
        setShowTagline(true);
      }, 400);

      // Dwell on final state for 8 seconds, then seamlessly loop
      const resetTimer = setTimeout(() => {
        setShowTagline(false);
        setTimeout(() => {
          setIsFinalStage(false);
          setWordIndex(0);
          setDisplayedPrefix('');
          setIsDeleting(false);
        }, 500);
      }, 8000);

      return () => {
        clearTimeout(timer);
        clearTimeout(resetTimer);
      };
    }

    const currentTargetWord = PREFIX_WORDS[wordIndex];

    if (!isDeleting) {
      // Typing phase
      if (displayedPrefix.length < currentTargetWord.length) {
        timer = setTimeout(() => {
          setDisplayedPrefix(currentTargetWord.slice(0, displayedPrefix.length + 1));
        }, 70);
      } else {
        // Pause to read word
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 950);
      }
    } else {
      // Deleting phase
      if (displayedPrefix.length > 0) {
        timer = setTimeout(() => {
          setDisplayedPrefix(displayedPrefix.slice(0, -1));
        }, 40);
      } else {
        // Word completely deleted
        if (wordIndex < PREFIX_WORDS.length - 1) {
          setWordIndex((prev) => prev + 1);
          setIsDeleting(false);
        } else {
          // All words completed: enter final smooth glide stage
          setIsFinalStage(true);
        }
      }
    }

    return () => clearTimeout(timer);
  }, [displayedPrefix, isDeleting, wordIndex, isFinalStage]);

  return (
    <div className="h-6 sm:h-7 md:h-[31px] flex items-center justify-start sm:justify-center select-none overflow-hidden">
      <div className="inline-flex items-center justify-start sm:justify-center transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]">
        {/* Animated Prefix container with smooth width collapse */}
        <div
          className="overflow-hidden whitespace-nowrap flex items-center justify-start sm:justify-end transition-all duration-800 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{
            maxWidth: isFinalStage ? '0px' : '140px',
            opacity: isFinalStage ? 0 : 1,
            marginRight: isFinalStage ? '0px' : '8px',
          }}
        >
          <span className="font-serif italic text-sm sm:text-lg md:text-[20px] text-[#2e3137]/90 leading-none">
            {displayedPrefix}
          </span>
          {/* Typographic blinking cursor bar - aligned with text baseline */}
          {!isFinalStage && (
            <span
              className="inline-block w-[1.5px] md:w-[1.7px] h-[1.15em] bg-[#6c1e17] ml-1 md:ml-1.5 align-middle transition-opacity animate-pulse shrink-0"
              style={{ verticalAlign: '-0.15em' }}
            />
          )}
        </div>

        {/* The Anchor Word "design" with silky smooth translation */}
        <span
          className="text-sm sm:text-lg md:text-[20px] font-bold text-[#6c1e17] lowercase leading-none shrink-0 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
        >
          design
        </span>

        {/* The Revealed Subtitle after "design" glides left */}
        <div
          className="overflow-hidden whitespace-nowrap flex items-center transition-all duration-800 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{
            maxWidth: isFinalStage && showTagline ? '520px' : '0px',
            opacity: isFinalStage && showTagline ? 1 : 0,
            transform: isFinalStage && showTagline ? 'translateX(0)' : 'translateX(10px)',
            marginLeft: isFinalStage && showTagline ? '8px' : '0px',
          }}
        >
          <span className="text-[#6c1e17] font-bold mr-1.5 sm:mr-2 md:mr-2 text-xs sm:text-sm md:text-sm">·</span>
          <span className="text-xs sm:text-base md:text-[20px] font-normal text-[#2e3137]/90 tracking-tight lowercase leading-none">
            i make information look interesting
          </span>
        </div>
      </div>
    </div>
  );
};
