import { NavLink } from 'react-router-dom';
import { BarChart3, Heart, LayoutDashboard, MessageSquare, Package, ShoppingCart, Users } from 'lucide-react';

const links = [
  { to: '/', label: 'Overview', icon: LayoutDashboard },
  { to: '/marketplace', label: 'Marketplace', icon: Package },
  { to: '/seller', label: 'Seller', icon: BarChart3 },
  { to: '/buyer', label: 'Buyer', icon: ShoppingCart },
  { to: '/messages', label: 'Messages', icon: MessageSquare },
  { to: '/wishlist', label: 'Wishlist', icon: Heart },
  { to: '/admin', label: 'Admin', icon: Users }
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand"><span>LT</span><div><strong>LocalTech</strong><small>Marketplace</small></div></div>
      <nav>{links.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to}><Icon size={18} />{label}</NavLink>)}</nav>
    </aside>
  );
}
