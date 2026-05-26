import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import ScoreCard from '@/components/ScoreCard';
import ActionCards from '@/components/ActionCards';

const scoreCards = [
  {
    title: 'Ad Spend',
    score: 72,
    subtitle: '₹45,000 spent · ₹12,600 wasted',
    trend: 'up',
    color: '#f97316',
    glowColor: 'rgba(249,115,22,0.14)',
    borderColor: 'rgba(249,115,22,0.22)',
    ringBg: 'rgba(249,115,22,0.09)',
  },
  {
    title: 'Revenue from Ads',
    score: 81,
    subtitle: '₹1,82,000 revenue this month',
    trend: 'up',
    color: '#f59e0b',
    glowColor: 'rgba(245,158,11,0.14)',
    borderColor: 'rgba(245,158,11,0.22)',
    ringBg: 'rgba(245,158,11,0.09)',
  },
  {
    title: 'ROAS',
    score: 80,
    subtitle: '4.04x return on ad spend',
    trend: 'up',
    color: '#22c55e',
    glowColor: 'rgba(34,197,94,0.14)',
    borderColor: 'rgba(34,197,94,0.22)',
    ringBg: 'rgba(34,197,94,0.09)',
  },
  {
    title: 'Active Campaigns',
    score: 75,
    subtitle: '3 campaigns running this week',
    trend: 'up',
    color: '#8b5cf6',
    glowColor: 'rgba(139,92,246,0.14)',
    borderColor: 'rgba(139,92,246,0.22)',
    ringBg: 'rgba(139,92,246,0.09)',
  },
];

const competitors = [
  {
    id: 1,
    label: 'Competitor A',
    tag: 'Video Ads',
    stat1: 'Running 4 video ads this week',
    stat2: 'Getting 3x more engagement than you',
    stat1Icon: (
      <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    stat2Icon: (
      <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    stat2Color: 'text-red-400',
  },
  {
    id: 2,
    label: 'Competitor B',
    tag: 'Image Ads',
    stat1: 'Running 2 image ads this week',
    stat2: 'Spending 2x more budget than you',
    stat1Icon: (
      <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    stat2Icon: (
      <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    stat2Color: 'text-amber-400',
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#080d1a' }}>
      <Navbar />
      <Sidebar />

      <main
        className="ml-[240px] pt-[60px] min-h-screen p-8"
        style={{ backgroundColor: '#080d1a' }}
      >
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-[32px] font-bold text-white leading-tight tracking-tight">
            Good morning, Rahul 👋
          </h1>
          <p className="text-[#4a5568] text-base mt-2">
            Here is your marketing health report for this week
          </p>
        </div>

        {/* Score cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {scoreCards.map((card) => (
            <ScoreCard key={card.title} {...card} />
          ))}
        </div>

        {/* Weekly action cards */}
        <ActionCards />

        {/* ── Section 1: Competitor Activity ── */}
        <section className="mt-10">
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-lg font-bold text-white tracking-tight">
              👀 Competitor Activity This Week
            </h2>
            <span className="text-[11px] font-semibold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded-full">
              LIVE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {competitors.map((c) => (
              <div
                key={c.id}
                className="relative rounded-xl overflow-hidden"
                style={{
                  backgroundColor: '#111827',
                  border: '1px solid rgba(139,92,246,0.22)',
                  boxShadow: '0 0 28px rgba(139,92,246,0.1), 0 4px 20px rgba(0,0,0,0.4)',
                }}
              >
                {/* Top purple accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.6), transparent)' }}
                />

                {/* Ambient glow top-right */}
                <div
                  className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)' }}
                />

                <div className="relative z-10 p-5 flex flex-col gap-4">
                  {/* Header row */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(79,70,229,0.3))', border: '1px solid rgba(139,92,246,0.3)' }}
                      >
                        <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>

                      <div>
                        {/* Blurred competitor name */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-white font-bold text-sm blur-sm select-none pointer-events-none">
                            {c.label}
                          </span>
                          <svg className="w-3 h-3 text-violet-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-[11px] text-violet-400 font-medium">{c.tag}</span>
                      </div>
                    </div>

                    {/* Tracking badge */}
                    <span className="text-[10px] font-bold tracking-wider text-violet-300 bg-violet-500/10 border border-violet-500/20 px-2 py-1 rounded-md uppercase flex-shrink-0">
                      Tracking
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="space-y-2.5">
                    <div className="flex items-start gap-2.5 text-slate-300 text-sm">
                      <span className="text-violet-400">{c.stat1Icon}</span>
                      {c.stat1}
                    </div>
                    <div className={`flex items-start gap-2.5 text-sm ${c.stat2Color}`}>
                      <span className={c.stat2Color}>{c.stat2Icon}</span>
                      {c.stat2}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-white/[0.05]" />

                  {/* View Details button */}
                  <button
                    className="w-full py-2 rounded-lg text-sm font-semibold text-violet-300 transition-all duration-150 hover:text-violet-100 hover:bg-violet-500/10 active:scale-[0.98] flex items-center justify-center gap-1.5"
                    style={{ border: '1px solid rgba(139,92,246,0.25)' }}
                  >
                    View Details
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 2: Bottom banner ── */}
        <div
          className="relative mt-10 mb-4 rounded-2xl overflow-hidden p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{
            background: 'linear-gradient(135deg, #2e1065 0%, #4c1d95 30%, #5b21b6 60%, #3730a3 100%)',
            boxShadow: '0 0 60px rgba(124,58,237,0.35), 0 0 120px rgba(124,58,237,0.15), 0 8px 32px rgba(0,0,0,0.5)',
          }}
        >
          {/* Decorative circles */}
          <div
            className="absolute -top-12 -left-12 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 70%)' }}
          />
          <div
            className="absolute -bottom-10 -right-10 w-56 h-56 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)' }}
          />
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }}
          />

          {/* Text */}
          <div className="relative z-10 flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-violet-300 text-lg">✨</span>
              <span className="text-[11px] font-bold tracking-widest uppercase text-violet-300 bg-white/10 px-2 py-0.5 rounded-full">
                MOH AI Coach
              </span>
            </div>
            <h3 className="text-white font-bold text-xl leading-snug">
              Struggling with your scores?
              <br />
              <span className="text-violet-200">Let MOH fix it for you.</span>
            </h3>
          </div>

          {/* CTA button */}
          <div className="relative z-10 flex-shrink-0">
            <button
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:scale-105 active:scale-[0.97]"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.08))',
                border: '1px solid rgba(255,255,255,0.25)',
                boxShadow: '0 0 20px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
              }}
            >
              Talk to MOH Team
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
