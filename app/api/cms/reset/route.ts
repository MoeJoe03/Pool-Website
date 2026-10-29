import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { defaultSiteContent } from '@/lib/default-content';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'cms-content.json');

export async function POST() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(defaultSiteContent, null, 2), 'utf-8');
    return NextResponse.json({ success: true, data: defaultSiteContent });
  } catch (error) {
    console.error('Failed to reset CMS content:', error);
    return NextResponse.json(
      { error: 'Failed to reset content' },
      { status: 500 }
    );
  }
}
