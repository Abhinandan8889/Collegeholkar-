import React, { useState, useMemo } from 'react';
import {
  Database,
  Plus,
  Trash2,
  Edit3,
  Download,
  Upload,
  RefreshCw,
  Search,
  Table as TableIcon,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  X,
  PlusCircle,
  FolderSync,
  Layers,
  Sparkles,
  ArrowDownToLine,
  ArrowUpFromLine,
  FileCode,
  ShieldAlert,
} from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';
import { TableSchema, TableColumn, ColumnDataType } from '../../types/database';

export function DatabaseStudioView() {
  const {
    schemas,
    createCustomTable,
    deleteCustomTable,
    getTableRows,
    insertTableRow,
    updateTableRow,
    deleteTableRow,
    importTableData,
    exportTableCSV,
    exportTableJSON,
    exportFullDatabase,
    restoreFullDatabase,
    resetToFactoryDefaults,
  } = useDatabase();

  const [selectedTableId, setSelectedTableId] = useState<string>('students');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isCreateTableModalOpen, setIsCreateTableModalOpen] = useState(false);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any | null>(null);
  const [recordFormData, setRecordFormData] = useState<Record<string, any>>({});
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);

  // Create Table Form State
  const [newTableName, setNewTableName] = useState('');
  const [newTableDesc, setNewTableDesc] = useState('');
  const [newTableColumns, setNewTableColumns] = useState<TableColumn[]>([
    { id: 'c1', name: 'id', label: 'ID', type: 'text', required: true, isPrimaryKey: true },
    { id: 'c2', name: 'name', label: 'Name / Title', type: 'text', required: true },
    { id: 'c3', name: 'created_date', label: 'Created Date', type: 'date' },
  ]);

  // Import State
  const [importMode, setImportMode] = useState<'append' | 'replace'>('append');
  const [importType, setImportType] = useState<'csv' | 'json'>('csv');
  const [pastedImportText, setPastedImportText] = useState('');
  const [importStatusMessage, setImportStatusMessage] = useState<string | null>(null);

  const activeSchema = useMemo(() => {
    return schemas.find((s) => s.id === selectedTableId) || schemas[0];
  }, [schemas, selectedTableId]);

  const activeRows = useMemo(() => {
    if (!activeSchema) return [];
    return getTableRows(activeSchema.id);
  }, [activeSchema, getTableRows]);

  const filteredRows = useMemo(() => {
    if (!searchQuery.trim()) return activeRows;
    const q = searchQuery.toLowerCase();
    return activeRows.filter((r) =>
      Object.values(r).some((val) => String(val).toLowerCase().includes(q))
    );
  }, [activeRows, searchQuery]);

  // --- Add Column in Table Designer ---
  const handleAddColumnToNewTable = () => {
    const colNum = newTableColumns.length + 1;
    setNewTableColumns([
      ...newTableColumns,
      {
        id: 'c_' + Date.now().toString(36),
        name: `column_${colNum}`,
        label: `Column ${colNum}`,
        type: 'text',
        required: false,
      },
    ]);
  };

  const handleRemoveColumnFromNewTable = (idx: number) => {
    if (newTableColumns.length <= 1) return;
    setNewTableColumns(newTableColumns.filter((_, i) => i !== idx));
  };

  const handleUpdateColumnField = (idx: number, field: keyof TableColumn, val: any) => {
    const updated = [...newTableColumns];
    updated[idx] = { ...updated[idx], [field]: val };
    setNewTableColumns(updated);
  };

  const handleCreateTableSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTableName.trim()) return;
    try {
      const created = createCustomTable(newTableName, newTableDesc, newTableColumns);
      setSelectedTableId(created.id);
      setIsCreateTableModalOpen(false);
      setNewTableName('');
      setNewTableDesc('');
    } catch (err: any) {
      alert(err.message);
    }
  };

  // --- Record Add / Edit ---
  const handleOpenAddRecord = () => {
    if (!activeSchema) return;
    const initial: Record<string, any> = {};
    activeSchema.columns.forEach((col) => {
      if (col.isPrimaryKey) {
        initial[col.name] = `${activeSchema.id.toUpperCase().slice(0, 3)}-${Date.now().toString(36).toUpperCase()}`;
      } else if (col.type === 'number') {
        initial[col.name] = 0;
      } else if (col.type === 'boolean') {
        initial[col.name] = false;
      } else if (col.type === 'date') {
        initial[col.name] = new Date().toISOString().split('T')[0];
      } else {
        initial[col.name] = '';
      }
    });
    setRecordFormData(initial);
    setEditingRecord(null);
    setIsRecordModalOpen(true);
  };

  const handleOpenEditRecord = (row: any) => {
    setRecordFormData({ ...row });
    setEditingRecord(row);
    setIsRecordModalOpen(true);
  };

  const handleSaveRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSchema) return;
    const pk = activeSchema.primaryKey;
    try {
      if (editingRecord) {
        updateTableRow(activeSchema.id, String(editingRecord[pk]), recordFormData);
      } else {
        insertTableRow(activeSchema.id, recordFormData);
      }
      setIsRecordModalOpen(false);
      setEditingRecord(null);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDeleteRecord = (row: any) => {
    if (!activeSchema) return;
    const pk = activeSchema.primaryKey;
    if (window.confirm(`Delete record with ${pk} = "${row[pk]}"?`)) {
      deleteTableRow(activeSchema.id, String(row[pk]));
    }
  };

  // --- Export Functions ---
  const handleExportCSV = () => {
    if (!activeSchema) return;
    const csvData = exportTableCSV(activeSchema.id);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeSchema.id}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExportJSON = () => {
    if (!activeSchema) return;
    const jsonData = exportTableJSON(activeSchema.id);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeSchema.id}_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExportFullDB = () => {
    const backup = exportFullDatabase();
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `holkar_autonomous_db_complete_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // --- Import Handler ---
  const handleExecuteImport = () => {
    if (!activeSchema) return;
    setImportStatusMessage(null);

    try {
      let parsedRecords: any[] = [];

      if (importType === 'json') {
        const parsed = JSON.parse(pastedImportText);
        parsedRecords = Array.isArray(parsed) ? parsed : [parsed];
      } else {
        // CSV Parsing
        const lines = pastedImportText.trim().split('\n').filter((l) => l.trim().length > 0);
        if (lines.length < 2) {
          throw new Error('CSV must contain at least a header row and one data row.');
        }

        const headers = lines[0].split(',').map((h) => h.trim().replace(/^["']|["']$/g, ''));
        parsedRecords = lines.slice(1).map((line) => {
          const values = line.split(',').map((v) => v.trim().replace(/^["']|["']$/g, ''));
          const rowObj: Record<string, any> = {};
          headers.forEach((header, index) => {
            let val: any = values[index] ?? '';
            // Auto type cast
            if (val.toLowerCase() === 'true') val = true;
            else if (val.toLowerCase() === 'false') val = false;
            else if (!isNaN(Number(val)) && val !== '') val = Number(val);
            rowObj[header] = val;
          });
          return rowObj;
        });
      }

      const count = importTableData(activeSchema.id, parsedRecords, importMode);
      setImportStatusMessage(`Successfully imported ${count} records into ${activeSchema.name}!`);
      setTimeout(() => {
        setIsImportModalOpen(false);
        setPastedImportText('');
        setImportStatusMessage(null);
      }, 1500);
    } catch (err: any) {
      setImportStatusMessage(`Import Error: ${err.message}`);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setPastedImportText(content);
      if (file.name.endsWith('.json')) {
        setImportType('json');
      } else {
        setImportType('csv');
      }
    };
    reader.readAsText(file);
  };

  const handleFullBackupRestore = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const backup = JSON.parse(event.target?.result as string);
        restoreFullDatabase(backup);
        alert('Database successfully restored from backup snapshot!');
      } catch (err: any) {
        alert('Failed to parse backup JSON: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-sky-400" />
            <span>Autonomous Database Studio & Table Manager</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Complete database authority: create tables, customize dynamic schemas, perform CSV/JSON imports/exports, and manage records.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
          <button
            onClick={() => setIsCreateTableModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-medium transition-all shadow-md shadow-indigo-600/30 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Table</span>
          </button>

          <button
            onClick={handleExportFullDB}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-medium transition-colors cursor-pointer"
            title="Download complete database JSON backup"
          >
            <Download className="w-4 h-4 text-sky-400" />
            <span>Export Full DB</span>
          </button>

          <label className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-medium transition-colors cursor-pointer">
            <Upload className="w-4 h-4 text-emerald-400" />
            <span>Restore DB</span>
            <input type="file" accept=".json" onChange={handleFullBackupRestore} className="hidden" />
          </label>

          <button
            onClick={() => {
              if (window.confirm('Reset database to pristine default demo state? All custom tables and modifications will be refreshed.')) {
                resetToFactoryDefaults();
              }
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-amber-400 border border-slate-700 transition-colors"
            title="Factory Reset Database"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Studio Grid: Left Sidebar Tables List + Right Data Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column: Tables Navigator */}
        <div className="lg:col-span-1 bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 shadow-md space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-700">
            <span className="text-xs font-semibold text-white flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-sky-400" />
              <span>Tables Explorer ({schemas.length})</span>
            </span>
          </div>

          <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
            {schemas.map((s) => {
              const isSelected = s.id === selectedTableId;
              const rowCount = getTableRows(s.id).length;
              return (
                <div
                  key={s.id}
                  onClick={() => setSelectedTableId(s.id)}
                  className={`flex items-center justify-between p-2.5 rounded-xl text-xs cursor-pointer transition-colors border ${
                    isSelected
                      ? 'bg-indigo-950/80 border-indigo-500/60 text-white shadow-sm'
                      : 'bg-slate-900/40 hover:bg-slate-900 border-slate-700/50 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <TableIcon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-indigo-400' : 'text-slate-500'}`} />
                    <div className="truncate">
                      <div className="font-medium truncate">{s.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{s.id}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-mono">
                      {rowCount}
                    </span>
                    {!s.isSystemTable && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`Delete custom table "${s.name}" (${s.id})?`)) {
                            deleteCustomTable(s.id);
                            setSelectedTableId('students');
                          }
                        }}
                        className="p-1 rounded text-slate-500 hover:text-rose-400"
                        title="Delete custom table"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Table Content & Data Grid */}
        <div className="lg:col-span-3 space-y-4">
          {activeSchema && (
            <>
              {/* Active Table Header Bar */}
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">{activeSchema.name}</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-sky-400 border border-slate-700">
                      table: {activeSchema.id}
                    </span>
                    {activeSchema.isSystemTable ? (
                      <span className="px-2 py-0.5 rounded text-[10px] bg-indigo-950 text-indigo-300 border border-indigo-700">
                        System Core
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-700">
                        Custom User Table
                      </span>
                    )}
                  </div>
                  {activeSchema.description && (
                    <p className="text-xs text-slate-400 mt-1">{activeSchema.description}</p>
                  )}
                </div>

                {/* Operations Toolbar */}
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={handleOpenAddRecord}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-medium shadow-md shadow-sky-600/30 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Insert Record</span>
                  </button>

                  <button
                    onClick={() => {
                      setPastedImportText('');
                      setImportStatusMessage(null);
                      setIsImportModalOpen(true);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl text-xs font-medium cursor-pointer"
                  >
                    <ArrowUpFromLine className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Import</span>
                  </button>

                  <div className="flex items-center rounded-xl bg-slate-900 border border-slate-700 p-0.5">
                    <button
                      onClick={handleExportCSV}
                      className="px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Export this table as CSV"
                    >
                      CSV
                    </button>
                    <button
                      onClick={handleExportJSON}
                      className="px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Export this table as JSON"
                    >
                      JSON
                    </button>
                  </div>
                </div>
              </div>

              {/* Search & Columns Count */}
              <div className="flex items-center justify-between gap-4">
                <div className="relative w-72">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder={`Search in ${activeSchema.name}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                <div className="text-xs text-slate-400">
                  {filteredRows.length} rows • {activeSchema.columns.length} columns (PK: <code className="text-sky-300">{activeSchema.primaryKey}</code>)
                </div>
              </div>

              {/* Data Grid Table */}
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl shadow-md overflow-hidden">
                <div className="overflow-x-auto max-h-[500px]">
                  <table className="w-full text-left text-xs text-slate-300 border-collapse">
                    <thead className="bg-slate-900/95 text-slate-400 uppercase tracking-wider font-semibold sticky top-0 z-10 border-b border-slate-700">
                      <tr>
                        {activeSchema.columns.map((col) => (
                          <th key={col.id} className="px-3.5 py-3 whitespace-nowrap">
                            <div className="flex items-center gap-1">
                              <span>{col.label}</span>
                              <span className="text-[9px] text-slate-500 lowercase">({col.type})</span>
                              {col.isPrimaryKey && (
                                <span className="text-[9px] px-1 rounded bg-amber-500/20 text-amber-300">
                                  PK
                                </span>
                              )}
                            </div>
                          </th>
                        ))}
                        <th className="px-3.5 py-3 text-right sticky right-0 bg-slate-900/95 z-20">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50">
                      {filteredRows.length === 0 ? (
                        <tr>
                          <td colSpan={activeSchema.columns.length + 1} className="text-center py-12 text-slate-500">
                            Table contains no rows or no records matched your filter. Click "+ Insert Record" or "Import".
                          </td>
                        </tr>
                      ) : (
                        filteredRows.map((row, rowIdx) => {
                          const pk = activeSchema.primaryKey;
                          const pkVal = row[pk] || rowIdx;
                          return (
                            <tr key={pkVal} className="hover:bg-slate-750/50 transition-colors">
                              {activeSchema.columns.map((col) => {
                                const val = row[col.name];
                                let displayVal = String(val ?? '');
                                if (col.type === 'boolean') {
                                  return (
                                    <td key={col.id} className="px-3.5 py-2.5 whitespace-nowrap">
                                      <span
                                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                                          val
                                            ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-700/60'
                                            : 'bg-slate-900 text-slate-400 border border-slate-700'
                                        }`}
                                      >
                                        {val ? 'TRUE' : 'FALSE'}
                                      </span>
                                    </td>
                                  );
                                }
                                if (Array.isArray(val)) {
                                  displayVal = val.join(', ');
                                } else if (typeof val === 'object' && val !== null) {
                                  displayVal = JSON.stringify(val);
                                }
                                return (
                                  <td
                                    key={col.id}
                                    className={`px-3.5 py-2.5 max-w-xs truncate ${
                                      col.isPrimaryKey ? 'font-mono text-sky-300 font-semibold' : ''
                                    }`}
                                  >
                                    {displayVal || <span className="text-slate-600 italic">null</span>}
                                  </td>
                                );
                              })}
                              <td className="px-3.5 py-2.5 text-right whitespace-nowrap sticky right-0 bg-slate-800/95">
                                <div className="flex items-center justify-end gap-1">
                                  <button
                                    onClick={() => handleOpenEditRecord(row)}
                                    className="p-1 rounded hover:bg-slate-700 text-slate-300 hover:text-white"
                                    title="Edit Row"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteRecord(row)}
                                    className="p-1 rounded hover:bg-rose-900/60 text-slate-400 hover:text-rose-300"
                                    title="Delete Row"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 1. Create New Table Modal */}
      {/* ------------------------------------------------------------- */}
      {isCreateTableModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-2xl shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsCreateTableModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white bg-slate-700/40 hover:bg-slate-700"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <TableIcon className="w-5 h-5 text-indigo-400" />
              <span>Create New Dynamic Database Table</span>
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Define the table name, purpose, and customize fields and column data types.
            </p>

            <form onSubmit={handleCreateTableSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Table Display Name</label>
                  <input
                    type="text"
                    required
                    value={newTableName}
                    onChange={(e) => setNewTableName(e.target.value)}
                    placeholder="e.g. Hostel Allotments, Scholarships"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Description / Category</label>
                  <input
                    type="text"
                    value={newTableDesc}
                    onChange={(e) => setNewTableDesc(e.target.value)}
                    placeholder="e.g. Resident room records and security deposits"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                  />
                </div>
              </div>

              {/* Column Designer */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-slate-200 font-semibold">Table Columns & Schema</label>
                  <button
                    type="button"
                    onClick={handleAddColumnToNewTable}
                    className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-medium"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Column</span>
                  </button>
                </div>

                <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                  {newTableColumns.map((col, idx) => (
                    <div
                      key={col.id}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/60"
                    >
                      <div className="w-1/4">
                        <input
                          type="text"
                          required
                          value={col.name}
                          onChange={(e) => handleUpdateColumnField(idx, 'name', e.target.value)}
                          placeholder="field_key"
                          className="w-full px-2 py-1 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono text-[11px]"
                        />
                      </div>

                      <div className="w-1/3">
                        <input
                          type="text"
                          required
                          value={col.label}
                          onChange={(e) => handleUpdateColumnField(idx, 'label', e.target.value)}
                          placeholder="Column Label"
                          className="w-full px-2 py-1 bg-slate-800 border border-slate-700 rounded-lg text-white text-[11px]"
                        />
                      </div>

                      <div className="w-1/4">
                        <select
                          value={col.type}
                          onChange={(e) => handleUpdateColumnField(idx, 'type', e.target.value as ColumnDataType)}
                          className="w-full px-2 py-1 bg-slate-800 border border-slate-700 rounded-lg text-white text-[11px]"
                        >
                          <option value="text">Text</option>
                          <option value="number">Number</option>
                          <option value="date">Date</option>
                          <option value="boolean">Boolean</option>
                          <option value="email">Email</option>
                          <option value="url">URL</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-2">
                        <label className="flex items-center gap-1 text-[10px] text-slate-400">
                          <input
                            type="checkbox"
                            checked={col.isPrimaryKey}
                            onChange={(e) => {
                              // Set this as PK, uncheck others
                              const updated = newTableColumns.map((c, i) => ({
                                ...c,
                                isPrimaryKey: i === idx ? e.target.checked : false,
                              }));
                              setNewTableColumns(updated);
                            }}
                          />
                          <span>PK</span>
                        </label>

                        {newTableColumns.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveColumnFromNewTable(idx)}
                            className="p-1 rounded text-slate-500 hover:text-rose-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsCreateTableModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-700 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium"
                >
                  Create Table & Schema
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2. Add / Edit Record Modal (Dynamic Field Generator) */}
      {/* ------------------------------------------------------------- */}
      {isRecordModalOpen && activeSchema && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsRecordModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white bg-slate-700/40 hover:bg-slate-700"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold text-white mb-2">
              {editingRecord ? `Edit Record in ${activeSchema.name}` : `Insert New Record into ${activeSchema.name}`}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Fields dynamically bound to {activeSchema.name} table schema.
            </p>

            <form onSubmit={handleSaveRecord} className="space-y-3.5 text-xs">
              {activeSchema.columns.map((col) => {
                const isPk = col.isPrimaryKey;
                const val = recordFormData[col.name] ?? '';

                return (
                  <div key={col.id}>
                    <label className="block text-slate-300 font-medium mb-1 flex items-center gap-1.5">
                      <span>{col.label}</span>
                      <span className="text-[10px] text-slate-500 font-mono">({col.name})</span>
                      {col.required && <span className="text-rose-400">*</span>}
                      {isPk && (
                        <span className="text-[10px] px-1 rounded bg-amber-500/20 text-amber-300">
                          Primary Key
                        </span>
                      )}
                    </label>

                    {col.type === 'boolean' ? (
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="checkbox"
                          checked={!!recordFormData[col.name]}
                          onChange={(e) =>
                            setRecordFormData({ ...recordFormData, [col.name]: e.target.checked })
                          }
                          className="rounded bg-slate-900 border-slate-700 text-sky-500"
                        />
                        <span className="text-slate-300">Set as TRUE</span>
                      </div>
                    ) : col.type === 'select' && col.options ? (
                      <select
                        value={val}
                        onChange={(e) =>
                          setRecordFormData({ ...recordFormData, [col.name]: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                      >
                        {col.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={
                          col.type === 'number'
                            ? 'number'
                            : col.type === 'date'
                            ? 'date'
                            : col.type === 'email'
                            ? 'email'
                            : 'text'
                        }
                        required={col.required}
                        disabled={isPk && !!editingRecord}
                        value={val}
                        onChange={(e) => {
                          const raw = e.target.value;
                          const typedVal = col.type === 'number' ? (raw === '' ? '' : Number(raw)) : raw;
                          setRecordFormData({ ...recordFormData, [col.name]: typedVal });
                        }}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-sans"
                      />
                    )}
                  </div>
                );
              })}

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsRecordModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-700 text-slate-300 hover:bg-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-600 text-white hover:bg-sky-500 font-medium"
                >
                  {editingRecord ? 'Update Record' : 'Insert Row'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 3. Import CSV / JSON Modal */}
      {/* ------------------------------------------------------------- */}
      {isImportModalOpen && activeSchema && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsImportModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white bg-slate-700/40 hover:bg-slate-700"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Upload className="w-5 h-5 text-emerald-400" />
              <span>Import Data into {activeSchema.name}</span>
            </h3>

            {importStatusMessage && (
              <div
                className={`p-3 rounded-xl mb-3 text-xs border ${
                  importStatusMessage.startsWith('Success')
                    ? 'bg-emerald-950/80 border-emerald-700/60 text-emerald-300'
                    : 'bg-rose-950/80 border-rose-700/60 text-rose-300'
                }`}
              >
                {importStatusMessage}
              </div>
            )}

            <div className="space-y-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="block text-slate-300 font-medium mb-1">Format Type</label>
                  <div className="flex rounded-xl bg-slate-900 border border-slate-700 p-1">
                    <button
                      type="button"
                      onClick={() => setImportType('csv')}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
                        importType === 'csv' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      CSV Format
                    </button>
                    <button
                      type="button"
                      onClick={() => setImportType('json')}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
                        importType === 'json' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      JSON Format
                    </button>
                  </div>
                </div>

                <div className="flex-1">
                  <label className="block text-slate-300 font-medium mb-1">Import Mode</label>
                  <select
                    value={importMode}
                    onChange={(e) => setImportMode(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-medium"
                  >
                    <option value="append">Append (Add to existing)</option>
                    <option value="replace">Replace (Overwrite table)</option>
                  </select>
                </div>
              </div>

              {/* Upload File Input */}
              <div>
                <label className="block text-slate-300 font-medium mb-1">Upload File (CSV or JSON)</label>
                <input
                  type="file"
                  accept=".csv, .json, text/csv, application/json"
                  onChange={handleFileUpload}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-300 file:mr-3 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700"
                />
              </div>

              {/* Paste Raw Content */}
              <div>
                <label className="block text-slate-300 font-medium mb-1">Or Paste Raw Content Here:</label>
                <textarea
                  rows={6}
                  value={pastedImportText}
                  onChange={(e) => setPastedImportText(e.target.value)}
                  placeholder={
                    importType === 'csv'
                      ? `${activeSchema.columns.map((c) => c.name).join(',')}\nval1,val2,val3`
                      : '[{ "field": "value" }]'
                  }
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-[11px]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsImportModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-700 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleExecuteImport}
                  disabled={!pastedImportText.trim()}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-medium shadow-md shadow-emerald-600/30 cursor-pointer"
                >
                  Parse & Import Rows
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
