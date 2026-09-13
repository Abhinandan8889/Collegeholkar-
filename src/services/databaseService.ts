import {
  TableSchema,
  TableColumn,
  ExamFormRecord,
  PromotionFormRecord,
  ResultRecord,
  ExamSessionSettings,
  PromotionPolicySettings,
  FullDatabaseBackup,
} from '../types/database';
import { StudentProfile, NoticeItem, GrievanceSubmission } from '../types';
import { DEMO_STUDENT_RAHUL, DEMO_STUDENT_ANANYA, DEMO_STUDENTS } from '../data/studentData';
import { LATEST_NOTICES, COLLEGE_DEPARTMENTS } from '../data/collegeData';

const STORAGE_KEY_SCHEMAS = 'holkar_college_db_schemas_v2';
const STORAGE_KEY_TABLES = 'holkar_college_db_tables_v2';
const STORAGE_KEY_EXAM_SETTINGS = 'holkar_college_exam_settings_v2';
const STORAGE_KEY_PROMOTION_SETTINGS = 'holkar_college_promotion_settings_v2';

// -------------------------------------------------------------
// 1. Initial System Schemas
// -------------------------------------------------------------
export const SYSTEM_SCHEMAS: TableSchema[] = [
  {
    id: 'students',
    name: 'Students Directory',
    description: 'Enrolled students, academic progression, CGPA, attendance and eligibility records',
    isSystemTable: true,
    primaryKey: 'enrollmentNo',
    createdAt: '1891-10-01',
    updatedAt: new Date().toISOString(),
    columns: [
      { id: 'c1', name: 'enrollmentNo', label: 'Enrollment No', type: 'text', required: true, isPrimaryKey: true },
      { id: 'c2', name: 'rollNo', label: 'Roll Number', type: 'text', required: true },
      { id: 'c3', name: 'fullName', label: 'Student Full Name', type: 'text', required: true },
      { id: 'c4', name: 'programme', label: 'Programme / Degree', type: 'text', required: true },
      { id: 'c5', name: 'currentSemester', label: 'Semester', type: 'number', required: true },
      { id: 'c6', name: 'cgpa', label: 'CGPA', type: 'number', required: true },
      { id: 'c7', name: 'sgpa', label: 'SGPA', type: 'number', required: true },
      { id: 'c8', name: 'attendanceOverall', label: 'Attendance %', type: 'number', required: true },
      { id: 'c9', name: 'email', label: 'Email', type: 'email', required: true },
      { id: 'c10', name: 'mobile', label: 'Mobile No', type: 'text', required: true },
      { id: 'c11', name: 'category', label: 'Category', type: 'select', options: ['General', 'OBC', 'SC', 'ST', 'EWS'] },
      { id: 'c12', name: 'admitCardEligible', label: 'Admit Card Issued', type: 'boolean' },
    ],
  },
  {
    id: 'exam_forms',
    name: 'Examination Forms',
    description: 'Autonomous semester examination form applications and hall ticket clearances',
    isSystemTable: true,
    primaryKey: 'id',
    createdAt: '2026-01-01',
    updatedAt: new Date().toISOString(),
    columns: [
      { id: 'ef1', name: 'id', label: 'Form ID', type: 'text', required: true, isPrimaryKey: true },
      { id: 'ef2', name: 'enrollmentNo', label: 'Enrollment No', type: 'text', required: true },
      { id: 'ef3', name: 'studentName', label: 'Student Name', type: 'text', required: true },
      { id: 'ef4', name: 'programme', label: 'Programme', type: 'text', required: true },
      { id: 'ef5', name: 'semester', label: 'Semester', type: 'number', required: true },
      { id: 'ef6', name: 'session', label: 'Exam Session', type: 'text', required: true },
      { id: 'ef7', name: 'examType', label: 'Type', type: 'select', options: ['Regular', 'ATKT', 'Ex-Student'] },
      { id: 'ef8', name: 'feesPaid', label: 'Fees (₹)', type: 'number', required: true },
      { id: 'ef9', name: 'transactionId', label: 'Transaction ID', type: 'text' },
      { id: 'ef10', name: 'paymentStatus', label: 'Fee Status', type: 'select', options: ['Paid', 'Pending', 'Exempted'] },
      { id: 'ef11', name: 'formStatus', label: 'Approval Status', type: 'select', options: ['Submitted', 'Approved', 'Rejected', 'Under Review'] },
      { id: 'ef12', name: 'admitCardGenerated', label: 'Admit Card Ready', type: 'boolean' },
      { id: 'ef13', name: 'submittedDate', label: 'Submission Date', type: 'date', required: true },
      { id: 'ef14', name: 'adminRemarks', label: 'Remarks / Scrutiny', type: 'text' },
    ],
  },
  {
    id: 'promotion_forms',
    name: 'NEP Promotion Forms',
    description: 'National Education Policy semester progression and credit validation applications',
    isSystemTable: true,
    primaryKey: 'id',
    createdAt: '2026-01-01',
    updatedAt: new Date().toISOString(),
    columns: [
      { id: 'pf1', name: 'id', label: 'Application ID', type: 'text', required: true, isPrimaryKey: true },
      { id: 'pf2', name: 'enrollmentNo', label: 'Enrollment No', type: 'text', required: true },
      { id: 'pf3', name: 'studentName', label: 'Student Name', type: 'text', required: true },
      { id: 'pf4', name: 'programme', label: 'Programme', type: 'text', required: true },
      { id: 'pf5', name: 'currentSemester', label: 'Current Sem', type: 'number', required: true },
      { id: 'pf6', name: 'targetSemester', label: 'Target Sem', type: 'number', required: true },
      { id: 'pf7', name: 'creditsEarned', label: 'Credits Earned', type: 'number', required: true },
      { id: 'pf8', name: 'creditsRequired', label: 'Required Credits', type: 'number', required: true },
      { id: 'pf9', name: 'backlogCount', label: 'Backlogs (ATKT)', type: 'number', required: true },
      { id: 'pf10', name: 'nepEligibility', label: 'NEP Eligibility', type: 'select', options: ['Eligible', 'Provisionally Eligible', 'Not Eligible'] },
      { id: 'pf11', name: 'status', label: 'Promotion Status', type: 'select', options: ['Pending', 'Approved', 'Rejected'] },
      { id: 'pf12', name: 'appliedDate', label: 'Applied Date', type: 'date', required: true },
      { id: 'pf13', name: 'adminRemarks', label: 'Remarks', type: 'text' },
    ],
  },
  {
    id: 'results',
    name: 'Results & Grade Cards',
    description: 'Autonomous semester end exam results, SGPA, CGPA, and pass/ATKT designations',
    isSystemTable: true,
    primaryKey: 'id',
    createdAt: '2026-01-01',
    updatedAt: new Date().toISOString(),
    columns: [
      { id: 'r1', name: 'id', label: 'Result ID', type: 'text', required: true, isPrimaryKey: true },
      { id: 'r2', name: 'enrollmentNo', label: 'Enrollment No', type: 'text', required: true },
      { id: 'r3', name: 'rollNo', label: 'Roll No', type: 'text', required: true },
      { id: 'r4', name: 'studentName', label: 'Student Name', type: 'text', required: true },
      { id: 'r5', name: 'programme', label: 'Programme', type: 'text', required: true },
      { id: 'r6', name: 'semester', label: 'Semester', type: 'number', required: true },
      { id: 'r7', name: 'session', label: 'Session', type: 'text', required: true },
      { id: 'r8', name: 'totalCredits', label: 'Credits', type: 'number', required: true },
      { id: 'r9', name: 'sgpa', label: 'SGPA', type: 'number', required: true },
      { id: 'r10', name: 'cgpa', label: 'CGPA', type: 'number', required: true },
      { id: 'r11', name: 'resultStatus', label: 'Result Status', type: 'select', options: ['Passed', 'Promoted with ATKT', 'Withheld', 'Failed'] },
      { id: 'r12', name: 'declaredDate', label: 'Declared Date', type: 'date', required: true },
      { id: 'r13', name: 'marksSummary', label: 'Marks Summary', type: 'text' },
    ],
  },
  {
    id: 'notices',
    name: 'Notices & Circulars',
    description: 'Official notifications, circulars, marquee ticker alerts, and downloadable orders',
    isSystemTable: true,
    primaryKey: 'id',
    createdAt: '2026-01-01',
    updatedAt: new Date().toISOString(),
    columns: [
      { id: 'n1', name: 'id', label: 'Notice ID', type: 'text', required: true, isPrimaryKey: true },
      { id: 'n2', name: 'title', label: 'Notice Title (English)', type: 'text', required: true },
      { id: 'n3', name: 'titleHi', label: 'Notice Title (Hindi)', type: 'text' },
      { id: 'n4', name: 'category', label: 'Category', type: 'select', options: ['Examination', 'Admission', 'Academic', 'Student', 'General'], required: true },
      { id: 'n5', name: 'date', label: 'Publish Date', type: 'date', required: true },
      { id: 'n6', name: 'isImportant', label: 'Pinned / Important', type: 'boolean' },
      { id: 'n7', name: 'isNew', label: 'New Tag', type: 'boolean' },
      { id: 'n8', name: 'isMarqueeTicker', label: 'Ticker Display', type: 'boolean' },
      { id: 'n9', name: 'referenceNo', label: 'Reference / Order No', type: 'text' },
      { id: 'n10', name: 'description', label: 'Notice Summary', type: 'text', required: true },
      { id: 'n11', name: 'fileUrl', label: 'File URL / PDF Link', type: 'url' },
      { id: 'n12', name: 'fileSize', label: 'File Size', type: 'text' },
    ],
  },
  {
    id: 'departments',
    name: 'Academic Departments',
    description: 'Holkar Science College teaching faculties, laboratory centers and faculty counts',
    isSystemTable: true,
    primaryKey: 'id',
    createdAt: '1891-10-01',
    updatedAt: new Date().toISOString(),
    columns: [
      { id: 'd1', name: 'id', label: 'Dept ID', type: 'text', required: true, isPrimaryKey: true },
      { id: 'd2', name: 'name', label: 'Department Name', type: 'text', required: true },
      { id: 'd3', name: 'code', label: 'Code', type: 'text', required: true },
      { id: 'd4', name: 'category', label: 'Discipline', type: 'select', options: ['Physical Sciences', 'Chemical Sciences', 'Life Sciences', 'Mathematical & Computational', 'Interdisciplinary'] },
      { id: 'd5', name: 'headOfDepartment', label: 'Head of Dept (HOD)', type: 'text', required: true },
      { id: 'd6', name: 'labsCount', label: 'Laboratories Count', type: 'number' },
      { id: 'd7', name: 'facultyCount', label: 'Faculty Count', type: 'number' },
      { id: 'd8', name: 'email', label: 'Official Email', type: 'email' },
    ],
  },
  {
    id: 'grievances',
    name: 'Grievances & Anti-Ragging',
    description: 'Confidential student grievances, anti-ragging complaints and resolution remarks',
    isSystemTable: true,
    primaryKey: 'tokenNo',
    createdAt: '2026-01-01',
    updatedAt: new Date().toISOString(),
    columns: [
      { id: 'g1', name: 'tokenNo', label: 'Token No', type: 'text', required: true, isPrimaryKey: true },
      { id: 'g2', name: 'date', label: 'Date', type: 'date', required: true },
      { id: 'g3', name: 'category', label: 'Category', type: 'select', options: ['Examination', 'Scholarship', 'Admission', 'Library', 'Hostel', 'Anti-Ragging', 'Academic', 'Infrastructure', 'General', 'Other'], required: true },
      { id: 'g4', name: 'studentName', label: 'Student Name', type: 'text' },
      { id: 'g5', name: 'enrollmentNo', label: 'Enrollment No', type: 'text' },
      { id: 'g6', name: 'subject', label: 'Subject', type: 'text', required: true },
      { id: 'g7', name: 'description', label: 'Description', type: 'text', required: true },
      { id: 'g8', name: 'status', label: 'Status', type: 'select', options: ['Submitted', 'Under Review', 'Resolved'], required: true },
      { id: 'g9', name: 'isConfidential', label: 'Confidential', type: 'boolean' },
      { id: 'g10', name: 'remarks', label: 'Official Remarks', type: 'text' },
    ],
  },
  {
    id: 'audit_logs',
    name: 'System Audit Logs',
    description: 'Admin administrative activity timeline, records imports and database modifications',
    isSystemTable: true,
    primaryKey: 'id',
    createdAt: '2026-01-01',
    updatedAt: new Date().toISOString(),
    columns: [
      { id: 'al1', name: 'id', label: 'Log ID', type: 'text', required: true, isPrimaryKey: true },
      { id: 'al2', name: 'timestamp', label: 'Timestamp', type: 'text', required: true },
      { id: 'al3', name: 'action', label: 'Action Executed', type: 'text', required: true },
      { id: 'al4', name: 'user', label: 'Admin User', type: 'text', required: true },
      { id: 'al5', name: 'details', label: 'Details', type: 'text' },
    ],
  },
];

