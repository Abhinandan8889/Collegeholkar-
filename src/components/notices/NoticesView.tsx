import { useState, useMemo } from 'react';
import {
  Bell,
  Search,
  Filter,
  ArrowUpDown,
  FileText,
  Calendar,
  Download,
  Share2,
  Eye,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { NoticeItem, Language } from '../../types';
import { getTranslation } from '../../locales/strings';
import { useDatabase } from '../../context/DatabaseContext';

interface NoticesViewProps {
  onSelectNotice: (notice: NoticeItem) => void;
  onDownloadNotice: (notice: NoticeItem) => void;
  language: Language;
  onShowToast?: (message: string) => void;
}

export function NoticesView({
  onSelectNotice,
  onDownloadNotice,
  language,
  onShowToast,
}: NoticesViewProps) {
  const { notices } = useDatabase();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'latest' | 'important'>('latest');

  const categories = ['All', 'Examination', 'Admission', 'Academic', 'Student', 'General'];

  const filteredNotices = useMemo(() => {
    return notices.filter((notice) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        notice.title.toLowerCase().includes(q) ||
        (notice.titleHi && notice.titleHi.includes(q)) ||
        notice.description.toLowerCase().includes(q) ||
        (notice.referenceNo && notice.referenceNo.toLowerCase().includes(q));

      const matchesCat =
        selectedCategory === 'All' || notice.category === selectedCategory;

      return matchesSearch && matchesCat;
    }).sort((a, b) => {
      if (sortBy === 'important') {
        if (a.isImportant && !b.isImportant) return -1;
        if (!a.isImportant && b.isImportant) return 1;
      }
      return 0; // Default matches order in dataset
    });
  }, [searchQuery, selectedCategory, sortBy]);

  const handleShare = (notice: NoticeItem) => {
    if (navigator.share) {
      navigator
        .share({
          title: notice.title,
          text: notice.description,
          url: notice.fileUrl || window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard?.writeText(`${notice.title}\n${notice.fileUrl || ''}`);
      if (onShowToast) {
        onShowToast('Notice link & reference copied to clipboard!');
      }
    }
  };

  return (
    <div id="notices-view" className="min-h-screen pb-20">
      {/* Notices Header */}
      <div className="p-4 bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-950 text-white shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <Bell className="w-5 h-5 text-amber-400" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-200">
            Official Bulletin Board
          </span>
        </div>
        <h2 className="text-base sm:text-lg font-extrabold tracking-tight">
          {language === 'hi' ? 'महाविद्यालयीन अधिसूचनाएं एवं आदेश' : 'Notices & Circulars'}
        </h2>
        <p className="text-xs text-blue-100 mt-0.5">
          Verified dispatch orders from the Principal & Examination Office
        </p>
      </div>

      {/* Search and Sort Toolbar */}
      <div className="p-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 space-y-2 sticky top-14 z-20 shadow-2xs">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search circulars by keyword or dispatch no..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <button
            type="button"
            onClick={() => setSortBy(sortBy === 'latest' ? 'important' : 'latest')}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 border transition-colors cursor-pointer ${
              sortBy === 'important'
                ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-700'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
            }`}
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{sortBy === 'important' ? 'Priority' : 'Latest'}</span>
          </button>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cat === 'All' ? getTranslation(language, 'filterAll') : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Notices List */}
      <div className="p-3 space-y-2.5">
        {filteredNotices.length === 0 ? (
          <div className="py-12 text-center text-slate-400">
            <FileText className="w-8 h-8 mx-auto mb-2 text-slate-300 dark:text-slate-700" />
            <p className="text-xs font-semibold">No notices matching your criteria</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-2 text-xs text-amber-600 dark:text-amber-400 font-bold underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        ) : (
          filteredNotices.map((notice) => {
            const title = language === 'hi' && notice.titleHi ? notice.titleHi : notice.title;
            const desc = language === 'hi' && notice.descriptionHi ? notice.descriptionHi : notice.description;

            return (
              <div
                key={notice.id}
                className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-xs transition-all space-y-2"
              >
                {/* Header row */}
                <div className="flex items-center justify-between gap-1 flex-wrap">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[9.5px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {notice.category}
                    </span>
                    {notice.isNew && (
                      <span className="inline-flex items-center gap-0.5 text-[9.5px] font-bold px-1.5 py-0.5 rounded-full bg-rose-500 text-white">
                        <Sparkles className="w-2.5 h-2.5" />
                        NEW
                      </span>
                    )}
                    {notice.isImportant && (
                      <span className="inline-flex items-center gap-0.5 text-[9.5px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950">
                        <AlertCircle className="w-2.5 h-2.5" />
                        IMPORTANT
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-[10.5px] text-slate-400">
                    <Calendar className="w-3 h-3" />
                    <span>{notice.date}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
                  {title}
                </h3>

                {/* Description */}
                <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                  {desc}
                </p>

                {/* Footer and Actions */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono text-slate-400 truncate max-w-[140px]">
                    {notice.referenceNo || 'GHC/2026'}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleShare(notice)}
                      title="Share notice"
                      className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onSelectNotice(notice)}
                      className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{getTranslation(language, 'view')}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onDownloadNotice(notice)}
                      className="px-2.5 py-1 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 flex items-center gap-1 cursor-pointer shadow-2xs"
                    >
                      <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>{getTranslation(language, 'download')}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
