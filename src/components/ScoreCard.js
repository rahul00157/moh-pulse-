const CIRCUMFERENCE = 2 * Math.PI * 44; // r = 44 → C ≈ 276.46

export default function ScoreCard({ title, score, subtitle, trend, color, glowColor, borderColor, ringBg }) {
  const offset = CIRCUMFERENCE * (1 - score / 100);
  const isUp = trend === 'up';

  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden"
      style={{
        backgroundColor: '#111827',
        border: `1px solid ${borderColor}`,
        boxShadow: `0 0 28px ${glowColor}, 0 4px 24px rgba(0,0,0,0.45)`,
      }}
    >
      {/* Top gradient accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />

      {/* Ambient corner glow */}
      <div
        className="absolute -top-10 -right-10 w-36 h-36 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${glowColor} 0%, transparent 65%)` }}
      />

      {/* Title + trend badge */}
      <div className="flex items-start justify-between gap-2 relative z-10">
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider leading-tight">
          {title}
        </p>
        <span
          className={`flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-md flex-shrink-0 ${
            isUp
              ? 'bg-emerald-500/10 text-emerald-400'
              : 'bg-red-500/10 text-red-400'
          }`}
        >
          {isUp ? (
            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          ) : (
            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          )}
        </span>
      </div>

      {/* Circular progress ring */}
      <div className="flex justify-center relative z-10 py-1">
        <div className="relative w-[116px] h-[116px]">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            {/* Track ring */}
            <circle
              cx="50" cy="50" r="44"
              fill="none"
              stroke={ringBg}
              strokeWidth="7"
            />
            {/* Progress ring */}
            <circle
              cx="50" cy="50" r="44"
              fill="none"
              stroke={color}
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={offset}
              style={{ filter: `drop-shadow(0 0 5px ${color})` }}
            />
          </svg>

          {/* Score number centred inside ring */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="text-[28px] font-bold leading-none tabular-nums"
              style={{ color }}
            >
              {score}
            </span>
            <span className="text-[10px] text-slate-500 font-medium mt-0.5">/100</span>
          </div>
        </div>
      </div>

      {/* Subtitle */}
      <p className="text-[11px] text-slate-400 text-center leading-relaxed relative z-10">
        {subtitle}
      </p>
    </div>
  );
}
