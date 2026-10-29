'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Settings } from 'lucide-react';
import { SiteContent } from '@/lib/cms-types';

interface HeaderProps {
  content: SiteContent;
  onOpenQuote: () => void;
}

export default function Header({ content, onOpenQuote }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Sticky Main Header */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo matching ref image */}
          <div className="flex items-center gap-8">
            <Link
              aria-label={`${content.company.name} Home`}
              className="flex items-center gap-2.5 group"
              href="/"
            >
              {content.company.logoImage ? (
                <img
                  src={content.company.logoImage}
                  alt={content.company.name}
                  className="h-8 w-auto object-contain"
                />
              ) : (
                <span className="w-8 h-8 rounded-full bg-brand-navy flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                  {/* Fluid Wave Icon matching reference */}
                  <svg className="w-4 h-4 text-brand-sky" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12c2.5-3 5-3 7.5 0s5 3 7.5 0 5-3 7 0" />
                    <path d="M2 16c2.5-3 5-3 7.5 0s5 3 7.5 0 5-3 7 0" opacity="0.6" />
                  </svg>
                </span>
              )}
              <span className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
                {content.company.name || 'Poolify'}
              </span>
            </Link>

            {/* Desktop Navigation Links matching ref image (Services, About, Blog) */}
            <nav className="hidden md:flex items-center gap-7 text-[15px] font-medium text-slate-700">
              <a className="hover:text-slate-950 transition-colors" href="#services">
                Services
              </a>
              <a className="hover:text-slate-950 transition-colors" href="#about">
                About
              </a>
              <a className="hover:text-slate-950 transition-colors" href="#tips">
                Blog
              </a>
              <a className="hover:text-slate-950 transition-colors text-slate-400" href="#work">
                Work
              </a>
            </nav>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Quick CMS Admin link */}
            <Link
              href="/admin"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/5 hover:bg-slate-900/10 text-slate-700 text-xs font-medium transition-colors"
              title="Open CMS Admin Editor"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Owner CMS</span>
            </Link>

            {/* White Pill "Get a Quote" Button matching ref image */}
            <button
              onClick={onOpenQuote}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-medium text-sm tracking-wide shadow-sm hover:shadow border border-slate-200/80 transition-all duration-200 cursor-pointer"
            >
              {content.navigation.ctaText || 'Get a Quote'}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-800 hover:bg-white/80 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 pt-3 pb-6 space-y-3 shadow-xl animate-fade-in mt-3 mx-4 rounded-2xl">
            <nav className="flex flex-col space-y-2">
              <a
                className="px-3 py-2 text-base font-normal text-slate-800 hover:text-brand-orange hover:bg-slate-50 rounded-xl transition-colors"
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </a>
              <a
                className="px-3 py-2 text-base font-normal text-slate-800 hover:text-brand-orange hover:bg-slate-50 rounded-xl transition-colors"
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                className="px-3 py-2 text-base font-normal text-slate-800 hover:text-brand-orange hover:bg-slate-50 rounded-xl transition-colors"
                href="#tips"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </a>
              <a
                className="px-3 py-2 text-base font-normal text-slate-800 hover:text-brand-orange hover:bg-slate-50 rounded-xl transition-colors"
                href="#work"
                onClick={() => setMobileMenuOpen(false)}
              >
                Work / Portfolio
              </a>
            </nav>
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full py-2.5 text-center rounded-full bg-brand-orange hover:bg-brand-orangeHover text-white font-medium text-sm shadow-sm"
              >
                Get a Quote
              </button>
              <Link
                href="/admin"
                className="w-full py-2 text-center rounded-full bg-slate-100 text-slate-700 font-medium text-xs hover:bg-slate-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Open Owner CMS
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
