import React, { useState } from 'react';
import {
  Building2,
  Search,
  Plus,
  BookOpen,
  Mail,
  Users,
  FlaskConical,
  Edit2,
  Trash2,
  X,
} from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';

export function AdminAcademicsView() {
  const { departments, insertTableRow, updateTableRow, deleteTableRow } = useDatabase();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    code: '',
    category: 'Physical Sciences',
    headOfDepartment: '',
    labsCount: 4,
    facultyCount: 12,
    email: '',
  });

  const filteredDepts = departments.filter((d) => {
    const q = searchQuery.toLowerCase();
    return (
      d.name?.toLowerCase().includes(q) ||
      d.code?.toLowerCase().includes(q) ||
      d.headOfDepartment?.toLowerCase().includes(q)
    );
  });

  const handleOpenAdd = () => {
    setFormData({
      id: 'dept_' + Date.now().toString(36),
      name: '',
      code: '',
      category: 'Physical Sciences',
      headOfDepartment: '',
      labsCount: 4,
      facultyCount: 10,
      email: '',
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (dept: any) => {
    setEditingDept(dept);
    setFormData({
      id: dept.id,
      name: dept.name,
      code: dept.code,
      category: dept.category || 'Physical Sciences',
      headOfDepartment: dept.headOfDepartment,
      labsCount: dept.labsCount || 0,
      facultyCount: dept.facultyCount || 0,
      email: dept.email || '',
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDept) {
      updateTableRow('departments', editingDept.id, formData);
      setEditingDept(null);
    } else {
      insertTableRow('departments', formData);
      setIsAddModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-cyan-400" />
            <span>Academic Departments & Faculties</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage institutional teaching departments, research laboratory facilities, and faculty head allocations.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-medium transition-all shadow-lg shadow-cyan-600/30 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Academic Department</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 shadow-md flex items-center justify-between">
        <div className="relative w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search departments by name, code, HOD..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
        </div>

        <span className="text-xs text-slate-400">{filteredDepts.length} departments active</span>
      </div>

      {/* Grid of Departments */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDepts.map((d) => (
          <div
            key={d.id}
            className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-md flex flex-col justify-between hover:border-cyan-500/50 transition-colors group"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(d)}
                    className="p-1 rounded text-slate-400 hover:text-white"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete department ${d.name}?`)) {
                        deleteTableRow('departments', d.id);
                      }
                    }}
                    className="p-1 rounded text-slate-400 hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h3 className="font-bold text-white text-sm mt-3 group-hover:text-cyan-300 transition-colors">
                {d.name}
              </h3>
              <div className="text-[11px] font-mono text-cyan-400 mt-0.5">Code: {d.code}</div>

              <div className="mt-3 space-y-1 text-xs text-slate-300">
                <div className="text-[11px] text-slate-400">
                  HOD: <strong className="text-slate-200">{d.headOfDepartment}</strong>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                  <span>Labs: {d.labsCount}</span>
                  <span>•</span>
                  <span>Faculty: {d.facultyCount}</span>
                </div>
              </div>
            </div>

            {d.email && (
              <div className="mt-4 pt-3 border-t border-slate-700/60 text-[11px] text-slate-400 flex items-center gap-1.5 truncate">
                <Mail className="w-3 h-3 text-slate-500 shrink-0" />
                <span className="truncate">{d.email}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {(isAddModalOpen || editingDept) && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl p-6 relative">
            <button
              onClick={() => {
                setIsAddModalOpen(false);
                setEditingDept(null);
              }}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-white mb-4">
              {editingDept ? 'Edit Academic Department' : 'Add New Department'}
            </h3>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Department Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Department of Forensic Science"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Department Code</label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="e.g. FSC"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Discipline</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                  >
                    <option value="Physical Sciences">Physical Sciences</option>
                    <option value="Chemical Sciences">Chemical Sciences</option>
                    <option value="Life Sciences">Life Sciences</option>
                    <option value="Mathematical & Computational">Mathematical & Computational</option>
                    <option value="Interdisciplinary">Interdisciplinary</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Head of Department (HOD)</label>
                <input
                  type="text"
                  required
                  value={formData.headOfDepartment}
                  onChange={(e) => setFormData({ ...formData, headOfDepartment: e.target.value })}
                  placeholder="e.g. Prof. (Dr.) Anamika Sen"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Laboratories Count</label>
                  <input
                    type="number"
                    value={formData.labsCount}
                    onChange={(e) => setFormData({ ...formData, labsCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Faculty Count</label>
                  <input
                    type="number"
                    value={formData.facultyCount}
                    onChange={(e) => setFormData({ ...formData, facultyCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Department Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="dept@collegeholkar.org"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-700">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingDept(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-700 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium"
                >
                  {editingDept ? 'Save Department' : 'Create Department'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
