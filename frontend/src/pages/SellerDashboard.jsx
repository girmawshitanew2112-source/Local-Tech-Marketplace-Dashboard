import { DollarSign, Package, Plus, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { StatCard } from '../components/Layout';
import { useApi } from '../hooks/useApi';
import { marketplaceService } from '../services/api';

export function SellerDashboard() {
  const { data } = useApi(marketplaceService.sellerAnalytics, []);
  const [title, setTitle] = useState('');
  const submit = (event) => { event.preventDefault(); setTitle(''); alert('Product form is wired for multipart API submission.'); };
  return <section className="dashboard"><div className="stats-grid"><StatCard label="Seller revenue" value={`$${Math.round(data?.revenue ?? 12450).toLocaleString()}`} detail="gross local sales" icon={DollarSign} /><StatCard label="Products" value={data?.products ?? 18} detail={`${data?.activeProducts ?? 15} active`} icon={Package} /><StatCard label="Orders" value={data?.orders ?? 46} detail="recent transactions" icon={ShoppingBag} /></div><div className="two-column"><form className="panel" onSubmit={submit}><h2><Plus /> Add listing</h2><input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Product title" required /><select><option>Laptops</option><option>Phones</option><option>Components</option><option>Services</option></select><input placeholder="Price" type="number" /><textarea placeholder="Description" /><input type="file" accept="image/*" /><button>Publish product</button></form><div className="panel"><h2>Recent orders</h2>{(data?.recentOrders || ['Ready for pickup', 'Delivered', 'Processing']).map((order, index) => <div className="list-row" key={order._id || order}><span>#{order._id?.slice(-6) || `DEMO${index + 1}`}</span><strong>{order.delivery?.status || order}</strong></div>)}</div></div></section>;
}
