import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductList from './ProductList.jsx';
import CartItem from './CartItem.jsx';
import AboutUs from './components/AboutUs.jsx';

function LandingPage() {
  return (
    <main className="landing-page">
      <div className="landing-overlay" />
      <section className="landing-content">
        <span className="eyebrow">A little more green, every day</span>
        <h1>Paradise <em>Nursery</em></h1>
        <p>Bring nature home. Discover beautiful plants that make every corner feel alive.</p>
        <Link className="button button-light" to="/products">Get Started <span aria-hidden="true">→</span></Link>
      </section>
      <div className="landing-note">Grown with care · Delivered with love</div>
    </main>
  );
}

function Header() {
  const count = useSelector((state) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0));
  const location = useLocation();
  if (location.pathname === '/') return null;

  return (
    <header className="site-header">
      <Link to="/" className="brand"><span className="brand-mark">✿</span> Paradise Nursery</Link>
      <nav aria-label="Main navigation">
        <Link to="/products">Plants</Link>
        <Link to="/about">Our Story</Link>
        <Link to="/cart" className="cart-link">Cart <span className="cart-count">{count}</span></Link>
      </nav>
    </header>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<CartItem />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
      <footer className="site-footer">© {new Date().getFullYear()} Paradise Nursery <span>Make room for a little nature.</span></footer>
    </div>
  );
}