import React from 'react';
import {
  Users,
  FileCheck2,
  TrendingUp,
  Award,
  BellRing,
  Database,
  ShieldCheck,
  ArrowUpRight,
  Clock,
  Sparkles,
  Server,
  Download,
  PlusCircle,
  FileSpreadsheet,
} from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';

interface AdminDashboardOverviewProps {
  onNavigateTab: (tabId: string) => void;
  onOpenDatabaseStudio: () => void;
}

export function AdminDashboardOverview({ onNavigateTab, onOpenDatabaseStudio }: AdminDashboardOverviewProps) {
  const {
    students,
    examForms,
    promotionForms,
    results,
    notices,
    schemas,
    auditLogs,
    examSettings,
    promotionPolicy,
    exportFullDatabase,
  } = useDatabase();

  const pendingExamForms = examForms.filter((f) => f.formStatus === 'Submitted' || f.formStatus === 'Under Review');
  const pendingPromotions = promotionForms.filter((p) => p.status === 'Pending');
  const urgentNotices = notices.filter((n) => n.isImportant || (n as any).isMarqueeTicker);

  const handleQuickBackup = () => {
    const backup = exportFullDatabase();
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `holkar_autonomous_db_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-indigo-500/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2 border border-indigo-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Autonomous Institutional Administration System</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Control Hub & Dynamic Database Engine
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Real-time administration of Student Corner, Examination Registrations, NEP-2020 Progression, Result Publication, and Live Database Tables.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleQuickBackup}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-medium transition-colors shadow-sm cursor-pointer"
              title="Download full database snapshot as JSON"
            >
              <Download className="w-4 h-4 text-sky-400" />
              <span>Export Full DB Backup</span>
            </button>
            <button
              onClick={onOpenDatabaseStudio}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-medium transition-all shadow-lg shadow-indigo-600/30 cursor-pointer"
            >
              <Database className="w-4 h-4" />
              <span>Launch Database Studio</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Students */}
        <div
          onClick={() => onNavigateTab('students')}
          className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-2xl p-5 cursor-pointer transition-all hover:border-indigo-500/50 group shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Total Enrolled Students</span>
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{students.length}</span>
            <span className="text-xs text-emerald-400 font-medium flex items-center">
              <span>Active Profiles</span>
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-700/50">
            <span>Manage directory & dues</span>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-400" />
          </div>
        </div>

        {/* Pending Exam Forms */}
        <div
          onClick={() => onNavigateTab('exam_forms')}
          className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-2xl p-5 cursor-pointer transition-all hover:border-amber-500/50 group shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Autonomous Exam Forms</span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileCheck2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{examForms.length}</span>
            {pendingExamForms.length > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                {pendingExamForms.length} Pending Approval
              </span>
            )}
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-700/50">
            <span>Window: {examSettings.isOpen ? 'Active' : 'Closed'}</span>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-400" />
          </div>
        </div>

        {/* NEP Promotion Forms */}
        <div
          onClick={() => onNavigateTab('promotion')}
          className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-2xl p-5 cursor-pointer transition-all hover:border-emerald-500/50 group shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">NEP-2020 Promotions</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{promotionForms.length}</span>
            {pendingPromotions.length > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                {pendingPromotions.length} For Scrutiny
              </span>
            )}
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-700/50">
            <span>Progression: {promotionPolicy.minCreditsPercentRequired}% min credits</span>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-400" />
          </div>
        </div>

        {/* Database Tables */}
        <div
          onClick={onOpenDatabaseStudio}
          className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-2xl p-5 cursor-pointer transition-all hover:border-sky-500/50 group shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Database Tables</span>
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Database className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{schemas.length}</span>
            <span className="text-xs text-sky-400 font-medium">
              <span>Dynamic Tables</span>
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-700/50">
            <span>Import / Export & Custom Tables</span>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-sky-400" />
          </div>
        </div>
      </div>

      {/* Secondary Row: Quick Actions & Live Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Administrative Actions */}
        <div className="lg:col-span-1 bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-md space-y-4">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Instant Administrative Actions</span>
          </h3>

          <div className="space-y-2.5">
            <button
              onClick={() => onNavigateTab('students')}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-700/60 text-xs font-medium text-slate-200 transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-2.5">
                <PlusCircle className="w-4 h-4 text-indigo-400" />
                <span>Register New Student Profile</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
            </button>

            <button
              onClick={() => onNavigateTab('notices')}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-700/60 text-xs font-medium text-slate-200 transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-2.5">
                <BellRing className="w-4 h-4 text-blue-400" />
                <span>Broadcast New Notice / Ticker</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
            </button>

            <button
              onClick={() => onNavigateTab('promotion')}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-700/60 text-xs font-medium text-slate-200 transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-2.5">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Run Batch Semester Progression</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
            </button>

            <button
              onClick={() => onNavigateTab('results')}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-700/60 text-xs font-medium text-slate-200 transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Publish New Semester Results</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
            </button>

            <button
              onClick={onOpenDatabaseStudio}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-700/60 text-xs font-medium text-slate-200 transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-2.5">
                <FileSpreadsheet className="w-4 h-4 text-sky-400" />
                <span>Import CSV / Create New Table</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Audit Log / Activity Timeline */}
        <div className="lg:col-span-2 bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-400" />
                <span>Recent Administrative Activity & Audit Trail</span>
              </h3>
              <span className="text-xs text-slate-400">{auditLogs.length} logged actions</span>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {auditLogs.slice(0, 6).map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-xl bg-slate-900/70 border border-slate-700/60 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-indigo-300">{log.action}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                        {log.user}
                      </span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">{log.details}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0">{log.timestamp}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-emerald-400" />
              <span>Storage Engine: Client-Side Durable Persistent Storage</span>
            </span>
            <span className="text-slate-400">Instant Sync Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
