import { useState } from 'react';

interface CollegeLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
}

export function CollegeLogo({ size = 'md', className = '', showText = false }: CollegeLogoProps) {
  const [imgErrorStep, setImgErrorStep] = useState(0);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24 sm:w-28 sm:h-28',
  };

  // Image source resolution fallback chain
  const imageSources = [
    '/assets/aistudio/logoupdated.png',
    '/assets/aistudio/logoupdated.jpg',
    'https://collegeholkar.org/hscimgs/logoupdated.jpg',
  ];

  const handleImageError = () => {
    if (imgErrorStep < imageSources.length - 1) {
      setImgErrorStep((prev) => prev + 1);
    } else {
      setImgErrorStep(imageSources.length); // Trigger SVG vector fallback
    }
  };

  const currentSrc = imgErrorStep < imageSources.length ? imageSources[imgErrorStep] : null;

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <div
        className={`relative ${sizeClasses[size]} shrink-0 rounded-full overflow-hidden bg-white p-0.5 shadow-xs ring-1.5 ring-amber-400/60 dark:ring-amber-500/50 flex items-center justify-center`}
      >
        {currentSrc ? (
          <img
            src={currentSrc}
            alt="Govt. Holkar (Model, Autonomous) Science College, Indore Logo"
            className="w-full h-full object-contain rounded-full select-none"
            referrerPolicy="no-referrer"
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          /* High-fidelity Vector Fallback matching the authentic college seal */
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full rounded-full bg-white select-none"
            aria-hidden="true"
          >
            {/* Outer Royal Purple Ring */}
            <circle cx="50" cy="50" r="48" fill="#7A0064" stroke="#D97706" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="38" fill="#FFFFFF" />
            
            {/* Circular text path for College Name */}
            <path id="logoTextPath" d="M 18,50 A 32,32 0 1,1 82,50" fill="none" />
            <text fill="#FFFFFF" fontSize="6.5" fontWeight="bold" textAnchor="middle">
              <textPath href="#logoTextPath" startOffset="50%">
                शा. होल्कर विज्ञान महाविद्यालय
              </textPath>
            </text>

            {/* Inner Shield */}
            <path
              d="M36 34 Q50 30 64 34 L64 56 Q50 68 36 56 Z"
              fill="#1E7E34"
              stroke="#E65100"
              strokeWidth="1.5"
            />
            {/* Lamp of Learning & Knowledge Rays */}
            <circle cx="50" cy="40" r="4" fill="#FBBF24" />
            <line x1="50" y1="44" x2="50" y2="52" stroke="#B91C1C" strokeWidth="2" />
            {/* Open Book */}
            <path d="M42 54 Q50 51 50 56 Q50 51 58 54 Q50 58 42 54 Z" fill="#FFFFFF" />

            {/* Bottom Motto Banner */}
            <rect x="28" y="66" width="44" height="9" rx="4.5" fill="#15803D" />
            <text x="50" y="72.5" textAnchor="middle" fontSize="4.5" fontWeight="bold" fill="#FFFFFF">
              तमसो मा ज्योतिर्गमय
            </text>

            {/* Established Year */}
            <text x="50" y="83" textAnchor="middle" fontSize="5.5" fontWeight="bold" fill="#991B1B">
              Estd. 1891
            </text>
          </svg>
        )}
      </div>

      {showText && (
        <div className="flex flex-col text-left leading-tight">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Model, Autonomous
          </span>
          <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
            Govt. Holkar Science College
          </span>
          <span className="text-[10.5px] text-slate-500 dark:text-slate-400">
            Indore, Madhya Pradesh
          </span>
        </div>
      )}
    </div>
  );
}
