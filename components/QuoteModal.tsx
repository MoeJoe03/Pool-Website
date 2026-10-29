'use client';

import React, { useState } from 'react';
import { X, CheckCircle, Phone, Mail, Calendar, Waves, MapPin, ShieldCheck } from 'lucide-react';
import { SiteContent } from '@/lib/cms-types';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: SiteContent;
  defaultService?: string;
}

export default function QuoteModal({ isOpen, onClose, content, defaultService }: QuoteModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    service: defaultService || 'Weekly Maintenance',
    poolType: 'Inground Chlorine',
    urgency: 'Standard (This Week)',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-brand-navy p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-navyLight flex items-center justify-center text-brand-sky">
              <Waves className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-semibold tracking-tight">Request a Quote & Inspection</h3>
              <p className="text-xs font-normal text-slate-300">Fast, transparent pricing & dependable scheduling</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle className="w-9 h-9" />
              </div>
              <h4 className="text-2xl font-normal text-brand-navy">Quote Request Received!</h4>
              <p className="text-slate-600 font-light text-sm max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-medium text-brand-navy">{formData.name}</span>. A certified technician from{' '}
                <span className="font-medium text-brand-orange">{content.company.name}</span> will contact you shortly at{' '}
                <span className="font-medium">{formData.phone || formData.email}</span> with upfront pricing and inspection availability.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full bg-brand-orange hover:bg-brand-orangeHover text-white font-medium text-sm transition-all"
                >
                  Done
                </button>
                <a
                  href={`tel:${content.company.phone}`}
                  className="px-6 py-2.5 rounded-full border border-slate-200 text-brand-navy font-normal text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-brand-orange" />
                  Call Now: {content.company.phoneDisplay}
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-normal uppercase tracking-wider text-slate-600 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Robert Vance"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-light focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(305) 555-0199"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@estate.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Location / Zip Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="e.g. Miami Beach, FL 33139"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Desired Service
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange bg-white"
                  >
                    <option value="Weekly Maintenance">Weekly Maintenance ($149+/mo)</option>
                    <option value="Pool Cleaning & Algae Recovery">Pool Cleaning & Algae Recovery</option>
                    <option value="Repairs & Equipment Automation">Repairs & Equipment Automation</option>
                    <option value="Renovation & Remodeling">Renovation & Remodeling</option>
                    <option value="Opening & Closing">Opening & Closing</option>
                    <option value="Saltwater Conversion">Saltwater Conversion</option>
                    <option value="Custom Consultation">Custom Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Urgency / Timeline
                  </label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange bg-white"
                  >
                    <option value="Emergency (Today/Tomorrow)">Emergency (Today / Tomorrow)</option>
                    <option value="Standard (This Week)">Standard (This Week)</option>
                    <option value="Planning Next Month">Planning Ahead (Next Month)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Additional Details or Pool Size
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Describe your pool issues, equipment models, or preferred service days..."
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 rounded-full bg-brand-orange hover:bg-brand-orangeHover text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting Request...' : 'Submit Quote Request'}
                </button>
              </div>

              <p className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>No credit card required. Flat, honest pricing with zero surprise charges.</span>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
