import { X, Building2, User, Award, FlaskConical, BookOpen, CheckCircle, GraduationCap } from 'lucide-react';
import { DepartmentItem, Language } from '../../types';

interface DepartmentDetailModalProps {
  department: DepartmentItem | null;
  onClose: () => void;
  language: Language;
}

export function DepartmentDetailModal({
  department,
  onClose,
  language,
}: DepartmentDetailModalProps) {
  if (!department) return null;

  const name = language === 'hi' && department.nameHi ? department.nameHi : department.name;

  return (
    <div
      id="department-detail-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-xs animate-in fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-lg max-h-[90vh] flex flex-col rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/80">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs shrink-0">
              {department.code}
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
                {department.category} • ESTD. {department.established}
              </span>
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                {name}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs text-slate-600 dark:text-slate-300">
          {/* HOD & Key Metrics Card */}
          <div className="p-3 rounded-2xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-full bg-amber-200 dark:bg-amber-900 flex items-center justify-center text-amber-900 dark:text-amber-200 font-bold shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-amber-800 dark:text-amber-300 block">
                  Head of Department (HOD)
                </span>
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate block">
                  {department.headOfDepartment}
                </span>
                <span className="text-[10.5px] text-slate-500 dark:text-slate-400">
                  {department.facultyCount} Distinguished Faculty Members
                </span>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-base font-extrabold text-amber-600 dark:text-amber-400 block leading-tight">
                {department.labsCount}
              </span>
              <span className="text-[10px] text-slate-500 font-medium">Research Labs</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs mb-1">
              About the Department
            </h4>
            <p className="leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800">
              {department.description}
            </p>
          </div>

          {/* Courses Offered */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs mb-1.5 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-amber-500" />
              <span>Academic Programmes Offered</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {department.coursesOffered.map((course, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-[11px] font-medium"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>

          {/* Research & Lab Facilities */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs mb-1.5 flex items-center gap-1.5">
              <FlaskConical className="w-4 h-4 text-emerald-500" />
              <span>Laboratory & Research Infrastructure</span>
            </h4>
            <ul className="space-y-1.5 pl-1">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Specialized PG & Doctoral research facilities funded by DST-FIST.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Modern digital instrumentation, spectroscopy units, and computational labs.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Regular hands-on skill enhancement workshops under NEP-2020 framework.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-bold hover:bg-slate-800 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
