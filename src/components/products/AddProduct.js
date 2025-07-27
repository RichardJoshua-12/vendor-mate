// src/components/products/AddProduct.js
import React, { useState } from 'react';
import { db, auth } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

function AddProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    await addDoc(collection(db, `users/${user.uid}/products`), {
      name,
      price,
      available: true
    });
    alert('Product added!');
    setName('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Add New Product</h4>
      <input
        type="text"
        placeholder="Product Name"
        className="form-control mb-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        className="form-control mb-2"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <button type="submit" className="btn btn-success">Add Product</button>
    </form>
  );
}

export default AddProduct;
