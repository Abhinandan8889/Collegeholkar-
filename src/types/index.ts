export type TabType = 'home' | 'academics' | 'notices' | 'student' | 'more';

export type Language = 'en' | 'hi';

export interface NoticeItem {
  id: string;
  title: string;
  titleHi?: string;
  date: string;
  category: 'Examination' | 'Admission' | 'Academic' | 'Student' | 'General';
  isImportant?: boolean;
  isNew?: boolean;
  description: string;
  descriptionHi?: string;
  fileUrl?: string;
  fileSize?: string;
  referenceNo?: string;
}

export interface DepartmentItem {
  id: string;
  name: string;
  nameHi?: string;
  code: string;
  category: 'Physical Sciences' | 'Chemical Sciences' | 'Life Sciences' | 'Mathematical & Computational' | 'Interdisciplinary';
  description: string;
  descriptionHi?: string;
  headOfDepartment?: string;
  established?: number;
  coursesOffered: string[];
  labsCount: number;
  facultyCount: number;
  email: string;
  iconName: string;
}

export interface CollegeEventItem {
  id: string;
  title: string;
  titleHi?: string;
  date: string;
  time?: string;
  venue: string;
  category: 'Upcoming' | 'Latest';
  description: string;
  imageUrl: string;
}

export interface QuickLinkItem {
  id: string;
  title: string;
  titleHi: string;
  icon: string;
  badge?: string;
  targetTab?: TabType;
  actionType?: 'navigate' | 'external' | 'modal';
  externalUrl?: string;
}

export interface ImportantLinkItem {
  id: string;
  title: string;
  titleHi: string;
  category: 'Portals' | 'Academic Resources' | 'Student Services' | 'Regulatory';
  url: string;
  description: string;
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  timestamp: string;
  type: 'notice' | 'exam' | 'admission' | 'general';
  isRead: boolean;
  actionNoticeId?: string;
}

export interface StudentGradeRecord {
  courseCode: string;
  courseTitle: string;
  courseCategory: 'Major' | 'Minor' | 'Generic Elective' | 'SEC' | 'AEC' | 'VAC' | 'Practical';
  credits: number;
  maxMarks: number;
  internalMarks: number; // CCE
  externalMarks: number; // End-Sem
  totalMarks: number;
  grade: 'O' | 'A+' | 'A' | 'B+' | 'B' | 'C' | 'P' | 'F';
  gradePoints: number;
  status: 'Pass' | 'Promoted' | 'Re-appear';
}

export interface StudentAttendanceItem {
  subjectCode: string;
  subjectName: string;
  attended: number;
  total: number;
  percentage: number;
  isLab?: boolean;
}

export interface StudentTimetableEntry {
  periodNo: number;
  timeSlot: string;
  subject: string;
  courseCode: string;
  facultyName: string;
  roomNo: string;
  type: 'Theory' | 'Practical' | 'Tutorial';
}

export interface StudentFeeReceipt {
  receiptNo: string;
  transactionId: string;
  date: string;
  feeType: string;
  semester: string;
  amount: number;
  status: 'Paid' | 'Pending';
  paymentMode: 'MPOnline' | 'Net Banking' | 'UPI';
}

export interface StudentProfile {
  enrollmentNo: string;
  rollNo: string;
  abcId: string; // APAAR / Academic Bank of Credits
  fullName: string;
  fullNameHi?: string;
  fatherName: string;
  motherName: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  category: 'General' | 'OBC' | 'SC' | 'ST' | 'EWS';
  bloodGroup: string;
  email: string;
  mobile: string;
  address: string;
  emergencyContact: string;
  photoUrl: string;
  programme: string; // e.g. B.Sc. (Honours with Research) Computer Science
  programmeType: 'UG' | 'PG' | 'Ph.D.';
  currentSemester: number;
  academicYear: string;
  admissionYear: number;
  majorSubject: string;
  minorSubject: string;
  mentorName: string;
  mentorContact: string;
  cgpa: number;
  sgpa: number;
  totalCreditsEarned: number;
  totalCreditsRequired: number;
  attendanceOverall: number;
  grades: StudentGradeRecord[];
  attendance: StudentAttendanceItem[];
  timetable: Record<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday', StudentTimetableEntry[]>;
  feeReceipts: StudentFeeReceipt[];
}

export interface SyllabusItem {
  id: string;
  code: string;
  title: string;
  titleHi?: string;
  department: string;
  degree: 'B.Sc.' | 'BCA' | 'M.Sc.' | 'Ph.D.';
  nepType: 'Major' | 'Minor' | 'Generic Elective' | 'SEC' | 'AEC' | 'VAC';
  semester: string;
  credits: number;
  fileSize: string;
  units: { unitNo: number; title: string; topics: string[] }[];
}

export interface QuestionPaperItem {
  id: string;
  title: string;
  subject: string;
  department: string;
  code: string;
  semester: string;
  session: string; // e.g. "Dec 2025", "May 2025"
  degree: 'B.Sc.' | 'BCA' | 'M.Sc.';
  fileSize: string;
}

export interface AcademicCalendarItem {
  id: string;
  dateRange: string;
  title: string;
  titleHi?: string;
  category: 'Examination' | 'CCE' | 'Admissions' | 'Holiday' | 'Activity';
  status: 'Completed' | 'Ongoing' | 'Upcoming';
  description?: string;
}

export interface BookCatalogItem {
  id: string;
  title: string;
  author: string;
  accessionNo: string;
  isbn: string;
  subject: string;
  publisher: string;
  edition: string;
  shelfLocation: string;
  isAvailable: boolean;
}

export interface GrievanceSubmission {
  tokenNo?: string;
  id?: string;
  date?: string;
  submittedDate?: string;
  category: 'Examination' | 'Scholarship' | 'Admission' | 'Library' | 'Hostel' | 'Anti-Ragging' | 'Academic' | 'Infrastructure' | 'General' | 'Other';
  subject: string;
  description: string;
  status: 'Submitted' | 'Under Review' | 'Resolved';
  studentName?: string;
  enrollmentNo?: string;
  email?: string;
  phone?: string;
  isConfidential?: boolean;
  remarks?: string;
}
