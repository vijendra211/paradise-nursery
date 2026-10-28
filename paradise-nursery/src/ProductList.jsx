import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItem } from './features/CartSlice.jsx';
import { plants } from './data/plants.js';

const categories = ['All Plants', 'Easy Care', 'Statement Plants', 'Trailing Plants', 'Flowering'];
const currency = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

export default function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [activeCategory, setActiveCategory] = useState('All Plants');
  const [search, setSearch] = useState('');
  const [addedId, setAddedId] = useState(null);

  const visiblePlants = useMemo(() => plants.filter((plant) => {
    const matchesCategory = activeCategory === 'All Plants' || plant.category === activeCategory;
    const matchesSearch = `${plant.name} ${plant.botanical} ${plant.category}`.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  }), [activeCategory, search]);

  const quantityInCart = (id) => cartItems.find((item) => item.id === id)?.quantity ?? 0;

  function handleAdd(plant) {
    dispatch(addItem(plant));
    setAddedId(plant.id);
    window.setTimeout(() => setAddedId((current) => current === plant.id ? null : current), 900);
  }

  return (
    <main className="page-wrap shop-page">
      <section className="shop-heading">
        <div><p className="eyebrow">The plant edit</p><h1>Find your <em>green.</em></h1><p className="lead">A little something leafy for every corner of your home.</p></div>
        <Link className="button button-dark" to="/cart">View cart <span className="button-count">{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span></Link>
      </section>
      <div className="shop-tools">
        <div className="category-tabs" aria-label="Filter plants by category">
          {categories.map((category) => <button key={category} className={activeCategory === category ? 'category-tab active' : 'category-tab'} onClick={() => setActiveCategory(category)}>{category}</button>)}
        </div>
        <label className="search-box"><span aria-hidden="true">⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find a plant..." aria-label="Search plants" /></label>
      </div>
      <p className="result-count">Showing {visiblePlants.length} {visiblePlants.length === 1 ? 'plant' : 'plants'}</p>
      {visiblePlants.length ? <section className="product-grid">
        {visiblePlants.map((plant, index) => {
          const inCart = quantityInCart(plant.id);
          return <article className="product-card" key={plant.id}>
            <div className="product-image-wrap">
              <img src={plant.image} alt={plant.name} loading={index > 3 ? 'lazy' : 'eager'} onError={(event) => { event.currentTarget.src = 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=85'; }} />
              <span className="product-category">{plant.category}</span>
              {inCart > 0 && <span className="in-cart-badge">{inCart} in cart</span>}
            </div>
            <div className="product-info">
              <p className="botanical">{plant.botanical}</p><h2>{plant.name}</h2><p className="product-description">{plant.description}</p>
              <div className="product-bottom"><strong>{currency(plant.price)}</strong><button className={addedId === plant.id ? 'add-button added' : 'add-button'} onClick={() => handleAdd(plant)}>{addedId === plant.id ? 'Added ✓' : '+ Add to cart'}</button></div>
            </div>
          </article>;
        })}
      </section> : <div className="empty-state"><span>⌕</span><h2>No plants found</h2><p>Try another search or choose a different category.</p><button className="button button-dark" onClick={() => { setSearch(''); setActiveCategory('All Plants'); }}>Clear filters</button></div>}
    </main>
  );
}