import React from 'react';

interface BakeryLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  className?: string;
}

export const BakeryLogo: React.FC<BakeryLogoProps> = ({
  size = 'md',
  className = '',
}) => {
  const sizeMap = {
    xs: 'w-8 h-8',
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36',
    hero: 'w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-56 lg:h-56 max-w-[min(224px,25vh)] max-h-[min(224px,25vh)] aspect-square',
  };

  const dimensionClass = sizeMap[size] || sizeMap.md;
  const bronzeColor = "#A87B4C";

  return (
    <div className={`rounded-full flex items-center justify-center shrink-0 bg-[#F8F1E5] ${dimensionClass} ${className} relative isolate overflow-hidden`}>
      <svg 
        viewBox="0 0 120 120" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10"
      >
        <defs>
          <style>
            {`
              @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap');
              .monogram-ml {
                font-family: 'Cormorant Garamond', 'Playfair Display', serif;
                font-size: 47px;
                font-weight: 500;
                letter-spacing: -0.01em;
              }
            `}
          </style>
        </defs>

        {/* Outer Solid Ring */}
        <circle cx="60" cy="60" r="54" stroke={bronzeColor} strokeWidth="0.8" />
        
        {/* Dashed Ring */}
        <circle cx="60" cy="60" r="48" stroke={bronzeColor} strokeWidth="0.6" strokeDasharray="1.5 3.5" />
        
        {/* Diamonds at compass points */}
        <path d="M60 10 L61.5 12 L60 14 L58.5 12 Z" fill={bronzeColor} />
        <path d="M60 106 L61.5 108 L60 110 L58.5 108 Z" fill={bronzeColor} />
        <path d="M10 60 L12 58.5 L14 60 L12 61.5 Z" fill={bronzeColor} />
        <path d="M106 60 L108 58.5 L110 60 L108 61.5 Z" fill={bronzeColor} />

        {/* Inner Double Rings */}
        <circle cx="60" cy="60" r="39" stroke={bronzeColor} strokeWidth="1" />
        <circle cx="60" cy="60" r="37.2" stroke={bronzeColor} strokeWidth="0.3" />
        
        {/* Clean ML Monogram - Optically centered with equal horizontal clearance */}
        <text 
          x="49.5%" 
          y="50.8%" 
          dominantBaseline="central" 
          textAnchor="middle" 
          className="monogram-ml" 
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '47px' }}
          fill={bronzeColor}
        >
          ML
        </text>
      </svg>
    </div>
  );
};
