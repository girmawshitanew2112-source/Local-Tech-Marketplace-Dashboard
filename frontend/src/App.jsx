import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminDashboard } from './pages/AdminDashboard';
import { BuyerDashboard } from './pages/BuyerDashboard';
import { Login } from './pages/Login';
import { Marketplace } from './pages/Marketplace';
import { Messages } from './pages/Messages';
import { SellerDashboard } from './pages/SellerDashboard';

export default function App() {
  return <BrowserRouter><Routes><Route path="/login" element={<Login />} /><Route element={<Layout />}><Route index element={<Marketplace />} /><Route path="admin" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} /><Route path="seller" element={<ProtectedRoute roles={['seller', 'admin']}><SellerDashboard /></ProtectedRoute>} /><Route path="buyer" element={<ProtectedRoute roles={['buyer', 'admin']}><BuyerDashboard /></ProtectedRoute>} /><Route path="messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} /></Route></Routes></BrowserRouter>;
}
