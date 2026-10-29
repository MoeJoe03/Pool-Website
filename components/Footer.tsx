'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SiteContent } from '@/lib/cms-types';
import { Settings, CheckCircle2, Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';

interface FooterProps {
  content: SiteContent;
}

export default function Footer({ content }: FooterProps) {
  const { company, footer } = content;
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 4000);
  };

  return (
    <footer className="relative bg-brand-navy text-white pt-16 pb-12 overflow-hidden border-t border-brand-navyLight/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          {/* Col 1: Contact Details */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-base font-semibold text-white tracking-wide">{footer.contactHeading}</h4>
            <ul className="space-y-3 text-sm font-normal text-slate-300">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-brand-sky" />
                </div>
                <a className="hover:text-white transition-colors" href={`tel:${company.phone}`}>
                  {company.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-brand-sky" />
                </div>
                <a className="hover:text-white transition-colors" href={`mailto:${company.email}`}>
                  {company.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-brand-sky" />
                </div>
                <span>{company.address}</span>
              </li>
            </ul>
          </div>

          {/* Col 2: Newsletter Subscription */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-base font-semibold text-white tracking-wide">{footer.newsletterHeading}</h4>
            <p className="text-xs font-normal text-slate-300 leading-relaxed max-w-sm">
              {footer.newsletterDesc}
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-full max-w-md text-xs text-emerald-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Thank you! You have been subscribed to seasonal pool guides.</span>
              </div>
            ) : (
              <form className="flex flex-col sm:flex-row gap-2 max-w-md" onSubmit={handleSubscribe}>
                <input
                  className="w-full px-4 py-2.5 rounded-full bg-white/10 text-white placeholder-slate-400 border border-white/20 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  placeholder="your@email.com"
                  required
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                />
                <button
                  className="px-6 py-2.5 rounded-full bg-brand-orange hover:bg-brand-orangeHover text-white font-semibold text-xs uppercase tracking-wider transition-all whitespace-nowrap shadow-sm cursor-pointer"
                  type="submit"
                >
                  Sign Up
                </button>
              </form>
            )}
          </div>

          {/* Col 3: Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-base font-semibold text-white tracking-wide">{footer.infoHeading}</h4>
            <ul className="space-y-2 text-sm font-normal text-slate-300">
              <li>
                <a className="hover:text-white transition-colors" href="#services">
                  Services
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#about">
                  About
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#work">
                  Portfolio
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#tips">
                  Blog &amp; Guides
                </a>
              </li>
              <li className="pt-2">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 text-xs text-brand-sky hover:text-white transition-colors font-medium"
                >
                  <Settings className="w-3.5 h-3.5" />
                  Owner CMS Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Signature Large Watermark */}
        <div className="w-full text-center py-8">
          <span className="watermark-text font-bold text-white/[0.03] inline-block tracking-tighter">
            {footer.watermarkText || company.name}
          </span>
        </div>

        {/* Bottom Legal Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-normal text-slate-400 gap-4">
          <div>
            {footer.copyrightText.replace('Poolify', company.name)}
          </div>
          <div className="flex items-center gap-6">
            <a className="hover:text-white transition-colors" href="#about">
              Privacy Policy
            </a>
            <a className="hover:text-white transition-colors" href="#services">
              Terms of Service
            </a>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 text-white font-mono text-[10px]">
              <ShieldCheck className="w-3 h-3 text-amber-400 shrink-0" />
              <span>{footer.cpoBadgeText.replace(/⚡|[^a-zA-Z\s]/g, '').trim() || 'Certified CPO Team'}</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
