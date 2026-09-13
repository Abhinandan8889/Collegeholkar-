import React, { useState } from 'react';
import {
  ShieldAlert,
  Search,
  CheckCircle2,
  Clock,
  MessageSquare,
  AlertTriangle,
  XCircle,
  FileCheck,
  User,
  X,
} from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';

export function AdminGrievancesView() {
  const { grievances, updateGrievanceStatus, deleteTableRow } = useDatabase();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [activeGrievance, setActiveGrievance] = useState<any | null>(null);
  const [resolutionRemarks, setResolutionRemarks] = useState('');

  const filtered = grievances.filter((g) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      g.studentName?.toLowerCase().includes(q) ||
      g.enrollmentNo?.toLowerCase().includes(q) ||
      g.subject?.toLowerCase().includes(q) ||
      g.id?.toLowerCase().includes(q);
    const matchesStatus = selectedStatus === 'all' || g.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleOpenResolve = (g: any) => {
    setActiveGrievance(g);
    setResolutionRemarks(g.resolutionRemarks || 'Inquiry conducted by college committee; grievance resolved.');
  };

  const handleConfirmResolve = (newStatus: 'Resolved' | 'In Review' | 'Closed') => {
    if (!activeGrievance) return;
    updateGrievanceStatus(activeGrievance.id, newStatus, resolutionRemarks);
    setActiveGrievance(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            <span>Student Grievance Redressal & Anti-Ragging Cell</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Review student complaints, academic evaluation appeals, and assign committee resolution remarks.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 self-start sm:self-auto">
          <Clock className="w-4 h-4 text-amber-400" />
          <span>Pending: {grievances.filter((g) => g.status === 'Submitted').length}</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 shadow-md flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search grievances by name, enrollment, subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200"
          >
            <option value="all">All Grievance Statuses</option>
            <option value="Submitted">Submitted (Pending)</option>
            <option value="In Review">In Committee Review</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>

          <span className="text-xs text-slate-400 whitespace-nowrap">{filtered.length} tickets</span>
        </div>
      </div>

      {/* Grievances List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-slate-500 bg-slate-800/40 rounded-2xl border border-slate-700/50 text-xs">
            No student grievances found matching your search.
          </div>
        ) : (
          filtered.map((g) => (
            <div
              key={g.id}
              className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-600 transition-colors"
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-semibold text-rose-300">{g.id}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-xs font-semibold text-white">{g.studentName}</span>
                  <span className="text-[11px] font-mono text-indigo-300">({g.enrollmentNo})</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-900 text-slate-300 border border-slate-700">
                    {g.category}
                  </span>
                  <span className="text-[10px] text-slate-500">{g.createdDate}</span>
                </div>

                <div className="text-xs font-semibold text-slate-200">{g.subject}</div>
                <p className="text-xs text-slate-400 leading-relaxed">{g.description}</p>

                {g.resolutionRemarks && (
                  <div className="mt-2 p-2 rounded-xl bg-slate-900/80 border border-slate-700/60 text-[11px] text-emerald-300 flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <div>
                      <strong>Committee Action:</strong> {g.resolutionRemarks}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                    g.status === 'Resolved'
                      ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/60'
                      : g.status === 'In Review'
                      ? 'bg-indigo-950/60 text-indigo-300 border-indigo-700/60'
                      : 'bg-amber-950/60 text-amber-300 border-amber-700/60'
                  }`}
                >
                  {g.status === 'Resolved' ? (
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Clock className="w-3 h-3 text-amber-400" />
                  )}
                  <span>{g.status}</span>
                </span>

                <button
                  onClick={() => handleOpenResolve(g)}
                  className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl text-xs font-medium cursor-pointer transition-colors"
                >
                  Action / Remarks
                </button>

                <button
                  onClick={() => {
                    if (window.confirm(`Delete ticket ${g.id}?`)) {
                      deleteTableRow('grievances', g.id);
                    }
                  }}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-700/60 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Resolution Modal */}
      {activeGrievance && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl p-6 relative">
            <button
              onClick={() => setActiveGrievance(null)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-rose-400" />
              <span>Grievance Resolution & Redressal</span>
            </h3>

            <div className="text-xs text-slate-300 mb-3 space-y-1">
              <div>
                <strong>Student:</strong> {activeGrievance.studentName} ({activeGrievance.enrollmentNo})
              </div>
              <div>
                <strong>Subject:</strong> {activeGrievance.subject}
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Official Committee Action / Resolution Remarks
                </label>
                <textarea
                  rows={3}
                  value={resolutionRemarks}
                  onChange={(e) => setResolutionRemarks(e.target.value)}
                  placeholder="Enter institutional resolution notes and actions taken..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:ring-1 focus:ring-rose-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-700">
                <button
                  type="button"
                  onClick={() => handleConfirmResolve('In Review')}
                  className="px-3 py-1.5 rounded-xl bg-indigo-700/60 hover:bg-indigo-600 text-indigo-200 text-xs font-medium cursor-pointer"
                >
                  Mark In Review
                </button>
                <button
                  type="button"
                  onClick={() => handleConfirmResolve('Resolved')}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium cursor-pointer shadow-md shadow-emerald-600/30"
                >
                  Mark Resolved
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
