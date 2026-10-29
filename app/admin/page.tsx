'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Save,
  RotateCcw,
  Eye,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Building,
  Sparkles,
  Layers,
  Award,
  Users,
  Briefcase,
  ListOrdered,
  MessageSquare,
  BookOpen,
  Send,
  RefreshCw,
} from 'lucide-react';
import { useSiteContent } from '@/hooks/use-site-content';
import { SiteContent } from '@/lib/cms-types';
import ImageField from '@/components/admin/ImageField';
import PremiumIcon from '@/components/ui/PremiumIcon';

export default function AdminPage() {
  const { content, saveContent, resetContent, isLoading, isSaving, lastSaved, error } =
    useSiteContent();

  const [formData, setFormData] = useState<SiteContent>(content);
  const [activeTab, setActiveTab] = useState<string>('branding');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSave = async () => {
    const success = await saveContent(formData);
    if (success) {
      showToast('Website changes saved and published successfully!');
    } else {
      showToast('Changes saved locally. Server status check recommended.');
    }
  };

  const handleDiscard = () => {
    if (confirm('Discard any unsaved changes and reload last saved version?')) {
      setFormData(content);
      showToast('Unsaved changes discarded.');
    }
  };

  const handleResetDefaults = async () => {
    if (
      confirm(
        'Are you sure you want to restore the original factory design and default assets? All custom edits will be reset.'
      )
    ) {
      const success = await resetContent();
      if (success) {
        showToast('Restored default website design.');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl flex items-center gap-3">
          <RefreshCw className="w-6 h-6 animate-spin text-brand-orange" />
          <span className="font-semibold text-slate-700">Loading Poolify CMS Editor...</span>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'branding', label: 'Branding & Contact', icon: Building },
    { id: 'hero', label: 'Hero Section', icon: Sparkles },
    { id: 'services', label: 'Services', icon: Layers },
    { id: 'standards', label: 'Standards & About', icon: Award },
    { id: 'portfolio', label: 'Portfolio (Work)', icon: Briefcase },
    { id: 'process', label: 'How It Works', icon: ListOrdered },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'articles', label: 'Tips & Guides', icon: BookOpen },
    { id: 'cta-footer', label: 'Banner & Footer', icon: Send },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 pb-20">
      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 text-slate-500 hover:text-brand-navy hover:bg-slate-100 rounded-xl transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Return to Public Website"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Site</span>
            </Link>
            <div className="h-4 w-px bg-slate-200"></div>
            <div>
              <h1 className="text-base font-extrabold text-brand-navy flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-orange"></span>
                <span>Poolify Business CMS</span>
              </h1>
              <p className="text-[11px] text-slate-400">
                Lightweight, password-free visual editor
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleDiscard}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition-all"
            >
              Discard
            </button>
            <button
              onClick={handleResetDefaults}
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold transition-all"
              title="Restore original design assets"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Defaults
            </button>
            <Link
              href="/"
              target="_blank"
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all"
            >
              <Eye className="w-3.5 h-3.5" />
              Preview Site
            </Link>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-brand-orange hover:bg-brand-orangeHover text-white text-xs font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>

        {/* Status & Toast Notification */}
        {toastMessage && (
          <div className="bg-emerald-600 text-white text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2 animate-fade-in">
            <CheckCircle className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
        )}
        {error && (
          <div className="bg-amber-600 text-white text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2 animate-fade-in">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Navigation Sidebar Tabs */}
          <div className="lg:col-span-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Content Sections
            </div>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                    isActive
                      ? 'bg-brand-navy text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-brand-navy'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-sky' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}

            <div className="pt-4 mt-4 border-t border-slate-100 px-3 text-[11px] text-slate-400 leading-tight">
              {lastSaved ? (
                <span>Last saved: {new Date(lastSaved).toLocaleTimeString()}</span>
              ) : (
                <span>Auto-persisted to local server storage</span>
              )}
            </div>
          </div>

          {/* Form Content Area */}
          <div className="lg:col-span-9 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-8">
            {/* TAB 1: BRANDING & CONTACT */}
            {activeTab === 'branding' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-brand-navy">Company Branding &amp; Details</h2>
                  <p className="text-xs text-slate-500">
                    Update business identity, logo, phone number, and service areas.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={formData.company.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          company: { ...formData.company, name: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Tagline
                    </label>
                    <input
                      type="text"
                      value={formData.company.tagline}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          company: { ...formData.company, tagline: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Logo Prefix (e.g. Pool)
                    </label>
                    <input
                      type="text"
                      value={formData.company.logoPrefix}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          company: { ...formData.company, logoPrefix: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Logo Suffix (Orange highlight, e.g. ify)
                    </label>
                    <input
                      type="text"
                      value={formData.company.logoSuffix}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          company: { ...formData.company, logoSuffix: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
                    />
                  </div>
                </div>

                {/* Optional Custom Logo Image */}
                <ImageField
                  label="Custom Logo Image (Optional)"
                  value={formData.company.logoImage || ''}
                  onChange={(url) =>
                    setFormData({
                      ...formData,
                      company: { ...formData.company, logoImage: url },
                    })
                  }
                  helperText="Upload your custom logo PNG/SVG or enter an image URL to replace the text logo"
                  aspectRatioClass="h-20"
                />

                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-brand-navy mb-3">Contact Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Phone (Callable tel:)
                      </label>
                      <input
                        type="text"
                        value={formData.company.phone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            company: { ...formData.company, phone: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Phone Display Text
                      </label>
                      <input
                        type="text"
                        value={formData.company.phoneDisplay}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            company: { ...formData.company, phoneDisplay: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.company.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            company: { ...formData.company, email: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Service Areas / Address
                      </label>
                      <input
                        type="text"
                        value={formData.company.address}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            company: { ...formData.company, address: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-brand-navy mb-3">Header Navigation</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Navigation CTA Button Text
                      </label>
                      <input
                        type="text"
                        value={formData.navigation.ctaText}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            navigation: { ...formData.navigation, ctaText: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: HERO SECTION */}
            {activeTab === 'hero' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-brand-navy">Hero Section Settings</h2>
                  <p className="text-xs text-slate-500">
                    Customise the main banner image, headline, trust badge, and calls-to-action.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Trust Badge Eyebrow
                  </label>
                  <input
                    type="text"
                    value={formData.hero.trustBadge}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hero: { ...formData.hero, trustBadge: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Headline Line 1
                    </label>
                    <input
                      type="text"
                      value={formData.hero.titleLine1}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hero: { ...formData.hero, titleLine1: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Highlighted Word(s)
                    </label>
                    <input
                      type="text"
                      value={formData.hero.titleHighlight}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hero: { ...formData.hero, titleHighlight: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 text-brand-skyDark font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Headline Line 2
                    </label>
                    <input
                      type="text"
                      value={formData.hero.titleLine2}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hero: { ...formData.hero, titleLine2: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Hero Subtitle
                  </label>
                  <textarea
                    rows={3}
                    value={formData.hero.subtitle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hero: { ...formData.hero, subtitle: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-orange focus:border-brand-orange resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Primary CTA Button Text
                    </label>
                    <input
                      type="text"
                      value={formData.hero.primaryCtaText}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hero: { ...formData.hero, primaryCtaText: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Secondary CTA Button Text
                    </label>
                    <input
                      type="text"
                      value={formData.hero.secondaryCtaText}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hero: { ...formData.hero, secondaryCtaText: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200"
                    />
                  </div>
                </div>

                {/* Hero Backdrop Image with Live Preview */}
                <ImageField
                  label="Hero Background Pool Image"
                  value={formData.hero.bgImage}
                  onChange={(url) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, bgImage: url },
                    })
                  }
                  helperText="Primary background image for the main hero card. Choose high-resolution landscape pool images."
                  aspectRatioClass="h-44"
                />

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Rating Text (Social Proof)
                  </label>
                  <input
                    type="text"
                    value={formData.hero.ratingText}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hero: { ...formData.hero, ratingText: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200"
                  />
                </div>
              </div>
            )}

            {/* TAB 3: SERVICES */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-brand-navy">Pool Services Management</h2>
                  <p className="text-xs text-slate-500">
                    Edit service titles, descriptions, price points, and photo cards.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Section Header &amp; Micro Highlight
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">Heading</label>
                      <input
                        type="text"
                        value={formData.servicesSection.heading}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            servicesSection: {
                              ...formData.servicesSection,
                              heading: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">Highlight Word</label>
                      <input
                        type="text"
                        value={formData.servicesSection.headingHighlight}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            servicesSection: {
                              ...formData.servicesSection,
                              headingHighlight: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 text-brand-skyDark font-bold"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={formData.servicesSection.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          servicesSection: {
                            ...formData.servicesSection,
                            description: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                    />
                  </div>
                </div>

                {/* Service Cards List */}
                <div className="space-y-6">
                  {formData.servicesSection.items.map((service, idx) => (
                    <div
                      key={service.id}
                      className="p-5 rounded-2xl border border-slate-200/90 bg-white shadow-subtle space-y-4"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <span className="text-xs font-bold text-brand-navy flex items-center gap-2">
                          <PremiumIcon nameOrEmoji={service.icon} className="w-4 h-4 text-brand-orange" />
                          <span>Service {idx + 1}: {service.title}</span>
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">{service.id}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                        <div className="sm:col-span-3">
                          <label className="block text-[11px] font-bold text-slate-500 mb-1">Icon Key</label>
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                              <PremiumIcon nameOrEmoji={service.icon} className="w-4 h-4 text-brand-orange" />
                            </div>
                            <input
                              type="text"
                              value={service.icon}
                              onChange={(e) => {
                                const updated = [...formData.servicesSection.items];
                                updated[idx].icon = e.target.value;
                                setFormData({
                                  ...formData,
                                  servicesSection: {
                                    ...formData.servicesSection,
                                    items: updated,
                                  },
                                });
                              }}
                              className="w-full px-2 py-1 text-xs rounded-lg border border-slate-200"
                              placeholder="e.g. Calendar"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-5">
                          <label className="block text-[11px] font-bold text-slate-500 mb-1">Title</label>
                          <input
                            type="text"
                            value={service.title}
                            onChange={(e) => {
                              const updated = [...formData.servicesSection.items];
                              updated[idx].title = e.target.value;
                              setFormData({
                                ...formData,
                                servicesSection: {
                                  ...formData.servicesSection,
                                  items: updated,
                                },
                              });
                            }}
                            className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 font-bold"
                          />
                        </div>
                        <div className="sm:col-span-4">
                          <label className="block text-[11px] font-bold text-slate-500 mb-1">Price Note</label>
                          <input
                            type="text"
                            value={service.priceNote}
                            onChange={(e) => {
                              const updated = [...formData.servicesSection.items];
                              updated[idx].priceNote = e.target.value;
                              setFormData({
                                ...formData,
                                servicesSection: {
                                  ...formData.servicesSection,
                                  items: updated,
                                },
                              });
                            }}
                            className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={service.description}
                          onChange={(e) => {
                            const updated = [...formData.servicesSection.items];
                            updated[idx].description = e.target.value;
                            setFormData({
                              ...formData,
                              servicesSection: {
                                ...formData.servicesSection,
                                items: updated,
                              },
                            });
                          }}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                        />
                      </div>

                      <ImageField
                        label={`Card Image for ${service.title}`}
                        value={service.image}
                        onChange={(url) => {
                          const updated = [...formData.servicesSection.items];
                          updated[idx].image = url;
                          setFormData({
                            ...formData,
                            servicesSection: {
                              ...formData.servicesSection,
                              items: updated,
                            },
                          });
                        }}
                        helperText="Upload image or supply URL for this service card"
                        aspectRatioClass="h-28"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: STANDARDS & ABOUT */}
            {activeTab === 'standards' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-brand-navy">Standards &amp; About Us</h2>
                  <p className="text-xs text-slate-500">
                    Edit the 4 pillar cards and the About Us story section.
                  </p>
                </div>

                {/* 4 Pillars */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-brand-navy">The Poolify Standard (4 Pillars)</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {formData.standardsSection.pillars.map((pillar, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 text-brand-navy">
                            <PremiumIcon nameOrEmoji={pillar.icon || pillar.title} className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            value={pillar.icon}
                            onChange={(e) => {
                              const updated = [...formData.standardsSection.pillars];
                              updated[idx].icon = e.target.value;
                              setFormData({
                                ...formData,
                                standardsSection: {
                                  ...formData.standardsSection,
                                  pillars: updated,
                                },
                              });
                            }}
                            className="w-20 px-2 py-1 text-center text-xs rounded border border-slate-200 bg-white"
                            placeholder="Icon"
                          />
                          <input
                            type="text"
                            value={pillar.title}
                            onChange={(e) => {
                              const updated = [...formData.standardsSection.pillars];
                              updated[idx].title = e.target.value;
                              setFormData({
                                ...formData,
                                standardsSection: {
                                  ...formData.standardsSection,
                                  pillars: updated,
                                },
                              });
                            }}
                            className="flex-1 px-3 py-1 text-xs rounded border border-slate-200 font-bold bg-white"
                          />
                        </div>
                        <textarea
                          rows={2}
                          value={pillar.description}
                          onChange={(e) => {
                            const updated = [...formData.standardsSection.pillars];
                            updated[idx].description = e.target.value;
                            setFormData({
                              ...formData,
                              standardsSection: {
                                ...formData.standardsSection,
                                pillars: updated,
                              },
                            });
                          }}
                          className="w-full px-3 py-1.5 text-xs rounded border border-slate-200 bg-white"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* About Section */}
                <div className="pt-6 border-t border-slate-100 space-y-4">
                  <h3 className="text-sm font-bold text-brand-navy">About Section Story &amp; Crew Photo</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">Heading</label>
                      <input
                        type="text"
                        value={formData.aboutSection.heading}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            aboutSection: {
                              ...formData.aboutSection,
                              heading: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">Highlight</label>
                      <input
                        type="text"
                        value={formData.aboutSection.headingHighlight}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            aboutSection: {
                              ...formData.aboutSection,
                              headingHighlight: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 text-brand-skyDark font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Story Paragraph</label>
                    <textarea
                      rows={3}
                      value={formData.aboutSection.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          aboutSection: {
                            ...formData.aboutSection,
                            description: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                    />
                  </div>

                  {/* Bullet points */}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-bold text-slate-500">Key Guarantees / Bullets</label>
                    {formData.aboutSection.bulletPoints.map((point, idx) => (
                      <input
                        key={idx}
                        type="text"
                        value={point}
                        onChange={(e) => {
                          const updated = [...formData.aboutSection.bulletPoints];
                          updated[idx] = e.target.value;
                          setFormData({
                            ...formData,
                            aboutSection: {
                              ...formData.aboutSection,
                              bulletPoints: updated,
                            },
                          });
                        }}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                      />
                    ))}
                  </div>

                  {/* About Section Image */}
                  <ImageField
                    label="About Section Technician / Team Photo"
                    value={formData.aboutSection.image}
                    onChange={(url) =>
                      setFormData({
                        ...formData,
                        aboutSection: {
                          ...formData.aboutSection,
                          image: url,
                        },
                      })
                    }
                    helperText="Photo of pool technicians or estate service crew"
                    aspectRatioClass="h-36"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">Image Badge</label>
                      <input
                        type="text"
                        value={formData.aboutSection.imageBadge}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            aboutSection: {
                              ...formData.aboutSection,
                              imageBadge: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">Image Title</label>
                      <input
                        type="text"
                        value={formData.aboutSection.imageTitle}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            aboutSection: {
                              ...formData.aboutSection,
                              imageTitle: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 font-bold"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: PORTFOLIO */}
            {activeTab === 'portfolio' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-brand-navy">Portfolio &amp; Project Showcases</h2>
                  <p className="text-xs text-slate-500">
                    Update showcase projects, before/after photos, locations, and descriptions.
                  </p>
                </div>

                <div className="space-y-6">
                  {formData.portfolioSection.items.map((project, idx) => (
                    <div
                      key={project.id}
                      className="p-5 rounded-2xl border border-slate-200/90 bg-white shadow-subtle space-y-4"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <span className="text-xs font-bold text-brand-navy">
                          Project {idx + 1}: {project.title}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">{project.id}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-500 mb-1">Badge Tag</label>
                          <input
                            type="text"
                            value={project.badge}
                            onChange={(e) => {
                              const updated = [...formData.portfolioSection.items];
                              updated[idx].badge = e.target.value;
                              setFormData({
                                ...formData,
                                portfolioSection: {
                                  ...formData.portfolioSection,
                                  items: updated,
                                },
                              });
                            }}
                            className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-500 mb-1">Location</label>
                          <input
                            type="text"
                            value={project.location}
                            onChange={(e) => {
                              const updated = [...formData.portfolioSection.items];
                              updated[idx].location = e.target.value;
                              setFormData({
                                ...formData,
                                portfolioSection: {
                                  ...formData.portfolioSection,
                                  items: updated,
                                },
                              });
                            }}
                            className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-500 mb-1">Button Text</label>
                          <input
                            type="text"
                            value={project.buttonText}
                            onChange={(e) => {
                              const updated = [...formData.portfolioSection.items];
                              updated[idx].buttonText = e.target.value;
                              setFormData({
                                ...formData,
                                portfolioSection: {
                                  ...formData.portfolioSection,
                                  items: updated,
                                },
                              });
                            }}
                            className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-1">Project Title</label>
                        <input
                          type="text"
                          value={project.title}
                          onChange={(e) => {
                            const updated = [...formData.portfolioSection.items];
                            updated[idx].title = e.target.value;
                            setFormData({
                              ...formData,
                              portfolioSection: {
                                ...formData.portfolioSection,
                                items: updated,
                              },
                            });
                          }}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={project.description}
                          onChange={(e) => {
                            const updated = [...formData.portfolioSection.items];
                            updated[idx].description = e.target.value;
                            setFormData({
                              ...formData,
                              portfolioSection: {
                                ...formData.portfolioSection,
                                items: updated,
                              },
                            });
                          }}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                        />
                      </div>

                      <ImageField
                        label={`Project Photo: ${project.title}`}
                        value={project.image}
                        onChange={(url) => {
                          const updated = [...formData.portfolioSection.items];
                          updated[idx].image = url;
                          setFormData({
                            ...formData,
                            portfolioSection: {
                              ...formData.portfolioSection,
                              items: updated,
                            },
                          });
                        }}
                        helperText="Upload or link high-resolution project completion photo"
                        aspectRatioClass="h-36"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 6: HOW IT WORKS */}
            {activeTab === 'process' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-brand-navy">How It Works (Process)</h2>
                  <p className="text-xs text-slate-500">
                    Edit the 4 simple steps shown to prospective customers.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {formData.processSection.steps.map((stepItem, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-brand-sky/20 text-brand-skyDark font-bold flex items-center justify-center text-xs">
                          {stepItem.step}
                        </span>
                        <input
                          type="text"
                          value={stepItem.title}
                          onChange={(e) => {
                            const updated = [...formData.processSection.steps];
                            updated[idx].title = e.target.value;
                            setFormData({
                              ...formData,
                              processSection: {
                                ...formData.processSection,
                                steps: updated,
                              },
                            });
                          }}
                          className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-200 font-bold bg-white"
                        />
                      </div>
                      <textarea
                        rows={2}
                        value={stepItem.description}
                        onChange={(e) => {
                          const updated = [...formData.processSection.steps];
                          updated[idx].description = e.target.value;
                          setFormData({
                            ...formData,
                            processSection: {
                              ...formData.processSection,
                              steps: updated,
                            },
                          });
                        }}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 7: TESTIMONIALS */}
            {activeTab === 'testimonials' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-brand-navy">Client Testimonials</h2>
                  <p className="text-xs text-slate-500">
                    Edit featured quote, reviews, client names, and avatar photos.
                  </p>
                </div>

                {/* Featured Testimonial Card */}
                <div className="p-5 rounded-2xl border border-brand-sky/30 bg-sky-50/50 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-skyDark">
                    Featured Hero Testimonial (Left Photo Card)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">Author Name</label>
                      <input
                        type="text"
                        value={formData.testimonialsSection.featured.author}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            testimonialsSection: {
                              ...formData.testimonialsSection,
                              featured: {
                                ...formData.testimonialsSection.featured,
                                author: e.target.value,
                              },
                            },
                          })
                        }
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">Estate / Role</label>
                      <input
                        type="text"
                        value={formData.testimonialsSection.featured.role}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            testimonialsSection: {
                              ...formData.testimonialsSection,
                              featured: {
                                ...formData.testimonialsSection.featured,
                                role: e.target.value,
                              },
                            },
                          })
                        }
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Quote Text</label>
                    <textarea
                      rows={2}
                      value={formData.testimonialsSection.featured.quote}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          testimonialsSection: {
                            ...formData.testimonialsSection,
                            featured: {
                              ...formData.testimonialsSection.featured,
                              quote: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                  <ImageField
                    label="Featured Customer Pool Lifestyle Image"
                    value={formData.testimonialsSection.featured.image}
                    onChange={(url) =>
                      setFormData({
                        ...formData,
                        testimonialsSection: {
                          ...formData.testimonialsSection,
                          featured: {
                            ...formData.testimonialsSection.featured,
                            image: url,
                          },
                        },
                      })
                    }
                    helperText="Portrait or vertical pool lifestyle photo"
                    aspectRatioClass="h-32"
                  />
                </div>

                {/* 3 Review Cards */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Review Cards (Right Stack)
                  </h3>
                  {formData.testimonialsSection.reviews.map((review, idx) => (
                    <div key={review.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-500 mb-1">Client Name</label>
                          <input
                            type="text"
                            value={review.name}
                            onChange={(e) => {
                              const updated = [...formData.testimonialsSection.reviews];
                              updated[idx].name = e.target.value;
                              setFormData({
                                ...formData,
                                testimonialsSection: {
                                  ...formData.testimonialsSection,
                                  reviews: updated,
                                },
                              });
                            }}
                            className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-500 mb-1">Location</label>
                          <input
                            type="text"
                            value={review.location}
                            onChange={(e) => {
                              const updated = [...formData.testimonialsSection.reviews];
                              updated[idx].location = e.target.value;
                              setFormData({
                                ...formData,
                                testimonialsSection: {
                                  ...formData.testimonialsSection,
                                  reviews: updated,
                                },
                              });
                            }}
                            className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-500 mb-1">Service Type</label>
                          <input
                            type="text"
                            value={review.role}
                            onChange={(e) => {
                              const updated = [...formData.testimonialsSection.reviews];
                              updated[idx].role = e.target.value;
                              setFormData({
                                ...formData,
                                testimonialsSection: {
                                  ...formData.testimonialsSection,
                                  reviews: updated,
                                },
                              });
                            }}
                            className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-1">Testimonial Quote</label>
                        <textarea
                          rows={2}
                          value={review.quote}
                          onChange={(e) => {
                            const updated = [...formData.testimonialsSection.reviews];
                            updated[idx].quote = e.target.value;
                            setFormData({
                              ...formData,
                              testimonialsSection: {
                                ...formData.testimonialsSection,
                                reviews: updated,
                              },
                            });
                          }}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                        />
                      </div>

                      <ImageField
                        label={`Avatar for ${review.name}`}
                        value={review.avatar}
                        onChange={(url) => {
                          const updated = [...formData.testimonialsSection.reviews];
                          updated[idx].avatar = url;
                          setFormData({
                            ...formData,
                            testimonialsSection: {
                              ...formData.testimonialsSection,
                              reviews: updated,
                            },
                          });
                        }}
                        helperText="Customer profile photo"
                        aspectRatioClass="h-20 w-20"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 8: ARTICLES & GUIDES */}
            {activeTab === 'articles' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-brand-navy">Tips &amp; Guides (Blog)</h2>
                  <p className="text-xs text-slate-500">
                    Edit pool care advice articles, guides, dates, and cover images.
                  </p>
                </div>

                <div className="space-y-6">
                  {formData.articlesSection.items.map((article, idx) => (
                    <div
                      key={article.id}
                      className="p-5 rounded-2xl border border-slate-200/90 bg-white shadow-subtle space-y-4"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <span className="text-xs font-bold text-brand-navy">
                          Article {idx + 1}: {article.title}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">{article.id}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-bold text-slate-500 mb-1">Article Title</label>
                          <input
                            type="text"
                            value={article.title}
                            onChange={(e) => {
                              const updated = [...formData.articlesSection.items];
                              updated[idx].title = e.target.value;
                              setFormData({
                                ...formData,
                                articlesSection: {
                                  ...formData.articlesSection,
                                  items: updated,
                                },
                              });
                            }}
                            className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-500 mb-1">Publish Date</label>
                          <input
                            type="text"
                            value={article.date}
                            onChange={(e) => {
                              const updated = [...formData.articlesSection.items];
                              updated[idx].date = e.target.value;
                              setFormData({
                                ...formData,
                                articlesSection: {
                                  ...formData.articlesSection,
                                  items: updated,
                                },
                              });
                            }}
                            className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-1">Short Summary</label>
                        <textarea
                          rows={2}
                          value={article.summary}
                          onChange={(e) => {
                            const updated = [...formData.articlesSection.items];
                            updated[idx].summary = e.target.value;
                            setFormData({
                              ...formData,
                              articlesSection: {
                                ...formData.articlesSection,
                                items: updated,
                              },
                            });
                          }}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-1">
                          Full Guide Content (Modal Reader)
                        </label>
                        <textarea
                          rows={4}
                          value={article.content || ''}
                          onChange={(e) => {
                            const updated = [...formData.articlesSection.items];
                            updated[idx].content = e.target.value;
                            setFormData({
                              ...formData,
                              articlesSection: {
                                ...formData.articlesSection,
                                items: updated,
                              },
                            });
                          }}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 font-mono text-[11px]"
                        />
                      </div>

                      <ImageField
                        label={`Article Cover Image for ${article.title}`}
                        value={article.image}
                        onChange={(url) => {
                          const updated = [...formData.articlesSection.items];
                          updated[idx].image = url;
                          setFormData({
                            ...formData,
                            articlesSection: {
                              ...formData.articlesSection,
                              items: updated,
                            },
                          });
                        }}
                        helperText="Editorial article cover image"
                        aspectRatioClass="h-28"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 9: BANNER & FOOTER */}
            {activeTab === 'cta-footer' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-brand-navy">Call to Action Banner &amp; Footer</h2>
                  <p className="text-xs text-slate-500">
                    Edit the final booking banner, newsletter copy, and footer watermark.
                  </p>
                </div>

                {/* CTA Banner */}
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-navy">
                    Final Call-to-Action Card
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">Badge</label>
                      <input
                        type="text"
                        value={formData.ctaBanner.badge}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            ctaBanner: { ...formData.ctaBanner, badge: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">Button Text</label>
                      <input
                        type="text"
                        value={formData.ctaBanner.buttonText}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            ctaBanner: { ...formData.ctaBanner, buttonText: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">Headline Line 1</label>
                      <input
                        type="text"
                        value={formData.ctaBanner.headingLine1}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            ctaBanner: { ...formData.ctaBanner, headingLine1: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">Headline Line 2</label>
                      <input
                        type="text"
                        value={formData.ctaBanner.headingLine2}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            ctaBanner: { ...formData.ctaBanner, headingLine2: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={formData.ctaBanner.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          ctaBanner: { ...formData.ctaBanner, description: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                    />
                  </div>

                  <ImageField
                    label="Banner Right Photo"
                    value={formData.ctaBanner.image}
                    onChange={(url) =>
                      setFormData({
                        ...formData,
                        ctaBanner: { ...formData.ctaBanner, image: url },
                      })
                    }
                    helperText="Right half of banner, high-res poolside photo"
                    aspectRatioClass="h-32"
                  />
                </div>

                {/* Footer details */}
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-navy">
                    Footer &amp; Newsletter
                  </h3>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">
                      Newsletter Description
                    </label>
                    <textarea
                      rows={2}
                      value={formData.footer.newsletterDesc}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          footer: { ...formData.footer, newsletterDesc: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">
                        Watermark Large Text
                      </label>
                      <input
                        type="text"
                        value={formData.footer.watermarkText}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            footer: { ...formData.footer, watermarkText: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">
                        Certified Badge Label
                      </label>
                      <input
                        type="text"
                        value={formData.footer.cpoBadgeText}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            footer: { ...formData.footer, cpoBadgeText: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Save CTA bar */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                <span>All edits take immediate effect on the live website after clicking </span>
                <span className="font-bold text-brand-navy">&quot;Save Changes&quot;</span>.
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDiscard}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold"
                >
                  Discard Changes
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orangeHover text-white text-xs font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? 'Saving Changes...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
