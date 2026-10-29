'use client';

import React, { useState } from 'react';
import { useSiteContent } from '@/hooks/use-site-content';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ServicesSection from '@/components/ServicesSection';
import StandardsSection from '@/components/StandardsSection';
import AboutSection from '@/components/AboutSection';
import PortfolioSection from '@/components/PortfolioSection';
import ProcessSection from '@/components/ProcessSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ArticlesSection from '@/components/ArticlesSection';
import CtaBanner from '@/components/CtaBanner';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';
import ArticleModal from '@/components/ArticleModal';
import { ArticleItem } from '@/lib/cms-types';

export default function HomePage() {
  const { content } = useSiteContent();

  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('Weekly Maintenance');
  const [activeArticle, setActiveArticle] = useState<ArticleItem | null>(null);

  const handleOpenQuote = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    setIsQuoteOpen(true);
  };

  return (
    <div className="min-h-screen bg-brand-bgLight text-slate-800 antialiased selection:bg-brand-orange selection:text-white">
      {/* Sticky Navigation */}
      <Header
        content={content}
        onOpenQuote={() => handleOpenQuote('Weekly Maintenance')}
      />

      <main>
        {/* Hero Section */}
        <Hero
          content={content}
          onOpenQuote={() => handleOpenQuote('Weekly Maintenance')}
        />

        {/* Services Section */}
        <ServicesSection
          content={content}
          onSelectService={(serviceTitle) => handleOpenQuote(serviceTitle)}
        />

        {/* The Poolify Standard */}
        <StandardsSection content={content} />

        {/* About Us Section */}
        <AboutSection
          content={content}
          onOpenQuote={() => handleOpenQuote('Weekly Maintenance')}
        />

        {/* Work We're Proud Of (Portfolio) */}
        <PortfolioSection
          content={content}
          onOpenQuote={(projectTitle) => handleOpenQuote(projectTitle || 'Custom Build')}
        />

        {/* How It Works (Process) */}
        <ProcessSection content={content} />

        {/* Testimonials */}
        <TestimonialsSection content={content} />

        {/* Tips & Guides (Blog) */}
        <ArticlesSection
          content={content}
          onSelectArticle={(article) => setActiveArticle(article)}
        />

        {/* Call to Action Banner */}
        <CtaBanner
          content={content}
          onOpenQuote={() => handleOpenQuote('Inspection & Deep Clean')}
        />
      </main>

      {/* Main Footer */}
      <Footer content={content} />

      {/* Interactive Quote & Enquiry Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        content={content}
        defaultService={selectedService}
      />

      {/* Interactive Guide / Article Reader Modal */}
      <ArticleModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
        onOpenQuote={() => handleOpenQuote('Weekly Maintenance')}
      />
    </div>
  );
}
