'use client';

import { useState, useEffect } from 'react';
import { SiteContent } from '@/lib/cms-types';
import { defaultSiteContent } from '@/lib/default-content';

const STORAGE_KEY = 'poolify_cms_content_cache';

export function useSiteContent(initialContent?: SiteContent) {
  const [content, setContent] = useState<SiteContent>(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem(STORAGE_KEY);
        if (cached) {
          return JSON.parse(cached);
        }
      } catch {
        // ignore
      }
    }
    return initialContent || defaultSiteContent;
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const res = await fetch('/api/cms', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setContent(data);
            if (typeof window !== 'undefined') {
              try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
              } catch {
                // ignore
              }
            }
          }
        }
      } catch (err) {
        console.warn('Failed to fetch from server, using local fallback:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const saveContent = async (newContent: SiteContent): Promise<boolean> => {
    setIsSaving(true);
    setError(null);
    try {
      // Optimistic update
      setContent(newContent);
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
        } catch {
          // ignore
        }
      }

      const res = await fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContent),
      });

      if (!res.ok) {
        throw new Error('Server returned ' + res.status);
      }

      const result = await res.json();
      if (result.data) {
        setContent(result.data);
      }
      setLastSaved(new Date());
      return true;
    } catch (err) {
      console.error('Failed to save to server:', err);
      setError('Saved locally. Server persistence failed.');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const resetContent = async (): Promise<boolean> => {
    setIsSaving(true);
    setError(null);
    try {
      setContent(defaultSiteContent);
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
      }

      const res = await fetch('/api/cms/reset', { method: 'POST' });
      if (res.ok) {
        const result = await res.json();
        if (result.data) {
          setContent(result.data);
        }
      }
      setLastSaved(new Date());
      return true;
    } catch (err) {
      console.error('Failed to reset content:', err);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    content,
    setContent,
    saveContent,
    resetContent,
    isLoading,
    isSaving,
    lastSaved,
    error,
  };
}
