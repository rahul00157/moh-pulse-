'use client';

import { useState } from 'react';

const ICONS = {
  warning: (
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  ),
  trending: (
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
    </svg>
  ),
  video: (
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
    </svg>
  ),
};

const THEMES = {
  red: {
    borderColor: '#ef4444',
    badgeBg: 'rgba(239,68,68,0.12)',
    badgeColor: '#f87171',
    glowColor: 'rgba(239,68,68,0.1)',
    borderFull: 'rgba(239,68,68,0.2)',
    btnBg: 'rgba(239,68,68,0.1)',
    btnColor: '#f87171',
  },
  green: {
    borderColor: '#22c55e',
    badgeBg: 'rgba(34,197,94,0.12)',
    badgeColor: '#4ade80',
    glowColor: 'rgba(34,197,94,0.1)',
    borderFull: 'rgba(34,197,94,0.2)',
    btnBg: 'rgba(34,197,94,0.1)',
    btnColor: '#4ade80',
  },
  blue: {
    borderColor: '#3b82f6',
    badgeBg: 'rgba(59,130,246,0.12)',
    badgeColor: '#60a5fa',
    glowColor: 'rgba(59,130,246,0.1)',
    borderFull: 'rgba(59,130,246,0.2)',
    btnBg: 'rgba(59,130,246,0.1)',
    btnColor: '#60a5fa',
  },
};

function deriveActions(insights) {
  if (!insights) {
    return [
      {
        id: 1, badge: 'URGENT', icon: 'warning', theme: 'red',
        title: 'Pause your Instagram summer collection ad',
        description: 'Spent ₹18,000 with 0 sales.',
      },
      {
        id: 2, badge: 'OPPORTUNITY', icon: 'trending', theme: 'green',
        title: 'Double budget on Google leather bags ad',
        description: 'This ad has 6.2x return.',
      },
      {
        id: 3, badge: 'CONTENT', icon: 'video', theme: 'blue',
        title: 'Post a behind the scenes video today',
        description: 'Not posted in 9 days.',
      },
    ];
  }

  const { cpc, ctr, reach } = insights;
  const fmt2 = (n) => n.toFixed(2);
  const fmtNum = (n) => n.toLocaleString('en-US');

  // Action 1 — CPC / spend efficiency
  let action1;
  if (cpc > 3) {
    action1 = {
      id: 1, badge: 'URGENT', icon: 'warning', theme: 'red',
      title: `CPC is $${fmt2(cpc)} — review your ad creative`,
      description: 'High cost per click is draining budget faster than expected.',
    };
  } else if (cpc >= 1.5) {
    action1 = {
      id: 1, badge: 'OPPORTUNITY', icon: 'trending', theme: 'green',
      title: 'Optimise landing page to improve CPC',
      description: `CPC at $${fmt2(cpc)} has room to improve. Better landing pages reduce cost.`,
    };
  } else {
    action1 = {
      id: 1, badge: 'OPPORTUNITY', icon: 'trending', theme: 'green',
      title: 'Scale budget on your best-performing ads',
      description: `CPC at $${fmt2(cpc)} is excellent. Increasing budget will maximise returns.`,
    };
  }

  // Action 2 — CTR / audience match
  let action2;
  if (ctr > 3) {
    action2 = {
      id: 2, badge: 'OPPORTUNITY', icon: 'trending', theme: 'green',
      title: `CTR of ${fmt2(ctr)}% is above average — build lookalike audiences`,
      description: 'Great targeting. Expand reach with lookalike audiences based on converters.',
    };
  } else if (ctr >= 1) {
    action2 = {
      id: 2, badge: 'CONTENT', icon: 'video', theme: 'blue',
      title: 'A/B test new creative to lift CTR',
      description: `CTR is ${fmt2(ctr)}%. A stronger hook in the first 3 seconds could double clicks.`,
    };
  } else {
    action2 = {
      id: 2, badge: 'URGENT', icon: 'warning', theme: 'red',
      title: `CTR of ${fmt2(ctr)}% is low — adjust audience targeting`,
      description: 'Poor click rate means the wrong people are seeing your ads.',
    };
  }

  // Action 3 — reach / growth
  let action3;
  if (reach > 5000) {
    action3 = {
      id: 3, badge: 'OPPORTUNITY', icon: 'trending', theme: 'green',
      title: `Strong reach of ${fmtNum(reach)} — launch a retargeting campaign`,
      description: 'High awareness. Retarget warm audiences with a conversion-focused offer.',
    };
  } else {
    action3 = {
      id: 3, badge: 'CONTENT', icon: 'video', theme: 'blue',
      title: 'Boost top-performing posts to increase reach',
      description: `Only ${fmtNum(reach)} people reached. Expand audience targeting to grow faster.`,
    };
  }

  return [action1, action2, action3];
}

export default function ActionCards({ insights }) {
  const [done, setDone] = useState({});
  const actions = deriveActions(insights);

  return (
    <section className="mt-8">
      <div className="flex items-center gap-3 mb-5">
        <h2 className="text-lg font-bold text-white tracking-tight">
          🎯 Your 3 Actions This Week
        </h2>
        <span className="text-[11px] font-semibold text-slate-500 bg-white/[0.04] border border-white/[0.07] px-2 py-0.5 rounded-full">
          {Object.keys(done).length}/3 done
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action) => {
          const isDone = !!done[action.id];
          const t = THEMES[action.theme];

          return (
            <div
              key={action.id}
              className="relative rounded-xl overflow-hidden transition-all duration-300"
              style={{
                backgroundColor: '#111827',
                border: `1px solid ${t.borderFull}`,
                boxShadow: isDone ? 'none' : `0 0 24px ${t.glowColor}, 0 4px 20px rgba(0,0,0,0.4)`,
                opacity: isDone ? 0.55 : 1,
              }}
            >
              <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ backgroundColor: t.borderColor }} />
              <div
                className="absolute left-0 top-0 bottom-0 w-16 pointer-events-none"
                style={{ background: `linear-gradient(90deg, ${t.glowColor} 0%, transparent 100%)` }}
              />

              <div className="relative z-10 p-5 flex flex-col gap-3">
                <span
                  className="inline-flex items-center gap-1.5 self-start text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded-md"
                  style={{ backgroundColor: t.badgeBg, color: t.badgeColor }}
                >
                  <span style={{ color: t.badgeColor }}>{ICONS[action.icon]}</span>
                  {action.badge}
                </span>

                <h3 className={`text-sm font-semibold text-white leading-snug transition-all duration-200 ${isDone ? 'line-through text-slate-500' : ''}`}>
                  {action.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {action.description}
                </p>

                <button
                  onClick={() =>
                    setDone((prev) =>
                      isDone
                        ? Object.fromEntries(Object.entries(prev).filter(([k]) => k !== String(action.id)))
                        : { ...prev, [action.id]: true }
                    )
                  }
                  className="mt-1 flex items-center justify-center gap-1.5 w-full py-2 rounded-lg text-xs font-semibold transition-all duration-150 active:scale-[0.97]"
                  style={{
                    backgroundColor: isDone ? 'rgba(255,255,255,0.04)' : t.btnBg,
                    color: isDone ? '#6b7280' : t.btnColor,
                    border: `1px solid ${isDone ? 'rgba(255,255,255,0.06)' : t.borderFull}`,
                  }}
                >
                  {isDone ? (
                    <>
                      <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-emerald-500">Done</span>
                      <span className="text-slate-600 ml-1">· undo</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Mark as Done
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
