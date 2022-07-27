import React, { useState } from 'react';
import Spinner from './Spinner';
import useFetch from './services/useFetch';
import { useParams } from 'react-router-dom';
import PageNotFound from './PageNotFound';

export default function Products() {
  const [size, setSize] = useState('');
  const { category } = useParams();

  const {
    data: products,
    error,
    loading,
  } = useFetch('products?category=' + category);

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
  if (loading) return <Spinner />;
  if (products.length === 0) return <PageNotFound />;

  return (
    <>
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
        <section id='products'>{filteredProducts.map(renderProduct)}</section>
      </section>
    </>
  );
}