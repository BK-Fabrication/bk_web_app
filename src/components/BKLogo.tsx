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
    sm: { w: 68, h: 28 },
    md: { w: 92, h: 38 },
    lg: { w: 120, h: 50 },
    xl: { w: 154, h: 64 },
  }[size];

  const LogoIcon = (
    <div
      style={{ width: iconDimensions.w, height: iconDimensions.h }}
      className="relative shrink-0 rounded-xs overflow-hidden select-none shadow-2xs group-hover:opacity-95 transition-opacity"
    >
      <img
        src="/assets/images/bk_logo.png"
        alt="BK Fabrication Logo"
        className="w-full h-full object-cover"
        loading="eager"
      />
    </div>
  );

  if (variant === 'icon') {
    return <div className={`inline-flex items-center ${className}`}>{LogoIcon}</div>;
  }

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
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
