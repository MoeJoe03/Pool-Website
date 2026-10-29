'use client';

import React from 'react';
import { SiteContent } from '@/lib/cms-types';
import { Award } from 'lucide-react';
import PremiumIcon from '@/components/ui/PremiumIcon';

interface StandardsSectionProps {
  content: SiteContent;
}

export default function StandardsSection({ content }: StandardsSectionProps) {
  const { standardsSection } = content;

  const getPillarIconBg = (index: number) => {
    const colors = [
      'bg-orange-100 text-brand-orange',
      'bg-sky-100 text-brand-skyDark',
      'bg-indigo-100 text-indigo-600',
      'bg-emerald-100 text-emerald-600',
    ];
    return colors[index % colors.length];
  };

  return (
    <section className="py-16 bg-white border-y border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5 text-slate-700 shrink-0" />
            <span>{standardsSection.badge.replace(/✦|[^a-zA-Z\s]/g, '').trim() || 'WHY POOLIFY'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal sm:font-medium text-brand-navy tracking-tight">
            {standardsSection.heading}{' '}
            <span className="text-brand-skyDark font-semibold">{standardsSection.headingHighlight}</span>
          </h2>
          <p className="text-slate-600 font-normal mt-3 text-base">
            {standardsSection.description}
          </p>
        </div>

        {/* 4 Horizontal Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {standardsSection.pillars.map((pillar, idx) => (
            <div
              key={pillar.id || idx}
              className="p-6 rounded-2xl bg-brand-bgLight border border-slate-200/80 hover:border-slate-300 transition-all hover:shadow-subtle group"
            >
              <div
                className={`w-11 h-11 rounded-xl ${getPillarIconBg(
                  idx
                )} flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform`}
              >
                <PremiumIcon nameOrEmoji={pillar.icon || pillar.title} className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-semibold text-brand-navy mb-2">{pillar.title}</h4>
              <p className="text-sm font-normal text-slate-600 leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
