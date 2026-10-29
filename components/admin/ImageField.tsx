'use client';

import React, { useState } from 'react';
import { Upload, Link as LinkIcon, Image as ImageIcon, Eye } from 'lucide-react';

interface ImageFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  helperText?: string;
  aspectRatioClass?: string;
}

export default function ImageField({
  label,
  value,
  onChange,
  helperText,
  aspectRatioClass = 'h-40',
}: ImageFieldProps) {
  const [mode, setMode] = useState<'url' | 'upload'>('url');
  const [previewError, setPreviewError] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        onChange(dataUrl);
        setPreviewError(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2 p-3 bg-slate-50 border border-slate-200/80 rounded-2xl">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
          {label}
        </label>
        <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-slate-200 text-xs">
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2 py-1 rounded-md transition-all flex items-center gap-1 ${
              mode === 'url' ? 'bg-brand-navy text-white font-medium' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <LinkIcon className="w-3 h-3" />
            URL
          </button>
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2 py-1 rounded-md transition-all flex items-center gap-1 ${
              mode === 'upload' ? 'bg-brand-navy text-white font-medium' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Upload className="w-3 h-3" />
            Upload File
          </button>
        </div>
      </div>

      {mode === 'url' ? (
        <div className="relative">
          <input
            type="url"
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              setPreviewError(false);
            }}
            placeholder="https://images.example.com/pool.jpg"
            className="w-full text-xs font-mono px-3 py-2 bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange"
          />
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-brand-orange file:text-white hover:file:bg-brand-orangeHover file:cursor-pointer cursor-pointer"
          />
        </div>
      )}

      {helperText && <p className="text-[11px] text-slate-400">{helperText}</p>}

      {/* Live Preview Box */}
      <div className="pt-2 border-t border-slate-200/60 flex items-start gap-3">
        <div
          className={`relative ${aspectRatioClass} w-36 bg-slate-200 rounded-xl overflow-hidden border border-slate-300 shrink-0 flex items-center justify-center`}
        >
          {value && !previewError ? (
            <img
              src={value}
              alt="Live Preview"
              onError={() => setPreviewError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center p-2 text-slate-400 text-xs flex flex-col items-center">
              <ImageIcon className="w-5 h-5 mb-1" />
              <span>{previewError ? 'Invalid Image' : 'No image'}</span>
            </div>
          )}
        </div>
        <div className="text-xs text-slate-500 space-y-1">
          <span className="inline-flex items-center gap-1 font-semibold text-brand-navy">
            <Eye className="w-3.5 h-3.5 text-brand-skyDark" /> Live Preview
          </span>
          <p className="text-[11px] leading-tight text-slate-400">
            Preview is updated instantly. Click &quot;Save Changes&quot; at the top to publish to the live website.
          </p>
        </div>
      </div>
    </div>
  );
}
