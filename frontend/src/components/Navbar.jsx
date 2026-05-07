import { Bell, Moon, Search, Sun } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { notifications } from '../data/mockData.js';

export default function Navbar() {
  const { theme, toggleTheme, user, loginDemo } = useApp();
  return (
    <header className="topbar">
      <div className="search"><Search size={18} /><input placeholder="Search products, services, sellers..." /></div>
      <button className="icon-btn" title="Notifications"><Bell size={18} /><span>{notifications.length}</span></button>
      <button className="icon-btn" onClick={toggleTheme}>{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button>
      <select className="role-select" value={user?.role || 'admin'} onChange={(event) => loginDemo(event.target.value)}>
        <option value="admin">Admin demo</option><option value="seller">Seller demo</option><option value="buyer">Buyer demo</option>
      </select>
    </header>
  );
}
