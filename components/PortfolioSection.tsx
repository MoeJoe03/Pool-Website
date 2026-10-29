'use client';

import React from 'react';
import { SiteContent, PortfolioItem } from '@/lib/cms-types';
import { Sparkles, MapPin } from 'lucide-react';

interface PortfolioSectionProps {
  content: SiteContent;
  onOpenQuote: (serviceTitle?: string) => void;
}

export default function PortfolioSection({ content, onOpenQuote }: PortfolioSectionProps) {
  const { portfolioSection } = content;

  return (
    <section className="py-16 lg:py-24 bg-white" id="work">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-bgLight border border-slate-200 text-brand-orange text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-orange shrink-0" />
            <span>{portfolioSection.badge.replace(/⭐|[^a-zA-Z\s]/g, '').trim() || 'RESULTS'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal sm:font-medium text-brand-navy tracking-tight">
            {portfolioSection.heading}{' '}
            <span className="text-brand-skyDark font-semibold">{portfolioSection.headingHighlight}</span>
          </h2>
          <p className="text-slate-600 font-normal mt-3 text-base">
            {portfolioSection.description}
          </p>
        </div>

        {/* Project Cards Stack */}
        <div className="space-y-12">
          {portfolioSection.items.map((project: PortfolioItem) => (
            <div
              key={project.id}
              className="relative overflow-hidden bg-brand-bgLight rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-subtle grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group/card"
            >
              {/* 3 Waved Design on Right Top Edge for Pool Vibe */}
              <div
                className="absolute top-0 right-0 w-36 h-28 sm:w-48 sm:h-36 pointer-events-none overflow-hidden rounded-tr-3xl z-10 opacity-80 group-hover/card:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 180 130"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <defs>
                    <linearGradient
                      id={`poolWaveGrad-${project.id}`}
                      x1="0"
                      y1="0"
                      x2="180"
                      y2="130"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#38BDF8" stopOpacity="0.22" />
                      <stop offset="1" stopColor="#0284C7" stopOpacity="0.06" />
                    </linearGradient>
                  </defs>

                  {/* Soft water corner tint */}
                  <path
                    d="M60 0 C100 45, 135 30, 180 85 V0 H60 Z"
                    fill={`url(#poolWaveGrad-${project.id})`}
                  />

                  {/* Wave 1: Soft outer ripple */}
                  <path
                    d="M10 0 C55 52, 110 36, 180 110"
                    stroke="#0284C7"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeOpacity="0.25"
                  />

                  {/* Wave 2: Mid fluid wave */}
                  <path
                    d="M50 0 C90 48, 132 38, 180 90"
                    stroke="#38BDF8"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeOpacity="0.55"
                  />

                  {/* Wave 3: Top crest wave */}
                  <path
                    d="M92 0 C125 42, 150 35, 180 65"
                    stroke="#0284C7"
                    strokeWidth="3.8"
                    strokeLinecap="round"
                    strokeOpacity="0.85"
                  />

                  {/* Pool splash droplets */}
                  <circle cx="165" cy="20" r="2.5" fill="#38BDF8" fillOpacity="0.75" />
                  <circle cx="150" cy="12" r="1.5" fill="#0284C7" fillOpacity="0.65" />
                  <circle cx="172" cy="35" r="2" fill="#38BDF8" fillOpacity="0.6" />
                </svg>
              </div>

              <div className="lg:col-span-7 h-72 sm:h-96 rounded-2xl overflow-hidden relative group">
                {/* Wave Corner Cutout Design matching reference image */}
                <div
                  className="absolute top-0 left-0 w-24 h-24 sm:w-28 sm:h-28 z-20 pointer-events-none overflow-hidden"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                  >
                    {/* Corner patch matching the card background color */}
                    <path
                      d="M0 0 L82 0 C64 0, 54 14, 42 34 C30 54, 16 64, 0 82 Z"
                      fill="#F8FAFC"
                    />
                    {/* Subtle water wave ripple contour */}
                    <path
                      d="M82 0 C64 0, 54 14, 42 34 C30 54, 16 64, 0 82"
                      stroke="#38BDF8"
                      strokeWidth="1.75"
                      strokeOpacity="0.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M86 0 C67 0, 57 16, 45 37 C33 57, 18 67, 0 86"
                      stroke="#0284C7"
                      strokeWidth="1"
                      strokeOpacity="0.25"
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* Angled diagonal badge text in the wave corner cutout */}
                  <div className="absolute top-2 left-2 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center -rotate-45 font-semibold text-xs sm:text-sm text-slate-700 select-none tracking-wider">
                    {project.badge.match(/\d{4}/)?.[0] || project.badge.replace('Project', '').replace('Case', '').trim() || project.badge}
                  </div>
                </div>

                <img
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src={project.image}
                />
              </div>
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                  <span>{project.location}</span>
                </div>
                <h3 className="text-2xl font-medium text-brand-navy">
                  {project.title}
                </h3>
                <p className="text-slate-600 font-normal text-sm leading-relaxed">
                  {project.description}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => onOpenQuote(project.title)}
                    className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-brand-orange hover:bg-brand-orangeHover text-white font-medium text-xs tracking-wide transition-all shadow-sm hover:shadow-md cursor-pointer"
                  >
                    {project.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
