import React, { useState } from 'react';
import {
  TrendingUp,
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  Settings,
  Search,
  Users,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Save,
  Trash2,
} from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';
import { PromotionFormRecord } from '../../types/database';

export function AdminPromotionView() {
  const {
    promotionForms,
    promotionPolicy,
    updatePromotionPolicy,
    updatePromotionStatus,
    bulkPromoteBatch,
    deletePromotionForm,
    students,
  } = useDatabase();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);

  // Policy form state
  const [minCreditsPercent, setMinCreditsPercent] = useState(promotionPolicy.minCreditsPercentRequired);
  const [maxBacklogs, setMaxBacklogs] = useState(promotionPolicy.maxBacklogsPermitted);
  const [academicYear, setAcademicYear] = useState(promotionPolicy.academicYear);
  const [isWindowOpen, setIsWindowOpen] = useState(promotionPolicy.isPromotionWindowOpen);

  // Batch promotion state
  const [batchCurrentSem, setBatchCurrentSem] = useState<number>(2);
  const [batchTargetSem, setBatchTargetSem] = useState<number>(3);
  const [batchResultMsg, setBatchResultMsg] = useState<string | null>(null);

  const filteredApplications = promotionForms.filter((p) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      p.studentName?.toLowerCase().includes(q) ||
      p.enrollmentNo?.toLowerCase().includes(q) ||
      p.programme?.toLowerCase().includes(q) ||
      p.id?.toLowerCase().includes(q);
    const matchesStatus = selectedStatus === 'all' || p.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSavePolicy = (e: React.FormEvent) => {
    e.preventDefault();
    updatePromotionPolicy({
      minCreditsPercentRequired: Number(minCreditsPercent),
      maxBacklogsPermitted: Number(maxBacklogs),
      academicYear,
      isPromotionWindowOpen: isWindowOpen,
    });
    setIsPolicyModalOpen(false);
  };

  const handleApprovePromotion = (app: PromotionFormRecord) => {
    updatePromotionStatus(
      app.id,
      'Approved',
      `Promoted to Semester ${app.targetSemester} as per NEP-2020 Autonomous Progression norms.`
    );
  };

  const handleRejectPromotion = (app: PromotionFormRecord) => {
    const reason = window.prompt(
      `Specify retention / rejection remarks for ${app.studentName}:`,
      'Earned credits below minimum 50% threshold for semester progression.'
    );
    if (reason !== null) {
      updatePromotionStatus(app.id, 'Rejected', reason);
    }
  };

  const handleRunBatchPromotion = () => {
    const promotedCount = bulkPromoteBatch(batchCurrentSem, batchTargetSem);
    setBatchResultMsg(
      `Successfully advanced ${promotedCount} eligible students from Semester ${batchCurrentSem} to Semester ${batchTargetSem}!`
    );
    setTimeout(() => {
      setIsBatchModalOpen(false);
      setBatchResultMsg(null);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <span>NEP-2020 Semester Progression & Promotion</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Configure credit threshold criteria, review student promotion applications, and execute batch promotions.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            onClick={() => setIsBatchModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-medium transition-all shadow-md shadow-emerald-600/30 cursor-pointer"
          >
            <Users className="w-4 h-4" />
            <span>Batch Progression</span>
          </button>
          <button
            onClick={() => setIsPolicyModalOpen(!isPolicyModalOpen)}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-medium transition-colors cursor-pointer"
          >
            <Settings className="w-4 h-4 text-emerald-400" />
            <span>NEP Rules</span>
          </button>
        </div>
      </div>

      {/* Policy Card Banner */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white">
              Autonomous Progression Criteria (NEP-2020 Guidelines)
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Minimum Credits Required:{' '}
              <strong className="text-emerald-300">{promotionPolicy.minCreditsPercentRequired}%</strong>
              <span className="mx-2">•</span>
              Max ATKT Backlogs Allowed:{' '}
              <strong className="text-amber-300">{promotionPolicy.maxBacklogsPermitted} papers</strong>
              <span className="mx-2">•</span>
              Window:{' '}
              <span className="text-slate-300">
                {promotionPolicy.isPromotionWindowOpen ? '🟢 Active' : '🔴 Closed'}
              </span>
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsPolicyModalOpen(true)}
          className="text-xs text-emerald-400 hover:text-emerald-300 font-medium underline shrink-0 cursor-pointer"
        >
          Edit Criteria
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 shadow-md flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by student name, enrollment, application ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200"
          >
            <option value="all">All Statuses</option>
            <option value="Pending">Pending Scrutiny</option>
            <option value="Approved">Approved & Promoted</option>
            <option value="Rejected">Rejected / Retained</option>
          </select>

          <span className="text-xs text-slate-400 whitespace-nowrap">
            {filteredApplications.length} applications
          </span>
        </div>
      </div>

      {/* Promotion Applications Table */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-700/80">
              <tr>
                <th className="px-4 py-3.5">Application ID</th>
                <th className="px-4 py-3.5">Student Details</th>
                <th className="px-4 py-3.5">Semester Shift</th>
                <th className="px-4 py-3.5">Credits & Backlogs</th>
                <th className="px-4 py-3.5">NEP Eligibility</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Promotion Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filteredApplications.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-slate-500">
                    No promotion applications found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-750/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-[11px]">
                      <div className="text-emerald-300 font-semibold">{app.id}</div>
                      <div className="text-slate-400">{app.appliedDate}</div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="font-semibold text-white text-sm">{app.studentName}</div>
                      <div className="text-[11px] font-mono text-indigo-300">{app.enrollmentNo}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-1 max-w-xs">{app.programme}</div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 font-semibold text-[10px] border border-slate-700">
                          Sem {app.currentSemester}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold text-[10px] border border-emerald-700">
                          Sem {app.targetSemester}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-200">
                        Credits: {app.creditsEarned} / {app.creditsRequired}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Backlogs:{' '}
                        <span className={app.backlogCount > 0 ? 'text-amber-400 font-bold' : 'text-emerald-400'}>
                          {app.backlogCount}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                          app.nepEligibility === 'Eligible'
                            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/60'
                            : app.nepEligibility === 'Provisionally Eligible'
                            ? 'bg-amber-950/60 text-amber-300 border-amber-700/60'
                            : 'bg-rose-950/60 text-rose-300 border-rose-700/60'
                        }`}
                      >
                        {app.nepEligibility}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                          app.status === 'Approved'
                            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/60'
                            : app.status === 'Rejected'
                            ? 'bg-rose-950/60 text-rose-300 border-rose-700/60'
                            : 'bg-amber-950/60 text-amber-300 border-amber-700/60'
                        }`}
                      >
                        {app.status === 'Approved' ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        ) : app.status === 'Rejected' ? (
                          <XCircle className="w-3 h-3 text-rose-400" />
                        ) : (
                          <Clock className="w-3 h-3 text-amber-400" />
                        )}
                        <span>{app.status}</span>
                      </span>
                    </td>

                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {app.status !== 'Approved' && (
                          <button
                            onClick={() => handleApprovePromotion(app)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-700/60 hover:bg-emerald-600 text-emerald-200 text-[11px] font-medium transition-colors cursor-pointer"
                            title="Approve and promote student to next semester"
                          >
                            Approve & Advance
                          </button>
                        )}

                        {app.status !== 'Rejected' && (
                          <button
                            onClick={() => handleRejectPromotion(app)}
                            className="px-2.5 py-1 rounded-lg bg-rose-900/60 hover:bg-rose-800 text-rose-200 text-[11px] font-medium transition-colors cursor-pointer"
                            title="Reject promotion application"
                          >
                            Reject
                          </button>
                        )}

                        <button
                          onClick={() => {
                            if (window.confirm(`Delete promotion application ${app.id}?`)) {
                              deletePromotionForm(app.id);
                            }
                          }}
                          className="p-1 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-700/60"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* NEP Policy Modal */}
      {isPolicyModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl p-6 relative">
            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <Settings className="w-5 h-5 text-emerald-400" />
              <span>Configure NEP-2020 Progression Policy</span>
            </h3>

            <form onSubmit={handleSavePolicy} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Academic Year</label>
                <input
                  type="text"
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Minimum Credits Required for Promotion (%)
                </label>
                <input
                  type="number"
                  min="30"
                  max="100"
                  value={minCreditsPercent}
                  onChange={(e) => setMinCreditsPercent(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                />
                <p className="text-[10px] text-slate-400 mt-1">Default NEP autonomous threshold is 50% earned credits.</p>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Maximum Permitted ATKT Backlogs
                </label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  value={maxBacklogs}
                  onChange={(e) => setMaxBacklogs(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="promoWindowToggle"
                  checked={isWindowOpen}
                  onChange={(e) => setIsWindowOpen(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-emerald-600"
                />
                <label htmlFor="promoWindowToggle" className="text-slate-300 cursor-pointer">
                  Keep online promotion application window active for students
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsPolicyModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-700 text-slate-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 text-xs font-medium"
                >
                  Save Progression Rules
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Batch Progression Modal */}
      {isBatchModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl p-6 relative">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-400" />
              <span>Batch Semester Progression</span>
            </h3>
            <p className="text-xs text-slate-300 mb-4">
              Advance an entire academic batch to the next semester simultaneously.
            </p>

            {batchResultMsg && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-xs text-emerald-300">
                {batchResultMsg}
              </div>
            )}

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Source Semester</label>
                  <select
                    value={batchCurrentSem}
                    onChange={(e) => {
                      const sem = Number(e.target.value);
                      setBatchCurrentSem(sem);
                      setBatchTargetSem(Math.min(8, sem + 1));
                    }}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                  >
                    {[1, 2, 3, 4, 5, 6, 7].map((s) => (
                      <option key={s} value={s}>
                        Semester {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Target Semester</label>
                  <select
                    value={batchTargetSem}
                    onChange={(e) => setBatchTargetSem(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                  >
                    {[2, 3, 4, 5, 6, 7, 8].map((s) => (
                      <option key={s} value={s}>
                        Semester {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/60 text-slate-400 text-[11px]">
                Students currently in Semester {batchCurrentSem}:{' '}
                <strong className="text-white">
                  {students.filter((s) => Number(s.currentSemester) === Number(batchCurrentSem)).length} students
                </strong>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsBatchModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-700 text-slate-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleRunBatchPromotion}
                  className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 text-xs font-medium"
                >
                  Advance Entire Batch Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
