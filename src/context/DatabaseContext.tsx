import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { dbService } from '../services/databaseService';
import {
  TableSchema,
  ExamFormRecord,
  PromotionFormRecord,
  ResultRecord,
  ExamSessionSettings,
  PromotionPolicySettings,
  FullDatabaseBackup,
  AdminSession,
} from '../types/database';
import { StudentProfile, NoticeItem, GrievanceSubmission } from '../types';

interface DatabaseContextType {
  // Admin Session & Authentication
  adminSession: AdminSession | null;
  adminLogin: (username: string, password: string) => boolean;
  adminLogout: () => void;

  // Metadata & Schemas
  schemas: TableSchema[];
  examSettings: ExamSessionSettings;
  promotionPolicy: PromotionPolicySettings;

  // Live Reactive Domain Entities
  students: any[];
  examForms: ExamFormRecord[];
  promotionForms: PromotionFormRecord[];
  results: ResultRecord[];
  notices: NoticeItem[];
  departments: any[];
  grievances: GrievanceSubmission[];
  auditLogs: any[];

  // Refresh & Sync
  refreshDatabase: () => void;

  // Student Corner Operations
  addStudent: (student: any) => void;
  updateStudent: (enrollmentNo: string, updates: any) => void;
  deleteStudent: (enrollmentNo: string) => void;
  promoteStudentDirectly: (enrollmentNo: string, newSemester: number) => void;

  // Exam Forms Operations
  submitExamForm: (form: Omit<ExamFormRecord, 'id' | 'submittedDate' | 'formStatus' | 'admitCardGenerated'>) => ExamFormRecord;
  updateExamFormStatus: (id: string, status: 'Approved' | 'Rejected' | 'Under Review', adminRemarks?: string) => void;
  updateExamSettings: (settings: Partial<ExamSessionSettings>) => void;
  deleteExamForm: (id: string) => void;

  // Promotion Forms (NEP) Operations
  submitPromotionForm: (form: Omit<PromotionFormRecord, 'id' | 'appliedDate' | 'status'>) => PromotionFormRecord;
  updatePromotionStatus: (id: string, status: 'Approved' | 'Rejected', adminRemarks?: string) => void;
  bulkPromoteBatch: (currentSem: number, targetSem: number) => number;
  updatePromotionPolicy: (policy: Partial<PromotionPolicySettings>) => void;
  deletePromotionForm: (id: string) => void;

  // Results & Marksheets Operations
  publishResult: (result: Omit<ResultRecord, 'id'>) => ResultRecord;
  updateResult: (id: string, updates: Partial<ResultRecord>) => void;
  deleteResult: (id: string) => void;

  // Notices Operations
  addNotice: (notice: Omit<NoticeItem, 'id'>) => NoticeItem;
  updateNotice: (id: string, updates: Partial<NoticeItem>) => void;
  deleteNotice: (id: string) => void;

  // Grievance Operations
  updateGrievanceStatus: (tokenNo: string, status: 'Submitted' | 'Under Review' | 'Resolved', remarks?: string) => void;

  // Full Database Studio (Table Operations)
  getTableRows: (tableId: string) => any[];
  createCustomTable: (name: string, description: string, columns: any[]) => TableSchema;
  deleteCustomTable: (tableId: string) => void;
  insertTableRow: (tableId: string, row: any) => any;
  updateTableRow: (tableId: string, pkValue: string, row: any) => any;
  deleteTableRow: (tableId: string, pkValue: string) => void;

