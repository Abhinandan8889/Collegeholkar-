import { NoticeItem, StudentProfile, GrievanceSubmission } from './index';

export type ColumnDataType = 'text' | 'number' | 'date' | 'boolean' | 'select' | 'email' | 'url';

export interface TableColumn {
  id: string;
  name: string; // key in data object
  label: string; // human-readable label
  type: ColumnDataType;
  required?: boolean;
  options?: string[]; // for select types
  isPrimaryKey?: boolean;
  defaultValue?: any;
}

export interface TableSchema {
  id: string; // e.g. 'students', 'exam_forms', 'custom_hostels'
  name: string;
  description?: string;
  isSystemTable?: boolean; // system tables are tightly coupled with the app views
  primaryKey: string;
  columns: TableColumn[];
  createdAt: string;
  updatedAt: string;
}

export interface ExamSessionSettings {
  sessionName: string; // e.g. "May-June 2026 Autonomous Examination"
  isOpen: boolean;
  regularFee: number; // e.g. 1450
  lateFee: number; // e.g. 500
  startDate: string;
  lastDateWithoutLateFee: string;
  lastDateWithLateFee: string;
  admitCardReleased: boolean;
  instructions: string;
}

export interface ExamFormRecord {
  id: string;
  enrollmentNo: string;
  studentName: string;
  programme: string;
  semester: number;
  session: string;
  examType: 'Regular' | 'ATKT' | 'Ex-Student';
  papers: string[]; // List of subject codes
  feesPaid: number;
  transactionId: string;
  paymentStatus: 'Paid' | 'Pending' | 'Exempted';
  formStatus: 'Submitted' | 'Approved' | 'Rejected' | 'Under Review';
  submittedDate: string;
  approvedDate?: string;
  adminRemarks?: string;
  admitCardGenerated: boolean;
  rollNo: string;
}

export interface PromotionPolicySettings {
  academicYear: string;
  minCreditsPercentRequired: number; // e.g. 50 (%)
  maxBacklogsPermitted: number; // e.g. 2 papers
  isPromotionWindowOpen: boolean;
  startDate: string;
  endDate: string;
  feeAmount: number; // e.g. 250
}

export interface PromotionFormRecord {
  id: string;
  enrollmentNo: string;
  studentName: string;
  programme: string;
  currentSemester: number;
  targetSemester: number;
  cgpa: number;
  sgpa: number;
  creditsEarned: number;
  creditsRequired: number;
  backlogCount: number;
  nepEligibility: 'Eligible' | 'Provisionally Eligible' | 'Not Eligible';
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedDate: string;
  approvedDate?: string;
  adminRemarks?: string;
}

export interface ResultRecord {
  id: string;
  enrollmentNo: string;
  rollNo: string;
  studentName: string;
  programme: string;
  semester: number;
  session: string;
  totalCredits: number;
  sgpa: number;
  cgpa: number;
  resultStatus: 'Passed' | 'Promoted with ATKT' | 'Withheld' | 'Failed';
  declaredDate: string;
  marksSummary: string;
}

export interface FullDatabaseBackup {
  metadata: {
    appName: string;
    version: string;
    exportedAt: string;
    exportedBy: string;
    totalTables: number;
    totalRecords: number;
  };
  schemas: TableSchema[];
  tables: Record<string, any[]>;
  examSettings: ExamSessionSettings;
  promotionPolicy: PromotionPolicySettings;
}

export interface AdminSession {
  username: string;
  name: string;
  role: string;
  token: string;
  loginTime: string;
}
