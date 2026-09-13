import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <aside
      aria-label="Network status"
      className="fixed bottom-16 sm:bottom-6 left-4 right-4 sm:left-6 sm:right-auto z-50 flex items-center gap-2.5 rounded-xl bg-amber-600/95 text-white px-4 py-2.5 text-xs font-semibold shadow-2xl backdrop-blur-md border border-amber-400/40 animate-bounce"
    >
      <div className="w-2 h-2 rounded-full bg-white animate-ping" />
      <WifiOff className="w-4 h-4 text-amber-200" />
      <span>Offline Mode — Cached college data is active.</span>
    </aside>
  );
};
