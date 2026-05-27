import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#060b18' }}>
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white">MOH Pulse - Coming Soon</h1>
      </div>
      <footer className="border-t border-white/[0.06] py-5 px-6">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#4a5568] text-xs">© 2026 MOH Pulse. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="text-[#4a5568] text-xs hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-[#4a5568] text-xs hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
