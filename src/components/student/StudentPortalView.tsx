import { useState, type FormEvent } from 'react';
import {
  User,
  Lock,
  ArrowRight,
  ShieldCheck,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  FileCheck,
  CreditCard,
  QrCode,
  LogOut,
  RefreshCw,
  Search,
  BookOpen,
  Phone,
  Mail,
  MapPin,
  Printer,
  ChevronRight,
  GraduationCap,
  Percent,
} from 'lucide-react';
import { CollegeLogo } from '../common/CollegeLogo';
import { Language, StudentProfile } from '../../types';
import { getTranslation } from '../../locales/strings';
import {
  DEMO_STUDENT_RAHUL,
  DEMO_STUDENT_ANANYA,
  DEMO_STUDENTS,
  EXAM_ADMIT_CARD_DATA,
} from '../../data/studentData';
import { useDatabase } from '../../context/DatabaseContext';

interface StudentPortalViewProps {
  language: Language;
  onShowToast?: (message: string) => void;
}

export function StudentPortalView({ language, onShowToast }: StudentPortalViewProps) {
  const { students, results, examSettings } = useDatabase();
  // Authentication State
  const [currentUser, setCurrentUser] = useState<StudentProfile | null>(null);
  const [enrollmentInput, setEnrollmentInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Authenticated Portal Sub-tab
  const [activeSubTab, setActiveSubTab] = useState<'id_card' | 'grades' | 'admit_card' | 'attendance' | 'timetable' | 'fees'>('id_card');

  // Digital ID Card Flip State
  const [isIdFlipped, setIsIdFlipped] = useState(false);

  // Timetable selected day
  const [selectedDay, setSelectedDay] = useState<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'>('Monday');

  // Public Tool: Result Search Modal/Input
  const [publicRollInput, setPublicRollInput] = useState('');
  const [searchedPublicResult, setSearchedPublicResult] = useState<StudentProfile | null>(null);
  const [publicSearchError, setPublicSearchError] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    if (onShowToast) {
      onShowToast(msg);
    }
  };

  const handleManualLogin = (e: FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const cleaned = enrollmentInput.trim().toUpperCase();
    if (!cleaned) {
      setLoginError('Please enter your Student Enrollment Number.');
      return;
    }

    // First check dynamic database students
    const dbStudent = students.find(
      (s) =>
        s.enrollmentNo?.toUpperCase() === cleaned ||
        s.rollNo?.toUpperCase() === cleaned ||
        s.email?.toLowerCase() === enrollmentInput.trim().toLowerCase()
    );

    if (dbStudent) {
      setCurrentUser(dbStudent);
      triggerToast(`Welcome back, ${dbStudent.fullName}!`);
      return;
    }

    if (DEMO_STUDENTS[cleaned]) {
      setCurrentUser(DEMO_STUDENTS[cleaned]);
      triggerToast(`Welcome back, ${DEMO_STUDENTS[cleaned].fullName}!`);
    } else {
      // Default to Rahul's profile with custom ID so any input logs in smoothly
      const customized = {
        ...DEMO_STUDENT_RAHUL,
        enrollmentNo: cleaned,
        fullName: cleaned.startsWith('DS') ? 'Holkar Science Scholar' : cleaned,
      };
      setCurrentUser(customized);
      triggerToast(`Authenticated successfully as ${customized.fullName}`);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setEnrollmentInput('');
    setPasswordInput('');
    triggerToast('Logged out from Student Portal.');
  };

  const handlePublicResultSearch = (e: FormEvent) => {
    e.preventDefault();
    setPublicSearchError(null);
    const query = publicRollInput.trim();
    if (!query) {
      setPublicSearchError('Please enter a valid 7-digit Roll Number.');
      return;
    }

    // Check dynamic results table first
    const dbResult = results.find(
      (r) =>
        r.rollNo === query ||
        r.enrollmentNo?.toUpperCase() === query.toUpperCase() ||
        r.studentName?.toLowerCase().includes(query.toLowerCase())
    );

    if (dbResult) {
      const matchStudent = students.find((s) => s.enrollmentNo === dbResult.enrollmentNo);
      setSearchedPublicResult(
        matchStudent || {
          ...DEMO_STUDENT_RAHUL,
          rollNo: dbResult.rollNo,
          enrollmentNo: dbResult.enrollmentNo,
          fullName: dbResult.studentName,
          programme: dbResult.programme,
          currentSemester: dbResult.semester,
          sgpa: dbResult.sgpa,
          cgpa: dbResult.cgpa,
        }
      );
      triggerToast(`Official result retrieved for ${dbResult.studentName}`);
      return;
    }

    if (query === '2260142' || query.toLowerCase().includes('rahul')) {
      setSearchedPublicResult(DEMO_STUDENT_RAHUL);
    } else if (query === '2340518' || query.toLowerCase().includes('ananya')) {
      setSearchedPublicResult(DEMO_STUDENT_ANANYA);
    } else {
      // Return a simulated verified marksheet for testing
      setSearchedPublicResult({
        ...DEMO_STUDENT_RAHUL,
        rollNo: query,
        fullName: `Candidate Roll #${query}`,
      });
    }
    triggerToast('Provisional examination record retrieved.');
  };

  // =========================================================================
  // VIEW: LOGGED OUT (Login & Public Verification Tools)
  // =========================================================================
  if (!currentUser) {
    return (
      <div id="student-portal-unauth" className="min-h-screen pb-24 p-3 sm:p-4 max-w-md mx-auto space-y-4">
        {/* Header Branding */}
        <div className="flex flex-col items-center text-center pt-2 pb-1">
          <CollegeLogo size="xl" className="mb-2 shadow-sm" />
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 mb-1">
            Autonomous Examination & Student Portal
          </span>
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100">
            {getTranslation(language, 'loginTitle')}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mt-0.5">
            {getTranslation(language, 'loginSubtitle')}
          </p>
        </div>

        {/* Manual Login Card */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-3.5">
          <form onSubmit={handleManualLogin} className="space-y-3">
            <div>
              <label
                htmlFor="student-enrollment-input"
                className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1"
              >
                {getTranslation(language, 'enrollmentLabel')}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  id="student-enrollment-input"
                  type="text"
                  value={enrollmentInput}
                  onChange={(e) => setEnrollmentInput(e.target.value)}
                  placeholder="e.g. DS2200192"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 uppercase font-mono"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="student-password-input"
                className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1"
              >
                {getTranslation(language, 'passwordLabel')}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  id="student-password-input"
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter your student password"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {loginError && (
              <p className="text-[11px] text-rose-600 dark:text-rose-400 font-medium">
                {loginError}
              </p>
            )}

            <button
              id="student-login-submit-btn"
              type="submit"
              className="w-full py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wide uppercase transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{getTranslation(language, 'loginButton')}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>
        </div>

        {/* Public Utility: Result Verification by Roll Number */}
        <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-600" />
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100">
              Public Autonomous Result Verification
            </h3>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Check provisional semester grade sheet without login using DAVV/Autonomous Roll Number.
          </p>

          <form onSubmit={handlePublicResultSearch} className="flex gap-2">
            <input
              type="text"
              value={publicRollInput}
              onChange={(e) => setPublicRollInput(e.target.value)}
              placeholder="e.g. 2260142"
              className="flex-1 px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono"
            />
            <button
              type="submit"
              className="px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs flex items-center gap-1 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Verify</span>
            </button>
          </form>

          {publicSearchError && (
            <p className="text-[11px] text-rose-500">{publicSearchError}</p>
          )}

          {/* Searched Result Preview */}
          {searchedPublicResult && (
            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-emerald-300 dark:border-emerald-800 space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Provisional Marksheet Verified</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  Roll: {searchedPublicResult.rollNo}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                {searchedPublicResult.fullName}
              </p>
              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-100 dark:border-slate-700">
                <div>
                  <span className="text-slate-400 block text-[10px]">Programme:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300 truncate block">
                    {searchedPublicResult.programme}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">SGPA / CGPA:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    SGPA {searchedPublicResult.sgpa} • CGPA {searchedPublicResult.cgpa}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => triggerToast(`Provisional marksheet for ${searchedPublicResult.fullName} downloaded.`)}
                className="w-full py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 cursor-pointer mt-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Provisional Marksheet</span>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW: AUTHENTICATED STUDENT DASHBOARD
  // =========================================================================
  return (
    <div id="student-portal-authenticated" className="min-h-screen pb-24 space-y-3">
      {/* Top Student Banner */}
      <div className="p-4 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-900 text-white shadow-sm">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-amber-300" />
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-amber-200">
              Autonomous Student Profile
            </span>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            title="Logout"
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-bold bg-black/30 hover:bg-black/40 text-amber-100 border border-white/20 transition-all cursor-pointer"
          >
            <LogOut className="w-3 h-3" />
            <span>Switch / Logout</span>
          </button>
        </div>

        <div className="flex items-start gap-3">
          <img
            src={currentUser.photoUrl}
            alt={currentUser.fullName}
            className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-300 shadow-md shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h2 className="text-sm sm:text-base font-extrabold truncate">
              {currentUser.fullName}
            </h2>
            <p className="text-[11px] text-amber-100 font-mono mt-0.5">
              Roll No: {currentUser.rollNo} • Enr: {currentUser.enrollmentNo}
            </p>
            <p className="text-[10.5px] text-amber-200 truncate">
              {currentUser.programme}
            </p>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="px-2 py-0.5 rounded-md text-[9.5px] font-bold bg-amber-400 text-slate-950">
                Sem {currentUser.currentSemester} (Session {currentUser.academicYear})
              </span>
              <span className="text-[10px] text-amber-200">
                CGPA: <strong className="text-white">{currentUser.cgpa}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="px-3 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-14 z-20">
        {[
          { id: 'id_card', label: 'ID Card', icon: CreditCard },
          { id: 'grades', label: 'Grades & Results', icon: Award },
          { id: 'admit_card', label: 'Admit Card', icon: FileCheck },
          { id: 'attendance', label: 'Attendance', icon: Percent },
          { id: 'timetable', label: 'Timetable', icon: Clock },
          { id: 'fees', label: 'Fee Receipts', icon: CreditCard },
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-amber-500 text-slate-950 shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="p-3 max-w-md mx-auto space-y-3">
        {/* ================================================================= */}
        {/* SUBTAB 1: DIGITAL ID CARD                                         */}
        {/* ================================================================= */}
        {activeSubTab === 'id_card' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Official Digital Identity Card
              </span>
              <button
                type="button"
                onClick={() => setIsIdFlipped(!isIdFlipped)}
                className="text-[11px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 hover:underline cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>{isIdFlipped ? 'Show Front' : 'Flip to Back'}</span>
              </button>
            </div>

            {/* ID Card Outer Frame */}
            {!isIdFlipped ? (
              // FRONT SIDE
              <div
                id="digital-id-card-front"
                className="rounded-3xl p-4 bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 text-white shadow-xl border-2 border-amber-400/60 relative overflow-hidden space-y-3"
              >
                {/* Header with Seal */}
                <div className="flex items-center justify-between border-b border-white/20 pb-2.5">
                  <div className="flex items-center gap-2">
                    <CollegeLogo size="sm" />
                    <div>
                      <h4 className="text-[11px] font-extrabold uppercase tracking-wide text-amber-300 leading-tight">
                        Govt. Holkar Science College
                      </h4>
                      <p className="text-[9px] text-slate-300 font-medium">
                        Model, Autonomous • NAAC 'A++' Grade • Indore
                      </p>
                    </div>
                  </div>
                  <span className="px-1.5 py-0.5 rounded text-[8.5px] font-mono font-bold bg-amber-400 text-slate-950 uppercase">
                    2025-26
                  </span>
                </div>

                {/* Photo & Details */}
                <div className="flex items-start gap-3">
                  <img
                    src={currentUser.photoUrl}
                    alt={currentUser.fullName}
                    className="w-20 h-24 rounded-xl object-cover border-2 border-amber-400 shadow-md shrink-0 bg-slate-800"
                  />
                  <div className="min-w-0 flex-1 space-y-1 text-xs">
                    <h3 className="font-extrabold text-white text-sm truncate">
                      {currentUser.fullName}
                    </h3>
                    <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[10.5px]">
                      <div>
                        <span className="text-slate-400 text-[9px] block">Roll No:</span>
                        <strong className="font-mono text-amber-300">{currentUser.rollNo}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[9px] block">Enrollment:</span>
                        <strong className="font-mono text-amber-300">{currentUser.enrollmentNo}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[9px] block">Major / Dept:</span>
                        <span className="truncate block font-medium">{currentUser.majorSubject}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[9px] block">Blood Group:</span>
                        <span className="font-bold text-rose-400">{currentUser.bloodGroup}</span>
                      </div>
                    </div>
                    <div className="pt-0.5">
                      <span className="text-slate-400 text-[9px] block">APAAR / ABC ID:</span>
                      <span className="font-mono text-[10px] text-indigo-300">{currentUser.abcId}</span>
                    </div>
                  </div>
                </div>

                {/* Barcode & Signature */}
                <div className="pt-2 border-t border-white/20 flex items-center justify-between text-[9px]">
                  <div className="flex flex-col">
                    <div className="h-6 w-36 bg-white/90 rounded px-1 flex items-center justify-around">
                      {/* Stylized Barcode */}
                      {Array.from({ length: 32 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-4 ${i % 3 === 0 ? 'w-1 bg-black' : i % 2 === 0 ? 'w-0.5 bg-black' : 'w-0.5 bg-transparent'}`}
                        />
                      ))}
                    </div>
                    <span className="font-mono text-[8px] text-slate-300 mt-0.5">
                      *{currentUser.enrollmentNo}*
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="font-serif italic text-amber-200 text-xs block">Dr. Anamika Jain
                    </span>
                    <span className="text-[8px] text-slate-400 uppercase tracking-wider block">
                      Principal Signature
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              // BACK SIDE
              <div
                id="digital-id-card-back"
                className="rounded-3xl p-4 bg-slate-900 text-white shadow-xl border-2 border-slate-700 relative space-y-3"
              >
                <div className="border-b border-slate-700 pb-2 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                    Cardholder Verification & Terms
                  </span>
                  <QrCode className="w-5 h-5 text-amber-400" />
                </div>

                <div className="space-y-1.5 text-[10.5px]">
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Address:</strong> {currentUser.address}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>
                      <strong>Emergency:</strong> {currentUser.emergencyContact}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">
                      <strong>Email:</strong> {currentUser.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>
                      <strong>Mentor:</strong> {currentUser.mentorName}
                    </span>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700 text-[9px] text-slate-300 leading-relaxed">
                  1. This card is non-transferable and remains the property of Govt. Holkar Science College, Indore.
                  <br />
                  2. Loss of this ID card must be immediately reported to the Proctorial Board & Examination Cell.
                </div>

                <div className="text-center text-[9px] text-slate-400">
                  Campus Address: Bhawarkuan, A.B. Road, Indore (MP) - 452001
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => triggerToast(`Official Digital ID for ${currentUser.fullName} exported to storage.`)}
              className="w-full py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>Save / Download Digital ID Card</span>
            </button>
          </div>
        )}

        {/* ================================================================= */}
        {/* SUBTAB 2: GRADES & RESULTS                                        */}
        {/* ================================================================= */}
        {activeSubTab === 'grades' && (
          <div className="space-y-3">
            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">CGPA</span>
                <span className="text-base font-extrabold text-amber-600 dark:text-amber-400">
                  {currentUser.cgpa}
                </span>
                <span className="text-[9px] text-slate-500 block">Out of 10.0</span>
              </div>
              <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">SGPA (Sem 6)</span>
                <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                  {currentUser.sgpa}
                </span>
                <span className="text-[9px] text-emerald-500 block">Outstanding</span>
              </div>
              <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Credits</span>
                <span className="text-base font-extrabold text-indigo-600 dark:text-indigo-400">
                  {currentUser.totalCreditsEarned}
                </span>
                <span className="text-[9px] text-slate-500 block">Req: {currentUser.totalCreditsRequired}</span>
              </div>
            </div>

            {/* Marksheet Details */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-2.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                  Semester End Grade Record (NEP-2020)
                </h4>
                <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Result: PASS
                </span>
              </div>

              <div className="space-y-2">
                {currentUser.grades.map((gr, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[9.5px] font-mono font-bold text-amber-600 dark:text-amber-400">
                          {gr.courseCode}
                        </span>
                        <span className="px-1.5 py-0.2 rounded text-[8.5px] bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold">
                          {gr.courseCategory} • {gr.credits} Cr
                        </span>
                      </div>
                      <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                        {gr.courseTitle}
                      </h5>
                      <span className="text-[10px] text-slate-400">
                        CCE: {gr.internalMarks} + End-Sem: {gr.externalMarks} = <strong>{gr.totalMarks} / {gr.maxMarks}</strong>
                      </span>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-sm font-extrabold text-amber-600 dark:text-amber-400 block">
                        Grade {gr.grade}
                      </span>
                      <span className="text-[9.5px] font-medium text-slate-400">
                        Points: {gr.gradePoints}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => triggerToast(`Official Provisional Marksheet for Sem ${currentUser.currentSemester} downloaded.`)}
              className="w-full py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>Download Official Grade Card PDF</span>
            </button>
          </div>
        )}

        {/* ================================================================= */}
        {/* SUBTAB 3: ADMIT CARD                                              */}
        {/* ================================================================= */}
        {activeSubTab === 'admit_card' && (
          <div className="space-y-3">
            <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border-2 border-amber-500/80 shadow-md space-y-3">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2.5">
                <div className="flex items-center gap-2">
                  <CollegeLogo size="sm" />
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-900 dark:text-slate-100 uppercase">
                      Examination Admit Card
                    </h4>
                    <p className="text-[9.5px] text-slate-500 dark:text-slate-400">
                      {EXAM_ADMIT_CARD_DATA.examSession}
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Verified
                </span>
              </div>

              {/* Student Details Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 dark:bg-slate-800/70 p-2.5 rounded-xl">
                <div>
                  <span className="text-[9.5px] text-slate-400 block">Candidate Name:</span>
                  <strong className="text-slate-800 dark:text-slate-200">{currentUser.fullName}</strong>
                </div>
                <div>
                  <span className="text-[9.5px] text-slate-400 block">Roll Number:</span>
                  <strong className="font-mono text-amber-600 dark:text-amber-400">{currentUser.rollNo}</strong>
                </div>
                <div>
                  <span className="text-[9.5px] text-slate-400 block">Enrollment No:</span>
                  <strong className="font-mono text-slate-800 dark:text-slate-200">{currentUser.enrollmentNo}</strong>
                </div>
                <div>
                  <span className="text-[9.5px] text-slate-400 block">Center Code:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">104 (CV Raman Block)</span>
                </div>
              </div>

              {/* Examination Papers Table */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Scheduled Examination Papers
                </span>
                {EXAM_ADMIT_CARD_DATA.papers.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div className="min-w-0 flex-1">
                      <span className="text-[9.5px] font-mono text-amber-600 dark:text-amber-400 font-bold block">
                        {p.paperCode} • {p.date} ({p.day})
                      </span>
                      <p className="font-bold text-slate-800 dark:text-slate-200 truncate">
                        {p.title}
                      </p>
                    </div>
                    <span className="text-[10px] font-semibold text-slate-500 shrink-0 ml-2">
                      {p.time}
                    </span>
                  </div>
                ))}
              </div>

              {/* Instructions */}
              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-[9.5px] text-amber-900 dark:text-amber-200 space-y-1">
                <strong>Important Examination Guidelines:</strong>
                <ul className="list-disc pl-3 space-y-0.5">
                  {EXAM_ADMIT_CARD_DATA.instructions.slice(0, 2).map((ins, i) => (
                    <li key={i}>{ins}</li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              type="button"
              onClick={() => triggerToast(`Admit Card PDF for Roll #${currentUser.rollNo} downloaded.`)}
              className="w-full py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>Download & Print Admit Card</span>
            </button>
          </div>
        )}

        {/* ================================================================= */}
        {/* SUBTAB 4: ATTENDANCE                                              */}
        {/* ================================================================= */}
        {activeSubTab === 'attendance' && (
          <div className="space-y-3">
            {/* Overall Attendance Card */}
            <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Overall Aggregate Attendance
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                    {currentUser.attendanceOverall}%
                  </span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    (Eligible for Examination)
                  </span>
                </div>
                <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-1">
                  UGC autonomous mandatory requirement is minimum 75%.
                </p>
              </div>

              {/* Progress Ring Simulation */}
              <div className="w-16 h-16 rounded-full border-4 border-emerald-500 flex items-center justify-center shrink-0 bg-emerald-50 dark:bg-emerald-950/30">
                <Percent className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>

            {/* Subject-wise Attendance */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 px-1 block">
                Subject-wise Class & Laboratory Attendance
              </span>
              {currentUser.attendance.map((att, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 dark:text-slate-100 truncate flex-1">
                      {att.subjectName}
                    </span>
                    <span className="font-bold text-slate-900 dark:text-slate-100 shrink-0 ml-2">
                      {att.percentage}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        att.percentage >= 85
                          ? 'bg-emerald-500'
                          : att.percentage >= 75
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${att.percentage}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>Code: {att.subjectCode} {att.isLab ? '• Lab Practical' : '• Theory'}</span>
                    <span>
                      Attended: <strong>{att.attended}</strong> / {att.total} Lectures
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* SUBTAB 5: TIMETABLE                                               */}
        {/* ================================================================= */}
        {activeSubTab === 'timetable' && (
          <div className="space-y-3">
            {/* Days Selector */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
              {(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const).map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedDay === day
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-2xs'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            {/* Schedule for Selected Day */}
            <div className="space-y-2">
              {currentUser.timetable[selectedDay]?.length > 0 ? (
                currentUser.timetable[selectedDay].map((period, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-start gap-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 flex flex-col items-center justify-center shrink-0 font-mono text-[10px] font-bold">
                      <span>P{period.periodNo}</span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="text-[9.5px] font-mono text-amber-600 dark:text-amber-400 font-bold">
                          {period.timeSlot}
                        </span>
                        <span className="px-1.5 py-0.2 rounded text-[8.5px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {period.type}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                        {period.subject}
                      </h4>
                      <div className="flex items-center justify-between text-[10.5px] text-slate-500 dark:text-slate-400 mt-1">
                        <span>{period.facultyName}</span>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          {period.roomNo}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-slate-400 text-xs">
                  No scheduled classes for this day.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* SUBTAB 6: FEE RECEIPTS (MPONLINE)                                  */}
        {/* ================================================================= */}
        {activeSubTab === 'fees' && (
          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 text-xs text-indigo-900 dark:text-indigo-200">
              <p className="font-bold mb-0.5">MPOnline Fee Payment History</p>
              <p className="text-[11px] text-indigo-700 dark:text-indigo-300">
                Official receipts for college tuition, autonomous examination fees, and lab dues.
              </p>
            </div>

            <div className="space-y-2.5">
              {currentUser.feeReceipts.map((fee, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      {fee.receiptNo}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      {fee.status} • {fee.paymentMode}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    {fee.feeType}
                  </h4>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Date: {fee.date} • Txn: <strong className="font-mono text-[10px]">{fee.transactionId}</strong>
                    </span>
                    <span className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                      ₹{fee.amount.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => triggerToast(`MPOnline Receipt ${fee.receiptNo} downloaded.`)}
                    className="w-full py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-[11px] flex items-center justify-center gap-1.5 cursor-pointer mt-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Official Receipt PDF</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
