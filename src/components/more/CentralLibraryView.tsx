import { useState } from 'react';
import {
  BookOpen,
  Search,
  Clock,
  CheckCircle2,
  XCircle,
  ExternalLink,
  BookMarked,
  ShieldCheck,
  Building,
  User,
  Sparkles,
} from 'lucide-react';
import { CENTRAL_LIBRARY_INFO, SAMPLE_BOOKS_CATALOG } from '../../data/moreSectionsData';
import { Language } from '../../types';

interface CentralLibraryViewProps {
  language: Language;
  onShowToast?: (message: string) => void;
}

export function CentralLibraryView({ language, onShowToast }: CentralLibraryViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('All');

  const filteredBooks = SAMPLE_BOOKS_CATALOG.filter((b) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.accessionNo.toLowerCase().includes(q) ||
      b.subject.toLowerCase().includes(q);
    const matchesSub = subjectFilter === 'All' || b.subject === subjectFilter;
    return matchesSearch && matchesSub;
  });

  const subjects = ['All', 'Computer Science', 'Chemistry', 'Biotechnology', 'Physics', 'Mathematics'];

  return (
    <div className="min-h-screen pb-24 space-y-3">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-emerald-700 via-teal-800 to-slate-900 text-white shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="w-5 h-5 text-emerald-300" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-200">
            Resource Centre
          </span>
        </div>
        <h2 className="text-base sm:text-lg font-extrabold tracking-tight">
          {language === 'hi' ? 'केंद्रीय ग्रंथालय एवं ई-रिसोर्स सेंटर' : 'Central Library & E-Resource Centre'}
        </h2>
        <p className="text-xs text-emerald-100 mt-0.5">
          One of Central India's largest scientific book collections since 1891
        </p>
      </div>

      <div className="p-3 max-w-md mx-auto space-y-3">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Print Volumes</span>
            <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
              {CENTRAL_LIBRARY_INFO.totalVolumes}
            </span>
            <span className="text-[9.5px] text-slate-500 block">Rare & Reference Books</span>
          </div>
          <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">E-Books & Journals</span>
            <span className="text-base font-extrabold text-teal-600 dark:text-teal-400">
              {CENTRAL_LIBRARY_INFO.eBooks}
            </span>
            <span className="text-[9.5px] text-slate-500 block">via INFLIBNET N-LIST</span>
          </div>
        </div>

        {/* Timings Card */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-start gap-3">
          <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">Library & Reading Room Hours</h4>
            <p className="text-slate-600 dark:text-slate-300 mt-0.5">{CENTRAL_LIBRARY_INFO.timings}</p>
            <span className="text-[10px] text-slate-400 block mt-1">
              Chief Librarian: <strong>{CENTRAL_LIBRARY_INFO.librarian}</strong>
            </span>
          </div>
        </div>

        {/* INFLIBNET N-LIST Quick Portal */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Digital Consortium
            </span>
            <span className="text-[9px] px-2 py-0.5 bg-white/20 rounded-full font-bold">24x7 Remote Access</span>
          </div>
          <h4 className="text-xs sm:text-sm font-bold">
            INFLIBNET N-LIST & DELNET Remote Access
          </h4>
          <p className="text-[11px] text-emerald-100 leading-relaxed">
            Access 6,000+ peer-reviewed e-journals and 1,99,500+ e-books using your student enrollment ID credentials.
          </p>
          <button
            type="button"
            onClick={() => onShowToast && onShowToast('Redirecting to INFLIBNET N-LIST portal authentication...')}
            className="w-full py-2 rounded-xl bg-white text-emerald-900 hover:bg-emerald-50 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <span>Open INFLIBNET N-LIST Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* OPAC / Book Catalog Search */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Online Public Access Catalog (OPAC Search)
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">RFID Integrated</span>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books by title, author, accession no..."
              className="w-full pl-9 pr-3 py-2 rounded-2xl text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 shadow-2xs"
            />
          </div>

          {/* Subject Pills */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
            {subjects.map((sub) => (
              <button
                key={sub}
                type="button"
                onClick={() => setSubjectFilter(sub)}
                className={`px-3 py-1 rounded-full text-[10.5px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  subjectFilter === sub
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>

          {/* Catalog items */}
          <div className="space-y-2">
            {filteredBooks.map((bk) => (
              <div
                key={bk.id}
                className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400">
                    {bk.accessionNo}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase flex items-center gap-1 ${
                      bk.isAvailable
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                    }`}
                  >
                    {bk.isAvailable ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    <span>{bk.isAvailable ? 'Available on Shelf' : 'Issued Out'}</span>
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  {bk.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  By {bk.author} • {bk.publisher} ({bk.edition})
                </p>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                  <span>Location: <strong className="text-slate-600 dark:text-slate-300">{bk.shelfLocation}</strong></span>
                  <span>ISBN: {bk.isbn}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Facilities List */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
          <h4 className="font-bold text-slate-900 dark:text-slate-100">Library Infrastructure & Services</h4>
          <ul className="space-y-1 text-[11px] text-slate-600 dark:text-slate-300">
            {CENTRAL_LIBRARY_INFO.facilities.map((fac, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>{fac}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
