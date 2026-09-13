import { Briefcase, TrendingUp, Building, Award, CheckCircle2, UserCheck, Mail, Phone } from 'lucide-react';
import { PLACEMENT_CELL_INFO } from '../../data/moreSectionsData';
import { Language } from '../../types';

interface PlacementCellViewProps {
  language: Language;
  onShowToast?: (message: string) => void;
}

export function PlacementCellView({ language, onShowToast }: PlacementCellViewProps) {
  return (
    <div className="min-h-screen pb-24 space-y-3">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-900 text-white shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <Briefcase className="w-5 h-5 text-blue-300" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-200">
            Career Opportunities
          </span>
        </div>
        <h2 className="text-base sm:text-lg font-extrabold tracking-tight">
          {language === 'hi' ? 'प्रशिक्षण एवं नियोजन प्रकोष्ठ' : 'Training & Placement Cell (T&P)'}
        </h2>
        <p className="text-xs text-blue-100 mt-0.5">
          Connecting Holkar Science graduates with premier research & corporate industries
        </p>
      </div>

      <div className="p-3 max-w-md mx-auto space-y-3">
        {/* CTC Highlights */}
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Highest Package</span>
            <span className="text-base font-extrabold text-blue-600 dark:text-blue-400">
              {PLACEMENT_CELL_INFO.highestPackage}
            </span>
            <span className="text-[9px] text-slate-500 block">TCS Digital & Pharma R&D</span>
          </div>
          <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Average Package</span>
            <span className="text-base font-extrabold text-indigo-600 dark:text-indigo-400">
              {PLACEMENT_CELL_INFO.averagePackage}
            </span>
            <span className="text-[9px] text-slate-500 block">UG / PG Science & IT</span>
          </div>
        </div>

        {/* TPO Officer Info */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Officer-in-Charge
            </span>
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
              {PLACEMENT_CELL_INFO.head}
            </h4>
            <span className="text-[10.5px] text-slate-500 dark:text-slate-400">
              Email: placement@collegeholkar.org
            </span>
          </div>
          <button
            type="button"
            onClick={() => onShowToast && onShowToast('Placement registration portal opening...')}
            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs cursor-pointer shadow-2xs"
          >
            Register
          </button>
        </div>

        {/* Top Corporate Recruiters Grid */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-2.5">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-blue-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Leading Campus Recruiters
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {PLACEMENT_CELL_INFO.recruiters.map((rec, idx) => (
              <div
                key={idx}
                className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 truncate"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                <span className="truncate">{rec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Student Training Initiatives */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
          <h4 className="font-bold text-slate-900 dark:text-slate-100">Career Preparation Programmes</h4>
          <ul className="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300">
            {PLACEMENT_CELL_INFO.supportProvided.map((s, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
