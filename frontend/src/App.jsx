import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import { useApp } from './context/AppContext.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import BuyerDashboard from './pages/BuyerDashboard.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Marketplace from './pages/Marketplace.jsx';
import Messages from './pages/Messages.jsx';
import SellerDashboard from './pages/SellerDashboard.jsx';
import Wishlist from './pages/Wishlist.jsx';

export default function App() {
  const { theme } = useApp();
  return <div className={`app ${theme}`}><Sidebar /><main><Navbar /><div className="content"><Routes><Route path="/" element={<Dashboard />} /><Route path="/marketplace" element={<Marketplace />} /><Route path="/seller" element={<SellerDashboard />} /><Route path="/buyer" element={<BuyerDashboard />} /><Route path="/messages" element={<Messages />} /><Route path="/wishlist" element={<Wishlist />} /><Route path="/admin" element={<AdminDashboard />} /></Routes></div></main></div>;
}
