import React from 'react';

interface BrandMarkProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  interactive?: boolean;
}

export const BrandMark: React.FC<BrandMarkProps> = ({
  className = '',
  size = 'md',
  interactive = true,
}) => {
  const dimensions = {
    sm: { width: 140, height: 50 },
    md: { width: 220, height: 78 },
    lg: { width: 300, height: 106 },
    xl: { width: 420, height: 148 },
  }[size];

  return (
    <div
      className={`inline-flex items-center justify-center relative transition-transform duration-300 ${
        interactive ? 'hover:scale-[1.02]' : ''
      } ${className}`}
      aria-label="Símbolo de identidade visual de Gabriella Sales: sol âmbar e ondas cobalto"
    >
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox="0 0 300 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        <defs>
          <clipPath id="sun-horizon-clip">
            <rect x="0" y="0" width="300" height="55" />
          </clipPath>
        </defs>

        {/* Sol Âmbar (Half sun rising over the horizontal baseline) */}
        <g clipPath="url(#sun-horizon-clip)">
          <path
            d="M 50 55 A 25 25 0 0 1 100 55 Z"
            fill="#efa642"
            className="transition-transform duration-300 origin-[75px_55px]"
          />
        </g>

        {/* Ondas Cobalto Contínuas (Alternating wave ribbon matching image.png exactly) */}
        {/*
          Baseline is y=55.
          1. Bowl under the sun (starts at x=44, scoops down to y=85, reaches x=110 at y=55)
          2. First crest (from x=110, arches up to y=33, reaches x=176 at y=55)
          3. Second dip (from x=176, scoops down to y=73, reaches x=224 at y=55)
          4. Right dominant crest (from x=224, arches up to y=23, reaches x=280 at y=55)
        */}
        {/* Scoop 1 (under sun) */}
        <path
          d="M 44 55
             C 44 76, 60 85, 77 85
             C 94 85, 110 76, 110 55
             Z"
          fill="#244287"
        />

        {/* Crest 1 */}
        <path
          d="M 110 55
             C 110 38, 126 33, 143 33
             C 160 33, 176 38, 176 55
             Z"
          fill="#244287"
        />

        {/* Dip 2 */}
        <path
          d="M 176 55
             C 176 68, 190 73, 200 73
             C 210 73, 224 68, 224 55
             Z"
          fill="#244287"
        />

        {/* Crest 2 (tall right wave) */}
        <path
          d="M 224 55
             C 224 32, 242 22, 252 22
             C 265 22, 280 34, 280 55
             Z"
          fill="#244287"
        />
      </svg>
    </div>
  );
};
