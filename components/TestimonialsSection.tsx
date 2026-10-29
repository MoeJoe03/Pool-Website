'use client';

import React from 'react';
import { SiteContent, TestimonialItem } from '@/lib/cms-types';
import { MessageSquare, Star } from 'lucide-react';

interface TestimonialsSectionProps {
  content: SiteContent;
}

export default function TestimonialsSection({ content }: TestimonialsSectionProps) {
  const { testimonialsSection } = content;

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-brand-orange text-xs font-semibold uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-brand-orange shrink-0" />
            <span>{testimonialsSection.badge.replace(/💬|[^a-zA-Z\s]/g, '').trim() || 'TESTIMONIALS'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal sm:font-medium text-brand-navy tracking-tight">
            {testimonialsSection.heading}{' '}
            <span className="text-brand-skyDark font-semibold">{testimonialsSection.headingHighlight}</span> Say
          </h2>
          <p className="text-slate-600 font-normal mt-3 text-base">
            {testimonialsSection.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Lifestyle Portrait Card with Embedded Testimonial Overlay */}
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden shadow-card min-h-[460px] flex items-end">
            <img
              alt="Customer enjoying clean pool patio water"
              className="absolute inset-0 w-full h-full object-cover"
              src={testimonialsSection.featured.image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navyDark/90 via-brand-navy/30 to-transparent"></div>
            <div className="relative z-10 p-6 sm:p-8 text-white">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-base sm:text-lg font-normal italic leading-snug mb-4">
                {testimonialsSection.featured.quote}
              </p>
              <div className="text-xs uppercase tracking-wider text-slate-300 font-medium">
                {testimonialsSection.featured.author} —{' '}
                <span className="text-brand-sky font-semibold">{testimonialsSection.featured.role}</span>
              </div>
            </div>
          </div>

          {/* Right: 3 Review Cards Stack */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-4">
            {testimonialsSection.reviews.map((review: TestimonialItem) => (
              <div
                key={review.id}
                className="bg-brand-bgLight p-6 rounded-2xl border border-slate-200/80 shadow-subtle hover:border-slate-300 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: review.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-500 font-medium">{review.role}</span>
                </div>
                <p className="text-slate-700 font-normal text-sm sm:text-base leading-relaxed mb-4">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden ring-1 ring-slate-200">
                    <img
                      alt={`${review.name} avatar`}
                      className="w-full h-full object-cover"
                      src={review.avatar}
                    />
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-brand-navy">{review.name}</h5>
                    <p className="text-xs font-normal text-slate-500">{review.location}</p>
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
