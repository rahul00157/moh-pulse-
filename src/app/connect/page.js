'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { generateMetaAuthURL } from '@/lib/metaApi';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

function ConnectContent() {
  const searchParams = useSearchParams();
  const success = searchParams.get('success') === 'true';
  const error = searchParams.get('error');

  const [loading, setLoading] = useState(true);
  const [isMetaConnected, setIsMetaConnected] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    async function init() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setLoading(false);
        return;
      }
      setAccessToken(session.access_token);

      const { data } = await supabase
        .from('connections')
        .select('id')
        .eq('user_id', session.user.id)
        .eq('platform', 'meta')
        .maybeSingle();

      setIsMetaConnected(!!data);
      setLoading(false);
    }
    init();
  }, [success]);

  function handleConnectMeta() {
    const url = generateMetaAuthURL(accessToken);
    window.location.href = url;
  }

  return (
    <div className="max-w-2xl">

      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0f172a]">Connect Accounts</h1>
        <p className="text-[#64748b] text-sm mt-1">
          Link your ad platforms to start pulling data into MOH Pulse.
        </p>
      </div>

      {/* Success banner */}
      {success && (
        <div className="mb-6 flex items-center gap-3 px-4 py-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10">
          <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-emerald-400 text-sm font-medium">Meta Ads Connected Successfully!</p>
        </div>
      )}

      {/* Error banner */}
      {error && (
        <div className="mb-6 flex items-center gap-3 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/10">
          <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-red-400 text-sm font-medium">Connection failed. Try again.</p>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {/* ── Meta Ads card ── */}
        <div
          className="rounded-2xl border border-[#e2e8f0] p-6 flex items-center justify-between gap-4"
          style={{ backgroundColor: '#f8fafc' }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #1877f2, #0a5dc2)' }}
            >
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </div>
            <div>
              <p className="text-[#0f172a] font-semibold text-sm">Meta Ads</p>
              <p className="text-[#64748b] text-xs mt-0.5">Facebook & Instagram advertising</p>
            </div>
          </div>

          {loading ? (
            <div className="w-5 h-5 rounded-full border-2 border-[#e2e8f0] border-t-violet-500 animate-spin flex-shrink-0" />
          ) : isMetaConnected ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-emerald-200 bg-emerald-50 flex-shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
              <span className="text-emerald-700 text-sm font-medium">Connected</span>
            </div>
          ) : (
            <button
              onClick={handleConnectMeta}
              className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
              style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
                boxShadow: '0 0 16px rgba(124,58,237,0.25)',
              }}
            >
              Connect Meta
            </button>
          )}
        </div>

        {/* ── Google Ads card ── */}
        <div
          className="rounded-2xl border border-[#e2e8f0] p-6 flex items-center justify-between gap-4"
          style={{ backgroundColor: '#f8fafc' }}
        >
          <div className="flex items-center gap-4">
            {/* Google G logo */}
            <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-white border border-[#e2e8f0]">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            </div>
            <div>
              <p className="text-[#0f172a] font-semibold text-sm">Google Ads</p>
              <p className="text-[#64748b] text-xs mt-0.5">Search & Display advertising</p>
            </div>
          </div>

          {/* Not Connected status */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-red-200 bg-red-50">
              <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
              <span className="text-red-600 text-xs font-medium">Not Connected</span>
            </div>
            <button
              disabled
              className="px-4 py-2 rounded-xl text-sm font-semibold text-[#94a3b8] border border-[#e2e8f0] cursor-not-allowed bg-white"
            >
              Connect Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConnectPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
      <Navbar />
      <Sidebar />
      <main className="ml-[240px] pt-[60px] min-h-screen p-8" style={{ backgroundColor: '#ffffff' }}>
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-40">
              <div className="w-5 h-5 rounded-full border-2 border-[#e2e8f0] border-t-violet-500 animate-spin" />
            </div>
          }
        >
          <ConnectContent />
        </Suspense>
      </main>
    </div>
  );
}
