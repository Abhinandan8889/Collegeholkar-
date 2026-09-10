import {
  GraduationCap,
  BellRing,
  Award,
  FileCheck,
  UserPlus,
  CalendarDays,
  BookOpenCheck,
  Building2,
  Library,
  Laptop,
  Sparkles,
  PhoneCall,
} from 'lucide-react';
import { QUICK_ACCESS_ITEMS } from '../../data/collegeData';
import { TabType, Language } from '../../types';

interface QuickAccessGridProps {
  onNavigateTab: (tab: TabType, subSection?: string) => void;
  language: Language;
}

export function QuickAccessGrid({ onNavigateTab, language }: QuickAccessGridProps) {
  // Mapping string names to Lucide icons
  const iconMap: Record<string, typeof GraduationCap> = {
    GraduationCap,
    BellRing,
    Award,
    FileCheck,
    UserPlus,
    CalendarDays,
    BookOpenCheck,
    Building2,
    Library,
    Laptop,
    Sparkles,
    PhoneCall,
  };

  const colorVariants: Record<string, { bg: string; iconColor: string; border: string }> = {
    indigo: {
      bg: 'bg-indigo-50 dark:bg-indigo-950/40',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      border: 'border-indigo-200/60 dark:border-indigo-800/40',
    },
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-950/40',
      iconColor: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-200/60 dark:border-blue-800/40',
    },
    amber: {
      bg: 'bg-amber-50 dark:bg-amber-950/40',
      iconColor: 'text-amber-600 dark:text-amber-400',
      border: 'border-amber-200/60 dark:border-amber-800/40',
    },
    rose: {
      bg: 'bg-rose-50 dark:bg-rose-950/40',
      iconColor: 'text-rose-600 dark:text-rose-400',
      border: 'border-rose-200/60 dark:border-rose-800/40',
    },
    emerald: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      border: 'border-emerald-200/60 dark:border-emerald-800/40',
    },
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-950/40',
      iconColor: 'text-purple-600 dark:text-purple-400',
      border: 'border-purple-200/60 dark:border-purple-800/40',
    },
    teal: {
      bg: 'bg-teal-50 dark:bg-teal-950/40',
      iconColor: 'text-teal-600 dark:text-teal-400',
      border: 'border-teal-200/60 dark:border-teal-800/40',
    },
    cyan: {
      bg: 'bg-cyan-50 dark:bg-cyan-950/40',
      iconColor: 'text-cyan-600 dark:text-cyan-400',
      border: 'border-cyan-200/60 dark:border-cyan-800/40',
    },
    orange: {
      bg: 'bg-orange-50 dark:bg-orange-950/40',
      iconColor: 'text-orange-600 dark:text-orange-400',
      border: 'border-orange-200/60 dark:border-orange-800/40',
    },
    violet: {
      bg: 'bg-violet-50 dark:bg-violet-950/40',
      iconColor: 'text-violet-600 dark:text-violet-400',
      border: 'border-violet-200/60 dark:border-violet-800/40',
    },
    fuchsia: {
      bg: 'bg-fuchsia-50 dark:bg-fuchsia-950/40',
      iconColor: 'text-fuchsia-600 dark:text-fuchsia-400',
      border: 'border-fuchsia-200/60 dark:border-fuchsia-800/40',
    },
    stone: {
      bg: 'bg-slate-50 dark:bg-slate-800/40',
      iconColor: 'text-slate-600 dark:text-slate-400',
      border: 'border-slate-200/60 dark:border-slate-700/40',
    },
  };

  return (
    <section id="home-quick-access" className="px-3 py-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {language === 'hi' ? 'त्वरित सेवाएं एवं लिंक' : 'Quick Access Hub'}
        </h3>
        <span className="text-[10px] font-medium text-amber-600 dark:text-amber-400">
          {QUICK_ACCESS_ITEMS.length} Portals
        </span>
      </div>

      {/* 4-column responsive grid on mobile */}
      <div className="grid grid-cols-4 gap-2">
        {QUICK_ACCESS_ITEMS.map((item) => {
          const Icon = iconMap[item.icon] || GraduationCap;
          const styles = colorVariants[item.color] || colorVariants.stone;
          const label = language === 'hi' ? item.labelHi : item.label;

          return (
            <button
              key={item.id}
              id={`quick-action-${item.id}`}
              type="button"
              onClick={() => onNavigateTab(item.targetTab as TabType, item.id)}
              className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 shadow-2xs hover:shadow-sm active:scale-95 transition-all text-center group cursor-pointer"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1.5 border transition-transform group-hover:scale-110 ${styles.bg} ${styles.border}`}
              >
                <Icon className={`w-5 h-5 ${styles.iconColor} stroke-[2.2]`} />
              </div>
              <span className="text-[10.5px] font-medium text-slate-700 dark:text-slate-300 leading-tight line-clamp-2 px-0.5">
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
