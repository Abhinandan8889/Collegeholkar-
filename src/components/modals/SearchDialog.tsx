import { useState, useMemo } from 'react';
import { Search, X, FileText, Building2, Sparkles, Globe, Calendar, ArrowRight } from 'lucide-react';
import { LATEST_NOTICES, COLLEGE_DEPARTMENTS, COLLEGE_EVENTS, IMPORTANT_LINKS } from '../../data/collegeData';
import { NoticeItem, DepartmentItem, CollegeEventItem, ImportantLinkItem, Language } from '../../types';

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectNotice: (notice: NoticeItem) => void;
  onSelectDepartment: (dept: DepartmentItem) => void;
  onSelectEvent: (event: CollegeEventItem) => void;
  onSelectLink: (link: ImportantLinkItem) => void;
  language: Language;
}

export function SearchDialog({
  isOpen,
  onClose,
  onSelectNotice,
  onSelectDepartment,
  onSelectEvent,
  onSelectLink,
  language,
}: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Notices' | 'Departments' | 'Events' | 'Links'>('All');

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const results: Array<{
      id: string;
      title: string;
      category: string;
      date?: string;
      type: 'notice' | 'department' | 'event' | 'link';
      rawItem: any;
    }> = [];

    // Search Notices
    if (activeFilter === 'All' || activeFilter === 'Notices') {
      LATEST_NOTICES.forEach((n) => {
        if (
          n.title.toLowerCase().includes(q) ||
          (n.titleHi && n.titleHi.includes(q)) ||
          n.description.toLowerCase().includes(q) ||
          n.category.toLowerCase().includes(q)
        ) {
          results.push({
            id: n.id,
            title: language === 'hi' && n.titleHi ? n.titleHi : n.title,
            category: `Notice • ${n.category}`,
            date: n.date,
            type: 'notice',
            rawItem: n,
          });
        }
      });
    }

    // Search Departments
    if (activeFilter === 'All' || activeFilter === 'Departments') {
      COLLEGE_DEPARTMENTS.forEach((d) => {
        if (
          d.name.toLowerCase().includes(q) ||
          (d.nameHi && d.nameHi.includes(q)) ||
          d.code.toLowerCase().includes(q) ||
          d.coursesOffered.some((c) => c.toLowerCase().includes(q))
        ) {
          results.push({
            id: d.id,
            title: language === 'hi' && d.nameHi ? d.nameHi : d.name,
            category: `Department • ${d.category}`,
            date: `ESTD ${d.established}`,
            type: 'department',
            rawItem: d,
          });
        }
      });
    }

    // Search Events
    if (activeFilter === 'All' || activeFilter === 'Events') {
      COLLEGE_EVENTS.forEach((e) => {
        if (
          e.title.toLowerCase().includes(q) ||
          (e.titleHi && e.titleHi.includes(q)) ||
          e.venue.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q)
        ) {
          results.push({
            id: e.id,
            title: language === 'hi' && e.titleHi ? e.titleHi : e.title,
            category: `Event • ${e.category}`,
            date: e.date,
            type: 'event',
            rawItem: e,
          });
        }
      });
    }

    // Search Links & Portals
    if (activeFilter === 'All' || activeFilter === 'Links') {
      IMPORTANT_LINKS.forEach((l) => {
        if (
          l.title.toLowerCase().includes(q) ||
          (l.titleHi && l.titleHi.includes(q)) ||
          l.description.toLowerCase().includes(q)
        ) {
          results.push({
            id: l.id,
            title: language === 'hi' && l.titleHi ? l.titleHi : l.title,
            category: `Portal • ${l.category}`,
            type: 'link',
            rawItem: l,
          });
        }
      });
    }

    return results;
  }, [query, activeFilter, language]);

  if (!isOpen) return null;

  const handleResultClick = (result: any) => {
    onClose();
    if (result.type === 'notice') onSelectNotice(result.rawItem);
    else if (result.type === 'department') onSelectDepartment(result.rawItem);
    else if (result.type === 'event') onSelectEvent(result.rawItem);
    else if (result.type === 'link') onSelectLink(result.rawItem);
  };

  return (
    <div
      id="global-search-dialog"
      className="fixed inset-0 z-50 flex items-start justify-center p-3 pt-14 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-3 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <Search className="w-5 h-5 text-amber-500 shrink-0" />
          <input
            type="search"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              language === 'hi'
                ? 'सूचनाएं, विभाग, परीक्षा, गतिविधियां खोजें...'
                : 'Search notices, departments, exams, syllabus...'
            }
            className="flex-1 text-sm bg-transparent border-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
          >
            Cancel
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 px-3 py-2 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-800/50 overflow-x-auto scrollbar-none text-xs">
          {(['All', 'Notices', 'Departments', 'Events', 'Links'] as const).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                activeFilter === filter
                  ? 'bg-amber-500 text-slate-950 shadow-2xs'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-slate-400 text-xs">
              <Search className="w-8 h-8 mx-auto mb-2 text-slate-300 dark:text-slate-700" />
              <p>Type keywords to search across college portal.</p>
              <div className="flex justify-center gap-1.5 mt-3 flex-wrap">
                {['Exam Form', 'Chemistry', 'B.Sc. Admissions', 'Physics Lab', 'Scholarship'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setQuery(tag)}
                    className="px-2 py-0.5 rounded-full text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-amber-100 hover:text-amber-900 cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-xs">
              <p>No results found for "{query}".</p>
              <p className="text-[11px] mt-1 text-slate-500">Try searching for generic terms like "exam", "physics", or "admission".</p>
            </div>
          ) : (
            searchResults.map((res) => {
              const Icon =
                res.type === 'notice'
                  ? FileText
                  : res.type === 'department'
                  ? Building2
                  : res.type === 'event'
                  ? Sparkles
                  : Globe;

              return (
                <div
                  key={`${res.type}-${res.id}`}
                  onClick={() => handleResultClick(res)}
                  className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center justify-between gap-2.5 group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200/60 dark:border-amber-900/60 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9.5px] font-bold text-amber-600 dark:text-amber-400 block uppercase">
                        {res.category}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {res.title}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 text-slate-400">
                    {res.date && <span className="text-[10px] hidden sm:inline">{res.date}</span>}
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
