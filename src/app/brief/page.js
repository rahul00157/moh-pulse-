import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

export default function BriefPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
      <Navbar />
      <Sidebar />
      <main className="ml-[240px] pt-[60px] min-h-screen p-8 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-[#0f172a]">Weekly Brief</h1>
      </main>
    </div>
  );
}
