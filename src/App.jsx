import React, { useState, useEffect } from 'react';
import './App.css';
import Footer from './Footer';
import Header from './Header';
import { getProducts } from './services/productService';

export default function App() {
  const [size, setSize] = useState('');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts('shoes')
      .then((response) => setProducts(response))
      .catch((e) => setError(e));
  }, []);

  function renderProduct(p) {
    return (
      <div key={p.id} className='product'>
        <a href='/'>
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </a>
      </div>
    );
  }

  const filteredProducts = size
    ? products.filter((p) => p.skus.find((s) => s.size === parseInt(size)))
    : products;

  if (error) throw error;
  return (
    <>
      <div className='content'>
        <Header />
        <main>
          <section
            id='filters'
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            <label htmlFor='size'>Filter by Size:</label>{' '}
            <select id='size'>
              <option value=''>All sizes</option>
              <option value='7'>7</option>
              <option value='8'>8</option>
              <option value='9'>9</option>
            </select>
            {size && <h2>Found {filteredProducts.length} Items</h2>}
            <section id='products'>
              {filteredProducts.map(renderProduct)}
            </section>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
