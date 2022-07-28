import React, { useState } from 'react';
import './App.css';
import Footer from './Footer';
import Header from './Header';
import Products from './Products';
import { Routes, Route } from 'react-router-dom';
import Detail from './Detail';
import Cart from './Cart';
import { useEffect } from 'react';

export default function App() {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart')) ?? [];
    } catch {
      console.error('The cart could not be parsed into JSON.');
      return [];
    }
  });

  useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)), [cart]);

  function addToCart(id, sku) {
    setCart((items) => {
      const itemInCart = items.find((i) => i.sku === sku);
      if (itemInCart) {
        //if there is the item in the cart already, map through the existing items array then return a copy of the array with the matching item replaced
        return items.map((i) =>
          i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        //return a new array with the new item included
        return [...items, { id: id, sku, quantity: 1 }];
      }
    });
  }

  function updateQuantity(sku, quantity) {
    setCart((items) => {
      return quantity === 0
        ? items.filter((i) => i.sku !== sku)
        : items.map((i) => (i.sku === sku ? { ...i, quantity: quantity } : i));
    });
  }
  return (
    <>
      <div className='content'>
        <Header />
        <main>
          <Routes>
            <Route
              path='/'
              element={<h1> Welcome to Carved Rock Fitness</h1>}
            />
            <Route path='/:category' element={<Products />} />
            <Route
              path='/:category/:id'
              element={<Detail addToCart={addToCart} />}
            />
            <Route
              path='/cart'
              element={<Cart cart={cart} updateQuantity={updateQuantity} />}
            />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
