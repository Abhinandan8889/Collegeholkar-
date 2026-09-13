import { MapPin, Image as ImageIcon, Sparkles, Navigation, Calendar, Award } from 'lucide-react';
import { CAMPUS_TOUR_LANDMARKS } from '../../data/moreSectionsData';
import { Language } from '../../types';

interface CampusTourViewProps {
  language: Language;
  onShowToast?: (message: string) => void;
}

export function CampusTourView({ language, onShowToast }: CampusTourViewProps) {
  return (
    <div className="min-h-screen pb-24 space-y-3">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-amber-700 via-stone-800 to-slate-950 text-white shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <MapPin className="w-5 h-5 text-amber-300" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-200">
            Heritage & Modern Infrastructure
          </span>
        </div>
        <h2 className="text-base sm:text-lg font-extrabold tracking-tight">
          {language === 'hi' ? 'परिसर दर्शन एवं ऐतिहासिक स्थल' : 'Campus Landmarks & Photo Gallery'}
        </h2>
        <p className="text-xs text-amber-100 mt-0.5">
          34-Acre lush green campus with heritage colonial architecture founded in 1891
        </p>
      </div>

      <div className="p-3 max-w-md mx-auto space-y-3">
        {/* Historical Significance Banner */}
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-300 dark:border-amber-800 text-xs space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-200">
            <Award className="w-4 h-4 text-amber-600" />
            <span>Over 135 Years of Academic Heritage</span>
          </div>
          <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">
            Established on 10 June 1891 by His Highness Maharaja Shivaji Rao Holkar Bahadur, the campus harmoniously merges classical red-brick British-Indian architecture with contemporary high-tech DST-FIST science laboratories.
          </p>
        </div>

        {/* Landmarks Cards */}
        <div className="space-y-3">
          {CAMPUS_TOUR_LANDMARKS.map((item, idx) => {
            const title = language === 'hi' && item.titleHi ? item.titleHi : item.title;
            return (
              <div
                key={idx}
                className="rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-2.5"
              >
                <div className="relative h-44 w-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-black/60 backdrop-blur-xs text-white border border-white/20">
                    {item.tag}
                  </span>
                </div>

                <div className="p-3.5 pt-0 space-y-1">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                    {title}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation / Map info */}
        <div className="p-4 rounded-3xl bg-slate-900 text-white space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-amber-400">Visitor Directions</span>
            <Navigation className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Located strategically in Bhawarkuan, A.B. Road, Indore (MP), easily accessible from Indore Junction Railway Station (4.2 km) and Devi Ahilya Bai Holkar International Airport (11.5 km).
          </p>
          <button
            type="button"
            onClick={() => onShowToast && onShowToast('Opening Google Maps location for Holkar Science College...')}
            className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs mt-1"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Open in Google Maps Navigation</span>
          </button>
        </div>
      </div>
    </div>
  );
}
