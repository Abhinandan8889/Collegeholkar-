import { useState } from 'react';
import {
  Moon,
  Sun,
  Languages,
  Bell,
  Download,
  Shield,
  FileText,
  Info,
  ChevronRight,
  ArrowLeft,
  Check,
} from 'lucide-react';
import { Language } from '../../types';
import { getTranslation } from '../../locales/strings';
import { CollegeLogo } from '../common/CollegeLogo';

interface SettingsViewProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onBack: () => void;
}

export function SettingsView({
  language,
  onLanguageChange,
  isDarkMode,
  onToggleDarkMode,
  onBack,
}: SettingsViewProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoDownloadDocs, setAutoDownloadDocs] = useState(false);
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | 'about' | null>(null);

  return (
    <div id="settings-view" className="min-h-screen pb-20 bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <div className="px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3 sticky top-0 z-20">
        <button
          type="button"
          onClick={onBack}
          aria-label="Go back"
          className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            {getTranslation(language, 'settings')}
          </h2>
          <span className="text-[10.5px] text-slate-400">
            Preferences, Theme & App Info
          </span>
        </div>
      </div>

      <div className="p-3 max-w-md mx-auto space-y-3">
        {/* Appearance & Theme */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Appearance & Interface
          </span>

          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-slate-800 flex items-center justify-center text-amber-600 dark:text-amber-400">
                {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
                  {getTranslation(language, 'darkMode')}
                </span>
                <span className="text-[10.5px] text-slate-400">
                  {isDarkMode ? 'Material 3 Dark Theme' : 'Material 3 Light Theme'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onToggleDarkMode}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer flex items-center ${
                isDarkMode ? 'bg-amber-500 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-white shadow-sm" />
            </button>
          </div>

          {/* Language Selector */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Languages className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
                  {getTranslation(language, 'languageOption')}
                </span>
                <span className="text-[10.5px] text-slate-400">
                  {language === 'en' ? 'English (Primary)' : 'हिन्दी (Hindi)'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-0.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-2xs'
                    : 'text-slate-500'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('hi')}
                className={`px-2 py-0.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  language === 'hi'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-2xs'
                    : 'text-slate-500'
                }`}
              >
                HI
              </button>
            </div>
          </div>
        </div>

        {/* Notifications & Cache */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            System & Storage
          </span>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/50 flex items-center justify-center text-rose-600 dark:text-rose-400">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
                  {getTranslation(language, 'notificationPref')}
                </span>
                <span className="text-[10.5px] text-slate-400">
                  FCM Push Alerts for Notices & Exams
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer flex items-center ${
                notificationsEnabled ? 'bg-amber-500 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-white shadow-sm" />
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Download className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
                  {getTranslation(language, 'downloadSettings')}
                </span>
                <span className="text-[10.5px] text-slate-400">
                  Preload syllabus & circular PDFs on Wi-Fi
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setAutoDownloadDocs(!autoDownloadDocs)}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer flex items-center ${
                autoDownloadDocs ? 'bg-amber-500 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-white shadow-sm" />
            </button>
          </div>
        </div>

        {/* Legal & App Info */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Information & Legal
          </span>

          <button
            type="button"
            onClick={() => setActiveModal('privacy')}
            className="w-full py-2 flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Shield className="w-4 h-4 text-slate-400" />
              <span>{getTranslation(language, 'privacyPolicy')}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            type="button"
            onClick={() => setActiveModal('terms')}
            className="w-full py-2 flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 border-t border-slate-100 dark:border-slate-800 cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-slate-400" />
              <span>{getTranslation(language, 'termsConditions')}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            type="button"
            onClick={() => setActiveModal('about')}
            className="w-full py-2 flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 border-t border-slate-100 dark:border-slate-800 cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Info className="w-4 h-4 text-slate-400" />
              <span>{getTranslation(language, 'aboutApp')}</span>
            </div>
            <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 font-bold">v1.0.0</span>
          </button>
        </div>
      </div>

      {/* Info Modals */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
          role="dialog"
        >
          <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 space-y-3 shadow-2xl">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <CollegeLogo size="sm" />
              <span>
                {activeModal === 'privacy'
                  ? 'Privacy Policy'
                  : activeModal === 'terms'
                  ? 'Terms & Conditions'
                  : 'About Holkar Science College App'}
              </span>
            </h3>

            <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-h-60 overflow-y-auto space-y-2 p-1">
              {activeModal === 'privacy' && (
                <p>
                  This official mobile application respects user privacy. Public notices, departments, and academic information are served securely over HTTPS. No personal data is harvested from visitors or guests.
                </p>
              )}
              {activeModal === 'terms' && (
                <p>
                  All academic information, notices, and syllabi displayed within this application are governed by the Autonomous ordinances of Government Holkar Science College and Devi Ahilya Vishwavidyalaya, Indore.
                </p>
              )}
              {activeModal === 'about' && (
                <div className="space-y-1 text-center">
                  <div className="font-bold text-slate-900 dark:text-slate-100 text-xs">
                    Govt. Holkar Science College Official Mobile App
                  </div>
                  <div className="text-[11px] text-amber-600 font-bold">Version 1.0.0 (Build 2026.05)</div>
                  <div className="text-[10px] text-slate-400">
                    Developed for Department of Higher Education MP and Holkar Science College Indore.
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="w-full py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
