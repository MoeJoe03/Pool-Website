'use client';

import React from 'react';
import { SiteContent } from '@/lib/cms-types';
import { ShieldCheck, Check } from 'lucide-react';

interface AboutSectionProps {
  content: SiteContent;
  onOpenQuote: () => void;
}

export default function AboutSection({ content, onOpenQuote }: AboutSectionProps) {
  const { aboutSection } = content;

  return (
    <section className="py-16 lg:py-24 bg-brand-bgLight" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Copy & Bulletpoints */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-brand-skyDark text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-skyDark shrink-0" />
              <span>{aboutSection.badge.replace(/🤝|[^a-zA-Z\s]/g, '').trim() || 'BUILT ON TRUST'}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal sm:font-medium text-brand-navy leading-tight tracking-tight">
              {aboutSection.heading}{' '}
              <span className="text-brand-skyDark font-semibold">{aboutSection.headingHighlight}</span>
            </h2>
            <p className="text-slate-600 font-normal text-base sm:text-lg leading-relaxed">
              {aboutSection.description}
            </p>

            {/* Checked List with Lucide Check Icon */}
            <ul className="space-y-3 pt-2">
              {aboutSection.bulletPoints.map((point, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-700 font-normal">
                  <span className="w-5 h-5 rounded-full bg-brand-skyDark/10 text-brand-skyDark flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-brand-skyDark stroke-[3]" />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <button
                onClick={onOpenQuote}
                className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-brand-orange hover:bg-brand-orangeHover text-white font-medium text-sm transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                {aboutSection.ctaText}
              </button>
            </div>
          </div>

          {/* Right: Team & Technician Photography */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80">
              <img
                alt="Pool maintenance crew and estate patio"
                className="w-full h-[440px] sm:h-[480px] object-cover"
                src={aboutSection.image}
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/40 to-transparent p-6 sm:p-8 text-white">
                <p className="text-xs uppercase tracking-widest text-brand-sky font-normal mb-1">
                  {aboutSection.imageBadge}
                </p>
                <h4 className="text-xl font-medium">{aboutSection.imageTitle}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
