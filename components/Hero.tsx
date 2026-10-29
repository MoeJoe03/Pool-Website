'use client';

import React from 'react';
import { SiteContent } from '@/lib/cms-types';

interface HeroProps {
  content: SiteContent;
  onOpenQuote: () => void;
}

export default function Hero({ content, onOpenQuote }: HeroProps) {
  const { hero } = content;

  // Curated partner logos matching the reference image bottom row
  const partnerLogos = [
    {
      name: 'Logoipsum',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      ),
    },
    {
      name: 'Logoipsum',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <polygon points="12 2 22 22 2 22" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="12" cy="14" r="3" fill="currentColor" />
        </svg>
      ),
    },
    {
      name: 'Logoipsum',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    {
      name: 'Logoipsum',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2l8 8-8 8-8-8 8-8z" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M12 7l4 4-4 4-4-4 4-4z" fill="currentColor" />
        </svg>
      ),
    },
    {
      name: 'Logoipsum',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M8 12a4 4 0 0 1 8 0" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    {
      name: 'Logoipsum',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M4 12h16M12 4v16" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-24 sm:pt-28 pb-10 sm:pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Full-Screen Aerial Pool Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Overhead aerial view of luxury swimming pool with lounge cabanas and palm patio"
          className="w-full h-full object-cover object-center scale-[1.02] filter brightness-100"
          src={hero.bgImage}
        />

        {/* Soft Center Radial High-Key Vignette matching reference screenshot */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 75% 70% at 50% 50%, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.82) 40%, rgba(255, 255, 255, 0.45) 70%, rgba(255, 255, 255, 0.15) 100%)',
          }}
        />

        {/* Ambient subtle backdrop blur for crisp text legibility */}
        <div className="absolute inset-0 backdrop-blur-[0.5px] pointer-events-none" />
      </div>

      {/* Empty Spacer to push content to middle */}
      <div className="relative z-10 h-6 sm:h-12" />

      {/* Main Hero Center Content matching reference image */}
      <div className="relative z-10 max-w-4xl mx-auto text-center my-auto py-8">
        {/* Social Proof Eyebrow / Mini Avatars */}
        <div className="inline-flex items-center gap-2.5 mb-6">
          <div className="flex -space-x-1.5">
            {hero.avatars.slice(0, 4).map((avatarUrl, i) => (
              <img
                key={i}
                alt={`Customer avatar ${i + 1}`}
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                src={avatarUrl}
              />
            ))}
          </div>
          <span className="text-xs font-medium text-slate-700 tracking-tight">
            {hero.trustBadge || 'Trusted by 2,300+ customers'}
          </span>
        </div>

        {/* Large Typography Headline with balanced medium weight */}
        <h1 className="text-4xl sm:text-6xl lg:text-[76px] font-normal sm:font-medium text-slate-900 tracking-tight leading-[1.08]">
          {hero.titleLine1}{' '}
          <span className="text-[#1E40AF] font-semibold">{hero.titleHighlight}</span>
          <br />
          {hero.titleLine2}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg font-normal text-slate-600 max-w-xl mx-auto leading-relaxed mt-5">
          {hero.subtitle}
        </p>

        {/* Dual CTA Buttons matching reference image */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-8">
          <button
            onClick={onOpenQuote}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#f06418] hover:bg-[#ea580c] text-white font-medium text-sm tracking-wide transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            {hero.primaryCtaText || 'Get a Quote'}
          </button>
          <a
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-medium text-sm tracking-wide border border-slate-200/80 shadow-sm hover:shadow transition-all text-center"
            href="#services"
          >
            {hero.secondaryCtaText || 'View Services'}
          </a>
        </div>
      </div>

      {/* Partner Logos Row along bottom matching reference screenshot */}
      <div className="relative z-10 max-w-6xl mx-auto w-full pt-8">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-14 opacity-70 hover:opacity-90 transition-opacity">
          {partnerLogos.map((partner, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 text-slate-700 font-medium text-sm tracking-tight"
            >
              {partner.icon}
              <span className="text-sm font-medium tracking-tight text-slate-700">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
