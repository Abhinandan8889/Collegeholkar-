import React, { useState } from 'react';
import {
  FileCheck2,
  Calendar,
  CreditCard,
  CheckCircle2,
  XCircle,
  Clock,
  Settings,
  Search,
  Download,
  AlertCircle,
  Save,
  Trash2,
  Eye,
  Check,
  X,
} from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';
import { ExamFormRecord } from '../../types/database';

export function AdminExamFormsView() {
  const {
    examForms,
    examSettings,
    updateExamSettings,
    updateExamFormStatus,
    deleteExamForm,
  } = useDatabase();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Settings form state
  const [sessionName, setSessionName] = useState(examSettings.sessionName);
  const [isOpen, setIsOpen] = useState(examSettings.isOpen);
  const [regularFee, setRegularFee] = useState(examSettings.regularFee);
  const [lateFee, setLateFee] = useState(examSettings.lateFee);
  const [lastDateWithoutLateFee, setLastDateWithoutLateFee] = useState(examSettings.lastDateWithoutLateFee);
  const [lastDateWithLateFee, setLastDateWithLateFee] = useState(examSettings.lastDateWithLateFee);
  const [admitCardReleased, setAdmitCardReleased] = useState(examSettings.admitCardReleased);

  // Action modal / remarks state
  const [selectedFormForAction, setSelectedFormForAction] = useState<ExamFormRecord | null>(null);
  const [actionRemarks, setActionRemarks] = useState('');

  const filteredForms = examForms.filter((f) => {
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      f.studentName?.toLowerCase().includes(q) ||
      f.enrollmentNo?.toLowerCase().includes(q) ||
      f.programme?.toLowerCase().includes(q) ||
      f.id?.toLowerCase().includes(q);
    const matchesStatus = selectedStatus === 'all' || f.formStatus === selectedStatus;
    return matchesQuery && matchesStatus;
  });

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateExamSettings({
      sessionName,
      isOpen,
      regularFee: Number(regularFee),
      lateFee: Number(lateFee),
      lastDateWithoutLateFee,
      lastDateWithLateFee,
      admitCardReleased,
    });
    setIsSettingsOpen(false);
  };

  const handleApprove = (form: ExamFormRecord) => {
    updateExamFormStatus(form.id, 'Approved', 'Autonomous examination eligibility verified and hall ticket authorized.');
  };

  const handleReject = (form: ExamFormRecord) => {
    setSelectedFormForAction(form);
    setActionRemarks('Discrepancy in course codes / CCE attendance requirement unmet.');
  };

  const handleConfirmReject = () => {
    if (selectedFormForAction) {
      updateExamFormStatus(selectedFormForAction.id, 'Rejected', actionRemarks);
      setSelectedFormForAction(null);
      setActionRemarks('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Session Controller */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-amber-400" />
            <span>Examination Forms & Session Controller</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage autonomous exam submission windows, verify submitted student exam forms, and release hall tickets.
          </p>
        </div>

        <button
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-medium transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Settings className="w-4 h-4 text-amber-400" />
          <span>{isSettingsOpen ? 'Close Settings' : 'Configure Exam Window & Fees'}</span>
        </button>
      </div>

      {/* Settings Panel */}
      {isSettingsOpen && (
        <div className="bg-slate-800/90 border border-amber-500/40 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-700">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Examination Session Configuration</span>
            </h3>
            <span className="text-xs text-amber-400 font-medium">Controls Live Student Portal Access</span>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Active Session Title</label>
              <input
                type="text"
                value={sessionName}
                onChange={(e) => setSessionName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Submission Status</label>
                <select
                  value={isOpen ? 'open' : 'closed'}
                  onChange={(e) => setIsOpen(e.target.value === 'open')}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-medium"
                >
                  <option value="open">🟢 Form Submission OPEN</option>
                  <option value="closed">🔴 Form Submission CLOSED</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Regular Exam Fee (₹)</label>
                <input
                  type="number"
                  value={regularFee}
                  onChange={(e) => setRegularFee(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Late Fee Surcharge (₹)</label>
                <input
                  type="number"
                  value={lateFee}
                  onChange={(e) => setLateFee(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Admit Card Release</label>
                <select
                  value={admitCardReleased ? 'released' : 'withheld'}
                  onChange={(e) => setAdmitCardReleased(e.target.value === 'released')}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-medium"
                >
                  <option value="released">🟢 Hall Tickets Released</option>
                  <option value="withheld">🟡 Hall Tickets Held</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Last Date (Without Late Fee)</label>
                <input
                  type="date"
                  value={lastDateWithoutLateFee}
                  onChange={(e) => setLastDateWithoutLateFee(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Last Date (With Late Fee)</label>
                <input
                  type="date"
                  value={lastDateWithLateFee}
                  onChange={(e) => setLastDateWithLateFee(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-700">
              <button
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-700 text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-medium shadow-md shadow-amber-600/30"
              >
                <Save className="w-4 h-4" />
                <span>Save Exam Window Settings</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 shadow-md flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by student name, enrollment, form ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200"
          >
            <option value="all">All Statuses</option>
            <option value="Submitted">Submitted (Pending)</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>

          <span className="text-xs text-slate-400 whitespace-nowrap">
            {filteredForms.length} applications
          </span>
        </div>
      </div>

      {/* Submitted Forms Table */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-700/80">
              <tr>
                <th className="px-4 py-3.5">Form ID & Date</th>
                <th className="px-4 py-3.5">Student Info</th>
                <th className="px-4 py-3.5">Programme & Sem</th>
                <th className="px-4 py-3.5">Exam Papers</th>
                <th className="px-4 py-3.5">Fee Transaction</th>
                <th className="px-4 py-3.5">Approval Status</th>
                <th className="px-4 py-3.5 text-right">Scrutiny Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filteredForms.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-slate-500">
                    No examination forms found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredForms.map((form) => (
                  <tr key={form.id} className="hover:bg-slate-750/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-[11px]">
                      <div className="text-amber-300 font-semibold">{form.id}</div>
                      <div className="text-slate-400">{form.submittedDate}</div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="font-semibold text-white text-sm">{form.studentName}</div>
                      <div className="text-[11px] font-mono text-indigo-300">{form.enrollmentNo}</div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="text-slate-200 line-clamp-1 max-w-xs">{form.programme}</div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-700">
                          Sem {form.semester} ({form.examType})
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="text-[11px] text-slate-300 max-w-xs line-clamp-2">
                        {form.papers?.join(', ') || 'Regular Core Papers'}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="font-semibold text-emerald-400">₹{form.feesPaid}</div>
                      <div className="text-[10px] font-mono text-slate-400">{form.transactionId}</div>
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                          form.formStatus === 'Approved'
                            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/60'
                            : form.formStatus === 'Rejected'
                            ? 'bg-rose-950/60 text-rose-300 border-rose-700/60'
                            : 'bg-amber-950/60 text-amber-300 border-amber-700/60'
                        }`}
                      >
                        {form.formStatus === 'Approved' ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        ) : form.formStatus === 'Rejected' ? (
                          <XCircle className="w-3 h-3 text-rose-400" />
                        ) : (
                          <Clock className="w-3 h-3 text-amber-400" />
                        )}
                        <span>{form.formStatus}</span>
                      </span>
                    </td>

                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {form.formStatus !== 'Approved' && (
                          <button
                            onClick={() => handleApprove(form)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-700/60 hover:bg-emerald-600 text-emerald-200 text-[11px] font-medium transition-colors"
                            title="Approve and issue admit card"
                          >
                            Approve
                          </button>
                        )}

                        {form.formStatus !== 'Rejected' && (
                          <button
                            onClick={() => handleReject(form)}
                            className="px-2.5 py-1 rounded-lg bg-rose-900/60 hover:bg-rose-800 text-rose-200 text-[11px] font-medium transition-colors"
                            title="Reject application with reason"
                          >
                            Reject
                          </button>
                        )}

                        <button
                          onClick={() => {
                            if (window.confirm(`Delete examination form ${form.id}?`)) {
                              deleteExamForm(form.id);
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

      {/* Reject Remarks Modal */}
      {selectedFormForAction && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl p-6 relative">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-400" />
              <span>Reject Examination Form</span>
            </h3>
            <p className="text-xs text-slate-300 mb-3">
              Specify the institutional rejection grounds for <strong>{selectedFormForAction.studentName}</strong> ({selectedFormForAction.enrollmentNo}):
            </p>

            <textarea
              rows={3}
              value={actionRemarks}
              onChange={(e) => setActionRemarks(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white mb-4 focus:ring-1 focus:ring-rose-500"
              placeholder="e.g. CCE attendance less than 75% or pending course dues..."
            />

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedFormForAction(null)}
                className="px-3 py-1.5 rounded-xl bg-slate-700 text-slate-300 text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReject}
                className="px-4 py-1.5 rounded-xl bg-rose-600 text-white hover:bg-rose-500 text-xs font-medium"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