// -------------------------------------------------------------
// 2. Default Initial Data
// -------------------------------------------------------------
const DEFAULT_EXAM_SETTINGS: ExamSessionSettings = {
  sessionName: 'Odd/Even Semester Autonomous Examination 2026',
  isOpen: true,
  regularFee: 1450,
  lateFee: 500,
  startDate: '2026-05-01',
  lastDateWithoutLateFee: '2026-05-25',
  lastDateWithLateFee: '2026-05-31',
  admitCardReleased: true,
  instructions: 'Please verify all course codes before submitting. Fees once paid via MPOnline / Autonomous Gateway are non-refundable. Hall ticket will be generated upon autonomous scrutiny approval.',
};

const DEFAULT_PROMOTION_SETTINGS: PromotionPolicySettings = {
  academicYear: '2025-2026',
  minCreditsPercentRequired: 50,
  maxBacklogsPermitted: 2,
  isPromotionWindowOpen: true,
  startDate: '2026-05-15',
  endDate: '2026-06-15',
  feeAmount: 350,
};

function getInitialStudents(): any[] {
  return Object.values(DEMO_STUDENTS).map((s) => ({
    enrollmentNo: s.enrollmentNo,
    rollNo: s.rollNo,
    fullName: s.fullName,
    programme: s.programme,
    currentSemester: s.currentSemester,
    cgpa: s.cgpa,
    sgpa: s.sgpa,
    attendanceOverall: s.attendanceOverall,
    email: s.email,
    mobile: s.mobile,
    category: s.category,
    admitCardEligible: true,
    fatherName: s.fatherName,
    motherName: s.motherName,
    dob: s.dob,
    gender: s.gender,
    bloodGroup: s.bloodGroup,
    majorSubject: s.majorSubject,
    minorSubject: s.minorSubject,
    totalCreditsEarned: s.totalCreditsEarned,
    totalCreditsRequired: s.totalCreditsRequired,
    grades: s.grades,
    attendance: s.attendance,
    timetable: s.timetable,
    feeReceipts: s.feeReceipts,
  }));
}

