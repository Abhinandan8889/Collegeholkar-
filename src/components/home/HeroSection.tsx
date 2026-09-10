import { useState } from 'react';
import { Award, Landmark, MapPin, Sparkles, Image as ImageIcon } from 'lucide-react';
import { COLLEGE_INFO } from '../../data/collegeData';
import { Language } from '../../types';

interface HeroSectionProps {
  language: Language;
  onExploreAcademics: () => void;
  onViewNotices: () => void;
}

export function HeroSection({
  language,
  onExploreAcademics,
  onViewNotices,
}: HeroSectionProps) {
  // Configurable campus banner image with fallback to a dignified academic facade
  const [heroImage] = useState<string>(
    'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80'
  );

  return (
    <section id="home-hero-section" className="relative overflow-hidden">
      {/* Background Banner with Gradient Overlay */}
      <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-900">
        <img
          src={heroImage}
          alt="Holkar Science College Campus Building"
          className="w-full h-full object-cover object-center opacity-45 transform scale-105 transition-transform duration-700 hover:scale-100"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/40" />

        {/* Top Floating Badge Bar */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/85 backdrop-blur-md border border-amber-500/30 text-amber-300 text-[10px] font-semibold shadow-xs">
            <Landmark className="w-3 h-3 text-amber-400" />
            <span>ESTD. 1891 • {COLLEGE_INFO.founder.split(' ')[0]} {COLLEGE_INFO.founder.split(' ')[1]}</span>
          </div>

          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/85 backdrop-blur-md border border-emerald-500/30 text-emerald-300 text-[10px] font-bold shadow-xs">
            <Award className="w-3 h-3 text-emerald-400" />
            <span>NAAC A++ (3.64)</span>
          </div>
        </div>

        {/* Hero Copy Container */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center gap-1 text-[11px] text-amber-400 font-medium mb-1">
            <Sparkles className="w-3 h-3" />
            <span>{language === 'hi' ? 'शासकीय आदर्श स्वशासी महाविद्यालय' : 'Autonomous & Model Science Institute'}</span>
          </div>

          <h2 className="text-base sm:text-lg font-extrabold tracking-tight leading-snug drop-shadow-sm">
            {language === 'hi'
              ? 'शासकीय होल्कर विज्ञान महाविद्यालय, इंदौर'
              : 'Government Holkar (Model, Autonomous) Science College, Indore'}
          </h2>

          <div className="flex items-center gap-1 text-slate-300 text-[11px] mt-1">
            <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
            <span className="truncate">{COLLEGE_INFO.address}</span>
          </div>
        </div>
      </div>

      {/* Hero Quick Highlight Stats Bar (Material 3 Surface Container) */}
      <div className="bg-slate-100 dark:bg-slate-800/90 px-3 py-2.5 border-b border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-4 gap-1.5 text-center">
          <div className="p-1 rounded-lg bg-white dark:bg-slate-900 shadow-2xs border border-slate-200/60 dark:border-slate-700/60">
            <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Legacy</div>
            <div className="text-xs font-bold text-amber-600 dark:text-amber-400">135+ Yrs</div>
          </div>
          <div className="p-1 rounded-lg bg-white dark:bg-slate-900 shadow-2xs border border-slate-200/60 dark:border-slate-700/60">
            <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Students</div>
            <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400">12,000+</div>
          </div>
          <div className="p-1 rounded-lg bg-white dark:bg-slate-900 shadow-2xs border border-slate-200/60 dark:border-slate-700/60">
            <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Science</div>
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">15+ Depts</div>
          </div>
          <div className="p-1 rounded-lg bg-white dark:bg-slate-900 shadow-2xs border border-slate-200/60 dark:border-slate-700/60">
            <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Campus</div>
            <div className="text-xs font-bold text-sky-600 dark:text-sky-400">34 Acres</div>
          </div>
        </div>

        {/* Quick Direct Action CTA Buttons */}
        <div className="flex items-center gap-2 mt-2.5">
          <button
            type="button"
            onClick={onExploreAcademics}
            className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 flex items-center justify-center gap-1.5 active:scale-98 transition-all cursor-pointer shadow-xs"
          >
            <span>{language === 'hi' ? 'पाठ्यक्रम एवं विभाग' : 'Explore Academics'}</span>
          </button>
          <button
            type="button"
            onClick={onViewNotices}
            className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold bg-amber-100 text-amber-900 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-300/40 dark:border-amber-700/40 flex items-center justify-center gap-1.5 active:scale-98 transition-all cursor-pointer"
          >
            <span>{language === 'hi' ? 'नवीनतम सूचनाएं' : 'Latest Circulars'}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
