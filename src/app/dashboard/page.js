import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

export default function DashboardPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#080d1a' }}>
      <Navbar />
      <Sidebar />

      {/* Main content — offset by sidebar width + navbar height */}
      <main
        className="ml-[240px] pt-[60px] min-h-screen p-8"
        style={{ backgroundColor: '#080d1a' }}
      >
        {/* Page header */}
        <div className="mb-10">
          <h1 className="text-[32px] font-bold text-white leading-tight tracking-tight">
            Good morning, Rahul 👋
          </h1>
          <p className="text-[#4a5568] text-base mt-2">
            Here is your marketing health report for this week
          </p>
        </div>
      </main>
    </div>
  );
}