function getInitialExamForms(): ExamFormRecord[] {
  return [
    {
      id: 'EF-2026-001',
      enrollmentNo: 'DS2200192',
      studentName: 'Rahul Sharma',
      programme: 'B.Sc. (Honours) Computer Science',
      semester: 6,
      session: 'May-June 2026 Autonomous Examination',
      examType: 'Regular',
      papers: ['CS-601 (DAA)', 'CS-602 (AI & ML)', 'CS-603 (Web Tech)', 'MATH-601 (Numerical)'],
      feesPaid: 1450,
      transactionId: 'MPONL-2026-88914',
      paymentStatus: 'Paid',
      formStatus: 'Approved',
      submittedDate: '2026-05-04',
      approvedDate: '2026-05-06',
      admitCardGenerated: true,
      rollNo: '2260142',
      adminRemarks: 'Verified all CCE marks & eligibility approved.',
    },
    {
      id: 'EF-2026-002',
      enrollmentNo: 'DS2300451',
      studentName: 'Ananya Patidar',
      programme: 'B.Sc. Biotechnology & Chemistry',
      semester: 4,
      session: 'May-June 2026 Autonomous Examination',
      examType: 'Regular',
      papers: ['BIO-401 (Genetics)', 'CHE-401 (Coordination Chem)', 'BOT-401 (Plant Physiol)'],
      feesPaid: 1450,
      transactionId: 'MPONL-2026-90214',
      paymentStatus: 'Paid',
      formStatus: 'Approved',
      submittedDate: '2026-05-08',
      approvedDate: '2026-05-09',
      admitCardGenerated: true,
      rollNo: '2340518',
      adminRemarks: 'Approved for Semester 4 autonomous hall ticket.',
    },
    {
      id: 'EF-2026-003',
      enrollmentNo: 'DS2400819',
      studentName: 'Vikram Singh Chouhan',
      programme: 'Bachelor of Computer Applications (BCA)',
      semester: 2,
      session: 'May-June 2026 Autonomous Examination',
      examType: 'Regular',
      papers: ['BCA-201 (Data Structures)', 'BCA-202 (OOP Java)', 'BCA-203 (DBMS)'],
      feesPaid: 1450,
      transactionId: 'UPI-992019482',
      paymentStatus: 'Paid',
      formStatus: 'Submitted',
      submittedDate: '2026-05-10',
      admitCardGenerated: false,
      rollNo: '2420991',
      adminRemarks: 'Pending CCE attendance verification from HOD BCA.',
    },
  ];
}

