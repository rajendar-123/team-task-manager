export default function Sidebar() {
  return (
    <aside className="hidden md:block w-64 bg-slate-900 text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-8">TTM</h2>
      <nav className="space-y-3">
        <div className="bg-slate-800 px-4 py-3 rounded-lg">Dashboard</div>
        <div className="px-4 py-3 text-slate-300">Projects</div>
        <div className="px-4 py-3 text-slate-300">Tasks</div>
      </nav>
    </aside>
  );
}
