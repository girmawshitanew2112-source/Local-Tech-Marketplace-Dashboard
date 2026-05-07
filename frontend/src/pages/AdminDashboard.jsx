import { DollarSign, Package, ShoppingCart, Users } from 'lucide-react';
import { RevenueChart, RoleChart } from '../components/Charts';
import { StatCard } from '../components/Layout';
import { useApi } from '../hooks/useApi';
import { marketplaceService } from '../services/api';

export function AdminDashboard() {
  const { data } = useApi(marketplaceService.adminAnalytics, []);
  return <section className="dashboard"><div className="stats-grid"><StatCard label="Active users" value={data?.users ?? 57} detail="admins, sellers, buyers" icon={Users} /><StatCard label="Products" value={data?.products ?? 128} detail="live listings" icon={Package} /><StatCard label="Orders" value={data?.orders ?? 342} detail="tracked deliveries" icon={ShoppingCart} /><StatCard label="Revenue" value={`$${Math.round(data?.revenue ?? 85420).toLocaleString()}`} detail="simulated payments" icon={DollarSign} /></div><div className="charts-grid"><RevenueChart data={data?.monthlyRevenue} /><RoleChart data={data?.usersByRole} /></div></section>;
}
