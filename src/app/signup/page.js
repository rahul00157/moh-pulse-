'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  async function handleSignup(e) {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          business_name: businessName,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // If session exists, email confirmation is off — go straight to dashboard
    if (data.session) {
      router.push('/dashboard');
      return;
    }

    // Otherwise Supabase sent a confirmation email
    setEmailSent(true);
    setLoading(false);
  }

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Check your email</h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            We sent a confirmation link to <span className="font-medium text-slate-700">{email}</span>.
            Click it to activate your account and get started.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold text-sm transition"
          >
            ← Back to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-950 via-indigo-900 to-violet-900 flex-col justify-between p-14 relative overflow-hidden">
        <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] bg-indigo-600 opacity-10 rounded-full" />
        <div className="absolute bottom-[-100px] left-[-60px] w-[350px] h-[350px] bg-violet-500 opacity-10 rounded-full" />

        <div className="relative z-10">
          <span className="text-white font-bold text-2xl tracking-tight flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-sm font-black">M</span>
            MOH Pulse
          </span>
        </div>

        <div className="relative z-10 space-y-6">
          <h1 className="text-5xl font-bold text-white leading-tight">
            Know exactly<br />what&apos;s working.
          </h1>
          <p className="text-indigo-300 text-lg leading-relaxed">
            Stop guessing. Start growing.<br />
            MOH Pulse connects all your marketing<br />
            channels in one place.
          </p>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2 backdrop-blur-sm">
            <p className="text-white font-semibold text-sm">Free plan includes:</p>
            {[
              '1 Meta Ads account',
              '1 Google Ads account',
              'Weekly AI marketing brief',
              'Marketing score & insights',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-indigo-200 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-indigo-500 text-sm">© 2025 MOH Pulse. All rights reserved.</p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center bg-slate-50 px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-10 justify-center">
            <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm font-black">M</span>
            <span className="text-slate-900 font-bold text-xl">MOH Pulse</span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Create your account</h2>
            <p className="text-slate-500 mt-1.5">Get started free — no credit card required</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Full name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jane Smith"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Business name</label>
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Acme Co."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-sm"
              />
              {password.length > 0 && (
                <div className="mt-2 flex gap-1.5">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all ${
                        password.length >= (i + 1) * 3
                          ? password.length >= 12
                            ? 'bg-emerald-500'
                            : password.length >= 8
                            ? 'bg-indigo-500'
                            : 'bg-amber-400'
                          : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed text-sm shadow-sm shadow-indigo-200 mt-1"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Creating account...
                </span>
              ) : (
                'Create account'
              )}
            </button>

            <p className="text-xs text-slate-400 text-center">
              By signing up, you agree to our{' '}
              <span className="text-slate-600 font-medium cursor-pointer hover:text-indigo-600 transition">Terms</span>
              {' '}and{' '}
              <span className="text-slate-600 font-medium cursor-pointer hover:text-indigo-600 transition">Privacy Policy</span>.
            </p>
          </form>

          <p className="mt-5 text-center text-slate-500 text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold transition">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
