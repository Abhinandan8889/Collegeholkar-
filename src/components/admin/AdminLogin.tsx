import React, { useState, FormEvent } from 'react';
import { ShieldCheck, Lock, User, ArrowRight, Building2, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { CollegeLogo } from '../common/CollegeLogo';
import { COLLEGE_INFO } from '../../data/collegeData';
import { useDatabase } from '../../context/DatabaseContext';

interface AdminLoginProps {
  onLoginSuccess?: (adminData: { username: string; role: string; token: string }) => void;
  onReturnToApp?: () => void;
  onBackToApp?: () => void;
}

export function AdminLogin({ onLoginSuccess, onReturnToApp, onBackToApp }: AdminLoginProps) {
  const { adminLogin } = useDatabase();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleReturn = onBackToApp || onReturnToApp;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      const ok = adminLogin(username, password);
      setIsLoading(false);
      if (ok) {
        if (onLoginSuccess) {
          onLoginSuccess({
            username: username.trim(),
            role: 'Super Administrator',
            token: 'HOLKAR-AUTH-' + Date.now().toString(36),
          });
        }
      } else {
        setError('Invalid Administrative Credentials. Try username: "admin", password: "admin"');
      }
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between select-none relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-600 rounded-full blur-3xl" />
      </div>

      {/* Top Header */}
      <header className="relative z-10 px-6 py-4 flex items-center justify-between border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <CollegeLogo className="w-10 h-10 object-contain drop-shadow" />
          <div>
            <h1 className="text-sm font-semibold text-white tracking-wide">
              {COLLEGE_INFO.nameEn}
            </h1>
            <p className="text-xs text-amber-400 font-medium">
              Autonomous Governance & Central Database Administration Portal
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReturn}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Student App</span>
        </button>
      </header>

      {/* Main Login Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-sky-500 text-white shadow-lg shadow-indigo-500/30 mb-3">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-white">Administrator Sign In</h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
              Secure access for Academic Heads, Exam Controllers, and Database Managers
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-950/80 border border-rose-800/60 text-xs text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Admin Username / Staff ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="e.g. admin"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Admin Secret Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-0"
                />
                <span>Keep session active</span>
              </label>
              <span className="text-slate-500">Autonomous Server v2.4</span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white font-medium text-sm rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Authenticate & Enter Console</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Institutional Compliance Notice */}
          <div className="mt-6 pt-5 border-t border-slate-700/60 text-center">
            <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-slate-500" />
              <span>Government Holkar Autonomous Science College • Estd 1891</span>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-3 border-t border-slate-800 bg-slate-900/90 text-center text-xs text-slate-400">
        All actions inside the Autonomous Administration Portal are cryptographically audited and recorded in the college server logs.
      </footer>
    </div>
  );
}