  // Import / Export
  importTableData: (tableId: string, records: any[], mode: 'append' | 'replace') => number;
  exportTableCSV: (tableId: string) => string;
  exportTableJSON: (tableId: string) => string;
  exportFullDatabase: () => FullDatabaseBackup;
  restoreFullDatabase: (backup: FullDatabaseBackup) => void;
  resetToFactoryDefaults: () => void;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export function DatabaseProvider({ children }: { children: ReactNode }) {
  // Admin Session State
  const [adminSession, setAdminSession] = useState<AdminSession | null>(() => {
    try {
      const saved = localStorage.getItem('holkar_admin_session_v2');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return null;
  });

  const adminLogin = useCallback((username: string, password: string): boolean => {
    const u = username.trim().toLowerCase();
    const p = password.trim();

    if (
      (u === 'admin' && (p === 'admin' || p === 'admin123' || p === 'holkar@admin2026')) ||
      (u === 'controller' && (p === 'autonomous2026' || p === 'admin')) ||
      (u === 'principal' && (p === 'admin' || p === 'holkar2026'))
    ) {
      const session: AdminSession = {
        username: username.trim(),
        name:
          u === 'controller'
            ? 'Examination Controller'
            : u === 'principal'
            ? 'Principal Prof. Dr. Suresh Silawat'
            : 'Autonomous Administrator & Principal',
        role: 'Super Administrator',
        token: 'HOLKAR-AUTH-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
        loginTime: new Date().toISOString(),
      };
      setAdminSession(session);
      try {
        localStorage.setItem('holkar_admin_session_v2', JSON.stringify(session));
      } catch {
        // ignore
      }
      dbService.logAction('Admin Login', `Administrative user '${session.name}' logged in successfully.`);
      return true;
    }
    return false;
  }, []);

  const adminLogout = useCallback(() => {
    setAdminSession(null);
    try {
      localStorage.removeItem('holkar_admin_session_v2');
    } catch {
      // ignore
    }
    dbService.logAction('Admin Logout', 'Administrative session terminated.');
  }, []);

  const [schemas, setSchemas] = useState<TableSchema[]>([]);
  const [examSettings, setExamSettings] = useState<ExamSessionSettings>(dbService.getExamSettings());
  const [promotionPolicy, setPromotionPolicy] = useState<PromotionPolicySettings>(dbService.getPromotionPolicy());

  // Domain Tables
  const [students, setStudents] = useState<any[]>([]);
  const [examForms, setExamForms] = useState<ExamFormRecord[]>([]);
  const [promotionForms, setPromotionForms] = useState<PromotionFormRecord[]>([]);
  const [results, setResults] = useState<ResultRecord[]>([]);
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [grievances, setGrievances] = useState<GrievanceSubmission[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);

  const refreshDatabase = useCallback(() => {
    setSchemas([...dbService.getSchemas()]);
    setExamSettings({ ...dbService.getExamSettings() });
    setPromotionPolicy({ ...dbService.getPromotionPolicy() });
    setStudents([...dbService.getTableRows('students')]);
    setExamForms([...dbService.getTableRows('exam_forms')]);
    setPromotionForms([...dbService.getTableRows('promotion_forms')]);
    setResults([...dbService.getTableRows('results')]);
    setNotices([...dbService.getTableRows('notices')]);
    setDepartments([...dbService.getTableRows('departments')]);
    setGrievances([...dbService.getTableRows('grievances')]);
    setAuditLogs([...dbService.getTableRows('audit_logs')]);
  }, []);

  useEffect(() => {
    refreshDatabase();
  }, [refreshDatabase]);

  // --- Student Operations ---
  const addStudent = (student: any) => {
    dbService.insertRow('students', student);
    refreshDatabase();
  };

  const updateStudent = (enrollmentNo: string, updates: any) => {
    dbService.updateRow('students', enrollmentNo, updates);
    refreshDatabase();
  };

  const deleteStudent = (enrollmentNo: string) => {
    dbService.deleteRow('students', enrollmentNo);
    refreshDatabase();
  };

  const promoteStudentDirectly = (enrollmentNo: string, newSemester: number) => {
    const student = students.find((s) => s.enrollmentNo === enrollmentNo);
    if (!student) return;

    dbService.updateRow('students', enrollmentNo, {
      currentSemester: newSemester,
      totalCreditsEarned: (student.totalCreditsEarned || 80) + 24,
    });

    dbService.logAction(
      'Direct Student Promotion',
      `Promoted student ${student.fullName} (${enrollmentNo}) to Semester ${newSemester}`
    );
    refreshDatabase();
  };

  // --- Exam Forms Operations ---
  const submitExamForm = (
    form: Omit<ExamFormRecord, 'id' | 'submittedDate' | 'formStatus' | 'admitCardGenerated'>
  ): ExamFormRecord => {
    const newForm: ExamFormRecord = {
      ...form,
      id: 'EF-2026-' + Math.floor(100 + Math.random() * 900),
      submittedDate: new Date().toISOString().split('T')[0],
      formStatus: 'Submitted',
      admitCardGenerated: false,
    };
    dbService.insertRow('exam_forms', newForm);
    refreshDatabase();
    return newForm;
  };

  const updateExamFormStatus = (id: string, status: 'Approved' | 'Rejected' | 'Under Review', adminRemarks?: string) => {
    const existing = examForms.find((ef) => ef.id === id);
    if (!existing) return;

    const updates: Partial<ExamFormRecord> = {
      formStatus: status,
      adminRemarks: adminRemarks !== undefined ? adminRemarks : existing.adminRemarks,
      approvedDate: status === 'Approved' ? new Date().toISOString().split('T')[0] : existing.approvedDate,
      admitCardGenerated: status === 'Approved',
    };

    dbService.updateRow('exam_forms', id, updates);

    // If approved, ensure student profile has admitCardEligible = true
    if (status === 'Approved') {
      try {
        dbService.updateRow('students', existing.enrollmentNo, { admitCardEligible: true });
      } catch {
        // ignore if not found
      }
    }
    refreshDatabase();
  };

  const deleteExamForm = (id: string) => {
    dbService.deleteRow('exam_forms', id);
    refreshDatabase();
  };

  const handleUpdateExamSettings = (settings: Partial<ExamSessionSettings>) => {
    dbService.updateExamSettings(settings);
    refreshDatabase();
  };

  // --- Promotion Forms Operations ---
  const submitPromotionForm = (
    form: Omit<PromotionFormRecord, 'id' | 'appliedDate' | 'status'>
  ): PromotionFormRecord => {
    const newRecord: PromotionFormRecord = {
      ...form,
      id: 'PF-2026-' + Math.floor(100 + Math.random() * 900),
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
    };
    dbService.insertRow('promotion_forms', newRecord);
    refreshDatabase();
    return newRecord;
  };

  const updatePromotionStatus = (id: string, status: 'Approved' | 'Rejected', adminRemarks?: string) => {
    const existing = promotionForms.find((pf) => pf.id === id);
    if (!existing) return;

    const updates: Partial<PromotionFormRecord> = {
      status,
      adminRemarks: adminRemarks !== undefined ? adminRemarks : existing.adminRemarks,
      approvedDate: status === 'Approved' ? new Date().toISOString().split('T')[0] : existing.approvedDate,
    };

    dbService.updateRow('promotion_forms', id, updates);

    // If approved, automatically update student currentSemester in students table!
    if (status === 'Approved') {
      try {
        const student = students.find((s) => s.enrollmentNo === existing.enrollmentNo);
        if (student) {
          dbService.updateRow('students', existing.enrollmentNo, {
            currentSemester: existing.targetSemester,
            totalCreditsEarned: (student.totalCreditsEarned || 80) + 22,
          });
        }
      } catch (err) {
        console.error('Failed to sync student semester on promotion:', err);
      }
    }
    refreshDatabase();
  };

  const bulkPromoteBatch = (currentSem: number, targetSem: number): number => {
    let count = 0;
    const eligibleStudents = students.filter((s) => Number(s.currentSemester) === Number(currentSem));
    eligibleStudents.forEach((student) => {
      dbService.updateRow('students', student.enrollmentNo, {
        currentSemester: targetSem,
        totalCreditsEarned: (student.totalCreditsEarned || 80) + 24,
      });
      count++;
    });

    dbService.logAction(
      'Batch Semester Progression',
      `Promoted ${count} students from Semester ${currentSem} to Semester ${targetSem} under NEP progression guidelines`
    );
    refreshDatabase();
    return count;
  };

  const deletePromotionForm = (id: string) => {
    dbService.deleteRow('promotion_forms', id);
    refreshDatabase();
  };

  const handleUpdatePromotionPolicy = (policy: Partial<PromotionPolicySettings>) => {
    dbService.updatePromotionPolicy(policy);
    refreshDatabase();
  };

  // --- Results Operations ---
  const publishResult = (result: Omit<ResultRecord, 'id'>): ResultRecord => {
    const newRes: ResultRecord = {
      ...result,
      id: 'RES-' + Date.now().toString(36).toUpperCase(),
    };
    dbService.insertRow('results', newRes);
    refreshDatabase();
    return newRes;
  };

  const updateResult = (id: string, updates: Partial<ResultRecord>) => {
    dbService.updateRow('results', id, updates);
    refreshDatabase();
  };

  const deleteResult = (id: string) => {
    dbService.deleteRow('results', id);
    refreshDatabase();
  };

  // --- Notices Operations ---
  const addNotice = (notice: Omit<NoticeItem, 'id'>): NoticeItem => {
    const newNotice: NoticeItem = {
      ...notice,
      id: 'n-2026-' + Math.floor(100 + Math.random() * 900),
    };
    dbService.insertRow('notices', newNotice);
    refreshDatabase();
    return newNotice;
  };

  const updateNotice = (id: string, updates: Partial<NoticeItem>) => {
    dbService.updateRow('notices', id, updates);
    refreshDatabase();
  };

  const deleteNotice = (id: string) => {
    dbService.deleteRow('notices', id);
    refreshDatabase();
  };

  // --- Grievance Operations ---
  const updateGrievanceStatus = (tokenNo: string, status: 'Submitted' | 'Under Review' | 'Resolved', remarks?: string) => {
    dbService.updateRow('grievances', tokenNo, { status, remarks });
    refreshDatabase();
  };

  // --- Full Database Studio Operations ---
  const getTableRows = (tableId: string) => {
    return dbService.getTableRows(tableId);
  };

  const createCustomTable = (name: string, description: string, columns: any[]) => {
    const id = name.toLowerCase().replace(/[^a-z0-9_]/g, '_').trim();
    const primaryKey = columns.find((c) => c.isPrimaryKey)?.name || columns[0]?.name || 'id';

    const newSchema = dbService.createTable({
      id,
      name,
      description,
      isSystemTable: false,
      primaryKey,
      columns,
    });
    refreshDatabase();
    return newSchema;
  };

  const deleteCustomTable = (tableId: string) => {
    dbService.deleteTable(tableId);
    refreshDatabase();
  };

  const insertTableRow = (tableId: string, row: any) => {
    const inserted = dbService.insertRow(tableId, row);
    refreshDatabase();
    return inserted;
  };

  const updateTableRow = (tableId: string, pkValue: string, row: any) => {
    const updated = dbService.updateRow(tableId, pkValue, row);
    refreshDatabase();
    return updated;
  };

  const deleteTableRow = (tableId: string, pkValue: string) => {
    dbService.deleteRow(tableId, pkValue);
    refreshDatabase();
  };

  const importTableData = (tableId: string, records: any[], mode: 'append' | 'replace') => {
    const count = dbService.importTableData(tableId, records, mode);
    refreshDatabase();
    return count;
  };

  const exportTableCSV = (tableId: string) => {
    return dbService.exportTableToCSV(tableId);
  };

  const exportTableJSON = (tableId: string) => {
    return dbService.exportTableToJSON(tableId);
  };

  const exportFullDatabase = () => {
    return dbService.exportFullDatabase();
  };

  const restoreFullDatabase = (backup: FullDatabaseBackup) => {
    dbService.restoreFullDatabase(backup);
    refreshDatabase();
  };

  const resetToFactoryDefaults = () => {
    dbService.seedInitialData();
    refreshDatabase();
  };

  return (
    <DatabaseContext.Provider
      value={{
        adminSession,
        adminLogin,
        adminLogout,
        schemas,
        examSettings,
        promotionPolicy,
        students,
        examForms,
        promotionForms,
        results,
        notices,
        departments,
        grievances,
        auditLogs,
        refreshDatabase,
        addStudent,
        updateStudent,
        deleteStudent,
        promoteStudentDirectly,
        submitExamForm,
        updateExamFormStatus,
        updateExamSettings: handleUpdateExamSettings,
        deleteExamForm,
        submitPromotionForm,
        updatePromotionStatus,
        bulkPromoteBatch,
        updatePromotionPolicy: handleUpdatePromotionPolicy,
        deletePromotionForm,
        publishResult,
        updateResult,
        deleteResult,
        addNotice,
        updateNotice,
        deleteNotice,
        updateGrievanceStatus,
        getTableRows,
        createCustomTable,
        deleteCustomTable,
        insertTableRow,
        updateTableRow,
        deleteTableRow,
        importTableData,
        exportTableCSV,
        exportTableJSON,
        exportFullDatabase,
        restoreFullDatabase,
        resetToFactoryDefaults,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
}

export function useDatabase() {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
}
