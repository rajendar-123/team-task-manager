import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="h-16 bg-white border-b px-6 flex items-center justify-between">
      <h1 className="text-xl font-bold text-slate-800">Team Task Manager</h1>
      <div className="flex items-center gap-4">
        <div className="text-sm text-slate-600">
          {user?.name} <span className="px-2 py-1 bg-slate-100 rounded text-xs uppercase">{user?.role}</span>
        </div>
        <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm">Logout</button>
      </div>
    </div>
  );
}