function getInitialPromotionForms(): PromotionFormRecord[] {
  return [
    {
      id: 'PF-2026-101',
      enrollmentNo: 'DS2300451',
      studentName: 'Ananya Patidar',
      programme: 'B.Sc. Biotechnology & Chemistry',
      currentSemester: 4,
      targetSemester: 5,
      cgpa: 9.12,
      sgpa: 9.20,
      creditsEarned: 88,
      creditsRequired: 80,
      backlogCount: 0,
      nepEligibility: 'Eligible',
      status: 'Approved',
      appliedDate: '2026-05-02',
      approvedDate: '2026-05-05',
      adminRemarks: 'Promoted to Semester 5 (Final Year B.Sc. Research Track).',
    },
    {
      id: 'PF-2026-102',
      enrollmentNo: 'DS2400819',
      studentName: 'Vikram Singh Chouhan',
      programme: 'Bachelor of Computer Applications (BCA)',
      currentSemester: 2,
      targetSemester: 3,
      cgpa: 7.94,
      sgpa: 8.10,
      creditsEarned: 42,
      creditsRequired: 40,
      backlogCount: 1,
      nepEligibility: 'Provisionally Eligible',
      status: 'Pending',
      appliedDate: '2026-05-07',
      adminRemarks: 'Subject to clearing BCA-101 in upcoming ATKT examination.',
    },
    {
      id: 'PF-2026-103',
      enrollmentNo: 'DS2200192',
      studentName: 'Rahul Sharma',
      programme: 'B.Sc. (Honours with Research) Computer Science',
      currentSemester: 6,
      targetSemester: 7,
      cgpa: 8.84,
      sgpa: 9.05,
      creditsEarned: 132,
      creditsRequired: 120,
      backlogCount: 0,
      nepEligibility: 'Eligible',
      status: 'Pending',
      appliedDate: '2026-05-09',
      adminRemarks: 'Eligible for NEP 4th Year Research Honours stream.',
    },
  ];
}

