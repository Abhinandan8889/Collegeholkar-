import {
  Landmark,
  ShieldCheck,
  Microscope,
  Library,
  UserPlus,
  Sparkles,
  Images,
  Globe,
  PhoneCall,
  Settings,
  ChevronRight,
  GraduationCap,
  ExternalLink,
} from 'lucide-react';
import { TabType, Language } from '../../types';
import { getTranslation } from '../../locales/strings';
import { CollegeLogo } from '../common/CollegeLogo';
import { COLLEGE_INFO } from '../../data/collegeData';

interface MoreMenuProps {
  onNavigateTab: (tab: TabType, subSection?: string) => void;
  onOpenSettings: () => void;
  onOpenExternalLink: (url: string, title: string) => void;
  language: Language;
}

export function MoreMenu({
  onNavigateTab,
  onOpenSettings,
  onOpenExternalLink,
  language,
}: MoreMenuProps) {
  const menuItems = [
    {
      id: 'about',
      label: language === 'hi' ? 'महाविद्यालय परिचय' : 'About College',
      subtitle: language === 'hi' ? 'इतिहास, दृष्टि, मिशन व प्राचार्य' : 'History, Vision, Mission & Principal',
      icon: Landmark,
      color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50',
      action: () => onNavigateTab('home', 'about'),
    },
    {
      id: 'administration',
      label: language === 'hi' ? 'महाविद्यालय प्रशासन' : 'Administration & Governance',
      subtitle: language === 'hi' ? 'शासी निकाय, स्वायत्त परिषद, समितियां' : 'Governing Body, Academic Council',
      icon: ShieldCheck,
      color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50',
      action: () => onNavigateTab('home', 'about'),
    },
    {
      id: 'research',
      label: language === 'hi' ? 'अनुसंधान एवं विकास' : 'Research & Development',
      subtitle: language === 'hi' ? 'शोध केंद्र, शोध पत्र, पेटेंट्स व परियोजनाएं' : '8 Research Centres, Publications, DST-FIST',
      icon: Microscope,
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50',
      action: () => onNavigateTab('academics', 'programmes'),
    },
    {
      id: 'library',
      label: language === 'hi' ? 'केंद्रीय पुस्तकालय एवं ई-संसाधन' : 'Central Library & E-Resources',
      subtitle: language === 'hi' ? '1,00,000+ पुस्तकें, एन-लिस्ट व शोधसिंधु' : '100,000+ Volumes, N-LIST Digital Portal',
      icon: Library,
      color: 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/50',
      action: () => onNavigateTab('academics', 'syllabus'),
    },
    {
      id: 'admissions',
      label: language === 'hi' ? 'प्रवेश प्रक्रिया' : 'Admissions (e-Pravesh)',
      subtitle: language === 'hi' ? 'स्नातक एवं स्नातकोत्तर प्रवेश विवरण' : 'UG & PG Admissions Merit Guidelines',
      icon: UserPlus,
      color: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50',
      action: () => onNavigateTab('academics', 'programmes'),
    },
    {
      id: 'events',
      label: language === 'hi' ? 'कार्यक्रम एवं उत्सव' : 'Campus Events & Sports',
      subtitle: language === 'hi' ? 'राष्ट्रीय विज्ञान दिवस, वार्षिक खेलकूद' : 'Science Day, Athletics & Conferences',
      icon: Sparkles,
      color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50',
      action: () => onNavigateTab('home', 'events'),
    },
    {
      id: 'gallery',
      label: language === 'hi' ? 'परिसर छायाचित्र दीर्घा' : 'Campus Gallery',
      subtitle: language === 'hi' ? '34 एकड़ हरित परिसर, हेरिटेज भवन' : 'Botanical Garden, Heritage Campus, Labs',
      icon: Images,
      color: 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/50',
      action: () => onNavigateTab('home', 'hero'),
    },
    {
      id: 'links',
      label: language === 'hi' ? 'महत्वपूर्ण आधिकारिक लिंक्स' : 'Important Official Portals',
      subtitle: language === 'hi' ? 'एमपीऑनलाइन, डीएवीवी, यूजीसी, एबीसी' : 'MPOnline, DAVV, DigiLocker, ABC ID',
      icon: Globe,
      color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50',
      action: () => onNavigateTab('home', 'links'),
    },
    {
      id: 'contact',
      label: language === 'hi' ? 'संपर्क एवं स्थान' : 'Contact & Campus Map',
      subtitle: language === 'hi' ? 'भंवरकुआं, ए.बी. रोड, इंदौर 452001' : 'Bhawarkuan, A.B. Road, Indore',
      icon: PhoneCall,
      color: 'text-stone-600 dark:text-stone-400 bg-slate-100 dark:bg-slate-800',
      action: () => onNavigateTab('home', 'contact'),
    },
    {
      id: 'settings',
      label: language === 'hi' ? 'ऐप सेटिंग्स' : 'App Settings',
      subtitle: language === 'hi' ? 'डार्क मोड, भाषा चयन, सूचनाएं' : 'Dark Mode, Language, Cache, About',
      icon: Settings,
      color: 'text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80',
      action: onOpenSettings,
    },
  ];

  return (
    <div id="more-menu-view" className="min-h-screen pb-20">
      {/* College Identity Banner */}
      <div className="p-4 bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 text-white shadow-sm flex items-center gap-3">
        <CollegeLogo size="md" />
        <div className="min-w-0">
          <h2 className="text-sm font-bold truncate">
            {language === 'hi' ? COLLEGE_INFO.nameHi : COLLEGE_INFO.nameEn}
          </h2>
          <span className="text-[11px] text-amber-300">
            {COLLEGE_INFO.accreditation.split('with')[0]} • {COLLEGE_INFO.city}
          </span>
        </div>
      </div>

      {/* Menu Options List */}
      <div className="p-3 max-w-md mx-auto space-y-1.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1 block mb-1">
          Explore College Sections
        </span>

        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={item.action}
              className="w-full p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-amber-400/80 shadow-2xs hover:shadow-xs transition-all flex items-center justify-between gap-3 text-left cursor-pointer group active:scale-98"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.color} group-hover:scale-105 transition-transform`}
                >
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {item.label}
                  </h4>
                  <p className="text-[10.5px] text-slate-500 dark:text-slate-400 truncate">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
