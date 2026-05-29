'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function Navbar() {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  async function handleLogout() {
    setDropdownOpen(false);
    await supabase.auth.signOut();
    router.push('/login');
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-[60px] flex items-center px-6 border-b border-[#e2e8f0] shadow-sm"
      style={{ backgroundColor: '#ffffff' }}
    >
      {/* ── Left: Logo ── */}
      <div className="flex items-center gap-2.5 flex-shrink-0 w-[220px]">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-white text-xs flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}
        >
          M
        </div>
        <span className="text-[#0f172a] font-bold text-[15px] tracking-tight">MOH Pulse</span>
      </div>

      {/* ── Center: Marketing Health Score badge ── */}
      <div className="flex-1 flex items-center justify-center">
        <div
          className="flex items-center gap-2.5 px-5 py-2 rounded-full border border-violet-200 select-none"
          style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,0.07), rgba(79,70,229,0.07))',
            boxShadow: '0 0 18px rgba(124,58,237,0.12)',
          }}
        >
          {/* Pulse dot */}
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
          </span>

          <span className="text-violet-600 text-xs font-medium tracking-wide">
            Marketing Health Score
          </span>

          <span className="h-3 w-px bg-violet-300" />

          <span className="text-[#0f172a] font-bold text-sm">72</span>
          <span className="text-violet-500 text-xs font-medium">/100</span>
        </div>
      </div>

      {/* ── Right: Bell + Avatar ── */}
      <div className="flex items-center gap-2 flex-shrink-0 w-[220px] justify-end">

        {/* Notification bell */}
        <button
          className="relative p-2 rounded-lg text-[#64748b] hover:text-[#7c3aed] hover:bg-[#f8fafc] transition-all duration-150"
          aria-label="Notifications"
        >
          <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          {/* Unread dot */}
          <span
            className="absolute top-[7px] right-[7px] w-[7px] h-[7px] rounded-full border-[1.5px] border-white"
            style={{ backgroundColor: '#7c3aed' }}
          />
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-[#e2e8f0] mx-1" />

        {/* Avatar + Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold tracking-wide transition-all duration-150 hover:ring-2 hover:ring-violet-500/50 hover:ring-offset-1 hover:ring-offset-white focus:outline-none"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
            aria-label="User menu"
          >
            RG
          </button>

          {/* Dropdown panel */}
          {dropdownOpen && (
            <div
              className="absolute right-0 top-[calc(100%+10px)] w-52 rounded-2xl border border-[#e2e8f0] overflow-hidden"
              style={{
                backgroundColor: '#ffffff',
                boxShadow: '0 8px 32px rgba(15,23,42,0.12), 0 0 0 1px rgba(226,232,240,0.8)',
              }}
            >
              {/* User info header */}
              <div className="px-4 py-3 border-b border-[#e2e8f0]">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}
                  >
                    RG
                  </div>
                  <div className="min-w-0">
                    <p className="text-[#0f172a] text-xs font-semibold truncate">Rahul Gupta</p>
                    <p className="text-[#64748b] text-[11px] truncate">rajgupta55001@gmail.com</p>
                  </div>
                </div>
              </div>

              {/* Menu items */}
              <div className="py-1.5 px-1.5">
                <Link
                  href="/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-[#64748b] hover:text-[#0f172a] hover:bg-[#f8fafc] rounded-lg text-sm transition-all duration-100"
                >
                  <svg className="w-[15px] h-[15px] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </Link>

                <Link
                  href="/settings"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-[#64748b] hover:text-[#0f172a] hover:bg-[#f8fafc] rounded-lg text-sm transition-all duration-100"
                >
                  <svg className="w-[15px] h-[15px] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Settings
                </Link>
              </div>

              {/* Logout */}
              <div className="px-1.5 pb-1.5 border-t border-[#e2e8f0] pt-1.5">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2.5 px-3 py-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg w-full text-sm transition-all duration-100"
                >
                  <svg className="w-[15px] h-[15px] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
