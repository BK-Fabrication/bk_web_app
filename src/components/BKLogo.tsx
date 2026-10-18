import React from 'react';

interface BKLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'icon' | 'full' | 'compact';
  lightText?: boolean;
}

export const BKLogo: React.FC<BKLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'icon',
  lightText = false,
}) => {
  const iconDimensions = {
    sm: { w: 42, h: 28 },
    md: { w: 60, h: 40 },
    lg: { w: 84, h: 56 },
    xl: { w: 120, h: 80 },
  }[size];

  // SVG representation of the exact BK logo from the image:
  // Solid orange container (#f58220 / #ea580c),
  // Bold "B" and "K", upper half dark charcoal (#1e293b / #0f172a),
  // lower half white (#ffffff), sliced through by a dynamic tapered diagonal slash.
  const LogoIcon = (
    <div
      style={{ width: iconDimensions.w, height: iconDimensions.h }}
      className="relative shrink-0 rounded-sm overflow-hidden shadow-xs select-none"
    >
      <svg
        viewBox="0 0 120 80"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Linear gradient for rich industrial orange */}
          <linearGradient id="bkOrangeBg" x1="0" y1="0" x2="120" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f97316" />
            <stop offset="1" stopColor="#ea580c" />
          </linearGradient>

          {/* Clip path for upper portion (above the diagonal slash) */}
          <clipPath id="upperHalfClip">
            <polygon points="0,0 120,0 120,38 80,48 0,68" />
          </clipPath>

          {/* Clip path for lower portion (below the diagonal slash) */}
          <clipPath id="lowerHalfClip">
            <polygon points="0,72 80,52 120,42 120,80 0,80" />
          </clipPath>
        </defs>

        {/* Orange Brand Background */}
        <rect width="120" height="80" fill="url(#bkOrangeBg)" rx="4" />

        {/* Subtle inner metallic highlight on top border */}
        <line x1="0" y1="1" x2="120" y2="1" stroke="#ffedd5" strokeOpacity="0.4" strokeWidth="1.5" />

        {/* --- Upper Layer (Charcoal #1e293b) with upperHalfClip --- */}
        <g clipPath="url(#upperHalfClip)">
          {/* Letter B */}
          <path
            d="M 22 14 L 46 14 C 54 14 59 18 59 25 C 59 30 56 33 50 35 C 57 37 60 42 60 50 C 60 58 54 66 45 66 L 22 66 Z M 35 24 L 35 34 L 44 34 C 47 34 49 32 49 29 C 49 26 47 24 44 24 Z M 35 44 L 35 56 L 45 56 C 48 56 50 53 50 50 C 50 47 48 44 45 44 Z"
            fill="#1e293b"
          />
          {/* Letter K */}
          <path
            d="M 64 14 L 77 14 L 77 34 L 92 14 L 108 14 L 88 38 L 109 66 L 93 66 L 77 44 L 77 66 L 64 66 Z"
            fill="#1e293b"
          />
        </g>

        {/* --- Lower Layer (Pure White #ffffff) with lowerHalfClip --- */}
        <g clipPath="url(#lowerHalfClip)">
          {/* Letter B */}
          <path
            d="M 22 14 L 46 14 C 54 14 59 18 59 25 C 59 30 56 33 50 35 C 57 37 60 42 60 50 C 60 58 54 66 45 66 L 22 66 Z M 35 24 L 35 34 L 44 34 C 47 34 49 32 49 29 C 49 26 47 24 44 24 Z M 35 44 L 35 56 L 45 56 C 48 56 50 53 50 50 C 50 47 48 44 45 44 Z"
            fill="#ffffff"
          />
          {/* Letter K */}
          <path
            d="M 64 14 L 77 14 L 77 34 L 92 14 L 108 14 L 88 38 L 109 66 L 93 66 L 77 44 L 77 66 L 64 66 Z"
            fill="#ffffff"
          />
        </g>

        {/* Dynamic diagonal swoosh streak in white highlight tapering to the right */}
        <path
          d="M 8 72 Q 55 58 116 38 Q 65 52 14 69 Z"
          fill="#ffedd5"
          opacity="0.95"
        />
      </svg>
    </div>
  );

  if (variant === 'icon') {
    return <div className={`inline-flex items-center ${className}`}>{LogoIcon}</div>;
  }

  return (
    <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
      {LogoIcon}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5">
          <span
            className={`font-black tracking-tight leading-none ${
              size === 'lg' ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'
            } ${lightText ? 'text-white' : 'text-slate-900'}`}
          >
            B K FABRICATION
          </span>
        </div>
        <span
          style={{ fontFamily: 'Georgia, Cambria, serif' }}
          className="text-xs sm:text-sm italic font-normal tracking-wide text-orange-600 dark:text-orange-400 mt-0.5"
        >
          A Work of Perfect Design
        </span>
      </div>
    </div>
  );
};
