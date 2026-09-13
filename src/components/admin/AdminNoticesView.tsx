import React, { useState } from 'react';
import {
  BellRing,
  Search,
  Plus,
  Edit2,
  Trash2,
  Pin,
  Sparkles,
  FileText,
  ExternalLink,
  X,
  Volume2,
  Calendar,
} from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';
import { NoticeItem } from '../../types';

export function AdminNoticesView() {
  const { notices, addNotice, updateNotice, deleteNotice } = useDatabase();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<NoticeItem | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    titleHi: '',
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    category: 'Examination' as NoticeItem['category'],
    isImportant: false,
    isNew: true,
    isMarqueeTicker: false,
    description: '',
    descriptionHi: '',
    fileUrl: 'https://collegeholkar.org/notices/official_order_2026.pdf',
    fileSize: '450 KB',
    referenceNo: 'GHC/AUTON/2026/' + Math.floor(100 + Math.random() * 900),
  });

  const filteredNotices = notices.filter((n) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      n.title.toLowerCase().includes(q) ||
      (n.referenceNo && n.referenceNo.toLowerCase().includes(q)) ||
      n.description.toLowerCase().includes(q);
    const matchesCat = selectedCategory === 'all' || n.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleOpenAdd = () => {
    setFormData({
      title: '',
      titleHi: '',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      category: 'Examination',
      isImportant: true,
      isNew: true,
      isMarqueeTicker: true,
      description: '',
      descriptionHi: '',
      fileUrl: 'https://collegeholkar.org/notices/exam_schedule_2026.pdf',
      fileSize: '512 KB',
      referenceNo: 'GHC/AUTON/2026/' + Math.floor(100 + Math.random() * 900),
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (n: NoticeItem) => {
    setEditingNotice(n);
    setFormData({
      title: n.title,
      titleHi: n.titleHi || '',
      date: n.date,
      category: n.category,
      isImportant: !!n.isImportant,
      isNew: !!n.isNew,
      isMarqueeTicker: !!(n as any).isMarqueeTicker,
      description: n.description,
      descriptionHi: n.descriptionHi || '',
      fileUrl: n.fileUrl || '',
      fileSize: n.fileSize || '350 KB',
      referenceNo: n.referenceNo || '',
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNotice) {
      updateNotice(editingNotice.id, formData);
      setEditingNotice(null);
    } else {
      addNotice(formData);
      setIsAddModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BellRing className="w-5 h-5 text-blue-400" />
            <span>Notices, Orders & Live Marquee Tickers</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Publish notifications, upload official circulars, pin high-priority notices, and manage home screen ticker alerts.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-medium transition-all shadow-lg shadow-blue-600/30 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Publish Notice / Order</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 shadow-md flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search notices by title, reference no..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200"
          >
            <option value="all">All Categories</option>
            <option value="Examination">Examination</option>
            <option value="Admission">Admission</option>
            <option value="Academic">Academic</option>
            <option value="Student">Student Corner</option>
            <option value="General">General</option>
          </select>

          <span className="text-xs text-slate-400 whitespace-nowrap">
            {filteredNotices.length} notices
          </span>
        </div>
      </div>

      {/* Notices Table */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-700/80">
              <tr>
                <th className="px-4 py-3.5">Notice Title & Ref</th>
                <th className="px-4 py-3.5">Category & Date</th>
                <th className="px-4 py-3.5">Urgent Ticker</th>
                <th className="px-4 py-3.5">Pinned Status</th>
                <th className="px-4 py-3.5">Attachment</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filteredNotices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-500">
                    No notices found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredNotices.map((n) => (
                  <tr key={n.id} className="hover:bg-slate-750/50 transition-colors">
                    <td className="px-4 py-3 max-w-md">
                      <div className="font-semibold text-white text-sm line-clamp-1">{n.title}</div>
                      {n.referenceNo && (
                        <div className="text-[11px] font-mono text-slate-400">{n.referenceNo}</div>
                      )}
                      <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{n.description}</div>
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-900 text-slate-300 border border-slate-700">
                        {n.category}
                      </span>
                      <div className="text-[11px] text-slate-400 mt-1">{n.date}</div>
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap">
                      <button
                        onClick={() =>
                          updateNotice(n.id, {
                            ...(n as any),
                            isMarqueeTicker: !(n as any).isMarqueeTicker,
                          })
                        }
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium border cursor-pointer ${
                          (n as any).isMarqueeTicker
                            ? 'bg-amber-950/60 text-amber-300 border-amber-700/60 hover:bg-amber-900/60'
                            : 'bg-slate-900 text-slate-500 border-slate-700 hover:text-slate-300'
                        }`}
                        title="Toggle live home screen announcement ticker broadcast"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>{(n as any).isMarqueeTicker ? 'Live on Ticker' : 'Not on Ticker'}</span>
                      </button>
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap">
                      <button
                        onClick={() => updateNotice(n.id, { isImportant: !n.isImportant })}
                        className={`p-1.5 rounded-lg border cursor-pointer transition-colors ${
                          n.isImportant
                            ? 'bg-indigo-950 text-indigo-300 border-indigo-700'
                            : 'bg-slate-900 text-slate-500 border-slate-700 hover:text-slate-300'
                        }`}
                        title="Toggle pinned high priority"
                      >
                        <Pin className="w-3.5 h-3.5" />
                      </button>
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap">
                      {n.fileUrl ? (
                        <a
                          href={n.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-sky-400 hover:text-sky-300"
                        >
                          <FileText className="w-3 h-3" />
                          <span>PDF ({n.fileSize || 'PDF'})</span>
                        </a>
                      ) : (
                        <span className="text-slate-500 text-[11px]">No file</span>
                      )}
                    </td>

                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(n)}
                          className="p-1.5 rounded-lg bg-slate-700/60 hover:bg-slate-700 text-slate-200"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete notice "${n.title}"?`)) {
                              deleteNotice(n.id);
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

      {/* Add / Edit Modal */}
      {(isAddModalOpen || editingNotice) && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setIsAddModalOpen(false);
                setEditingNotice(null);
              }}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white bg-slate-700/40 hover:bg-slate-700"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold text-white mb-4">
              {editingNotice ? 'Edit Notice / Circular' : 'Publish New Notice / Circular'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Notice Title (English)</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Schedule for Autonomous Semester Examinations 2026"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Notice Title (Hindi Optional)</label>
                <input
                  type="text"
                  value={formData.titleHi}
                  onChange={(e) => setFormData({ ...formData, titleHi: e.target.value })}
                  placeholder="e.g. स्वशासी समेस्टर परीक्षा 2026 समय सारणी"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                  >
                    <option value="Examination">Examination</option>
                    <option value="Admission">Admission</option>
                    <option value="Academic">Academic</option>
                    <option value="Student">Student Corner</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Order / Reference No</label>
                  <input
                    type="text"
                    value={formData.referenceNo}
                    onChange={(e) => setFormData({ ...formData, referenceNo: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Notice Summary</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter notice details and official instructions for students..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">PDF File URL</label>
                  <input
                    type="url"
                    value={formData.fileUrl}
                    onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">File Size</label>
                  <input
                    type="text"
                    value={formData.fileSize}
                    onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
                    placeholder="e.g. 480 KB"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-700">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="tickerToggle"
                    checked={formData.isMarqueeTicker}
                    onChange={(e) => setFormData({ ...formData, isMarqueeTicker: e.target.checked })}
                    className="rounded bg-slate-900 border-slate-700 text-amber-500"
                  />
                  <label htmlFor="tickerToggle" className="text-amber-300 font-medium cursor-pointer">
                    Broadcast in Home Screen Live Urgency Marquee Ticker
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="pinToggle"
                    checked={formData.isImportant}
                    onChange={(e) => setFormData({ ...formData, isImportant: e.target.checked })}
                    className="rounded bg-slate-900 border-slate-700 text-indigo-500"
                  />
                  <label htmlFor="pinToggle" className="text-slate-300 cursor-pointer">
                    Pin notice to top with high-priority badge
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-700">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingNotice(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-700 text-slate-300 hover:bg-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500 font-medium"
                >
                  {editingNotice ? 'Update Notice' : 'Publish Notice'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
