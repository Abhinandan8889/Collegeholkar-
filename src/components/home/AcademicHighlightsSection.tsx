import {
  GraduationCap,
  Building2,
  BookOpen,
  CalendarCheck,
  FileCheck,
  Award,
  FileArchive,
  Laptop,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { TabType, Language } from '../../types';
import { getTranslation } from '../../locales/strings';

interface AcademicHighlightsSectionProps {
  onNavigateTab: (tab: TabType, subSection?: string) => void;
  language: Language;
}

export function AcademicHighlightsSection({
  onNavigateTab,
  language,
}: AcademicHighlightsSectionProps) {
  const highlights = [
    {
      id: 'programmes',
      title: language === 'hi' ? 'पाठ्यक्रम' : 'Programmes',
      desc: language === 'hi' ? 'बी.एस.सी., बीसीए, एम.एस.सी., पी.एच.डी.' : 'UG, PG & Ph.D. Research',
      icon: GraduationCap,
      color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40',
    },
    {
      id: 'departments',
      title: language === 'hi' ? 'विभाग' : 'Departments',
      desc: language === 'hi' ? '15+ उन्नत विज्ञान संकाय' : '15+ Modern Science Depts',
      icon: Building2,
      color: 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40',
    },
    {
      id: 'syllabus',
      title: language === 'hi' ? 'सिलेबस' : 'Syllabus',
      desc: language === 'hi' ? 'एनईपी-2020 स्वायत्त पाठ्यक्रम' : 'NEP-2020 Autonomous Curricula',
      icon: BookOpen,
      color: 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40',
    },
    {
      id: 'academic_calendar',
      title: language === 'hi' ? 'कैलेंडर' : 'Academic Calendar',
      desc: language === 'hi' ? 'वार्षिक शिक्षण एवं परीक्षा तिथियां' : 'Terms, Teaching & Recesses',
      icon: CalendarCheck,
      color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40',
    },
    {
      id: 'examination',
      title: language === 'hi' ? 'परीक्षा' : 'Examination',
      desc: language === 'hi' ? 'स्वायत्त परीक्षा प्रकोष्ठ व अधिसूचना' : 'Autonomous Exam Cell Schedules',
      icon: FileCheck,
      color: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40',
    },
    {
      id: 'results',
      title: language === 'hi' ? 'परिणाम' : 'Results',
      desc: language === 'hi' ? 'समेस्टर एवं वार्षिक परीक्षा परिणाम' : 'Semester & ATKT Grade Sheets',
      icon: Award,
      color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40',
    },
    {
      id: 'question_papers',
      title: language === 'hi' ? 'प्रश्न पत्र' : 'Question Papers',
      desc: language === 'hi' ? 'विगत वर्षों के प्रश्न पत्र संग्रह' : 'Previous Years Question Bank',
      icon: FileArchive,
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40',
    },
    {
      id: 'e_resources',
      title: language === 'hi' ? 'ई-संसाधन' : 'E-Resources',
      desc: language === 'hi' ? 'एन-लिस्ट, ई-शोधसिंधु, डिजिटल लाइब्रेरी' : 'N-LIST, Virtual Labs & MOOCs',
      icon: Laptop,
      color: 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40',
    },
  ];

  return (
    <section id="home-academic-highlights" className="px-3 py-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {getTranslation(language, 'academicHighlights')}
          </h3>
          <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
            {language === 'hi' ? 'स्वायत्त शैक्षणिक उत्कृष्टता' : 'Curricula, Examinations & Resources'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigateTab('academics')}
          className="text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1 cursor-pointer"
        >
          <span>{language === 'hi' ? 'पूर्ण विवरण' : 'Full Portal'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Grid of Academic Highlights */}
      <div className="grid grid-cols-2 gap-2">
        {highlights.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigateTab('academics', item.id)}
              className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 text-left shadow-2xs hover:shadow-xs transition-all active:scale-98 flex items-start gap-2.5 cursor-pointer group"
            >
              <div
                className={`w-9 h-9 shrink-0 rounded-xl flex items-center justify-center ${item.color} group-hover:scale-105 transition-transform`}
              >
                <Icon className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {item.title}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-tight mt-0.5">
                  {item.desc}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Dual Featured Cards: Examination & Admissions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
        {/* Examination Cell Card */}
        <div className="p-3 rounded-2xl bg-gradient-to-br from-rose-500/10 via-rose-500/5 to-transparent border border-rose-200 dark:border-rose-900/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                Autonomous Cell
              </span>
              <span className="text-[10px] text-rose-600 dark:text-rose-400 font-semibold">
                May-June 2026 Session
              </span>
            </div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mb-1">
              {language === 'hi' ? 'स्वायत्त परीक्षा प्रकोष्ठ' : 'Autonomous Examination Wing'}
            </h4>
            <ul className="text-[11px] text-slate-600 dark:text-slate-300 space-y-1 mb-2">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-rose-500 shrink-0" />
                <span>Semester Exam Forms: Open till 25 May</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-rose-500 shrink-0" />
                <span>Admit cards available on MPOnline</span>
              </li>
            </ul>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('academics', 'examination')}
            className="w-full py-1.5 rounded-xl bg-rose-600 text-white text-[11px] font-bold flex items-center justify-center gap-1 hover:bg-rose-700 transition-colors cursor-pointer"
          >
            <span>{language === 'hi' ? 'परीक्षा पोर्टल खोलें' : 'View Exam Notices & Schedule'}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Admissions Card */}
        <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-200 dark:border-emerald-900/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                e-Pravesh 2026-27
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                Open Now
              </span>
            </div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mb-1">
              {language === 'hi' ? 'प्रवेश प्रक्रिया 2026-27' : 'Undergraduate & PG Admissions'}
            </h4>
            <ul className="text-[11px] text-slate-600 dark:text-slate-300 space-y-1 mb-2">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                <span>B.Sc. Plain & Applied Science specialisations</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                <span>Centralised merit counselling by MP Govt</span>
              </li>
            </ul>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('academics', 'admissions')}
            className="w-full py-1.5 rounded-xl bg-emerald-600 text-white text-[11px] font-bold flex items-center justify-center gap-1 hover:bg-emerald-700 transition-colors cursor-pointer"
          >
            <span>{language === 'hi' ? 'प्रवेश निर्देश देखें' : 'View Admission Guidelines'}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </section>
  );
}
