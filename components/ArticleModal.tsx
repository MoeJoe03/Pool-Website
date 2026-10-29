'use client';

import React from 'react';
import { X, Calendar, Clock, BookOpen, Share2 } from 'lucide-react';
import { ArticleItem } from '@/lib/cms-types';

interface ArticleModalProps {
  article: ArticleItem | null;
  onClose: () => void;
  onOpenQuote: () => void;
}

export default function ArticleModal({ article, onClose, onOpenQuote }: ArticleModalProps) {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header Image */}
        <div className="relative h-64 sm:h-72 w-full bg-slate-100 shrink-0">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-black/20" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="inline-block px-2.5 py-1 rounded bg-brand-orange text-white text-[11px] font-semibold uppercase tracking-wider mb-2">
              Pool Care Guide
            </span>
            <h3 className="text-xl sm:text-2xl font-medium leading-tight drop-shadow-sm">
              {article.title}
            </h3>
            <div className="flex items-center gap-4 text-xs font-normal text-slate-200 mt-2">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> {article.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> 4 min read
              </span>
            </div>
          </div>
        </div>

        {/* Body content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-5">
          <div className="p-4 rounded-xl bg-sky-50 border border-sky-100 text-slate-700 text-sm leading-relaxed font-normal">
            {article.summary}
          </div>

          <div className="space-y-4 text-slate-600 font-normal text-sm sm:text-base leading-relaxed whitespace-pre-line">
            {article.content ||
              `Regular pool care is essential for maintaining water chemistry balance and preventing costly equipment breakdowns. Follow the steps outlined in this guide or contact our team for professional route service.`}
          </div>

          {/* Action callout */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Need expert assistance?</p>
              <p className="text-sm font-semibold text-brand-navy">Schedule a professional water chemistry test</p>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenQuote();
              }}
              className="px-6 py-2.5 rounded-full bg-brand-orange hover:bg-brand-orangeHover text-white font-semibold text-xs tracking-wide transition-all shadow-sm"
            >
              Get Professional Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
