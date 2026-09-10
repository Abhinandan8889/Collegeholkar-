import { Phone, Mail, Globe, MapPin, Copy, Check, Navigation } from 'lucide-react';
import { useState } from 'react';
import { COLLEGE_INFO } from '../../data/collegeData';
import { Language } from '../../types';
import { getTranslation } from '../../locales/strings';

interface ContactSectionProps {
  onOpenExternalLink: (url: string, title: string) => void;
  language: Language;
}

export function ContactSection({ onOpenExternalLink, language }: ContactSectionProps) {
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard?.writeText(COLLEGE_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCall = () => {
    window.location.href = `tel:${COLLEGE_INFO.phone.replace(/\s+/g, '')}`;
  };

  const handleEmail = () => {
    window.location.href = `mailto:${COLLEGE_INFO.email}`;
  };

  const handleOpenMap = () => {
    onOpenExternalLink(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        'Government Holkar Science College Indore Bhawarkuan'
      )}`,
      'Google Maps Location'
    );
  };

  return (
    <section id="home-contact-section" className="px-3 py-4 bg-slate-100/80 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800">
      <div className="mb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {getTranslation(language, 'contactUs')}
        </h3>
        <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
          {language === 'hi' ? 'परिसर पहुंच एवं संपर्क सूत्र' : 'Campus Location & Contact Directory'}
        </p>
      </div>

      <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3">
        {/* Address Row */}
        <div className="flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              {getTranslation(language, 'addressLabel')}
            </span>
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-snug">
              {COLLEGE_INFO.address}
            </p>
          </div>
          <button
            type="button"
            onClick={copyAddress}
            title="Copy address"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        {/* Action Buttons Row */}
        <div className="grid grid-cols-4 gap-1.5 pt-1">
          {/* Call */}
          <button
            type="button"
            onClick={handleCall}
            className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200/60 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-emerald-700 transition-all cursor-pointer group"
          >
            <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-bold">{getTranslation(language, 'callNow')}</span>
          </button>

          {/* Email */}
          <button
            type="button"
            onClick={handleEmail}
            className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-slate-200/60 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-blue-700 transition-all cursor-pointer group"
          >
            <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400 mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-bold">{getTranslation(language, 'sendEmail')}</span>
          </button>

          {/* Website */}
          <button
            type="button"
            onClick={() => onOpenExternalLink(COLLEGE_INFO.website, 'Official College Portal')}
            className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-amber-50 dark:hover:bg-amber-950/40 border border-slate-200/60 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-amber-700 transition-all cursor-pointer group"
          >
            <Globe className="w-4 h-4 text-amber-600 dark:text-amber-400 mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-bold">{getTranslation(language, 'openWebsite')}</span>
          </button>

          {/* Map */}
          <button
            type="button"
            onClick={handleOpenMap}
            className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-slate-200/60 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-rose-700 transition-all cursor-pointer group"
          >
            <Navigation className="w-4 h-4 text-rose-600 dark:text-rose-400 mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-bold">{getTranslation(language, 'openMap')}</span>
          </button>
        </div>

        {/* Office Hours & Helpdesk Note */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span>Office Hours: Mon - Sat (10:30 AM - 05:00 PM)</span>
          <span className="font-semibold text-amber-600 dark:text-amber-400">PIN 452001</span>
        </div>
      </div>
    </section>
  );
}
