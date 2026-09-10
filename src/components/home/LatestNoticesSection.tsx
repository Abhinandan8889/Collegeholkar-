import { useState } from 'react';
import { FileText, Download, Eye, ArrowRight, Sparkles, AlertCircle, Calendar } from 'lucide-react';
import { LATEST_NOTICES } from '../../data/collegeData';
import { NoticeItem, Language } from '../../types';
import { getTranslation } from '../../locales/strings';

interface LatestNoticesSectionProps {
  onSelectNotice: (notice: NoticeItem) => void;
  onDownloadNotice: (notice: NoticeItem) => void;
  onViewAllNotices: () => void;
  language: Language;
}

export function LatestNoticesSection({
  onSelectNotice,
  onDownloadNotice,
  onViewAllNotices,
  language,
}: LatestNoticesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const categories = ['All', 'Examination', 'Admission', 'Academic', 'Student'];

  const filteredNotices = LATEST_NOTICES.filter((notice) => {
    if (activeCategory === 'All') return true;
    return notice.category === activeCategory;
  }).slice(0, 4);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Examination':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-900';
      case 'Admission':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900';
      case 'Academic':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-900';
      case 'Student':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-900';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <section id="home-latest-notices" className="px-3 py-4 bg-slate-50/60 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800">
      <div className="flex items-center justify-between mb-2.5">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>{getTranslation(language, 'latestNotices')}</span>
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {language === 'hi' ? 'आधिकारिक आदेश एवं अधिसूचनाएं' : 'Official orders, circulars & announcements'}
          </p>
        </div>

        <button
          type="button"
          onClick={onViewAllNotices}
          className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
        >
          <span>{language === 'hi' ? 'सभी देखें' : 'View All'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Category Pills (Material 3 filter chips) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isSelected = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-amber-500 text-slate-950 shadow-2xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              {cat === 'All' ? getTranslation(language, 'filterAll') : cat}
            </button>
          );
        })}
      </div>

      {/* Notice Cards List */}
      <div className="space-y-2.5 mt-2">
        {filteredNotices.map((notice) => {
          const title = language === 'hi' && notice.titleHi ? notice.titleHi : notice.title;
          return (
            <div
              key={notice.id}
              className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-xs transition-all"
            >
              {/* Top Tag Row */}
              <div className="flex items-center justify-between gap-1.5 mb-1.5 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full border ${getCategoryColor(
                      notice.category
                    )}`}
                  >
                    {notice.category}
                  </span>

                  {notice.isNew && (
                    <span className="inline-flex items-center gap-0.5 text-[9.5px] font-bold px-1.5 py-0.5 rounded-full bg-rose-500 text-white animate-pulse">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>{getTranslation(language, 'newBadge')}</span>
                    </span>
                  )}

                  {notice.isImportant && (
                    <span className="inline-flex items-center gap-0.5 text-[9.5px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950">
                      <AlertCircle className="w-2.5 h-2.5" />
                      <span>{getTranslation(language, 'urgentBadge')}</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500">
                  <Calendar className="w-3 h-3" />
                  <span>{notice.date}</span>
                </div>
              </div>

              {/* Title */}
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-2 leading-relaxed mb-1">
                {title}
              </h4>

              {/* Description snippet */}
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mb-2 leading-normal">
                {language === 'hi' && notice.descriptionHi ? notice.descriptionHi : notice.description}
              </p>

              {/* Meta & Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 truncate max-w-[120px]">
                  Ref: {notice.referenceNo?.split('/')[2] || 'OFFICIAL'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectNotice(notice)}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
                  >
                    <Eye className="w-3 h-3" />
                    <span>{getTranslation(language, 'view')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onDownloadNotice(notice)}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-500 text-slate-950 hover:bg-amber-400 flex items-center gap-1 active:scale-95 transition-all cursor-pointer shadow-2xs"
                  >
                    <Download className="w-3 h-3" />
                    <span>{getTranslation(language, 'download')}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* View All Notices Bottom CTA */}
      <button
        type="button"
        onClick={onViewAllNotices}
        className="w-full mt-3 py-2 px-3 rounded-xl border border-dashed border-amber-500/50 text-amber-700 dark:text-amber-300 bg-amber-50/50 dark:bg-amber-950/20 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-amber-100/50 transition-colors cursor-pointer"
      >
        <span>{getTranslation(language, 'viewAllNotices')}</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </section>
  );
}
