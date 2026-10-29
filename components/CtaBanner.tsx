'use client';

import React from 'react';
import { SiteContent } from '@/lib/cms-types';
import { Phone } from 'lucide-react';

interface CtaBannerProps {
  content: SiteContent;
  onOpenQuote: () => void;
}

export default function CtaBanner({ content, onOpenQuote }: CtaBannerProps) {
  const { ctaBanner, company } = content;

  return (
    <section className="py-16 bg-white" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl overflow-hidden shadow-2xl bg-brand-navy grid grid-cols-1 lg:grid-cols-12">
          {/* Left Banner Content */}
          <div className="lg:col-span-6 p-8 sm:p-14 lg:p-16 flex flex-col justify-center space-y-6">
            <div className="flex items-center gap-3 text-slate-300 text-xs font-semibold uppercase tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-orange"></span>
              {ctaBanner.badge}
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal sm:font-medium text-white tracking-tight leading-tight">
              {ctaBanner.headingLine1}
              <br />
              <span className="font-semibold">{ctaBanner.headingLine2}</span>
            </h2>
            <p className="text-slate-300 font-normal text-base leading-relaxed max-w-md">
              {ctaBanner.description}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenQuote}
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-brand-orange hover:bg-brand-orangeHover text-white font-medium text-sm tracking-wide transition-all shadow-lg hover:shadow-xl cursor-pointer"
              >
                {ctaBanner.buttonText}
              </button>
              <a
                href={`tel:${company.phone}`}
                className="inline-flex items-center gap-2 text-slate-200 hover:text-white text-sm font-medium transition-colors py-2 px-3 rounded-lg hover:bg-white/10"
              >
                <Phone className="w-4 h-4 text-brand-orange" />
                <span>Call {company.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Right Banner Photo */}
          <div className="lg:col-span-6 min-h-[300px] lg:min-h-[420px] relative">
            <img
              alt="Luxury poolside lounge cabana and crystal clear pool"
              className="w-full h-full object-cover object-center"
              src={ctaBanner.image}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/60 to-transparent lg:hidden"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
