import { Search, Bell, User } from 'lucide-react';
import { CollegeLogo } from '../common/CollegeLogo';
import { Language } from '../../types';
import { getTranslation } from '../../locales/strings';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  onOpenStudentLogin: () => void;
  onOpenSettings?: () => void;
  onToggleLanguage?: () => void;
  unreadNotificationsCount?: number;
  language: Language;
  isDarkMode?: boolean;
}

export function Header({
  onOpenSearch,
  onOpenNotifications,
  onOpenStudentLogin,
  onOpenSettings,
  onToggleLanguage,
  unreadNotificationsCount = 2,
  language,
  isDarkMode = false,
}: HeaderProps) {
  return (
    <header
      id="app-header"
      className={`sticky top-0 z-30 transition-colors shadow-sm ${
        isDarkMode
          ? 'bg-slate-900/95 border-b border-slate-800 backdrop-blur-md'
          : 'bg-white/95 border-b border-slate-200/80 backdrop-blur-md'
      }`}
    >
      <div className="px-3 py-2.5 flex items-center justify-between gap-2 max-w-md mx-auto">
        {/* College Logo & Title */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <CollegeLogo size="md" />

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="inline-block px-1.5 py-0.2 rounded text-[9px] font-bold tracking-wider uppercase bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-300">
                Model • Autonomous
              </span>
              <span className="text-[9px] font-semibold text-emerald-700 dark:text-emerald-400">
                NAAC A++
              </span>
            </div>

            <h1 className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-snug truncate">
              {language === 'hi'
                ? 'शासकीय होल्कर विज्ञान महाविद्यालय'
                : 'Govt. Holkar Science College'}
            </h1>

            <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
              {language === 'hi' ? 'इंदौर, मध्य प्रदेश' : 'Indore, Madhya Pradesh'}
            </p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Language Toggle Button */}
          {onToggleLanguage && (
            <button
              id="header-btn-lang"
              type="button"
              onClick={onToggleLanguage}
              aria-label="Toggle language"
              className="px-2 py-1 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer border border-slate-200 dark:border-slate-700 transition-colors"
            >
              {language === 'en' ? 'हिन्दी' : 'EN'}
            </button>
          )}

          {/* Search Button */}
          <button
            id="header-btn-search"
            type="button"
            onClick={onOpenSearch}
            aria-label={getTranslation(language, 'searchAction')}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all cursor-pointer"
          >
            <Search className="w-4 h-4 stroke-[2.2]" />
          </button>

          {/* Notifications Button */}
          <button
            id="header-btn-notifications"
            type="button"
            onClick={onOpenNotifications}
            aria-label={getTranslation(language, 'notifications')}
            className="relative w-8 h-8 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all cursor-pointer"
          >
            <Bell className="w-4 h-4 stroke-[2.2]" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute 1.5 top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
            )}
          </button>

          {/* Student Login Shortcut */}
          <button
            id="header-btn-student-login"
            type="button"
            onClick={onOpenStudentLogin}
            aria-label={getTranslation(language, 'studentLogin')}
            className="h-8 pl-2 pr-2.5 rounded-full flex items-center gap-1.5 text-xs font-semibold bg-amber-500 text-slate-950 hover:bg-amber-400 active:scale-95 transition-all shadow-xs cursor-pointer"
          >
            <User className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="text-[11px] hidden sm:inline">
              {getTranslation(language, 'studentLogin')}
            </span>
            <span className="text-[11px] sm:hidden">
              {language === 'hi' ? 'लॉगिन' : 'Login'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
