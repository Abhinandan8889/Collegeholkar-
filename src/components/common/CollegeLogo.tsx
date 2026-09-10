interface CollegeLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
}

export function CollegeLogo({ size = 'md', className = '', showText = false }: CollegeLogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div
        className={`relative ${sizeClasses[size]} shrink-0 rounded-full bg-gradient-to-br from-amber-700 via-amber-800 to-amber-950 p-0.5 shadow-md ring-2 ring-amber-400/40 flex items-center justify-center`}
      >
        {/* Inner SVG Emblem representing Holkar Science College heritage & scientific temper */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full rounded-full bg-slate-900"
          aria-hidden="true"
        >
          {/* Outer ring with golden stars */}
          <circle cx="50" cy="50" r="46" fill="none" stroke="#D97706" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="40" fill="#0F172A" />
          
          {/* Sun rays / knowledge halo */}
          <g stroke="#F59E0B" strokeWidth="1.2" opacity="0.6">
            <line x1="50" y1="12" x2="50" y2="18" />
            <line x1="50" y1="82" x2="50" y2="88" />
            <line x1="12" y1="50" x2="18" y2="50" />
            <line x1="82" y1="50" x2="88" y2="50" />
            <line x1="23" y1="23" x2="28" y2="28" />
            <line x1="77" y1="77" x2="72" y2="72" />
            <line x1="23" y1="77" x2="28" y2="72" />
            <line x1="77" y1="23" x2="72" y2="28" />
          </g>

          {/* Central Science & Knowledge Symbolism: Atom orbits & Microscope & Flame */}
          <ellipse cx="50" cy="50" rx="22" ry="8" fill="none" stroke="#38BDF8" strokeWidth="1.5" transform="rotate(30 50 50)" />
          <ellipse cx="50" cy="50" rx="22" ry="8" fill="none" stroke="#38BDF8" strokeWidth="1.5" transform="rotate(-30 50 50)" />
          
          {/* Center Torch of Learning / Science Flask */}
          <path d="M46 58 L54 58 L52 44 L48 44 Z" fill="#FBBF24" />
          <path d="M50 34 C47 38, 47 41, 50 43 C53 41, 53 38, 50 34 Z" fill="#EF4444" />
          
          {/* Microscope Base */}
          <path d="M42 66 L58 66 L55 60 L45 60 Z" fill="#94A3B8" />
          
          {/* Open Book of Knowledge */}
          <path d="M34 68 Q50 63 50 71 Q50 63 66 68 Q50 74 34 68 Z" fill="#F8FAFC" />

          {/* Established Year */}
          <text x="50" y="80" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#FDE68A" fontFamily="sans-serif">
            ESTD 1891
          </text>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col text-left leading-tight">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Model, Autonomous
          </span>
          <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Govt. Holkar Science College
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            Indore, Madhya Pradesh
          </span>
        </div>
      )}
    </div>
  );
}
