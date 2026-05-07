import { products } from '../data/mockData.js';

export default function ProductTable() {
  return <div className="panel"><h3>Local Listings</h3><div className="table">{products.map((product) => <div className="table-row" key={product.id}><div><strong>{product.title}</strong><small>{product.category} • {product.seller}</small></div><span>${product.price}</span><span>{product.stock} left</span><em>{product.status}</em></div>)}</div></div>;
}