function getInitialResults(): ResultRecord[] {
  return [
    {
      id: 'RES-2025-01',
      enrollmentNo: 'DS2200192',
      rollNo: '2260142',
      studentName: 'Rahul Sharma',
      programme: 'B.Sc. (Honours) Computer Science',
      semester: 5,
      session: 'Nov-Dec 2025 Autonomous Examination',
      totalCredits: 24,
      sgpa: 9.05,
      cgpa: 8.84,
      resultStatus: 'Passed',
      declaredDate: '2026-02-14',
      marksSummary: 'CS-501: 91/100, CS-502: 88/100, MATH-501: 94/100, SEC-501: 85/100',
    },
    {
      id: 'RES-2025-02',
      enrollmentNo: 'DS2300451',
      rollNo: '2340518',
      studentName: 'Ananya Patidar',
      programme: 'B.Sc. Biotechnology & Chemistry',
      semester: 3,
      session: 'Nov-Dec 2025 Autonomous Examination',
      totalCredits: 22,
      sgpa: 9.20,
      cgpa: 9.12,
      resultStatus: 'Passed',
      declaredDate: '2026-02-14',
      marksSummary: 'BIO-301: 95/100, CHE-301: 90/100, BOT-301: 92/100',
    },
    {
      id: 'RES-2025-03',
      enrollmentNo: 'DS2400819',
      rollNo: '2420991',
      studentName: 'Vikram Singh Chouhan',
      programme: 'Bachelor of Computer Applications (BCA)',
      semester: 1,
      session: 'Nov-Dec 2025 Autonomous Examination',
      totalCredits: 20,
      sgpa: 8.10,
      cgpa: 8.10,
      resultStatus: 'Promoted with ATKT',
      declaredDate: '2026-02-18',
      marksSummary: 'BCA-101: 34/100 (ATKT), BCA-102: 82/100, BCA-103: 78/100',
    },
  ];
}

function getInitialNotices(): NoticeItem[] {
  return LATEST_NOTICES.map((n, idx) => ({
    ...n,
    isMarqueeTicker: idx < 3, // first 3 in urgent ticker
  }));
}

function getInitialDepartments(): any[] {
  return COLLEGE_DEPARTMENTS.map((d) => ({
    id: d.id,
    name: d.name,
    code: d.code,
    category: d.category,
    headOfDepartment: d.headOfDepartment || 'Senior Professor',
    labsCount: d.labsCount,
    facultyCount: d.facultyCount,
    email: d.email,
  }));
}

