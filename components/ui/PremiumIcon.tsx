'use client';

import React from 'react';
import {
  Calendar,
  Droplets,
  Settings,
  Wrench,
  Sparkles,
  Snowflake,
  Waves,
  Award,
  Trophy,
  Clock,
  ShieldCheck,
  Tag,
  Zap,
  CheckCircle,
  LucideProps,
} from 'lucide-react';

interface PremiumIconProps {
  nameOrEmoji?: string;
  className?: string;
  fallback?: React.ReactNode;
}

export default function PremiumIcon({
  nameOrEmoji = '',
  className = 'w-5 h-5',
  fallback,
}: PremiumIconProps) {
  const normalized = nameOrEmoji.trim().toLowerCase();

  // Weekly Maintenance / Calendar
  if (nameOrEmoji.includes('📅') || normalized.includes('calendar') || normalized.includes('week')) {
    return <Calendar className={className} strokeWidth={2.2} />;
  }

  // Pool Cleaning & Algae Recovery / Droplets
  if (nameOrEmoji.includes('💧') || normalized.includes('drop') || normalized.includes('clean') || normalized.includes('algae')) {
    return <Droplets className={className} strokeWidth={2.2} />;
  }

  // Repairs & Equipment Automation / Settings or Wrench
  if (nameOrEmoji.includes('⚙️') || normalized.includes('gear') || normalized.includes('repair') || normalized.includes('automation') || normalized.includes('equip')) {
    return <Settings className={className} strokeWidth={2.2} />;
  }

  // Renovation & Remodeling / Sparkles or Wrench
  if (nameOrEmoji.includes('🛠️') || normalized.includes('renov') || normalized.includes('remodel') || normalized.includes('tool')) {
    return <Wrench className={className} strokeWidth={2.2} />;
  }

  // Opening & Closing / Snowflake
  if (nameOrEmoji.includes('❄️') || normalized.includes('snow') || normalized.includes('open') || normalized.includes('close') || normalized.includes('season')) {
    return <Snowflake className={className} strokeWidth={2.2} />;
  }

  // Saltwater Conversion / Waves
  if (nameOrEmoji.includes('🧂') || normalized.includes('salt') || normalized.includes('wave') || normalized.includes('water')) {
    return <Waves className={className} strokeWidth={2.2} />;
  }

  // Standards: Years of Experience / Trophy / Award
  if (nameOrEmoji.includes('🏆') || normalized.includes('trophy') || normalized.includes('experien') || normalized.includes('award')) {
    return <Award className={className} strokeWidth={2.2} />;
  }

  // Standards: On-Time Service / Clock
  if (nameOrEmoji.includes('⏱️') || nameOrEmoji.includes('⏰') || normalized.includes('clock') || normalized.includes('time')) {
    return <Clock className={className} strokeWidth={2.2} />;
  }

  // Standards: Quality Workmanship / Shield
  if (nameOrEmoji.includes('🛡️') || normalized.includes('shield') || normalized.includes('qualit')) {
    return <ShieldCheck className={className} strokeWidth={2.2} />;
  }

  // Standards: Transparent Pricing / Tag
  if (nameOrEmoji.includes('🏷️') || normalized.includes('tag') || normalized.includes('price') || normalized.includes('transpar')) {
    return <Tag className={className} strokeWidth={2.2} />;
  }

  if (nameOrEmoji.includes('⚡') || normalized.includes('zap') || normalized.includes('bolt')) {
    return <Zap className={className} strokeWidth={2.2} />;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  // Default elegant pool icon fallback
  return <Sparkles className={className} strokeWidth={2.2} />;
}
