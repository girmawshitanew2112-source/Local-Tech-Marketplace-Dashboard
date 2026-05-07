import { Filter } from 'lucide-react';
import { useMemo, useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { marketplaceService } from '../services/api';
import { useApi } from '../hooks/useApi';

const demoProducts = [
  { _id: '1', title: 'MacBook Pro M3 14-inch', description: 'Local pickup, pristine developer workstation.', category: 'Laptops', condition: 'Like New', price: 1699, location: { city: 'Austin' } },
  { _id: '2', title: 'Custom Gaming PC Service', description: 'Assembly, BIOS setup, stress testing, and handoff.', category: 'Services', condition: 'Service', price: 180, location: { city: 'Austin' } },
  { _id: '3', title: 'RTX 4070 Super', description: 'Excellent 1440p GPU with clean thermals.', category: 'Components', condition: 'Good', price: 520, location: { city: 'Round Rock' } }
];

export function Marketplace() {
  const [filters, setFilters] = useState({ search: '', category: '' });
  const { data } = useApi(() => marketplaceService.products(filters), [filters.category]);
  const products = data?.items?.length ? data.items : demoProducts;
  const visible = useMemo(() => products.filter((p) => p.title.toLowerCase().includes(filters.search.toLowerCase())), [products, filters.search]);
  return <section className="page-grid"><div className="hero-card"><p className="eyebrow">Local technology marketplace</p><h2>Buy services, sell gear, and manage everything from one modern dashboard.</h2><div className="filter-bar"><input placeholder="Search laptops, services, parts…" value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} /><select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })}><option value="">All categories</option><option>Laptops</option><option>Phones</option><option>Components</option><option>Services</option><option>Networking</option></select><button><Filter size={16} /> Filter</button></div></div><div className="product-grid">{visible.map((product) => <ProductCard key={product._id} product={product} />)}</div></section>;
}
