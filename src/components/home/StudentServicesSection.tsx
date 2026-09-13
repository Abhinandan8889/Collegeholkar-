import { GraduationCap, Award, ShieldCheck, Briefcase, FileBadge2, HelpCircle } from 'lucide-react';
import { Language, TabType } from '../../types';

interface StudentServicesSectionProps {
  onNavigateTab: (tab: TabType, subSection?: string) => void;
  language: Language;
}

export function StudentServicesSection({ onNavigateTab, language }: StudentServicesSectionProps) {
  const services = [
    {
      id: 'scholarships',
      title: language === 'hi' ? 'छात्रवृत्ति प्रकोष्ठ' : 'Scholarship Cell',
      desc: language === 'hi' ? 'पोस्ट मेट्रिक, प्रतिभा किरण, मेधावी विद्यार्थी' : 'Post-Matric, Pratibha Kiran, MMVY Schemes',
      icon: Award,
      color: 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200/60 dark:border-amber-900/50',
    },
    {
      id: 'abc_id',
      title: language === 'hi' ? 'अपार / एबीसी आईडी' : 'APAAR / ABC ID',
      desc: language === 'hi' ? 'राष्ट्रीय क्रेडिट बैंक पंजीयन एवं सत्यापन' : 'Academic Bank of Credits verification',
      icon: FileBadge2,
      color: 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-200/60 dark:border-indigo-900/50',
    },
    {
      id: 'placements',
      title: language === 'hi' ? 'प्रशिक्षण एवं रोजगार' : 'Placement & Career',
      desc: language === 'hi' ? 'कैंपस प्लेसमेंट ड्राइव एवं कौशल विकास' : 'Campus recruitment & skill internships',
      icon: Briefcase,
      color: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-900/50',
    },
    {
      id: 'anti_ragging',
      title: language === 'hi' ? 'एंटी-रैगिंग एवं सुरक्षा' : 'Student Welfare',
      desc: language === 'hi' ? '24x7 हेल्पलाइन, आंतरिक शिकायत समिति' : 'Anti-ragging squad & grievance portal',
      icon: ShieldCheck,
      color: 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200/60 dark:border-rose-900/50',
    },
  ];

  return (
    <section id="home-student-services" className="px-3 py-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {language === 'hi' ? 'विद्यार्थी कल्याण एवं सहायता' : 'Student Services & Support'}
          </h3>
          <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
            {language === 'hi' ? 'छात्र हितैषी सुविधाएं' : 'Welfare, Scholarships & Careers'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigateTab('student')}
          className="text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1 cursor-pointer"
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'छात्र पोर्टल' : 'Student Desk'}</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {services.map((item) => {
          const Icon = item.icon;
          const handleServiceClick = () => {
            if (item.id === 'placements') {
              onNavigateTab('more', 'placement');
            } else if (item.id === 'anti_ragging') {
              onNavigateTab('more', 'antiragging');
            } else if (item.id === 'scholarships') {
              onNavigateTab('notices');
            } else {
              onNavigateTab('student');
            }
          };

          return (
            <div
              key={item.id}
              onClick={handleServiceClick}
              className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2 border ${item.color}`}>
                <Icon className="w-4 h-4 stroke-[2.2]" />
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mb-0.5 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                {item.title}
              </h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
