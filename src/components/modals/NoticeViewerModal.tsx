import { useState } from 'react';
import {
  X,
  Download,
  Share2,
  Calendar,
  FileText,
  AlertCircle,
  Sparkles,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Check,
} from 'lucide-react';
import { NoticeItem, Language } from '../../types';
import { CollegeLogo } from '../common/CollegeLogo';

interface NoticeViewerModalProps {
  notice: NoticeItem | null;
  onClose: () => void;
  onDownload: (notice: NoticeItem) => void;
  language: Language;
}

export function NoticeViewerModal({
  notice,
  onClose,
  onDownload,
  language,
}: NoticeViewerModalProps) {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [copied, setCopied] = useState(false);

  if (!notice) return null;

  const title = language === 'hi' && notice.titleHi ? notice.titleHi : notice.title;
  const description =
    language === 'hi' && notice.descriptionHi ? notice.descriptionHi : notice.description;

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: notice.title,
          text: notice.description,
          url: notice.fileUrl || window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard?.writeText(`${notice.title}\n${notice.fileUrl || ''}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      id="notice-viewer-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-lg max-h-[90vh] flex flex-col rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 bg-slate-50 dark:bg-slate-800/80">
          <div className="flex items-center gap-2 min-w-0">
            <CollegeLogo size="sm" />
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
                Official Circular • {notice.category}
              </span>
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate block">
                Ref: {notice.referenceNo || 'GHC/OFFICIAL/2026'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {/* Tag Badges */}
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 text-[10px]">
              {notice.category}
            </span>
            {notice.isNew && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-bold bg-rose-500 text-white text-[10px]">
                <Sparkles className="w-3 h-3" />
                NEW
              </span>
            )}
            {notice.isImportant && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-bold bg-amber-500 text-slate-950 text-[10px]">
                <AlertCircle className="w-3 h-3" />
                IMPORTANT
              </span>
            )}
            <span className="flex items-center gap-1 text-[11px] text-slate-400 ml-auto">
              <Calendar className="w-3.5 h-3.5" />
              {notice.date}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
            {title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-800">
            {description}
          </p>

          {/* Document PDF Viewer Preview Area */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-100 dark:bg-slate-800">
            {/* Viewer Toolbar */}
            <div className="px-3 py-2 bg-slate-200 dark:bg-slate-700/80 flex items-center justify-between text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-1.5 font-semibold text-[11px]">
                <FileText className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>PDF Document ({notice.fileSize || '380 KB'})</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.max(80, z - 10))}
                  title="Zoom out"
                  className="p-1 rounded hover:bg-slate-300 dark:hover:bg-slate-600 cursor-pointer"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10px] font-mono px-1">{zoomLevel}%</span>
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.min(150, z + 10))}
                  title="Zoom in"
                  className="p-1 rounded hover:bg-slate-300 dark:hover:bg-slate-600 cursor-pointer"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Document Render Canvas Preview */}
            <div
              className="p-5 flex flex-col items-center justify-center min-h-[160px] bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-transform origin-top"
              style={{ transform: `scale(${zoomLevel / 100})` }}
            >
              <div className="w-full max-w-sm p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs bg-slate-50/50 dark:bg-slate-800/50 text-center space-y-2">
                <div className="flex justify-center">
                  <CollegeLogo size="sm" />
                </div>
                <div className="text-[10px] font-bold text-slate-800 dark:text-slate-200">
                  GOVERNMENT HOLKAR (MODEL, AUTONOMOUS) SCIENCE COLLEGE, INDORE
                </div>
                <div className="text-[9px] text-slate-500 font-mono">
                  Dispatch No: {notice.referenceNo || 'GHC/2026/OFFICIAL'} • Date: {notice.date}
                </div>
                <div className="h-px bg-slate-300 dark:bg-slate-700 my-1" />
                <div className="text-[10px] font-semibold text-slate-700 dark:text-slate-300 text-left">
                  SUBJECT: {notice.title}
                </div>
                <div className="text-[9px] text-slate-500 text-left leading-relaxed">
                  As directed by the Competent Authority, all concerned students and faculty members are hereby informed to comply with the stipulated schedule.
                </div>
                <div className="text-[9px] font-bold text-right pt-2 text-slate-700 dark:text-slate-300">
                  By Order, Principal
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="flex-1 py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Link Copied' : 'Share'}</span>
          </button>

          <button
            type="button"
            onClick={() => onDownload(notice)}
            className="flex-1 py-2 px-3 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Download Official PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
