import { useState, type FormEvent } from 'react';
import {
  ShieldAlert,
  PhoneCall,
  AlertTriangle,
  FileCheck,
  Send,
  CheckCircle2,
  Lock,
  Mail,
  HelpCircle,
  Clock,
} from 'lucide-react';
import { ANTI_RAGGING_INFO } from '../../data/moreSectionsData';
import { Language, GrievanceSubmission } from '../../types';

interface GrievanceAntiRaggingViewProps {
  language: Language;
  onShowToast?: (message: string) => void;
}

export function GrievanceAntiRaggingView({ language, onShowToast }: GrievanceAntiRaggingViewProps) {
  const [activeTab, setActiveTab] = useState<'antiragging' | 'submit_grievance' | 'track_ticket'>('antiragging');

  // Grievance form fields
  const [studentName, setStudentName] = useState('');
  const [enrollmentNo, setEnrollmentNo] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState<'Academic' | 'Examination' | 'Library' | 'Infrastructure' | 'Anti-Ragging' | 'Scholarship' | 'General'>('Academic');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [isConfidential, setIsConfidential] = useState(true);

  // Submitted tickets
  const [submittedTicket, setSubmittedTicket] = useState<GrievanceSubmission | null>(null);

  // Tracking field
  const [trackTicketId, setTrackTicketId] = useState('');
  const [trackedResult, setTrackedResult] = useState<GrievanceSubmission | null>(null);
  const [trackError, setTrackError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) {
      if (onShowToast) onShowToast('Please provide both subject and description.');
      return;
    }

    const ticketNo = `GHC-GR-${Math.floor(100000 + Math.random() * 900000)}`;
    const newSubmission: GrievanceSubmission = {
      id: ticketNo,
      studentName: studentName.trim() || 'Student Scholar',
      enrollmentNo: enrollmentNo.trim().toUpperCase() || 'DS2200192',
      email: email.trim() || 'student@collegeholkar.org',
      phone: phone.trim() || '9876543210',
      category,
      subject,
      description,
      isConfidential,
      status: 'Submitted',
      submittedDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
    };

    setSubmittedTicket(newSubmission);
    if (onShowToast) {
      onShowToast(`Grievance registered under Reference #${ticketNo}`);
    }

    // Reset form
    setSubject('');
    setDescription('');
  };

  const handleTrackTicket = (e: FormEvent) => {
    e.preventDefault();
    setTrackError(null);
    const cleaned = trackTicketId.trim().toUpperCase();
    if (!cleaned) {
      setTrackError('Please enter a valid Grievance Ticket ID.');
      return;
    }

    if (submittedTicket && submittedTicket.id === cleaned) {
      setTrackedResult(submittedTicket);
    } else {
      // Return simulated active ticket
      setTrackedResult({
        id: cleaned,
        studentName: 'Candidate Scholar',
        enrollmentNo: 'DS2200192',
        email: 'scholar@collegeholkar.org',
        category: 'Examination',
        subject: 'Autonomous Examination Result Scrutiny Request',
        description: 'Application submitted for re-totaling in Computer Science paper.',
        status: 'Under Review',
        submittedDate: '12 May 2026',
        remarks: 'Assigned to Controller of Examinations. Scrutiny committee meeting scheduled for this Friday.',
      });
    }
  };

  return (
    <div className="min-h-screen pb-24 space-y-3">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-rose-700 via-rose-800 to-slate-950 text-white shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <ShieldAlert className="w-5 h-5 text-rose-300" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-rose-200">
            Zero-Tolerance & Redressal
          </span>
        </div>
        <h2 className="text-base sm:text-lg font-extrabold tracking-tight">
          {language === 'hi' ? 'एंटी-रैगिंग एवं शिकायत निवारण' : 'Anti-Ragging & Grievance Redressal'}
        </h2>
        <p className="text-xs text-rose-100 mt-0.5">
          Proctorial board compliance with Hon’ble Supreme Court & UGC Directives
        </p>
      </div>

      {/* Sub Tabs */}
      <div className="px-3 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-14 z-20">
        {[
          { id: 'antiragging', label: 'Anti-Ragging Cell' },
          { id: 'submit_grievance', label: 'File Grievance' },
          { id: 'track_ticket', label: 'Track Ticket' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-rose-600 text-white shadow-2xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-3 max-w-md mx-auto space-y-3">
        {/* ================================================================= */}
        {/* 1. ANTI-RAGGING DIRECTIVES & SQUAD                                */}
        {/* ================================================================= */}
        {activeTab === 'antiragging' && (
          <div className="space-y-3">
            {/* 24x7 Emergency Call Banner */}
            <div className="p-4 rounded-3xl bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-300 dark:border-rose-900/60 space-y-2">
              <div className="flex items-center gap-2 text-rose-800 dark:text-rose-200 font-bold text-xs">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>24x7 Anti-Ragging National Toll-Free Helpline</span>
              </div>
              <a
                href={`tel:${ANTI_RAGGING_INFO.nationalHelpline.split(' ')[0]}`}
                className="text-lg sm:text-xl font-extrabold text-rose-700 dark:text-rose-300 block font-mono hover:underline"
              >
                {ANTI_RAGGING_INFO.nationalHelpline}
              </a>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                College Proctorial Control Room: <strong>{ANTI_RAGGING_INFO.collegeHelpline}</strong>
                <br />
                Official Email: <strong>{ANTI_RAGGING_INFO.email}</strong>
              </p>
            </div>

            {/* Supreme Court Directives */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-2 text-xs">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-rose-600" />
                <span>Supreme Court & UGC Zero-Tolerance Policy</span>
              </h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                {ANTI_RAGGING_INFO.rulesSummary}
              </p>
            </div>

            {/* Anti-Ragging Squad Members */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Institutional Anti-Ragging Committee
              </h4>
              <div className="space-y-1.5 text-xs">
                {ANTI_RAGGING_INFO.squadMembers.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-between"
                  >
                    <span className="font-bold text-slate-800 dark:text-slate-200">{m.name}</span>
                    <span className="text-[10px] text-slate-400 font-semibold">{m.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* 2. SUBMIT GRIEVANCE FORM                                          */}
        {/* ================================================================= */}
        {activeTab === 'submit_grievance' && (
          <div className="space-y-3">
            {submittedTicket ? (
              <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border-2 border-emerald-400 shadow-md space-y-3 text-center animate-in fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    Grievance Registered Successfully
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Your complaint has been forwarded to the Grievance Redressal Committee.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 text-xs space-y-1 text-left">
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-[10px]">Reference Ticket No:</span>
                    <strong className="font-mono text-amber-600 dark:text-amber-400">{submittedTicket.id}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-[10px]">Category:</span>
                    <span className="font-semibold">{submittedTicket.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-[10px]">Date:</span>
                    <span>{submittedTicket.submittedDate}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSubmittedTicket(null)}
                  className="w-full py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs cursor-pointer"
                >
                  File Another Grievance
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
                <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                  Student Online Grievance Submission
                </h3>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10.5px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      Student Name
                    </label>
                    <input
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-2.5 py-1.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[10.5px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      Enrollment No.
                    </label>
                    <input
                      type="text"
                      value={enrollmentNo}
                      onChange={(e) => setEnrollmentNo(e.target.value)}
                      placeholder="e.g. DS2200192"
                      className="w-full px-2.5 py-1.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 uppercase font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10.5px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                    Grievance Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  >
                    <option value="Academic">Academic / Syllabus / Faculty</option>
                    <option value="Examination">Autonomous Examination / Marksheet</option>
                    <option value="Library">Library & Reading Room</option>
                    <option value="Infrastructure">Laboratory & Infrastructure</option>
                    <option value="Scholarship">Scholarship & Fee Dues</option>
                    <option value="Anti-Ragging">Anti-Ragging / Harassment</option>
                    <option value="General">General Administrative</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10.5px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                    Subject / Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Brief description of grievance"
                    className="w-full px-2.5 py-1.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>

                <div>
                  <label className="block text-[10.5px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                    Detailed Explanation *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide specific dates, room numbers, or relevant details..."
                    className="w-full px-2.5 py-1.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    id="confidential-checkbox"
                    type="checkbox"
                    checked={isConfidential}
                    onChange={(e) => setIsConfidential(e.target.checked)}
                    className="w-3.5 h-3.5 rounded text-rose-600 focus:ring-rose-500"
                  />
                  <label htmlFor="confidential-checkbox" className="text-[10.5px] text-slate-600 dark:text-slate-400">
                    Keep identity confidential from departmental faculty
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Grievance to Committee</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* 3. TRACK TICKET STATUS                                            */}
        {/* ================================================================= */}
        {activeTab === 'track_ticket' && (
          <div className="space-y-3">
            <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Track Existing Grievance Ticket
              </h3>

              <form onSubmit={handleTrackTicket} className="flex gap-2">
                <input
                  type="text"
                  value={trackTicketId}
                  onChange={(e) => setTrackTicketId(e.target.value)}
                  placeholder="e.g. GHC-GR-829412"
                  className="flex-1 px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs cursor-pointer"
                >
                  Track
                </button>
              </form>

              {trackError && <p className="text-[11px] text-rose-500">{trackError}</p>}

              {trackedResult && (
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-2 text-xs animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                      {trackedResult.id}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                      {trackedResult.status}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 dark:text-slate-100">
                    {trackedResult.subject}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {trackedResult.description}
                  </p>

                  {trackedResult.remarks && (
                    <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-[10.5px] text-amber-900 dark:text-amber-200">
                      <strong>Committee Remarks:</strong> {trackedResult.remarks}
                    </div>
                  )}

                  <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-700 flex justify-between">
                    <span>Category: {trackedResult.category}</span>
                    <span>Logged: {trackedResult.submittedDate}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
