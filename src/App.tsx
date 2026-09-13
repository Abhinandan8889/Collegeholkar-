import { useState, useEffect, useRef } from 'react';
import { BottomNavBar } from './components/android/BottomNavBar';
import { Header } from './components/android/Header';

// Home components
import { HeroSection } from './components/home/HeroSection';
import { AnnouncementTicker } from './components/home/AnnouncementTicker';
import { QuickAccessGrid } from './components/home/QuickAccessGrid';
import { LatestNoticesSection } from './components/home/LatestNoticesSection';
import { StudentServicesSection } from './components/home/StudentServicesSection';
import { AcademicHighlightsSection } from './components/home/AcademicHighlightsSection';
import { DepartmentsPreview } from './components/home/DepartmentsPreview';
import { EventsSection } from './components/home/EventsSection';
import { ImportantLinksSection } from './components/home/ImportantLinksSection';
import { AboutSection } from './components/home/AboutSection';
import { ContactSection } from './components/home/ContactSection';
import { Footer } from './components/home/Footer';

// Views
import { AcademicsView } from './components/academics/AcademicsView';
import { NoticesView } from './components/notices/NoticesView';
import { StudentLoginPreview } from './components/student/StudentLoginPreview';
import { MoreMenu } from './components/more/MoreMenu';
import { SettingsView } from './components/more/SettingsView';

// Modals
import { NoticeViewerModal } from './components/modals/NoticeViewerModal';
import { DepartmentDetailModal } from './components/modals/DepartmentDetailModal';
import { EventDetailModal } from './components/modals/EventDetailModal';
import { SearchDialog } from './components/modals/SearchDialog';
import { NotificationsSheet } from './components/modals/NotificationsSheet';
import { SafeLinkModal } from './components/modals/SafeLinkModal';
import { AndroidApkModal } from './components/common/AndroidApkModal';
import { OfflineIndicator } from './components/common/OfflineIndicator';

// Types & Data
import { TabType, Language, NoticeItem, DepartmentItem, CollegeEventItem, ImportantLinkItem } from './types';
import { CheckCircle, Download, ShieldCheck, Database, Smartphone } from 'lucide-react';
import { AdminPortal } from './components/admin/AdminPortal';

