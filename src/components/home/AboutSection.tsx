import { useState } from 'react';
import {
  Landmark,
  Compass,
  Award,
  BookOpen,
  UserCheck,
  ChevronDown,
  Building,
  Target,
  Sparkles,
} from 'lucide-react';
import { COLLEGE_INFO } from '../../data/collegeData';
import { CollegeLogo } from '../common/CollegeLogo';
import { Language } from '../../types';
import { getTranslation } from '../../locales/strings';

interface AboutSectionProps {
  language: Language;
}

export function AboutSection({ language }: AboutSectionProps) {
  const [activeTab, setActiveTab] = useState<'about' | 'history' | 'vision' | 'principal' | 'accreditation'>('about');

  return (
    <section id="home-about-college" className="px-3 py-4">
      <div className="mb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {getTranslation(language, 'aboutCollege')}
        </h3>
        <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
          {language === 'hi' ? 'महाविद्यालय परिचय एवं ऐतिहासिक धरोहर' : 'Heritage of Scientific Education & Governance'}
        </p>
      </div>

      {/* College Identity Overview Card */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-300/40 dark:border-amber-900/40 mb-3 shadow-2xs">
        <div className="flex items-start gap-3">
          <CollegeLogo size="lg" />
          <div className="min-w-0 flex-1">
            <span className="inline-block px-2 py-0.5 rounded-md text-[9px] font-bold bg-amber-500 text-slate-950 uppercase tracking-wider mb-1">
              ESTD. {COLLEGE_INFO.establishedYear}
            </span>
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-snug">
              {language === 'hi' ? COLLEGE_INFO.nameHi : COLLEGE_INFO.nameEn}
            </h4>
            <p className="text-[10px] text-amber-700 dark:text-amber-300 font-medium italic mt-0.5">
              "{COLLEGE_INFO.motto}"
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              <span className="px-1.5 py-0.5 rounded text-[9.5px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                {COLLEGE_INFO.accreditation.split('with')[0]}
              </span>
              <span className="px-1.5 py-0.5 rounded text-[9.5px] font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                UGC Autonomous
              </span>
              <span className="px-1.5 py-0.5 rounded text-[9.5px] font-semibold bg-slate-200/80 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                DAVV Affiliated
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Segmented Selector for Detail Sub-sections */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none mb-2.5">
        {[
          { id: 'about', label: language === 'hi' ? 'परिचय' : 'Overview', icon: Building },
          { id: 'history', label: language === 'hi' ? 'इतिहास' : 'History', icon: Landmark },
          { id: 'vision', label: language === 'hi' ? 'दृष्टि व लक्ष्य' : 'Vision & Mission', icon: Target },
          { id: 'principal', label: language === 'hi' ? 'प्राचार्य संदेश' : "Principal's Desk", icon: UserCheck },
          { id: 'accreditation', label: language === 'hi' ? 'प्रत्यायन' : 'Accreditation', icon: Award },
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-2xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Content Panel */}
      <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        {activeTab === 'about' && (
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 text-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Premier Autonomous Science Institution in Central India</span>
            </h5>
            <p>
              Government Holkar (Model, Autonomous) Science College, situated in the heart of Indore, Madhya Pradesh, is an apex higher learning sanctuary dedicated purely to scientific disciplines. Established in 1891, the college spans a verdant 34-acre campus equipped with modern laboratories, advanced computer centres, and dedicated research institutes.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 block font-semibold">Institutional Status</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">Model Autonomous College</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 block font-semibold">Affiliated University</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">DAVV, Indore</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 text-xs">
              <Landmark className="w-3.5 h-3.5 text-amber-500" />
              <span>Founded in 1891 by Maharaja Shivaji Rao Holkar</span>
            </h5>
            <p>
              The illustrious history of the college dates back to 10th June 1891, when His Highness Maharaja Shivaji Rao Holkar Bahadur, an ardent patron of education and modern science, founded this institution to foster rational inquiry and higher education in Central India.
            </p>
            <p>
              Starting with foundational departments of Physics and Chemistry, the institution has nurtured thousands of distinguished scientists, civil servants, educators, and innovators who have served India with distinction.
            </p>
          </div>
        )}

        {activeTab === 'vision' && (
          <div className="space-y-2.5">
            <div className="p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900">
              <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider block mb-0.5">
                Our Vision
              </span>
              <p className="font-medium text-slate-800 dark:text-slate-200 text-[11px]">
                "To be a globally recognized centre of excellence in science education, research, and innovation, nurturing scientifically empowered citizens committed to sustainable development and national progress."
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900">
              <span className="text-[10px] font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider block mb-0.5">
                Our Mission
              </span>
              <ul className="text-[11px] space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
                <li>Impart comprehensive scientific education blending theoretical mastery with laboratory rigor.</li>
                <li>Foster multidisciplinary research aligned with national scientific missions.</li>
                <li>Inculcate ethical scientific temper, inclusivity, and environmental stewardship.</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'principal' && (
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-amber-500 flex items-center justify-center font-bold text-base text-amber-700 dark:text-amber-300 shrink-0">
                PS
              </div>
              <div>
                <h5 className="font-bold text-slate-900 dark:text-slate-100 text-xs">
                  {COLLEGE_INFO.principalName}
                </h5>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block leading-tight">
                  {COLLEGE_INFO.principalDesignation}
                </span>
                <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400">
                  {COLLEGE_INFO.email}
                </span>
              </div>
            </div>
            <p className="text-[11px] italic bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700">
              "It gives me immense pleasure to welcome young aspirants to Government Holkar Science College. With over 135 years of glorious history, our autonomous status and NAAC 'A++' rating empower us to provide a cutting-edge curriculum under NEP-2020."
            </p>
          </div>
        )}

        {activeTab === 'accreditation' && (
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 text-xs">
              <Award className="w-3.5 h-3.5 text-emerald-500" />
              <span>Highest National Academic Benchmarks</span>
            </h5>
            <div className="space-y-1.5">
              <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  NAAC Grade 'A++' with CGPA 3.64 / 4.00
                </span>
                <p className="text-[10px] text-emerald-700 dark:text-emerald-400">
                  Accredited in Cycle 4 for exceptional curriculum, research output, infrastructure, and governance.
                </p>
              </div>
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
                <span className="text-xs font-bold text-indigo-800 dark:text-indigo-300">
                  UGC Model Autonomous College
                </span>
                <p className="text-[10px] text-indigo-700 dark:text-indigo-400">
                  Autonomous authority to design innovative curricula, conduct internal examinations, and confer credit qualifications.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
