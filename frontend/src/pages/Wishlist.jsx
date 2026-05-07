import { products } from '../data/mockData.js';
export default function Wishlist() {
  return <><div className="page-title"><h1>Wishlist</h1><p>Saved listings with quick cart actions and price-drop alerts.</p></div><div className="cards">{products.slice(0, 3).map((product) => <article className="product-card" key={product.id}><div className="product-art">Saved</div><h3>{product.title}</h3><strong>${product.price}</strong><button>Move to cart</button></article>)}</div></>;
}
