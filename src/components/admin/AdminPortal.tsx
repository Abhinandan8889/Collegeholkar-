import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  FileCheck2,
  TrendingUp,
  Award,
  BellRing,
  Building2,
  ShieldAlert,
  Database,
  LogOut,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';
import { AdminLogin } from './AdminLogin';
import { AdminDashboardOverview } from './AdminDashboardOverview';
import { AdminStudentsView } from './AdminStudentsView';
import { AdminExamFormsView } from './AdminExamFormsView';
import { AdminPromotionView } from './AdminPromotionView';
import { AdminResultsView } from './AdminResultsView';
import { AdminNoticesView } from './AdminNoticesView';
import { AdminAcademicsView } from './AdminAcademicsView';
import { AdminGrievancesView } from './AdminGrievancesView';
import { DatabaseStudioView } from './DatabaseStudioView';

interface AdminPortalProps {
  onReturnToApp?: () => void;
}

export function AdminPortal({ onReturnToApp }: AdminPortalProps) {
  const { adminSession, adminLogout, examForms, promotionForms, grievances } = useDatabase();
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'students'
    | 'exam_forms'
    | 'promotion'
    | 'results'
    | 'notices'
    | 'academics'
    | 'grievances'
    | 'database'
  >('overview');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // If not authenticated, display the secure admin login screen
  if (!adminSession) {
    return <AdminLogin onReturnToApp={onReturnToApp} onBackToApp={onReturnToApp} />;
  }

  const pendingExamForms = examForms.filter((f) => f.formStatus === 'Submitted').length;
  const pendingPromotions = promotionForms.filter((p) => p.status === 'Pending').length;
  const pendingGrievances = grievances.filter((g) => g.status === 'Submitted').length;

  const navItems = [
    {
      id: 'overview',
      label: 'Control Dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'students',
      label: 'Student Corner',
      icon: Users,
      badge: null,
    },
    {
      id: 'exam_forms',
      label: 'Exam Forms & Sessions',
      icon: FileCheck2,
      badge: pendingExamForms > 0 ? pendingExamForms : null,
      badgeColor: 'bg-amber-500',
    },
    {
      id: 'promotion',
      label: 'NEP Progression & Forms',
      icon: TrendingUp,
      badge: pendingPromotions > 0 ? pendingPromotions : null,
      badgeColor: 'bg-emerald-500',
    },
    {
      id: 'results',
      label: 'Results & Grade Cards',
      icon: Award,
      badge: null,
    },
    {
      id: 'notices',
      label: 'Notices & Marquee Ticker',
      icon: BellRing,
      badge: null,
    },
    {
      id: 'academics',
      label: 'Academic Departments',
      icon: Building2,
      badge: null,
    },
    {
      id: 'grievances',
      label: 'Grievance Redressal',
      icon: ShieldAlert,
      badge: pendingGrievances > 0 ? pendingGrievances : null,
      badgeColor: 'bg-rose-500',
    },
    {
      id: 'database',
      label: 'Database Studio (Full Access)',
      icon: Database,
      badge: 'SQL/CRUD',
      badgeColor: 'bg-sky-500 text-white',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Admin Header Bar */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
          >
            {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-3">
            <img
              src="https://collegeholkar.org/assets/images/logo.png"
              alt="Holkar College Crest"
              className="w-9 h-9 object-contain bg-white rounded-lg p-1 shadow"
              onError={(e) => {
                // fallback if network issue
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>Holkar Autonomous Admin Suite</span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-700/60">
                  Autonomous Central Authority
                </span>
              </div>
              <div className="text-[11px] text-slate-400 hidden sm:block">
                Govt. Model Autonomous Holkar Science College, Indore
              </div>
            </div>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2.5">
          {onReturnToApp && (
            <button
              onClick={onReturnToApp}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
              title="Switch to Mobile / Student Preview Mode"
            >
              <Smartphone className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden md:inline">Open Student App</span>
            </button>
          )}

          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="w-7 h-7 rounded-full bg-indigo-600/30 text-indigo-300 flex items-center justify-center font-bold text-xs border border-indigo-500/40">
              {adminSession.username.charAt(0).toUpperCase()}
            </div>
            <div className="text-left leading-tight hidden xl:block">
              <div className="text-xs font-semibold text-white">{adminSession.name}</div>
              <div className="text-[10px] text-slate-400">{adminSession.role}</div>
            </div>
          </div>

          <button
            onClick={adminLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800/50 text-xs font-medium transition-colors cursor-pointer"
            title="Sign out of Admin Suite"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Nav */}
        <aside
          className={`fixed lg:static inset-y-16 left-0 z-30 w-64 bg-slate-900/95 lg:bg-slate-900 border-r border-slate-800 p-4 flex flex-col justify-between transition-transform duration-200 ${
            isMobileNavOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="space-y-1">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Administrative Navigation
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any);
                    setIsMobileNavOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge !== null && (
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold shrink-0 ${
                        item.badgeColor || 'bg-slate-700 text-slate-200'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Admin Meta Info */}
          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 space-y-2">
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Database Sync Active</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-tight">
              All administrative changes automatically sync to live student screens and client state.
            </p>
          </div>
        </aside>

        {/* Content View Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-950">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'overview' && (
              <AdminDashboardOverview
                onNavigateTab={(tab) => setActiveTab(tab as any)}
                onOpenDatabaseStudio={() => setActiveTab('database')}
              />
            )}
            {activeTab === 'students' && <AdminStudentsView />}
            {activeTab === 'exam_forms' && <AdminExamFormsView />}
            {activeTab === 'promotion' && <AdminPromotionView />}
            {activeTab === 'results' && <AdminResultsView />}
            {activeTab === 'notices' && <AdminNoticesView />}
            {activeTab === 'academics' && <AdminAcademicsView />}
            {activeTab === 'grievances' && <AdminGrievancesView />}
            {activeTab === 'database' && <DatabaseStudioView />}
          </div>
        </main>
      </div>
    </div>
  );
}
