import { CollegeLogo } from '../common/CollegeLogo';
import { COLLEGE_INFO } from '../../data/collegeData';
import { Language } from '../../types';
import { getTranslation } from '../../locales/strings';
import { Globe, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onOpenExternalLink: (url: string, title: string) => void;
  language: Language;
}

export function Footer({ onOpenExternalLink, language }: FooterProps) {
  return (
    <footer
      id="college-footer"
      className="px-4 pt-6 pb-8 bg-slate-900 text-slate-400 text-xs border-t border-slate-800"
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <CollegeLogo size="lg" />

        <div>
          <h4 className="text-xs font-bold text-white tracking-wide">
            {language === 'hi' ? COLLEGE_INFO.nameHi : COLLEGE_INFO.nameEn}
          </h4>
          <p className="text-[11px] text-amber-400 font-medium mt-0.5">
            {COLLEGE_INFO.city} • ESTD. {COLLEGE_INFO.establishedYear}
          </p>
          <p className="text-[10px] text-slate-500 max-w-xs mx-auto mt-1">
            {COLLEGE_INFO.address}
          </p>
        </div>

        {/* Accreditations Badges */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 py-1">
          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-slate-800 text-emerald-400 border border-slate-700">
            NAAC A++ (CGPA 3.64)
          </span>
          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-slate-800 text-amber-400 border border-slate-700">
            Model Autonomous
          </span>
          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-slate-800 text-sky-400 border border-slate-700">
            DAVV Affiliated
          </span>
        </div>

        {/* Official Links & Social handles */}
        <div className="flex items-center gap-3 text-slate-400 text-[11px] pt-1">
          <button
            type="button"
            onClick={() => onOpenExternalLink('https://collegeholkar.org', 'Official Portal')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Official Website
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => onOpenExternalLink('https://dauniv.ac.in', 'DAVV University')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            DAVV Indore
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => onOpenExternalLink('https://mponline.gov.in', 'MPOnline')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            MPOnline
          </button>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-3 border-t border-slate-800/80 w-full text-slate-500 text-[10px] space-y-1">
          <p>{getTranslation(language, 'footerCopyright')}</p>
          <p className="flex items-center justify-center gap-1 text-[9.5px]">
            <span>Designed for Android Mobile • Department of Higher Education MP</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
