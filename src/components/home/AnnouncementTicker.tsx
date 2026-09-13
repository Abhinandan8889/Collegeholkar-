import { useState, useEffect } from 'react';
import { Megaphone, ChevronRight } from 'lucide-react';
import { NoticeItem, Language } from '../../types';
import { useDatabase } from '../../context/DatabaseContext';

interface AnnouncementTickerProps {
  onSelectNotice: (notice: NoticeItem) => void;
  language: Language;
}

export function AnnouncementTicker({ onSelectNotice, language }: AnnouncementTickerProps) {
  const { notices } = useDatabase();
  const urgentNotices = notices.filter(
    (n) => (n as any).isMarqueeTicker || n.isImportant || n.isNew
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (urgentNotices.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % urgentNotices.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [urgentNotices.length]);

  const activeNotice = urgentNotices[currentIndex] || urgentNotices[0] || notices[0];

  if (!activeNotice) return null;

  return (
    <div
      id="home-announcement-ticker"
      className="bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200/80 dark:border-amber-900/50 px-3 py-2 flex items-center gap-2 text-xs"
    >
      <div className="flex items-center gap-1 shrink-0 px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 font-bold text-[10px] uppercase tracking-wider shadow-2xs">
        <Megaphone className="w-3 h-3" />
        <span>{language === 'hi' ? 'सूचना' : 'ALERT'}</span>
      </div>

      <button
        type="button"
        onClick={() => onSelectNotice(activeNotice)}
        className="flex-1 truncate text-left font-medium text-slate-800 dark:text-amber-200 hover:underline cursor-pointer flex items-center justify-between gap-1 group"
      >
        <span className="truncate">
          {language === 'hi' && activeNotice.titleHi
            ? activeNotice.titleHi
            : activeNotice.title}
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
}
