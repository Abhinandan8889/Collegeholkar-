import { useState } from 'react';
import { Calendar, MapPin, Clock, Sparkles, ArrowRight } from 'lucide-react';
import { COLLEGE_EVENTS } from '../../data/collegeData';
import { CollegeEventItem, Language, TabType } from '../../types';

interface EventsSectionProps {
  onSelectEvent: (event: CollegeEventItem) => void;
  onNavigateTab: (tab: TabType, subSection?: string) => void;
  language: Language;
}

export function EventsSection({ onSelectEvent, onNavigateTab, language }: EventsSectionProps) {
  const [filter, setFilter] = useState<'All' | 'Upcoming' | 'Latest'>('All');

  const filteredEvents = COLLEGE_EVENTS.filter((ev) => {
    if (filter === 'All') return true;
    return ev.category === filter;
  });

  return (
    <section id="home-events-section" className="px-3 py-4">
      <div className="flex items-center justify-between mb-2.5">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>{language === 'hi' ? 'कार्यक्रम एवं गतिविधियां' : 'Campus Events & Activities'}</span>
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {language === 'hi' ? 'संगोष्ठी, खेलकूद, विज्ञान प्रदर्शनी एवं सांस्कृतिक उत्सव' : 'Seminars, Sports, Science Exhibition & Fests'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigateTab('more', 'events')}
          className="text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1 cursor-pointer"
        >
          <span>{language === 'hi' ? 'सभी देखें' : 'All Events'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-1.5 mb-3">
        {(['All', 'Upcoming', 'Latest'] as const).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
              filter === cat
                ? 'bg-amber-500 text-slate-950 shadow-2xs'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {cat === 'All'
              ? language === 'hi' ? 'सभी' : 'All'
              : cat === 'Upcoming'
              ? language === 'hi' ? 'आगामी' : 'Upcoming'
              : language === 'hi' ? 'हालिया' : 'Latest'}
          </button>
        ))}
      </div>

      {/* Events Carousel / List */}
      <div className="space-y-3">
        {filteredEvents.map((event) => {
          const title = language === 'hi' && event.titleHi ? event.titleHi : event.title;
          return (
            <div
              key={event.id}
              onClick={() => onSelectEvent(event)}
              className="rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col sm:flex-row"
            >
              <div className="relative h-36 sm:h-auto sm:w-40 shrink-0 overflow-hidden bg-slate-800">
                <img
                  src={event.imageUrl}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span
                  className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider backdrop-blur-md ${
                    event.category === 'Upcoming'
                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                      : 'bg-indigo-950/80 text-indigo-300 border border-indigo-500/40'
                  }`}
                >
                  {event.category}
                </span>
              </div>

              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[10px] text-slate-500 dark:text-slate-400 mb-1 flex-wrap">
                    <span className="flex items-center gap-1 font-semibold text-amber-600 dark:text-amber-400">
                      <Calendar className="w-3 h-3" />
                      <span>{event.date}</span>
                    </span>
                    {event.time && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{event.time}</span>
                      </span>
                    )}
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2 mb-1">
                    {title}
                  </h4>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-2">
                    {event.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[10.5px] pt-1.5 border-t border-slate-100 dark:border-slate-800">
                  <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
                    <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                    <span className="truncate">{event.venue}</span>
                  </span>
                  <span className="font-semibold text-amber-600 dark:text-amber-400 shrink-0 flex items-center gap-0.5">
                    <span>{language === 'hi' ? 'विवरण' : 'Details'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
