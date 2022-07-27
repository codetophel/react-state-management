import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from './services/useFetch';
import Spinner from './Spinner';
import PageNotFound from './PageNotFound';
import { useNavigate } from 'react-router-dom';

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product, error, loading } = useFetch(`products/${id}`);

  if (loading) return <Spinner />;
  if (!product) return <PageNotFound />;
  if (error) throw error;

  // Display these products details
  return (
    <div id='detail'>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id='price'>${product.price}</p>
      <p>
        <button className='btn btn-primary' onClick={() => navigate('/cart')}>
          Add to Cart
        </button>
      </p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
