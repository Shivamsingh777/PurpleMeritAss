import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export default function Layout() {
  const { logout } = useAuth();
  const nav = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow sticky top-0">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="font-bold text-xl">GreenCart</h1>
          <nav className="flex items-center gap-4">
            <Link to="/" className="hover:underline">Dashboard</Link>
            <Link to="/simulation" className="hover:underline">Simulation</Link>
            <Link to="/drivers" className="hover:underline">Drivers</Link>
            <Link to="/routes" className="hover:underline">Routes</Link>
            <Link to="/orders" className="hover:underline">Orders</Link>
            <button className="px-3 py-1 rounded bg-gray-100" onClick={() => { logout(); nav("/login"); }}>Logout</button>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-4"><Outlet /></main>
    </div>
  );
}
