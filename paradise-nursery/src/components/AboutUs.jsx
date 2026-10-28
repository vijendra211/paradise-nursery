import { Link } from 'react-router-dom';

export default function AboutUs() {
  return (
    <main className="page-wrap about-page">
      <section className="about-hero">
        <p className="eyebrow">Our story</p>
        <h1>Growing happier spaces, <em>one plant at a time.</em></h1>
        <p className="lead">We believe a little greenery can make a home feel calmer, brighter, and more like you.</p>
      </section>
      <section className="about-grid">
        <div className="about-art" role="img" aria-label="Green leaves in a sunlit room"><span>Let life<br />take root.</span></div>
        <div className="about-copy">
          <h2>Rooted in care</h2>
          <p>Paradise Nursery is a plant-shop concept created for people who want to bring nature into everyday life. From leafy statement plants to easy-care companions, our collection is designed to help beginners and plant lovers find their next favourite.</p>
          <p>Our mission is simple: make plant care feel welcoming, accessible, and joyful. We share clear care tips so you can choose plants that suit your space and routine.</p>
          <Link className="button button-dark" to="/products">Explore our plants <span aria-hidden="true">→</span></Link>
        </div>
      </section>
      <section className="values-row">
        <article><span>01</span><h3>Thoughtful choices</h3><p>A considered selection for different rooms and routines.</p></article>
        <article><span>02</span><h3>Care made simple</h3><p>Friendly guidance to help your plants thrive.</p></article>
        <article><span>03</span><h3>More green living</h3><p>Small, leafy changes that make a space feel special.</p></article>
      </section>
    </main>
  );
}