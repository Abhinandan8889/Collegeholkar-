import React, { useState } from 'react';
import {
  X,
  Download,
  Smartphone,
  CheckCircle2,
  ExternalLink,
  Code2,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Globe,
  Terminal,
  Copy,
  Check,
} from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';

interface AndroidApkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast?: (message: string) => void;
}

export const AndroidApkModal: React.FC<AndroidApkModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const { isInstallable, isInstalled, isAndroid, install } = usePWAInstall();
  const [activeTab, setActiveTab] = useState<'direct' | 'project' | 'cloud'>('direct');
  const [copiedCmd, setCopiedCmd] = useState(false);

  if (!isOpen) return null;

  const handleDirectInstall = async () => {
    if (isInstallable) {
      const accepted = await install();
      if (accepted) {
        onShowToast?.('Android App installation started!');
        onClose();
      }
    } else {
      onShowToast?.('Open browser menu (⋮) and tap "Install app" or "Add to Home screen"');
    }
  };

  const handleCopyCmd = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedCmd(true);
    onShowToast?.('Command copied to clipboard');
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  const appUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ais-pre-jxczystaj5ozsrbfuxnmai-47882201451.asia-southeast1.run.app';

  return (
    <div
      id="android-apk-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        id="android-apk-modal-content"
        className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="relative px-6 py-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white font-bold">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">Android App & APK Distribution Hub</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Ready
                </span>
              </div>
              <p className="text-xs text-slate-400">Govt. Holkar Science College Indore • Version 1.0.0</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/50 p-1.5 gap-1.5 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('direct')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg transition-all ${
              activeTab === 'direct'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>1-Tap Install (WebAPK)</span>
          </button>
          <button
            onClick={() => setActiveTab('project')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg transition-all ${
              activeTab === 'project'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Android Studio Project (.ZIP)</span>
          </button>
          <button
            onClick={() => setActiveTab('cloud')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg transition-all ${
              activeTab === 'cloud'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>PWABuilder Cloud APK</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-slate-300 text-xs">
          {/* TAB 1: Direct 1-Tap WebAPK Installation */}
          {activeTab === 'direct' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-semibold text-white text-sm">Official Android WebAPK Minting</h4>
                  <p className="text-slate-300 leading-relaxed">
                    Android devices with Google Chrome automatically mint and install a genuine Android APK (`.apk`) directly to your app launcher and home screen.
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="font-semibold text-white">How to install on your Android device:</div>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
                    <span className="w-6 h-6 rounded-full bg-slate-700 text-white font-bold flex items-center justify-center text-xs">1</span>
                    <span>Open this app URL in <strong>Google Chrome</strong> or <strong>Edge</strong> on your Android phone.</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
                    <span className="w-6 h-6 rounded-full bg-slate-700 text-white font-bold flex items-center justify-center text-xs">2</span>
                    <span>Click the <strong>Install Android App</strong> button below or tap the Chrome browser menu (<strong>⋮</strong>).</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
                    <span className="w-6 h-6 rounded-full bg-slate-700 text-white font-bold flex items-center justify-center text-xs">3</span>
                    <span>Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>. Android will download and install the app!</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  id="direct-install-action-btn"
                  onClick={handleDirectInstall}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.01] cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{isInstallable ? 'Install Android App Now' : 'Trigger Installation Prompt'}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: Android Studio Project Package */}
          {activeTab === 'project' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white text-sm">Full Android Studio Gradle Project</span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-700 text-slate-300 font-mono">214 KB</span>
                </div>
                <p className="text-slate-300 text-xs">
                  Bundled with official Gradle 8.2 Wrapper, JDK 17 setup, Target SDK 34, AndroidManifest.xml, icons, and automated 1-click Windows build script.
                </p>
                <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-slate-400">
                  <div>Package: <span className="font-mono text-slate-200">in.edu.holkar.science</span></div>
                  <div>Target SDK: <span className="font-mono text-slate-200">34 (Android 14)</span></div>
                  <div>Min SDK: <span className="font-mono text-slate-200">24 (Android 7.0)</span></div>
                  <div>Build Type: <span className="font-mono text-emerald-400">assembleDebug</span></div>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="font-semibold text-white">How to build app-debug.apk:</div>
                <div className="p-3 rounded-lg bg-black/60 border border-slate-800 space-y-2">
                  <div className="text-xs text-slate-300">
                    <strong className="text-amber-400">Method 1 (Easiest for Windows):</strong> Extract the zip, then double-click <code className="text-emerald-400">build-apk.bat</code>.
                  </div>
                  <div className="text-xs text-slate-300">
                    <strong className="text-sky-400">Method 2 (PowerShell):</strong>
                  </div>
                  <div className="font-mono text-[11px] text-emerald-400 flex items-center justify-between">
                    <span>.\gradlew assembleDebug</span>
                    <button
                      onClick={() => handleCopyCmd('.\\gradlew assembleDebug')}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      {copiedCmd ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Output location: <code className="text-indigo-300">app/build/outputs/apk/debug/app-debug.apk</code>
                </p>
              </div>

              <div className="pt-2">
                <a
                  href="/downloads/Holkar-Science-Android-Studio-Project.zip"
                  download="Holkar-Science-Android-Studio-Project.zip"
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Android Studio Project (.ZIP)</span>
                </a>
              </div>
            </div>
          )}

          {/* TAB 3: PWABuilder Cloud APK */}
          {activeTab === 'cloud' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 space-y-2">
                <div className="font-semibold text-white text-sm">Instant Cloud APK via PWABuilder / Bubblewrap</div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  PWABuilder (maintained by Microsoft and Google Chromium teams) allows you to enter this app’s URL and instantly download a signed debug or release APK without installing Android Studio or Java on your computer.
                </p>
              </div>

              <div className="space-y-2">
                <div className="font-semibold text-white">App Manifest Status:</div>
                <div className="space-y-1 text-[11px]">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Web App Manifest configured with high-res 192px & 512px icons</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Maskable safe-zone icon for Android circular & squircle launchers</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Service Worker active with offline cache and standalone mode</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`https://www.pwabuilder.com?url=${encodeURIComponent(appUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-lg shadow-sky-600/30 transition-all cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open in PWABuilder to Generate APK</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-slate-400 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>PWA & Android Standards v2.0 Active</span>
          </div>
          <button
            onClick={onClose}
            className="px-3.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
