'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

const COUNTRIES = [
  { label: 'India', value: 'IN' },
  { label: 'United States', value: 'US' },
  { label: 'United Kingdom', value: 'GB' },
  { label: 'UAE', value: 'AE' },
  { label: 'Canada', value: 'CA' },
];

const AD_TYPES = [
  { label: 'All Formats', value: 'ALL' },
  { label: 'Image', value: 'IMAGE' },
  { label: 'Video', value: 'VIDEO' },
];

function platformLabel(p) {
  if (p === 'facebook') return 'Facebook';
  if (p === 'instagram') return 'Instagram';
  return p.charAt(0).toUpperCase() + p.slice(1);
}

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
}

function AdCard({ ad }) {
  const isActive = !ad.ad_delivery_stop_time;
  const body = ad.ad_creative_body || ad.ad_creative_link_title || '';
  const platforms = ad.publisher_platforms || [];

  return (
    <div
      className="rounded-2xl flex flex-col gap-4 overflow-hidden"
      style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}
    >
      {/* Top accent line */}
      <div
        className="h-px w-full"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)' }}
      />

      <div className="px-5 pb-5 flex flex-col gap-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}
            >
              {(ad.page_name || 'A').charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-[#0f172a] font-semibold text-sm truncate">
                {ad.page_name || 'Unknown Advertiser'}
              </p>
              <p className="text-[#94a3b8] text-[11px] mt-0.5">Ad ID: {ad.id}</p>
            </div>
          </div>

          {/* Status badge */}
          <span
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold flex-shrink-0 ${
              isActive
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-slate-100 text-slate-500 border border-slate-200'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-slate-400'}`} />
            {isActive ? 'Active' : 'Inactive'}
          </span>
        </div>

        {/* Ad body */}
        {body ? (
          <p className="text-[#475569] text-sm leading-relaxed line-clamp-3">
            {body}
          </p>
        ) : (
          <p className="text-[#94a3b8] text-sm italic">No ad copy available</p>
        )}

        {/* Meta row */}
        <div className="flex items-center gap-4 text-[11px] text-[#64748b]">
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-[#94a3b8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Started {formatDate(ad.ad_delivery_start_time)}</span>
          </div>

          {!isActive && (
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-[#94a3b8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Ended {formatDate(ad.ad_delivery_stop_time)}</span>
            </div>
          )}
        </div>

        {/* Platforms */}
        {platforms.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            {platforms.map((p) => (
              <span
                key={p}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium border"
                style={{
                  backgroundColor: p === 'instagram' ? '#fdf2f8' : '#eff6ff',
                  borderColor: p === 'instagram' ? '#f9a8d4' : '#bfdbfe',
                  color: p === 'instagram' ? '#9d174d' : '#1e40af',
                }}
              >
                {p === 'facebook' ? (
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                ) : (
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                )}
                {platformLabel(p)}
              </span>
            ))}
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-[#e2e8f0]" />

        {/* View button */}
        <a
          href={ad.ad_snapshot_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-[#7c3aed] transition-all duration-150 hover:bg-violet-50 active:scale-[0.98]"
          style={{ border: '1px solid #e2e8f0' }}
        >
          View Full Ad
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default function CompetitorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [country, setCountry] = useState('IN');
  const [adType, setAdType] = useState('ALL');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  async function handleSearch(e) {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);
    setResults([]);
    setSearched(true);

    try {
      const params = new URLSearchParams({
        q: searchTerm.trim(),
        country,
        media_type: adType,
      });
      const res = await fetch(`/api/competitors/search?${params}`);
      const json = await res.json();

      if (!res.ok) {
        setError(json.error?.message || json.error || 'Failed to fetch ads');
        return;
      }

      setResults(json.data || []);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
      <Navbar />
      <Sidebar />

      <main className="ml-[240px] pt-[60px] min-h-screen p-8" style={{ backgroundColor: '#ffffff' }}>

        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-[32px] font-bold text-[#0f172a] leading-tight tracking-tight">
            Competitor Watch
          </h1>
          <p className="text-[#64748b] text-base mt-2">
            Search the Meta Ads Library to see what your competitors are running
          </p>
        </div>

        {/* Search form */}
        <form
          onSubmit={handleSearch}
          className="rounded-2xl p-6 mb-8"
          style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search input */}
            <div className="flex-1 relative">
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8] pointer-events-none"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter competitor brand or page name"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-[#0f172a] placeholder-[#94a3b8] outline-none focus:ring-2 focus:ring-violet-400/50 transition-all"
                style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0' }}
              />
            </div>

            {/* Country dropdown */}
            <div className="relative">
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="appearance-none pl-4 pr-9 py-2.5 rounded-xl text-sm text-[#0f172a] outline-none focus:ring-2 focus:ring-violet-400/50 cursor-pointer transition-all"
                style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', minWidth: '160px' }}
              >
                {COUNTRIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8] pointer-events-none"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Ad type dropdown */}
            <div className="relative">
              <select
                value={adType}
                onChange={(e) => setAdType(e.target.value)}
                className="appearance-none pl-4 pr-9 py-2.5 rounded-xl text-sm text-[#0f172a] outline-none focus:ring-2 focus:ring-violet-400/50 cursor-pointer transition-all"
                style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', minWidth: '140px' }}
              >
                {AD_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8] pointer-events-none"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Search button */}
            <button
              type="submit"
              disabled={loading || !searchTerm.trim()}
              className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
                boxShadow: '0 0 16px rgba(124,58,237,0.25)',
              }}
            >
              {loading ? (
                <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
              Search Competitor Ads
            </button>
          </div>
        </form>

        {/* Error state */}
        {error && (
          <div className="mb-6 flex items-start gap-3 px-4 py-3 rounded-xl border border-red-200 bg-red-50">
            <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-red-700 text-sm font-medium">Failed to fetch ads</p>
              <p className="text-red-600 text-xs mt-0.5">{typeof error === 'string' ? error : JSON.stringify(error)}</p>
            </div>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl p-5 flex flex-col gap-4 animate-pulse"
                style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#e2e8f0]" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-[#e2e8f0] rounded w-1/2" />
                    <div className="h-2 bg-[#e2e8f0] rounded w-1/3" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-[#e2e8f0] rounded" />
                  <div className="h-3 bg-[#e2e8f0] rounded w-4/5" />
                  <div className="h-3 bg-[#e2e8f0] rounded w-3/5" />
                </div>
                <div className="h-8 bg-[#e2e8f0] rounded-xl" />
              </div>
            ))}
          </div>
        )}

        {/* Results */}
        {!loading && results.length > 0 && (
          <>
            <div className="flex items-center gap-2 mb-5">
              <h2 className="text-[#0f172a] font-bold text-lg">
                Results for &ldquo;{searchTerm}&rdquo;
              </h2>
              <span className="text-[11px] font-semibold text-violet-600 bg-violet-50 border border-violet-200 px-2 py-0.5 rounded-full">
                {results.length} ads found
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {results.map((ad) => (
                <AdCard key={ad.id} ad={ad} />
              ))}
            </div>
          </>
        )}

        {/* Empty state */}
        {!loading && searched && results.length === 0 && !error && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
              style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}
            >
              <svg className="w-8 h-8 text-[#94a3b8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-[#0f172a] font-semibold text-lg">No ads found</p>
            <p className="text-[#64748b] text-sm mt-1">
              Try a different search term, country, or ad type
            </p>
          </div>
        )}

        {/* Initial empty state (before first search) */}
        {!loading && !searched && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
              style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}
            >
              <svg className="w-8 h-8 text-[#94a3b8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <p className="text-[#0f172a] font-semibold text-lg">Start watching competitors</p>
            <p className="text-[#64748b] text-sm mt-1 max-w-xs">
              Search for any brand to see their active ads from the Meta Ads Library
            </p>
          </div>
        )}

      </main>
    </div>
  );
}
