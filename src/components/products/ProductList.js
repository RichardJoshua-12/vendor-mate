// src/components/products/ProductList.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';

function ProductList({ wholesalerId }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const querySnapshot = await getDocs(collection(db, `users/${wholesalerId}/products`));
      const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(list);
    };
    fetch();
  }, [wholesalerId]);

  const placeOrder = async (productId) => {
    const vendorId = auth.currentUser.uid;
    await addDoc(collection(db, 'orders'), {
      productid: productId,
      wholesalerid: wholesalerId,
      vendorid: vendorId,
      status: 'pending'
    });
    alert('Order placed!');
  };

  return (
    <div className="row">
      {products.map(p => (
        <div className="col-md-4" key={p.id}>
          <div className="card mb-3">
            <div className="card-body">
              <h5>{p.name}</h5>
              <p>₹{p.price}</p>
              <button className="btn btn-primary" onClick={() => placeOrder(p.id)}>Order</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
