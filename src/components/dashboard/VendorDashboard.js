// src/components/dashboard/VendorDashboard.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import ProductList from '../products/ProductList';

function VendorDashboard() {
  const [wholesalers, setWholesalers] = useState([]);
  const [selectedWholesaler, setSelectedWholesaler] = useState(null);

  useEffect(() => {
    const fetchWholesalers = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const wholesalerList = querySnapshot.docs
        .filter(doc => doc.data().role === 'wholesaler')
        .map(doc => ({ id: doc.id, ...doc.data() }));
      setWholesalers(wholesalerList);
    };
    fetchWholesalers();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Browse Wholesalers</h2>
      <div className="list-group">
        {wholesalers.map(w => (
          <button
            key={w.id}
            className="list-group-item list-group-item-action"
            onClick={() => setSelectedWholesaler(w)}
          >
            {w.name || w.email}
          </button>
        ))}
      </div>

      {selectedWholesaler && (
        <>
          <h3 className="mt-4">Products from {selectedWholesaler.name || selectedWholesaler.email}</h3>
          <ProductList wholesalerId={selectedWholesaler.id} />
        </>
      )}
    </div>
  );
}

export default VendorDashboard;
