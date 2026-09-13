import React, { useState } from 'react';
import { Download, Smartphone, Check } from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  className?: string;
  onOpenApkModal?: () => void;
  compact?: boolean;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  className = '',
  onOpenApkModal,
  compact = false,
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  // If already installed and running in standalone display mode, don't show prompt
  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const outcome = await install();
      if (outcome) {
        setInstallSuccess(true);
        setTimeout(() => setInstallSuccess(false), 3000);
      }
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else if (onOpenApkModal) {
      onOpenApkModal();
    }
  };

  if (compact) {
    return (
      <>
        <button
          id="pwa-install-compact-btn"
          onClick={handleInstallClick}
          title="Install Android App"
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all hover:scale-105 active:scale-95 ${className}`}
        >
          {installSuccess ? (
            <>
              <Check className="w-3.5 h-3.5 text-white" />
              <span>Installed</span>
            </>
          ) : (
            <>
              <Smartphone className="w-3.5 h-3.5" />
              <span>Install App</span>
            </>
          )}
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
            <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-2xl text-white">
              <h3 className="text-base font-bold text-white mb-2">Install on iOS (iPhone / iPad)</h3>
              <p className="text-xs text-slate-300 leading-relaxed space-y-1 mb-4">
                1. Tap the <strong>Share</strong> button (box with upward arrow) in Safari.<br />
                2. Scroll down and tap <strong>Add to Home Screen</strong>.<br />
                3. Tap <strong>Add</strong> in the top-right corner.
              </p>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full rounded-xl bg-slate-800 hover:bg-slate-700 py-2.5 text-xs font-semibold text-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <button
        id="pwa-install-action-btn"
        onClick={handleInstallClick}
        className={`flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 px-3.5 py-2 text-xs font-bold text-white shadow-md shadow-emerald-700/20 hover:shadow-lg transition-all active:scale-98 ${className}`}
      >
        <Smartphone className="w-4 h-4" />
        <span>Install Android App</span>
      </button>

      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-2xl text-white">
            <h3 className="text-base font-bold text-white mb-2">Install on iOS (iPhone / iPad)</h3>
            <p className="text-xs text-slate-300 leading-relaxed space-y-1 mb-4">
              1. Tap the <strong>Share</strong> button in Safari toolbar.<br />
              2. Scroll down and tap <strong>Add to Home Screen</strong>.<br />
              3. Tap <strong>Add</strong> to complete installation.
            </p>
            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full rounded-xl bg-slate-800 hover:bg-slate-700 py-2.5 text-xs font-semibold text-white transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
