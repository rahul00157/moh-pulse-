import Link from 'next/link';

export const metadata = {
  title: 'MOH Pulse — Marketing clarity for small businesses',
  description: 'Connect your Meta Ads and Google Ads. Get plain English insights every week.',
};

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: 'All Your Ad Data in One Place',
    body: 'Connect Meta Ads and Google Ads in minutes. See spend, clicks, ROAS, and conversions on a single dashboard — no spreadsheets required.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
    title: 'Weekly AI-Powered Briefs',
    body: 'Every week, MOH Pulse analyses your campaigns and sends you a plain-English summary: what worked, what didn\'t, and exactly what to do next.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Built for Small Business Owners',
    body: 'No marketing degree needed. MOH Pulse cuts through the jargon so you always know whether your ads are making you money.',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#060b18' }}>

      {/* Nav */}
      <header className="border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="flex items-center gap-2 text-white font-bold text-lg tracking-tight">
            <span className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center text-xs font-black">M</span>
            MOH Pulse
          </span>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-[#8892a4] hover:text-white text-sm transition-colors">
              Sign in
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.03] active:scale-[0.97]"
              style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)' }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
          <span className="text-indigo-300 text-xs font-medium">Marketing analytics made simple</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
          Finally know where your{' '}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(135deg, #818cf8 0%, #a78bfa 100%)' }}
          >
            marketing money
          </span>{' '}
          is going
        </h1>

        <p className="mt-6 text-[#8892a4] text-lg leading-relaxed max-w-xl">
          Connect your Meta Ads and Google Ads. Get plain English insights every week.
          No jargon. No spreadsheets. Just clarity.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/signup"
            className="px-7 py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.03] active:scale-[0.97] shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
              boxShadow: '0 0 24px rgba(124,58,237,0.4)',
            }}
          >
            Start Free Trial
          </Link>
          <Link
            href="/dashboard"
            className="px-7 py-3.5 rounded-xl text-sm font-semibold text-white border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all"
          >
            See Demo
          </Link>
        </div>

        {/* Social proof */}
        <p className="mt-8 text-[#4a5568] text-xs">
          No credit card required &nbsp;·&nbsp; Free to get started
        </p>
      </section>

      {/* Features */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-white/[0.06] p-6"
                style={{ backgroundColor: '#0a0f1e' }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 text-indigo-400"
                  style={{ backgroundColor: 'rgba(99,102,241,0.12)' }}
                >
                  {f.icon}
                </div>
                <h3 className="text-white font-semibold text-sm mb-2">{f.title}</h3>
                <p className="text-[#4a5568] text-sm leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-5 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#4a5568] text-xs">© 2026 MOH Pulse. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="text-[#4a5568] text-xs hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-[#4a5568] text-xs hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
