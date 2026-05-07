import { BarChart3, Bell, Heart, Home, LogOut, Menu, Moon, Package, ShoppingCart, Sun, Users } from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const links = [
  { to: '/', label: 'Marketplace', icon: Home, roles: ['admin', 'seller', 'buyer'] },
  { to: '/admin', label: 'Admin', icon: BarChart3, roles: ['admin'] },
  { to: '/seller', label: 'Seller', icon: Package, roles: ['seller', 'admin'] },
  { to: '/buyer', label: 'Buyer', icon: ShoppingCart, roles: ['buyer', 'admin'] },
  { to: '/messages', label: 'Messages', icon: Bell, roles: ['admin', 'seller', 'buyer'] }
];

export function Layout() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const visibleLinks = links.filter((link) => link.roles.includes(user?.role || 'buyer'));

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><Menu size={24} /><span>LocalTech</span></div>
      <nav>{visibleLinks.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to}><Icon size={18} />{label}</NavLink>)}</nav>
      <div className="sidebar-card"><Heart size={18} /> Trusted local tech deals, services, and verified dashboards.</div>
    </aside>
    <main className="main-panel">
      <header className="topbar">
        <div><p className="eyebrow">Welcome back</p><h1>{user?.name || 'Guest'}</h1></div>
        <div className="top-actions">
          <button className="ghost" onClick={toggleTheme}>{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button>
          {user ? <button className="ghost" onClick={() => { logout(); navigate('/login'); }}><LogOut size={18} /> Logout</button> : <button onClick={() => navigate('/login')}>Login</button>}
        </div>
      </header>
      <Outlet />
    </main>
  </div>;
}

export function StatCard({ label, value, detail, icon: Icon = Users }) {
  return <article className="stat-card"><div><p>{label}</p><h3>{value}</h3><span>{detail}</span></div><Icon /></article>;
}
