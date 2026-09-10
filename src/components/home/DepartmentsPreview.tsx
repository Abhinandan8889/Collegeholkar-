import { useState } from 'react';
import {
  Building2,
  Atom,
  FlaskConical,
  MonitorCheck,
  Dna,
  Leaf,
  Bug,
  Fingerprint,
  Binary,
  ArrowRight,
  Search,
} from 'lucide-react';
import { COLLEGE_DEPARTMENTS } from '../../data/collegeData';
import { DepartmentItem, Language, TabType } from '../../types';

interface DepartmentsPreviewProps {
  onSelectDepartment: (dept: DepartmentItem) => void;
  onNavigateTab: (tab: TabType, subSection?: string) => void;
  language: Language;
}

export function DepartmentsPreview({
  onSelectDepartment,
  onNavigateTab,
  language,
}: DepartmentsPreviewProps) {
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredDepts = COLLEGE_DEPARTMENTS.filter((dept) => {
    const q = searchTerm.toLowerCase();
    return (
      dept.name.toLowerCase().includes(q) ||
      (dept.nameHi && dept.nameHi.includes(q)) ||
      dept.code.toLowerCase().includes(q) ||
      dept.category.toLowerCase().includes(q)
    );
  }).slice(0, 4);

  return (
    <section id="home-departments-preview" className="px-3 py-4 bg-slate-50/60 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800">
      <div className="flex items-center justify-between mb-2.5">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>{language === 'hi' ? 'प्रमुख विज्ञान विभाग' : 'Academic Departments'}</span>
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {language === 'hi' ? '15+ उन्नत अनुसंधान एवं शिक्षण संकाय' : '15+ Research & Teaching Facilities'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigateTab('academics', 'departments')}
          className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
        >
          <span>{language === 'hi' ? 'सभी विभाग' : 'All Departments'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Mini Search input */}
      <div className="relative mb-3">
        <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={language === 'hi' ? 'विभाग खोजें (उदा. भौतिकी, रसायन, CS)...' : 'Search departments (e.g., Physics, CS, Bio)...'}
          className="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
      </div>

      {/* Grid of Department Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {filteredDepts.map((dept) => {
          const Icon = iconMap[dept.iconName] || Atom;
          const name = language === 'hi' && dept.nameHi ? dept.nameHi : dept.name;

          return (
            <div
              key={dept.id}
              onClick={() => onSelectDepartment(dept)}
              className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900/60 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Icon className="w-4 h-4 text-amber-700 dark:text-amber-400 stroke-[2.2]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="text-[9.5px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                      {dept.code} • {dept.category}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {dept.labsCount} Labs
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {name}
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                    HOD: {dept.headOfDepartment} • {dept.facultyCount} Faculty Members
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
