import { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

interface AndroidStatusBarProps {
  isDarkMode?: boolean;
}

export function AndroidStatusBar({ isDarkMode = false }: AndroidStatusBarProps) {
  const [time, setTime] = useState('10:45');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      setTime(`${hours % 12 || 12}:${minutes.toString().padStart(2, '0')}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      id="android-status-bar"
      className={`h-7 px-4 flex items-center justify-between text-xs font-medium select-none z-40 transition-colors ${
        isDarkMode
          ? 'bg-slate-900 text-slate-300'
          : 'bg-white text-slate-700 border-b border-slate-100'
      }`}
    >
      <div className="flex items-center gap-1.5 font-semibold text-[11px] tracking-wide">
        <span>{time}</span>
      </div>

      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
        <Signal className="w-3.5 h-3.5 stroke-[2.2]" />
        <Wifi className="w-3.5 h-3.5 stroke-[2.2]" />
        <div className="flex items-center gap-1">
          <span className="text-[10px] font-semibold">94%</span>
          <BatteryMedium className="w-4 h-4 stroke-[2.2]" />
        </div>
      </div>
    </div>
  );
}
