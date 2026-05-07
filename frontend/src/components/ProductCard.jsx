import { MapPin, ShoppingBag, Star } from 'lucide-react';

export function ProductCard({ product, onAdd }) {
  return <article className="product-card">
    <div className="product-image">{product.images?.[0] ? <img src={product.images[0]} alt="" /> : <ShoppingBag />}</div>
    <div className="product-content">
      <div className="pill-row"><span>{product.category}</span><span>{product.condition}</span></div>
      <h3>{product.title}</h3><p>{product.description}</p>
      <div className="product-meta"><span><MapPin size={15} /> {product.location?.city || 'Local'}</span><span><Star size={15} /> {product.rating || 'New'}</span></div>
      <div className="product-footer"><strong>${product.price}</strong><button onClick={() => onAdd?.(product)}>Add to cart</button></div>
    </div>
  </article>;
}
