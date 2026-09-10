import { motion } from 'motion/react';
import { Home, GraduationCap, Bell, User, MoreHorizontal } from 'lucide-react';
import { TabType, Language } from '../../types';
import { getTranslation } from '../../locales/strings';

interface BottomNavBarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  unreadNoticesCount?: number;
  language: Language;
  isDarkMode?: boolean;
}

export function BottomNavBar({
  currentTab,
  onSelectTab,
  unreadNoticesCount = 3,
  language,
  isDarkMode = false,
}: BottomNavBarProps) {
  const tabs: { id: TabType; labelKey: string; icon: typeof Home }[] = [
    { id: 'home', labelKey: 'tabHome', icon: Home },
    { id: 'academics', labelKey: 'tabAcademics', icon: GraduationCap },
    { id: 'notices', labelKey: 'tabNotices', icon: Bell },
    { id: 'student', labelKey: 'tabStudent', icon: User },
    { id: 'more', labelKey: 'tabMore', icon: MoreHorizontal },
  ];

  return (
    <nav
      id="android-bottom-nav"
      aria-label="Bottom Navigation"
      className={`relative z-30 w-full border-t transition-colors ${
        isDarkMode
          ? 'bg-slate-900/95 border-slate-800 text-slate-400 backdrop-blur-md'
          : 'bg-white/95 border-slate-200 text-slate-600 backdrop-blur-md shadow-[0_-4px_16px_rgba(0,0,0,0.04)]'
      }`}
    >
      <div className="flex items-center justify-around h-16 max-w-md mx-auto px-2">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          const Icon = tab.icon;
          const label = getTranslation(language, tab.labelKey);

          return (
            <button
              key={tab.id}
              id={`nav-tab-${tab.id}`}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className="group relative flex flex-col items-center justify-center flex-1 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg cursor-pointer"
            >
              {/* Material 3 Active Pill Container */}
              <div className="relative flex items-center justify-center px-4 py-1 rounded-full transition-all duration-200">
                {isActive && (
                  <motion.div
                    layoutId="m3-nav-pill"
                    className={`absolute inset-0 rounded-full ${
                      isDarkMode
                        ? 'bg-amber-500/20 ring-1 ring-amber-500/40'
                        : 'bg-amber-100/90 text-amber-900'
                    }`}
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}

                <div className="relative">
                  <Icon
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isActive
                        ? isDarkMode
                          ? 'text-amber-400 stroke-[2.4] scale-110'
                          : 'text-amber-800 stroke-[2.4] scale-110'
                        : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200 stroke-[1.8]'
                    }`}
                  />

                  {/* Badge for Notices */}
                  {tab.id === 'notices' && unreadNoticesCount > 0 && (
                    <span className="absolute -top-1.5 -right-2.5 flex items-center justify-center min-w-4 h-4 px-1 text-[10px] font-bold text-white bg-rose-600 rounded-full ring-2 ring-white dark:ring-slate-900">
                      {unreadNoticesCount}
                    </span>
                  )}
                </div>
              </div>

              {/* Label */}
              <span
                className={`text-[11px] mt-0.5 tracking-tight transition-colors whitespace-nowrap ${
                  isActive
                    ? isDarkMode
                      ? 'font-bold text-amber-300'
                      : 'font-bold text-amber-900'
                    : 'font-medium text-slate-500 dark:text-slate-400'
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
