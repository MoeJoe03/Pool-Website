'use client';

import React from 'react';
import { SiteContent } from '@/lib/cms-types';
import { Workflow } from 'lucide-react';

interface ProcessSectionProps {
  content: SiteContent;
}

export default function ProcessSection({ content }: ProcessSectionProps) {
  const { processSection } = content;

  return (
    <section className="py-16 lg:py-24 bg-brand-bgLight border-t border-slate-200/80" id="process">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-brand-skyDark text-xs font-semibold uppercase tracking-wider mb-3">
            <Workflow className="w-3.5 h-3.5 text-brand-skyDark shrink-0" />
            <span>{processSection.badge.replace(/🔍|[^a-zA-Z\s]/g, '').trim() || 'PROCESS'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal sm:font-medium text-brand-navy tracking-tight">
            {processSection.heading}{' '}
            <span className="text-brand-skyDark font-semibold">{processSection.headingHighlight}</span>
          </h2>
          <p className="text-slate-600 font-normal mt-3 text-base">
            {processSection.description}
          </p>
        </div>

        {/* 4 Stepped Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSection.steps.map((stepItem, idx) => (
            <div
              key={idx}
              className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-subtle hover:shadow-card transition-all relative group"
            >
              <span className="text-5xl font-normal text-brand-skyDark/35 group-hover:text-brand-skyDark/60 transition-colors block mb-3 font-sans">
                {stepItem.step}
              </span>
              <h4 className="text-lg font-semibold text-brand-navy mb-2">{stepItem.title}</h4>
              <p className="text-sm font-normal text-slate-600 leading-relaxed">{stepItem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
