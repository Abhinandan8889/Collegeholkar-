import { useState, useEffect } from 'react';
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
  Briefcase,
  ShieldAlert,
  ArrowLeft,
  Database,
  Lock,
  Smartphone,
  Download,
} from 'lucide-react';
import { TabType, Language } from '../../types';
import { getTranslation } from '../../locales/strings';
import { CollegeLogo } from '../common/CollegeLogo';
import { COLLEGE_INFO } from '../../data/collegeData';

import { CentralLibraryView } from './CentralLibraryView';
import { GovernanceView } from './GovernanceView';
import { ResearchCellView } from './ResearchCellView';
import { PlacementCellView } from './PlacementCellView';
import { GrievanceAntiRaggingView } from './GrievanceAntiRaggingView';
import { CampusTourView } from './CampusTourView';

interface MoreMenuProps {
  onNavigateTab: (tab: TabType, subSection?: string) => void;
  onOpenSettings: () => void;
  onOpenExternalLink: (url: string, title: string) => void;
  onOpenAdminPanel?: () => void;
  onOpenApkModal?: () => void;
  language: Language;
  initialSubSection?: string;
  onShowToast?: (message: string) => void;
}

export function MoreMenu({
  onNavigateTab,
  onOpenSettings,
  onOpenExternalLink,
  onOpenAdminPanel,
  onOpenApkModal,
  language,
  initialSubSection,
  onShowToast,
}: MoreMenuProps) {
  const [activeSubView, setActiveSubView] = useState<string | null>(initialSubSection || null);

  useEffect(() => {
    if (initialSubSection) {
      setActiveSubView(initialSubSection);
    }
  }, [initialSubSection]);

  const handleBackToMenu = () => {
    setActiveSubView(null);
  };

  // If a sub-view is active, render it with an Android back bar
  if (activeSubView) {
    let Component = null;
    let title = 'Details';

    switch (activeSubView) {
      case 'library':
      case 'lib':
        Component = <CentralLibraryView language={language} onShowToast={onShowToast} />;
        title = language === 'hi' ? 'केंद्रीय ग्रंथालय' : 'Central Library';
        break;
      case 'governance':
      case 'administration':
        Component = <GovernanceView language={language} />;
        title = language === 'hi' ? 'स्वायत्त शासन' : 'Governance & Administration';
        break;
      case 'research':
        Component = <ResearchCellView language={language} onShowToast={onShowToast} />;
        title = language === 'hi' ? 'शोध प्रकोष्ठ' : 'Research & Development';
        break;
      case 'placement':
      case 'placements':
        Component = <PlacementCellView language={language} onShowToast={onShowToast} />;
        title = language === 'hi' ? 'प्रशिक्षण एवं प्लेसमेंट' : 'Placement & Careers';
        break;
      case 'antiragging':
      case 'anti_ragging':
      case 'grievance':
        Component = <GrievanceAntiRaggingView language={language} onShowToast={onShowToast} />;
        title = language === 'hi' ? 'एंटी-रैगिंग एवं शिकायत' : 'Anti-Ragging & Grievance';
        break;
      case 'gallery':
      case 'tour':
        Component = <CampusTourView language={language} onShowToast={onShowToast} />;
        title = language === 'hi' ? 'परिसर दर्शन' : 'Campus Landmarks';
        break;
      default:
        Component = null;
    }

    if (Component) {
      return (
        <div className="min-h-screen">
          {/* Sub-view Android Back Header */}
          <div className="sticky top-14 z-30 px-3 py-2.5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-2xs">
            <button
              type="button"
              onClick={handleBackToMenu}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
              <span>{language === 'hi' ? 'वापस मेनू' : 'Back to Menu'}</span>
            </button>
            <span className="text-xs font-extrabold text-slate-900 dark:text-slate-100 truncate max-w-[200px]">
              {title}
            </span>
          </div>

          {Component}
        </div>
      );
    }
  }

  const menuItems = [
    {
      id: 'android_apk',
      label: language === 'hi' ? 'एंड्रॉइड ऐप एवं एपीके डाउनलोड हब' : 'Android App & APK Distribution Hub',
      subtitle: language === 'hi' ? '1-क्लिक वेबएपीके इंस्टॉल, सोर्स कोड एवं प्रोजेक्ट जिप' : '1-Tap WebAPK, Android Studio Project (.ZIP) & Offline Setup',
      icon: Smartphone,
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50',
      action: () => {
        if (onOpenApkModal) {
          onOpenApkModal();
        }
      },
    },
    {
      id: 'library',
      label: language === 'hi' ? 'केंद्रीय ग्रंथालय एवं ई-रिसोर्स' : 'Central Library & OPAC',
      subtitle: language === 'hi' ? '1,25,000+ पुस्तकें, एन-लिस्ट व शोधसिंधु' : '1,25,000+ Volumes, N-LIST, RFID Kiosk',
      icon: Library,
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50',
      action: () => setActiveSubView('library'),
    },
    {
      id: 'governance',
      label: language === 'hi' ? 'स्वायत्त प्रशासन एवं शासी निकाय' : 'Autonomous Governance',
      subtitle: language === 'hi' ? 'शासी निकाय, अकादमिक परिषद, आईक्यूएसी' : 'Governing Body, Academic Council, IQAC',
      icon: ShieldCheck,
      color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50',
      action: () => setActiveSubView('governance'),
    },
    {
      id: 'research',
      label: language === 'hi' ? 'अनुसंधान एवं विकास (डीएसटी-फिस्ट)' : 'Research & CIF Labs',
      subtitle: language === 'hi' ? '8 शोध केंद्र, सीआईएफ उपकरण, पेटेंट्स' : '8 Ph.D. Centres, DST-FIST CIF, XRD, SEM',
      icon: Microscope,
      color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50',
      action: () => setActiveSubView('research'),
    },
    {
      id: 'placement',
      label: language === 'hi' ? 'प्रशिक्षण एवं प्लेसमेंट सेल' : 'Training & Placement Cell',
      subtitle: language === 'hi' ? 'शीर्ष भर्तीकर्ता, वेतन पैकेज व इंटर्नशिप' : 'Top Recruiters, Packages up to ₹12.5 LPA',
      icon: Briefcase,
      color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50',
      action: () => setActiveSubView('placement'),
    },
    {
      id: 'antiragging',
      label: language === 'hi' ? 'एंटी-रैगिंग एवं छात्र शिकायत निवारण' : 'Anti-Ragging & Grievance',
      subtitle: language === 'hi' ? '24x7 राष्ट्रीय हेल्पलाइन, ऑनलाइन शिकायत' : '24x7 Helpline, Online Ticket Tracking',
      icon: ShieldAlert,
      color: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50',
      action: () => setActiveSubView('antiragging'),
    },
    {
      id: 'gallery',
      label: language === 'hi' ? 'परिसर छायाचित्र व ऐतिहासिक स्थल' : 'Campus Landmarks & Heritage',
      subtitle: language === 'hi' ? '1891 हेरिटेज भवन, यशवंत हॉल, बॉटनिकल गार्डन' : '1891 Heritage Architecture, Botanical Garden',
      icon: Images,
      color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50',
      action: () => setActiveSubView('gallery'),
    },
    {
      id: 'about',
      label: language === 'hi' ? 'महाविद्यालय परिचय' : 'About College & History',
      subtitle: language === 'hi' ? 'इतिहास, दृष्टि, मिशन व प्राचार्य संदेश' : 'History, Vision, Mission & Principal',
      icon: Landmark,
      color: 'text-stone-600 dark:text-stone-400 bg-stone-100 dark:bg-stone-900',
      action: () => onNavigateTab('home', 'about'),
    },
    {
      id: 'links',
      label: language === 'hi' ? 'महत्वपूर्ण आधिकारिक पोर्टल्स' : 'Important Portals & Links',
      subtitle: language === 'hi' ? 'एमपीऑनलाइन, डीएवीवी, यूजीसी, डिजिलॉकर' : 'MPOnline, DAVV, DigiLocker, ABC ID',
      icon: Globe,
      color: 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/50',
      action: () => onNavigateTab('home', 'links'),
    },
    {
      id: 'contact',
      label: language === 'hi' ? 'संपर्क एवं स्थान' : 'Contact & Campus Map',
      subtitle: language === 'hi' ? 'भंवरकुआं, ए.बी. रोड, इंदौर 452001' : 'Bhawarkuan, A.B. Road, Indore',
      icon: PhoneCall,
      color: 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/50',
      action: () => onNavigateTab('home', 'contact'),
    },
    {
      id: 'settings',
      label: language === 'hi' ? 'ऐप सेटिंग्स' : 'App Settings',
      subtitle: language === 'hi' ? 'डार्क मोड, भाषा चयन, सूचनाएं' : 'Dark Mode, Language, Offline Cache, About',
      icon: Settings,
      color: 'text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80',
      action: onOpenSettings,
    },
    {
      id: 'admin_panel',
      label: language === 'hi' ? 'स्वायत्त एडमिन सुइट एवं डाटाबेस' : 'Autonomous Admin Suite & DB Studio',
      subtitle: language === 'hi' ? 'परीक्षा फॉर्म, पदोन्नति, परिणाम व पूर्ण डेटाबेस' : 'Protected Authority: Exam Forms, Promotions, Results & Full DB',
      icon: Database,
      color: 'text-sky-600 dark:text-sky-400 bg-sky-100 dark:bg-sky-950/80',
      action: () => {
        if (onOpenAdminPanel) {
          onOpenAdminPanel();
        }
      },
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
