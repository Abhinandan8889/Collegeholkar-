import React, { useState } from 'react';
import {
  Award,
  Search,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileSpreadsheet,
  X,
  FileCheck,
} from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';
import { ResultRecord } from '../../types/database';

export function AdminResultsView() {
  const { results, publishResult, updateResult, deleteResult, students } = useDatabase();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [editingResult, setEditingResult] = useState<ResultRecord | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    enrollmentNo: '',
    rollNo: '',
    studentName: '',
    programme: 'B.Sc. (Honours) Computer Science',
    semester: 5,
    session: 'Nov-Dec 2025 Autonomous Examination',
    totalCredits: 24,
    sgpa: 8.8,
    cgpa: 8.7,
    resultStatus: 'Passed' as 'Passed' | 'Promoted with ATKT' | 'Withheld' | 'Failed',
    declaredDate: new Date().toISOString().split('T')[0],
    marksSummary: 'CS-501: 88/100, CS-502: 84/100, MATH-501: 90/100',
  });

  const filteredResults = results.filter((r) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      r.studentName?.toLowerCase().includes(q) ||
      r.enrollmentNo?.toLowerCase().includes(q) ||
      r.rollNo?.toLowerCase().includes(q) ||
      r.programme?.toLowerCase().includes(q);
    const matchesSem = selectedSemester === 'all' || String(r.semester) === selectedSemester;
    return matchesSearch && matchesSem;
  });

  const handleOpenPublish = () => {
    setFormData({
      enrollmentNo: '',
      rollNo: '',
      studentName: '',
      programme: 'B.Sc. (Honours with Research) Computer Science',
      semester: 6,
      session: 'May-June 2026 Autonomous Examination',
      totalCredits: 24,
      sgpa: 9.0,
      cgpa: 8.9,
      resultStatus: 'Passed',
      declaredDate: new Date().toISOString().split('T')[0],
      marksSummary: 'CS-601: 92/100, CS-602: 89/100, CS-603: 94/100',
    });
    setIsPublishModalOpen(true);
  };

  const handleSelectStudentForForm = (enrollment: string) => {
    const s = students.find((st) => st.enrollmentNo === enrollment);
    if (s) {
      setFormData((prev) => ({
        ...prev,
        enrollmentNo: s.enrollmentNo,
        rollNo: s.rollNo,
        studentName: s.fullName,
        programme: s.programme,
        semester: s.currentSemester,
        cgpa: s.cgpa || 8.5,
        sgpa: s.sgpa || 8.6,
      }));
    }
  };

  const handleSaveResult = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingResult) {
      updateResult(editingResult.id, formData);
      setEditingResult(null);
    } else {
      publishResult(formData);
      setIsPublishModalOpen(false);
    }
  };

  const handleOpenEdit = (res: ResultRecord) => {
    setEditingResult(res);
    setFormData({
      enrollmentNo: res.enrollmentNo,
      rollNo: res.rollNo,
      studentName: res.studentName,
      programme: res.programme,
      semester: res.semester,
      session: res.session,
      totalCredits: res.totalCredits,
      sgpa: res.sgpa,
      cgpa: res.cgpa,
      resultStatus: res.resultStatus,
      declaredDate: res.declaredDate,
      marksSummary: res.marksSummary,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span>Autonomous Examination Results & Grade Cards</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Publish semester results, edit student marks summaries, and calibrate SGPA / CGPA calculations.
          </p>
        </div>

        <button
          onClick={handleOpenPublish}
          className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-medium transition-all shadow-lg shadow-amber-600/30 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Publish New Result</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 shadow-md flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by student name, roll, enrollment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200"
          >
            <option value="all">All Semesters</option>
            <option value="1">Semester 1</option>
            <option value="2">Semester 2</option>
            <option value="3">Semester 3</option>
            <option value="4">Semester 4</option>
            <option value="5">Semester 5</option>
            <option value="6">Semester 6</option>
          </select>

          <span className="text-xs text-slate-400 whitespace-nowrap">
            {filteredResults.length} published records
          </span>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-700/80">
              <tr>
                <th className="px-4 py-3.5">Student & Roll</th>
                <th className="px-4 py-3.5">Programme & Sem</th>
                <th className="px-4 py-3.5">Session</th>
                <th className="px-4 py-3.5">SGPA / CGPA</th>
                <th className="px-4 py-3.5">Marks Summary</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filteredResults.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-slate-500">
                    No results found matching your search.
                  </td>
                </tr>
              ) : (
                filteredResults.map((res) => (
                  <tr key={res.id} className="hover:bg-slate-750/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-white text-sm">{res.studentName}</div>
                      <div className="text-[11px] font-mono text-indigo-300">
                        {res.enrollmentNo} • Roll: {res.rollNo}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="text-slate-200 line-clamp-1 max-w-xs">{res.programme}</div>
                      <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        Semester {res.semester}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <div className="text-slate-300">{res.session}</div>
                      <div className="text-[10px] text-slate-400">{res.declaredDate}</div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="font-semibold text-amber-300">SGPA: {res.sgpa}</div>
                      <div className="text-[11px] text-slate-400">CGPA: {res.cgpa}</div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="text-[11px] text-slate-300 line-clamp-2 max-w-xs font-mono">
                        {res.marksSummary}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                          res.resultStatus === 'Passed'
                            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/60'
                            : res.resultStatus === 'Promoted with ATKT'
                            ? 'bg-amber-950/60 text-amber-300 border-amber-700/60'
                            : 'bg-rose-950/60 text-rose-300 border-rose-700/60'
                        }`}
                      >
                        {res.resultStatus === 'Passed' ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        ) : res.resultStatus === 'Promoted with ATKT' ? (
                          <AlertTriangle className="w-3 h-3 text-amber-400" />
                        ) : (
                          <XCircle className="w-3 h-3 text-rose-400" />
                        )}
                        <span>{res.resultStatus}</span>
                      </span>
                    </td>

                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(res)}
                          className="p-1.5 rounded-lg bg-slate-700/60 hover:bg-slate-700 text-slate-200"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete result ${res.id}?`)) {
                              deleteResult(res.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300"
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

      {/* Publish / Edit Modal */}
      {(isPublishModalOpen || editingResult) && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setIsPublishModalOpen(false);
                setEditingResult(null);
              }}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white bg-slate-700/40 hover:bg-slate-700"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold text-white mb-4">
              {editingResult ? 'Edit Published Result' : 'Publish New Autonomous Result'}
            </h3>

            {!editingResult && (
              <div className="mb-4">
                <label className="block text-slate-300 font-medium mb-1 text-xs">
                  Auto-fill from Enrolled Student Profile
                </label>
                <select
                  onChange={(e) => handleSelectStudentForForm(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                >
                  <option value="">-- Choose enrolled student --</option>
                  {students.map((s) => (
                    <option key={s.enrollmentNo} value={s.enrollmentNo}>
                      {s.fullName} ({s.enrollmentNo} • Sem {s.currentSemester})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <form onSubmit={handleSaveResult} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Enrollment Number</label>
                  <input
                    type="text"
                    required
                    value={formData.enrollmentNo}
                    onChange={(e) => setFormData({ ...formData, enrollmentNo: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Roll Number</label>
                  <input
                    type="text"
                    required
                    value={formData.rollNo}
                    onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Student Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Semester</label>
                  <select
                    value={formData.semester}
                    onChange={(e) => setFormData({ ...formData, semester: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                      <option key={sem} value={sem}>
                        Semester {sem}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Result Status</label>
                  <select
                    value={formData.resultStatus}
                    onChange={(e) => setFormData({ ...formData, resultStatus: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-medium"
                  >
                    <option value="Passed">Passed (First Division)</option>
                    <option value="Promoted with ATKT">Promoted with ATKT</option>
                    <option value="Withheld">Withheld</option>
                    <option value="Failed">Failed / Re-appear</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">SGPA</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    value={formData.sgpa}
                    onChange={(e) => setFormData({ ...formData, sgpa: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">CGPA</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    value={formData.cgpa}
                    onChange={(e) => setFormData({ ...formData, cgpa: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Total Credits</label>
                  <input
                    type="number"
                    value={formData.totalCredits}
                    onChange={(e) => setFormData({ ...formData, totalCredits: parseInt(e.target.value) || 24 })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Subject Marks Breakdown</label>
                <textarea
                  rows={2}
                  value={formData.marksSummary}
                  onChange={(e) => setFormData({ ...formData, marksSummary: e.target.value })}
                  placeholder="e.g. CS-601: 90/100, CS-602: 88/100"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-700">
                <button
                  type="button"
                  onClick={() => {
                    setIsPublishModalOpen(false);
                    setEditingResult(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-700 text-slate-300 hover:bg-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 text-white hover:bg-amber-500 font-medium"
                >
                  {editingResult ? 'Update Result' : 'Publish Result'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
