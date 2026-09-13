import { useState } from 'react';
import {
  GraduationCap,
  Building2,
  BookOpen,
  CalendarCheck,
  FileArchive,
  Search,
  Filter,
  ArrowRight,
  BookMarked,
  Atom,
  FlaskConical,
  MonitorCheck,
  Dna,
  Leaf,
  Bug,
  Fingerprint,
  Binary,
  Download,
  Share2,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  X,
  FileText,
  Calendar,
} from 'lucide-react';
import { COLLEGE_DEPARTMENTS } from '../../data/collegeData';
import {
  COMPREHENSIVE_SYLLABI,
  PREVIOUS_YEAR_QUESTIONS,
  ACADEMIC_CALENDAR_ITEMS,
} from '../../data/academicsData';
import { DepartmentItem, Language, SyllabusItem, QuestionPaperItem } from '../../types';

interface AcademicsViewProps {
  onSelectDepartment: (dept: DepartmentItem) => void;
  language: Language;
  initialSubSection?: string;
  onShowToast?: (message: string) => void;
}

export function AcademicsView({
  onSelectDepartment,
  language,
  initialSubSection,
  onShowToast,
}: AcademicsViewProps) {
  const [activeTab, setActiveTab] = useState<'departments' | 'programmes' | 'syllabus' | 'calendar' | 'question_papers'>(
    initialSubSection === 'departments'
      ? 'departments'
      : initialSubSection === 'syllabus'
      ? 'syllabus'
      : initialSubSection === 'academic_calendar'
      ? 'calendar'
      : initialSubSection === 'question_papers'
      ? 'question_papers'
      : 'departments'
  );

  const [progFilter, setProgFilter] = useState<'All' | 'Undergraduate' | 'Postgraduate' | 'Research'>('All');
  const [deptSearch, setDeptSearch] = useState('');
  const [syllabusSearch, setSyllabusSearch] = useState('');
  const [syllabusNepFilter, setSyllabusNepFilter] = useState<string>('All');
  const [selectedSyllabusForView, setSelectedSyllabusForView] = useState<SyllabusItem | null>(null);

  // PYQ Filters
  const [pyqSearch, setPyqSearch] = useState('');
  const [pyqDegreeFilter, setPyqDegreeFilter] = useState<string>('All');

  // Calendar Category Filter
  const [calFilter, setCalFilter] = useState<string>('All');

  const triggerToast = (msg: string) => {
    if (onShowToast) {
      onShowToast(msg);
    }
  };

  const iconMap: Record<string, typeof Atom> = {
    Atom,
    FlaskConical,
    MonitorCheck,
    Dna,
    Leaf,
    Bug,
    Fingerprint,
    Binary,
  };

  const programmes = [
    {
      id: 'p-bsc',
      type: 'Undergraduate',
      degree: 'B.Sc. (Bachelor of Science) - 3/4 Years NEP-2020',
      specs: [
        'Physics, Chemistry, Maths',
        'Computer Science, Statistics, Mathematics',
        'Biotechnology, Chemistry, Botany',
        'Forensic Science, Chemistry, Zoology',
        'Microbiology, Biochemistry, Botany',
        'Fisheries Science, Seed Technology, Zoology',
      ],
      nepStructure: 'Multiple Entry / Exit: Certificate (Yr 1) • Diploma (Yr 2) • B.Sc. Degree (Yr 3) • B.Sc. Honours with Research (Yr 4)',
      eligibility: '10+2 with Science stream (Physics/Chemistry/Maths/Biology) with min. 50% marks.',
    },
    {
      id: 'p-bca',
      type: 'Undergraduate',
      degree: 'BCA (Bachelor of Computer Applications)',
      specs: ['Software Engineering, Cloud Computing, AI & Python, Full Stack Web Technologies, Database Systems'],
      nepStructure: 'Industry aligned 3-year professional computational curriculum with mandatory 6th semester capstone internship.',
      eligibility: '10+2 with Mathematics from recognized board with minimum 50% marks.',
    },
    {
      id: 'p-msc',
      type: 'Postgraduate',
      degree: 'M.Sc. (Master of Science) - 2 Years (4 Semesters)',
      specs: ['Physics', 'Chemistry (Organic / Analytical)', 'Mathematics', 'Zoology', 'Botany', 'Biotechnology', 'Computer Science', 'Forensic Science', 'Geology'],
      nepStructure: 'Advanced CBCS Autonomous curriculum with research dissertation, seminar presentations, and DST-FIST lab access.',
      eligibility: 'B.Sc. graduate in relevant discipline with minimum 55% aggregate marks.',
    },
    {
      id: 'p-phd',
      type: 'Research',
      degree: 'Ph.D. Doctoral Research Programme',
      specs: ['Recognized Research Centres in 8 Disciplines affiliated to Devi Ahilya Vishwavidyalaya (DAVV) Indore'],
      nepStructure: 'Mandatory Pre-Ph.D. coursework in Research Methodology & Scientific Ethics followed by original experimental thesis.',
      eligibility: 'Postgraduate M.Sc. with minimum 55% + UGC-CSIR NET/JRF or DAVV Doctoral Entrance Test (DET).',
    },
  ];

  const filteredProgrammes = programmes.filter((p) => {
    if (progFilter === 'All') return true;
    return p.type === progFilter;
  });

  const filteredDepts = COLLEGE_DEPARTMENTS.filter((d) => {
    const q = deptSearch.toLowerCase();
    return (
      d.name.toLowerCase().includes(q) ||
      (d.nameHi && d.nameHi.includes(q)) ||
      d.code.toLowerCase().includes(q) ||
      d.category.toLowerCase().includes(q)
    );
  });

  const filteredSyllabi = COMPREHENSIVE_SYLLABI.filter((s) => {
    const q = syllabusSearch.toLowerCase();
    const matchSearch =
      s.title.toLowerCase().includes(q) ||
      (s.titleHi && s.titleHi.includes(q)) ||
      s.code.toLowerCase().includes(q) ||
      s.department.toLowerCase().includes(q);
    const matchNep = syllabusNepFilter === 'All' || s.nepType === syllabusNepFilter;
    return matchSearch && matchNep;
  });

  const filteredPyqs = PREVIOUS_YEAR_QUESTIONS.filter((p) => {
    const q = pyqSearch.toLowerCase();
    const matchSearch =
      p.title.toLowerCase().includes(q) ||
      p.code.toLowerCase().includes(q) ||
      p.department.toLowerCase().includes(q) ||
      p.session.toLowerCase().includes(q);
    const matchDegree = pyqDegreeFilter === 'All' || p.degree === pyqDegreeFilter;
    return matchSearch && matchDegree;
  });

  const filteredCalendar = ACADEMIC_CALENDAR_ITEMS.filter((c) => {
    if (calFilter === 'All') return true;
    return c.category === calFilter;
  });

  return (
    <div id="academics-view" className="min-h-screen pb-24 space-y-3">
      {/* Top Academic Header */}
      <div className="p-4 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-900 text-white shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <GraduationCap className="w-5 h-5 text-amber-300" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-200">
            Autonomous Academic Portal
          </span>
        </div>
        <h2 className="text-base sm:text-lg font-extrabold tracking-tight">
          {language === 'hi' ? 'अकादमिक संकाय एवं पाठ्यक्रम' : 'Academic Faculties & Programmes'}
        </h2>
        <p className="text-xs text-amber-100 mt-0.5">
          Curricula structured under National Education Policy (NEP-2020) & Autonomous Guidelines
        </p>
      </div>

      {/* Sub-nav Tabs */}
      <div className="px-3 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-14 z-20">
        {[
          { id: 'departments', label: language === 'hi' ? 'विभाग' : 'Departments', icon: Building2 },
          { id: 'programmes', label: language === 'hi' ? 'पाठ्यक्रम' : 'Programmes', icon: BookOpen },
          { id: 'syllabus', label: language === 'hi' ? 'सिलेबस' : 'Syllabus', icon: BookMarked },
          { id: 'calendar', label: language === 'hi' ? 'कैलेंडर' : 'Calendar', icon: CalendarCheck },
          { id: 'question_papers', label: language === 'hi' ? 'प्रश्न पत्र' : 'Old Papers', icon: FileArchive },
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-amber-500 text-slate-950 shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* =================================================================== */}
      {/* 1. DEPARTMENTS TAB                                                  */}
      {/* =================================================================== */}
      {activeTab === 'departments' && (
        <div className="p-3 max-w-md mx-auto space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="search"
              value={deptSearch}
              onChange={(e) => setDeptSearch(e.target.value)}
              placeholder="Search departments by name or discipline..."
              className="w-full pl-9 pr-3 py-2 rounded-2xl text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-2xs"
            />
          </div>

          <div className="space-y-2.5">
            {filteredDepts.map((dept) => {
              const Icon = iconMap[dept.iconName] || Atom;
              const name = language === 'hi' && dept.nameHi ? dept.nameHi : dept.name;

              return (
                <div
                  key={dept.id}
                  onClick={() => onSelectDepartment(dept)}
                  className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900 flex items-center justify-center text-amber-700 dark:text-amber-400 shrink-0 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                          Code: {dept.code} • {dept.category}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {dept.labsCount} Labs
                        </span>
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {name}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                        {dept.description}
                      </p>

                      <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500 dark:text-slate-400">
                          HOD: <strong className="text-slate-700 dark:text-slate-300">{dept.headOfDepartment}</strong>
                        </span>
                        <span className="text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
                          <span>View Details</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 2. PROGRAMMES TAB                                                   */}
      {/* =================================================================== */}
      {activeTab === 'programmes' && (
        <div className="p-3 max-w-md mx-auto space-y-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {(['All', 'Undergraduate', 'Postgraduate', 'Research'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setProgFilter(cat)}
                className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                  progFilter === cat
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-2xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredProgrammes.map((p) => (
              <div
                key={p.id}
                className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md text-[9.5px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                    {p.type}
                  </span>
                  <span className="text-[10px] text-slate-400">Autonomous NEP-2020</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                  {p.degree}
                </h4>

                {p.nepStructure && (
                  <p className="text-[10.5px] text-amber-700 dark:text-amber-300 font-medium bg-amber-50 dark:bg-amber-950/40 p-2 rounded-xl border border-amber-200 dark:border-amber-900/60">
                    {p.nepStructure}
                  </p>
                )}

                <div className="space-y-1">
                  <span className="text-[10.5px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Specializations & Subject Combinations:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {p.specs.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-lg text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                  <strong>Eligibility:</strong> {p.eligibility}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 3. SYLLABUS TAB                                                     */}
      {/* =================================================================== */}
      {activeTab === 'syllabus' && (
        <div className="p-3 max-w-md mx-auto space-y-3">
          <div className="p-3 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900/60 text-xs text-teal-900 dark:text-teal-200">
            <p className="font-bold mb-0.5">NEP-2020 Autonomous Syllabus Repository</p>
            <p className="text-[11px] text-teal-700 dark:text-teal-300">
              Browse semester-wise approved curricula, credit matrix, Major/Minor electives, and Skill Enhancement Courses (SEC).
            </p>
          </div>

          {/* Search & Filter */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="search"
                value={syllabusSearch}
                onChange={(e) => setSyllabusSearch(e.target.value)}
                placeholder="Search syllabus by course code or subject..."
                className="w-full pl-9 pr-3 py-2 rounded-2xl text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 shadow-2xs"
              />
            </div>

            <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
              {['All', 'Major', 'Minor', 'SEC'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSyllabusNepFilter(t)}
                  className={`px-3 py-1 rounded-full text-[10.5px] font-semibold transition-all cursor-pointer ${
                    syllabusNepFilter === t
                      ? 'bg-teal-600 text-white shadow-2xs'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {t} Courses
                </button>
              ))}
            </div>
          </div>

          {/* Syllabi List */}
          <div className="space-y-2">
            {filteredSyllabi.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold">
                        {item.code}
                      </span>
                      <span className="px-1.5 py-0.2 rounded text-[8.5px] font-bold bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 uppercase">
                        {item.nepType} • {item.credits} Credits
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {item.department} • {item.semester} • PDF {item.fileSize}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      title="Inspect Units"
                      onClick={() => setSelectedSyllabusForView(item)}
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      title="Download PDF"
                      onClick={() => triggerToast(`Syllabus for ${item.code} downloaded to device storage.`)}
                      className="p-2 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 cursor-pointer shadow-2xs"
                    >
                      <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>
                </div>

                {/* Quick Unit Breakdown preview */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10.5px]">
                  <span className="text-slate-500 dark:text-slate-400">
                    Contains {item.units.length} Modules / Units
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedSyllabusForView(item)}
                    className="text-teal-600 dark:text-teal-400 font-semibold hover:underline cursor-pointer"
                  >
                    View Curriculum Outline →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Modal for Syllabus Details */}
          {selectedSyllabusForView && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-xs animate-in fade-in"
              role="dialog"
            >
              <div className="w-full max-w-md max-h-[85vh] bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-slate-200 dark:border-slate-800">
                <div className="p-3.5 bg-gradient-to-r from-teal-700 to-teal-900 text-white flex items-center justify-between">
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono font-bold text-teal-200 block uppercase">
                      Curriculum Specification • {selectedSyllabusForView.code}
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold truncate">
                      {selectedSyllabusForView.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedSyllabusForView(null)}
                    className="p-1 rounded-full bg-white/10 hover:bg-white/20 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 overflow-y-auto space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-2 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl text-[11px]">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Department:</span>
                      <strong>{selectedSyllabusForView.department}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Credits & Type:</span>
                      <strong>{selectedSyllabusForView.credits} Credits ({selectedSyllabusForView.nepType})</strong>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                      Course Units & Syllabus Topics
                    </span>
                    {selectedSyllabusForView.units.map((u) => (
                      <div
                        key={u.unitNo}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 space-y-1"
                      >
                        <h5 className="font-bold text-slate-900 dark:text-slate-100 text-xs">
                          Unit {u.unitNo}: {u.title}
                        </h5>
                        <ul className="list-disc pl-4 space-y-0.5 text-[10.5px] text-slate-600 dark:text-slate-300">
                          {u.topics.map((t, tidx) => (
                            <li key={tidx}>{t}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 border-t border-slate-200 dark:border-slate-800 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      triggerToast(`Official syllabus document ${selectedSyllabusForView.code} downloaded.`);
                      setSelectedSyllabusForView(null);
                    }}
                    className="flex-1 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Full Syllabus PDF</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedSyllabusForView(null)}
                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =================================================================== */}
      {/* 4. ACADEMIC CALENDAR TAB                                            */}
      {/* =================================================================== */}
      {activeTab === 'calendar' && (
        <div className="p-3 max-w-md mx-auto space-y-3">
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Autonomous Academic Calendar (Session 2025-26)
              </h4>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
              {['All', 'Examination', 'CCE', 'Activity'].map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setCalFilter(f)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all cursor-pointer ${
                    calFilter === f
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="space-y-2 text-xs">
              {filteredCalendar.map((cal) => (
                <div
                  key={cal.id}
                  className="flex items-start justify-between gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800"
                >
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 block font-mono">
                      {cal.dateRange}
                    </span>
                    <p className="font-semibold text-slate-800 dark:text-slate-200 text-xs mt-0.5">
                      {cal.title}
                    </p>
                    {cal.description && (
                      <p className="text-[10.5px] text-slate-400 mt-0.5">
                        {cal.description}
                      </p>
                    )}
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider shrink-0 ${
                      cal.status === 'Completed'
                        ? 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                        : cal.status === 'Ongoing'
                        ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}
                  >
                    {cal.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 5. QUESTION PAPERS (PYQ) TAB                                       */}
      {/* =================================================================== */}
      {activeTab === 'question_papers' && (
        <div className="p-3 max-w-md mx-auto space-y-3">
          <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200">
            <p className="font-bold mb-0.5">Previous Years Question Paper Archive</p>
            <p className="text-[11px] text-amber-700 dark:text-amber-300">
              Download previous question papers for autonomous end-semester examination preparation.
            </p>
          </div>

          {/* Search & Degree filter */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="search"
                value={pyqSearch}
                onChange={(e) => setPyqSearch(e.target.value)}
                placeholder="Search PYQs by subject or session..."
                className="w-full pl-9 pr-3 py-2 rounded-2xl text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs"
              />
            </div>

            <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
              {['All', 'B.Sc.', 'BCA', 'M.Sc.'].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setPyqDegreeFilter(d)}
                  className={`px-3 py-1 rounded-full text-[10.5px] font-semibold transition-all cursor-pointer ${
                    pyqDegreeFilter === d
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-2xs'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {filteredPyqs.map((qp) => (
              <div
                key={qp.id}
                className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center justify-between gap-2"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                      {qp.session}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {qp.code} • {qp.semester}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                    {qp.title}
                  </h4>
                  <span className="text-[10px] text-slate-400">{qp.department} • PDF {qp.fileSize}</span>
                </div>
                <button
                  type="button"
                  onClick={() => triggerToast(`Downloaded question paper: ${qp.title}`)}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold flex items-center gap-1 hover:bg-amber-400 cursor-pointer shadow-2xs shrink-0"
                >
                  <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Download</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
