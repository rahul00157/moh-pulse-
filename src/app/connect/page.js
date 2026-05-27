'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { generateMetaAuthURL } from '@/lib/metaApi';

function ConnectContent() {
  const searchParams = useSearchParams();
  const success = searchParams.get('success') === 'true';
  const error = searchParams.get('error');

  const [loading, setLoading] = useState(true);
  const [isMetaConnected, setIsMetaConnected] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    async function init() {
      // Get current Supabase session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setLoading(false);
        return;
      }

      setAccessToken(session.access_token);

      // Check if meta connection already exists in DB
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
  }, [success]); // re-check after a successful redirect

  function handleConnectMeta() {
    const url = generateMetaAuthURL(accessToken);
    console.log("Meta OAuth URL:", url);
    window.location.href = url;
  }

  return (
    <div className="flex-1 ml-[240px] min-h-screen p-8" style={{ backgroundColor: '#060b18' }}>
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Connect Accounts</h1>
          <p className="text-[#4a5568] text-sm mt-1">
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

        {/* Meta card */}
        <div
          className="rounded-2xl border border-white/[0.06] p-6 flex items-center justify-between gap-4"
          style={{ backgroundColor: '#0a0f1e' }}
        >
          <div className="flex items-center gap-4">
            {/* Meta logo */}
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #1877f2, #0a5dc2)' }}
            >
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </div>

            <div>
              <p className="text-white font-semibold text-sm">Meta Ads</p>
              <p className="text-[#4a5568] text-xs mt-0.5">Facebook & Instagram advertising</p>
            </div>
          </div>

          {/* Right side: loading / connected / connect button */}
          {loading ? (
            <div className="w-5 h-5 rounded-full border-2 border-[#4a5568] border-t-transparent animate-spin flex-shrink-0" />
          ) : isMetaConnected ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 flex-shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
              <span className="text-emerald-400 text-sm font-medium">Connected</span>
            </div>
          ) : (
            <button
              onClick={handleConnectMeta}
              className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
              style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
                boxShadow: '0 0 16px rgba(124,58,237,0.35)',
              }}
            >
              Connect Meta
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ConnectPage() {
  return (
    <Suspense fallback={<div className="flex-1 ml-[240px] min-h-screen p-8" style={{ backgroundColor: '#060b18' }} />}>
      <ConnectContent />
    </Suspense>
  );
}
