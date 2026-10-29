import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { defaultSiteContent } from '@/lib/default-content';
import { SiteContent } from '@/lib/cms-types';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'cms-content.json');

async function getStoredContent(): Promise<SiteContent> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const fileData = await fs.readFile(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(fileData);
    // Merge with default in case new fields were added
    return {
      ...defaultSiteContent,
      ...parsed,
      company: { ...defaultSiteContent.company, ...(parsed.company || {}) },
      navigation: { ...defaultSiteContent.navigation, ...(parsed.navigation || {}) },
      hero: { ...defaultSiteContent.hero, ...(parsed.hero || {}) },
      servicesSection: { ...defaultSiteContent.servicesSection, ...(parsed.servicesSection || {}) },
      standardsSection: { ...defaultSiteContent.standardsSection, ...(parsed.standardsSection || {}) },
      aboutSection: { ...defaultSiteContent.aboutSection, ...(parsed.aboutSection || {}) },
      portfolioSection: { ...defaultSiteContent.portfolioSection, ...(parsed.portfolioSection || {}) },
      processSection: { ...defaultSiteContent.processSection, ...(parsed.processSection || {}) },
      testimonialsSection: { ...defaultSiteContent.testimonialsSection, ...(parsed.testimonialsSection || {}) },
      articlesSection: { ...defaultSiteContent.articlesSection, ...(parsed.articlesSection || {}) },
      ctaBanner: { ...defaultSiteContent.ctaBanner, ...(parsed.ctaBanner || {}) },
      footer: { ...defaultSiteContent.footer, ...(parsed.footer || {}) },
    };
  } catch {
    // If file doesn't exist or error reading, initialize with default
    try {
      await fs.mkdir(DATA_DIR, { recursive: true });
      await fs.writeFile(DATA_FILE, JSON.stringify(defaultSiteContent, null, 2), 'utf-8');
    } catch {
      // ignore write errors if restricted
    }
    return defaultSiteContent;
  }
}

export async function GET() {
  const content = await getStoredContent();
  return NextResponse.json(content, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const updatedContent = (await req.json()) as SiteContent;
    if (!updatedContent || typeof updatedContent !== 'object') {
      return NextResponse.json({ error: 'Invalid content payload' }, { status: 400 });
    }

    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(updatedContent, null, 2), 'utf-8');

    return NextResponse.json({ success: true, data: updatedContent });
  } catch (error) {
    console.error('Failed to save CMS content:', error);
    return NextResponse.json(
      { error: 'Failed to persist content on server' },
      { status: 500 }
    );
  }
}
