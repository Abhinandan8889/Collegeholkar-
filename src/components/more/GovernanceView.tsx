import { Shield, Award, Users, BookOpen, CheckCircle, FileText } from 'lucide-react';
import { GOVERNANCE_COUNCILS } from '../../data/moreSectionsData';
import { Language } from '../../types';

interface GovernanceViewProps {
  language: Language;
}

export function GovernanceView({ language }: GovernanceViewProps) {
  return (
    <div className="min-h-screen pb-24 space-y-3">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <Shield className="w-5 h-5 text-amber-400" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
            Institutional Administration
          </span>
        </div>
        <h2 className="text-base sm:text-lg font-extrabold tracking-tight">
          {language === 'hi' ? 'स्वायत्त शासन एवं समितियां' : 'Autonomous Governance & Administration'}
        </h2>
        <p className="text-xs text-slate-300 mt-0.5">
          Constituted under UGC Autonomous College Regulations & MP Higher Education Code
        </p>
      </div>

      <div className="p-3 max-w-md mx-auto space-y-3">
        {/* UGC Autonomy Status Badge */}
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-300 dark:border-amber-800 text-xs space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-200">
            <Award className="w-4 h-4 text-amber-600" />
            <span>Autonomous Status Extension by UGC</span>
          </div>
          <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">
            Government Holkar Science College was conferred Autonomous Status in 1989 and has maintained continuous academic autonomy with independent Board of Studies, Academic Council, and Controller of Examinations.
          </p>
        </div>

        {/* Governing Body Card */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              The Governing Body (Apex Authority)
            </h3>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
              <span className="text-[10px] text-slate-400 block font-bold uppercase">Chairperson</span>
              <strong className="text-slate-800 dark:text-slate-200">{GOVERNANCE_COUNCILS.governingBody.chairperson}</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
              <span className="text-[10px] text-slate-400 block font-bold uppercase">Member Secretary (Principal)</span>
              <strong className="text-slate-800 dark:text-slate-200">{GOVERNANCE_COUNCILS.governingBody.memberSecretary}</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
              <span className="text-[10px] text-slate-400 block font-bold uppercase">UGC Representative</span>
              <p className="text-slate-700 dark:text-slate-300 text-[11px]">{GOVERNANCE_COUNCILS.governingBody.ugcNominee}</p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
              <span className="text-[10px] text-slate-400 block font-bold uppercase">State Govt. Nominee</span>
              <p className="text-slate-700 dark:text-slate-300 text-[11px]">{GOVERNANCE_COUNCILS.governingBody.stateGovtNominee}</p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
              <span className="text-[10px] text-slate-400 block font-bold uppercase">DAVV University Representative</span>
              <p className="text-slate-700 dark:text-slate-300 text-[11px]">{GOVERNANCE_COUNCILS.governingBody.universityNominee}</p>
            </div>
          </div>
        </div>

        {/* Academic Council & Board of Studies */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-2.5 text-xs">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Academic Council & Board of Studies
            </h3>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
            Responsible for prescribing syllabi, recommending academic regulations, approving new degrees, and moderating examination standards.
          </p>
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
            <span className="text-[10px] text-slate-400 block font-bold uppercase">Academic Council Head</span>
            <strong className="text-slate-800 dark:text-slate-200">{GOVERNANCE_COUNCILS.academicCouncil.head}</strong>
          </div>
        </div>

        {/* IQAC Card */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-xs">
              Internal Quality Assurance Cell (IQAC)
            </h4>
            <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
              NAAC 'A++'
            </span>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-300">
            <strong>Coordinator:</strong> {GOVERNANCE_COUNCILS.iqac.coordinator}
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {GOVERNANCE_COUNCILS.iqac.objective}
          </p>
        </div>
      </div>
    </div>
  );
}
