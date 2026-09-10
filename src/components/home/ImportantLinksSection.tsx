import { ExternalLink, Globe, Shield, BookMarked, Landmark } from 'lucide-react';
import { IMPORTANT_LINKS } from '../../data/collegeData';
import { ImportantLinkItem, Language } from '../../types';
import { getTranslation } from '../../locales/strings';

interface ImportantLinksSectionProps {
  onSelectLink: (link: ImportantLinkItem) => void;
  language: Language;
}

export function ImportantLinksSection({ onSelectLink, language }: ImportantLinksSectionProps) {
  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Portals':
        return Globe;
      case 'Student Services':
        return Shield;
      case 'Academic Resources':
        return BookMarked;
      default:
        return Landmark;
    }
  };

  return (
    <section id="home-important-links" className="px-3 py-4 bg-slate-50/60 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800">
      <div className="mb-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
          <Globe className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>{getTranslation(language, 'importantLinks')}</span>
        </h3>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          {language === 'hi' ? 'उच्च शिक्षा, विश्वविद्यालय एवं राष्ट्रीय शैक्षणिक पोर्टल्स' : 'Government, University & National Education Portals'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {IMPORTANT_LINKS.map((item) => {
          const Icon = getCategoryIcon(item.category);
          const title = language === 'hi' && item.titleHi ? item.titleHi : item.title;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectLink(item)}
              className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-left shadow-2xs hover:shadow-xs hover:border-amber-400/60 active:scale-98 transition-all flex items-center justify-between gap-2.5 cursor-pointer group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 shrink-0 group-hover:bg-amber-100 group-hover:text-amber-900 dark:group-hover:bg-amber-950 dark:group-hover:text-amber-300 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {title}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {item.category} • {item.description}
                  </div>
                </div>
              </div>

              <div className="w-6 h-6 rounded-full flex items-center justify-center text-slate-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 shrink-0">
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
