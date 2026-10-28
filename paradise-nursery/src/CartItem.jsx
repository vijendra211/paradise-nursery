import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeItem, updateQuantity } from './features/CartSlice.jsx';

const currency = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

export default function CartItem() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalUnits = items.reduce((sum, item) => sum + item.quantity, 0);

  if (!items.length) {
    return <main className="page-wrap cart-page">
      <p className="eyebrow">Your little green corner</p><h1>Your cart is <em>waiting.</em></h1>
      <section className="empty-cart"><div className="empty-plant" aria-hidden="true">♧</div><h2>Nothing leafy here just yet</h2><p>Explore our collection and find a plant that feels like you.</p><Link className="button button-dark" to="/products">Browse plants <span aria-hidden="true">→</span></Link></section>
    </main>;
  }

  return <main className="page-wrap cart-page">
    <section className="cart-heading"><div><p className="eyebrow">Your selection</p><h1>Your plant <em>basket.</em></h1><p className="lead">{totalUnits} {totalUnits === 1 ? 'plant' : 'plants'} ready to find a home.</p></div><Link className="text-link" to="/products">← Continue shopping</Link></section>
    <div className="cart-layout">
      <section className="cart-list" aria-label="Cart items">
        {items.map((item) => <article className="cart-row" key={item.id}>
          <img src={item.image} alt={item.name} onError={(event) => { event.currentTarget.src = 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=300&q=80'; }} />
          <div className="cart-product-details"><p className="botanical">{item.botanical}</p><h2>{item.name}</h2><p className="cart-unit-price">{currency(item.price)} <span>per plant</span></p><button className="remove-button" onClick={() => dispatch(removeItem(item.id))}>Remove</button></div>
          <div className="quantity-control" aria-label={`Quantity for ${item.name}`}><button aria-label={`Decrease ${item.name} quantity`} onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>−</button><span>{item.quantity}</span><button aria-label={`Increase ${item.name} quantity`} onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>+</button></div>
          <strong className="cart-subtotal">{currency(item.price * item.quantity)}</strong>
        </article>)}
      </section>
      <aside className="order-summary"><p className="eyebrow">The total</p><h2>Order summary</h2><div className="summary-line"><span>Items ({totalUnits})</span><span>{currency(total)}</span></div><div className="summary-line"><span>Delivery</span><span className="free-label">Calculated at checkout</span></div><div className="summary-total"><span>Subtotal</span><strong>{currency(total)}</strong></div><p className="summary-note">This demo does not process payments.</p><Link className="button button-dark checkout-button" to="/products">Keep exploring <span aria-hidden="true">→</span></Link></aside>
    </div>
    <p className="cart-footnote">Good things grow with care. Remember to check each plant's light and watering needs.</p>
  </main>;
}