function getInitialGrievances(): GrievanceSubmission[] {
  return [
    {
      tokenNo: 'GRV-2026-0042',
      date: '2026-05-02',
      category: 'Scholarship',
      studentName: 'Pooja Verma',
      enrollmentNo: 'DS2300912',
      subject: 'Delay in Post-Matric MMVY Scholarship Portal Verification',
      description: 'The college nodal officer verification for MMVY is pending for academic year 2025-26.',
      status: 'Under Review',
      isConfidential: false,
      remarks: 'Forwarded to Accounts section scholarship desk for verification.',
    },
    {
      tokenNo: 'GRV-2026-0043',
      date: '2026-05-05',
      category: 'Library',
      studentName: 'Aman Joshi',
      enrollmentNo: 'DS2400114',
      subject: 'Access issue with N-LIST digital consortium off-campus login',
      description: 'Unable to access subscribed chemistry journals from home IP address.',
      status: 'Resolved',
      isConfidential: false,
      remarks: 'Remote Shibboleth login credentials re-sent to student registered email.',
    },
    {
      tokenNo: 'GRV-2026-0044',
      date: '2026-05-08',
      category: 'Anti-Ragging',
      studentName: 'Anonymous Scholar',
      enrollmentNo: 'Confidential',
      subject: 'Request for intensified proctorial patrolling near East Hostel Lawn',
      description: 'Requesting extra security patrols in late evening hours around the botanical garden path.',
      status: 'Under Review',
      isConfidential: true,
      remarks: 'Proctorial board deployed additional evening security guards and camera checks.',
    },
  ];
}

function getInitialAuditLogs(): any[] {
  return [
    {
      id: 'LOG-001',
      timestamp: new Date().toISOString(),
      action: 'Database Initialization',
      user: 'Super Admin (Autonomous Controller)',
      details: 'Initialized Holkar Science College schema and demo database with 8 core tables.',
    },
  ];
}

// -------------------------------------------------------------
// 3. Database Service Class
// -------------------------------------------------------------
class DatabaseService {
  private schemas: TableSchema[] = [];
  private tables: Record<string, any[]> = {};
  private examSettings: ExamSessionSettings = DEFAULT_EXAM_SETTINGS;
  private promotionPolicy: PromotionPolicySettings = DEFAULT_PROMOTION_SETTINGS;

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const storedSchemas = localStorage.getItem(STORAGE_KEY_SCHEMAS);
      const storedTables = localStorage.getItem(STORAGE_KEY_TABLES);
      const storedExamSettings = localStorage.getItem(STORAGE_KEY_EXAM_SETTINGS);
      const storedPromoSettings = localStorage.getItem(STORAGE_KEY_PROMOTION_SETTINGS);

      if (storedSchemas && storedTables) {
        this.schemas = JSON.parse(storedSchemas);
        this.tables = JSON.parse(storedTables);
      } else {
        this.seedInitialData();
      }

      if (storedExamSettings) {
        this.examSettings = JSON.parse(storedExamSettings);
      } else {
        this.examSettings = DEFAULT_EXAM_SETTINGS;
        localStorage.setItem(STORAGE_KEY_EXAM_SETTINGS, JSON.stringify(this.examSettings));
      }