export default function App() {
  const [viewMode, setViewMode] = useState<'app' | 'admin'>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      const search = window.location.search;
      if (hash === '#admin' || search.includes('admin=true') || search.includes('admin=1')) {
        return 'admin';
      }
    }
    return 'app';
  });

  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [academicsSubSection, setAcademicsSubSection] = useState<string | undefined>(undefined);
  const [moreSubSection, setMoreSubSection] = useState<string | undefined>(undefined);
  const [language, setLanguage] = useState<Language>('en');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isApkModalOpen, setIsApkModalOpen] = useState(false);

  // Sync hash changes for direct URL access to #admin
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setViewMode('admin');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Modals state
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentItem | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CollegeEventItem | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [safeLink, setSafeLink] = useState<{ url: string; title: string } | null>(null);

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const mainScrollRef = useRef<HTMLDivElement>(null);

  // Handle Dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleDownloadNotice = (notice: NoticeItem) => {
    showToast(`Downloading official notice: ${notice.referenceNo || 'GHC-NOTICE'}.pdf`);
  };

  const handleNavigateTab = (tab: TabType, subSection?: string) => {
    setIsSettingsOpen(false);
    setActiveTab(tab);

    if (tab === 'academics') {
      setAcademicsSubSection(subSection);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (mainScrollRef.current) {
        mainScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (tab === 'more') {
      setMoreSubSection(subSection);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (mainScrollRef.current) {
        mainScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (tab === 'home' && subSection) {
      // scroll to designated home section
      setTimeout(() => {
        const elem = document.getElementById(
          subSection === 'about'
            ? 'home-about-college'
            : subSection === 'events'
            ? 'home-events-section'
            : subSection === 'notices'
            ? 'home-latest-notices'
            : subSection === 'contact'
            ? 'home-contact-section'
            : subSection === 'links'
            ? 'home-important-links'
            : 'app-main-viewport'
        );
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (mainScrollRef.current) {
        mainScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleOpenExternalLink = (url: string, title: string) => {
    setSafeLink({ url, title });
  };

  if (viewMode === 'admin') {
    return (
      <AdminPortal
        onReturnToApp={() => {
          setViewMode('app');
          if (window.location.hash === '#admin') {
            window.location.hash = '';
          }
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-200 dark:bg-slate-950 flex flex-col items-center justify-center p-0 sm:p-4 md:p-6 relative">
      {/* Top Floating Switcher Bar for Admin Access (Desktop & Tablet) */}
      <aside
        aria-label="Administrative access"
        className="hidden sm:flex items-center justify-between w-full max-w-md mb-2 px-3 py-1.5 rounded-full bg-slate-900/90 dark:bg-slate-900/90 text-white backdrop-blur border border-slate-700/80 shadow-lg text-[11px]"
      >
        <button
          id="top-bar-btn-apk-install"
          type="button"
          onClick={() => setIsApkModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-semibold transition-all shadow-sm hover:scale-102 cursor-pointer"
        >
          <Smartphone className="w-3 h-3 text-white" />
          <span>Install Android App / APK</span>
        </button>
        <button
          onClick={() => {
            setViewMode('admin');
            window.location.hash = 'admin';
          }}
          className="flex items-center gap-1.5 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-semibold transition-all shadow-sm hover:scale-102 cursor-pointer"
        >
          <Database className="w-3 h-3 text-sky-300" />
          <span>Admin Suite & DB</span>
        </button>
      </aside>

      {/* Android Device Container Mockup Frame */}
      <div
        id="android-device-frame"
        className="w-full max-w-md h-[100dvh] sm:h-[92vh] sm:max-h-[890px] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 sm:rounded-[40px] shadow-2xl overflow-hidden flex flex-col relative border-0 sm:border-[8px] sm:border-slate-800"
      >
        {/* Material 3 App Header */}
        <Header
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenStudentLogin={() => handleNavigateTab('student')}
          onOpenApkModal={() => setIsApkModalOpen(true)}
          onOpenSettings={() => {
            setActiveTab('more');
            setIsSettingsOpen(true);
          }}
          language={language}
          onToggleLanguage={() => setLanguage(language === 'en' ? 'hi' : 'en')}
        />

        {/* Scrollable Viewport Area */}
        <div
          ref={mainScrollRef}
          id="app-main-viewport"
          className="flex-1 overflow-y-auto overscroll-y-auto relative scrollbar-none touch-pan-y"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {/* TAB 1: HOME */}
          {activeTab === 'home' && (
            <div className="space-y-1 pb-24">
              {/* 1. Hero Section */}
              <HeroSection
                onExploreAcademics={() => handleNavigateTab('academics')}
                onViewNotices={() => handleNavigateTab('notices')}
                language={language}
              />

              {/* 2. Announcement Ticker */}
              <AnnouncementTicker
                onSelectNotice={setSelectedNotice}
                language={language}
              />

              {/* 3. Quick Access Grid */}
              <QuickAccessGrid
                onNavigateTab={handleNavigateTab}
                language={language}
              />

              {/* 4. Latest Notices Section */}
              <LatestNoticesSection
                onSelectNotice={setSelectedNotice}
                onDownloadNotice={handleDownloadNotice}
                onViewAllNotices={() => handleNavigateTab('notices')}
                language={language}
              />

              {/* 5. Student Services Section */}
              <StudentServicesSection
                onNavigateTab={handleNavigateTab}
                language={language}
              />

              {/* 6. Academic Highlights Section */}
              <AcademicHighlightsSection
                onNavigateTab={handleNavigateTab}
                language={language}
              />

              {/* 7. Departments Preview Section */}
              <DepartmentsPreview
                onSelectDepartment={setSelectedDepartment}
                onNavigateTab={handleNavigateTab}
                language={language}
              />

              {/* 8. Events Section */}
              <EventsSection
                onSelectEvent={setSelectedEvent}
                onNavigateTab={handleNavigateTab}
                language={language}
              />

              {/* 9. Important Links Section */}
              <ImportantLinksSection
                onSelectLink={(link) => setSafeLink({ url: link.url, title: link.title })}
                language={language}
              />

              {/* 10. About College Section */}
              <AboutSection language={language} />

              {/* 11. Contact Section */}
              <ContactSection
                onOpenExternalLink={handleOpenExternalLink}
                language={language}
              />

              {/* 12. Footer */}
              <Footer
                onOpenExternalLink={handleOpenExternalLink}
                language={language}
              />
            </div>
          )}

          {/* TAB 2: ACADEMICS */}
          {activeTab === 'academics' && (
            <AcademicsView
              onSelectDepartment={setSelectedDepartment}
              language={language}
              initialSubSection={academicsSubSection}
              onShowToast={showToast}
            />
          )}

          {/* TAB 3: NOTICES */}
          {activeTab === 'notices' && (
            <NoticesView
              onSelectNotice={setSelectedNotice}
              onDownloadNotice={handleDownloadNotice}
              language={language}
              onShowToast={showToast}
            />
          )}

          {/* TAB 4: STUDENT */}
          {activeTab === 'student' && (
            <StudentLoginPreview language={language} onShowToast={showToast} />
          )}

          {/* TAB 5: MORE */}
          {activeTab === 'more' && (
            <>
              {isSettingsOpen ? (
                <SettingsView
                  language={language}
                  onLanguageChange={setLanguage}
                  isDarkMode={isDarkMode}
                  onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                  onBack={() => setIsSettingsOpen(false)}
                />
              ) : (
                <MoreMenu
                  onNavigateTab={handleNavigateTab}
                  onOpenSettings={() => setIsSettingsOpen(true)}
                  onOpenExternalLink={handleOpenExternalLink}
                  onOpenAdminPanel={() => {
                    setViewMode('admin');
                    window.location.hash = 'admin';
                  }}
                  onOpenApkModal={() => setIsApkModalOpen(true)}
                  language={language}
                  initialSubSection={moreSubSection}
                  onShowToast={showToast}
                />
              )}
            </>
          )}
        </div>

        {/* Toast Notification Alert */}
        {toastMessage && (
          <div className="absolute top-16 left-4 right-4 z-40 p-3 rounded-2xl bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950 shadow-xl border border-slate-700 dark:border-amber-400 text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top duration-200">
            <CheckCircle className="w-4 h-4 text-emerald-400 dark:text-slate-950 shrink-0" />
            <span className="truncate flex-1">{toastMessage}</span>
          </div>
        )}

        {/* Material 3 Bottom Navigation Bar */}
        <BottomNavBar
          currentTab={activeTab}
          onSelectTab={(tab) => {
            setIsSettingsOpen(false);
            setActiveTab(tab);
          }}
          language={language}
          isDarkMode={isDarkMode}
        />

        {/* MODAL 1: Notice & PDF Viewer */}
        <NoticeViewerModal
          notice={selectedNotice}
          onClose={() => setSelectedNotice(null)}
          onDownload={handleDownloadNotice}
          language={language}
        />

        {/* MODAL 2: Department Detail */}
        <DepartmentDetailModal
          department={selectedDepartment}
          onClose={() => setSelectedDepartment(null)}
          language={language}
        />

        {/* MODAL 3: Event Detail */}
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          language={language}
        />

        {/* MODAL 4: Global Search Dialog */}
        <SearchDialog
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelectNotice={(n) => {
            setSelectedNotice(n);
            setIsSearchOpen(false);
          }}
          onSelectDepartment={(d) => {
            setSelectedDepartment(d);
            setIsSearchOpen(false);
          }}
          onSelectEvent={(e) => {
            setSelectedEvent(e);
            setIsSearchOpen(false);
          }}
          onSelectLink={(l) => {
            setIsSearchOpen(false);
            setSafeLink({ url: l.url, title: l.title });
          }}
          language={language}
        />

        {/* MODAL 5: Notifications FCM Sheet */}
        <NotificationsSheet
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
          onSelectNotice={(n) => {
            setSelectedNotice(n);
            setIsNotificationsOpen(false);
          }}
          language={language}
        />

        {/* MODAL 6: Safe Link Dialog */}
        <SafeLinkModal
          url={safeLink ? safeLink.url : null}
          title={safeLink ? safeLink.title : undefined}
          onClose={() => setSafeLink(null)}
        />

        {/* MODAL 7: Android APK & Installation Hub */}
        <AndroidApkModal
          isOpen={isApkModalOpen}
          onClose={() => setIsApkModalOpen(false)}
          onShowToast={showToast}
        />

        {/* Persistent Offline Status Banner */}
        <OfflineIndicator />
      </div>
    </div>
  );
}
