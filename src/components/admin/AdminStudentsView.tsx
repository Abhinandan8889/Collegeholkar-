import React, { useState } from 'react';
import {
  Users,
  Search,
  Plus,
  Edit2,
  Trash2,
  GraduationCap,
  Award,
  CheckCircle2,
  XCircle,
  TrendingUp,
  X,
  FileCheck,
  Percent,
} from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';

export function AdminStudentsView() {
  const { students, addStudent, updateStudent, deleteStudent, promoteStudentDirectly } = useDatabase();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSemester, setSelectedSemester] = useState<string>('all');
  const [selectedProgram, setSelectedProgram] = useState<string>('all');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<any | null>(null);
  const [promotingStudent, setPromotingStudent] = useState<any | null>(null);
  const [targetSemester, setTargetSemester] = useState<number>(2);

  // Form state for Add / Edit
  const [formData, setFormData] = useState({
    enrollmentNo: '',
    rollNo: '',
    fullName: '',
    programme: 'B.Sc. (Honours) Computer Science',
    currentSemester: 1,
    cgpa: 8.0,
    sgpa: 8.0,
    attendanceOverall: 85,
    email: '',
    mobile: '',
    category: 'General',
    admitCardEligible: true,
  });

  const filteredStudents = students.filter((s) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      s.fullName?.toLowerCase().includes(q) ||
      s.enrollmentNo?.toLowerCase().includes(q) ||
      s.rollNo?.toLowerCase().includes(q) ||
      s.programme?.toLowerCase().includes(q);

    const matchesSem = selectedSemester === 'all' || String(s.currentSemester) === selectedSemester;
    const matchesProg = selectedProgram === 'all' || s.programme?.includes(selectedProgram);

    return matchesSearch && matchesSem && matchesProg;
  });

  const handleOpenAdd = () => {
    setFormData({
      enrollmentNo: `DS2500${Math.floor(100 + Math.random() * 900)}`,
      rollNo: `25${Math.floor(10000 + Math.random() * 90000)}`,
      fullName: '',
      programme: 'B.Sc. (Honours with Research) Computer Science',
      currentSemester: 1,
      cgpa: 8.2,
      sgpa: 8.4,
      attendanceOverall: 88,
      email: '',
      mobile: '+91 ',
      category: 'General',
      admitCardEligible: true,
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (student: any) => {
    setEditingStudent(student);
    setFormData({
      enrollmentNo: student.enrollmentNo,
      rollNo: student.rollNo,
      fullName: student.fullName,
      programme: student.programme,
      currentSemester: student.currentSemester,
      cgpa: student.cgpa,
      sgpa: student.sgpa,
      attendanceOverall: student.attendanceOverall,
      email: student.email || '',
      mobile: student.mobile || '',
      category: student.category || 'General',
      admitCardEligible: student.admitCardEligible !== false,
    });
  };

  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStudent) {
      updateStudent(editingStudent.enrollmentNo, formData);
      setEditingStudent(null);
    } else {
      addStudent({
        ...formData,
        totalCreditsEarned: formData.currentSemester * 22,
        totalCreditsRequired: 160,
        grades: [],
        attendance: [],
      });
      setIsAddModalOpen(false);
    }
  };

  const handleConfirmPromote = () => {
    if (promotingStudent) {
      promoteStudentDirectly(promotingStudent.enrollmentNo, targetSemester);
      setPromotingStudent(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            <span>Student Corner Management</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Dynamic control over student records, progression, academic standings, and autonomous clearance.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-medium transition-all shadow-lg shadow-indigo-600/30 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Student Profile</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 shadow-md flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by student name, roll, enrollment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Semester Filter */}
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="all">All Semesters</option>
            <option value="1">Semester 1</option>
            <option value="2">Semester 2</option>
            <option value="3">Semester 3</option>
            <option value="4">Semester 4</option>
            <option value="5">Semester 5</option>
            <option value="6">Semester 6</option>
            <option value="7">Semester 7</option>
            <option value="8">Semester 8</option>
          </select>

          {/* Program Filter */}
          <select
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
            className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="all">All Programmes</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Biotechnology">Biotechnology</option>
            <option value="BCA">BCA</option>
            <option value="Mathematics">Mathematics</option>
          </select>

          <span className="text-xs text-slate-400 font-medium whitespace-nowrap">
            Showing {filteredStudents.length} of {students.length}
          </span>
        </div>
      </div>

      {/* Students Data Table */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-700/80">
              <tr>
                <th className="px-4 py-3.5">Student Info</th>
                <th className="px-4 py-3.5">Enrollment & Roll</th>
                <th className="px-4 py-3.5">Programme & Sem</th>
                <th className="px-4 py-3.5">CGPA / SGPA</th>
                <th className="px-4 py-3.5">Attendance</th>
                <th className="px-4 py-3.5">Admit Card</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-slate-500">
                    No students matched your search criteria.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s) => (
                  <tr key={s.enrollmentNo} className="hover:bg-slate-750/50 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-semibold text-white text-sm">{s.fullName}</div>
                        <div className="text-[11px] text-slate-400">{s.email}</div>
                      </div>
                    </td>

                    <td className="px-4 py-3 font-mono text-[11px]">
                      <div className="text-indigo-300 font-semibold">{s.enrollmentNo}</div>
                      <div className="text-slate-400">Roll: {s.rollNo}</div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="text-slate-200 line-clamp-1 max-w-xs">{s.programme}</div>
                      <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        Semester {s.currentSemester}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <div className="font-semibold text-amber-300">CGPA: {s.cgpa}</div>
                      <div className="text-[11px] text-slate-400">SGPA: {s.sgpa}</div>
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 font-semibold ${
                          (s.attendanceOverall || 80) >= 75 ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        <Percent className="w-3 h-3" />
                        {s.attendanceOverall || 85}%
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <button
                        onClick={() => updateStudent(s.enrollmentNo, { admitCardEligible: !s.admitCardEligible })}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium border cursor-pointer transition-colors ${
                          s.admitCardEligible !== false
                            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/60 hover:bg-emerald-900/60'
                            : 'bg-rose-950/60 text-rose-300 border-rose-700/60 hover:bg-rose-900/60'
                        }`}
                        title="Click to toggle admit card release clearance"
                      >
                        {s.admitCardEligible !== false ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            <span>Authorized</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3 text-rose-400" />
                            <span>Withheld</span>
                          </>
                        )}
                      </button>
                    </td>

                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Direct Promote Button */}
                        <button
                          onClick={() => {
                            setPromotingStudent(s);
                            setTargetSemester(Math.min(8, Number(s.currentSemester) + 1));
                          }}
                          className="p-1.5 rounded-lg bg-emerald-900/40 hover:bg-emerald-800/60 text-emerald-300 border border-emerald-700/40 transition-colors"
                          title="Promote directly to next semester"
                        >
                          <TrendingUp className="w-3.5 h-3.5" />
                        </button>

                        {/* Edit Button */}
                        <button
                          onClick={() => handleOpenEdit(s)}
                          className="p-1.5 rounded-lg bg-slate-700/60 hover:bg-slate-700 text-slate-200 border border-slate-600/60 transition-colors"
                          title="Edit Student Profile"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete ${s.fullName} (${s.enrollmentNo})?`)) {
                              deleteStudent(s.enrollmentNo);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800/60 transition-colors"
                          title="Delete Student Record"
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

      {/* Add / Edit Student Modal */}
      {(isAddModalOpen || editingStudent) && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setIsAddModalOpen(false);
                setEditingStudent(null);
              }}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white bg-slate-700/40 hover:bg-slate-700"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold text-white mb-4">
              {editingStudent ? `Edit Student: ${editingStudent.fullName}` : 'Register New Student Profile'}
            </h3>

            <form onSubmit={handleSaveStudent} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Enrollment Number</label>
                  <input
                    type="text"
                    required
                    disabled={!!editingStudent}
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
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Programme / Degree</label>
                  <select
                    value={formData.programme}
                    onChange={(e) => setFormData({ ...formData, programme: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                  >
                    <option value="B.Sc. (Honours with Research) Computer Science">B.Sc. CS & Math</option>
                    <option value="B.Sc. Biotechnology, Chemistry & Botany (NEP-2020)">B.Sc. Biotech & Chem</option>
                    <option value="Bachelor of Computer Applications (BCA)">BCA</option>
                    <option value="B.Sc. Physics, Chemistry & Mathematics">B.Sc. PCM</option>
                    <option value="M.Sc. Chemistry (Autonomous)">M.Sc. Chemistry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Current Semester</label>
                  <select
                    value={formData.currentSemester}
                    onChange={(e) => setFormData({ ...formData, currentSemester: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                      <option key={sem} value={sem}>
                        Semester {sem}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
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
                  <label className="block text-slate-300 font-medium mb-1">Attendance %</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.attendanceOverall}
                    onChange={(e) => setFormData({ ...formData, attendanceOverall: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Student Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@collegeholkar.org"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Mobile No</label>
                  <input
                    type="text"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="admitCardAuth"
                  checked={formData.admitCardEligible}
                  onChange={(e) => setFormData({ ...formData, admitCardEligible: e.target.checked })}
                  className="rounded bg-slate-900 border-slate-700 text-indigo-600"
                />
                <label htmlFor="admitCardAuth" className="text-slate-300 cursor-pointer">
                  Authorize Autonomous Examination Admit Card generation for this student
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-700">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingStudent(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-700 text-slate-300 hover:bg-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 font-medium"
                >
                  {editingStudent ? 'Save Changes' : 'Create Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Direct Promotion Confirmation Modal */}
      {promotingStudent && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl p-6 relative">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span>Promote Student to Next Semester</span>
            </h3>
            <p className="text-xs text-slate-300 mb-4">
              Advance <strong className="text-white">{promotingStudent.fullName}</strong> ({promotingStudent.enrollmentNo}) from Semester {promotingStudent.currentSemester}:
            </p>

            <div className="mb-4">
              <label className="block text-xs font-medium text-slate-300 mb-1">Target Semester</label>
              <select
                value={targetSemester}
                onChange={(e) => setTargetSemester(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <option key={sem} value={sem}>
                    Semester {sem} {sem === Number(promotingStudent.currentSemester) + 1 ? '(Next Expected)' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-700">
              <button
                type="button"
                onClick={() => setPromotingStudent(null)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-700 text-slate-300 hover:bg-slate-600 text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmPromote}
                className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 text-xs font-medium"
              >
                Confirm & Advance Semester
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