      if (storedPromoSettings) {
        this.promotionPolicy = JSON.parse(storedPromoSettings);
      } else {
        this.promotionPolicy = DEFAULT_PROMOTION_SETTINGS;
        localStorage.setItem(STORAGE_KEY_PROMOTION_SETTINGS, JSON.stringify(this.promotionPolicy));
      }
    } catch (e) {
      console.error('Failed to load database from localStorage, re-seeding:', e);
      this.seedInitialData();
    }
  }

  public seedInitialData() {
    this.schemas = [...SYSTEM_SCHEMAS];
    this.tables = {
      students: getInitialStudents(),
      exam_forms: getInitialExamForms(),
      promotion_forms: getInitialPromotionForms(),
      results: getInitialResults(),
      notices: getInitialNotices(),
      departments: getInitialDepartments(),
      grievances: getInitialGrievances(),
      audit_logs: getInitialAuditLogs(),
    };
    this.examSettings = DEFAULT_EXAM_SETTINGS;
    this.promotionPolicy = DEFAULT_PROMOTION_SETTINGS;
    this.persist();
  }

  private persist() {
    try {
      localStorage.setItem(STORAGE_KEY_SCHEMAS, JSON.stringify(this.schemas));
      localStorage.setItem(STORAGE_KEY_TABLES, JSON.stringify(this.tables));
      localStorage.setItem(STORAGE_KEY_EXAM_SETTINGS, JSON.stringify(this.examSettings));
      localStorage.setItem(STORAGE_KEY_PROMOTION_SETTINGS, JSON.stringify(this.promotionPolicy));
    } catch (e) {
      console.error('Error persisting database to localStorage:', e);
    }
  }

  // --- Audit Logging ---
  public logAction(action: string, details: string, user = 'Super Admin') {
    const log = {
      id: 'LOG-' + Date.now().toString(36).toUpperCase(),
      timestamp: new Date().toLocaleString(),
      action,
      user,
      details,
    };
    if (!this.tables['audit_logs']) {
      this.tables['audit_logs'] = [];
    }
    this.tables['audit_logs'].unshift(log);
    if (this.tables['audit_logs'].length > 100) {
      this.tables['audit_logs'].pop();
    }
    this.persist();
  }

  // --- Schema Operations ---
  public getSchemas(): TableSchema[] {
    return this.schemas;
  }

  public getSchema(tableId: string): TableSchema | undefined {
    return this.schemas.find((s) => s.id === tableId);
  }

  public createTable(schema: Omit<TableSchema, 'createdAt' | 'updatedAt'>): TableSchema {
    const now = new Date().toISOString();
    const newSchema: TableSchema = {
      ...schema,
      createdAt: now,
      updatedAt: now,
    };
    this.schemas.push(newSchema);
    this.tables[newSchema.id] = [];
    this.logAction('Create Table', `Created new table: ${newSchema.name} (${newSchema.id})`);
    this.persist();
    return newSchema;
  }

  public updateTableSchema(tableId: string, updates: Partial<TableSchema>) {
    const idx = this.schemas.findIndex((s) => s.id === tableId);
    if (idx !== -1) {
      this.schemas[idx] = {
        ...this.schemas[idx],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      this.logAction('Update Table Schema', `Updated schema for table: ${tableId}`);
      this.persist();
    }
  }

  public deleteTable(tableId: string): boolean {
    const schema = this.getSchema(tableId);
    if (schema?.isSystemTable) {
      throw new Error('System tables cannot be deleted because they are required by the application.');
    }
    this.schemas = this.schemas.filter((s) => s.id !== tableId);
    delete this.tables[tableId];
    this.logAction('Delete Table', `Deleted custom table: ${tableId}`);
    this.persist();
    return true;
  }

  // --- Table Row Operations ---
  public getTableRows(tableId: string): any[] {
    return this.tables[tableId] || [];
  }

  public insertRow(tableId: string, row: any): any {
    const schema = this.getSchema(tableId);
    if (!schema) throw new Error(`Table ${tableId} does not exist`);

    const pk = schema.primaryKey;
    if (!row[pk]) {
      row[pk] = `${tableId.toUpperCase().slice(0, 3)}-${Date.now()}`;
    }

    if (!this.tables[tableId]) {
      this.tables[tableId] = [];
    }

    // Check duplicate primary key
    const existingIndex = this.tables[tableId].findIndex((r) => String(r[pk]) === String(row[pk]));
    if (existingIndex !== -1) {
      throw new Error(`Record with primary key ${pk}='${row[pk]}' already exists in ${tableId}`);
    }

    this.tables[tableId].unshift(row);
    this.logAction('Insert Record', `Added row in ${tableId} (ID: ${row[pk]})`);
    this.persist();
    return row;
  }

  public updateRow(tableId: string, primaryKeyValue: string, updatedRow: any): any {
    const schema = this.getSchema(tableId);
    if (!schema) throw new Error(`Table ${tableId} does not exist`);
    const pk = schema.primaryKey;

    if (!this.tables[tableId]) {
      this.tables[tableId] = [];
    }

    const idx = this.tables[tableId].findIndex((r) => String(r[pk]) === String(primaryKeyValue));
    if (idx === -1) {
      throw new Error(`Record not found in ${tableId} with ${pk}=${primaryKeyValue}`);
    }

    this.tables[tableId][idx] = { ...this.tables[tableId][idx], ...updatedRow };
    this.logAction('Update Record', `Updated row in ${tableId} (ID: ${primaryKeyValue})`);
    this.persist();
    return this.tables[tableId][idx];
  }

  public deleteRow(tableId: string, primaryKeyValue: string): boolean {
    const schema = this.getSchema(tableId);
    if (!schema) throw new Error(`Table ${tableId} does not exist`);
    const pk = schema.primaryKey;

    if (!this.tables[tableId]) return false;

    this.tables[tableId] = this.tables[tableId].filter((r) => String(r[pk]) !== String(primaryKeyValue));
    this.logAction('Delete Record', `Deleted row from ${tableId} (ID: ${primaryKeyValue})`);
    this.persist();
    return true;
  }

  // --- Import / Export ---
  public importTableData(tableId: string, records: any[], mode: 'append' | 'replace'): number {
    const schema = this.getSchema(tableId);
    if (!schema) throw new Error(`Table ${tableId} not found`);
    const pk = schema.primaryKey;

    if (!this.tables[tableId] || mode === 'replace') {
      this.tables[tableId] = [];
    }

    let insertedCount = 0;
    records.forEach((rec, i) => {
      if (!rec[pk]) {
        rec[pk] = `${tableId.slice(0, 3)}-IMP-${Date.now()}-${i}`;
      }
      if (mode === 'append') {
        const exists = this.tables[tableId].some((r) => String(r[pk]) === String(rec[pk]));
        if (!exists) {
          this.tables[tableId].push(rec);
          insertedCount++;
        }
      } else {
        this.tables[tableId].push(rec);
        insertedCount++;
      }
    });

    this.logAction(
      'Import Data',
      `Imported ${insertedCount} records into ${schema.name} (${mode} mode)`
    );
    this.persist();
    return insertedCount;
  }

  public exportTableToCSV(tableId: string): string {
    const schema = this.getSchema(tableId);
    const rows = this.getTableRows(tableId);
    if (!schema) return '';

    const headers = schema.columns.map((c) => c.name);
    const csvLines = [headers.join(',')];

    rows.forEach((r) => {
      const line = headers.map((h) => {
        let val = r[h];
        if (val === undefined || val === null) val = '';
        if (typeof val === 'object') val = JSON.stringify(val);
        const str = String(val).replace(/"/g, '""');
        return `"${str}"`;
      });
      csvLines.push(line.join(','));
    });

    return csvLines.join('\n');
  }

  public exportTableToJSON(tableId: string): string {
    const rows = this.getTableRows(tableId);
    return JSON.stringify(rows, null, 2);
  }

  public exportFullDatabase(): FullDatabaseBackup {
    let totalRecords = 0;
    Object.values(this.tables).forEach((rows) => {
      totalRecords += rows.length;
    });

    return {
      metadata: {
        appName: 'Government Holkar Science College Indore Autonomous DB',
        version: '2.0.0',
        exportedAt: new Date().toISOString(),
        exportedBy: 'Super Admin',
        totalTables: this.schemas.length,
        totalRecords,
      },
      schemas: this.schemas,
      tables: this.tables,
      examSettings: this.examSettings,
      promotionPolicy: this.promotionPolicy,
    };
  }

  public restoreFullDatabase(backup: FullDatabaseBackup): void {
    if (!backup.schemas || !backup.tables) {
      throw new Error('Invalid database backup format. Missing schemas or tables.');
    }
    this.schemas = backup.schemas;
    this.tables = backup.tables;
    if (backup.examSettings) this.examSettings = backup.examSettings;
    if (backup.promotionPolicy) this.promotionPolicy = backup.promotionPolicy;

    this.logAction('Restore Database', `Full database restored from backup created at ${backup.metadata?.exportedAt || 'unknown'}`);
    this.persist();
  }

  // --- Domain Settings ---
  public getExamSettings(): ExamSessionSettings {
    return this.examSettings;
  }

  public updateExamSettings(settings: Partial<ExamSessionSettings>) {
    this.examSettings = { ...this.examSettings, ...settings };
    this.logAction('Update Exam Settings', `Updated exam session: ${this.examSettings.sessionName}`);
    this.persist();
  }

  public getPromotionPolicy(): PromotionPolicySettings {
    return this.promotionPolicy;
  }

  public updatePromotionPolicy(policy: Partial<PromotionPolicySettings>) {
    this.promotionPolicy = { ...this.promotionPolicy, ...policy };
    this.logAction('Update Promotion Policy', `Updated NEP credit progression policy (${this.promotionPolicy.minCreditsPercentRequired}%)`);
    this.persist();
  }
}

export const dbService = new DatabaseService();
