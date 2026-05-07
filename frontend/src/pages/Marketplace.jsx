import { products } from '../data/mockData.js';

export default function Marketplace() {
  const categories = ['All', 'Laptops', 'Phones', 'Components', 'Services', 'Gaming'];
  return <><div className="page-title"><h1>Marketplace</h1><p>Advanced search, filtering, pagination, saved products, and payment simulation ready for API data.</p></div><div className="filters">{categories.map((category) => <button key={category}>{category}</button>)}<input placeholder="Min price" /><input placeholder="Max price" /><select><option>Sort by newest</option><option>Price low to high</option></select></div><div className="cards">{products.map((product) => <article className="product-card" key={product.id}><div className="product-art">{product.category}</div><h3>{product.title}</h3><p>{product.seller}</p><strong>${product.price}</strong><button>Add to cart</button></article>)}</div></>;
}
