'use client';

import React from 'react';
import { SiteContent, ArticleItem } from '@/lib/cms-types';
import { BookOpen, ArrowRight } from 'lucide-react';

interface ArticlesSectionProps {
  content: SiteContent;
  onSelectArticle: (article: ArticleItem) => void;
}

export default function ArticlesSection({ content, onSelectArticle }: ArticlesSectionProps) {
  const { articlesSection } = content;

  return (
    <section className="py-16 lg:py-24 bg-brand-bgLight border-t border-slate-200/80" id="tips">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-brand-skyDark text-xs font-semibold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5 text-brand-skyDark shrink-0" />
            <span>{articlesSection.badge.replace(/📰|[^a-zA-Z\s]/g, '').trim() || 'BLOG'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal sm:font-medium text-brand-navy tracking-tight">
            {articlesSection.heading}{' '}
            <span className="text-brand-skyDark font-semibold">{articlesSection.headingHighlight}</span>
          </h2>
          <p className="text-slate-600 font-normal mt-3 text-base">
            {articlesSection.description}
          </p>
        </div>

        {/* 3 Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articlesSection.items.map((article: ArticleItem) => (
            <article
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-subtle hover:shadow-card transition-all duration-300 group flex flex-col cursor-pointer"
            >
              <div className="h-48 overflow-hidden bg-slate-100 relative">
                <img
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={article.image}
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
                    {article.date}
                  </span>
                  <h3 className="text-lg font-medium text-brand-navy mt-1 group-hover:text-brand-skyDark transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs font-normal text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
                <span className="mt-4 text-xs font-semibold text-brand-orange group-hover:text-brand-orangeHover inline-flex items-center gap-1.5">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => {
              if (articlesSection.items.length > 0) {
                onSelectArticle(articlesSection.items[0]);
              }
            }}
            className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-brand-orange hover:bg-brand-orangeHover text-white font-medium text-sm transition-all shadow-sm hover:shadow-md cursor-pointer"
          >
            {articlesSection.ctaText}
          </button>
        </div>
      </div>
    </section>
  );
}
