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
