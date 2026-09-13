import { Microscope, Award, FileCode, CheckCircle2, Sparkles, Cpu } from 'lucide-react';
import { RESEARCH_CELL_INFO } from '../../data/moreSectionsData';
import { Language } from '../../types';

interface ResearchCellViewProps {
  language: Language;
  onShowToast?: (message: string) => void;
}

export function ResearchCellView({ language, onShowToast }: ResearchCellViewProps) {
  return (
    <div className="min-h-screen pb-24 space-y-3">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-purple-800 via-indigo-900 to-slate-950 text-white shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <Microscope className="w-5 h-5 text-purple-300" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-200">
            Scientific Discovery & Innovation
          </span>
        </div>
        <h2 className="text-base sm:text-lg font-extrabold tracking-tight">
          {language === 'hi' ? 'शोध एवं विकास प्रकोष्ठ' : 'Research & Development (R&D) Cell'}
        </h2>
        <p className="text-xs text-purple-100 mt-0.5">
          DST-FIST Level-II Supported Central Instrumentation Facility (CIF)
        </p>
      </div>

      <div className="p-3 max-w-md mx-auto space-y-3">
        {/* Key Stats */}
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Doctoral Centres</span>
            <span className="text-base font-extrabold text-purple-600 dark:text-purple-400">
              8 Centres
            </span>
            <span className="text-[9px] text-slate-500 block">Affiliated to DAVV Indore</span>
          </div>
          <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Patents & IPR</span>
            <span className="text-base font-extrabold text-indigo-600 dark:text-indigo-400">
              {RESEARCH_CELL_INFO.patentsCount}
            </span>
            <span className="text-[9px] text-slate-500 block">In Nano & Green Chemistry</span>
          </div>
        </div>

        {/* CIF Instruments Overview */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-purple-600" />
              <span>Central Instrumentation Facility (CIF) Equipments</span>
            </h3>
          </div>

          <div className="space-y-2">
            {RESEARCH_CELL_INFO.cifEquipments.map((eq, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    {eq.name}
                  </h4>
                  <span className="px-2 py-0.5 rounded text-[8.5px] font-bold uppercase bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-300">
                    DST-FIST
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  {eq.utility}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Funding Bodies */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
          <h4 className="font-bold text-slate-900 dark:text-slate-100">Recognitions & Funding Grants</h4>
          <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
            Grants received from <strong>Department of Science & Technology (DST-FIST)</strong>, <strong>University Grants Commission (UGC)</strong>, <strong>MP Council of Science & Technology (MPCST)</strong>, and <strong>Council of Scientific & Industrial Research (CSIR)</strong>.
          </p>
          <button
            type="button"
            onClick={() => onShowToast && onShowToast('CIF Slot Booking form downloaded.')}
            className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs mt-2"
          >
            <span>Request Sample Testing / CIF Slot</span>
          </button>
        </div>
      </div>
    </div>
  );
}
