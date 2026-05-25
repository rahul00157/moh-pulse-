import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import ScoreCard from '@/components/ScoreCard';
import ActionCards from '@/components/ActionCards';

const scoreCards = [
  {
    title: 'Money Efficiency',
    score: 68,
    subtitle: '₹18,000 wasted this week',
    trend: 'down',
    color: '#f97316',
    glowColor: 'rgba(249,115,22,0.14)',
    borderColor: 'rgba(249,115,22,0.22)',
    ringBg: 'rgba(249,115,22,0.09)',
  },
  {
    title: 'Audience Match',
    score: 74,
    subtitle: 'Reaching right people 74% of time',
    trend: 'up',
    color: '#f59e0b',
    glowColor: 'rgba(245,158,11,0.14)',
    borderColor: 'rgba(245,158,11,0.22)',
    ringBg: 'rgba(245,158,11,0.09)',
  },
  {
    title: 'Content Performance',
    score: 81,
    subtitle: 'Reels performing 4x better',
    trend: 'up',
    color: '#22c55e',
    glowColor: 'rgba(34,197,94,0.14)',
    borderColor: 'rgba(34,197,94,0.22)',
    ringBg: 'rgba(34,197,94,0.09)',
  },
  {
    title: 'Growth Momentum',
    score: 61,
    subtitle: 'Lead cost up 28% this week',
    trend: 'down',
    color: '#8b5cf6',
    glowColor: 'rgba(139,92,246,0.14)',
    borderColor: 'rgba(139,92,246,0.22)',
    ringBg: 'rgba(139,92,246,0.09)',
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

        {/* Score cards — 4 across on desktop, 2×2 on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {scoreCards.map((card) => (
            <ScoreCard key={card.title} {...card} />
          ))}
        </div>

        {/* Weekly action cards */}
        <ActionCards />
      </main>
    </div>
  );
}
