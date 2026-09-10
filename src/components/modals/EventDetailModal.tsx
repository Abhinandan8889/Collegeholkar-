import { X, Calendar, Clock, MapPin, Share2, Sparkles, Check } from 'lucide-react';
import { useState } from 'react';
import { CollegeEventItem, Language } from '../../types';

interface EventDetailModalProps {
  event: CollegeEventItem | null;
  onClose: () => void;
  language: Language;
}

export function EventDetailModal({ event, onClose, language }: EventDetailModalProps) {
  const [copied, setCopied] = useState(false);
  if (!event) return null;

  const title = language === 'hi' && event.titleHi ? event.titleHi : event.title;

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: event.title,
          text: `${event.title} on ${event.date} at ${event.venue}`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard?.writeText(`${event.title} - ${event.date} at ${event.venue}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      id="event-detail-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-xs animate-in fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md max-h-[90vh] flex flex-col rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        {/* Event Banner */}
        <div className="relative h-44 w-full overflow-hidden bg-slate-900">
          <img
            src={event.imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur-md hover:bg-black/80 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950">
            {event.category} Event
          </span>
        </div>

        {/* Content Body */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1 text-xs">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
            {title}
          </h3>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 space-y-2 text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                Date: {event.date}
              </span>
            </div>
            {event.time && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>Time: {event.time}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
              <span>Venue: {event.venue}</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1">
              Event Overview
            </h4>
            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              {event.description}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Share Event'}</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
