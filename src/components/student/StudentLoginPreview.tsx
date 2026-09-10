import { useState, type FormEvent } from 'react';
import { User, Lock, KeyRound, ShieldAlert, ArrowRight, HelpCircle, CheckCircle2 } from 'lucide-react';
import { CollegeLogo } from '../common/CollegeLogo';
import { Language } from '../../types';
import { getTranslation } from '../../locales/strings';

interface StudentLoginPreviewProps {
  language: Language;
}

export function StudentLoginPreview({ language }: StudentLoginPreviewProps) {
  const [enrollmentId, setEnrollmentId] = useState('');
  const [password, setPassword] = useState('');
  const [loginFeedback, setLoginFeedback] = useState<string | null>(null);

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!enrollmentId.trim() || !password.trim()) {
      setLoginFeedback('Please enter both Enrollment Number and Password.');
      return;
    }

    setLoginFeedback(
      'Phase 1 Architecture Active: Secure student authentication token pipeline will be activated in Phase 4 as per prompt roadmap.'
    );
  };

  const handleForgotPassword = () => {
    alert(
      'Student Password Recovery:\nPlease contact the Autonomous Examination Cell or Holkar College MPOnline Helpdesk with your original admission receipt.'
    );
  };

  return (
    <div id="student-login-view" className="min-h-screen pb-20 p-4 max-w-md mx-auto flex flex-col justify-center">
      {/* College Identity Header */}
      <div className="flex flex-col items-center text-center mb-6">
        <CollegeLogo size="xl" className="mb-2" />
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 mb-1">
          Autonomous Student Portal
        </span>
        <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100">
          {getTranslation(language, 'loginTitle')}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mt-0.5">
          {getTranslation(language, 'loginSubtitle')}
        </p>
      </div>

      {/* STATE A: Login Card */}
      <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-lg space-y-4">
        <form onSubmit={handleLoginSubmit} className="space-y-3.5">
          {/* Enrollment / Student ID */}
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
                value={enrollmentId}
                onChange={(e) => setEnrollmentId(e.target.value)}
                placeholder={getTranslation(language, 'enrollmentPlaceholder')}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 uppercase font-mono"
              />
            </div>
          </div>

          {/* Password */}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={getTranslation(language, 'passwordPlaceholder')}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
            >
              {getTranslation(language, 'forgotPassword')}
            </button>
          </div>

          {/* Login Feedback Banner */}
          {loginFeedback && (
            <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-[11px] text-amber-900 dark:text-amber-200 flex items-start gap-2">
              <KeyRound className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1 leading-snug">{loginFeedback}</div>
            </div>
          )}

          {/* Submit Button */}
          <button
            id="student-login-submit-btn"
            type="submit"
            className="w-full py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wide uppercase transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{getTranslation(language, 'loginButton')}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </form>

        {/* Phase 1 Roadmap Note */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-center space-y-1">
          <div className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 dark:text-slate-300">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
            <span>Phase 1 Architecture Status</span>
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
            Per user specification, student profile, academic marks, results, attendance, and timetable will be integrated in Phase 4-7 with authenticated tokens.
          </p>
        </div>
      </div>
    </div>
  );
}
