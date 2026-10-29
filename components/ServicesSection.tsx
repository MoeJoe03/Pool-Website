'use client';

import React from 'react';
import { SiteContent, ServiceItem } from '@/lib/cms-types';
import { Zap, Check, ArrowRight } from 'lucide-react';
import PremiumIcon from '@/components/ui/PremiumIcon';

interface ServicesSectionProps {
  content: SiteContent;
  onSelectService: (serviceTitle: string) => void;
}

export default function ServicesSection({ content, onSelectService }: ServicesSectionProps) {
  const { servicesSection } = content;

  const getTagBadgeColor = (color?: string) => {
    switch (color) {
      case 'orange':
        return 'bg-orange-50 text-brand-orange';
      case 'sky':
        return 'bg-sky-50 text-brand-skyDark';
      case 'amber':
        return 'bg-amber-50 text-amber-600';
      case 'indigo':
        return 'bg-indigo-50 text-indigo-600';
      case 'cyan':
        return 'bg-cyan-50 text-brand-skyDark';
      case 'emerald':
        return 'bg-emerald-50 text-emerald-600';
      default:
        return 'bg-orange-50 text-brand-orange';
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-brand-bgLight" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Sticky Summary & Header */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-brand-orange text-xs font-semibold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-brand-orange shrink-0" />
              <span>{servicesSection.badge.replace(/⚡|[^a-zA-Z\s]/g, '').trim() || 'SERVICES'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-normal sm:font-medium text-brand-navy leading-tight tracking-tight">
              {servicesSection.heading}{' '}
              <span className="text-brand-skyDark font-semibold">{servicesSection.headingHighlight}</span>
            </h2>
            <p className="text-slate-600 font-normal text-base leading-relaxed">
              {servicesSection.description}
            </p>
            <div className="pt-2">
              <button
                onClick={() => onSelectService('Weekly Maintenance')}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-brand-orange hover:bg-brand-orangeHover text-white font-medium text-sm transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                {servicesSection.ctaText}
              </button>
            </div>

            {/* Micro Highlight Box */}
            <div className="mt-8 p-5 bg-white rounded-2xl border border-slate-200/80 shadow-subtle">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm font-medium">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                </span>
                <span className="text-sm font-semibold text-brand-navy">
                  {servicesSection.chemicalsHighlightTitle}
                </span>
              </div>
              <p className="text-xs font-normal text-slate-500 leading-normal">
                {servicesSection.chemicalsHighlightDesc}
              </p>
            </div>
          </div>

          {/* Right Column: Vertical Stacked Detailed Service Cards */}
          <div className="lg:col-span-8 space-y-6">
            {servicesSection.items.map((service: ServiceItem) => (
              <div
                key={service.id}
                onClick={() => onSelectService(service.title)}
                className="group bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-subtle hover:shadow-card transition-all duration-300 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center cursor-pointer"
              >
                <div className="sm:col-span-5 h-48 rounded-xl overflow-hidden bg-slate-100">
                  <img
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={service.image}
                  />
                </div>
                <div className="sm:col-span-7 space-y-2">
                  <div
                    className={`w-9 h-9 rounded-xl ${getTagBadgeColor(
                      service.tagColor
                    )} flex items-center justify-center mb-1 shadow-sm`}
                  >
                    <PremiumIcon nameOrEmoji={service.icon} className="w-4 h-4" />
                  </div>
                  <h3 className="text-xl font-medium text-brand-navy group-hover:text-brand-skyDark transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 font-normal text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                      {service.priceNote}
                    </span>
                    <span className="text-xs font-semibold text-brand-orange group-hover:underline flex items-center gap-1">
                      <span>Book Now</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
