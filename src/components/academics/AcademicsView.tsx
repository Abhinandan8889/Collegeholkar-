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
} from 'lucide-react';
import { COLLEGE_DEPARTMENTS } from '../../data/collegeData';
import { DepartmentItem, Language } from '../../types';
import { getTranslation } from '../../locales/strings';

interface AcademicsViewProps {
  onSelectDepartment: (dept: DepartmentItem) => void;
  language: Language;
  initialSubSection?: string;
}

export function AcademicsView({
  onSelectDepartment,
  language,
  initialSubSection,
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
      specs: ['Physics, Chemistry, Maths', 'Computer Science, Statistics', 'Biotechnology, Chemistry, Botany', 'Forensic Science, Chemistry, Zoology', 'Microbiology, Biochemistry, Botany', 'Fisheries, Seed Technology'],
      eligibility: '10+2 with Science stream (Physics/Chemistry/Maths/Biology) from recognized board with minimum 50% marks.',
    },
    {
      id: 'p-bca',
      type: 'Undergraduate',
      degree: 'BCA (Bachelor of Computer Applications)',
      specs: ['Software Engineering, Cloud Computing, AI & Python, Web Technologies'],
      eligibility: '10+2 with Mathematics from recognized board with minimum 50% marks.',
    },
    {
      id: 'p-msc',
      type: 'Postgraduate',
      degree: 'M.Sc. (Master of Science) - 2 Years (4 Semesters)',
      specs: ['Physics', 'Chemistry (Organic / Analytical)', 'Mathematics', 'Zoology', 'Botany', 'Biotechnology', 'Computer Science', 'Forensic Science', 'Geology'],
      eligibility: 'B.Sc. graduate in relevant subject with minimum 55% aggregate marks.',
    },
    {
      id: 'p-phd',
      type: 'Research',
      degree: 'Ph.D. Doctoral Research Programme',
      specs: ['Recognized Research Centre in 8 Disciplines affiliated to DAVV Indore'],
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

  return (
    <div id="academics-view" className="min-h-screen pb-20">
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
      <div className="px-3 pt-3 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-14 z-20">
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

      {/* Content for DEPARTMENTS */}
      {activeTab === 'departments' && (
        <div className="p-3 space-y-3">
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

      {/* Content for PROGRAMMES */}
      {activeTab === 'programmes' && (
        <div className="p-3 space-y-3">
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
                  <span className="text-[10px] text-slate-400">UGC Autonomous</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                  {p.degree}
                </h4>
                <div className="space-y-1">
                  <span className="text-[10.5px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Specializations / Groups:
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

      {/* Content for SYLLABUS */}
      {activeTab === 'syllabus' && (
        <div className="p-3 space-y-3">
          <div className="p-3 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900/60 text-xs text-teal-900 dark:text-teal-200">
            <p className="font-bold mb-0.5">NEP-2020 Autonomous Syllabus Repository</p>
            <p className="text-[11px] text-teal-700 dark:text-teal-300">
              Browse semester-wise approved curricula, credit matrix, Major/Minor electives, and Skill Enhancement Courses (SEC).
            </p>
          </div>

          <div className="space-y-2">
            {[
              { code: 'CHE-UG-2026', title: 'B.Sc. Chemistry (NEP 1st to 6th Sem)', dept: 'Chemistry', size: '1.4 MB' },
              { code: 'PHY-UG-2026', title: 'B.Sc. Physics (Major/Minor Electives)', dept: 'Physics', size: '1.1 MB' },
              { code: 'CS-BCA-2026', title: 'BCA & B.Sc. Computer Science Curriculum', dept: 'Computer Science', size: '2.1 MB' },
              { code: 'BIO-UG-2026', title: 'B.Sc. Biotechnology & Microbiology Course Matrix', dept: 'Biotechnology', size: '1.6 MB' },
              { code: 'FS-UG-2026', title: 'B.Sc. Forensic Science & Criminology Syllabus', dept: 'Forensic Science', size: '980 KB' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center justify-between gap-2"
              >
                <div className="min-w-0 flex-1">
                  <span className="text-[9.5px] font-mono text-amber-600 dark:text-amber-400 block font-bold">
                    {item.code} • {item.dept}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-slate-400">PDF • {item.size}</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    title="View PDF"
                    onClick={() => alert(`Opening ${item.title} syllabus document.`)}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    title="Download PDF"
                    onClick={() => alert(`Starting download for ${item.code} syllabus.`)}
                    className="p-2 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content for CALENDAR */}
      {activeTab === 'calendar' && (
        <div className="p-3 space-y-3">
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Autonomous Academic Calendar (Session 2025-26)
            </h4>
            <div className="space-y-2 text-xs">
              {[
                { date: '01 July 2025', event: 'Commencement of Odd Semester Classes (UG & PG)', status: 'Completed' },
                { date: '15 - 22 Oct 2025', event: 'Continuous Internal Assessment (CCE-I)', status: 'Completed' },
                { date: '05 - 20 Dec 2025', event: 'Odd Semester End Autonomous Examinations', status: 'Completed' },
                { date: '05 Jan 2026', event: 'Commencement of Even Semester Classes', status: 'Completed' },
                { date: '28 Feb 2026', event: 'National Science Day Celebration & Colloquium', status: 'Completed' },
                { date: '15 - 22 Mar 2026', event: 'Even Semester Mid-Term CCE-II Assessment', status: 'Completed' },
                { date: '18 May - 05 Jun 2026', event: 'Practical & Viva-Voce Examinations', status: 'Upcoming' },
                { date: '10 Jun - 30 Jun 2026', event: 'Even Semester End Theory Examinations', status: 'Upcoming' },
              ].map((cal, idx) => (
                <div
                  key={idx}
                  className="flex items-start justify-between gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800"
                >
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 block font-mono">
                      {cal.date}
                    </span>
                    <p className="font-semibold text-slate-800 dark:text-slate-200 text-xs mt-0.5">
                      {cal.event}
                    </p>
                  </div>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider shrink-0 ${
                      cal.status === 'Completed'
                        ? 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
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

      {/* Content for QUESTION PAPERS */}
      {activeTab === 'question_papers' && (
        <div className="p-3 space-y-3">
          <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200">
            <p className="font-bold mb-0.5">Previous Years Question Paper Archive</p>
            <p className="text-[11px] text-amber-700 dark:text-amber-300">
              Download previous question papers for autonomous end-semester examination preparation.
            </p>
          </div>

          <div className="space-y-2">
            {[
              { year: 'Dec 2025', title: 'B.Sc. Semester V - Organic Chemistry Paper I', code: 'CHE-501', size: '420 KB' },
              { year: 'Dec 2025', title: 'B.Sc. Semester V - Quantum Mechanics & Nuclear Physics', code: 'PHY-501', size: '510 KB' },
              { year: 'May 2025', title: 'BCA Semester IV - Database Management Systems (DBMS)', code: 'BCA-402', size: '380 KB' },
              { year: 'May 2025', title: 'B.Sc. Semester IV - Molecular Biology & Genetic Engineering', code: 'BIO-401', size: '490 KB' },
              { year: 'Dec 2024', title: 'B.Sc. Semester I - Calculus & Differential Equations', code: 'MAT-101', size: '440 KB' },
            ].map((qp, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center justify-between gap-2"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                      {qp.year}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{qp.code}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                    {qp.title}
                  </h4>
                  <span className="text-[10px] text-slate-400">PDF • {qp.size}</span>
                </div>
                <button
                  type="button"
                  onClick={() => alert(`Starting download for ${qp.title}`)}
                  className="px-2.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold flex items-center gap-1 hover:bg-amber-400 cursor-pointer shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>PDF</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
