import { useState } from 'react';
import { Bell, X, CheckCheck, Sparkles, AlertCircle, Calendar, ArrowRight } from 'lucide-react';
import { AppNotification, NoticeItem, Language } from '../../types';
import { INITIAL_NOTIFICATIONS, LATEST_NOTICES } from '../../data/collegeData';

interface NotificationsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectNotice: (notice: NoticeItem) => void;
  language: Language;
}

export function NotificationsSheet({
  isOpen,
  onClose,
  onSelectNotice,
  language,
}: NotificationsSheetProps) {
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);

  if (!isOpen) return null;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleNotificationClick = (notif: AppNotification) => {
    // mark this notification as read
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, isRead: true } : n))
    );

    if (notif.actionNoticeId) {
      const notice = LATEST_NOTICES.find((n) => n.id === notif.actionNoticeId);
      if (notice) {
        onClose();
        onSelectNotice(notice);
      }
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div
      id="notifications-sheet"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full sm:max-w-md max-h-[85vh] rounded-t-3xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden">
        {/* Android Sheet Drag Handle */}
        <div className="w-12 h-1 rounded-full bg-slate-300 dark:bg-slate-700 mx-auto mt-2.5 sm:hidden" />

        {/* Header */}
        <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                {language === 'hi' ? 'सूचनाएं एवं अलर्ट' : 'College Push Notifications'}
              </h3>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                FCM Architecture • {unreadCount} Unread
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllRead}
                title="Mark all as read"
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <CheckCheck className="w-4 h-4 text-emerald-600" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notification List */}
        <div className="p-3 overflow-y-auto space-y-2 flex-1">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => handleNotificationClick(notif)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                notif.isRead
                  ? 'bg-white dark:bg-slate-900/60 border-slate-200/80 dark:border-slate-800'
                  : 'bg-amber-50/50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50 shadow-2xs'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex items-center gap-1.5">
                  {!notif.isRead && (
                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                  )}
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    {notif.title}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 shrink-0">
                  {notif.timestamp}
                </span>
              </div>

              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed pl-3.5">
                {notif.body}
              </p>

              {notif.actionNoticeId && (
                <div className="mt-2 pl-3.5 flex items-center gap-1 text-[10.5px] font-bold text-amber-600 dark:text-amber-400">
                  <span>View Official Notice</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 text-[10.5px] text-slate-500 dark:text-slate-400 text-center">
          Integrated with Firebase Cloud Messaging (FCM) broadcast topic: <span className="font-mono text-[9.5px]">holkar_all_students</span>
        </div>
      </div>
    </div>
  );
}
