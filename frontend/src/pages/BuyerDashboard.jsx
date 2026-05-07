import { CreditCard, Heart, PackageCheck, ShoppingCart } from 'lucide-react';
import { StatCard } from '../components/Layout';

export function BuyerDashboard() {
  const cart = [{ title: 'Mesh Wi-Fi 6 Router Kit', price: 219 }, { title: 'Custom PC Build Service', price: 180 }];
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  return <section className="dashboard"><div className="stats-grid"><StatCard label="Cart" value={cart.length} detail="ready for checkout" icon={ShoppingCart} /><StatCard label="Wishlist" value="8" detail="saved listings" icon={Heart} /><StatCard label="Orders" value="12" detail="3 in transit" icon={PackageCheck} /></div><div className="two-column"><div className="panel"><h2>Cart & payment simulation</h2>{cart.map((item) => <div className="list-row" key={item.title}><span>{item.title}</span><strong>${item.price}</strong></div>)}<div className="checkout-total"><span>Total with fee</span><strong>${(total * 1.035).toFixed(2)}</strong></div><button><CreditCard size={16} /> Simulate payment</button></div><div className="panel timeline"><h2>Delivery tracking</h2>{['Payment confirmed', 'Seller confirmed availability', 'Ready for local pickup', 'Buyer handoff complete'].map((step, index) => <div className="timeline-step" key={step}><span>{index + 1}</span><p>{step}</p></div>)}</div></div></section>;
}
